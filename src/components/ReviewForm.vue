<template>
	<form class="card" @submit.prevent="onSubmit">
		<div class="card-header h5 px-3">
			Ваш отзыв
		</div>
		<div class="card-body p-3">
			<div class="form-group">
				<label>Ваша оценка</label>
				<div class="stars" :class="vuelidate.form.$model.rate ? 'text-warning' : 'text-dark'">
					<span
						class="star"
						v-for="rate in 5"
						@click="vuelidate.form.$model.rate = rate"
					>
						{{ rate <= vuelidate.form.$model.rate ? '&starf;' : '&star;' }}
					</span>
				</div>
				<div v-if="vuelidate.form.rate.valid.$invalid && submitted" class="d-block invalid-feedback">
					Поставьте оценку
				</div>
			</div>
			<div class="form-group">
				<label for="text">Отзыв</label>
				<textarea
					id="text"
					class="form-control"
					:class="{'is-invalid': vuelidate.form.text.$error && submitted}"
					rows="3"
					placeholder="Напишите отзыв"
					v-model.trim="vuelidate.form.text.$model"
				/>
				<div v-if="vuelidate.form.text.required.$invalid && submitted" class="invalid-feedback">
					Напишите отзыв
				</div>
				<div v-else-if="vuelidate.form.text.minLength.$invalid && submitted" class="invalid-feedback">
					Минимальная длина отзыва {{ vuelidate.form.text.minLength.$params.min }} символов
				</div>
			</div>
			<button
				class="btn btn-primary"
				:class="{loading: loading}"
				:disabled="loading"
			>
				Отправить отзыв
			</button>
		</div>
	</form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import {required, minLength} from '@vuelidate/validators'

export default {
	props: {
		loading: Boolean,
	},
	emits: ['submit'],
	data() {
		return {
			vuelidate: useVuelidate(),
			submitted: false,
			form: {
				rate: 0,
				text: '',
			}
		}
	},
	validations: {
		form: {
			rate: {
				valid(rate) {
					return rate > 0
				}
			},
			text: {
				required,
				minLength: minLength(10),
			},
		},
	},
	methods: {
		onSubmit() {
			this.submitted = true
			this.vuelidate.form.$touch()

			if (this.vuelidate.form.$invalid) {
				return
			}

			this.$emit('submit', this.form)
		}
	},
}
</script>

<style lang="scss" scoped>
.stars {
	display: flex;
	overflow: hidden;
	font-size: 2rem;
	line-height: 1rem;
	user-select: none;
	.star {
		padding-bottom: 0.25rem;
		cursor: pointer;
	}
}
</style>