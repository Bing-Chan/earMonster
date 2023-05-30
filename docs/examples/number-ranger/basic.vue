<template>
	<ear-number-ranger :modelValue="values"></ear-number-ranger>
	<span>{{values}}</span>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue'

export default defineComponent({
	setup() {
		const state = reactive({
			values: [],
		})

		watch(
			() => state.values,
			() => {
				console.log(state.values, 'values1111')
			},
		)

		return {
			...toRefs(state),
		}
	},
})
</script>
