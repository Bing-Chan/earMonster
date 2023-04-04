<template>
	<p>
		<ga-button type="primary" id="step1">菜单一</ga-button>
		<ga-button type="success" id="step2">菜单二</ga-button>
		<ga-button type="info" id="step3">菜单三</ga-button>
		<ga-intro-step v-model:show="show" :config="config"></ga-intro-step>
	</p>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
	setup() {
		const state = reactive({
			show: true,
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
						tipPosition: 'left',
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
						tipPosition: 'right',
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
		}
	},
})
</script>
