<template>
	<Modal :show="showModal" @close-window="showModal = false">
		<MapSettings @go-coords="goCoords" @go-bounds="goBounds" />
	</Modal>

	<div class="_containerMap">
		<div class="_block_title">
			<span>MAP</span>
			<div class="_block_title_right" @click="openSettings">
				<i
					class="fa fa-cog"
					style="font-size: 18px"
					aria-hidden="true"
				/>
			</div>
		</div>

		<!-- <div id="map" style="height: calc(100% - 41px)" /> -->
		<div id="map" style="height: 790px" />

		<div class="floatTopLeft">
			<div class="floatItem">
				<div class="floatItemText">HEADING 63°</div>
				<div class="floatItemText">DEPTH 10 m</div>
				<div class="floatItemText">ALTITUDE 10 m</div>
				<div class="floatItemText">ROLL 14° - PITCH -2°</div>
				<div class="floatItemText">SEAFLOOR VEL. 5 m/s</div>
				<div class="floatItemText">BODY VEL. 8 m/s</div>
			</div>
		</div>

		<div class="floatBottomLeft">
			<div class="floatItem">
				<div class="floatItemText">LAT 41° - LON 28°</div>
				<div class="floatItemText">NORTH 10 m - EAST 20 m</div>
				<div class="floatItemText">ROLL RATE 1.2 °/s</div>
				<div class="floatItemText">PITCH RATE 0.5 °/s</div>
			</div>
		</div>

		<div class="floatBottomRight">
			<div class="floatItem">
				<div class="floatItemText">DATE 15-04-23</div>
				<div class="floatItemText">LOCAL TIME 12:00:00</div>
				<div class="floatItemText">MISSION TIME 00:10:12</div>
			</div>
		</div>
	</div>
</template>

<script>
import maplibregl from 'maplibre-gl'
import Modal from '@/components/common/Modal.vue'
import MapSettings from '@/components/map/MapSettings.vue'
import layers from './layers'

export default {
	name: 'App',

	data() {
		return {
			map: null,
			mapLayers: [],
			mapSources: [],
			showModal: false
		}
	},

	components: {
		Modal,
		MapSettings
	},

	computed: {
		getMaps() {
			return this.$store.state.selectedMaps
		}
	},

	watch: {
		// check getMaps changes
		getMaps: {
			handler: function (val) {
				console.log('changes')
				this.loadMaps()
			},
			deep: true
		}
	},

	mounted() {
		// Setup Base Map
		this.map = new maplibregl.Map({
			container: 'map',
			style: {
				version: 8,
				name: 'Basic',
				metadata: {
					'openmaptiles:version': '3.x'
				},
				sources: {
					openmaptiles: {
						type: 'vector',
						url:
							'http://' +
							this.$store.state.mapServerIP +
							':' +
							this.$store.state.mapServerPort +
							'/data/turkey-osm.json'
					}
				},
				glyphs:
					'http://' +
					this.$store.state.mapServerIP +
					':' +
					this.$store.state.mapServerPort +
					'/fonts/{fontstack}/{range}.pbf',
				layers: layers,
				id: 'basic'
			},
			center: [29.00875, 41.04182],
			zoom: 12
		})

		// Load Map Icons
		// this.map.loadImage(
		// 	'http://' +
		// 		this.$store.state.mapServerIP +
		// 		':' +
		// 		this.$store.state.mapServerPortSVG +
		// 		'/static/png/NChart-Symbol_INT_Lighted_BarrelBuoy_Green.png',
		// 	function (error, image) {
		// 		if (error) {
		// 			console.log(error)
		// 		} else {
		// 			if (!this.map.hasImage('NChart-Symbol_INT_Light'))
		// 				this.map.addImage('NChart-Symbol_INT_Light', image)
		// 		}
		// 	}
		// )

		// Load Maps
		this.map.on('load', () => {
			this.loadMaps()
		})
	},

	methods: {
		openSettings() {
			this.showModal = true
		},
		loadMaps() {
			// remove this.mapLayers layers from map
			this.mapLayers.forEach((item) => {
				console.log('removing layer', item)
				console.log(this.map.getStyle().layers)
				this.map.removeLayer(item)
				this.mapLayers = this.mapLayers.filter((map) => map !== item)
				console.log('removing', item, this.mapLayers)
			})

			// remove this.mapSources sources from map
			this.mapSources.forEach((item) => {
				console.log('removing source', item)
				this.map.removeSource(item)
				this.mapSources = this.mapSources.filter((map) => map !== item)
				console.log('removing', item, this.mapSources)
			})

			this.getMaps.forEach((item) => {
				console.log('adding', item.id)
				if (item.id.startsWith('G')) {
					// Raster Tile
					this.map.addSource(item.id, {
						tiles: item.tiles,
						name: item.name,
						format: item.format,
						basename: item.basename,
						id: item.id,
						tileSize: 64,
						type: 'raster',
						description: item.description,
						version: item.version,
						minzoom: item.minzoom,
						maxzoom: item.maxzoom,
						bounds: item.bounds,
						center: item.center,
						tilejson: item.tilejson
					})
					this.mapSources.push(item.id)

					this.map.addLayer({
						id: item.id,
						type: 'raster',
						source: item.id
					})
					this.mapLayers.push(item.id)
				} else {
					// Vector Tile
					console.log(item)
					this.map.addSource(item.id, {
						type: 'vector',
						url:
							'http://' +
							this.$store.state.mapServerIP +
							':' +
							this.$store.state.mapServerPort +
							'/data/' +
							item.id +
							'.json'
					})
					this.mapSources.push(item.id)

					this.map.addLayer({
						id: 'ROADWY-' + item.id,
						type: 'line',
						source: item.id,
						'source-layer': 'ROADWY',
						layout: {},
						paint: { 'line-color': '#bb9a45' }
					})
					this.mapLayers.push('ROADWY-' + item.id)
					this.map.addLayer({
						id: 'LNDARE-' + item.id,
						type: 'fill',
						source: item.id,
						'source-layer': 'LNDARE',
						paint: {
							'fill-color': 'hsl(35, 100%, 66%)',
							'fill-opacity': 0.3
						}
					})
					this.mapLayers.push('LNDARE-' + item.id)

					this.map.addLayer({
						id: 'DEPARE-' + item.id,
						type: 'fill',
						source: item.id,
						'source-layer': 'DEPARE',
						layout: {},
						paint: {
							'fill-color': [
								'interpolate',
								['linear'],
								['get', 'DRVAL1'],
								0,
								'#d3beb3',
								3,
								'#dbe9f6',
								5,
								'#bed7ec',
								10,
								'#8ec1dd',
								20,
								'#5aa2cf',
								30,
								'#3181bd',
								50,
								'#105ca4',
								100,
								'#08306b'
							]
						}
					})
					this.mapLayers.push('DEPARE-' + item.id)

					this.map.addLayer({
						id: 'LIGHTS-' + item.id,
						type: 'symbol',
						source: item.id,
						'source-layer': 'LIGHTS',
						layout: {
							'icon-image': 'NChart-Symbol_INT_Light',
							'icon-size': 0.12,
							'icon-allow-overlap': true
						}
					})
					this.mapLayers.push('LIGHTS-' + item.id)

					this.map.addLayer({
						id: 'SOUNDG-' + item.id,
						type: 'symbol',
						source: item.id,
						'source-layer': 'SOUNDG',
						layout: {
							'text-field': ['to-string', ['get', 'DEPTH']],
							'text-size': 11
						},
						paint: {}
					})
					this.mapLayers.push('SOUNDG-' + item.id)

					this.map.addLayer({
						id: 'BRIDGE-' + item.id,
						type: 'line',
						source: item.id,
						'source-layer': 'BRIDGE',
						layout: {},
						paint: { 'line-color': '#677679', 'line-width': 2 }
					})
					this.mapLayers.push('BRIDGE-' + item.id)

					this.map.addLayer({
						id: 'BUARE-' + item.id,
						type: 'fill',
						source: item.id,
						'source-layer': 'BUAARE',
						layout: {},
						paint: { 'fill-color': '#B19139', 'fill-opacity': 0.2 }
					})
					this.mapLayers.push('BUARE-' + item.id)

					// {
					// 	"id": "coalne-9kmgqb",
					// 	"type": "line",
					// 	"source": "composite",
					// 	"source-layer": "COALNE-9kmgqb",
					// 	"layout": {"line-join": "round"},
					// 	"paint": {}
					// },
					// {
					// 	"id": "depcnt-ahk90t",
					// 	"type": "line",
					// 	"source": "composite",
					// 	"source-layer": "DEPCNT-ahk90t",
					// 	"layout": {},
					// 	"paint": {"line-color": "#0000FF", "line-dasharray": [1, 2]}
					// },
					// {
					// 	"id": "wrecks-5pswhz",
					// 	"type": "symbol",
					// 	"source": "composite",
					// 	"source-layer": "WRECKS-5pswhz",
					// 	"layout": {
					// 		"icon-image": "NChart-Symbol_INT_Wreck",
					// 		"icon-size": 0.18,
					// 		"icon-allow-overlap": true
					// 	},
					// 	"paint": {}
					// },
					// {
					// 	"id": "uwtroc-371hqk",
					// 	"type": "symbol",
					// 	"source": "composite",
					// 	"source-layer": "UWTROC-371hqk",
					// 	"layout": {
					// 		"icon-image": [
					// 			"match",
					// 			["get", "WATLEV"],
					// 			[2, 5],
					// 			"NChart-Symbol_INT_Rock_Awash",
					// 			[1, 4, 6],
					// 			"NChart-Symbol_INT_Rock_CoverUncover",
					// 			[3],
					// 			"NChart-Symbol_INT_Rock_Underwater",
					// 			""
					// 		],
					// 		"icon-size": 0.5
					// 	},
					// 	"paint": {}
					// },
					// {
					// 	"id": "siltnk-0xv0ll",
					// 	"type": "circle",
					// 	"source": "composite",
					// 	"source-layer": "SILTNK-0xv0ll",
					// 	"minzoom": 12,
					// 	"layout": {},
					// 	"paint": {
					// 		"circle-color": "hsla(0, 0%, 0%, 0)",
					// 		"circle-stroke-color": "#906b26",
					// 		"circle-stroke-width": 2,
					// 		"circle-radius": [
					// 			"interpolate",
					// 			["linear"],
					// 			["zoom"],
					// 			12,
					// 			0.1,
					// 			22,
					// 			18
					// 		]
					// 	}
					// },
					// {
					// 	"id": "pipsol-davvbn",
					// 	"type": "line",
					// 	"source": "composite",
					// 	"source-layer": "PIPSOL-davvbn",
					// 	"layout": {"line-miter-limit": 1},
					// 	"paint": {
					// 		"line-width": 2,
					// 		"line-offset": 10,
					// 		"line-color": "hsl(115, 69%, 52%)",
					// 		"line-dasharray": [2, 3]
					// 	}
					// },
					// {
					// 	"id": "boycar-3iwq2s",
					// 	"type": "symbol",
					// 	"source": "composite",
					// 	"source-layer": "BOYCAR-3iwq2s",
					// 	"layout": {
					// 		"icon-image": [
					// 			"match",
					// 			["get", "CATCAM"],
					// 			[1],
					// 			"NChart-Symbol_INT_Beacon_Cardinal_North2",
					// 			[2],
					// 			"NChart-Symbol_INT_Beacon_Cardinal_East",
					// 			[3],
					// 			"NChart-Symbol_INT_Beacon_Cardinal_South2",
					// 			[4],
					// 			"NChart-Symbol_INT_Beacon_Cardinal_West",
					// 			""
					// 		],
					// 		"icon-size": 0.2
					// 	},
					// 	"paint": {}
					// },
				}
			})
			console.log('showing maps', this.mapLayers)
		},
		goCoords(lat, long, zoom) {
			console.log('go coords', lat, long, zoom)
			this.map.flyTo({
				center: [long, lat],
				zoom: zoom
			})
		},
		goBounds(bounds) {
			console.log('go bounds', bounds)
			this.map.fitBounds(bounds, {
				padding: {
					top: 10,
					bottom: 10,
					left: 10,
					right: 10
				}
			})
		}
	}
}
</script>

<style scoped>
._containerMap {
	width: 100%;
	height: calc(100% - 2px);
	position: relative;
	border: 1px solid var(--border-color);
	background-color: var(--block-background-color);
	margin-right: var(--block-margin);
}

.floatTopLeft {
	background-color: rgba(0, 0, 0, 0.6);
	padding: 12px;
	position: absolute;
	top: 80px;
	right: 40px;
	z-index: 1000;
	color: white;
}

.floatBottomLeft {
	background-color: rgba(0, 0, 0, 0.6);
	padding: 12px;
	position: absolute;
	bottom: 40px;
	right: 40px;
	z-index: 1000;
	color: white;
}
.floatBottomRight {
	background-color: rgba(0, 0, 0, 0.6);
	padding: 12px;
	position: absolute;
	bottom: 40px;
	left: 40px;
	z-index: 1000;
	color: white;
}

.floatItemText {
	padding: 5px 0;
}
</style>
