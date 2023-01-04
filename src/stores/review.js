import { defineStore } from 'pinia'
import { useErrorStore as errorStore } from './error'
import firebase from 'firebase/compat/app'

export const useReviewStore = defineStore('review', {
	actions: {
		async fetchReviews(product_id = null) {
			try {
				const url = `https://vue3-http-d5593-default-rtdb.firebaseio.com/reviews${ product_id ? '/_' + product_id : '' }.json`
				const response = await fetch(url)
				const reviews = await response.json()

				if (reviews) {
					if (product_id) {
						return Object.values(reviews).sort((a, b) => b.date - a.date)
					} else {
						return Object.values(reviews).map(group => Object.values(group)).flat()
					}
				}

				return []
			} catch (e) {
				errorStore().setError(e)
				throw e
			}
		},
		async saveReview({product_id, user_id, username, rate, text}) {
			const review = {
				product_id,
				user_id,
				username,
				rate,
				text,
				date: Date.now()
			}

			try {
				await firebase.database().ref(`/reviews/_${product_id}`).push(review)
				return review
			} catch (e) {
				errorStore().setError(e)
				throw e
			}
		},
	},
})
