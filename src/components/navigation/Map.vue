<template>
	<div class="card">
		<div class="card-header" style="height: 40px">
			<h3 class="card-title">Map</h3>
		</div>
		<div class="card-body p-0">
			<div id="map" style="height: 700px" />
		</div>
		<!-- <div class="floatTopLeft">
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
		</div> -->
	</div>
</template>

<script>
import maplibregl from 'maplibre-gl'

export default {
	name: 'App',

	mounted() {
		// Create map
		const map = new maplibregl.Map({
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
						url: 'http://localhost:8000/data/turkey-osm.json'
					}
				},
				glyphs: 'http://localhost:8000/fonts/{fontstack}/{range}.pbf',
				layers: [
					{
						id: 'background',
						type: 'background',
						paint: { 'background-color': 'hsl(47, 26%, 88%)' }
					},
					{
						id: 'landuse-residential',
						type: 'fill',
						source: 'openmaptiles',
						'source-layer': 'landuse',
						filter: [
							'all',
							['==', '$type', 'Polygon'],
							[
								'in',
								'class',
								'residential',
								'suburb',
								'neighbourhood'
							]
						],
						layout: { visibility: 'visible' },
						paint: {
							'fill-color': 'hsl(47, 13%, 86%)',
							'fill-opacity': 0.7
						}
					},
					{
						id: 'landcover_grass',
						type: 'fill',
						source: 'openmaptiles',
						'source-layer': 'landcover',
						filter: ['==', 'class', 'grass'],
						paint: {
							'fill-color': 'hsl(82, 46%, 72%)',
							'fill-opacity': 0.45
						}
					},
					{
						id: 'landcover_wood',
						type: 'fill',
						source: 'openmaptiles',
						'source-layer': 'landcover',
						filter: ['==', 'class', 'wood'],
						paint: {
							'fill-color': 'hsl(82, 46%, 72%)',
							'fill-opacity': {
								base: 1,
								stops: [
									[8, 0.6],
									[22, 1]
								]
							}
						}
					},
					{
						id: 'water',
						type: 'fill',
						source: 'openmaptiles',
						'source-layer': 'water',
						filter: [
							'all',
							['==', '$type', 'Polygon'],
							['!=', 'intermittent', 1],
							['!=', 'brunnel', 'tunnel']
						],
						layout: { visibility: 'visible' },
						paint: { 'fill-color': 'hsl(205, 56%, 73%)' }
					},
					{
						id: 'water_intermittent',
						type: 'fill',
						source: 'openmaptiles',
						'source-layer': 'water',
						filter: [
							'all',
							['==', '$type', 'Polygon'],
							['==', 'intermittent', 1]
						],
						layout: { visibility: 'visible' },
						paint: {
							'fill-color': 'hsl(205, 56%, 73%)',
							'fill-opacity': 0.7
						}
					},
					{
						id: 'landcover-ice-shelf',
						type: 'fill',
						source: 'openmaptiles',
						'source-layer': 'landcover',
						filter: ['==', 'subclass', 'ice_shelf'],
						layout: { visibility: 'visible' },
						paint: {
							'fill-color': 'hsl(47, 26%, 88%)',
							'fill-opacity': 0.8
						}
					},
					{
						id: 'landcover-glacier',
						type: 'fill',
						source: 'openmaptiles',
						'source-layer': 'landcover',
						filter: ['==', 'subclass', 'glacier'],
						layout: { visibility: 'visible' },
						paint: {
							'fill-color': 'hsl(47, 22%, 94%)',
							'fill-opacity': {
								base: 1,
								stops: [
									[0, 1],
									[8, 0.5]
								]
							}
						}
					},
					{
						id: 'landcover_sand',
						type: 'fill',
						metadata: {},
						source: 'openmaptiles',
						'source-layer': 'landcover',
						filter: ['all', ['in', 'class', 'sand']],
						paint: {
							'fill-antialias': false,
							'fill-color': 'rgba(232, 214, 38, 1)',
							'fill-opacity': 0.3
						}
					},
					{
						id: 'landuse',
						type: 'fill',
						source: 'openmaptiles',
						'source-layer': 'landuse',
						filter: ['==', 'class', 'agriculture'],
						layout: { visibility: 'visible' },
						paint: { 'fill-color': '#eae0d0' }
					},
					{
						id: 'landuse_overlay_national_park',
						type: 'fill',
						source: 'openmaptiles',
						'source-layer': 'landcover',
						filter: ['==', 'class', 'national_park'],
						paint: {
							'fill-color': '#E1EBB0',
							'fill-opacity': {
								base: 1,
								stops: [
									[5, 0],
									[9, 0.75]
								]
							}
						}
					},
					{
						id: 'waterway-tunnel',
						type: 'line',
						source: 'openmaptiles',
						'source-layer': 'waterway',
						filter: [
							'all',
							['==', '$type', 'LineString'],
							['==', 'brunnel', 'tunnel']
						],
						layout: { visibility: 'visible' },
						paint: {
							'line-color': 'hsl(205, 56%, 73%)',
							'line-dasharray': [3, 3],
							'line-gap-width': {
								stops: [
									[12, 0],
									[20, 6]
								]
							},
							'line-opacity': 1,
							'line-width': {
								base: 1.4,
								stops: [
									[8, 1],
									[20, 2]
								]
							}
						}
					},
					{
						id: 'waterway',
						type: 'line',
						source: 'openmaptiles',
						'source-layer': 'waterway',
						filter: [
							'all',
							['==', '$type', 'LineString'],
							['!in', 'brunnel', 'tunnel', 'bridge'],
							['!=', 'intermittent', 1]
						],
						layout: { visibility: 'visible' },
						paint: {
							'line-color': 'hsl(205, 56%, 73%)',
							'line-opacity': 1,
							'line-width': {
								base: 1.4,
								stops: [
									[8, 1],
									[20, 8]
								]
							}
						}
					},
					{
						id: 'waterway_intermittent',
						type: 'line',
						source: 'openmaptiles',
						'source-layer': 'waterway',
						filter: [
							'all',
							['==', '$type', 'LineString'],
							['!in', 'brunnel', 'tunnel', 'bridge'],
							['==', 'intermittent', 1]
						],
						layout: { visibility: 'visible' },
						paint: {
							'line-color': 'hsl(205, 56%, 73%)',
							'line-dasharray': [2, 1],
							'line-opacity': 1,
							'line-width': {
								base: 1.4,
								stops: [
									[8, 1],
									[20, 8]
								]
							}
						}
					},
					{
						id: 'tunnel_railway_transit',
						type: 'line',
						source: 'openmaptiles',
						'source-layer': 'transportation',
						minzoom: 0,
						filter: [
							'all',
							['==', '$type', 'LineString'],
							['==', 'brunnel', 'tunnel'],
							['==', 'class', 'transit']
						],
						layout: { 'line-cap': 'butt', 'line-join': 'miter' },
						paint: {
							'line-color': 'hsl(34, 12%, 66%)',
							'line-dasharray': [3, 3],
							'line-opacity': {
								base: 1,
								stops: [
									[11, 0],
									[16, 1]
								]
							}
						}
					},
					{
						id: 'building',
						type: 'fill',
						source: 'openmaptiles',
						'source-layer': 'building',
						paint: {
							'fill-antialias': true,
							'fill-color': 'rgba(222, 211, 190, 1)',
							'fill-opacity': {
								base: 1,
								stops: [
									[13, 0],
									[15, 1]
								]
							},
							'fill-outline-color': {
								stops: [
									[15, 'rgba(212, 177, 146, 0)'],
									[16, 'rgba(212, 177, 146, 0.5)']
								]
							}
						}
					},
					{
						id: 'housenumber',
						type: 'symbol',
						source: 'openmaptiles',
						'source-layer': 'housenumber',
						minzoom: 17,
						filter: ['==', '$type', 'Point'],
						layout: {
							'text-field': '{housenumber}',
							'text-font': ['Noto Sans Regular'],
							'text-size': 10
						},
						paint: { 'text-color': 'rgba(212, 177, 146, 1)' }
					},
					{
						id: 'road_area_pier',
						type: 'fill',
						metadata: {},
						source: 'openmaptiles',
						'source-layer': 'transportation',
						filter: [
							'all',
							['==', '$type', 'Polygon'],
							['==', 'class', 'pier']
						],
						layout: { visibility: 'visible' },
						paint: {
							'fill-antialias': true,
							'fill-color': 'hsl(47, 26%, 88%)'
						}
					},
					{
						id: 'road_pier',
						type: 'line',
						metadata: {},
						source: 'openmaptiles',
						'source-layer': 'transportation',
						filter: [
							'all',
							['==', '$type', 'LineString'],
							['in', 'class', 'pier']
						],
						layout: { 'line-cap': 'round', 'line-join': 'round' },
						paint: {
							'line-color': 'hsl(47, 26%, 88%)',
							'line-width': {
								base: 1.2,
								stops: [
									[15, 1],
									[17, 4]
								]
							}
						}
					},
					{
						id: 'road_bridge_area',
						type: 'fill',
						source: 'openmaptiles',
						'source-layer': 'transportation',
						filter: [
							'all',
							['==', '$type', 'Polygon'],
							['in', 'brunnel', 'bridge']
						],
						layout: {},
						paint: {
							'fill-color': 'hsl(47, 26%, 88%)',
							'fill-opacity': 0.5
						}
					},
					{
						id: 'road_path',
						type: 'line',
						source: 'openmaptiles',
						'source-layer': 'transportation',
						filter: [
							'all',
							['==', '$type', 'LineString'],
							['in', 'class', 'path', 'track']
						],
						layout: { 'line-cap': 'square', 'line-join': 'bevel' },
						paint: {
							'line-color': 'hsl(0, 0%, 97%)',
							'line-dasharray': [1, 1],
							'line-width': {
								base: 1.55,
								stops: [
									[4, 0.25],
									[20, 10]
								]
							}
						}
					},
					{
						id: 'road_minor',
						type: 'line',
						source: 'openmaptiles',
						'source-layer': 'transportation',
						minzoom: 13,
						filter: [
							'all',
							['==', '$type', 'LineString'],
							['in', 'class', 'minor', 'service']
						],
						layout: { 'line-cap': 'round', 'line-join': 'round' },
						paint: {
							'line-color': 'hsl(0, 0%, 97%)',
							'line-width': {
								base: 1.55,
								stops: [
									[4, 0.25],
									[20, 30]
								]
							}
						}
					},
					{
						id: 'tunnel_minor',
						type: 'line',
						source: 'openmaptiles',
						'source-layer': 'transportation',
						filter: [
							'all',
							['==', '$type', 'LineString'],
							['==', 'brunnel', 'tunnel'],
							['==', 'class', 'minor_road']
						],
						layout: { 'line-cap': 'butt', 'line-join': 'miter' },
						paint: {
							'line-color': '#efefef',
							'line-dasharray': [0.36, 0.18],
							'line-width': {
								base: 1.55,
								stops: [
									[4, 0.25],
									[20, 30]
								]
							}
						}
					},
					{
						id: 'tunnel_major',
						type: 'line',
						source: 'openmaptiles',
						'source-layer': 'transportation',
						filter: [
							'all',
							['==', '$type', 'LineString'],
							['==', 'brunnel', 'tunnel'],
							[
								'in',
								'class',
								'primary',
								'secondary',
								'tertiary',
								'trunk'
							]
						],
						layout: { 'line-cap': 'butt', 'line-join': 'miter' },
						paint: {
							'line-color': '#fff',
							'line-dasharray': [0.28, 0.14],
							'line-width': {
								base: 1.4,
								stops: [
									[6, 0.5],
									[20, 30]
								]
							}
						}
					},
					{
						id: 'aeroway-area',
						type: 'fill',
						metadata: { 'mapbox:group': '1444849345966.4436' },
						source: 'openmaptiles',
						'source-layer': 'aeroway',
						minzoom: 4,
						filter: [
							'all',
							['==', '$type', 'Polygon'],
							['in', 'class', 'runway', 'taxiway']
						],
						layout: { visibility: 'visible' },
						paint: {
							'fill-color': 'rgba(255, 255, 255, 1)',
							'fill-opacity': {
								base: 1,
								stops: [
									[13, 0],
									[14, 1]
								]
							}
						}
					},
					{
						id: 'aeroway-taxiway',
						type: 'line',
						metadata: { 'mapbox:group': '1444849345966.4436' },
						source: 'openmaptiles',
						'source-layer': 'aeroway',
						minzoom: 12,
						filter: [
							'all',
							['in', 'class', 'taxiway'],
							['==', '$type', 'LineString']
						],
						layout: {
							'line-cap': 'round',
							'line-join': 'round',
							visibility: 'visible'
						},
						paint: {
							'line-color': 'rgba(255, 255, 255, 1)',
							'line-opacity': 1,
							'line-width': {
								base: 1.5,
								stops: [
									[12, 1],
									[17, 10]
								]
							}
						}
					},
					{
						id: 'aeroway-runway',
						type: 'line',
						metadata: { 'mapbox:group': '1444849345966.4436' },
						source: 'openmaptiles',
						'source-layer': 'aeroway',
						minzoom: 4,
						filter: [
							'all',
							['in', 'class', 'runway'],
							['==', '$type', 'LineString']
						],
						layout: {
							'line-cap': 'round',
							'line-join': 'round',
							visibility: 'visible'
						},
						paint: {
							'line-color': 'rgba(255, 255, 255, 1)',
							'line-opacity': 1,
							'line-width': {
								base: 1.5,
								stops: [
									[11, 4],
									[17, 50]
								]
							}
						}
					},
					{
						id: 'road_trunk_primary',
						type: 'line',
						source: 'openmaptiles',
						'source-layer': 'transportation',
						filter: [
							'all',
							['==', '$type', 'LineString'],
							['in', 'class', 'trunk', 'primary']
						],
						layout: { 'line-cap': 'round', 'line-join': 'round' },
						paint: {
							'line-color': '#fff',
							'line-width': {
								base: 1.4,
								stops: [
									[6, 0.5],
									[20, 30]
								]
							}
						}
					},
					{
						id: 'road_secondary_tertiary',
						type: 'line',
						source: 'openmaptiles',
						'source-layer': 'transportation',
						filter: [
							'all',
							['==', '$type', 'LineString'],
							['in', 'class', 'secondary', 'tertiary']
						],
						layout: { 'line-cap': 'round', 'line-join': 'round' },
						paint: {
							'line-color': '#fff',
							'line-width': {
								base: 1.4,
								stops: [
									[6, 0.5],
									[20, 20]
								]
							}
						}
					},
					{
						id: 'road_major_motorway',
						type: 'line',
						source: 'openmaptiles',
						'source-layer': 'transportation',
						filter: [
							'all',
							['==', '$type', 'LineString'],
							['==', 'class', 'motorway']
						],
						layout: { 'line-cap': 'round', 'line-join': 'round' },
						paint: {
							'line-color': 'hsl(0, 0%, 100%)',
							'line-offset': 0,
							'line-width': {
								base: 1.4,
								stops: [
									[8, 1],
									[16, 10]
								]
							}
						}
					},
					{
						id: 'railway-transit',
						type: 'line',
						source: 'openmaptiles',
						'source-layer': 'transportation',
						filter: [
							'all',
							['==', 'class', 'transit'],
							['!=', 'brunnel', 'tunnel']
						],
						layout: { visibility: 'visible' },
						paint: {
							'line-color': 'hsl(34, 12%, 66%)',
							'line-opacity': {
								base: 1,
								stops: [
									[11, 0],
									[16, 1]
								]
							}
						}
					},
					{
						id: 'railway',
						type: 'line',
						source: 'openmaptiles',
						'source-layer': 'transportation',
						filter: ['==', 'class', 'rail'],
						layout: { visibility: 'visible' },
						paint: {
							'line-color': 'hsl(34, 12%, 66%)',
							'line-opacity': {
								base: 1,
								stops: [
									[11, 0],
									[16, 1]
								]
							}
						}
					},
					{
						id: 'waterway-bridge-case',
						type: 'line',
						source: 'openmaptiles',
						'source-layer': 'waterway',
						filter: [
							'all',
							['==', '$type', 'LineString'],
							['==', 'brunnel', 'bridge']
						],
						layout: { 'line-cap': 'butt', 'line-join': 'miter' },
						paint: {
							'line-color': '#bbbbbb',
							'line-gap-width': {
								base: 1.55,
								stops: [
									[4, 0.25],
									[20, 30]
								]
							},
							'line-width': {
								base: 1.6,
								stops: [
									[12, 0.5],
									[20, 10]
								]
							}
						}
					},
					{
						id: 'waterway-bridge',
						type: 'line',
						source: 'openmaptiles',
						'source-layer': 'waterway',
						filter: [
							'all',
							['==', '$type', 'LineString'],
							['==', 'brunnel', 'bridge']
						],
						layout: { 'line-cap': 'round', 'line-join': 'round' },
						paint: {
							'line-color': 'hsl(205, 56%, 73%)',
							'line-width': {
								base: 1.55,
								stops: [
									[4, 0.25],
									[20, 30]
								]
							}
						}
					},
					{
						id: 'bridge_minor case',
						type: 'line',
						source: 'openmaptiles',
						'source-layer': 'transportation',
						filter: [
							'all',
							['==', '$type', 'LineString'],
							['==', 'brunnel', 'bridge'],
							['==', 'class', 'minor_road']
						],
						layout: { 'line-cap': 'butt', 'line-join': 'miter' },
						paint: {
							'line-color': '#dedede',
							'line-gap-width': {
								base: 1.55,
								stops: [
									[4, 0.25],
									[20, 30]
								]
							},
							'line-width': {
								base: 1.6,
								stops: [
									[12, 0.5],
									[20, 10]
								]
							}
						}
					},
					{
						id: 'bridge_major case',
						type: 'line',
						source: 'openmaptiles',
						'source-layer': 'transportation',
						filter: [
							'all',
							['==', '$type', 'LineString'],
							['==', 'brunnel', 'bridge'],
							[
								'in',
								'class',
								'primary',
								'secondary',
								'tertiary',
								'trunk'
							]
						],
						layout: { 'line-cap': 'butt', 'line-join': 'miter' },
						paint: {
							'line-color': '#dedede',
							'line-gap-width': {
								base: 1.55,
								stops: [
									[4, 0.25],
									[20, 30]
								]
							},
							'line-width': {
								base: 1.6,
								stops: [
									[12, 0.5],
									[20, 10]
								]
							}
						}
					},
					{
						id: 'bridge_minor',
						type: 'line',
						source: 'openmaptiles',
						'source-layer': 'transportation',
						filter: [
							'all',
							['==', '$type', 'LineString'],
							['==', 'brunnel', 'bridge'],
							['==', 'class', 'minor_road']
						],
						layout: { 'line-cap': 'round', 'line-join': 'round' },
						paint: {
							'line-color': '#efefef',
							'line-width': {
								base: 1.55,
								stops: [
									[4, 0.25],
									[20, 30]
								]
							}
						}
					},
					{
						id: 'bridge_major',
						type: 'line',
						source: 'openmaptiles',
						'source-layer': 'transportation',
						filter: [
							'all',
							['==', '$type', 'LineString'],
							['==', 'brunnel', 'bridge'],
							[
								'in',
								'class',
								'primary',
								'secondary',
								'tertiary',
								'trunk'
							]
						],
						layout: { 'line-cap': 'round', 'line-join': 'round' },
						paint: {
							'line-color': '#fff',
							'line-width': {
								base: 1.4,
								stops: [
									[6, 0.5],
									[20, 30]
								]
							}
						}
					},
					{
						id: 'admin_sub',
						type: 'line',
						source: 'openmaptiles',
						'source-layer': 'boundary',
						filter: ['in', 'admin_level', 4, 6, 8],
						layout: { visibility: 'visible' },
						paint: {
							'line-color': 'hsla(0, 0%, 60%, 0.5)',
							'line-dasharray': [2, 1]
						}
					},
					{
						id: 'admin_country_z0-4',
						type: 'line',
						source: 'openmaptiles',
						'source-layer': 'boundary',
						minzoom: 0,
						maxzoom: 5,
						filter: [
							'all',
							['<=', 'admin_level', 2],
							['==', '$type', 'LineString'],
							['!has', 'claimed_by']
						],
						layout: {
							'line-cap': 'round',
							'line-join': 'round',
							visibility: 'visible'
						},
						paint: {
							'line-color': 'hsl(0, 0%, 60%)',
							'line-width': {
								base: 1.3,
								stops: [
									[3, 0.5],
									[22, 15]
								]
							}
						}
					},
					{
						id: 'admin_country_z5-',
						type: 'line',
						source: 'openmaptiles',
						'source-layer': 'boundary',
						minzoom: 5,
						filter: [
							'all',
							['<=', 'admin_level', 2],
							['==', '$type', 'LineString']
						],
						layout: {
							'line-cap': 'round',
							'line-join': 'round',
							visibility: 'visible'
						},
						paint: {
							'line-color': 'hsl(0, 0%, 60%)',
							'line-width': {
								base: 1.3,
								stops: [
									[3, 0.5],
									[22, 15]
								]
							}
						}
					},
					{
						id: 'poi_label',
						type: 'symbol',
						source: 'openmaptiles',
						'source-layer': 'poi',
						minzoom: 14,
						filter: [
							'all',
							['==', '$type', 'Point'],
							['==', 'rank', 1]
						],
						layout: {
							'icon-size': 1,
							'text-anchor': 'top',
							'text-field': '{name:latin}\n{name:nonlatin}',
							'text-font': ['Noto Sans Regular'],
							'text-max-width': 8,
							'text-offset': [0, 0.5],
							'text-size': 11,
							visibility: 'visible'
						},
						paint: {
							'text-color': '#666',
							'text-halo-blur': 1,
							'text-halo-color': 'rgba(255,255,255,0.75)',
							'text-halo-width': 1
						}
					},
					{
						id: 'airport-label',
						type: 'symbol',
						source: 'openmaptiles',
						'source-layer': 'aerodrome_label',
						minzoom: 10,
						filter: ['all', ['has', 'iata']],
						layout: {
							'icon-size': 1,
							'text-anchor': 'top',
							'text-field': '{name:latin}\n{name:nonlatin}',
							'text-font': ['Noto Sans Regular'],
							'text-max-width': 8,
							'text-offset': [0, 0.5],
							'text-size': 11,
							visibility: 'visible'
						},
						paint: {
							'text-color': '#666',
							'text-halo-blur': 1,
							'text-halo-color': 'rgba(255,255,255,0.75)',
							'text-halo-width': 1
						}
					},
					{
						id: 'road_major_label',
						type: 'symbol',
						source: 'openmaptiles',
						'source-layer': 'transportation_name',
						minzoom: 13,
						filter: ['==', '$type', 'LineString'],
						layout: {
							'symbol-placement': 'line',
							'text-field': '{name:latin} {name:nonlatin}',
							'text-font': ['Noto Sans Regular'],
							'text-letter-spacing': 0.1,
							'text-rotation-alignment': 'map',
							'text-size': {
								base: 1.4,
								stops: [
									[10, 8],
									[20, 14]
								]
							},
							'text-transform': 'uppercase',
							visibility: 'visible'
						},
						paint: {
							'text-color': '#000',
							'text-halo-color': 'hsl(0, 0%, 100%)',
							'text-halo-width': 2
						}
					},
					{
						id: 'place_label_other',
						type: 'symbol',
						source: 'openmaptiles',
						'source-layer': 'place',
						minzoom: 8,
						filter: [
							'all',
							['==', '$type', 'Point'],
							[
								'!in',
								'class',
								'city',
								'state',
								'country',
								'continent'
							]
						],
						layout: {
							'text-anchor': 'center',
							'text-field': '{name:latin}\n{name:nonlatin}',
							'text-font': ['Noto Sans Regular'],
							'text-max-width': 6,
							'text-size': {
								stops: [
									[6, 10],
									[12, 14]
								]
							},
							visibility: 'visible'
						},
						paint: {
							'text-color': 'hsl(0, 0%, 25%)',
							'text-halo-blur': 0,
							'text-halo-color': 'hsl(0, 0%, 100%)',
							'text-halo-width': 2
						}
					},
					{
						id: 'place_label_city',
						type: 'symbol',
						source: 'openmaptiles',
						'source-layer': 'place',
						maxzoom: 16,
						filter: [
							'all',
							['==', '$type', 'Point'],
							['==', 'class', 'city']
						],
						layout: {
							'text-field': '{name:latin}\n{name:nonlatin}',
							'text-font': ['Noto Sans Regular'],
							'text-max-width': 10,
							'text-size': {
								stops: [
									[3, 12],
									[8, 16]
								]
							}
						},
						paint: {
							'text-color': 'hsl(0, 0%, 0%)',
							'text-halo-blur': 0,
							'text-halo-color': 'hsla(0, 0%, 100%, 0.75)',
							'text-halo-width': 2
						}
					},
					{
						id: 'country_label-other',
						type: 'symbol',
						source: 'openmaptiles',
						'source-layer': 'place',
						maxzoom: 12,
						filter: [
							'all',
							['==', '$type', 'Point'],
							['==', 'class', 'country'],
							['!has', 'iso_a2']
						],
						layout: {
							'text-field': '{name:latin}',
							'text-font': ['Noto Sans Regular'],
							'text-max-width': 10,
							'text-size': {
								stops: [
									[3, 12],
									[8, 22]
								]
							},
							visibility: 'visible'
						},
						paint: {
							'text-color': 'hsl(0, 0%, 13%)',
							'text-halo-blur': 0,
							'text-halo-color': 'rgba(255,255,255,0.75)',
							'text-halo-width': 2
						}
					},
					{
						id: 'country_label',
						type: 'symbol',
						source: 'openmaptiles',
						'source-layer': 'place',
						maxzoom: 12,
						filter: [
							'all',
							['==', '$type', 'Point'],
							['==', 'class', 'country'],
							['has', 'iso_a2']
						],
						layout: {
							'text-field': '{name:latin}',
							'text-font': ['Noto Sans Bold'],
							'text-max-width': 10,
							'text-size': {
								stops: [
									[3, 12],
									[8, 22]
								]
							},
							visibility: 'visible'
						},
						paint: {
							'text-color': 'hsl(0, 0%, 13%)',
							'text-halo-blur': 0,
							'text-halo-color': 'rgba(255,255,255,0.75)',
							'text-halo-width': 2
						}
					}
				],
				id: 'basic'
			},
			center: [29.00875, 41.04182],
			zoom: 12
		})

		map.loadImage(
			'http://' +
				this.$store.state.mapServerIP +
				':' +
				this.$store.state.mapServerPortSVG +
				'/static/png/NChart-Symbol_INT_Lighted_BarrelBuoy_Green.png',
			function (error, image) {
				if (error) {
					console.log(error)
				} else {
					if (!map.hasImage('NChart-Symbol_INT_Light'))
						map.addImage('NChart-Symbol_INT_Light', image)
				}
			}
		)

		map.on('load', () => {
			map.addSource('rastertile1', {
				// tiles: ['http://localhost:8000/data/G0511_1/{z}/{x}/{y}.png'],
				// name: 'G0511_1',
				// format: 'png',
				// id: 'G0511_1',
				// type: 'raster'
				tiles: [
					'http://localhost:8000/data/G0511_2/{z}/{x}/{y}.png',
					'http://127.0.0.1:8000/data/G0511_2/{z}/{x}/{y}.png'
				],
				name: 'G0511_2',
				format: 'png',
				basename: 'G0511_2.mbtiles',
				id: 'G0511_2',
				tileSize: 64,
				type: 'raster',
				description: 'G0511_2',
				version: '1.1',
				minzoom: 0,
				maxzoom: 20,
				bounds: [
					27.505562405100406, 40.28381739381281, 27.903910388764373,
					40.53008978166397
				],
				center: [27.70473639693239, 40.406953587738386, 7],
				tilejson: '2.0.0'
			})

			map.addLayer({
				id: 'G0511_1',
				type: 'raster',
				source: 'rastertile1'
			})

			// map.addLayer({
			// 	id: 'rastertile2',
			// 	type: 'raster',
			// 	source: 'rastertile2'
			// })

			// eslint-disable-next-line no-constant-condition
			if (true) {
				map.addSource('TR402921', {
					type: 'vector',
					url:
						'http://' +
						this.$store.state.mapServerIP +
						':' +
						this.$store.state.mapServerPort +
						'/data/TR402921.json'
				})

				// map.addLayer({
				// 	"id": "ROADWY",
				// 	"type": "line",
				// 	"source": "TR402921",
				// 	"source-layer": "ROADWY",
				// 	"layout": {},
				// 	"paint": {"line-color": "#bb9a45"}
				// });

				map.addLayer({
					id: 'LNDARE',
					type: 'fill',
					source: 'TR402921',
					'source-layer': 'LNDARE',
					paint: {
						'fill-color': 'hsl(35, 100%, 66%)',
						'fill-opacity': 0.3
					}
				})

				map.addLayer({
					id: 'DEPARE',
					type: 'fill',
					source: 'TR402921',
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

				map.addLayer({
					id: 'LIGHTS',
					type: 'symbol',
					source: 'TR402921',
					'source-layer': 'LIGHTS',
					layout: {
						'icon-image': 'NChart-Symbol_INT_Light',
						'icon-size': 0.12,
						'icon-allow-overlap': true
					}
				})

				map.addLayer({
					id: 'SOUNDG',
					type: 'symbol',
					source: 'TR402921',
					'source-layer': 'SOUNDG',
					layout: {
						'text-field': ['to-string', ['get', 'DEPTH']],
						'text-size': 11
					},
					paint: {}
				})

				map.addLayer({
					id: 'BRIDGE',
					type: 'line',
					source: 'TR402921',
					'source-layer': 'BRIDGE',
					layout: {},
					paint: { 'line-color': '#677679', 'line-width': 2 }
				})

				map.addLayer({
					id: 'buaare-1a5c44',
					type: 'fill',
					source: 'TR402921',
					'source-layer': 'BUAARE',
					layout: {},
					paint: { 'fill-color': '#B19139', 'fill-opacity': 0.2 }
				})

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
	}
}
</script>

<style scoped>
.floatTopLeft {
	background-color: rgba(0, 0, 0, 0.6);
	padding: 12px;
	position: absolute;
	top: 40px;
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
