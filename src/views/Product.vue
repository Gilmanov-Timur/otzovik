<template>
	<div class="mb-3">
		<RouterLink :to="{name: 'home'}">
			&larr; Вернуться к списку товаров
		</RouterLink>
	</div>
	<div class="text-center" v-if="loading">
		<div class="spinner-border text-primary"></div>
	</div>
	<div class="row" v-else-if="product">
		<div class="col-md-6">
			<h1 class="mb-4 pb-3 h2 border-bottom">
				{{ product.title }}
			</h1>
			<div class="row mb-4">
				<div class="col-sm-6 mx-auto">
					<img
						:src="product.image"
						class="img-fluid"
						:alt="product.title"
					/>
				</div>
			</div>
			<p>{{ product.text }}</p>
		</div>
		<div class="col-md-6">
			<template v-if="user">
				<div class="alert alert-success" v-if="isAlreadyReviewed">
					Вы уже оставили отзыв на этот товар
				</div>
				<ReviewForm
					:loading="submitting"
					@submit="submitReview"
					v-else
				/>
			</template>
			<div class="alert alert-info" v-else>
				Только авторизованные пользватели могут оставлять отзывы.
			</div>
			<div v-if="reviews.length">
				<div class="h5 mt-4">Отзывы</div>
				<div
					class="card mb-3"
					:class="user?.uid === review.user_id ? 'border border-success' : ''"
					v-for="review in reviews"
					:key="review.user_id"
				>
					<div class="card-body px-3 py-2">
						<div><b>Автор:</b> {{ review.username }}</div>
						<div><b>Дата:</b> {{ new Date(review.date).toLocaleString() }}</div>
						<div><b>Оценка:</b> {{ review.rate }}</div>
						<div><b>Отзыв:</b> {{ review.text }}</div>
					</div>
				</div>
			</div>
			<template v-else>
				<hr />
				<div class="h4">Отзывов еще нет</div>
			</template>
		</div>
	</div>
	<div class="text-center" v-else>
		<h3>Товар не найден</h3>
		<RouterLink :to="{name: 'home'}">
			Выбрать другой
		</RouterLink>
	</div>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useProductStore } from '@/stores/product'
import { useReviewStore } from '@/stores/review'
import ReviewForm from '@/components/ReviewForm.vue'

export default {
	components: {
		ReviewForm,
	},
	data() {
		return {
			loading: false,
			submitting: false,
			product: null,
			reviews: [],
			productId: this.$route.params.id,
		}
	},
	async created() {
		await this.fetchData()
	},
	methods: {
		async fetchData() {
			try {
				this.loading = true
				const [product, reviews] = await Promise.all([
					useProductStore().fetchProduct(this.productId),
					useReviewStore().fetchReviews(this.productId),
				])
				this.product = product
				this.reviews = reviews
				this.loading = false
			} catch (e) {
				this.loading = false
			}
		},
		async submitReview({rate, text}) {
			try {
				this.submitting = true
				const review = await useReviewStore().saveReview({
					product_id: this.productId,
					user_id: this.user.uid,
					username: this.user.name,
					rate,
					text,
				})
				this.submitting = false
				this.reviews.unshift(review)
				this.$toast.success('Вы успешно оставили отзыв!')
			} catch (e) {
				this.submitting = false
			}
		}
	},
	computed: {
		...mapState(useUserStore, ['user']),
		isAlreadyReviewed() {
			if (this.user && this.reviews.length && this.reviews.find(review => review.user_id === this.user.uid)) {
				return true
			}
		},
	}
}
</script>
