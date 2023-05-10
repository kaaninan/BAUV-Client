<template>
	<div v-for="(item, index) in list" :key="index">
		<div style="flex-direction: row; display: flex">
			<div
				class="box"
				:class="{ box_selected: checkSelected(item.split('.')[0]) }"
				@click="selectMap(item)"
			></div>
			<div
				class="title"
				:class="{ selected: checkSelected(item.split('.')[0]) }"
			>
				{{ item }}
			</div>
			<div class="center" @click="center(item.split('.')[0])">Center</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MapSettings',
	emits: ['go-coords', 'go-bounds', 'close-window'],
	data() {
		return {
			list: []
		}
	},
	mounted() {
		// Fetch API from backend
		this.getMapList()
	},
	methods: {
		checkSelected(id) {
			return this.$store.getters.getSelectedMaps.find((item) => {
				return item.id === id
			})
		},
		async getMapList() {
			const response = await fetch(
				'http://' +
					this.$store.state.mapServerIP +
					':' +
					this.$store.state.mapServerPortSVG +
					'/list'
			)
			let data = await response.json()
			data = data.filter((item) => {
				return item !== 'turkey-osm.mbtiles'
			})
			this.list = data
		},
		async getMapDetail(name) {
			const response = await fetch(
				'http://' +
					this.$store.state.mapServerIP +
					':' +
					this.$store.state.mapServerPort +
					'/data/' +
					name.split('.')[0] +
					'.json'
			)
			const data = await response.json()
			return data
		},
		async selectMap(item) {
			const data = await this.getMapDetail(item)
			this.$store.commit('toggleMap', data)
		},
		async center(item) {
			const data = await this.getMapDetail(item)
			console.log(data)
			// this.$emit(
			// 	'go-coords',
			// 	data.center[1],
			// 	data.center[0],
			// 	data.minzoom + 10
			// )
			this.$emit('go-bounds', data.bounds)
			this.$emit('close-window')
		}
	}
}
</script>

<style scoped>
.box {
	width: 20px;
	height: 20px;
	background-color: #ccc;
	margin: 5px;
	display: inline-block;
}

.box_selected {
	background-color: red;
}
.selected {
	color: red;
}

.center {
	display: inline-block;
	margin-left: 20px;
	text-decoration: underline;
	cursor: pointer;
}
</style>
