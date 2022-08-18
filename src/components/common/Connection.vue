<template>
	<div class="_containerConnection">
		<div class="_block_title">
			<span>CONNECTION</span>
		</div>
		<div class="_content">
			<div class="_category">
				<div class="title">Socket:</div>
				<div class="data"
					:class="{_success: $store.getters.socketConnected, _error: !$store.getters.socketConnected}">
					{{ $store.getters.socketConnected ? 'Connected' : 'Disconnected' }}
				</div>
			</div>
			<div class="_category">
				<div class="title">ROS Bridge:</div>
				<div class="data"
					:class="{_disabled: !$store.getters.socketConnected, _success: $store.getters.rosbridgeStatus == 'connected', _error: $store.getters.rosbridgeStatus == 'disconnected'}">
					{{ $store.getters.rosbridgeStatus == 'disconnected' ? 'Disconnected' : 'Connected' }}
				</div>
			</div>
			<div class="_category">
				<div class="title">Socket IP:</div>
				<div class="data clickable"
					:class="{_disabled: !$store.getters.socketConnected}">
					{{ $store.getters.socketIP }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Connection',
}
</script>

<style scoped>
@import url('@/assets/styles/variables.css');
._containerConnection{
	background-color: var(--block-background-color);
	border: 1px solid var(--border-color);
	margin-bottom: var(--block-margin);
}
._containerConnection ._content{
	padding: 5px 20px;
}
._containerConnection ._content ._category{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin: 10px 0;
	/* border: 1px solid white; */
}
._containerConnection ._content ._category .title{
	opacity: 0.7;
}
._containerConnection ._content ._category .data{
	transition: all 0.3s ease-in-out;
}

._containerConnection ._content ._category ._success{
	display: flex;
	background-color: rgba(0, 255, 0, 0.8);
	border-radius: 5px;
	padding: 3px 10px;
}
._containerConnection ._content ._category ._error{
	display: flex;
	background-color: rgba(255, 0, 0, 0.8);
	border-radius: 5px;
	padding: 3px 10px;
}
._containerConnection ._content ._category ._disabled{
	opacity: .3;
}
._containerConnection ._content ._category .clickable{
	cursor: pointer;
	text-decoration: underline;
}

</style>