import { createRouter, createWebHistory } from 'vue-router'

import Navigation from '@/pages/Navigation.vue'
import MissionControl from '@/pages/MissionControl.vue'
import Settings from '@/pages/Settings.vue'
import Manipulation from '@/pages/Manipulation.vue'
import Comms from '@/pages/Comms.vue'

const routes = [
	{ name: 'Navigation', path: '/', component: Navigation },
	{
		name: 'MissionControl',
		path: '/mission-control',
		component: MissionControl
	},
	{ name: 'Settings', path: '/settings', component: Settings },
	{ name: 'Manipulation', path: '/manipulation', component: Manipulation },
	{ name: 'Comms', path: '/comms', component: Comms }
]

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (to.hash) {
			return {
				el: to.hash,
				behavior: 'smooth'
			}
		} else if (savedPosition) {
			return savedPosition
		} else {
			return { top: 0 }
		}
	}
})

export default router
