import { createRouter, createWebHistory } from 'vue-router'

import Navigation from '@/pages/Navigation.vue'
import MissionControl from '@/pages/MissionControl.vue'
import Settings from '@/pages/Settings.vue'
import Manipulation from '@/pages/Manipulation.vue'
import Comms from '@/pages/Comms.vue'

const routes = [
	{ path: '/', component: Navigation },
	{ path: '/mission-control', component: MissionControl },
	{ path: '/settings', component: Settings },
	{ path: '/manipulation', component: Manipulation },
	{ path: '/comms', component: Comms }
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
