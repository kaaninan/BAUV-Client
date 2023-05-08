<template>
	<div class="_containerLog">
		<div class="_block_title">
			<span>LOGS</span>
			<div class="_block_title_right" @click="clearLogs">
				<i
					class="fa-regular fa-trash-can"
					style="font-size: 18px"
					aria-hidden="true"
				/>
			</div>
		</div>
		<div v-if="logs.length > 0" class="_content">
			<div v-for="(line, index) in logs" :key="index" class="_line">
				{{ line.type }} - {{ line.message }} -
				{{ printDate(line.date) }}
			</div>
		</div>
		<div v-if="logs.length == 0" class="_content">
			<div class="_line">
				<span>No logs</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Log',
	computed: {
		logs() {
			return this.$store.state.logs
		}
	},
	methods: {
		clearLogs() {
			this.$store.commit('clearLogs')
		},
		printDate(date) {
			return new Date(date).toLocaleString()
		}
	}
}
</script>

<style scoped>
._containerLog {
	background-color: var(--block-background-color);
	border: 1px solid var(--border-color);
}
._containerLog ._content {
	padding: 5px 20px;
	max-height: 500px;
	overflow: scroll;
}
._containerLog ._content ._line {
	font-size: 14px;
	margin: 5px 0;
	white-space: pre-wrap;
	word-wrap: break-word;
}
</style>
