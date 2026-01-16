/**
 * Map Rendering Module
 * Handles D3.js map projection, rendering, and interactions
 */

class WorldMap {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.options = {
            width: options.width || window.innerWidth - 300,
            height: options.height || window.innerHeight - 100,
            initialScale: options.initialScale || 200,
            initialCenter: options.initialCenter || [0, 30],
            minZoom: options.minZoom || 0.5,
            maxZoom: options.maxZoom || 20,
            ...options
        };

        this.svg = null;
        this.g = null;
        this.projection = null;
        this.path = null;
        this.zoom = null;
        this.currentZoom = 1;

        this.selectedProvince = null;
        this.hoveredProvince = null;

        // Event callbacks
        this.onProvinceSelect = options.onProvinceSelect || (() => {});
        this.onProvinceHover = options.onProvinceHover || (() => {});
        this.onZoomChange = options.onZoomChange || (() => {});

        this.init();
    }

    init() {
        // Create SVG
        this.svg = d3.select(`#${this.containerId}`)
            .attr("width", this.options.width)
            .attr("height", this.options.height);

        // Create main group for zoom/pan
        this.g = this.svg.append("g");

        // Set up projection (Equirectangular)
        this.projection = d3.geoEquirectangular()
            .scale(this.options.initialScale)
            .center(this.options.initialCenter)
            .translate([this.options.width / 2, this.options.height / 2]);

        // Create path generator
        this.path = d3.geoPath().projection(this.projection);

        // Set up zoom behavior with faster wheel zoom
        this.zoom = d3.zoom()
            .scaleExtent([this.options.minZoom, this.options.maxZoom])
            .wheelDelta((event) => -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * 2)
            .on("zoom", (event) => this.handleZoom(event));

        this.svg.call(this.zoom);

        // Add ocean background
        this.g.append("rect")
            .attr("class", "ocean")
            .attr("width", this.options.width * 3)
            .attr("height", this.options.height * 3)
            .attr("x", -this.options.width)
            .attr("y", -this.options.height);

        // Add graticule (latitude/longitude lines)
        this.addGraticule();

        // Set up resize handler
        window.addEventListener("resize", () => this.handleResize());
    }

    addGraticule() {
        const graticule = d3.geoGraticule()
            .step([20, 20]);

        this.g.append("path")
            .datum(graticule)
            .attr("class", "graticule")
            .attr("d", this.path);
    }

    /**
     * Render country base layer from GeoJSON data
     */
    renderCountries(countryData) {
        // Remove existing countries
        this.g.selectAll(".country").remove();

        // Add countries as base layer
        this.g.selectAll(".country")
            .data(countryData.features)
            .enter()
            .append("path")
            .attr("class", "country")
            .attr("d", this.path)
            .attr("data-name", d => d.properties.name);

        return this;
    }

    /**
     * Render provinces from GeoJSON data
     */
    renderProvinces(provinceData) {
        // Remove existing provinces
        this.g.selectAll(".province").remove();

        // Create a color scale for countries
        const countries = [...new Set(provinceData.features.map(f => f.properties.admin))];
        const colorScale = d3.scaleOrdinal()
            .domain(countries)
            .range(this.generateCountryColors(countries.length));

        // Add provinces
        this.g.selectAll(".province")
            .data(provinceData.features)
            .enter()
            .append("path")
            .attr("class", "province")
            .attr("d", this.path)
            .attr("data-id", d => d.properties.id)
            .attr("data-country", d => d.properties.admin)
            .style("fill", d => colorScale(d.properties.admin))
            .on("click", (event, d) => this.handleProvinceClick(event, d))
            .on("mouseenter", (event, d) => this.handleProvinceMouseEnter(event, d))
            .on("mouseleave", (event, d) => this.handleProvinceMouseLeave(event, d));

        return this;
    }

    /**
     * Generate visually distinct colors for countries
     */
    generateCountryColors(count) {
        const baseColors = [
            "#4a6670", "#5c7a5c", "#6b5c5c", "#5c5c6b", "#6b6b5c",
            "#5c6b6b", "#6b5c6b", "#5c6b5c", "#6b6b6b", "#5c5c5c",
            "#4a5c6b", "#6b5c4a", "#4a6b5c", "#5c4a6b", "#6b4a5c",
            "#4a6b6b", "#6b6b4a", "#6b4a6b", "#4a5c5c", "#5c6b4a"
        ];
        // Repeat colors if needed
        const colors = [];
        for (let i = 0; i < count; i++) {
            colors.push(baseColors[i % baseColors.length]);
        }
        return colors;
    }

    /**
     * Load and render world base map from TopoJSON/GeoJSON URL
     */
    async loadWorldMap(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();

            let countries;
            if (data.type === "Topology") {
                // TopoJSON format
                countries = topojson.feature(data, data.objects.countries || data.objects.land);
            } else {
                // GeoJSON format
                countries = data;
            }

            this.g.selectAll(".country-base")
                .data(countries.features || [countries])
                .enter()
                .append("path")
                .attr("class", "country-base")
                .attr("d", this.path)
                .style("fill", "#2d4a4a")
                .style("stroke", "#1a2d2d")
                .style("stroke-width", "0.5px");

            return this;
        } catch (error) {
            console.warn("Could not load world map:", error);
            return this;
        }
    }

    /**
     * Handle zoom events
     */
    handleZoom(event) {
        this.g.attr("transform", event.transform);
        this.currentZoom = event.transform.k;
        this.onZoomChange(this.currentZoom);

        // Adjust stroke width based on zoom
        this.g.selectAll(".province")
            .style("stroke-width", `${0.5 / this.currentZoom}px`);
    }

    /**
     * Handle province click
     */
    handleProvinceClick(event, d) {
        event.stopPropagation();

        // Deselect previous
        if (this.selectedProvince) {
            this.g.select(`[data-id="${this.selectedProvince}"]`)
                .classed("selected", false);
        }

        // Select new
        this.selectedProvince = d.properties.id;
        d3.select(event.target).classed("selected", true);

        this.onProvinceSelect(d.properties, d);
    }

    /**
     * Handle province mouse enter
     */
    handleProvinceMouseEnter(event, d) {
        this.hoveredProvince = d.properties.id;
        this.onProvinceHover(d.properties, d, true);
    }

    /**
     * Handle province mouse leave
     */
    handleProvinceMouseLeave(event, d) {
        this.hoveredProvince = null;
        this.onProvinceHover(d.properties, d, false);
    }

    /**
     * Handle window resize
     */
    handleResize() {
        const container = document.getElementById("map-container");
        this.options.width = container.clientWidth;
        this.options.height = container.clientHeight;

        this.svg
            .attr("width", this.options.width)
            .attr("height", this.options.height);

        this.projection.translate([this.options.width / 2, this.options.height / 2]);

        // Update all paths
        this.g.selectAll("path").attr("d", this.path);
    }

    /**
     * Zoom controls
     */
    zoomIn() {
        this.svg.transition()
            .duration(300)
            .call(this.zoom.scaleBy, 1.5);
    }

    zoomOut() {
        this.svg.transition()
            .duration(300)
            .call(this.zoom.scaleBy, 0.67);
    }

    resetView() {
        this.svg.transition()
            .duration(500)
            .call(this.zoom.transform, d3.zoomIdentity);
    }

    /**
     * Center map on a specific location
     */
    centerOn(longitude, latitude, scale = null) {
        const x = this.options.width / 2;
        const y = this.options.height / 2;
        const [px, py] = this.projection([longitude, latitude]);

        const transform = d3.zoomIdentity
            .translate(x - px * (scale || this.currentZoom), y - py * (scale || this.currentZoom))
            .scale(scale || this.currentZoom);

        this.svg.transition()
            .duration(750)
            .call(this.zoom.transform, transform);
    }

    /**
     * Center on a province
     */
    centerOnProvince(provinceId, scale = 4) {
        const province = this.g.select(`[data-id="${provinceId}"]`);
        if (province.empty()) return;

        const bounds = this.path.bounds(province.datum());
        const centerX = (bounds[0][0] + bounds[1][0]) / 2;
        const centerY = (bounds[0][1] + bounds[1][1]) / 2;

        // Convert screen coordinates back to geo coordinates
        const center = this.projection.invert([centerX, centerY]);

        this.centerOn(center[0], center[1], scale);
    }

    /**
     * Highlight provinces by criteria
     */
    highlightProvinces(filter, className = "highlighted") {
        this.g.selectAll(".province")
            .classed(className, d => filter(d.properties));
    }

    /**
     * Clear all highlights
     */
    clearHighlights(className = "highlighted") {
        this.g.selectAll(".province")
            .classed(className, false);
    }

    /**
     * Set province ownership/faction
     */
    setProvinceFaction(provinceId, faction) {
        const province = this.g.select(`[data-id="${provinceId}"]`);
        if (province.empty()) return;

        // Remove all faction classes
        province.attr("class", function() {
            return d3.select(this).attr("class")
                .replace(/faction-\w+/g, "")
                .trim();
        });

        // Add new faction class
        if (faction) {
            province.classed(`faction-${faction}`, true);
        }
    }

    /**
     * Get current map bounds
     */
    getBounds() {
        const transform = d3.zoomTransform(this.svg.node());
        const topLeft = this.projection.invert([
            -transform.x / transform.k,
            -transform.y / transform.k
        ]);
        const bottomRight = this.projection.invert([
            (this.options.width - transform.x) / transform.k,
            (this.options.height - transform.y) / transform.k
        ]);
        return { topLeft, bottomRight };
    }

    /**
     * Convert screen coordinates to geo coordinates
     */
    screenToGeo(x, y) {
        const transform = d3.zoomTransform(this.svg.node());
        const adjustedX = (x - transform.x) / transform.k;
        const adjustedY = (y - transform.y) / transform.k;
        return this.projection.invert([adjustedX, adjustedY]);
    }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
    module.exports = WorldMap;
}
