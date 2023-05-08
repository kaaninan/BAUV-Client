<template>
	<Header />
	<router-view />
</template>

<script>
import Header from './components/common/Header.vue'

export default {
	name: 'App',
	components: {
		Header
	},
	created() {
		this.$store.commit('createLog', {
			message: 'App created',
			type: 'info',
			date: new Date()
		})
		// Change socket ip to default
		// this.$store.commit('socketIP', 'http://localhost:1992')
		// this.$store.commit('socketIP', 'http://proxy55.rt3.io:37621')

		// Check Map
		// Check connection
		// fetch(
		// 	'http://' +
		// 		this.$store.state.mapServerIP +
		// 		':' +
		// 		this.$store.state.mapServerPort
		// )
		// 	.then(() => {
		// 		return this.$store.commit('setMapServerConnected', true)
		// 	})
		// 	.catch(() => {
		// 		this.$store.commit('createLog', {
		// 			type: 'error',
		// 			message:
		// 				'Map server - Connection fail: ' +
		// 				this.$store.state.mapServerIP +
		// 				':' +
		// 				this.$store.state.mapServerPort,
		// 			date: new Date()
		// 		})
		// 		return this.$store.commit('setMapServerConnected', false)
		// 	})

		// setTimeout(() => {
		// 	this.$store.dispatch('initSocket')
		// 	this.$store.dispatch('connectSocket')
		// }, 500)

		// // Example
		// setInterval(() => {
		// 	if (this.$store.state.connected) {
		// 		// this.$store.dispatch('sendMessage', {event: 'ping', data: 'ping'})
		// 		this.$store.dispatch('sendMessage', {
		// 			event: 'GET_SUBSCRIBED_TOPICS'
		// 		})
		// 	}
		// }, 2000)
	}
}
</script>

<style>
@import 'aos/dist/aos.css';

#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	min-width: 1024px;
}
</style>
