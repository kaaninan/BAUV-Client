<template>
	<div class="_containerPower">
		<div class="_content">
			<div class="_category">
				<div class="title">Current Power:</div>
				<div class="data">{{ parseFloat(power).toFixed(2) }} W</div>
			</div>
			<div class="_category">
				<div class="title">Voltage:</div>
				<div class="data">{{ parseFloat(voltage).toFixed(2) }} V</div>
			</div>
			<div class="_category">
				<div class="title">Endurance:</div>
				<div class="data">{{ endurance }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Power',
	computed: {
		power() {
			return this.$store.state.data.current_power
		},
		voltage() {
			return this.$store.state.data.voltage
		},
		endurance() {
			return this.$store.state.data.endurance
		}
	}
}
</script>

<style scoped>
._containerPower {
	background-color: var(--block-background-color);
	border: 1px solid var(--border-color);
	position: relative;
	margin-bottom: var(--block-margin);
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
