/**
 * World War Map - Main Application
 */

(function() {
    "use strict";

    // Application state
    const state = {
        map: null,
        selectedProvince: null,
        provinces: PROVINCES
    };

    /**
     * Initialize the application
     */
    function init() {
        console.log("Initializing World War Map...");

        // Initialize map
        state.map = new WorldMap("map", {
            initialScale: 250,
            initialCenter: [-2, 54], // Center on Britain initially
            onProvinceSelect: handleProvinceSelect,
            onProvinceHover: handleProvinceHover,
            onZoomChange: handleZoomChange
        });

        // Render provinces
        state.map.renderProvinces(state.provinces);

        // Set up controls
        setupControls();

        // Set up keyboard shortcuts
        setupKeyboardShortcuts();

        // Update coordinates on mouse move
        setupCoordinateTracker();

        console.log(`Loaded ${state.provinces.features.length} provinces`);
        updateInfoPanel(null);
    }

    /**
     * Handle province selection
     */
    function handleProvinceSelect(properties, feature) {
        state.selectedProvince = properties;
        updateInfoPanel(properties);
        console.log("Selected province:", properties.name);
    }

    /**
     * Handle province hover
     */
    function handleProvinceHover(properties, feature, isEntering) {
        if (isEntering) {
            document.getElementById("province-name").textContent = properties.name;
        } else if (!state.selectedProvince) {
            document.getElementById("province-name").textContent = "Select a Province";
        } else {
            document.getElementById("province-name").textContent = state.selectedProvince.name;
        }
    }

    /**
     * Handle zoom level change
     */
    function handleZoomChange(zoomLevel) {
        document.getElementById("zoom-level").textContent = `Zoom: ${zoomLevel.toFixed(1)}x`;
    }

    /**
     * Update the info panel with province details
     */
    function updateInfoPanel(properties) {
        const nameEl = document.getElementById("province-name");
        const detailsEl = document.getElementById("province-details");

        if (!properties) {
            nameEl.textContent = "Select a Province";
            detailsEl.innerHTML = `
                <p>Click on any province to see details</p>
                <p style="margin-top: 20px; font-size: 0.85rem;">
                    <strong>Controls:</strong><br>
                    • Scroll to zoom<br>
                    • Drag to pan<br>
                    • Click province to select<br>
                    • Press R to reset view
                </p>
                <p style="margin-top: 20px; font-size: 0.85rem;">
                    <strong>Statistics:</strong><br>
                    Total provinces: ${state.provinces.features.length}<br>
                    Regions: ${getUniqueRegions().length}
                </p>
            `;
            return;
        }

        nameEl.textContent = properties.name;

        const terrainLabels = {
            plains: "Plains",
            forest: "Forest",
            mountain: "Mountains",
            desert: "Desert",
            tundra: "Tundra",
            urban: "Urban",
            coastal: "Coastal"
        };

        detailsEl.innerHTML = `
            <div class="detail-row">
                <span class="detail-label">Region</span>
                <span class="detail-value">${properties.region}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Capital</span>
                <span class="detail-value">${properties.capital || "N/A"}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Terrain</span>
                <span class="detail-value">${terrainLabels[properties.terrain] || properties.terrain}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Population</span>
                <span class="detail-value">${formatNumber(properties.population)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Resources</span>
                <span class="detail-value">${properties.resources ? properties.resources.join(", ") : "None"}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Province ID</span>
                <span class="detail-value" style="font-family: monospace; font-size: 0.8rem;">${properties.id}</span>
            </div>
        `;
    }

    /**
     * Set up control buttons
     */
    function setupControls() {
        document.getElementById("zoom-in").addEventListener("click", () => {
            state.map.zoomIn();
        });

        document.getElementById("zoom-out").addEventListener("click", () => {
            state.map.zoomOut();
        });

        document.getElementById("reset-view").addEventListener("click", () => {
            state.map.resetView();
        });
    }

    /**
     * Set up keyboard shortcuts
     */
    function setupKeyboardShortcuts() {
        document.addEventListener("keydown", (event) => {
            switch (event.key.toLowerCase()) {
                case "r":
                    state.map.resetView();
                    break;
                case "+":
                case "=":
                    state.map.zoomIn();
                    break;
                case "-":
                    state.map.zoomOut();
                    break;
                case "escape":
                    clearSelection();
                    break;
            }
        });
    }

    /**
     * Set up coordinate tracker
     */
    function setupCoordinateTracker() {
        const mapContainer = document.getElementById("map-container");
        const coordsEl = document.getElementById("coordinates");

        mapContainer.addEventListener("mousemove", (event) => {
            const rect = mapContainer.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const coords = state.map.screenToGeo(x, y);
            if (coords && !isNaN(coords[0]) && !isNaN(coords[1])) {
                const lat = coords[1].toFixed(2);
                const lng = coords[0].toFixed(2);
                const latDir = coords[1] >= 0 ? "N" : "S";
                const lngDir = coords[0] >= 0 ? "E" : "W";
                coordsEl.textContent = `${Math.abs(lat)}° ${latDir}, ${Math.abs(lng)}° ${lngDir}`;
            }
        });
    }

    /**
     * Clear current selection
     */
    function clearSelection() {
        if (state.map.selectedProvince) {
            const el = document.querySelector(`[data-id="${state.map.selectedProvince}"]`);
            if (el) el.classList.remove("selected");
            state.map.selectedProvince = null;
        }
        state.selectedProvince = null;
        updateInfoPanel(null);
    }

    /**
     * Get unique regions from provinces
     */
    function getUniqueRegions() {
        const regions = new Set();
        state.provinces.features.forEach(f => {
            regions.add(f.properties.region);
        });
        return Array.from(regions);
    }

    /**
     * Format large numbers with commas
     */
    function formatNumber(num) {
        if (num === undefined || num === null) return "N/A";
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    /**
     * Navigate to a specific region
     */
    window.navigateToRegion = function(region) {
        const provinces = getProvincesByRegion(region);
        if (provinces.length === 0) return;

        // Calculate center of region
        let totalLat = 0, totalLng = 0;
        provinces.forEach(p => {
            const coords = p.geometry.coordinates[0];
            coords.forEach(c => {
                totalLng += c[0];
                totalLat += c[1];
            });
        });

        const count = provinces.reduce((sum, p) => sum + p.geometry.coordinates[0].length, 0);
        state.map.centerOn(totalLng / count, totalLat / count, 3);
    };

    /**
     * Highlight all provinces in a region
     */
    window.highlightRegion = function(region) {
        state.map.highlightProvinces(props => props.region === region);
    };

    /**
     * Clear region highlight
     */
    window.clearRegionHighlight = function() {
        state.map.clearHighlights();
    };

    // Initialize when DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();
