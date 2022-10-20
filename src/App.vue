<template>
	<Header />
	<router-view />
</template>

<script>
// Font Awesome
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import Header from './components/common/Header.vue';

export default {
	name: "App",
	components: {
		Header
	},
	created() {
		this.$store.commit('createLog', {msg: 'App created', type: 'info', date: new Date()})
		// Change socket ip to default
		this.$store.commit('socketIP', 'http://localhost:1992')
		// this.$store.commit('socketIP', 'http://proxy55.rt3.io:37621')

		// Check Map
		// Check connection
		fetch('http://' + this.$store.state.mapServerIP + ':' + this.$store.state.mapServerPort)
			.then(response => {
				return this.$store.commit('setMapServerConnected', true)
			})
			.catch(error => {
				this.$store.commit('createLog', {
					type: 'error',
					message: 'Map server - Connection fail: ' + this.$store.state.mapServerIP + ':' + this.$store.state.mapServerPort,
					date: new Date(),
				});
				return this.$store.commit('setMapServerConnected', false)
			})

		setTimeout(() => {
			this.$store.dispatch('initSocket')
			this.$store.dispatch('connectSocket')
		}, 500);

		// Example
		setInterval(() => {
			if(this.$store.state.connected){
				// this.$store.dispatch('sendMessage', {event: 'ping', data: 'ping'})
				this.$store.dispatch('sendMessage', {event: 'GET_SUBSCRIBED_TOPICS'})
				
			}
		}, 2000);
	},
};
</script>

<style>
@import '@/assets/styles/variables.css';
@import 'aos/dist/aos.css';

html, body{
	background: rgb(19,53,79);
	background: radial-gradient(circle, rgba(19,53,79,1) 0%, rgba(5,20,34,1) 100%);
	/* background: radial-gradient(ellipse at center, #1C2837 0%, #050608 100%); */
	background-size: 100% 100%;
	background-repeat: no-repeat;
	min-height: 100vh;
	padding: 0;
	margin: 0;
	color: white;
	font-family: var(--font-family);
	min-width: var(--min-width);	
}

</style>