import { createRouter, createWebHistory } from 'vue-router'

function lazyLoad(view){
	return() => import(`@/pages/${view}.vue`)
}

const routes = [
	{ path: '/', component: lazyLoad('Home') },
	{ path: '/control', component: lazyLoad('Control') },
	{ path: '/misson', component: lazyLoad('Mission') },
	{ path: '/navigation', component: lazyLoad('Navigation') },
	{ path: '/settings', component: lazyLoad('Settings') },
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