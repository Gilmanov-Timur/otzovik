import { defineStore } from 'pinia'
import firebase from 'firebase/compat/app'
import { useErrorStore as errorStore } from './error'

export const useUserStore = defineStore('user', {
	state() {
		const currentUser = firebase.auth().currentUser
		return {
			user: currentUser
				? {
					uid: currentUser.uid,
					name: currentUser.displayName
				}
				: null,
		}
	},
	actions: {
		async login({email, password}) {
			try {
				const response = await firebase.auth().signInWithEmailAndPassword(email, password)
				this.user = {
					uid: response.user.uid,
					name: response.user.displayName,
				}
			} catch (e) {
				errorStore().setError(e)
				throw e
			}
		},
		async register({name, email, password}) {
			try {
				const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
				await response.user.updateProfile({
					displayName: name
				})
				this.user = {
					uid: response.user.uid,
					name
				}
			} catch (e) {
				errorStore().setError(e)
				throw e
			}
		},
		async logout() {
			try {
				await firebase.auth().signOut()
				this.user = null
			} catch (e) {
				errorStore().setError(e)
				throw e
			}
		},
	},
})
