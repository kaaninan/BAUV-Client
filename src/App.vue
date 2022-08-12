<template>
	<div>Socket Connected: {{ connected }}</div>
</template>

<script>
export default {
	name: "App",
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
	}
};
</script>

<style scoped>

</style>