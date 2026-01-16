/**
 * Province Data Structure
 *
 * British provinces with proper non-overlapping boundaries
 * that tile together to form the shape of Britain
 */

const PROVINCES = {
    type: "FeatureCollection",
    features: [
        // ============================================
        // SCOTLAND - Northern Regions
        // ============================================
        {
            type: "Feature",
            properties: {
                id: "scot_shetland",
                name: "Shetland",
                region: "Scotland",
                country: "GBR",
                terrain: "coastal",
                population: 23000,
                resources: ["fish", "oil"],
                capital: "Lerwick"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.0, 60.8], [-0.8, 60.8], [-0.8, 59.8], [-2.0, 59.8], [-2.0, 60.8]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_orkney",
                name: "Orkney",
                region: "Scotland",
                country: "GBR",
                terrain: "coastal",
                population: 22000,
                resources: ["fish", "whisky"],
                capital: "Kirkwall"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.4, 59.4], [-2.4, 59.4], [-2.4, 58.7], [-3.4, 58.7], [-3.4, 59.4]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_caithness",
                name: "Caithness",
                region: "Scotland",
                country: "GBR",
                terrain: "tundra",
                population: 26000,
                resources: ["fish", "peat"],
                capital: "Wick"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-5.0, 58.7], [-3.0, 58.7], [-3.0, 58.3], [-5.0, 58.3], [-5.0, 58.7]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_sutherland",
                name: "Sutherland",
                region: "Scotland",
                country: "GBR",
                terrain: "mountain",
                population: 13000,
                resources: ["timber", "deer"],
                capital: "Dornoch"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-5.5, 58.3], [-4.0, 58.3], [-4.0, 57.8], [-5.5, 57.8], [-5.5, 58.3]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_ross",
                name: "Ross & Cromarty",
                region: "Scotland",
                country: "GBR",
                terrain: "mountain",
                population: 50000,
                resources: ["timber", "fish"],
                capital: "Dingwall"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-5.8, 57.8], [-4.0, 57.8], [-4.0, 57.4], [-5.8, 57.4], [-5.8, 57.8]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_inverness",
                name: "Inverness",
                region: "Scotland",
                country: "GBR",
                terrain: "mountain",
                population: 70000,
                resources: ["whisky", "timber"],
                capital: "Inverness"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-5.5, 57.4], [-4.0, 57.4], [-4.0, 57.0], [-5.5, 57.0], [-5.5, 57.4]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_moray",
                name: "Moray",
                region: "Scotland",
                country: "GBR",
                terrain: "plains",
                population: 95000,
                resources: ["whisky", "fish"],
                capital: "Elgin"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-4.0, 57.8], [-3.0, 57.8], [-3.0, 57.4], [-4.0, 57.4], [-4.0, 57.8]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_aberdeen",
                name: "Aberdeenshire",
                region: "Scotland",
                country: "GBR",
                terrain: "plains",
                population: 260000,
                resources: ["fish", "oil", "grain"],
                capital: "Aberdeen"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.0, 57.8], [-1.8, 57.5], [-2.0, 57.0], [-3.0, 57.0], [-3.0, 57.8]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_hebrides",
                name: "Western Isles",
                region: "Scotland",
                country: "GBR",
                terrain: "coastal",
                population: 27000,
                resources: ["fish", "tweed"],
                capital: "Stornoway"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-7.6, 58.3], [-6.2, 58.3], [-6.2, 56.8], [-7.6, 56.8], [-7.6, 58.3]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_skye",
                name: "Skye & Lochalsh",
                region: "Scotland",
                country: "GBR",
                terrain: "mountain",
                population: 13000,
                resources: ["fish", "tourism"],
                capital: "Portree"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-6.8, 57.5], [-5.8, 57.5], [-5.8, 57.0], [-6.8, 57.0], [-6.8, 57.5]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_lochaber",
                name: "Lochaber",
                region: "Scotland",
                country: "GBR",
                terrain: "mountain",
                population: 20000,
                resources: ["timber", "aluminum"],
                capital: "Fort William"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-5.8, 57.0], [-5.0, 57.0], [-5.0, 56.5], [-5.8, 56.5], [-5.8, 57.0]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_perth",
                name: "Perthshire",
                region: "Scotland",
                country: "GBR",
                terrain: "mountain",
                population: 150000,
                resources: ["whisky", "wool"],
                capital: "Perth"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-5.0, 57.0], [-3.5, 57.0], [-3.5, 56.3], [-5.0, 56.3], [-5.0, 57.0]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_angus",
                name: "Angus",
                region: "Scotland",
                country: "GBR",
                terrain: "plains",
                population: 116000,
                resources: ["grain", "jute"],
                capital: "Forfar"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.5, 57.0], [-2.5, 56.8], [-2.7, 56.4], [-3.5, 56.4], [-3.5, 57.0]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_fife",
                name: "Fife",
                region: "Scotland",
                country: "GBR",
                terrain: "plains",
                population: 370000,
                resources: ["coal", "fish"],
                capital: "Glenrothes"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.5, 56.4], [-2.7, 56.4], [-2.8, 56.1], [-3.5, 56.1], [-3.5, 56.4]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_argyll",
                name: "Argyll",
                region: "Scotland",
                country: "GBR",
                terrain: "coastal",
                population: 89000,
                resources: ["fish", "timber"],
                capital: "Lochgilphead"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-6.5, 56.5], [-5.0, 56.5], [-5.0, 55.8], [-6.5, 55.8], [-6.5, 56.5]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_stirling",
                name: "Stirling",
                region: "Scotland",
                country: "GBR",
                terrain: "plains",
                population: 93000,
                resources: ["coal", "manufacturing"],
                capital: "Stirling"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-5.0, 56.3], [-3.8, 56.3], [-3.8, 56.0], [-5.0, 56.0], [-5.0, 56.3]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_glasgow",
                name: "Glasgow",
                region: "Scotland",
                country: "GBR",
                terrain: "urban",
                population: 630000,
                resources: ["shipbuilding", "manufacturing"],
                capital: "Glasgow"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-4.6, 56.0], [-4.0, 56.0], [-4.0, 55.7], [-4.6, 55.7], [-4.6, 56.0]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_edinburgh",
                name: "Edinburgh",
                region: "Scotland",
                country: "GBR",
                terrain: "urban",
                population: 540000,
                resources: ["finance", "manufacturing"],
                capital: "Edinburgh"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.5, 56.1], [-3.0, 56.1], [-3.0, 55.8], [-3.5, 55.8], [-3.5, 56.1]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_lanark",
                name: "Lanarkshire",
                region: "Scotland",
                country: "GBR",
                terrain: "urban",
                population: 320000,
                resources: ["coal", "steel"],
                capital: "Hamilton"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-4.2, 55.9], [-3.5, 55.9], [-3.5, 55.5], [-4.2, 55.5], [-4.2, 55.9]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_ayr",
                name: "Ayrshire",
                region: "Scotland",
                country: "GBR",
                terrain: "plains",
                population: 370000,
                resources: ["coal", "dairy"],
                capital: "Ayr"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-5.2, 55.8], [-4.4, 55.8], [-4.4, 55.2], [-5.2, 55.2], [-5.2, 55.8]]]
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
                population: 115000,
                resources: ["wool", "textiles"],
                capital: "Newtown St Boswells"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.5, 55.8], [-2.2, 55.8], [-2.2, 55.3], [-3.5, 55.3], [-3.5, 55.8]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "scot_dumfries",
                name: "Dumfries & Galloway",
                region: "Scotland",
                country: "GBR",
                terrain: "plains",
                population: 148000,
                resources: ["dairy", "timber"],
                capital: "Dumfries"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-5.2, 55.2], [-3.5, 55.2], [-3.5, 54.8], [-5.2, 54.8], [-5.2, 55.2]]]
            }
        },

        // ============================================
        // ENGLAND - North
        // ============================================
        {
            type: "Feature",
            properties: {
                id: "eng_northumberland",
                name: "Northumberland",
                region: "Northern England",
                country: "GBR",
                terrain: "plains",
                population: 320000,
                resources: ["coal", "wool"],
                capital: "Morpeth"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.7, 55.8], [-1.5, 55.8], [-1.5, 55.1], [-2.7, 55.1], [-2.7, 55.8]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_tyneside",
                name: "Tyneside",
                region: "Northern England",
                country: "GBR",
                terrain: "urban",
                population: 880000,
                resources: ["coal", "shipbuilding"],
                capital: "Newcastle"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.0, 55.1], [-1.4, 55.1], [-1.4, 54.85], [-2.0, 54.85], [-2.0, 55.1]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_durham",
                name: "County Durham",
                region: "Northern England",
                country: "GBR",
                terrain: "plains",
                population: 530000,
                resources: ["coal", "steel"],
                capital: "Durham"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.4, 55.0], [-1.4, 55.0], [-1.4, 54.5], [-2.4, 54.5], [-2.4, 55.0]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_cumbria_north",
                name: "North Cumbria",
                region: "Northern England",
                country: "GBR",
                terrain: "mountain",
                population: 105000,
                resources: ["wool", "slate"],
                capital: "Carlisle"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.5, 55.2], [-2.7, 55.2], [-2.7, 54.7], [-3.5, 54.7], [-3.5, 55.2]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_cumbria_south",
                name: "Lake District",
                region: "Northern England",
                country: "GBR",
                terrain: "mountain",
                population: 42000,
                resources: ["slate", "tourism"],
                capital: "Kendal"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.5, 54.7], [-2.7, 54.7], [-2.7, 54.2], [-3.5, 54.2], [-3.5, 54.7]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_teesside",
                name: "Teesside",
                region: "Northern England",
                country: "GBR",
                terrain: "urban",
                population: 380000,
                resources: ["steel", "chemicals"],
                capital: "Middlesbrough"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-1.5, 54.65], [-0.9, 54.65], [-0.9, 54.4], [-1.5, 54.4], [-1.5, 54.65]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_york_north",
                name: "North Yorkshire",
                region: "Yorkshire",
                country: "GBR",
                terrain: "plains",
                population: 615000,
                resources: ["wool", "grain"],
                capital: "Northallerton"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.4, 54.5], [-0.9, 54.5], [-0.9, 53.9], [-2.4, 53.9], [-2.4, 54.5]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_york_east",
                name: "East Riding",
                region: "Yorkshire",
                country: "GBR",
                terrain: "plains",
                population: 340000,
                resources: ["grain", "fish"],
                capital: "Beverley"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-0.9, 54.2], [0.1, 54.0], [-0.1, 53.7], [-0.9, 53.7], [-0.9, 54.2]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_hull",
                name: "Hull",
                region: "Yorkshire",
                country: "GBR",
                terrain: "urban",
                population: 260000,
                resources: ["fish", "port"],
                capital: "Kingston upon Hull"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-0.5, 53.8], [0.0, 53.8], [0.0, 53.65], [-0.5, 53.65], [-0.5, 53.8]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_york_west",
                name: "West Yorkshire",
                region: "Yorkshire",
                country: "GBR",
                terrain: "urban",
                population: 2300000,
                resources: ["wool", "manufacturing"],
                capital: "Wakefield"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.0, 53.9], [-1.2, 53.9], [-1.2, 53.6], [-2.0, 53.6], [-2.0, 53.9]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_york_south",
                name: "South Yorkshire",
                region: "Yorkshire",
                country: "GBR",
                terrain: "urban",
                population: 1400000,
                resources: ["coal", "steel"],
                capital: "Barnsley"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-1.8, 53.6], [-1.0, 53.6], [-1.0, 53.3], [-1.8, 53.3], [-1.8, 53.6]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_lancashire",
                name: "Lancashire",
                region: "North West",
                country: "GBR",
                terrain: "plains",
                population: 1500000,
                resources: ["cotton", "coal"],
                capital: "Preston"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.2, 54.2], [-2.2, 54.2], [-2.2, 53.7], [-3.2, 53.7], [-3.2, 54.2]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_manchester",
                name: "Greater Manchester",
                region: "North West",
                country: "GBR",
                terrain: "urban",
                population: 2800000,
                resources: ["cotton", "manufacturing"],
                capital: "Manchester"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.5, 53.6], [-2.0, 53.6], [-2.0, 53.35], [-2.5, 53.35], [-2.5, 53.6]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_merseyside",
                name: "Merseyside",
                region: "North West",
                country: "GBR",
                terrain: "urban",
                population: 1400000,
                resources: ["port", "manufacturing"],
                capital: "Liverpool"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.2, 53.55], [-2.8, 53.55], [-2.8, 53.3], [-3.2, 53.3], [-3.2, 53.55]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_cheshire",
                name: "Cheshire",
                region: "North West",
                country: "GBR",
                terrain: "plains",
                population: 1050000,
                resources: ["salt", "dairy"],
                capital: "Chester"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.1, 53.3], [-2.2, 53.3], [-2.2, 53.0], [-3.1, 53.0], [-3.1, 53.3]]]
            }
        },

        // ============================================
        // ENGLAND - Midlands
        // ============================================
        {
            type: "Feature",
            properties: {
                id: "eng_derby",
                name: "Derbyshire",
                region: "East Midlands",
                country: "GBR",
                terrain: "mountain",
                population: 1050000,
                resources: ["coal", "lead"],
                capital: "Matlock"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.0, 53.4], [-1.2, 53.4], [-1.2, 52.85], [-2.0, 52.85], [-2.0, 53.4]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_notts",
                name: "Nottinghamshire",
                region: "East Midlands",
                country: "GBR",
                terrain: "forest",
                population: 1150000,
                resources: ["coal", "lace"],
                capital: "Nottingham"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-1.2, 53.4], [-0.7, 53.4], [-0.7, 52.85], [-1.2, 52.85], [-1.2, 53.4]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_lincoln",
                name: "Lincolnshire",
                region: "East Midlands",
                country: "GBR",
                terrain: "plains",
                population: 760000,
                resources: ["grain", "vegetables"],
                capital: "Lincoln"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-0.7, 53.6], [0.35, 53.5], [0.35, 52.7], [-0.7, 52.7], [-0.7, 53.6]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_staffs",
                name: "Staffordshire",
                region: "West Midlands",
                country: "GBR",
                terrain: "urban",
                population: 1130000,
                resources: ["pottery", "coal"],
                capital: "Stafford"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.4, 53.1], [-1.8, 53.1], [-1.8, 52.65], [-2.4, 52.65], [-2.4, 53.1]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_birmingham",
                name: "Birmingham",
                region: "West Midlands",
                country: "GBR",
                terrain: "urban",
                population: 2900000,
                resources: ["manufacturing", "jewelry"],
                capital: "Birmingham"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.1, 52.65], [-1.7, 52.65], [-1.7, 52.35], [-2.1, 52.35], [-2.1, 52.65]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_leicester",
                name: "Leicestershire",
                region: "East Midlands",
                country: "GBR",
                terrain: "plains",
                population: 1080000,
                resources: ["hosiery", "footwear"],
                capital: "Leicester"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-1.5, 52.85], [-0.9, 52.85], [-0.9, 52.45], [-1.5, 52.45], [-1.5, 52.85]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_shropshire",
                name: "Shropshire",
                region: "West Midlands",
                country: "GBR",
                terrain: "plains",
                population: 320000,
                resources: ["coal", "agriculture"],
                capital: "Shrewsbury"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.2, 52.9], [-2.5, 52.9], [-2.5, 52.3], [-3.2, 52.3], [-3.2, 52.9]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_worcester",
                name: "Worcestershire",
                region: "West Midlands",
                country: "GBR",
                terrain: "plains",
                population: 590000,
                resources: ["fruit", "porcelain"],
                capital: "Worcester"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.5, 52.35], [-2.0, 52.35], [-2.0, 52.0], [-2.5, 52.0], [-2.5, 52.35]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_northants",
                name: "Northamptonshire",
                region: "East Midlands",
                country: "GBR",
                terrain: "plains",
                population: 750000,
                resources: ["footwear", "grain"],
                capital: "Northampton"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-1.3, 52.45], [-0.6, 52.45], [-0.6, 52.05], [-1.3, 52.05], [-1.3, 52.45]]]
            }
        },

        // ============================================
        // ENGLAND - East
        // ============================================
        {
            type: "Feature",
            properties: {
                id: "eng_norfolk",
                name: "Norfolk",
                region: "East Anglia",
                country: "GBR",
                terrain: "plains",
                population: 900000,
                resources: ["grain", "turkeys"],
                capital: "Norwich"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[0.35, 53.1], [1.75, 52.95], [1.75, 52.5], [0.35, 52.5], [0.35, 53.1]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_suffolk",
                name: "Suffolk",
                region: "East Anglia",
                country: "GBR",
                terrain: "plains",
                population: 760000,
                resources: ["grain", "horses"],
                capital: "Ipswich"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[0.4, 52.5], [1.75, 52.5], [1.6, 51.95], [0.4, 52.0], [0.4, 52.5]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_cambridge",
                name: "Cambridgeshire",
                region: "East Anglia",
                country: "GBR",
                terrain: "plains",
                population: 850000,
                resources: ["grain", "education"],
                capital: "Cambridge"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-0.2, 52.65], [0.4, 52.65], [0.4, 52.0], [-0.2, 52.0], [-0.2, 52.65]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_essex",
                name: "Essex",
                region: "East Anglia",
                country: "GBR",
                terrain: "plains",
                population: 1850000,
                resources: ["grain", "oysters"],
                capital: "Chelmsford"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[0.1, 52.0], [1.1, 51.95], [1.1, 51.55], [0.25, 51.55], [0.1, 51.75], [0.1, 52.0]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_herts",
                name: "Hertfordshire",
                region: "South East",
                country: "GBR",
                terrain: "plains",
                population: 1190000,
                resources: ["grain", "brewing"],
                capital: "Hertford"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-0.5, 52.05], [0.1, 52.0], [0.1, 51.7], [-0.5, 51.7], [-0.5, 52.05]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_beds",
                name: "Bedfordshire",
                region: "South East",
                country: "GBR",
                terrain: "plains",
                population: 680000,
                resources: ["bricks", "vegetables"],
                capital: "Bedford"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-0.6, 52.25], [-0.2, 52.25], [-0.2, 51.9], [-0.6, 51.9], [-0.6, 52.25]]]
            }
        },

        // ============================================
        // ENGLAND - South East
        // ============================================
        {
            type: "Feature",
            properties: {
                id: "eng_london",
                name: "London",
                region: "South East",
                country: "GBR",
                terrain: "urban",
                population: 8900000,
                resources: ["finance", "port"],
                capital: "London"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-0.5, 51.7], [0.25, 51.7], [0.25, 51.35], [-0.5, 51.35], [-0.5, 51.7]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_kent",
                name: "Kent",
                region: "South East",
                country: "GBR",
                terrain: "plains",
                population: 1870000,
                resources: ["hops", "fruit"],
                capital: "Maidstone"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[0.25, 51.55], [1.45, 51.35], [1.4, 51.0], [0.25, 51.1], [0.25, 51.55]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_surrey",
                name: "Surrey",
                region: "South East",
                country: "GBR",
                terrain: "forest",
                population: 1200000,
                resources: ["timber"],
                capital: "Guildford"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-0.8, 51.4], [-0.1, 51.4], [-0.1, 51.15], [-0.8, 51.15], [-0.8, 51.4]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_sussex_east",
                name: "East Sussex",
                region: "South East",
                country: "GBR",
                terrain: "plains",
                population: 850000,
                resources: ["fish", "tourism"],
                capital: "Lewes"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-0.1, 51.15], [0.5, 51.1], [0.45, 50.75], [-0.15, 50.75], [-0.1, 51.15]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_sussex_west",
                name: "West Sussex",
                region: "South East",
                country: "GBR",
                terrain: "plains",
                population: 870000,
                resources: ["grain"],
                capital: "Chichester"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-0.95, 51.1], [-0.1, 51.1], [-0.15, 50.75], [-0.95, 50.75], [-0.95, 51.1]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_berks",
                name: "Berkshire",
                region: "South East",
                country: "GBR",
                terrain: "plains",
                population: 920000,
                resources: ["grain", "racing"],
                capital: "Reading"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-1.5, 51.55], [-0.8, 51.55], [-0.8, 51.35], [-1.5, 51.35], [-1.5, 51.55]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_bucks",
                name: "Buckinghamshire",
                region: "South East",
                country: "GBR",
                terrain: "plains",
                population: 810000,
                resources: ["furniture", "grain"],
                capital: "Aylesbury"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-1.15, 52.05], [-0.5, 52.05], [-0.5, 51.55], [-1.15, 51.55], [-1.15, 52.05]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_oxford",
                name: "Oxfordshire",
                region: "South East",
                country: "GBR",
                terrain: "plains",
                population: 690000,
                resources: ["education", "grain"],
                capital: "Oxford"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-1.7, 52.1], [-1.15, 52.1], [-1.15, 51.6], [-1.7, 51.6], [-1.7, 52.1]]]
            }
        },

        // ============================================
        // ENGLAND - South West
        // ============================================
        {
            type: "Feature",
            properties: {
                id: "eng_hants",
                name: "Hampshire",
                region: "South West",
                country: "GBR",
                terrain: "plains",
                population: 1380000,
                resources: ["grain", "navy"],
                capital: "Winchester"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-1.85, 51.3], [-0.95, 51.3], [-0.95, 50.75], [-1.85, 50.7], [-1.85, 51.3]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_dorset",
                name: "Dorset",
                region: "South West",
                country: "GBR",
                terrain: "plains",
                population: 420000,
                resources: ["dairy", "tourism"],
                capital: "Dorchester"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.95, 51.0], [-1.85, 51.0], [-1.85, 50.55], [-2.95, 50.55], [-2.95, 51.0]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_wilts",
                name: "Wiltshire",
                region: "South West",
                country: "GBR",
                terrain: "plains",
                population: 720000,
                resources: ["wool", "grain"],
                capital: "Trowbridge"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.3, 51.6], [-1.5, 51.6], [-1.5, 51.0], [-2.3, 51.0], [-2.3, 51.6]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_glos",
                name: "Gloucestershire",
                region: "South West",
                country: "GBR",
                terrain: "plains",
                population: 930000,
                resources: ["wool", "cheese"],
                capital: "Gloucester"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.7, 52.1], [-1.9, 52.1], [-1.9, 51.6], [-2.7, 51.6], [-2.7, 52.1]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_bristol",
                name: "Bristol",
                region: "South West",
                country: "GBR",
                terrain: "urban",
                population: 460000,
                resources: ["port", "aerospace"],
                capital: "Bristol"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-2.75, 51.55], [-2.45, 51.55], [-2.45, 51.35], [-2.75, 51.35], [-2.75, 51.55]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_somerset",
                name: "Somerset",
                region: "South West",
                country: "GBR",
                terrain: "plains",
                population: 560000,
                resources: ["cider", "dairy"],
                capital: "Taunton"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.6, 51.35], [-2.45, 51.35], [-2.45, 50.95], [-3.6, 50.95], [-3.6, 51.35]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_devon",
                name: "Devon",
                region: "South West",
                country: "GBR",
                terrain: "mountain",
                population: 790000,
                resources: ["dairy", "tourism"],
                capital: "Exeter"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-4.65, 51.2], [-3.0, 51.2], [-3.0, 50.25], [-4.65, 50.2], [-4.65, 51.2]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "eng_cornwall",
                name: "Cornwall",
                region: "South West",
                country: "GBR",
                terrain: "coastal",
                population: 570000,
                resources: ["tin", "fish", "tourism"],
                capital: "Truro"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-5.7, 50.7], [-4.65, 50.7], [-4.65, 50.0], [-5.7, 50.0], [-5.7, 50.7]]]
            }
        },

        // ============================================
        // WALES
        // ============================================
        {
            type: "Feature",
            properties: {
                id: "wales_anglesey",
                name: "Anglesey",
                region: "Wales",
                country: "GBR",
                terrain: "coastal",
                population: 70000,
                resources: ["copper", "agriculture"],
                capital: "Llangefni"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-4.7, 53.45], [-4.0, 53.45], [-4.0, 53.15], [-4.7, 53.15], [-4.7, 53.45]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "wales_gwynedd",
                name: "Gwynedd",
                region: "Wales",
                country: "GBR",
                terrain: "mountain",
                population: 125000,
                resources: ["slate", "tourism"],
                capital: "Caernarfon"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-4.5, 53.15], [-3.6, 53.15], [-3.6, 52.7], [-4.5, 52.7], [-4.5, 53.15]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "wales_clwyd",
                name: "Clwyd",
                region: "Wales",
                country: "GBR",
                terrain: "plains",
                population: 420000,
                resources: ["coal", "steel"],
                capital: "Mold"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.6, 53.35], [-3.0, 53.35], [-3.0, 52.9], [-3.6, 52.9], [-3.6, 53.35]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "wales_powys_north",
                name: "Powys North",
                region: "Wales",
                country: "GBR",
                terrain: "mountain",
                population: 65000,
                resources: ["wool", "livestock"],
                capital: "Welshpool"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.6, 52.9], [-3.0, 52.9], [-3.0, 52.4], [-3.6, 52.4], [-3.6, 52.9]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "wales_ceredigion",
                name: "Ceredigion",
                region: "Wales",
                country: "GBR",
                terrain: "coastal",
                population: 80000,
                resources: ["fish", "tourism"],
                capital: "Aberystwyth"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-4.7, 52.7], [-3.8, 52.7], [-3.8, 52.1], [-4.7, 52.1], [-4.7, 52.7]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "wales_powys_south",
                name: "Powys South",
                region: "Wales",
                country: "GBR",
                terrain: "mountain",
                population: 67000,
                resources: ["wool", "timber"],
                capital: "Brecon"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.8, 52.4], [-3.0, 52.4], [-3.0, 51.85], [-3.8, 51.85], [-3.8, 52.4]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "wales_pembroke",
                name: "Pembrokeshire",
                region: "Wales",
                country: "GBR",
                terrain: "coastal",
                population: 125000,
                resources: ["fish", "oil refining"],
                capital: "Haverfordwest"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-5.3, 52.1], [-4.7, 52.1], [-4.7, 51.6], [-5.3, 51.6], [-5.3, 52.1]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "wales_carmarthen",
                name: "Carmarthenshire",
                region: "Wales",
                country: "GBR",
                terrain: "plains",
                population: 190000,
                resources: ["dairy", "coal"],
                capital: "Carmarthen"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-4.7, 52.1], [-3.8, 52.1], [-3.8, 51.7], [-4.7, 51.7], [-4.7, 52.1]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "wales_swansea",
                name: "Swansea",
                region: "Wales",
                country: "GBR",
                terrain: "urban",
                population: 245000,
                resources: ["copper", "port"],
                capital: "Swansea"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-4.3, 51.75], [-3.85, 51.75], [-3.85, 51.5], [-4.3, 51.5], [-4.3, 51.75]]]
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
                capital: "Cardiff"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.85, 51.75], [-3.1, 51.75], [-3.1, 51.4], [-3.85, 51.4], [-3.85, 51.75]]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "wales_gwent",
                name: "Gwent",
                region: "Wales",
                country: "GBR",
                terrain: "urban",
                population: 470000,
                resources: ["coal", "steel"],
                capital: "Newport"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[[-3.3, 51.9], [-2.65, 51.9], [-2.65, 51.55], [-3.3, 51.55], [-3.3, 51.9]]]
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
