<template>
	<div class="_containerNavigation">
		<!-- <VueWinBox>
			<SonarField />
		</VueWinBox> -->

		<div style="display: flex; flex-direction: row">
			<div style="display: flex; flex-grow: 1">
				<Map />
			</div>
			<div
				style="display: flex; flex-direction: column; width: 250px"
				data-aos="fade"
				data-aos-delay="100"
			>
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
import AOS from 'aos'
import Map from '@/components/map/Map.vue'
import Compass from '@/components/navigation/Compass.vue'
import Attitude from '@/components/navigation/Attitude.vue'
import Connection from '@/components/comms/Connection.vue'
import Power from '@/components/navigation/Power.vue'
import Chronometer from '@/components/navigation/Chronometer.vue'
import { VueWinBox } from 'vue-winbox'
import SonarField from '@/components/navigation/SonarField.vue'

export default {
	name: 'Navigation',
	components: {
		Map,
		Compass,
		Attitude,
		Connection,
		Power,
		Chronometer,
		// eslint-disable-next-line vue/no-unused-components
		VueWinBox,
		// eslint-disable-next-line vue/no-unused-components
		SonarField
	},
	data() {
		return {
			// count: ref(0),
			options: {
				title: 'Navigation',
				width: '50%',
				height: '50%',
				x: 'center',
				y: 'center',
				minWidth: 300,
				minHeight: 300,
				onfocus: () => {
					this.count++
				}
			}
		}
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
