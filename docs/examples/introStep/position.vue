<template>
	<p>
		<ear-button type="primary" @click="handleStart1">点击</ear-button>
		<span class="step-item" id="topstep">上部</span>
		<span class="step-item" id="leftstep">左部</span>
		<span class="step-item" id="rightstep">右部</span>
		<span class="step-item" id="bottomstep">底部</span>
		<ear-intro-step v-model:show="show" :config="config"></ear-intro-step>
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
						el: '#topstep',
						tipPosition: 'top',
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
						el: '#leftstep',
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
						el: '#rightstep',
						tipPosition: 'right',
						content: '点击菜单3',
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
						el: '#bottomstep',
						tipPosition: 'bottom',
						title: '菜单4',
						content: '点击菜单4',
						onNext: () => {
							return Promise.resolve(true)
						},
					},
				],
			},
		})

		return {
			...toRefs(state),
			handleStart1: () => {
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
