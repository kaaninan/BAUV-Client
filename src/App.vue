<template>
	<!-- <div>Socket Connected: {{ connected }}</div> -->
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
	computed: {
		connected () {
			return this.$store.state.connected
		},
		socket () {
			return this.$store.state.socket
		}
	},
	created() {
		this.$store.commit('createLog', {msg: 'App created', type: 'info', date: new Date()})

		this.socket.on('connect', (data) => {
			this.$store.commit('createLog', {msg: 'Socket connected', type: 'info', date: new Date()})
			this.$store.commit('setConnected', true)
		})
		this.socket.on('disconnect', (data) => {
			this.$store.commit('createLog', {msg: 'Socket disconnected', type: 'info', date: new Date()})
			this.$store.commit('setConnected', false)
		})
		this.socket.on('error', (data) => {
			this.$store.commit('createLog', {msg: 'Socket error', type: 'error', date: new Date()})
			this.$store.commit('setConnected', false)
		})
		this.socket.on('connect_error', (data) => {
			this.$store.commit('createLog', {msg: 'Socket connect error', type: 'error', date: new Date()})
			this.$store.commit('setConnected', false)
		})
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