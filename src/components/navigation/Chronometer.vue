<template>
	<div class="_containerPower">
		<div class="_block_title">
			<span>CHRONOMETER</span>
		</div>

		<div class="_content">
			<div class="_category">
				<div class="title">Local Time:</div>
				<div class="data">15-04-23 12:00:00</div>
			</div>
			<div class="_category">
				<div class="title">System Time:</div>
				<div class="data">15-04-23 9:00:00</div>
			</div>
			<div class="_category">
				<div class="title">Mission Duration:</div>
				<div class="data">2h 36m</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Chronometer'
}
</script>

<style scoped>
@import url('@/assets/styles/variables.css');

._containerPower {
	background-color: var(--block-background-color);
	border: 1px solid var(--border-color);
	position: relative;
	margin-bottom: var(--block-margin);
}
._containerPower ._content {
	padding: 20px 20px;
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
	margin: 10px 0;
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
