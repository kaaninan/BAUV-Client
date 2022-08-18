<template>
	<div class="_containerMap">
		<div class="_block_title">
			<span>MAP</span>
		</div>
		<GMapMap
			:center="{lat: 51.093048, lng: 6.842120}"
			:zoom="7"
			map-type-id="terrain"
			:options="options"
			style="width: 100%; height: 600px">
			<GMapCluster>
				<GMapMarker
					:key="index"
					v-for="(m, index) in markers"
					:position="m.position"
					:clickable="true"
					:draggable="true"
					@click="center=m.position"
				/>
			</GMapCluster>
	</GMapMap>
	</div>
</template>

<script>
export default {
  name: 'App',
  data() {
	return {
		options: {
			disableDefaultUi: true
		},
		center: {lat: 51.093048, lng: 6.842120},
		markers: [
			{
				position: {
				lat: 51.093048, lng: 6.842120
				},
			}
		]
	}
  }
}
</script>

<style scoped>

._containerMap{
	width: 100%;
	display: flex;
	flex-direction: column;
	border: 1px solid var(--border-color);
	background-color: var(--block-background-color);
}

</style>