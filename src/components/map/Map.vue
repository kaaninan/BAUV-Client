<template>
	<Modal :show="showModal" @close-window="showModal = false">
		<MapSettings
			@go-coords="goCoords"
			@go-bounds="goBounds"
			@close-window="showModal = false"
		/>
	</Modal>

	<div class="_containerMap" data-aos="fade">
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
				<div class="floatItemText">
					HEADING
					{{ parseFloat($store.state.data.heading).toFixed(2) }}°
				</div>
				<div class="floatItemText">
					DEPTH {{ parseFloat($store.state.data.depth).toFixed(2) }}°
					m
				</div>
				<div class="floatItemText">
					ALTITUDE
					{{ parseFloat($store.state.data.altitude).toFixed(2) }}° m
				</div>
				<div class="floatItemText">
					ROLL {{ parseFloat($store.state.data.roll).toFixed(2) }}° -
					PITCH {{ parseFloat($store.state.data.pitch).toFixed(2) }}°°
				</div>
				<div class="floatItemText">
					SEAFLOOR VEL.
					{{
						parseFloat(
							$store.state.data.sea_floor_velocity
						).toFixed(2)
					}}° m/s
				</div>
				<div class="floatItemText">
					BODY VEL.
					{{
						parseFloat($store.state.data.body_velocity).toFixed(2)
					}}° m/s
				</div>
			</div>
		</div>

		<div class="floatBottomLeft">
			<div class="floatItem">
				<div class="floatItemText">
					LAT
					{{ parseFloat($store.state.data.latitude).toFixed(0) }}° -
					LON
					{{ parseFloat($store.state.data.longitude).toFixed(0) }}°
				</div>
				<div class="floatItemText">
					NORTH {{ parseFloat($store.state.data.north).toFixed(0) }} m
					- EAST {{ parseFloat($store.state.data.east).toFixed(0) }} m
				</div>
				<div class="floatItemText">
					ROLL RATE
					{{ parseFloat($store.state.data.roll_rate).toFixed(1) }} °/s
				</div>
				<div class="floatItemText">
					PITCH RATE
					{{ parseFloat($store.state.data.pitch_rate).toFixed(1) }}
					°/s
				</div>
			</div>
		</div>

		<div class="floatBottomRight">
			<div class="floatItem">
				<div class="floatItemText">DATE {{ localDate }}</div>
				<div class="floatItemText">LOCAL TIME {{ localTime }}</div>
				<div class="floatItemText">MISSION TIME 00:10:12</div>
			</div>
		</div>
	</div>
</template>

<script>
import { toRaw } from 'vue'
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
			showModal: false,

			localDate: '-',
			localTime: '-'
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
			handler: function () {
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

		this.timeInterval = setInterval(() => {
			this.setDate()
		}, 1000)

		// Load Map Icons
		let icons = [
			'NChart-Symbol_INT_Rock_Awash',
			'NChart-Symbol_INT_Rock_CoverUncover',
			'NChart-Symbol_INT_Rock_Underwater',
			'NChart-Symbol_INT_Lighted_BarrelBuoy_Green',
			'NChart-Symbol_INT_Lighted_Beacon',
			'NChart-Symbol_INT_Wreck',
			'NChart-Symbol_INT_Beacon_Cardinal_East',
			'NChart-Symbol_INT_Beacon_Cardinal_West'
		]
		this.loadIcons(icons)

		// Load Maps
		this.map.on('load', () => {
			this.loadMaps()
		})
	},

	unmounted() {
		clearInterval(this.timeInterval)
	},

	methods: {
		openSettings() {
			this.showModal = true
		},
		loadMaps() {
			// remove this.mapLayers layers from map
			this.mapLayers.forEach((item) => {
				this.map.removeLayer(item)
				this.mapLayers = this.mapLayers.filter((map) => map !== item)
			})

			// remove this.mapSources sources from map
			this.mapSources.forEach((item) => {
				this.map.removeSource(item)
				this.mapSources = this.mapSources.filter((map) => map !== item)
			})

			this.getMaps.forEach(async (item) => {
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

					// Fetch Layers
					let layers = []
					const layersResponse = await fetch(
						'http://' +
							this.$store.state.mapServerIP +
							':' +
							this.$store.state.mapServerPort +
							'/data/' +
							item.id +
							'.json'
					)
					const layersJson = await layersResponse.json()
					layersJson.vector_layers.forEach((a) => {
						layers.push(a.id)
					})

					if (layers.find((a) => a === 'ROADWY') !== undefined) {
						this.map.addLayer({
							id: 'ROADWY-' + item.id,
							'source-layer': 'ROADWY',
							type: 'line',
							source: item.id,
							layout: {},
							paint: { 'line-color': '#bb9a45' }
						})
						this.mapLayers.push('ROADWY-' + item.id)
					}

					if (layers.find((a) => a === 'LNDARE') !== undefined) {
						this.map.addLayer({
							id: 'LNDARE-' + item.id,
							'source-layer': 'LNDARE',
							type: 'fill',
							source: item.id,
							paint: {
								'fill-color': 'hsl(35, 100%, 66%)',
								'fill-opacity': 0.3
							}
						})
						this.mapLayers.push('LNDARE-' + item.id)
					}

					if (layers.find((a) => a === 'DEPARE') !== undefined) {
						this.map.addLayer({
							id: 'DEPARE-' + item.id,
							'source-layer': 'DEPARE',
							type: 'fill',
							source: item.id,
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
					}

					if (layers.find((a) => a === 'LIGHTS') !== undefined) {
						this.map.addLayer({
							id: 'LIGHTS-' + item.id,
							'source-layer': 'LIGHTS',
							type: 'symbol',
							source: item.id,
							layout: {
								'icon-image':
									'NChart-Symbol_INT_Lighted_Beacon',
								'icon-size': 0.12,
								'icon-allow-overlap': true
							}
						})
						this.mapLayers.push('LIGHTS-' + item.id)
					}

					if (layers.find((a) => a === 'SOUNDG') !== undefined) {
						this.map.addLayer({
							id: 'SOUNDG-' + item.id,
							'source-layer': 'SOUNDG',
							type: 'symbol',
							source: item.id,
							layout: {
								'text-field': ['to-string', ['get', 'DEPTH']],
								'text-size': 11
							},
							paint: {}
						})
						this.mapLayers.push('SOUNDG-' + item.id)
					}

					if (layers.find((a) => a === 'BRIDGE') !== undefined) {
						this.map.addLayer({
							id: 'BRIDGE-' + item.id,
							'source-layer': 'BRIDGE',
							type: 'line',
							source: item.id,
							layout: {},
							paint: { 'line-color': '#677679', 'line-width': 2 }
						})
						this.mapLayers.push('BRIDGE-' + item.id)
					}

					if (layers.find((a) => a === 'BUARE') !== undefined) {
						this.map.addLayer({
							id: 'BUARE-' + item.id,
							'source-layer': 'BUAARE',
							type: 'fill',
							source: item.id,
							layout: {},
							paint: {
								'fill-color': '#B19139',
								'fill-opacity': 0.2
							}
						})
						this.mapLayers.push('BUARE-' + item.id)
					}

					if (layers.find((a) => a === 'COALNE') !== undefined) {
						this.map.addLayer({
							id: 'COALNE-' + item.id,
							'source-layer': 'COALNE',
							type: 'line',
							source: item.id,
							layout: { 'line-join': 'round' },
							paint: {}
						})
						this.mapLayers.push('COALNE-' + item.id)
					}

					if (layers.find((a) => a === 'DEPCNT') !== undefined) {
						this.map.addLayer({
							id: 'DEPCNT-' + item.id,
							'source-layer': 'DEPCNT',
							type: 'line',
							source: item.id,
							layout: {},
							paint: {
								'line-color': '#0000FF',
								'line-dasharray': [1, 2]
							}
						})
						this.mapLayers.push('DEPCNT-' + item.id)
					}

					if (layers.find((a) => a === 'WRECKS') !== undefined) {
						this.map.addLayer({
							id: 'WRECKS-' + item.id,
							'source-layer': 'WRECKS',
							type: 'symbol',
							source: item.id,
							layout: {
								'icon-image': 'NChart-Symbol_INT_Wreck',
								'icon-size': 0.18,
								'icon-allow-overlap': true
							},
							paint: {}
						})
						this.mapLayers.push('WRECKS-' + item.id)
					}

					if (layers.find((a) => a === 'UWTROC') !== undefined) {
						this.map.addLayer({
							id: 'UWTROC-' + item.id,
							'source-layer': 'UWTROC',
							type: 'symbol',
							source: item.id,
							layout: {
								'icon-image': [
									'match',
									['get', 'WATLEV'],
									[2, 5],
									'NChart-Symbol_INT_Rock_Awash',
									[1, 4, 6],
									'NChart-Symbol_INT_Rock_CoverUncover',
									[3],
									'NChart-Symbol_INT_Rock_Underwater',
									''
								],
								'icon-size': 0.3
							},
							paint: {}
						})
						this.mapLayers.push('UWTROC-' + item.id)
					}

					if (layers.find((a) => a === 'SILTNK') !== undefined) {
						this.map.addLayer({
							id: 'SILTNK-' + item.id,
							'source-layer': 'SILTNK',
							source: item.id,
							type: 'circle',
							minzoom: 12,
							layout: {},
							paint: {
								'circle-color': 'hsla(0, 0%, 0%, 0)',
								'circle-stroke-color': '#906b26',
								'circle-stroke-width': 2,
								'circle-radius': [
									'interpolate',
									['linear'],
									['zoom'],
									12,
									0.1,
									22,
									18
								]
							}
						})
						this.mapLayers.push('SILTNK-' + item.id)
					}

					if (layers.find((a) => a === 'PIPSOL') !== undefined) {
						this.map.addLayer({
							id: 'PIPSOL-' + item.id,
							'source-layer': 'PIPSOL',
							source: item.id,
							type: 'line',
							layout: { 'line-miter-limit': 1 },
							paint: {
								'line-width': 2,
								'line-offset': 10,
								'line-color': 'hsl(115, 69%, 52%)',
								'line-dasharray': [2, 3]
							}
						})
						this.mapLayers.push('PIPSOL-' + item.id)
					}

					if (layers.find((a) => a === 'BOYCAR') !== undefined) {
						this.map.addLayer({
							id: 'BOYCAR-' + item.id,
							'source-layer': 'BOYCAR',
							source: item.id,
							type: 'symbol',
							layout: {
								'icon-image': [
									'match',
									['get', 'CATCAM'],
									[1],
									'NChart-Symbol_INT_Beacon_Cardinal_North2',
									[2],
									'NChart-Symbol_INT_Beacon_Cardinal_East',
									[3],
									'NChart-Symbol_INT_Beacon_Cardinal_South2',
									[4],
									'NChart-Symbol_INT_Beacon_Cardinal_West',
									''
								],
								'icon-size': 0.2
							},
							paint: {}
						})
						this.mapLayers.push('BOYCAR-' + item.id)
					}
				}
			})
		},
		loadIcons(items) {
			items.forEach((item) => {
				this.map.loadImage(
					'http://' +
						this.$store.state.mapServerIP +
						':' +
						this.$store.state.mapServerPortSVG +
						'/static/png/' +
						item +
						'.png',
					(error, image) => {
						if (error) {
							console.log('Error', error)
						} else {
							if (!this.map.hasImage(item)) {
								this.map.addImage(item, image)
							}
						}
					}
				)
			})
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
		},
		setDate() {
			// Format 15-04-23
			let date = new Date()
			let year = date.getFullYear().toString().substr(-2)
			let month = ('0' + (date.getMonth() + 1)).slice(-2)
			let day = ('0' + date.getDate()).slice(-2)
			this.localDate = day + '-' + month + '-' + year
			// Format 12:00:00
			let hours = ('0' + date.getHours()).slice(-2)
			let minutes = ('0' + date.getMinutes()).slice(-2)
			let seconds = ('0' + date.getSeconds()).slice(-2)
			this.localTime = hours + ':' + minutes + ':' + seconds
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
