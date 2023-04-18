<template>
	<div class="_containerNavigation">
		<div class="row">
			<!-- <VueWinBox
				ref="wbRef"
				:options="{
					title: 'SONAR FIELD',
					background: '#081928'
				}"
			>
				<SonarField />
			</VueWinBox> -->

			<div class="col-xs-10" data-aos="fade" data-aos-delay="50">
				<Map />
			</div>
			<div class="col-xs-2" data-aos="fade" data-aos-delay="100">
				<Attitude />
				<Compass />
				<Power />
				<Connection :minimal="true" />
				<Chronometer />
			</div>
		</div>
	</div>
</template>

<script>
// import VueWinBox from 'vue-winbox'
import AOS from 'aos'
import Map from '@/components/navigation/Map.vue'
import Compass from '@/components/navigation/Compass.vue'
import Attitude from '@/components/navigation/Attitude.vue'
import Connection from '@/components/common/Connection.vue'
import Power from '@/components/navigation/Power.vue'
import Chronometer from '@/components/navigation/Chronometer.vue'
// import SonarField from '@/components/navigation/SonarField.vue'

export default {
	name: 'Navigation',
	components: {
		Map,
		Compass,
		Attitude,
		Connection,
		// VueWinBox,
		Power,
		Chronometer
		// SonarField
	},
	mounted() {
		AOS.init({
			once: false
		})
	}
}
</script>

<style scoped>
@import '@/assets/styles/variables.css';

._containerNavigation {
	padding: calc(var(--screen-padding) / 2) var(--screen-padding);
}
</style>
