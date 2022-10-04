<template>
	<div class="_containerNavigation">
		<div class="row">
			<div class="col-xs-3" data-aos="fade">
				<Veloctiy />
			</div>
			<div class="col-xs-6" data-aos="fade" data-aos-delay='50'>
				<Map />
			</div>
			<div class="col-xs-3" data-aos="fade" data-aos-delay='100'>
				<Attitude />
				<Compass />
			</div>
		</div>
	</div>
</template>

<script>
import AOS from 'aos';
import Map from '@/components/navigation/Map.vue';
import Veloctiy from '../components/navigation/Veloctiy.vue';
import Compass from '@/components/navigation/Compass.vue';
import Attitude from '@/components/navigation/Attitude.vue';

export default {
	components: {
    Map,
    Veloctiy,
    Compass,
    Attitude
},
	mounted() {
		AOS.init({once: false})
	}
}
</script>

<style scoped>
@import '@/assets/styles/variables.css';
._containerNavigation{
	padding: calc(var(--screen-padding) / 2) var(--screen-padding);
}

</style>