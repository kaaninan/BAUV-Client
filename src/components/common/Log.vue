<template>
	<div class="_containerLog">
		<div class="_block_title">
			<span>LOGS</span>
			<div class="_block_title_right" @click="clearLogs">
				<i class="fa-regular fa-trash-can" style="font-size: 18px" aria-hidden="true"></i>
			</div>
		</div>
		<div class="_content" v-if="$store.getters.logs.length > 0">
			<div class="_line" v-for="(line, index) in $store.getters.logs" :key="index">
				{{ line }}
			</div>
		</div>
		<div class="_content" v-if="$store.getters.logs.length == 0">
			<div class="_line">
				<span>No logs</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Log',
	methods: {
		clearLogs() {
			this.$store.commit('clearLogs')
		}
	}
}
</script>

<style scoped>
@import url('@/assets/styles/variables.css');

._containerLog{
	background-color: var(--block-background-color);
	border: 1px solid var(--border-color);
}
._containerLog ._content{
	padding: 5px 20px;
	max-height: 500px;
	overflow: scroll;
}
._containerLog ._content ._line{
	font-size: 14px;
	margin: 5px 0;
	white-space: pre-wrap;
	word-wrap: break-word;
}

</style>