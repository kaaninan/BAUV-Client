<template>
	<div class="_containerPower">
		<div class="_content">
			<div class="_category">
				<div class="title">Local Time:</div>
				<div class="data">{{ localTime }}</div>
			</div>
			<div class="_category">
				<div class="title">System Time:</div>
				<div class="data">{{ systemTime }}</div>
			</div>
			<div class="_category">
				<div class="title">Mission Duration:</div>
				<div class="data">
					{{ missionDurationFormatted }}
				</div>
			</div>
			
			<div class="_category">
				<div class="title">Dive Duration:</div>
				<div class="data">
					{{ diveDurationFormatted }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Chronometer',
	data() {
		return {
			localTime: ''
		}
	},
	computed: {
		systemTime() {
			// parse getTime to format 15-04-23 15:00:00
			let date = new Date(this.$store.state.data.system_time)
			let year = date.getFullYear().toString().substr(-2)
			let month = ('0' + (date.getMonth() + 1)).slice(-2)
			let day = ('0' + date.getDate()).slice(-2)
			let hours = ('0' + date.getHours()).slice(-2)
			let minutes = ('0' + date.getMinutes()).slice(-2)
			let seconds = ('0' + date.getSeconds()).slice(-2)
			return (
				day +
				'-' +
				month +
				'-' +
				year +
				' ' +
				hours +
				':' +
				minutes +
				':' +
				seconds
			)
		},
		missionDurationFormatted() {
			
			const durationInSeconds = this.$store.state.data.mission_duration
    			const hours = ('0' + ((Math.floor(durationInSeconds / 3600)).toString())).slice(-2)
    			const minutes =  ('0' + ((Math.floor((durationInSeconds % 3600) / 60)).toString())).slice(-2)
    			const seconds = ('0' + (durationInSeconds % 60).toString()).slice(-2)
    			
    			return hours + ':' + minutes + ':' + seconds
		},
		
		diveDurationFormatted() {
			
			const durationInSeconds = this.$store.state.data.dive_duration
    			const hours = ('0' + ((Math.floor(durationInSeconds / 3600)).toString())).slice(-2)
    			const minutes =  ('0' + ((Math.floor((durationInSeconds % 3600) / 60)).toString())).slice(-2)
    			const seconds = ('0' + (durationInSeconds % 60).toString()).slice(-2)
    			
    			return hours + ':' + minutes + ':' + seconds
		}
	},
	mounted() {
		this.timeInterval = setInterval(() => {
			this.setDate()
		}, 1000)
	},
	unmounted() {
		clearInterval(this.timeInterval)
	},
	methods: {
		setDate() {
			// Format 15-04-23
			let date = new Date()
			let year = date.getFullYear().toString().substr(-2)
			let month = ('0' + (date.getMonth() + 1)).slice(-2)
			let day = ('0' + date.getDate()).slice(-2)
			let hours = ('0' + date.getHours()).slice(-2)
			let minutes = ('0' + date.getMinutes()).slice(-2)
			let seconds = ('0' + date.getSeconds()).slice(-2)
			this.localTime =
				day +
				'-' +
				month +
				'-' +
				year +
				' ' +
				hours +
				':' +
				minutes +
				':' +
				seconds
		}
	}
}
</script>

<style scoped>
._containerPower {
	width: 250px;
	background-color: var(--block-background-color);
	border: 1px solid var(--border-color);
	position: relative;
}
._containerPower ._content {
	padding: 5px 10px;
	display: flex;
	/* justify-content: center;
	align-items: center; */
	flex-direction: column;
}

._containerPower ._content ._category {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	min-height: 30px;
	/* border: 1px solid red; */
}
._containerPower ._content ._float {
	height: auto;
}
._containerPower ._content ._category .title {
	opacity: 0.7;
	font-size: 15px;
	white-space: nowrap;
	margin: 5px 0;
	margin-right: 10px;
}
._containerPower ._content ._category .data {
	transition: all 0.3s ease-in-out;
	font-size: 15px;
}
._containerPower ._content ._category .data .ipInput {
	background-color: var(--block-background-color);
	color: white;
	font-family: var(--font-family);
	font-size: 13px;
	border: 1px solid var(--border-color);
	border-radius: 5px;
	padding: 4px;
}
</style>
