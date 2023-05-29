<template>
	<ear-number-ranger v-mode:value="values"></ear-number-ranger>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
	setup() {
		const state = reactive({
			values: {},
		})
		return {
			...toRefs(state),
		}
	},
})
</script>
