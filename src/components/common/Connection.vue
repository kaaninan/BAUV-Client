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
				<div class="title">Map Server:</div>
				<div class="data"
					:class="{_success: $store.getters.mapServerConnected, _error: !$store.getters.mapServerConnected}">
					{{ $store.getters.mapServerConnected ? 'Connected' : 'Disconnected' }}
				</div>
			</div>
			
			<div class="_category">
				<div class="title">ROS Bridge:</div>
				<div class="data"
					:class="{
						_disabled: !$store.getters.socketConnected,
						_success: $store.getters.rosbridgeStatus == 'connected',
						_error: $store.getters.rosbridgeStatus == 'disconnected',
						_unknown: $store.getters.rosbridgeStatus == 'unknown'
					}">
					{{ $store.getters.rosbridgeStatus == 'disconnected' ? 'Disconnected' : null }}
					{{ $store.getters.rosbridgeStatus == 'connected' ? 'Connected' : null }}
					{{ $store.getters.rosbridgeStatus == 'unknown' ? 'Unknown' : null }}
				</div>
			</div>
			
			<div class="_category">
				<div class="title">Socket IP:</div>
				<div v-if="!ipChangeEnable" class="data clickable" @click="changeIP"
					:class="{_disabled: !$store.getters.socketConnected}">
					{{ socketIP }}
				</div>
				<div v-if="ipChangeEnable" class="data">
					<!-- Input -->
					<input @keyup.enter="changeIP" ref="input" v-model="localSocketIP" type="text" placeholder="Socket IP" class="ipInput">
				</div>
			</div>

			<div class="_category _float _buttons">
				<div v-if="$store.getters.socketConnected" class="link error" @click="disconnect">Disconnect</div>
				<div v-if="!$store.getters.socketConnected" class="link success" @click="connect">Connect</div>
				<div class="link" @click="changeIP">{{ ipChangeEnable ? "Done" : "Change IP" }}</div>
			</div>
			
		</div>
	</div>
</template>

<script>
export default {
	name: 'Connection',
	data() {
		return {
			ipChangeEnable: false,
			localSocketIP: null
		}
	},
	computed: {
		socketIP() {
			return this.$store.state.socketIP
		}
	},
	created() {
		this.localSocketIP = this.$store.state.socketIP
	},
	methods: {
		changeIP() {
			if(!this.ipChangeEnable){
				this.ipChangeEnable = true;
				this.$nextTick(() => this.$refs.input.focus())
			}else{
				// if ip address is changed
				if(this.localSocketIP != this.$store.state.socketIP){
					this.$store.dispatch('disconnectSocket')
					this.$store.commit('socketIP', this.localSocketIP)
					this.$store.dispatch('initSocket')
					this.$store.dispatch('connectSocket')
					console.log(this.localSocketIP, this.$store.state.socketIP)
				}
				this.ipChangeEnable = false;
			}
		},
		disconnect() {
			this.$store.dispatch('disconnectSocket')
		},
		connect() {
			this.$store.dispatch('initSocket')
			this.$store.dispatch('connectSocket')
		}
	}
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
	padding: 10px 20px;
}
._containerConnection ._content ._category{
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	min-height: 30px;
	/* border: 1px solid red; */
}
._containerConnection ._content ._float{
	height: auto;
}
._containerConnection ._content ._category .title{
	opacity: 0.7;
	font-size: 15px;
	white-space: nowrap;
	margin: 10px 0;
	margin-right: 10px;
}
._containerConnection ._content ._category .data{
	transition: all 0.3s ease-in-out;
	font-size: 15px;
}
._containerConnection ._content ._category .data .ipInput{
	background-color: var(--block-background-color);
	color: white;
	font-family: var(--font-family);
	font-size: 13px;
	border: 1px solid var(--border-color);
	border-radius: 5px;
	padding: 4px;
}

/* Labels */
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
._containerConnection ._content ._category ._unknown{
	display: flex;
	background-color: gray;
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


/* Buttons */

._containerConnection ._content ._buttons{
	padding-top: 10px;
	margin-top: 10px;
	margin-bottom: 10px;
}
._containerConnection ._content ._buttons .link{
	white-space: nowrap;
	cursor: pointer;
	border: 1px solid var(--border-color);
	padding: 10px;
	transition: all .3s ease-in-out;
	/* not selectable */
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

._containerConnection ._content ._buttons .link:hover{
	background-color: var(--block-background-color);
	border: 1px solid var(--active-color);
}
._containerConnection ._content ._buttons .error:hover{
	border: 1px solid red !important;
}
._containerConnection ._content ._buttons .success:hover{
	border: 1px solid lightgreen !important;
}

</style>