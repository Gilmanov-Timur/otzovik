import { createApp } from 'vue'
import { createPinia, setMapStoreSuffix } from 'pinia'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import { useToast } from 'vue-toastification'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'vue-toastification/dist/index.css'
import '@/assets/main.scss'

setMapStoreSuffix('')

firebase.initializeApp({
	apiKey: "AIzaSyCCOPYtNtJ3eIj5hZ4NG2s23Zm8LQg8CcU",
	authDomain: "vue3-http-d5593.firebaseapp.com",
	databaseURL: "https://vue3-http-d5593-default-rtdb.firebaseio.com",
	projectId: "vue3-http-d5593",
	storageBucket: "vue3-http-d5593.appspot.com",
	messagingSenderId: "659073347795",
	appId: "1:659073347795:web:98a3259ea4dc59404d2426"
})

let app
firebase.auth().onAuthStateChanged(() => {
	if (!app) {
		app = createApp(App)
		app.use(createPinia())
		app.use(router)
		app.use(Toast)
		app.config.globalProperties.$toast = useToast()
		app.mount('#app')
	}
})
