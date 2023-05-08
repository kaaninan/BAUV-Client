<template>
	<div class="_containerNavigation">Manipulation</div>
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
._containerNavigation {
	padding: calc(var(--screen-padding) / 2) var(--screen-padding);
}
</style>
