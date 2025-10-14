<template>
	<div>
		<ear-stepper v-model="num"></ear-stepper>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
	setup() {
		const state = reactive({
			values: [],
			num: 0,
		})

		return {
			...toRefs(state),
		}
	},
})
</script>
