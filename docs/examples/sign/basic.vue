<template>
	<p>
		<ga-sign></ga-sign>
	</p>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
	setup() {
		const state = reactive({
			show: false,
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
			handleStart: () => {
				state.show = true
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
