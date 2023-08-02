<template>
	<p>
		<el-button @click="show = true">点击</el-button>
		<el-dialog v-model="show" width="600">
			<ear-sign width="500"></ear-sign>
		</el-dialog>
	</p>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'

export default defineComponent({
	setup() {
		const state = reactive({
			show: false,
		})

		onMounted(() => {
			debugger
		})

		return {
			...toRefs(state),
		}
	},
})
</script>
<style lang="scss" scoped>
.step-item {
	margin-left: 20px;
}
</style>
