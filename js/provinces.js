/**
 * Province Data Module
 * Loads and manages province data from TopoJSON
 */

// Province data will be populated after loading
let PROVINCES = null;
let PROVINCE_INDEX = {};

/**
 * Load provinces from TopoJSON file
 */
async function loadProvinces(url = 'data/world_provinces.topojson') {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const topology = await response.json();

        // Convert TopoJSON to GeoJSON
        PROVINCES = topojson.feature(topology, topology.objects.provinces);

        // Build index
        PROVINCE_INDEX = {};
        PROVINCES.features.forEach(feature => {
            const id = feature.properties.id || feature.properties.adm1_code;
            if (id) {
                PROVINCE_INDEX[id] = feature;
            }
        });

        console.log(`Loaded ${PROVINCES.features.length} provinces`);
        return PROVINCES;
    } catch (error) {
        console.error('Failed to load provinces:', error);
        throw error;
    }
}

/**
 * Get province by ID
 */
function getProvinceById(id) {
    return PROVINCE_INDEX[id] || null;
}

/**
 * Get all provinces in a country
 */
function getProvincesByCountry(countryName) {
    if (!PROVINCES) return [];
    return PROVINCES.features.filter(f =>
        f.properties.admin === countryName ||
        f.properties.iso_a2 === countryName
    );
}

/**
 * Get all provinces matching a filter
 */
function getProvincesWhere(filterFn) {
    if (!PROVINCES) return [];
    return PROVINCES.features.filter(f => filterFn(f.properties));
}

/**
 * Get unique country names
 */
function getCountries() {
    if (!PROVINCES) return [];
    const countries = new Set();
    PROVINCES.features.forEach(f => {
        if (f.properties.admin) {
            countries.add(f.properties.admin);
        }
    });
    return Array.from(countries).sort();
}

/**
 * Get province counts by country
 */
function getProvinceCountsByCountry() {
    if (!PROVINCES) return {};
    const counts = {};
    PROVINCES.features.forEach(f => {
        const country = f.properties.admin || 'Unknown';
        counts[country] = (counts[country] || 0) + 1;
    });
    return counts;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadProvinces,
        getProvinceById,
        getProvincesByCountry,
        getProvincesWhere,
        getCountries,
        getProvinceCountsByCountry,
        get PROVINCES() { return PROVINCES; },
        get PROVINCE_INDEX() { return PROVINCE_INDEX; }
    };
}
