<template>
	<header class="bg-light mb-4">
		<nav class="navbar navbar-light container">
			<RouterLink :to="{name: 'home'}" class="navbar-brand h1 mb-0">
				Otzovik
			</RouterLink>
			<form class="form-inline">
				<template v-if="user">
					<span class="mr-3">
						{{ user.name }}
					</span>
					<button type="button" class="btn btn-primary" @click="logout">
						Выйти
					</button>
				</template>
				<template v-else>
					<router-link :to="{name: 'register'}" class="btn btn-link my-2 my-sm-0">
						Регистрация
					</router-link>
					<router-link :to="{name: 'login'}" class="btn btn-primary my-2 my-sm-0">
						Войти
					</router-link>
				</template>
			</form>
		</nav>
	</header>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
	methods: {
		logout() {
			useUserStore().logout()
			this.$toast.info('Вы вышли из системы')
		},
	},
	computed: {
		...mapState(useUserStore, ['user']),
	}
}
</script>