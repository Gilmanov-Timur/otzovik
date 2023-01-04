<template>
	<div class="row">
		<div class="col-md-6 mx-auto">
			<div class="card mb-3 shadow-sm">
				<div class="card-header h5 text-center">
					Авторизация
				</div>
				<div class="card-body">
					<form class="mb-3" @submit.prevent="onSubmit" novalidate>
						<div class="form-group">
							<label for="email">Email</label>
							<input
								type="email"
								class="form-control"
								:class="{'is-invalid': vuelidate.form.email.$error && submitted}"
								id="email"
								v-model.trim="vuelidate.form.email.$model"
							/>
							<div v-if="vuelidate.form.email.required.$invalid && submitted" class="invalid-feedback">
								Введите email
							</div>
							<div v-else-if="vuelidate.form.email.email.$invalid && submitted" class="invalid-feedback">
								Неверный формат email
							</div>
						</div>
						<div class="form-group">
							<label for="password">Пароль</label>
							<input
								type="password"
								class="form-control"
								:class="{'is-invalid': vuelidate.form.password.$error && submitted}"
								id="password"
								v-model.trim="vuelidate.form.password.$model"
							/>
							<div v-if="vuelidate.form.password.required.$invalid && submitted" class="invalid-feedback">
								Введите пароль
							</div>
							<div v-else-if="vuelidate.form.password.minLength.$invalid && submitted" class="invalid-feedback">
								Минимальная длина пароля {{ vuelidate.form.password.minLength.$params.min }} символов
							</div>
						</div>
						<button
							type="submit"
							class="btn btn-primary btn-block"
							:class="{loading: loading}"
							:disabled="loading"
						>
							Войти
						</button>
					</form>
					<div class="text-center">
						Нет аккаунта?
						<router-link :to="{name: 'register'}">
							Регистрация
						</router-link>
					</div>
				</div>
			</div>
			<div class="text-center">
				<RouterLink :to="{name: 'home'}">
					Вернуться на главную
				</RouterLink>
			</div>
		</div>
	</div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { useUserStore } from '@/stores/user'

export default {
	data() {
		return {
			vuelidate: useVuelidate(),
			submitted: false,
			loading: false,
			form: {
				email: '',
				password: '',
			},
		}
	},
	validations: {
		form: {
			email: {
				required,
				email,
			},
			password: {
				required,
				minLength: minLength(6),
			},
		},
	},
	methods: {
		async onSubmit() {
			this.submitted = true
			this.vuelidate.form.$touch()

			if (this.vuelidate.form.$invalid) {
				return
			}

			try {
				this.loading = true
				await useUserStore().login({
					email: this.form.email,
					password: this.form.password
				})
				this.loading = false
				this.$toast.success('Вы успешно авторизовались!')
				this.$router.replace({name: 'home'})
			} catch (e) {
				this.loading = false
			}
		}
	}
}
</script>
