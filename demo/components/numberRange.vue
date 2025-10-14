<template>
	<div style="width: 300px; line-height: 40px">
		<div style="margin-bottom: 100px;" v-for="(item, index) in list" :key="index">
			<ear-number-ranger v-model:modelValue="item.val"></ear-number-ranger>
		</div>
	</div>
</template>
<script lang="ts">
import { ref, getCurrentInstance, watch, defineComponent, onMounted, reactive, toRefs, computed } from 'vue'

export default defineComponent({
	props: {},
	setup() {
		const time = ref(0)
		const { proxy } = getCurrentInstance() as any

		const state = reactive({
			values: [],
			list: [{ val: [] }, { val: [] }, { val: [] }],
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
<style lang="scss" scoped></style>
