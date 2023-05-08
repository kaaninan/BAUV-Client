<template>
	<div class="_containerNavigation">
		<div class="row">
			<div class="col-xs-3" data-aos="fade">
				<Connection />
			</div>
			<div class="col-xs-6" data-aos="fade" data-aos-delay="50">
				<Log />
			</div>
			<div class="col-xs-3" data-aos="fade" data-aos-delay="100" />
		</div>
	</div>
</template>

<script>
import AOS from 'aos'
import Connection from '@/components/comms/Connection.vue'
import Log from '@/components/comms/Log.vue'

export default {
	components: { Connection, Log },
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
