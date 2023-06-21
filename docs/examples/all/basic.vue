<template>
	<div></div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
	setup() {
		const state = reactive({
			show: false,
		})

		

		return {
			...toRefs(state),
		}
	},
})
</script>
