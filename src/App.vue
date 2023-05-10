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

		// Check Socket
		this.$store.dispatch('connectSocket')

		// Check Map Connection
		fetch(
			'http://' +
				this.$store.state.mapServerIP +
				':' +
				this.$store.state.mapServerPort
		)
			.then(() => {
				return this.$store.commit('setMapServerConnected', true)
			})
			.catch(() => {
				this.$store.commit('createLog', {
					type: 'error',
					message:
						'Map server - Connection fail: ' +
						this.$store.state.mapServerIP +
						':' +
						this.$store.state.mapServerPort,
					date: new Date()
				})
				return this.$store.commit('setMapServerConnected', false)
			})
	}
}
</script>

<style>
html,
body {
	background: rgb(19, 53, 79);
	background: radial-gradient(
		circle,
		rgba(19, 53, 79, 1) 0%,
		rgba(5, 20, 34, 1) 100%
	);
	background-size: 100% 100%;
	background-repeat: no-repeat;
	min-height: 100vh;
	padding: 0;
	margin: 0;
	font-family: var(--font-family);
	min-width: var(--min-width);
	color: white;
}
</style>
