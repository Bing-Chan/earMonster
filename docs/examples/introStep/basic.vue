<template>
	<p>
		<ga-button type="primary">菜单一</ga-button>
		<ga-button type="success">菜单二</ga-button>
		<ga-button type="info">菜单三</ga-button>
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
