import { createRouter, createWebHistory } from 'vue-router'

function lazyLoad(view){
	return() => import(`@/pages/${view}.vue`)
}

const routes = [
	{ path: '/', component: lazyLoad('Navigation') },
	{ path: '/mission-control', component: lazyLoad('MissionControl') },
	{ path: '/settings', component: lazyLoad('Settings') },
	{ path: '/manipulation', component: lazyLoad('Manipulation') },
	{ path: '/comms', component: lazyLoad('Comms') },
]


const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (to.hash) {
			return {
			  el: to.hash,
			  behavior: 'smooth',
			}
		}
		else if (savedPosition) {
			return savedPosition
		} else {
			return { top: 0 }
		}
	},
})

export default router