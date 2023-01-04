<template>
	<component :is="$route.meta.layout" />
</template>

<script>
import { mapState } from 'pinia'
import { useErrorStore } from '@/stores/error'

export default {
	computed: {
		...mapState(useErrorStore, ['error']),
	},
	watch: {
		error(error) {
			this.$toast.error(error.message || 'Ошибка сети')
		}
	}
}
</script>
