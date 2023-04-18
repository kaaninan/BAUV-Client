<template>
	<div class="_containerSpeed">
		<div class="_block_title">
			<span>VELOCITY</span>
		</div>

		<div class="_content">
			<!-- absolute_linear_velocity -->
			<div class="_vel_block">
				<div class="_vel_block_title">
					<span>ABSOLUTE VELOCITY</span>
				</div>
				<div class="_vel_block_row">
					<div class="_vel_block_col">
						<div class="data">
							{{ $store.getters.absolute_linear_velocity.vx }}
							<span>m/s</span>
						</div>
						<div class="title">vx</div>
					</div>
					<div class="_vel_block_col">
						<div class="data">
							{{ $store.getters.absolute_linear_velocity.vy }}
							<span>m/s</span>
						</div>
						<div class="title">vy</div>
					</div>
					<div class="_vel_block_col">
						<div class="data">
							{{ $store.getters.absolute_linear_velocity.vz }}
							<span>m/s</span>
						</div>
						<div class="title">vz</div>
					</div>
				</div>
			</div>

			<!-- relative_linear_velocity -->
			<div class="_vel_block">
				<div class="_vel_block_title">
					<span>RELATIVE VELOCITY</span>
				</div>
				<div class="_vel_block_row">
					<div class="_vel_block_col">
						<div class="data">
							{{ $store.getters.relative_linear_velocity.vx }}
							<span>m/s</span>
						</div>
						<div class="title">vx</div>
					</div>
					<div class="_vel_block_col">
						<div class="data">
							{{ $store.getters.relative_linear_velocity.vy }}
							<span>m/s</span>
						</div>
						<div class="title">vy</div>
					</div>
					<div class="_vel_block_col">
						<div class="data">
							{{ $store.getters.relative_linear_velocity.vz }}
							<span>m/s</span>
						</div>
						<div class="title">vz</div>
					</div>
				</div>
			</div>

			<!-- orientation_rate -->
			<div class="_vel_block">
				<div class="_vel_block_title">
					<span>ORIENTATION RATE</span>
				</div>
				<div class="_vel_block_row">
					<div class="_vel_block_col">
						<div class="data">
							{{ $store.getters.orientation_rate.roll }}
							<span>rad/s</span>
						</div>
						<div class="title">roll</div>
					</div>
					<div class="_vel_block_col">
						<div class="data">
							{{ $store.getters.orientation_rate.pitch }}
							<span>rad/s</span>
						</div>
						<div class="title">pitch</div>
					</div>
					<div class="_vel_block_col">
						<div class="data">
							{{ $store.getters.orientation_rate.yaw }}
							<span>rad/s</span>
						</div>
						<div class="title">yaw</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Velocity'
}
</script>

<style scoped>
@import url('@/assets/styles/variables.css');

._containerSpeed {
	background-color: var(--block-background-color);
	border: 1px solid var(--border-color);
}
._containerSpeed ._content {
	padding: 5px 20px;
}

._vel_block {
	margin: 40px 0;
}
._vel_block:first-child {
	margin-top: 20px;
}
._vel_block:last-child {
	margin-bottom: 20px;
}
._vel_block ._vel_block_title {
	border-bottom: 1px solid var(--border-color);
	padding-bottom: 10px;
	margin-bottom: 10px;
}
._vel_block ._vel_block_row {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
}
._vel_block ._vel_block_col {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
._vel_block ._vel_block_col .data {
	font-size: 18px;
}
._vel_block ._vel_block_col .data span {
	font-size: 16px;
	opacity: 0.8;
}
._vel_block ._vel_block_col .title {
	font-size: 17px;
	opacity: 0.8;
}
</style>
