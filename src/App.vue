<template>
	<div>Socket Connected: {{ connected }}</div>
	<Header />
	<router-view />
	
</template>

<script>

import Header from './components/common/Header.vue';

export default {
	name: "App",
	components: {
		Header
	},
	computed: {
		connected () {
			return this.$store.state.connected
		},
		socket () {
			return this.$store.state.socket
		}
	},
	created() {
		this.socket.on('connect', (data) => {
			this.$store.commit('setConnected', true)
		})
		this.socket.on('disconnect', (data) => {
			this.$store.commit('setConnected', false)
		})
	},
};
</script>

<style>

html, body{
	background: rgb(19,53,79);
	background: radial-gradient(circle, rgba(19,53,79,1) 0%, rgba(5,20,34,1) 100%);
	/* background-repeat: no-repeat; */
	/* back */
}

</style>