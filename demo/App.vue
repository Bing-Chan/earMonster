<template>
	<div>asdsad</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
	name: 'App',
	setup() {
		const state = reactive({
			include: ['perProgram', 'sectionPrice'],
		});

		return {
			...toRefs(state),
		};
	},
});
</script>
