<template>
	<div class="_containerNavigation">
		<div class="row">
			<div class="col-xs-3" data-aos="fade">
				<Connection />
				<Veloctiy />
			</div>
			<div class="col-xs-6" data-aos="fade" data-aos-delay='50'>
				<Map />
			</div>
			<div class="col-xs-3" data-aos="fade" data-aos-delay='100'>
				<Log />
			</div>
		</div>
	</div>
</template>

<script>
import AOS from 'aos';
import Map from '@/components/navigation/Map.vue';
import Connection from '@/components/common/Connection.vue';
import Log from '@/components/common/Log.vue';
import Veloctiy from '../components/navigation/Veloctiy.vue';

export default {
	components: {
	Map,
	Connection,
	Log,
	Veloctiy
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