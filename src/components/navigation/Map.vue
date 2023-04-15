<template>
	<div class="_containerMap">
		<div class="_block_title">
			<span>MAP</span>
		</div>
		<div id="map" style="height: 1170px"></div>
		
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

import maplibregl from 'maplibre-gl';

export default {
	name: 'App',

	mounted(){

		// Create map
		const map = new maplibregl.Map({
			container: 'map',
			style: 'map.json',
			center: [29.00875, 41.04182],
			zoom: 12
		});

		map.loadImage('http://' + this.$store.state.mapServerIP + ':' + this.$store.state.mapServerPortSVG + '/static/png/NChart-Symbol_INT_Lighted_BarrelBuoy_Green.png', function(error, image) {
			if (error) throw error;
			if (!map.hasImage('NChart-Symbol_INT_Light')) map.addImage('NChart-Symbol_INT_Light', image);
		});

		map.on('load', () => {

			// map.addSource('rastertile', {
			// 	'type': 'raster',
			// 	'tiles': [
			// 		'http://165.227.151.78:8000/data/G1111_1/{z}/{x}/{y}.png'
			// 	],
			// 	'tileSize': 32,
			// 	'minzoom': 0,
			// 	'maxzoom': 16
			// });

			// map.addLayer({
			// 	'id': 'rastertile',
			// 	'type': 'raster',
			// 	'source': 'rastertile'
			// });

			// map.addLayer({
			// 	'id': 'rastertile2',
			// 	'type': 'raster',
			// 	'source': 'rastertile2'
			// });

			// map.addSource('soundg', {
			// 	'type': 'geojson',
			// 	'data': {
			// 		"type": "FeatureCollection",
			// 		"name": "SOUNDG",
			// 		"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
			// 		"features": [
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 19.5 }, "geometry": { "type": "Point", "coordinates": [ 29.065988, 41.171365, 19.5 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 0.6 }, "geometry": { "type": "Point", "coordinates": [ 29.057199, 41.084274, 0.6 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 0.9 }, "geometry": { "type": "Point", "coordinates": [ 29.065529, 41.08152, 0.9 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 79.0 }, "geometry": { "type": "Point", "coordinates": [ 29.053714, 41.076063, 79.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 102.0 }, "geometry": { "type": "Point", "coordinates": [ 29.054802, 41.077763, 102.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 59.0 }, "geometry": { "type": "Point", "coordinates": [ 29.054207, 41.079633, 59.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 20.0 }, "geometry": { "type": "Point", "coordinates": [ 29.05283, 41.080194, 20.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 62.0 }, "geometry": { "type": "Point", "coordinates": [ 29.059732, 41.084172, 62.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 58.0 }, "geometry": { "type": "Point", "coordinates": [ 29.063251, 41.083254, 58.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 49.0 }, "geometry": { "type": "Point", "coordinates": [ 29.062945, 41.080092, 49.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 8.0 }, "geometry": { "type": "Point", "coordinates": [ 29.062316, 41.076488, 8.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 42.0 }, "geometry": { "type": "Point", "coordinates": [ 29.062248, 41.077304, 42.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 73.0 }, "geometry": { "type": "Point", "coordinates": [ 29.060922, 41.081707, 73.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 60.0 }, "geometry": { "type": "Point", "coordinates": [ 29.059001, 41.080245, 60.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 18.0 }, "geometry": { "type": "Point", "coordinates": [ 29.059579, 41.075417, 18.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 86.0 }, "geometry": { "type": "Point", "coordinates": [ 29.058865, 41.077763, 86.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 14.4 }, "geometry": { "type": "Point", "coordinates": [ 29.045622, 41.077899, 14.4 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 36.0 }, "geometry": { "type": "Point", "coordinates": [ 29.051657, 41.079157, 36.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 16.0 }, "geometry": { "type": "Point", "coordinates": [ 29.050161, 41.07931, 16.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 81.0 }, "geometry": { "type": "Point", "coordinates": [ 29.051589, 41.076471, 81.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 12.8 }, "geometry": { "type": "Point", "coordinates": [ 29.056859, 41.082234, 12.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 51.0 }, "geometry": { "type": "Point", "coordinates": [ 29.058848, 41.082387, 51.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 0.9 }, "geometry": { "type": "Point", "coordinates": [ 29.064016, 41.077899, 0.9 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 12.8 }, "geometry": { "type": "Point", "coordinates": [ 29.064186, 41.079293, 12.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 3.7 }, "geometry": { "type": "Point", "coordinates": [ 29.066243, 41.085413, 3.7 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 6.0 }, "geometry": { "type": "Point", "coordinates": [ 29.066192, 41.083288, 6.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 38.0 }, "geometry": { "type": "Point", "coordinates": [ 29.065172, 41.086603, 38.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 51.0 }, "geometry": { "type": "Point", "coordinates": [ 29.056349, 41.080874, 51.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 4.6 }, "geometry": { "type": "Point", "coordinates": [ 29.044585, 41.075485, 4.6 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 34.0 }, "geometry": { "type": "Point", "coordinates": [ 29.04909, 41.076675, 34.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 2.8 }, "geometry": { "type": "Point", "coordinates": [ 29.046812, 41.076828, 2.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 8.8 }, "geometry": { "type": "Point", "coordinates": [ 29.086813, 41.171671, 8.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 30.0 }, "geometry": { "type": "Point", "coordinates": [ 29.085946, 41.172623, 30.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 4.0 }, "geometry": { "type": "Point", "coordinates": [ 29.087714, 41.172963, 4.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 14.6 }, "geometry": { "type": "Point", "coordinates": [ 29.073111, 41.165483, 14.6 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 9.9 }, "geometry": { "type": "Point", "coordinates": [ 29.073264, 41.160196, 9.9 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 60.0 }, "geometry": { "type": "Point", "coordinates": [ 29.068504, 41.1706, 60.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 6.4 }, "geometry": { "type": "Point", "coordinates": [ 29.067841, 41.171977, 6.4 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 7.9 }, "geometry": { "type": "Point", "coordinates": [ 29.063795, 41.171365, 7.9 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 12.2 }, "geometry": { "type": "Point", "coordinates": [ 29.061058, 41.169886, 12.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 24.0 }, "geometry": { "type": "Point", "coordinates": [ 29.059375, 41.167965, 24.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 2.8 }, "geometry": { "type": "Point", "coordinates": [ 29.057743, 41.167336, 2.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 63.0 }, "geometry": { "type": "Point", "coordinates": [ 29.058729, 41.16261, 63.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 63.0 }, "geometry": { "type": "Point", "coordinates": [ 29.063251, 41.164174, 63.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 49.0 }, "geometry": { "type": "Point", "coordinates": [ 29.051096, 41.157102, 49.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 59.0 }, "geometry": { "type": "Point", "coordinates": [ 29.052456, 41.155606, 59.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 49.0 }, "geometry": { "type": "Point", "coordinates": [ 29.050637, 41.160298, 49.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 18.2 }, "geometry": { "type": "Point", "coordinates": [ 29.048869, 41.162746, 18.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 16.1 }, "geometry": { "type": "Point", "coordinates": [ 29.042647, 41.158683, 16.1 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 21.0 }, "geometry": { "type": "Point", "coordinates": [ 29.044772, 41.158326, 21.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 11.1 }, "geometry": { "type": "Point", "coordinates": [ 29.037156, 41.156762, 11.1 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 9.5 }, "geometry": { "type": "Point", "coordinates": [ 29.03702, 41.155317, 9.5 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 14.8 }, "geometry": { "type": "Point", "coordinates": [ 29.040148, 41.157238, 14.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 55.0 }, "geometry": { "type": "Point", "coordinates": [ 29.056995, 41.155997, 55.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 58.0 }, "geometry": { "type": "Point", "coordinates": [ 29.057981, 41.159465, 58.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 48.0 }, "geometry": { "type": "Point", "coordinates": [ 29.060446, 41.158037, 48.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 53.0 }, "geometry": { "type": "Point", "coordinates": [ 29.061942, 41.161199, 53.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 47.0 }, "geometry": { "type": "Point", "coordinates": [ 29.062299, 41.156507, 47.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 21.5 }, "geometry": { "type": "Point", "coordinates": [ 29.07187, 41.155232, 21.5 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 4.9 }, "geometry": { "type": "Point", "coordinates": [ 29.071904, 41.161216, 4.9 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 20.0 }, "geometry": { "type": "Point", "coordinates": [ 29.072346, 41.158615, 20.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 19.2 }, "geometry": { "type": "Point", "coordinates": [ 29.086065, 41.135665, 19.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 37.0 }, "geometry": { "type": "Point", "coordinates": [ 29.079214, 41.134968, 37.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 8.0 }, "geometry": { "type": "Point", "coordinates": [ 29.084484, 41.136838, 8.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 0.9 }, "geometry": { "type": "Point", "coordinates": [ 29.081407, 41.167914, 0.9 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 26.0 }, "geometry": { "type": "Point", "coordinates": [ 29.080149, 41.168441, 26.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 1.1 }, "geometry": { "type": "Point", "coordinates": [ 29.078279, 41.168407, 1.1 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 21.0 }, "geometry": { "type": "Point", "coordinates": [ 29.076358, 41.167999, 21.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 6.7 }, "geometry": { "type": "Point", "coordinates": [ 29.075899, 41.167285, 6.7 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 4.6 }, "geometry": { "type": "Point", "coordinates": [ 29.077191, 41.156048, 4.6 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 21.0 }, "geometry": { "type": "Point", "coordinates": [ 29.0751, 41.18063, 21.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 35.0 }, "geometry": { "type": "Point", "coordinates": [ 29.053289, 41.163698, 35.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 9.2 }, "geometry": { "type": "Point", "coordinates": [ 29.05164, 41.164072, 9.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 59.0 }, "geometry": { "type": "Point", "coordinates": [ 29.054683, 41.162916, 59.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 11.9 }, "geometry": { "type": "Point", "coordinates": [ 29.054547, 41.165024, 11.9 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 52.0 }, "geometry": { "type": "Point", "coordinates": [ 29.056927, 41.164429, 52.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 17.6 }, "geometry": { "type": "Point", "coordinates": [ 29.076494, 41.155487, 17.6 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 32.0 }, "geometry": { "type": "Point", "coordinates": [ 29.077412, 41.180579, 32.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 41.0 }, "geometry": { "type": "Point", "coordinates": [ 29.076273, 41.178692, 41.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 55.0 }, "geometry": { "type": "Point", "coordinates": [ 29.079673, 41.180001, 55.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 64.0 }, "geometry": { "type": "Point", "coordinates": [ 29.078993, 41.177672, 64.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 66.0 }, "geometry": { "type": "Point", "coordinates": [ 29.077956, 41.175105, 66.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 68.0 }, "geometry": { "type": "Point", "coordinates": [ 29.082546, 41.179304, 68.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 9.9 }, "geometry": { "type": "Point", "coordinates": [ 29.069099, 41.158921, 9.9 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 26.0 }, "geometry": { "type": "Point", "coordinates": [ 29.067416, 41.16023, 26.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 9.9 }, "geometry": { "type": "Point", "coordinates": [ 29.0683, 41.157153, 9.9 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 15.1 }, "geometry": { "type": "Point", "coordinates": [ 29.069354, 41.156337, 15.1 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 5.9 }, "geometry": { "type": "Point", "coordinates": [ 29.066124, 41.155674, 5.9 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 34.0 }, "geometry": { "type": "Point", "coordinates": [ 29.064662, 41.158343, 34.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 10.6 }, "geometry": { "type": "Point", "coordinates": [ 29.064373, 41.155351, 10.6 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 6.4 }, "geometry": { "type": "Point", "coordinates": [ 29.071751, 41.162576, 6.4 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 52.0 }, "geometry": { "type": "Point", "coordinates": [ 29.072295, 41.1672, 52.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 35.0 }, "geometry": { "type": "Point", "coordinates": [ 29.071751, 41.165534, 35.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 21.0 }, "geometry": { "type": "Point", "coordinates": [ 29.070646, 41.163205, 21.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 66.0 }, "geometry": { "type": "Point", "coordinates": [ 29.070493, 41.168594, 66.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 58.0 }, "geometry": { "type": "Point", "coordinates": [ 29.065563, 41.163086, 58.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 64.0 }, "geometry": { "type": "Point", "coordinates": [ 29.067603, 41.165517, 64.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 60.0 }, "geometry": { "type": "Point", "coordinates": [ 29.065138, 41.166962, 60.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 45.0 }, "geometry": { "type": "Point", "coordinates": [ 29.063761, 41.169444, 45.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 11.0 }, "geometry": { "type": "Point", "coordinates": [ 29.085283, 41.17009, 11.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 0.9 }, "geometry": { "type": "Point", "coordinates": [ 29.083753, 41.169359, 0.9 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 41.0 }, "geometry": { "type": "Point", "coordinates": [ 29.081713, 41.172521, 41.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 55.0 }, "geometry": { "type": "Point", "coordinates": [ 29.081186, 41.174068, 55.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 32.0 }, "geometry": { "type": "Point", "coordinates": [ 29.083957, 41.173354, 32.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 32.0 }, "geometry": { "type": "Point", "coordinates": [ 29.082784, 41.170447, 32.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 19.8 }, "geometry": { "type": "Point", "coordinates": [ 29.081186, 41.170838, 19.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 9.1 }, "geometry": { "type": "Point", "coordinates": [ 29.078823, 41.169444, 9.1 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 43.0 }, "geometry": { "type": "Point", "coordinates": [ 29.076953, 41.169512, 43.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 8.2 }, "geometry": { "type": "Point", "coordinates": [ 29.03957, 41.15836, 8.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 5.9 }, "geometry": { "type": "Point", "coordinates": [ 29.04501, 41.151356, 5.9 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 5.8 }, "geometry": { "type": "Point", "coordinates": [ 29.043242, 41.151764, 5.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 8.5 }, "geometry": { "type": "Point", "coordinates": [ 29.040896, 41.153566, 8.5 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 26.0 }, "geometry": { "type": "Point", "coordinates": [ 29.041355, 41.155198, 26.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 17.9 }, "geometry": { "type": "Point", "coordinates": [ 29.042103, 41.156439, 17.9 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 19.5 }, "geometry": { "type": "Point", "coordinates": [ 29.039451, 41.154569, 19.5 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 27.0 }, "geometry": { "type": "Point", "coordinates": [ 29.047424, 41.157323, 27.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 18.0 }, "geometry": { "type": "Point", "coordinates": [ 29.047186, 41.15564, 18.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 30.0 }, "geometry": { "type": "Point", "coordinates": [ 29.043208, 41.153617, 30.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 39.0 }, "geometry": { "type": "Point", "coordinates": [ 29.044585, 41.155912, 39.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 52.0 }, "geometry": { "type": "Point", "coordinates": [ 29.060276, 41.165636, 52.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 11.8 }, "geometry": { "type": "Point", "coordinates": [ 29.058321, 41.165908, 11.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 34.0 }, "geometry": { "type": "Point", "coordinates": [ 29.08768, 41.179882, 34.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 3.4 }, "geometry": { "type": "Point", "coordinates": [ 29.071853, 41.173949, 3.4 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 71.0 }, "geometry": { "type": "Point", "coordinates": [ 29.071768, 41.17196, 71.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 40.0 }, "geometry": { "type": "Point", "coordinates": [ 29.074403, 41.176023, 40.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 68.0 }, "geometry": { "type": "Point", "coordinates": [ 29.075236, 41.171926, 68.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 48.0 }, "geometry": { "type": "Point", "coordinates": [ 29.049719, 41.161981, 48.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 55.0 }, "geometry": { "type": "Point", "coordinates": [ 29.053323, 41.16074, 55.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 65.0 }, "geometry": { "type": "Point", "coordinates": [ 29.053884, 41.158666, 65.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 21.0 }, "geometry": { "type": "Point", "coordinates": [ 29.047747, 41.161641, 21.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 5.8 }, "geometry": { "type": "Point", "coordinates": [ 29.046132, 41.160485, 5.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 30.0 }, "geometry": { "type": "Point", "coordinates": [ 29.047628, 41.159584, 30.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 3.7 }, "geometry": { "type": "Point", "coordinates": [ 29.105105, 41.181956, 3.7 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 9.7 }, "geometry": { "type": "Point", "coordinates": [ 29.097982, 41.182143, 9.7 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 1.8 }, "geometry": { "type": "Point", "coordinates": [ 29.102589, 41.182194, 1.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 67.0 }, "geometry": { "type": "Point", "coordinates": [ 29.085895, 41.181429, 67.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 32.0 }, "geometry": { "type": "Point", "coordinates": [ 29.079588, 41.181531, 32.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 26.0 }, "geometry": { "type": "Point", "coordinates": [ 29.089856, 41.180885, 26.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 5.5 }, "geometry": { "type": "Point", "coordinates": [ 29.091794, 41.180885, 5.5 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 0.3 }, "geometry": { "type": "Point", "coordinates": [ 29.038074, 41.042454, 0.3 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 51.0 }, "geometry": { "type": "Point", "coordinates": [ 29.045996, 41.061341, 51.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 62.0 }, "geometry": { "type": "Point", "coordinates": [ 29.048189, 41.063109, 62.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 64.0 }, "geometry": { "type": "Point", "coordinates": [ 29.04841, 41.06469, 64.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 33.0 }, "geometry": { "type": "Point", "coordinates": [ 29.045401, 41.065149, 33.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 49.0 }, "geometry": { "type": "Point", "coordinates": [ 29.045843, 41.059233, 49.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 55.0 }, "geometry": { "type": "Point", "coordinates": [ 29.046268, 41.057091, 55.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 19.0 }, "geometry": { "type": "Point", "coordinates": [ 29.008341, 41.040686, 19.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 15.0 }, "geometry": { "type": "Point", "coordinates": [ 29.011129, 41.041502, 15.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 41.0 }, "geometry": { "type": "Point", "coordinates": [ 29.013815, 41.03953, 41.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 33.0 }, "geometry": { "type": "Point", "coordinates": [ 29.011265, 41.040312, 33.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 42.0 }, "geometry": { "type": "Point", "coordinates": [ 29.020241, 41.043134, 42.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 18.9 }, "geometry": { "type": "Point", "coordinates": [ 29.017317, 41.043644, 18.9 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 40.0 }, "geometry": { "type": "Point", "coordinates": [ 29.017266, 41.041417, 40.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 31.0 }, "geometry": { "type": "Point", "coordinates": [ 29.019833, 41.039207, 31.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 8.8 }, "geometry": { "type": "Point", "coordinates": [ 29.014359, 41.042505, 8.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 17.8 }, "geometry": { "type": "Point", "coordinates": [ 29.035745, 41.041434, 17.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 56.0 }, "geometry": { "type": "Point", "coordinates": [ 29.034912, 41.043253, 56.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 59.0 }, "geometry": { "type": "Point", "coordinates": [ 29.037037, 41.044596, 59.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 14.0 }, "geometry": { "type": "Point", "coordinates": [ 29.002102, 41.038697, 14.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 37.0 }, "geometry": { "type": "Point", "coordinates": [ 29.007117, 41.039411, 37.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 2.0 }, "geometry": { "type": "Point", "coordinates": [ 29.054088, 41.063806, 2.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 31.0 }, "geometry": { "type": "Point", "coordinates": [ 29.05385, 41.064775, 31.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 7.3 }, "geometry": { "type": "Point", "coordinates": [ 29.05606, 41.067155, 7.3 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 38.0 }, "geometry": { "type": "Point", "coordinates": [ 29.054428, 41.067274, 38.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 0.3 }, "geometry": { "type": "Point", "coordinates": [ 29.056502, 41.068974, 0.3 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 47.0 }, "geometry": { "type": "Point", "coordinates": [ 29.054938, 41.069161, 47.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 58.0 }, "geometry": { "type": "Point", "coordinates": [ 29.051504, 41.065659, 58.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 71.0 }, "geometry": { "type": "Point", "coordinates": [ 29.051079, 41.069535, 71.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 60.0 }, "geometry": { "type": "Point", "coordinates": [ 29.051164, 41.06316, 60.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 75.0 }, "geometry": { "type": "Point", "coordinates": [ 29.049702, 41.060729, 75.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 13.3 }, "geometry": { "type": "Point", "coordinates": [ 29.040913, 41.059726, 13.3 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 1.3 }, "geometry": { "type": "Point", "coordinates": [ 29.036221, 41.056819, 1.3 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 27.0 }, "geometry": { "type": "Point", "coordinates": [ 29.03719, 41.052331, 27.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 15.5 }, "geometry": { "type": "Point", "coordinates": [ 29.036952, 41.058213, 15.5 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 22.0 }, "geometry": { "type": "Point", "coordinates": [ 29.037054, 41.055136, 22.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 78.0 }, "geometry": { "type": "Point", "coordinates": [ 29.047866, 41.070827, 78.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 3.0 }, "geometry": { "type": "Point", "coordinates": [ 29.044823, 41.074023, 3.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 14.2 }, "geometry": { "type": "Point", "coordinates": [ 29.045469, 41.07319, 14.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 22.0 }, "geometry": { "type": "Point", "coordinates": [ 29.046098, 41.071201, 22.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 29.0 }, "geometry": { "type": "Point", "coordinates": [ 29.05147, 41.057822, 29.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 3.7 }, "geometry": { "type": "Point", "coordinates": [ 29.051249, 41.053198, 3.7 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 12.8 }, "geometry": { "type": "Point", "coordinates": [ 29.05232, 41.057907, 12.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 9.4 }, "geometry": { "type": "Point", "coordinates": [ 29.05181, 41.049373, 9.4 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 11.3 }, "geometry": { "type": "Point", "coordinates": [ 29.039995, 41.043814, 11.3 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 0.2 }, "geometry": { "type": "Point", "coordinates": [ 29.041797, 41.044001, 0.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 64.0 }, "geometry": { "type": "Point", "coordinates": [ 29.039536, 41.045497, 64.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 7.7 }, "geometry": { "type": "Point", "coordinates": [ 29.019544, 41.045123, 7.7 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 44.0 }, "geometry": { "type": "Point", "coordinates": [ 29.022383, 41.044715, 44.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 14.0 }, "geometry": { "type": "Point", "coordinates": [ 29.023556, 41.046551, 14.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 48.0 }, "geometry": { "type": "Point", "coordinates": [ 29.025222, 41.045412, 48.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 4.2 }, "geometry": { "type": "Point", "coordinates": [ 29.004958, 41.039581, 4.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 55.0 }, "geometry": { "type": "Point", "coordinates": [ 29.050722, 41.059233, 55.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 1.2 }, "geometry": { "type": "Point", "coordinates": [ 29.050195, 41.047843, 1.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 11.0 }, "geometry": { "type": "Point", "coordinates": [ 29.050858, 41.053912, 11.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 30.0 }, "geometry": { "type": "Point", "coordinates": [ 29.049498, 41.053317, 30.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 66.0 }, "geometry": { "type": "Point", "coordinates": [ 29.047985, 41.050206, 66.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 19.0 }, "geometry": { "type": "Point", "coordinates": [ 29.05113, 41.050342, 19.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 68.0 }, "geometry": { "type": "Point", "coordinates": [ 29.048189, 41.05551, 68.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 26.0 }, "geometry": { "type": "Point", "coordinates": [ 29.049566, 41.049016, 26.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 14.0 }, "geometry": { "type": "Point", "coordinates": [ 29.049124, 41.048081, 14.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 53.0 }, "geometry": { "type": "Point", "coordinates": [ 29.046744, 41.047962, 53.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 0.6 }, "geometry": { "type": "Point", "coordinates": [ 29.041134, 41.06384, 0.6 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 29.0 }, "geometry": { "type": "Point", "coordinates": [ 29.042409, 41.064996, 29.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 10.4 }, "geometry": { "type": "Point", "coordinates": [ 29.041899, 41.06146, 10.4 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 0.3 }, "geometry": { "type": "Point", "coordinates": [ 29.042936, 41.066509, 0.3 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 18.3 }, "geometry": { "type": "Point", "coordinates": [ 29.04348, 41.064163, 18.3 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 24.0 }, "geometry": { "type": "Point", "coordinates": [ 29.028809, 41.048132, 24.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 43.0 }, "geometry": { "type": "Point", "coordinates": [ 29.031087, 41.047452, 43.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 35.0 }, "geometry": { "type": "Point", "coordinates": [ 29.055465, 41.074873, 35.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 4.0 }, "geometry": { "type": "Point", "coordinates": [ 29.057709, 41.074805, 4.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 75.0 }, "geometry": { "type": "Point", "coordinates": [ 29.051776, 41.071609, 75.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 110.0 }, "geometry": { "type": "Point", "coordinates": [ 29.051504, 41.074482, 110.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 0.3 }, "geometry": { "type": "Point", "coordinates": [ 29.055193, 41.072357, 0.3 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 77.0 }, "geometry": { "type": "Point", "coordinates": [ 29.049634, 41.074125, 77.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 44.0 }, "geometry": { "type": "Point", "coordinates": [ 29.025545, 41.039207, 44.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 34.0 }, "geometry": { "type": "Point", "coordinates": [ 29.023352, 41.041332, 34.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 21.0 }, "geometry": { "type": "Point", "coordinates": [ 29.029506, 41.038306, 21.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 45.0 }, "geometry": { "type": "Point", "coordinates": [ 29.027602, 41.04106, 45.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 28.0 }, "geometry": { "type": "Point", "coordinates": [ 29.031427, 41.040142, 28.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 13.5 }, "geometry": { "type": "Point", "coordinates": [ 29.032719, 41.039717, 13.5 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 51.0 }, "geometry": { "type": "Point", "coordinates": [ 29.032124, 41.041757, 51.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 12.7 }, "geometry": { "type": "Point", "coordinates": [ 29.034708, 41.040567, 12.7 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 1.2 }, "geometry": { "type": "Point", "coordinates": [ 29.043293, 41.044868, 1.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 62.0 }, "geometry": { "type": "Point", "coordinates": [ 29.043004, 41.047299, 62.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 44.0 }, "geometry": { "type": "Point", "coordinates": [ 29.044041, 41.051022, 44.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 55.0 }, "geometry": { "type": "Point", "coordinates": [ 29.04603, 41.052263, 55.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 49.0 }, "geometry": { "type": "Point", "coordinates": [ 29.044585, 41.054354, 49.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 38.0 }, "geometry": { "type": "Point", "coordinates": [ 29.043021, 41.057125, 38.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 29.0 }, "geometry": { "type": "Point", "coordinates": [ 29.043786, 41.060678, 29.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 0.9 }, "geometry": { "type": "Point", "coordinates": [ 29.046608, 41.046075, 0.9 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 17.0 }, "geometry": { "type": "Point", "coordinates": [ 29.04518, 41.045922, 17.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 0.3 }, "geometry": { "type": "Point", "coordinates": [ 29.045452, 41.067155, 0.3 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 42.0 }, "geometry": { "type": "Point", "coordinates": [ 29.047679, 41.067665, 42.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 0.9 }, "geometry": { "type": "Point", "coordinates": [ 29.046608, 41.068447, 0.9 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 29.0 }, "geometry": { "type": "Point", "coordinates": [ 29.039995, 41.055969, 29.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 40.0 }, "geometry": { "type": "Point", "coordinates": [ 29.040352, 41.052637, 40.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 42.0 }, "geometry": { "type": "Point", "coordinates": [ 29.041933, 41.048914, 42.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 1.2 }, "geometry": { "type": "Point", "coordinates": [ 29.034249, 41.052331, 1.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 33.0 }, "geometry": { "type": "Point", "coordinates": [ 29.034759, 41.051498, 33.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 1.8 }, "geometry": { "type": "Point", "coordinates": [ 29.033331, 41.050002, 1.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 44.0 }, "geometry": { "type": "Point", "coordinates": [ 29.032872, 41.048455, 44.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 44.0 }, "geometry": { "type": "Point", "coordinates": [ 29.03719, 41.049237, 44.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 44.0 }, "geometry": { "type": "Point", "coordinates": [ 29.035507, 41.046177, 44.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 47.0 }, "geometry": { "type": "Point", "coordinates": [ 29.030424, 41.043168, 47.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 49.0 }, "geometry": { "type": "Point", "coordinates": [ 29.028707, 41.045752, 49.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 0.9 }, "geometry": { "type": "Point", "coordinates": [ 29.031648, 41.048931, 0.9 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 46.0 }, "geometry": { "type": "Point", "coordinates": [ 29.071802, 41.113378, 46.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 2.7 }, "geometry": { "type": "Point", "coordinates": [ 29.063115, 41.114177, 2.7 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 11.9 }, "geometry": { "type": "Point", "coordinates": [ 29.064628, 41.114109, 11.9 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 60.0 }, "geometry": { "type": "Point", "coordinates": [ 29.081934, 41.117968, 60.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 49.0 }, "geometry": { "type": "Point", "coordinates": [ 29.078551, 41.11722, 49.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 38.0 }, "geometry": { "type": "Point", "coordinates": [ 29.069643, 41.115027, 38.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 44.0 }, "geometry": { "type": "Point", "coordinates": [ 29.074063, 41.114976, 44.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 32.0 }, "geometry": { "type": "Point", "coordinates": [ 29.066226, 41.113497, 32.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 4.6 }, "geometry": { "type": "Point", "coordinates": [ 29.065223, 41.116013, 4.6 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 11.9 }, "geometry": { "type": "Point", "coordinates": [ 29.057675, 41.10651, 11.9 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 52.0 }, "geometry": { "type": "Point", "coordinates": [ 29.067127, 41.110964, 52.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 34.0 }, "geometry": { "type": "Point", "coordinates": [ 29.064067, 41.112239, 34.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 11.0 }, "geometry": { "type": "Point", "coordinates": [ 29.06286, 41.113225, 11.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 6.4 }, "geometry": { "type": "Point", "coordinates": [ 29.061738, 41.112987, 6.4 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 26.0 }, "geometry": { "type": "Point", "coordinates": [ 29.060089, 41.11263, 26.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 38.0 }, "geometry": { "type": "Point", "coordinates": [ 29.060633, 41.110777, 38.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 4.1 }, "geometry": { "type": "Point", "coordinates": [ 29.058831, 41.110675, 4.1 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 17.4 }, "geometry": { "type": "Point", "coordinates": [ 29.067977, 41.105082, 17.4 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 73.0 }, "geometry": { "type": "Point", "coordinates": [ 29.067127, 41.105745, 73.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 42.0 }, "geometry": { "type": "Point", "coordinates": [ 29.069507, 41.105507, 42.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 15.5 }, "geometry": { "type": "Point", "coordinates": [ 29.071989, 41.107343, 15.5 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 76.0 }, "geometry": { "type": "Point", "coordinates": [ 29.069507, 41.108176, 76.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 43.0 }, "geometry": { "type": "Point", "coordinates": [ 29.079775, 41.109043, 43.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 15.5 }, "geometry": { "type": "Point", "coordinates": [ 29.080438, 41.108295, 15.5 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 30.0 }, "geometry": { "type": "Point", "coordinates": [ 29.077344, 41.108533, 30.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 11.9 }, "geometry": { "type": "Point", "coordinates": [ 29.076171, 41.107802, 11.9 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 69.0 }, "geometry": { "type": "Point", "coordinates": [ 29.076562, 41.109451, 69.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 56.0 }, "geometry": { "type": "Point", "coordinates": [ 29.080948, 41.111474, 56.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 60.0 }, "geometry": { "type": "Point", "coordinates": [ 29.074658, 41.112596, 60.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 72.0 }, "geometry": { "type": "Point", "coordinates": [ 29.077905, 41.111423, 72.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 48.0 }, "geometry": { "type": "Point", "coordinates": [ 29.081679, 41.11025, 48.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 28.0 }, "geometry": { "type": "Point", "coordinates": [ 29.087102, 41.115775, 28.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 3.0 }, "geometry": { "type": "Point", "coordinates": [ 29.089244, 41.116149, 3.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 37.0 }, "geometry": { "type": "Point", "coordinates": [ 29.088122, 41.132588, 37.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 16.5 }, "geometry": { "type": "Point", "coordinates": [ 29.090519, 41.133557, 16.5 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 37.0 }, "geometry": { "type": "Point", "coordinates": [ 29.084756, 41.113735, 37.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 69.0 }, "geometry": { "type": "Point", "coordinates": [ 29.082172, 41.113905, 69.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 41.0 }, "geometry": { "type": "Point", "coordinates": [ 29.083736, 41.112392, 41.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 59.0 }, "geometry": { "type": "Point", "coordinates": [ 29.078415, 41.114738, 59.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 16.9 }, "geometry": { "type": "Point", "coordinates": [ 29.052762, 41.147378, 16.9 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 38.0 }, "geometry": { "type": "Point", "coordinates": [ 29.055686, 41.145049, 38.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 1.5 }, "geometry": { "type": "Point", "coordinates": [ 29.055057, 41.138827, 1.5 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 18.0 }, "geometry": { "type": "Point", "coordinates": [ 29.057862, 41.14187, 18.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 8.0 }, "geometry": { "type": "Point", "coordinates": [ 29.058304, 41.139881, 8.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 27.0 }, "geometry": { "type": "Point", "coordinates": [ 29.056655, 41.143111, 27.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 2.0 }, "geometry": { "type": "Point", "coordinates": [ 29.096061, 41.121283, 2.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 14.5 }, "geometry": { "type": "Point", "coordinates": [ 29.095942, 41.122524, 14.5 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 5.8 }, "geometry": { "type": "Point", "coordinates": [ 29.095024, 41.118155, 5.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 12.8 }, "geometry": { "type": "Point", "coordinates": [ 29.092763, 41.129613, 12.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 8.8 }, "geometry": { "type": "Point", "coordinates": [ 29.091352, 41.131534, 8.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 21.0 }, "geometry": { "type": "Point", "coordinates": [ 29.093154, 41.127063, 21.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 65.0 }, "geometry": { "type": "Point", "coordinates": [ 29.075644, 41.129154, 65.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 37.0 }, "geometry": { "type": "Point", "coordinates": [ 29.074471, 41.125873, 37.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 47.0 }, "geometry": { "type": "Point", "coordinates": [ 29.072278, 41.128117, 47.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 10.1 }, "geometry": { "type": "Point", "coordinates": [ 29.072533, 41.126196, 10.1 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 15.5 }, "geometry": { "type": "Point", "coordinates": [ 29.067858, 41.128984, 15.5 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 4.0 }, "geometry": { "type": "Point", "coordinates": [ 29.06626, 41.129477, 4.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 2.3 }, "geometry": { "type": "Point", "coordinates": [ 29.072856, 41.123578, 2.3 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 19.2 }, "geometry": { "type": "Point", "coordinates": [ 29.074216, 41.122779, 19.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 4.0 }, "geometry": { "type": "Point", "coordinates": [ 29.071054, 41.121317, 4.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 70.0 }, "geometry": { "type": "Point", "coordinates": [ 29.08547, 41.123952, 70.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 53.0 }, "geometry": { "type": "Point", "coordinates": [ 29.086609, 41.12793, 53.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 47.0 }, "geometry": { "type": "Point", "coordinates": [ 29.087119, 41.130514, 47.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 44.0 }, "geometry": { "type": "Point", "coordinates": [ 29.085623, 41.133744, 44.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 68.0 }, "geometry": { "type": "Point", "coordinates": [ 29.083583, 41.13167, 68.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 57.0 }, "geometry": { "type": "Point", "coordinates": [ 29.081917, 41.125992, 57.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 66.0 }, "geometry": { "type": "Point", "coordinates": [ 29.079367, 41.127913, 66.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 71.0 }, "geometry": { "type": "Point", "coordinates": [ 29.079724, 41.131789, 71.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 65.0 }, "geometry": { "type": "Point", "coordinates": [ 29.081322, 41.13371, 65.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 4.2 }, "geometry": { "type": "Point", "coordinates": [ 29.080098, 41.136719, 4.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 13.8 }, "geometry": { "type": "Point", "coordinates": [ 29.077089, 41.137484, 13.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 25.0 }, "geometry": { "type": "Point", "coordinates": [ 29.082206, 41.135801, 25.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 45.0 }, "geometry": { "type": "Point", "coordinates": [ 29.069065, 41.129749, 45.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 19.2 }, "geometry": { "type": "Point", "coordinates": [ 29.065546, 41.130871, 19.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 45.0 }, "geometry": { "type": "Point", "coordinates": [ 29.064968, 41.132384, 45.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 63.0 }, "geometry": { "type": "Point", "coordinates": [ 29.069966, 41.132826, 63.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 63.0 }, "geometry": { "type": "Point", "coordinates": [ 29.065274, 41.134696, 63.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 63.0 }, "geometry": { "type": "Point", "coordinates": [ 29.068317, 41.136719, 63.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 49.0 }, "geometry": { "type": "Point", "coordinates": [ 29.069286, 41.111083, 49.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 53.0 }, "geometry": { "type": "Point", "coordinates": [ 29.067994, 41.112698, 53.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 73.0 }, "geometry": { "type": "Point", "coordinates": [ 29.072499, 41.110199, 73.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 6.6 }, "geometry": { "type": "Point", "coordinates": [ 29.093188, 41.117084, 6.6 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 17.3 }, "geometry": { "type": "Point", "coordinates": [ 29.092984, 41.118325, 17.3 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 9.0 }, "geometry": { "type": "Point", "coordinates": [ 29.09125, 41.117815, 9.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 4.6 }, "geometry": { "type": "Point", "coordinates": [ 29.067331, 41.117543, 4.6 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 19.0 }, "geometry": { "type": "Point", "coordinates": [ 29.068266, 41.116183, 19.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 40.0 }, "geometry": { "type": "Point", "coordinates": [ 29.071717, 41.116812, 40.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 18.0 }, "geometry": { "type": "Point", "coordinates": [ 29.070153, 41.118257, 18.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 42.0 }, "geometry": { "type": "Point", "coordinates": [ 29.074216, 41.11841, 42.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 18.0 }, "geometry": { "type": "Point", "coordinates": [ 29.072669, 41.120603, 18.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 26.0 }, "geometry": { "type": "Point", "coordinates": [ 29.074216, 41.121181, 26.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 4.6 }, "geometry": { "type": "Point", "coordinates": [ 29.069711, 41.119464, 4.6 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 26.5 }, "geometry": { "type": "Point", "coordinates": [ 29.069898, 41.153073, 26.5 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 18.2 }, "geometry": { "type": "Point", "coordinates": [ 29.072499, 41.151713, 18.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 14.6 }, "geometry": { "type": "Point", "coordinates": [ 29.072584, 41.149401, 14.6 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 4.4 }, "geometry": { "type": "Point", "coordinates": [ 29.072686, 41.147888, 4.4 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 22.0 }, "geometry": { "type": "Point", "coordinates": [ 29.071496, 41.1468, 22.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 5.5 }, "geometry": { "type": "Point", "coordinates": [ 29.071598, 41.144131, 5.5 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 1.6 }, "geometry": { "type": "Point", "coordinates": [ 29.057641, 41.13779, 1.6 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 12.5 }, "geometry": { "type": "Point", "coordinates": [ 29.068147, 41.143893, 12.5 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 32.0 }, "geometry": { "type": "Point", "coordinates": [ 29.065648, 41.143519, 32.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 1.5 }, "geometry": { "type": "Point", "coordinates": [ 29.067926, 41.146205, 1.5 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 59.0 }, "geometry": { "type": "Point", "coordinates": [ 29.061993, 41.145049, 59.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 4.6 }, "geometry": { "type": "Point", "coordinates": [ 29.068351, 41.148772, 4.6 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 8.1 }, "geometry": { "type": "Point", "coordinates": [ 29.066957, 41.15071, 8.1 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 4.3 }, "geometry": { "type": "Point", "coordinates": [ 29.065478, 41.148925, 4.3 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 0.5 }, "geometry": { "type": "Point", "coordinates": [ 29.066226, 41.153209, 0.5 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 26.0 }, "geometry": { "type": "Point", "coordinates": [ 29.063744, 41.14952, 26.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 37.0 }, "geometry": { "type": "Point", "coordinates": [ 29.063523, 41.147735, 37.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 30.0 }, "geometry": { "type": "Point", "coordinates": [ 29.046608, 41.154671, 30.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 30.0 }, "geometry": { "type": "Point", "coordinates": [ 29.046489, 41.152682, 30.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 49.0 }, "geometry": { "type": "Point", "coordinates": [ 29.050603, 41.154399, 49.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 45.0 }, "geometry": { "type": "Point", "coordinates": [ 29.050365, 41.152087, 45.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 58.0 }, "geometry": { "type": "Point", "coordinates": [ 29.052286, 41.153005, 58.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 25.0 }, "geometry": { "type": "Point", "coordinates": [ 29.046846, 41.150489, 25.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 7.1 }, "geometry": { "type": "Point", "coordinates": [ 29.046302, 41.149486, 7.1 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 7.2 }, "geometry": { "type": "Point", "coordinates": [ 29.048886, 41.148806, 7.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 29.0 }, "geometry": { "type": "Point", "coordinates": [ 29.04977, 41.149724, 29.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 47.0 }, "geometry": { "type": "Point", "coordinates": [ 29.052082, 41.149197, 47.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 63.0 }, "geometry": { "type": "Point", "coordinates": [ 29.054564, 41.150098, 63.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 61.0 }, "geometry": { "type": "Point", "coordinates": [ 29.055499, 41.153362, 61.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 64.0 }, "geometry": { "type": "Point", "coordinates": [ 29.056349, 41.147021, 64.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 61.0 }, "geometry": { "type": "Point", "coordinates": [ 29.057726, 41.150013, 61.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 58.0 }, "geometry": { "type": "Point", "coordinates": [ 29.060157, 41.147701, 58.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 38.0 }, "geometry": { "type": "Point", "coordinates": [ 29.060259, 41.152172, 38.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 66.0 }, "geometry": { "type": "Point", "coordinates": [ 29.058984, 41.14459, 66.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 14.6 }, "geometry": { "type": "Point", "coordinates": [ 29.073961, 41.136447, 14.6 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 27.0 }, "geometry": { "type": "Point", "coordinates": [ 29.073332, 41.13932, 27.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 13.2 }, "geometry": { "type": "Point", "coordinates": [ 29.073434, 41.140476, 13.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 3.0 }, "geometry": { "type": "Point", "coordinates": [ 29.075202, 41.141122, 3.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 76.0 }, "geometry": { "type": "Point", "coordinates": [ 29.076783, 41.133455, 76.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 13.0 }, "geometry": { "type": "Point", "coordinates": [ 29.076732, 41.139626, 13.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 7.5 }, "geometry": { "type": "Point", "coordinates": [ 29.078296, 41.138232, 7.5 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 11.0 }, "geometry": { "type": "Point", "coordinates": [ 29.069847, 41.14187, 11.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 24.0 }, "geometry": { "type": "Point", "coordinates": [ 29.067654, 41.140357, 24.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 64.0 }, "geometry": { "type": "Point", "coordinates": [ 29.06354, 41.138929, 64.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 59.0 }, "geometry": { "type": "Point", "coordinates": [ 29.062792, 41.141836, 59.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 23.0 }, "geometry": { "type": "Point", "coordinates": [ 29.061398, 41.138827, 23.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 64.0 }, "geometry": { "type": "Point", "coordinates": [ 29.0768, 41.125584, 64.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 30.0 }, "geometry": { "type": "Point", "coordinates": [ 29.07153, 41.137399, 30.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 64.0 }, "geometry": { "type": "Point", "coordinates": [ 29.072006, 41.131262, 64.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 70.0 }, "geometry": { "type": "Point", "coordinates": [ 29.072669, 41.134577, 70.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 18.8 }, "geometry": { "type": "Point", "coordinates": [ 29.072754, 41.138198, 18.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 8.2 }, "geometry": { "type": "Point", "coordinates": [ 29.072975, 41.141666, 8.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 27.0 }, "geometry": { "type": "Point", "coordinates": [ 29.061993, 41.136719, 27.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 6.8 }, "geometry": { "type": "Point", "coordinates": [ 29.060174, 41.136464, 6.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 15.5 }, "geometry": { "type": "Point", "coordinates": [ 29.057301, 41.104895, 15.5 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 60.0 }, "geometry": { "type": "Point", "coordinates": [ 29.065206, 41.108057, 60.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 58.0 }, "geometry": { "type": "Point", "coordinates": [ 29.062469, 41.109876, 58.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 15.0 }, "geometry": { "type": "Point", "coordinates": [ 29.059698, 41.110284, 15.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 33.0 }, "geometry": { "type": "Point", "coordinates": [ 29.060514, 41.109332, 33.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 64.0 }, "geometry": { "type": "Point", "coordinates": [ 29.061296, 41.107496, 64.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 4.0 }, "geometry": { "type": "Point", "coordinates": [ 29.059375, 41.108737, 4.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 8.2 }, "geometry": { "type": "Point", "coordinates": [ 29.08887, 41.134747, 8.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 3.2 }, "geometry": { "type": "Point", "coordinates": [ 29.096248, 41.125669, 3.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 2.8 }, "geometry": { "type": "Point", "coordinates": [ 29.096333, 41.123442, 2.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 30.0 }, "geometry": { "type": "Point", "coordinates": [ 29.089618, 41.123068, 30.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 37.0 }, "geometry": { "type": "Point", "coordinates": [ 29.089584, 41.128117, 37.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 39.0 }, "geometry": { "type": "Point", "coordinates": [ 29.090604, 41.130344, 39.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 36.0 }, "geometry": { "type": "Point", "coordinates": [ 29.089329, 41.12555, 36.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 18.0 }, "geometry": { "type": "Point", "coordinates": [ 29.091046, 41.122422, 18.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 7.8 }, "geometry": { "type": "Point", "coordinates": [ 29.093902, 41.124479, 7.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 10.8 }, "geometry": { "type": "Point", "coordinates": [ 29.093307, 41.125482, 10.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 3.3 }, "geometry": { "type": "Point", "coordinates": [ 29.092134, 41.123017, 3.3 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 3.2 }, "geometry": { "type": "Point", "coordinates": [ 29.094089, 41.120399, 3.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 13.0 }, "geometry": { "type": "Point", "coordinates": [ 29.08955, 41.117492, 13.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 26.0 }, "geometry": { "type": "Point", "coordinates": [ 29.091743, 41.121487, 26.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 26.0 }, "geometry": { "type": "Point", "coordinates": [ 29.091522, 41.119838, 26.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 29.0 }, "geometry": { "type": "Point", "coordinates": [ 29.08802, 41.119447, 29.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 63.0 }, "geometry": { "type": "Point", "coordinates": [ 29.083719, 41.120229, 63.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 58.0 }, "geometry": { "type": "Point", "coordinates": [ 29.080863, 41.122779, 58.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 53.0 }, "geometry": { "type": "Point", "coordinates": [ 29.086048, 41.116727, 53.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 63.0 }, "geometry": { "type": "Point", "coordinates": [ 29.076987, 41.122915, 63.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 65.0 }, "geometry": { "type": "Point", "coordinates": [ 29.078789, 41.120314, 65.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 15.5 }, "geometry": { "type": "Point", "coordinates": [ 29.070748, 41.13983, 15.5 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 7.3 }, "geometry": { "type": "Point", "coordinates": [ 29.071139, 41.141785, 7.3 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 19.2 }, "geometry": { "type": "Point", "coordinates": [ 29.073961, 41.153566, 19.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 21.0 }, "geometry": { "type": "Point", "coordinates": [ 29.0751, 41.151951, 21.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 19.0 }, "geometry": { "type": "Point", "coordinates": [ 29.075304, 41.150557, 19.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 5.0 }, "geometry": { "type": "Point", "coordinates": [ 29.076919, 41.15224, 5.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 66.0 }, "geometry": { "type": "Point", "coordinates": [ 29.058134, 41.098792, 66.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 23.0 }, "geometry": { "type": "Point", "coordinates": [ 29.057114, 41.10243, 23.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 39.0 }, "geometry": { "type": "Point", "coordinates": [ 29.056519, 41.099965, 39.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 65.0 }, "geometry": { "type": "Point", "coordinates": [ 29.05895, 41.103909, 65.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 8.2 }, "geometry": { "type": "Point", "coordinates": [ 29.054802, 41.099693, 8.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 57.0 }, "geometry": { "type": "Point", "coordinates": [ 29.059239, 41.086484, 57.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 71.0 }, "geometry": { "type": "Point", "coordinates": [ 29.058746, 41.088677, 71.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 65.0 }, "geometry": { "type": "Point", "coordinates": [ 29.061126, 41.102872, 65.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 52.0 }, "geometry": { "type": "Point", "coordinates": [ 29.060939, 41.098809, 52.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 70.0 }, "geometry": { "type": "Point", "coordinates": [ 29.063404, 41.104759, 70.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 51.0 }, "geometry": { "type": "Point", "coordinates": [ 29.061619, 41.097194, 51.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 48.0 }, "geometry": { "type": "Point", "coordinates": [ 29.06252, 41.098843, 48.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 57.0 }, "geometry": { "type": "Point", "coordinates": [ 29.062843, 41.101138, 57.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 54.0 }, "geometry": { "type": "Point", "coordinates": [ 29.066719, 41.104657, 54.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 46.0 }, "geometry": { "type": "Point", "coordinates": [ 29.066005, 41.103586, 46.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 11.5 }, "geometry": { "type": "Point", "coordinates": [ 29.065138, 41.102413, 11.5 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 1.2 }, "geometry": { "type": "Point", "coordinates": [ 29.054139, 41.095494, 1.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 31.0 }, "geometry": { "type": "Point", "coordinates": [ 29.063795, 41.096531, 31.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 8.5 }, "geometry": { "type": "Point", "coordinates": [ 29.064322, 41.099438, 8.5 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 38.0 }, "geometry": { "type": "Point", "coordinates": [ 29.055856, 41.098197, 38.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 9.1 }, "geometry": { "type": "Point", "coordinates": [ 29.066226, 41.095001, 9.1 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 8.2 }, "geometry": { "type": "Point", "coordinates": [ 29.065223, 41.101036, 8.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 86.0 }, "geometry": { "type": "Point", "coordinates": [ 29.059273, 41.092026, 86.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 61.0 }, "geometry": { "type": "Point", "coordinates": [ 29.058559, 41.100747, 61.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 68.0 }, "geometry": { "type": "Point", "coordinates": [ 29.060276, 41.094848, 68.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 63.0 }, "geometry": { "type": "Point", "coordinates": [ 29.058899, 41.096599, 63.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 17.0 }, "geometry": { "type": "Point", "coordinates": [ 29.055346, 41.096939, 17.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 3.7 }, "geometry": { "type": "Point", "coordinates": [ 29.054836, 41.097891, 3.7 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 8.4 }, "geometry": { "type": "Point", "coordinates": [ 29.048461, 41.079208, 8.4 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 25.0 }, "geometry": { "type": "Point", "coordinates": [ 29.048937, 41.078409, 25.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 14.2 }, "geometry": { "type": "Point", "coordinates": [ 29.047611, 41.077814, 14.2 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 75.0 }, "geometry": { "type": "Point", "coordinates": [ 29.056808, 41.09478, 75.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 24.0 }, "geometry": { "type": "Point", "coordinates": [ 29.055346, 41.093692, 24.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 12.0 }, "geometry": { "type": "Point", "coordinates": [ 29.065444, 41.094406, 12.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 55.0 }, "geometry": { "type": "Point", "coordinates": [ 29.062622, 41.095579, 55.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 59.0 }, "geometry": { "type": "Point", "coordinates": [ 29.061874, 41.092995, 59.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 20.0 }, "geometry": { "type": "Point", "coordinates": [ 29.064866, 41.092196, 20.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 22.0 }, "geometry": { "type": "Point", "coordinates": [ 29.056706, 41.092196, 22.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 1.8 }, "geometry": { "type": "Point", "coordinates": [ 29.055533, 41.092485, 1.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 0.6 }, "geometry": { "type": "Point", "coordinates": [ 29.065563, 41.087589, 0.6 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 16.0 }, "geometry": { "type": "Point", "coordinates": [ 29.065002, 41.088507, 16.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 75.0 }, "geometry": { "type": "Point", "coordinates": [ 29.060327, 41.089782, 75.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 57.0 }, "geometry": { "type": "Point", "coordinates": [ 29.063591, 41.090071, 57.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 68.0 }, "geometry": { "type": "Point", "coordinates": [ 29.06303, 41.085736, 68.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 62.0 }, "geometry": { "type": "Point", "coordinates": [ 29.062911, 41.088354, 62.0 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 1.8 }, "geometry": { "type": "Point", "coordinates": [ 29.057131, 41.088592, 1.8 ] } },
			// 			{ "type": "Feature", "properties": { "RCID": 959, "PRIM": 1, "GRUP": 2, "OBJL": 129, "RVER": 1, "AGEN": 520, "FIDN": 31776, "FIDS": 1, "LNAM": "020800007C200001", "QUASOU": [ "1" ], "DEPTH": 14.0 }, "geometry": { "type": "Point", "coordinates": [ 29.057131, 41.087623, 14.0 ] } }
			// 		]
			// 	}
			// });

			// map.addLayer({
			// 	"id": "soundings-222",
			// 	"type": "symbol",
			// 	"source": "soundg",
			// 	// "source-layer": "soundings-dfdt6p",
			// 	"layout": {
			// 		"text-field": ["to-string", ["get", "DEPTH"]],
			// 		"text-size": 9
			// 	},
			// 	"paint": {}
			// })

			if(true){
				console.log('http://'+this.$store.state.mapServerIP + ':' + this.$store.state.mapServerPort+'/data/TR402921.json')
				map.addSource('TR402921', {
					type: 'vector',
					url: 'http://'+this.$store.state.mapServerIP + ':' + this.$store.state.mapServerPort+'/data/TR402921.json',
				});


				// map.addLayer({
				// 	"id": "ROADWY",
				// 	"type": "line",
				// 	"source": "TR402921",
				// 	"source-layer": "ROADWY",
				// 	"layout": {},
				// 	"paint": {"line-color": "#bb9a45"}
				// });
				
				map.addLayer({
					"id": "LNDARE",
					"type": "fill",
					"source": "TR402921",
					"source-layer": "LNDARE",
					"paint": {"fill-color": "hsl(35, 100%, 66%)", "fill-opacity": 0.3}
				});
				
				map.addLayer({
					"id": "DEPARE",
					"type": "fill",
					"source": "TR402921",
					"source-layer": "DEPARE",
					"layout": {},
					"paint": {
						"fill-color": [
							"interpolate",
							["linear"],
							["get", "DRVAL1"],
							0,
							"#d3beb3",
							3,
							"#dbe9f6",
							5,
							"#bed7ec",
							10,
							"#8ec1dd",
							20,
							"#5aa2cf",
							30,
							"#3181bd",
							50,
							"#105ca4",
							100,
							"#08306b"
						]
					}
				});
				
				map.addLayer({
					"id": "LIGHTS",
					"type": "symbol",
					"source": "TR402921",
					"source-layer": "LIGHTS",
					"layout": {
						"icon-image": "NChart-Symbol_INT_Light",
						"icon-size": 0.12,
						"icon-allow-overlap": true
					},
				});
				
				map.addLayer({
					"id": "SOUNDG",
					"type": "symbol",
					"source": "TR402921",
					"source-layer": "SOUNDG",
					"layout": {
						"text-field": ["to-string", ["get", "DEPTH"]],
						"text-size": 11,
					},
					"paint": {}
				})
				
				map.addLayer({
					"id": "BRIDGE",
					"type": "line",
					"source": "TR402921",
					"source-layer": "BRIDGE",
					"layout": {},
					"paint": {"line-color": "#677679", "line-width": 2}
				})
				
				map.addLayer({
					"id": "buaare-1a5c44",
					"type": "fill",
					"source": "TR402921",
					"source-layer": "BUAARE",
					"layout": {},
					"paint": {"fill-color": "#B19139", "fill-opacity": 0.2}
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

		});
	}
}
</script>

<style scoped>

._containerMap{
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	border: 1px solid var(--border-color);
	background-color: var(--block-background-color);
}

.floatTopLeft{
	background-color: var(--block-background-color);
	padding: 12px;
	position: absolute;
	top: 80px;
	right: 80px;
	z-index: 1000;
	color: black;
}

.floatBottomLeft{
	background-color: var(--block-background-color);
	padding: 12px;
	position: absolute;
	bottom: 80px;
	right: 80px;
	z-index: 1000;
	color: black;
}
.floatBottomRight{
	background-color: var(--block-background-color);
	padding: 12px;
	position: absolute;
	bottom: 80px;
	left: 80px;
	z-index: 1000;
	color: black;
}

.floatItemText{
	padding: 5px 0;
}

</style>