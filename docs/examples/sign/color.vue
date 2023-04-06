<template>
	<p>
		<el-button @click="show = true">点击</el-button>
		<el-dialog v-model="show" width="600">
			<el-select style="margin-bottom: 10px" @change="handleStart" v-model="strokeColor" placeholder="请选择">
				<el-option label="红" value="red"></el-option>
				<el-option label="绿" value="green"></el-option>
				<el-option label="蓝" value="blue"></el-option>
			</el-select>
			<ga-sign v-if="signShow" ref="signRef" width="500" :strokeColor="strokeColor"></ga-sign>
		</el-dialog>
	</p>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'

export default defineComponent({
	setup() {
		const signRef = ref<any>(null)
		const state = reactive({
			show: false,
			signShow: true,
			strokeColor: 'blue',
			config: {
				backgroundOpacity: 0.5,
				titleStyle: {
					textAlign: 'left',
					fontSize: '19px',
				},
				contentStyle: {
					textAlign: 'left',
					fontSize: '15px',
				},
				tips: [
					{
						el: '#step1',
						tipPosition: 'bottom',
						title: '菜单1',
						content: '点击菜单1',
						onNext: () => {
							return new Promise((resolve, reject) => {
								// 延迟2秒 再执行下一步
								setTimeout(() => {
									resolve(true)
								}, 500)
							})
						},
					},
					{
						el: '#step2',
						tipPosition: 'bottom',
						// title: '点击进入个人中心',
						content: '点击菜单2',
						// 点击上一步时，触发的事件
						onPrev: () => {
							return new Promise(resolve => {
								resolve(true)
							})
						},
						onNext: () => {
							return new Promise(resolve => {
								resolve(true)
							})
						},
					},
					{
						el: '#step3',
						tipPosition: 'bottom',
						title: '菜单3',
						content: '点击菜单3',
						onNext: () => {
							return Promise.resolve(true)
						},
					},
				],
			},
		})

		return {
			...toRefs(state),
			signRef,
			handleStart: () => {
				debugger
				state.signShow = false
				state.signShow = true
				// signRef.value.initEsign()
			},
		}
	},
})
</script>
<style lang="scss" scoped>
.step-item {
	margin-left: 20px;
}
</style>
