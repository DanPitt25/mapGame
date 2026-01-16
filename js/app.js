/**
 * World War Map - Main Application
 */

(function() {
    "use strict";

    // Application state
    const state = {
        map: null,
        selectedProvince: null,
        provinces: null,
        loading: true
    };

    /**
     * Initialize the application
     */
    async function init() {
        console.log("Initializing World War Map...");
        showLoading(true);

        try {
            // Load data in parallel
            const [countryData, provinceData] = await Promise.all([
                fetch('data/countries.geojson').then(r => r.json()),
                loadProvinces('data/world_provinces.topojson')
            ]);

            state.provinces = provinceData;

            // Initialize map
            state.map = new WorldMap("map", {
                initialScale: 150,
                initialCenter: [0, 20],
                onProvinceSelect: handleProvinceSelect,
                onProvinceHover: handleProvinceHover,
                onZoomChange: handleZoomChange
            });

            // Render countries first (base layer), then provinces on top
            state.map.renderCountries(countryData);
            state.map.renderProvinces(state.provinces);

            // Set up controls
            setupControls();

            // Set up keyboard shortcuts
            setupKeyboardShortcuts();

            // Update coordinates on mouse move
            setupCoordinateTracker();

            console.log(`Loaded ${state.provinces.features.length} provinces from ${getCountries().length} countries`);
            updateInfoPanel(null);
            showLoading(false);

        } catch (error) {
            console.error("Failed to initialize:", error);
            showError("Failed to load map data. Please refresh the page.");
        }
    }

    /**
     * Show/hide loading indicator
     */
    function showLoading(show) {
        state.loading = show;
        let loader = document.getElementById("loading");
        if (!loader && show) {
            loader = document.createElement("div");
            loader.id = "loading";
            loader.innerHTML = '<div class="spinner"></div><div>Loading world map...</div>';
            document.body.appendChild(loader);
        }
        if (loader) {
            loader.classList.toggle("hidden", !show);
        }
    }

    /**
     * Show error message
     */
    function showError(message) {
        const panel = document.getElementById("province-details");
        if (panel) {
            panel.innerHTML = `<p style="color: #ff6b6b;">${message}</p>`;
        }
    }

    /**
     * Handle province selection
     */
    function handleProvinceSelect(properties, feature) {
        state.selectedProvince = properties;
        updateInfoPanel(properties);
        console.log("Selected province:", properties.name, "in", properties.admin);
    }

    /**
     * Handle province hover
     */
    function handleProvinceHover(properties, feature, isEntering) {
        if (isEntering) {
            document.getElementById("province-name").textContent = properties.name || "Unknown";
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

            const countries = getCountries();
            const counts = getProvinceCountsByCountry();
            const topCountries = Object.entries(counts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5);

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
                    Total provinces: ${state.provinces ? state.provinces.features.length : 0}<br>
                    Countries: ${countries.length}
                </p>
                <p style="margin-top: 10px; font-size: 0.85rem;">
                    <strong>Top 5 by provinces:</strong><br>
                    ${topCountries.map(([c, n]) => `${c}: ${n}`).join('<br>')}
                </p>
            `;
            return;
        }

        nameEl.textContent = properties.name || "Unknown Province";

        detailsEl.innerHTML = `
            <div class="detail-row">
                <span class="detail-label">Country</span>
                <span class="detail-value">${properties.admin || "Unknown"}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">ISO Code</span>
                <span class="detail-value">${properties.iso_3166_2 || properties.iso_a2 || "N/A"}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Type</span>
                <span class="detail-value">${properties.type_en || properties.type || "N/A"}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Province ID</span>
                <span class="detail-value" style="font-family: monospace; font-size: 0.8rem;">${properties.id || "N/A"}</span>
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
            if (state.loading) return;

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
        if (state.map && state.map.selectedProvince) {
            const el = document.querySelector(`[data-id="${state.map.selectedProvince}"]`);
            if (el) el.classList.remove("selected");
            state.map.selectedProvince = null;
        }
        state.selectedProvince = null;
        updateInfoPanel(null);
    }

    /**
     * Navigate to a specific country
     */
    window.navigateToCountry = function(countryName) {
        const provinces = getProvincesByCountry(countryName);
        if (provinces.length === 0) return;

        // Calculate bounding box
        let minLng = Infinity, maxLng = -Infinity;
        let minLat = Infinity, maxLat = -Infinity;

        provinces.forEach(p => {
            const bounds = d3.geoBounds(p);
            minLng = Math.min(minLng, bounds[0][0]);
            maxLng = Math.max(maxLng, bounds[1][0]);
            minLat = Math.min(minLat, bounds[0][1]);
            maxLat = Math.max(maxLat, bounds[1][1]);
        });

        const centerLng = (minLng + maxLng) / 2;
        const centerLat = (minLat + maxLat) / 2;

        state.map.centerOn(centerLng, centerLat, 3);
    };

    /**
     * Highlight all provinces in a country
     */
    window.highlightCountry = function(countryName) {
        state.map.highlightProvinces(props =>
            props.admin === countryName || props.iso_a2 === countryName
        );
    };

    /**
     * Clear highlights
     */
    window.clearHighlight = function() {
        state.map.clearHighlights();
    };

    // Initialize when DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();
