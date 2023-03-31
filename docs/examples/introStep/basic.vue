<template>
	<p>
		<d-button type="primary">菜单一</d-button>
		<d-button type="success">菜单二</d-button>
		<d-button type="info">菜单三</d-button>
	</p>
</template>
<script lang="ts">
import {  defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
	setup() {
		const state = reactive({
			config: 1
		})

		return {
			...toRefs(state),
		}
	},
})
</script>
