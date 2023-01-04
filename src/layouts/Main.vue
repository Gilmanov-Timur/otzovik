<template>
	<Navbar />
	<main class="container pb-4">
		<RouterView/>
	</main>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
	components: {
		Navbar,
	}
}
</script>
