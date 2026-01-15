/**
 * Province Data Structure
 *
 * Each province is a GeoJSON Feature with properties for game mechanics
 * Britain is divided into ~50 provinces as the reference implementation
 */

const PROVINCES = {
    type: "FeatureCollection",
    features: [
        // ============================================
        // SCOTLAND (~12 provinces)
        // ============================================
        {
            type: "Feature",
            properties: {
                id: "scot_highlands_west",
                name: "Western Highlands",
                region: "Scotland",
                country: "GBR",
                terrain: "mountain",
                population: 50000,
                resources: ["timber", "fish"],
                capital: "Fort William"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-6.5, 58.5], [-5.0, 58.5], [-5.0, 56.8], [-5.5, 56.5], [-6.8, 56.8], [-6.5, 58.5]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_highlands_east",
                name: "Eastern Highlands",
                region: "Scotland",
                country: "GBR",
                terrain: "mountain",
                population: 80000,
                resources: ["timber", "whisky"],
                capital: "Inverness"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-5.0, 58.5], [-3.0, 58.6], [-3.5, 57.0], [-5.0, 56.8], [-5.0, 58.5]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_caithness",
                name: "Caithness & Sutherland",
                region: "Scotland",
                country: "GBR",
                terrain: "tundra",
                population: 30000,
                resources: ["fish", "peat"],
                capital: "Wick"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-5.5, 58.5], [-3.0, 58.6], [-3.0, 58.0], [-5.0, 58.5], [-5.5, 58.5]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_grampian",
                name: "Grampian",
                region: "Scotland",
                country: "GBR",
                terrain: "plains",
                population: 250000,
                resources: ["grain", "fish", "oil"],
                capital: "Aberdeen"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.5, 57.7], [-1.8, 57.7], [-2.0, 56.9], [-3.5, 57.0], [-3.5, 57.7]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_angus",
                name: "Angus & Fife",
                region: "Scotland",
                country: "GBR",
                terrain: "plains",
                population: 350000,
                resources: ["grain", "fish"],
                capital: "Dundee"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.5, 57.0], [-2.0, 56.9], [-2.5, 56.2], [-3.5, 56.3], [-3.5, 57.0]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_central",
                name: "Central Scotland",
                region: "Scotland",
                country: "GBR",
                terrain: "urban",
                population: 1500000,
                resources: ["coal", "steel", "manufacturing"],
                capital: "Glasgow"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-5.5, 56.5], [-3.5, 56.3], [-3.2, 55.8], [-4.5, 55.7], [-5.5, 56.0], [-5.5, 56.5]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_lothian",
                name: "Lothian",
                region: "Scotland",
                country: "GBR",
                terrain: "urban",
                population: 800000,
                resources: ["coal", "manufacturing"],
                capital: "Edinburgh"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.5, 56.3], [-2.5, 56.2], [-2.8, 55.8], [-3.2, 55.8], [-3.5, 56.3]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_borders",
                name: "Scottish Borders",
                region: "Scotland",
                country: "GBR",
                terrain: "plains",
                population: 120000,
                resources: ["wool", "grain"],
                capital: "Kelso"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.2, 55.8], [-2.8, 55.8], [-2.0, 55.8], [-2.2, 55.4], [-3.0, 55.3], [-3.2, 55.8]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_galloway",
                name: "Dumfries & Galloway",
                region: "Scotland",
                country: "GBR",
                terrain: "plains",
                population: 150000,
                resources: ["dairy", "wool"],
                capital: "Dumfries"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-5.5, 55.3], [-4.5, 55.7], [-3.0, 55.3], [-3.2, 54.9], [-5.0, 54.8], [-5.5, 55.3]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_argyll",
                name: "Argyll",
                region: "Scotland",
                country: "GBR",
                terrain: "mountain",
                population: 90000,
                resources: ["fish", "timber"],
                capital: "Oban"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-6.8, 56.8], [-5.5, 56.5], [-5.5, 55.5], [-6.5, 55.5], [-7.0, 56.3], [-6.8, 56.8]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_hebrides",
                name: "Hebrides",
                region: "Scotland",
                country: "GBR",
                terrain: "coastal",
                population: 45000,
                resources: ["fish", "peat"],
                capital: "Stornoway"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-7.8, 58.3], [-6.2, 58.3], [-6.2, 56.8], [-7.5, 56.8], [-7.8, 58.3]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_orkney_shetland",
                name: "Northern Isles",
                region: "Scotland",
                country: "GBR",
                terrain: "coastal",
                population: 40000,
                resources: ["fish", "oil"],
                capital: "Kirkwall"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.5, 61.0], [-0.5, 61.0], [-0.5, 58.7], [-3.5, 58.7], [-3.5, 61.0]]]
            }
        },

        // ============================================
        // ENGLAND - NORTH (~10 provinces)
        // ============================================
        {
            type: "Feature",
            properties: {
                id: "eng_northumberland",
                name: "Northumberland",
                region: "North England",
                country: "GBR",
                terrain: "plains",
                population: 320000,
                resources: ["coal", "wool"],
                capital: "Newcastle"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.8, 55.8], [-1.5, 55.8], [-1.5, 55.0], [-2.5, 55.0], [-2.8, 55.8]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_durham",
                name: "Durham",
                region: "North England",
                country: "GBR",
                terrain: "urban",
                population: 520000,
                resources: ["coal", "steel"],
                capital: "Durham"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.5, 55.0], [-1.2, 55.0], [-1.2, 54.5], [-2.3, 54.5], [-2.5, 55.0]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_cumbria",
                name: "Cumbria",
                region: "North England",
                country: "GBR",
                terrain: "mountain",
                population: 280000,
                resources: ["wool", "slate"],
                capital: "Carlisle"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.5, 55.1], [-2.5, 55.0], [-2.3, 54.5], [-2.5, 54.0], [-3.5, 54.1], [-3.5, 55.1]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_yorkshire_north",
                name: "North Yorkshire",
                region: "North England",
                country: "GBR",
                terrain: "plains",
                population: 400000,
                resources: ["wool", "grain"],
                capital: "York"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.3, 54.5], [-0.8, 54.5], [-0.2, 54.0], [-1.5, 53.8], [-2.3, 54.0], [-2.3, 54.5]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_yorkshire_west",
                name: "West Yorkshire",
                region: "North England",
                country: "GBR",
                terrain: "urban",
                population: 1200000,
                resources: ["coal", "wool", "manufacturing"],
                capital: "Leeds"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.3, 54.0], [-1.5, 53.8], [-1.2, 53.5], [-2.0, 53.5], [-2.3, 54.0]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_yorkshire_east",
                name: "East Yorkshire",
                region: "North England",
                country: "GBR",
                terrain: "plains",
                population: 350000,
                resources: ["grain", "fish"],
                capital: "Hull"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-1.5, 53.8], [-0.2, 54.0], [0.2, 53.7], [-0.2, 53.5], [-1.2, 53.5], [-1.5, 53.8]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_lancashire",
                name: "Lancashire",
                region: "North England",
                country: "GBR",
                terrain: "urban",
                population: 900000,
                resources: ["coal", "cotton", "manufacturing"],
                capital: "Lancaster"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.5, 54.1], [-2.5, 54.0], [-2.3, 53.5], [-3.2, 53.5], [-3.5, 54.1]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_manchester",
                name: "Greater Manchester",
                region: "North England",
                country: "GBR",
                terrain: "urban",
                population: 2800000,
                resources: ["coal", "manufacturing", "cotton"],
                capital: "Manchester"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.6, 53.6], [-2.0, 53.6], [-2.0, 53.3], [-2.6, 53.3], [-2.6, 53.6]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_merseyside",
                name: "Merseyside",
                region: "North England",
                country: "GBR",
                terrain: "urban",
                population: 1400000,
                resources: ["manufacturing", "port"],
                capital: "Liverpool"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.2, 53.5], [-2.6, 53.5], [-2.6, 53.2], [-3.2, 53.2], [-3.2, 53.5]]]
            }
        },

        // ============================================
        // ENGLAND - MIDLANDS (~8 provinces)
        // ============================================
        {
            type: "Feature",
            properties: {
                id: "eng_cheshire",
                name: "Cheshire",
                region: "Midlands",
                country: "GBR",
                terrain: "plains",
                population: 350000,
                resources: ["dairy", "salt"],
                capital: "Chester"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.2, 53.2], [-2.4, 53.2], [-2.4, 52.9], [-3.0, 52.9], [-3.2, 53.2]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_derbyshire",
                name: "Derbyshire",
                region: "Midlands",
                country: "GBR",
                terrain: "mountain",
                population: 450000,
                resources: ["coal", "lead"],
                capital: "Derby"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.0, 53.5], [-1.2, 53.5], [-1.2, 52.8], [-1.8, 52.8], [-2.0, 53.5]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_nottinghamshire",
                name: "Nottinghamshire",
                region: "Midlands",
                country: "GBR",
                terrain: "forest",
                population: 500000,
                resources: ["coal", "timber"],
                capital: "Nottingham"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-1.2, 53.5], [-0.5, 53.5], [-0.5, 52.8], [-1.2, 52.8], [-1.2, 53.5]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_lincolnshire",
                name: "Lincolnshire",
                region: "Midlands",
                country: "GBR",
                terrain: "plains",
                population: 380000,
                resources: ["grain", "wool"],
                capital: "Lincoln"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-0.5, 53.5], [0.3, 53.5], [0.5, 52.7], [-0.3, 52.7], [-0.5, 53.5]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_staffordshire",
                name: "Staffordshire",
                region: "Midlands",
                country: "GBR",
                terrain: "urban",
                population: 600000,
                resources: ["coal", "pottery", "steel"],
                capital: "Stafford"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.4, 53.2], [-1.8, 53.2], [-1.8, 52.6], [-2.2, 52.6], [-2.4, 53.2]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_birmingham",
                name: "West Midlands",
                region: "Midlands",
                country: "GBR",
                terrain: "urban",
                population: 2900000,
                resources: ["manufacturing", "steel", "coal"],
                capital: "Birmingham"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.2, 52.6], [-1.6, 52.6], [-1.6, 52.3], [-2.2, 52.3], [-2.2, 52.6]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_leicestershire",
                name: "Leicestershire",
                region: "Midlands",
                country: "GBR",
                terrain: "plains",
                population: 450000,
                resources: ["wool", "grain"],
                capital: "Leicester"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-1.6, 52.8], [-0.8, 52.8], [-0.8, 52.4], [-1.6, 52.4], [-1.6, 52.8]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_shropshire",
                name: "Shropshire",
                region: "Midlands",
                country: "GBR",
                terrain: "plains",
                population: 280000,
                resources: ["coal", "iron"],
                capital: "Shrewsbury"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.2, 52.9], [-2.4, 52.9], [-2.4, 52.3], [-3.0, 52.3], [-3.2, 52.9]]]
            }
        },

        // ============================================
        // ENGLAND - EAST (~5 provinces)
        // ============================================
        {
            type: "Feature",
            properties: {
                id: "eng_norfolk",
                name: "Norfolk",
                region: "East England",
                country: "GBR",
                terrain: "plains",
                population: 420000,
                resources: ["grain", "fish"],
                capital: "Norwich"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[0.3, 53.0], [1.8, 52.9], [1.8, 52.4], [0.5, 52.4], [0.3, 53.0]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_suffolk",
                name: "Suffolk",
                region: "East England",
                country: "GBR",
                terrain: "plains",
                population: 350000,
                resources: ["grain", "wool"],
                capital: "Ipswich"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[0.5, 52.4], [1.8, 52.4], [1.5, 51.9], [0.5, 52.0], [0.5, 52.4]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_cambridgeshire",
                name: "Cambridgeshire",
                region: "East England",
                country: "GBR",
                terrain: "plains",
                population: 320000,
                resources: ["grain"],
                capital: "Cambridge"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-0.3, 52.7], [0.5, 52.7], [0.5, 52.0], [-0.2, 52.0], [-0.3, 52.7]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_essex",
                name: "Essex",
                region: "East England",
                country: "GBR",
                terrain: "plains",
                population: 600000,
                resources: ["grain", "fish"],
                capital: "Chelmsford"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[0.0, 52.0], [1.2, 52.0], [1.2, 51.5], [0.3, 51.5], [0.0, 51.7], [0.0, 52.0]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_hertfordshire",
                name: "Hertfordshire",
                region: "East England",
                country: "GBR",
                terrain: "plains",
                population: 380000,
                resources: ["grain"],
                capital: "Hertford"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-0.5, 52.1], [0.0, 52.0], [0.0, 51.7], [-0.5, 51.7], [-0.5, 52.1]]]
            }
        },

        // ============================================
        // ENGLAND - SOUTH EAST (~6 provinces)
        // ============================================
        {
            type: "Feature",
            properties: {
                id: "eng_london",
                name: "London",
                region: "South East England",
                country: "GBR",
                terrain: "urban",
                population: 8500000,
                resources: ["manufacturing", "finance", "port"],
                capital: "London"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-0.5, 51.7], [0.3, 51.7], [0.3, 51.3], [-0.5, 51.3], [-0.5, 51.7]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_kent",
                name: "Kent",
                region: "South East England",
                country: "GBR",
                terrain: "plains",
                population: 550000,
                resources: ["grain", "hops", "fruit"],
                capital: "Canterbury"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[0.3, 51.5], [1.5, 51.4], [1.4, 51.0], [0.3, 51.1], [0.3, 51.5]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_sussex",
                name: "Sussex",
                region: "South East England",
                country: "GBR",
                terrain: "plains",
                population: 480000,
                resources: ["grain", "fish"],
                capital: "Brighton"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-0.8, 51.2], [0.3, 51.1], [0.3, 50.7], [-0.8, 50.7], [-0.8, 51.2]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_surrey",
                name: "Surrey",
                region: "South East England",
                country: "GBR",
                terrain: "forest",
                population: 350000,
                resources: ["timber"],
                capital: "Guildford"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-0.8, 51.4], [-0.5, 51.3], [0.0, 51.3], [0.0, 51.1], [-0.8, 51.2], [-0.8, 51.4]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_berkshire",
                name: "Berkshire",
                region: "South East England",
                country: "GBR",
                terrain: "plains",
                population: 280000,
                resources: ["grain"],
                capital: "Reading"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-1.5, 51.6], [-0.5, 51.6], [-0.5, 51.3], [-1.5, 51.3], [-1.5, 51.6]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_oxfordshire",
                name: "Oxfordshire",
                region: "South East England",
                country: "GBR",
                terrain: "plains",
                population: 300000,
                resources: ["grain", "wool"],
                capital: "Oxford"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-1.7, 52.1], [-1.0, 52.1], [-1.0, 51.6], [-1.7, 51.6], [-1.7, 52.1]]]
            }
        },

        // ============================================
        // ENGLAND - SOUTH WEST (~6 provinces)
        // ============================================
        {
            type: "Feature",
            properties: {
                id: "eng_hampshire",
                name: "Hampshire",
                region: "South West England",
                country: "GBR",
                terrain: "forest",
                population: 520000,
                resources: ["timber", "grain"],
                capital: "Winchester"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-1.8, 51.3], [-0.8, 51.2], [-0.8, 50.7], [-1.8, 50.7], [-1.8, 51.3]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_dorset",
                name: "Dorset",
                region: "South West England",
                country: "GBR",
                terrain: "plains",
                population: 220000,
                resources: ["grain", "fish"],
                capital: "Dorchester"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.8, 51.0], [-1.8, 51.0], [-1.8, 50.5], [-2.8, 50.5], [-2.8, 51.0]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_wiltshire",
                name: "Wiltshire",
                region: "South West England",
                country: "GBR",
                terrain: "plains",
                population: 260000,
                resources: ["wool", "grain"],
                capital: "Salisbury"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.2, 51.6], [-1.5, 51.6], [-1.5, 51.0], [-2.2, 51.0], [-2.2, 51.6]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_somerset",
                name: "Somerset",
                region: "South West England",
                country: "GBR",
                terrain: "plains",
                population: 350000,
                resources: ["dairy", "cider"],
                capital: "Taunton"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.5, 51.4], [-2.2, 51.4], [-2.2, 50.9], [-3.5, 51.0], [-3.5, 51.4]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_devon",
                name: "Devon",
                region: "South West England",
                country: "GBR",
                terrain: "mountain",
                population: 400000,
                resources: ["tin", "fish", "wool"],
                capital: "Exeter"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-4.6, 51.2], [-3.0, 51.2], [-2.8, 50.5], [-4.2, 50.2], [-4.6, 51.2]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_cornwall",
                name: "Cornwall",
                region: "South West England",
                country: "GBR",
                terrain: "coastal",
                population: 180000,
                resources: ["tin", "copper", "fish"],
                capital: "Truro"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-5.7, 50.7], [-4.2, 50.7], [-4.2, 50.0], [-5.7, 50.0], [-5.7, 50.7]]]
            }
        },

        // ============================================
        // WALES (~6 provinces)
        // ============================================
        {
            type: "Feature",
            properties: {
                id: "wales_north",
                name: "North Wales",
                region: "Wales",
                country: "GBR",
                terrain: "mountain",
                population: 250000,
                resources: ["slate", "coal"],
                capital: "Caernarfon"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-4.8, 53.4], [-3.0, 53.3], [-3.0, 52.9], [-4.2, 52.9], [-4.8, 53.4]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "wales_mid",
                name: "Mid Wales",
                region: "Wales",
                country: "GBR",
                terrain: "mountain",
                population: 120000,
                resources: ["wool", "timber"],
                capital: "Aberystwyth"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-4.5, 52.9], [-3.0, 52.9], [-3.0, 52.2], [-4.5, 52.2], [-4.5, 52.9]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "wales_powys",
                name: "Powys",
                region: "Wales",
                country: "GBR",
                terrain: "mountain",
                population: 130000,
                resources: ["wool", "livestock"],
                capital: "Welshpool"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.5, 52.8], [-3.0, 52.8], [-3.0, 52.0], [-3.5, 52.0], [-3.5, 52.8]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "wales_southwest",
                name: "Pembrokeshire",
                region: "Wales",
                country: "GBR",
                terrain: "coastal",
                population: 110000,
                resources: ["fish", "dairy"],
                capital: "Haverfordwest"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-5.5, 52.2], [-4.5, 52.2], [-4.5, 51.6], [-5.5, 51.6], [-5.5, 52.2]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "wales_south",
                name: "South Wales",
                region: "Wales",
                country: "GBR",
                terrain: "urban",
                population: 800000,
                resources: ["coal", "steel", "iron"],
                capital: "Cardiff"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-4.5, 51.9], [-3.0, 51.9], [-2.8, 51.4], [-4.5, 51.4], [-4.5, 51.9]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "wales_glamorgan",
                name: "Glamorgan",
                region: "Wales",
                country: "GBR",
                terrain: "urban",
                population: 450000,
                resources: ["coal", "steel"],
                capital: "Swansea"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-4.5, 51.9], [-4.5, 51.4], [-3.6, 51.4], [-3.6, 51.9], [-4.5, 51.9]]]
            }
        }
    ]
};

/**
 * Province lookup by ID
 */
const PROVINCE_INDEX = {};
PROVINCES.features.forEach(feature => {
    PROVINCE_INDEX[feature.properties.id] = feature;
});

/**
 * Get province by ID
 */
function getProvinceById(id) {
    return PROVINCE_INDEX[id] || null;
}

/**
 * Get all provinces in a region
 */
function getProvincesByRegion(region) {
    return PROVINCES.features.filter(f => f.properties.region === region);
}

/**
 * Get all provinces in a country
 */
function getProvincesByCountry(countryCode) {
    return PROVINCES.features.filter(f => f.properties.country === countryCode);
}

/**
 * Calculate total population for a set of provinces
 */
function calculateTotalPopulation(provinceIds) {
    return provinceIds.reduce((total, id) => {
        const province = PROVINCE_INDEX[id];
        return total + (province ? province.properties.population : 0);
    }, 0);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PROVINCES, PROVINCE_INDEX, getProvinceById, getProvincesByRegion, getProvincesByCountry };
}
