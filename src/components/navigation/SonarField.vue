<template>
	<div class="_containerMonoVideoField">
		<img src="@/assets/images/sonar2.png" alt="Sonar" />
	</div>
</template>

<script>

export default {
	name: 'SonarField'
}
</script>

<style scoped>

._containerMonoVideoField{
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	border: 1px solid var(--border-color);
	background-color: var(--block-background-color);
}


</style>