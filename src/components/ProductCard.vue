<template>
	<RouterLink
		:to="{name: 'product', params: {id: product.id}}"
		class="card pt-3 h-100 text-decoration-none"
	>
		<span class="card-image">
			<img
				:src="product.image"
				class="card-img-top"
				:alt="product.title"
			/>
		</span>
		<span class="card-body p-3">
			<span class="card-title mb-0 h5">
				{{ product.title }}
			</span>
			<span class="d-block mb-n2 text-dark" v-if="product.rate">
				<span class="rate text-warning">
					<span class="stars" :style="{width: `${product.rate / 5 * 100}%`}">
						&starf;&starf;&starf;&starf;&starf;
					</span>
				</span>
				<span class="align-text-bottom ml-1">
					({{ product.rate }})
				</span>
			</span>
		</span>
	</RouterLink>
</template>

<script>
export default {
	props: {
		product: Object,
	}
}
</script>

<style lang="scss" scoped>
.card-image {
	display: block;
	position: relative;
	width: 100%;
	height: 0;
	padding-bottom: 100%;
	border-left: 1rem solid transparent;
	border-right: 1rem solid transparent;

	img {
		position: absolute;
		left: 50%;
		top: 50%;
		max-width: 100%;
		max-height: 100%;
		transform: translate(-50%, -50%);
		object-fit: contain;
	}
}
.card-title {
	display: block;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	line-height: normal;
}
.rate {
	position: relative;
	display: inline-block;
	font-size: 2rem;
	&:before {
		content: '☆☆☆☆☆';
		display: block;
		color: gray;
	}
	.stars {
		position: absolute;
		overflow: hidden;
		left: 0;
		top: 0;
		white-space: nowrap;
	}
}
</style>