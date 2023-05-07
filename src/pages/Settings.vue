<template>
	<div class="_containerNavigation">Settings</div>
</template>

<script>
import AOS from 'aos'

export default {
	mounted() {
		AOS.init({ once: false })
	}
}
</script>

<style scoped>
@import '@/assets/styles/variables.css';
._containerNavigation {
	padding: calc(var(--screen-padding) / 2) var(--screen-padding);
}
</style>
