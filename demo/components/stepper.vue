<template>
	<div style="width: 300px; line-height: 40px">
		<ear-stepper v-model="num"></ear-stepper>
	</div>
</template>
<script lang="ts">
import { ref, getCurrentInstance, defineComponent, onMounted, reactive, toRefs, computed } from 'vue'

export default defineComponent({
	props: {},
	setup() {
		const time = ref(0)
		const { proxy } = getCurrentInstance() as any
		const state = reactive({
			num: 0,
		})

		return {
			...toRefs(state),
		}
	},
})
</script>
<style lang="scss" scoped></style>
