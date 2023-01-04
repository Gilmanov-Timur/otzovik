import {createRouter, createWebHistory} from 'vue-router'
import MainLayout from '@/layouts/Main.vue'
import EmptyLayout from '@/layouts/Empty.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			meta: {layout: MainLayout},
			component: () => import('../views/Home.vue')
		},
		{
			path: '/product/:id',
			name: 'product',
			meta: {layout: MainLayout},
			component: () => import('../views/Product.vue')
		},
		{
			path: '/register',
			name: 'register',
			meta: {layout: EmptyLayout},
			component: () => import('../views/Register.vue')
		},
		{
			path: '/login',
			name: 'login',
			meta: {layout: EmptyLayout},
			component: () => import('../views/Login.vue')
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'not-found',
			redirect: {name: 'home', params: {}}
		}
	]
})

export default router
