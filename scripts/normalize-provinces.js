const fs = require('fs');
const path = require('path');
const shapefile = require('shapefile');
const turf = require('@turf/turf');

// Load configuration
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'tier-config.json'), 'utf8'));

// Convert km² to square degrees (rough approximation at mid-latitudes)
// 1 degree ≈ 111 km at equator, so 1 sq degree ≈ 12321 km²
// We'll use turf.area() which gives m², then convert to km²
const SQ_METERS_TO_SQ_KM = 1e-6;

async function loadCities() {
    console.log('Loading cities...');
    const cities = [];
    const source = await shapefile.open(path.join(__dirname, '../data/ne_10m_populated_places.shp'));

    while (true) {
        const result = await source.read();
        if (result.done) break;

        const feature = result.value;
        if (feature && feature.geometry) {
            cities.push({
                name: feature.properties.NAME || feature.properties.name,
                nameAlt: feature.properties.NAMEALT || feature.properties.namealt,
                country: feature.properties.ADM0NAME || feature.properties.SOV0NAME,
                admin1: feature.properties.ADM1NAME,
                population: feature.properties.POP_MAX || feature.properties.POP_MIN || 0,
                rank: feature.properties.RANK_MAX || 10,
                coordinates: feature.geometry.coordinates,
                feature: turf.point(feature.geometry.coordinates, {
                    name: feature.properties.NAME,
                    population: feature.properties.POP_MAX || 0
                })
            });
        }
    }

    console.log(`Loaded ${cities.length} cities`);
    return cities;
}

async function loadProvinces() {
    console.log('Loading provinces...');
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/provinces.geojson'), 'utf8'));
    console.log(`Loaded ${data.features.length} provinces`);
    return data;
}

function getCountryTier(countryName) {
    // Try exact match first
    if (config.countryTiers[countryName]) {
        return config.countryTiers[countryName];
    }
    // Return default
    return config.defaultTier;
}

function getTargetArea(tier) {
    return config.tiers[tier.toString()].targetArea;
}

function calculateArea(feature) {
    try {
        const area = turf.area(feature) * SQ_METERS_TO_SQ_KM;
        return area;
    } catch (e) {
        console.warn(`Could not calculate area: ${e.message}`);
        return 0;
    }
}

function getCitiesInPolygon(polygon, cities) {
    const result = [];
    for (const city of cities) {
        try {
            if (turf.booleanPointInPolygon(city.feature, polygon)) {
                result.push(city);
            }
        } catch (e) {
            // Skip invalid geometries
        }
    }
    return result.sort((a, b) => b.population - a.population);
}

function subdivideProvince(province, targetArea, cities, allCities) {
    const area = calculateArea(province);
    const provinceName = province.properties.name || province.properties.NAME || 'Unknown';
    const country = province.properties.admin || province.properties.ADMIN || province.properties.sovereignt || '';

    // If already small enough, return as-is
    if (area <= targetArea * config.splitThresholdFactor) {
        return [province];
    }

    // Find cities within this province
    const provinceCities = getCitiesInPolygon(province, cities);

    // How many subdivisions do we need?
    const numDivisions = Math.ceil(area / targetArea);

    // If we don't have enough cities, use what we have plus centroid-based points
    const seedPoints = [];

    // Add city points (up to numDivisions)
    for (let i = 0; i < Math.min(provinceCities.length, numDivisions); i++) {
        seedPoints.push({
            point: provinceCities[i].feature,
            name: provinceCities[i].name
        });
    }

    // If we need more points, generate them using a grid
    if (seedPoints.length < numDivisions) {
        const bbox = turf.bbox(province);
        const cellSize = Math.sqrt(area / numDivisions) * 0.01; // rough conversion to degrees
        const grid = turf.pointGrid(bbox, Math.max(cellSize, 0.5), { units: 'degrees' });

        // Filter to points inside the province
        const gridPoints = grid.features.filter(pt => {
            try {
                return turf.booleanPointInPolygon(pt, province);
            } catch (e) {
                return false;
            }
        });

        // Add grid points with directional names
        let dirIndex = 0;
        const directions = ['Central', 'Northern', 'Southern', 'Eastern', 'Western', 'Northeastern', 'Northwestern', 'Southeastern', 'Southwestern'];

        for (const pt of gridPoints) {
            if (seedPoints.length >= numDivisions) break;

            // Check if this point is far enough from existing seeds
            let tooClose = false;
            for (const existing of seedPoints) {
                if (turf.distance(pt, existing.point, { units: 'kilometers' }) < 50) {
                    tooClose = true;
                    break;
                }
            }

            if (!tooClose) {
                seedPoints.push({
                    point: pt,
                    name: `${directions[dirIndex % directions.length]} ${provinceName}`
                });
                dirIndex++;
            }
        }
    }

    // If we still only have 0-1 points, just return the original
    if (seedPoints.length <= 1) {
        return [province];
    }

    // Create Voronoi diagram
    const points = turf.featureCollection(seedPoints.map(sp => sp.point));

    try {
        const bbox = turf.bbox(province);
        // Expand bbox slightly for Voronoi
        const expandedBbox = [bbox[0] - 1, bbox[1] - 1, bbox[2] + 1, bbox[3] + 1];

        const voronoi = turf.voronoi(points, { bbox: expandedBbox });

        if (!voronoi || !voronoi.features) {
            return [province];
        }

        // Clip each Voronoi cell to the province boundary
        const subdivisions = [];

        for (let i = 0; i < voronoi.features.length; i++) {
            const cell = voronoi.features[i];
            if (!cell || !cell.geometry) continue;

            try {
                const clipped = turf.intersect(
                    turf.featureCollection([province, cell])
                );

                if (clipped && clipped.geometry) {
                    const subArea = calculateArea(clipped);
                    if (subArea > 100) { // Skip tiny slivers
                        const newProvince = {
                            type: 'Feature',
                            properties: {
                                ...province.properties,
                                name: seedPoints[i]?.name || `${provinceName} ${i + 1}`,
                                originalName: provinceName,
                                subdivided: true,
                                area_km2: Math.round(subArea)
                            },
                            geometry: clipped.geometry
                        };
                        subdivisions.push(newProvince);
                    }
                }
            } catch (e) {
                // Skip failed intersections
            }
        }

        if (subdivisions.length > 1) {
            console.log(`  Subdivided ${provinceName} (${Math.round(area)} km²) into ${subdivisions.length} parts`);
            return subdivisions;
        }
    } catch (e) {
        console.warn(`  Could not subdivide ${provinceName}: ${e.message}`);
    }

    return [province];
}

function findAdjacentProvinces(province, allProvinces, sameCountryOnly = true) {
    const adjacent = [];
    const country = province.properties.admin || province.properties.ADMIN || province.properties.sovereignt;

    for (const other of allProvinces) {
        if (other === province) continue;

        const otherCountry = other.properties.admin || other.properties.ADMIN || other.properties.sovereignt;
        if (sameCountryOnly && country !== otherCountry) continue;

        try {
            // Check if they share a border (intersect but don't contain each other)
            if (turf.booleanIntersects(province, other)) {
                // Make sure it's not just touching at a point
                const intersection = turf.intersect(turf.featureCollection([province, other]));
                if (intersection && intersection.geometry) {
                    const intersectionType = intersection.geometry.type;
                    // Only count as adjacent if they share a line/polygon, not just a point
                    if (intersectionType !== 'Point' && intersectionType !== 'MultiPoint') {
                        adjacent.push(other);
                    }
                }
            }
        } catch (e) {
            // Skip invalid geometries
        }
    }

    return adjacent;
}

function mergeProvinces(prov1, prov2) {
    try {
        const merged = turf.union(turf.featureCollection([prov1, prov2]));

        if (merged && merged.geometry) {
            // Use the more populous/larger province's name
            const area1 = calculateArea(prov1);
            const area2 = calculateArea(prov2);
            const name1 = prov1.properties.name || prov1.properties.NAME || '';
            const name2 = prov2.properties.name || prov2.properties.NAME || '';

            const primaryName = area1 >= area2 ? name1 : name2;
            const secondaryName = area1 >= area2 ? name2 : name1;

            return {
                type: 'Feature',
                properties: {
                    ...(area1 >= area2 ? prov1.properties : prov2.properties),
                    name: primaryName,
                    mergedFrom: [name1, name2].filter(n => n),
                    merged: true,
                    area_km2: Math.round(area1 + area2)
                },
                geometry: merged.geometry
            };
        }
    } catch (e) {
        console.warn(`Could not merge provinces: ${e.message}`);
    }

    return null;
}

async function normalizeProvinces() {
    console.log('Starting province normalization...\n');

    // Load data
    const cities = await loadCities();
    const provincesData = await loadProvinces();

    let provinces = provincesData.features.filter(f => f && f.geometry);
    console.log(`\nProcessing ${provinces.length} valid provinces...\n`);

    // Group provinces by country
    const byCountry = {};
    for (const province of provinces) {
        const country = province.properties.admin || province.properties.ADMIN ||
                       province.properties.sovereignt || province.properties.SOVEREIGNT || 'Unknown';
        if (!byCountry[country]) {
            byCountry[country] = [];
        }
        byCountry[country].push(province);
    }

    console.log(`Found ${Object.keys(byCountry).length} countries\n`);

    // Process each country
    const normalizedProvinces = [];

    for (const [country, countryProvinces] of Object.entries(byCountry)) {
        const tier = getCountryTier(country);
        const targetArea = getTargetArea(tier);

        console.log(`\n${country}: Tier ${tier}, target ${targetArea} km², ${countryProvinces.length} provinces`);

        // Get cities for this country
        const countryCities = cities.filter(c => c.country === country);

        // Phase 1: Subdivide large provinces
        let processed = [];
        for (const province of countryProvinces) {
            const area = calculateArea(province);
            province.properties.area_km2 = Math.round(area);

            if (area > targetArea * config.splitThresholdFactor) {
                const subdivided = subdivideProvince(province, targetArea, countryCities, cities);
                processed.push(...subdivided);
            } else {
                processed.push(province);
            }
        }

        // Phase 2: Merge small provinces
        const minArea = targetArea * config.mergeThresholdFactor;
        let changed = true;
        let iterations = 0;
        const maxIterations = 50;

        while (changed && iterations < maxIterations) {
            changed = false;
            iterations++;

            const newProcessed = [];
            const merged = new Set();

            for (let i = 0; i < processed.length; i++) {
                if (merged.has(i)) continue;

                const province = processed[i];
                const area = calculateArea(province);

                if (area < minArea) {
                    // Find adjacent provinces
                    const adjacent = findAdjacentProvinces(province, processed, true);

                    if (adjacent.length > 0) {
                        // Find the smallest adjacent province to merge with
                        let smallest = adjacent[0];
                        let smallestArea = calculateArea(smallest);

                        for (const adj of adjacent) {
                            const adjArea = calculateArea(adj);
                            if (adjArea < smallestArea) {
                                smallest = adj;
                                smallestArea = adjArea;
                            }
                        }

                        const smallestIndex = processed.indexOf(smallest);
                        if (smallestIndex !== -1 && !merged.has(smallestIndex)) {
                            const mergedProvince = mergeProvinces(province, smallest);
                            if (mergedProvince) {
                                newProcessed.push(mergedProvince);
                                merged.add(i);
                                merged.add(smallestIndex);
                                changed = true;
                                const name1 = province.properties.name || 'Unknown';
                                const name2 = smallest.properties.name || 'Unknown';
                                console.log(`  Merged ${name1} + ${name2}`);
                                continue;
                            }
                        }
                    }
                }

                newProcessed.push(province);
            }

            processed = newProcessed;
        }

        normalizedProvinces.push(...processed);
    }

    console.log(`\n\nNormalization complete!`);
    console.log(`Original provinces: ${provinces.length}`);
    console.log(`Normalized provinces: ${normalizedProvinces.length}`);

    // Create output GeoJSON
    const output = {
        type: 'FeatureCollection',
        features: normalizedProvinces
    };

    // Write output
    const outputPath = path.join(__dirname, '../data/provinces-normalized.geojson');
    fs.writeFileSync(outputPath, JSON.stringify(output));
    console.log(`\nWritten to ${outputPath}`);

    // Also create a summary
    const summary = {
        totalProvinces: normalizedProvinces.length,
        byCountry: {}
    };

    for (const province of normalizedProvinces) {
        const country = province.properties.admin || province.properties.ADMIN ||
                       province.properties.sovereignt || 'Unknown';
        if (!summary.byCountry[country]) {
            summary.byCountry[country] = { count: 0, subdivided: 0, merged: 0 };
        }
        summary.byCountry[country].count++;
        if (province.properties.subdivided) summary.byCountry[country].subdivided++;
        if (province.properties.merged) summary.byCountry[country].merged++;
    }

    const summaryPath = path.join(__dirname, '../data/normalization-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    console.log(`Summary written to ${summaryPath}`);
}

// Run
normalizeProvinces().catch(console.error);
