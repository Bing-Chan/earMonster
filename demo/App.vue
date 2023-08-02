<template>
	<div>
		<div style="width: 500px;height: 300px;">
			<ear-sign width="500"></ear-sign>
		</div>

	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
	name: 'App',
	setup() {
		const state = reactive({
			include: ['perProgram', 'sectionPrice'],
			values: [],
		})

		return {
			...toRefs(state),
		}
	},
})
</script>
