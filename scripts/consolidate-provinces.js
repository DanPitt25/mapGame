/**
 * Consolidate provinces by geographic clustering
 * Takes the 20K normalized provinces and merges them into ~1000-2000 regions
 */

const fs = require('fs');
const turf = require('@turf/turf');

// Configuration: target provinces per country based on size
const TARGET_PROVINCES = {
    // Major powers get more provinces
    'Russia': 25,
    'China': 20,
    'United States of America': 20,
    'Canada': 15,
    'Brazil': 15,
    'Australia': 12,
    'India': 15,
    'Argentina': 10,
    'Kazakhstan': 8,
    'Algeria': 8,
    'Democratic Republic of the Congo': 8,
    'Saudi Arabia': 6,
    'Mexico': 12,
    'Indonesia': 12,
    'Sudan': 6,
    'Libya': 5,
    'Iran': 8,
    'Mongolia': 5,
    'Peru': 8,
    'Egypt': 6,
    'South Africa': 8,
    'France': 10,
    'Germany': 8,
    'United Kingdom': 10,
    'Japan': 8,
    'Turkey': 8,
    'Spain': 8,
    'Italy': 8,
    'Poland': 6,
    'Ukraine': 8,
    'Pakistan': 6,
    'Ethiopia': 6,
    'Colombia': 6,
    'Angola': 5,
    'Greenland': 3,
};

// Default targets based on current province count
function getTargetCount(country, currentCount) {
    if (TARGET_PROVINCES[country]) {
        return TARGET_PROVINCES[country];
    }
    // Scale based on current count
    if (currentCount > 200) return 10;
    if (currentCount > 100) return 8;
    if (currentCount > 50) return 6;
    if (currentCount > 20) return 4;
    if (currentCount > 10) return 3;
    if (currentCount > 5) return 2;
    return 1; // Keep as single province
}

// Calculate centroid of a feature
function getCentroid(feature) {
    try {
        const centroid = turf.centroid(feature);
        return centroid.geometry.coordinates;
    } catch (e) {
        // Fallback: use first coordinate
        const coords = feature.geometry.coordinates;
        if (feature.geometry.type === 'Polygon') {
            return coords[0][0];
        } else if (feature.geometry.type === 'MultiPolygon') {
            return coords[0][0][0];
        }
        return [0, 0];
    }
}

// Simple k-means clustering
function kMeansCluster(features, k) {
    if (features.length <= k) {
        return features.map((f, i) => ({ ...f, cluster: i }));
    }

    // Get centroids
    const points = features.map(f => getCentroid(f));

    // Initialize cluster centers using k random points
    let centers = [];
    const used = new Set();
    while (centers.length < k) {
        const idx = Math.floor(Math.random() * points.length);
        if (!used.has(idx)) {
            used.add(idx);
            centers.push([...points[idx]]);
        }
    }

    // Iterate k-means
    let assignments = new Array(features.length).fill(0);
    for (let iter = 0; iter < 20; iter++) {
        // Assign points to nearest center
        for (let i = 0; i < points.length; i++) {
            let minDist = Infinity;
            let minCluster = 0;
            for (let c = 0; c < centers.length; c++) {
                const dist = Math.pow(points[i][0] - centers[c][0], 2) +
                            Math.pow(points[i][1] - centers[c][1], 2);
                if (dist < minDist) {
                    minDist = dist;
                    minCluster = c;
                }
            }
            assignments[i] = minCluster;
        }

        // Update centers
        const newCenters = centers.map(() => [0, 0, 0]); // [sumX, sumY, count]
        for (let i = 0; i < points.length; i++) {
            const c = assignments[i];
            newCenters[c][0] += points[i][0];
            newCenters[c][1] += points[i][1];
            newCenters[c][2] += 1;
        }
        centers = newCenters.map(nc =>
            nc[2] > 0 ? [nc[0] / nc[2], nc[1] / nc[2]] : centers[0]
        );
    }

    return features.map((f, i) => ({ ...f, cluster: assignments[i] }));
}

// Merge multiple features into one
function mergeFeatures(features, clusterName) {
    if (features.length === 0) return null;
    if (features.length === 1) {
        return features[0];
    }

    // Collect all polygons
    const polygons = [];
    for (const feat of features) {
        if (feat.geometry.type === 'Polygon') {
            polygons.push(turf.polygon(feat.geometry.coordinates));
        } else if (feat.geometry.type === 'MultiPolygon') {
            for (const poly of feat.geometry.coordinates) {
                polygons.push(turf.polygon(poly));
            }
        }
    }

    if (polygons.length === 0) return null;

    // Create a MultiPolygon from all polygons (union is slow, just collect)
    const allCoords = polygons.map(p => p.geometry.coordinates);

    // Use the largest province's name, or create a regional name
    let bestName = clusterName;
    let maxArea = 0;
    for (const feat of features) {
        const area = feat.properties.area_km2 || 0;
        if (area > maxArea) {
            maxArea = area;
            bestName = feat.properties.name || clusterName;
        }
    }

    // Sum up properties
    const totalArea = features.reduce((sum, f) => sum + (f.properties.area_km2 || 0), 0);
    const totalPop = features.reduce((sum, f) => sum + (f.properties.population || 0), 0);

    return {
        type: 'Feature',
        properties: {
            name: bestName,
            admin: features[0].properties.admin,
            iso_a2: features[0].properties.iso_a2,
            area_km2: Math.round(totalArea),
            population: totalPop,
            merged: true,
            mergedCount: features.length,
            originalNames: features.map(f => f.properties.name).filter(Boolean).slice(0, 5)
        },
        geometry: allCoords.length === 1
            ? { type: 'Polygon', coordinates: allCoords[0] }
            : { type: 'MultiPolygon', coordinates: allCoords }
    };
}

// Main consolidation
async function consolidate() {
    console.log('Loading provinces-normalized.geojson...');
    const data = JSON.parse(fs.readFileSync('data/provinces-normalized.geojson', 'utf8'));
    console.log(`Loaded ${data.features.length} features`);

    // Group by country
    const byCountry = {};
    for (const feat of data.features) {
        const country = feat.properties.admin || feat.properties.sovereignt || 'Unknown';
        if (!byCountry[country]) byCountry[country] = [];
        byCountry[country].push(feat);
    }

    console.log(`Found ${Object.keys(byCountry).length} countries`);

    // Consolidate each country
    const consolidated = [];
    let totalBefore = 0;
    let totalAfter = 0;

    for (const [country, features] of Object.entries(byCountry)) {
        totalBefore += features.length;
        const targetCount = getTargetCount(country, features.length);

        if (features.length <= targetCount) {
            // Keep as is
            consolidated.push(...features);
            totalAfter += features.length;
            continue;
        }

        // Cluster and merge
        const clustered = kMeansCluster(features, targetCount);

        // Group by cluster
        const clusters = {};
        for (const feat of clustered) {
            if (!clusters[feat.cluster]) clusters[feat.cluster] = [];
            clusters[feat.cluster].push(feat);
        }

        // Merge each cluster
        for (const [clusterId, clusterFeatures] of Object.entries(clusters)) {
            const merged = mergeFeatures(clusterFeatures, `${country} Region ${parseInt(clusterId) + 1}`);
            if (merged) {
                consolidated.push(merged);
                totalAfter++;
            }
        }

        if (features.length > 50) {
            console.log(`  ${country}: ${features.length} -> ${Object.keys(clusters).length}`);
        }
    }

    console.log(`\nConsolidation complete:`);
    console.log(`  Before: ${totalBefore} provinces`);
    console.log(`  After: ${totalAfter} provinces`);
    console.log(`  Reduction: ${((1 - totalAfter/totalBefore) * 100).toFixed(1)}%`);

    // Save
    const output = {
        type: 'FeatureCollection',
        features: consolidated
    };

    fs.writeFileSync('data/provinces-consolidated.geojson', JSON.stringify(output));
    console.log('\nSaved to data/provinces-consolidated.geojson');
}

consolidate().catch(console.error);
