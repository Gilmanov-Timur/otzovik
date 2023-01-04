import { defineStore } from 'pinia'
import { useErrorStore as errorStore } from './error'

export const useProductStore = defineStore('product', {
	actions: {
		async fetchProducts() {
			try {
				const response = await fetch('https://vue3-http-d5593-default-rtdb.firebaseio.com/products.json')
				const products = await response.json()
				return products ? Object.values(products) : []
			} catch (e) {
				errorStore().setError(e)
				throw e
			}
		},
		async fetchProduct(id) {
			try {
				const response = await fetch(`https://vue3-http-d5593-default-rtdb.firebaseio.com/products/_${id}.json`)
				return await response.json()
			} catch (e) {
				errorStore().setError(e)
				throw e
			}
		},
	},
})
