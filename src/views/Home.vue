<template>
	<h1 class="mb-4 text-center">
		Популярные товары
	</h1>
	<div class="text-center" v-if="loading">
		<div class="spinner-border text-primary"></div>
	</div>
	<div class="row" v-else-if="products.length">
		<div class="col-sm-6 col-lg-3 mb-4" v-for="product in products" :key="product.id">
			<ProductCard :product="product"	/>
		</div>
	</div>
	<h3 class="text-center" v-else>
		Товаров нет
	</h3>
</template>

<script>
import { useProductStore } from '@/stores/product'
import { useReviewStore } from '@/stores/review'
import ProductCard from '@/components/ProductCard.vue'

export default {
	components: {
		ProductCard,
	},
	data() {
		return {
			loading: false,
			products: [],
		}
	},
	async created() {
		await this.fetchData()
	},
	methods: {
		async fetchData() {
			try {
				this.loading = true
				const [products, reviews] = await Promise.all([
					useProductStore().fetchProducts(),
					useReviewStore().fetchReviews(),
				])

				products.forEach(product => {
					const rates = reviews.reduce((all, review) => {
						if (review.product_id === product.id) {
							all.push(review.rate)
						}
						return all
					}, [])

					if (rates.length) {
						const rate = rates.reduce((acc, cur) => acc + cur, 0) / rates.length
						product.rate = Number(rate.toFixed(1))
					} else {
						product.rate = 0
					}
				})

				this.products = products
				this.loading = false
			} catch (e) {
				this.loading = false
			}
		},
	},
}
</script>