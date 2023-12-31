<template>
	<transition
		name="custom-classes-transition"
		enter-active-class="animate__animated animate__fadeIn animate__faster"
		leave-active-class="animate__animated animate__fadeOut animate__faster"
	>
		<div v-if="show" id="intro_box">
			<div
				class="top"
				:style="{
					height: `${originalBox.top}px`,
					backgroundColor: `rgba(0, 0, 0, ${config.backgroundOpacity ? config.backgroundOpacity : 0.9})`,
				}"
			/>
			<div class="content" :style="{ height: `${originalBox.height}px` }">
				<div
					class="left"
					:style="{
						top: `${originalBox.top}px`,
						width: `${originalBox.left}px`,
						height: `${originalBox.height}px`,
						backgroundColor: `rgba(0, 0, 0, ${config.backgroundOpacity ? config.backgroundOpacity : 0.9})`,
					}"
				/>

				<div
					class="original-box"
					:style="{
						top: `${originalBox.top}px`,
						left: `${originalBox.left}px`,
						width: `${originalBox.width}px`,
						height: `${originalBox.height}px`,
					}"
				>
					<div class="round round-flicker"></div>
				</div>
				<div class="tip-box" :style="tipBoxStyle">
					<div class="tip-content">
						<div
							v-if="config.tips[currentIndex].title"
							class="title"
							:style="{
								textAlign: config.titleStyle
									? config.titleStyle.textAlign
										? config.titleStyle.textAlign
										: 'center'
									: 'center',
								fontSize: config.titleStyle
									? config.titleStyle.fontSize
										? config.titleStyle.fontSize
										: '19px'
									: '19px',
							}"
						>
							{{ config.tips[currentIndex].title }}
						</div>
						<div
							class="content"
							:style="{
								textAlign: config.contentStyle
									? config.contentStyle.textAlign
										? config.contentStyle.textAlign
										: 'center'
									: 'center',
								fontSize: config.contentStyle
									? config.contentStyle.fontSize
										? config.contentStyle.fontSize
										: '15px'
									: '15px',
							}"
						>
							{{ config.tips[currentIndex].content }}
						</div>
						<div class="action">
							<slot
								name="prev"
								v-bind:index="currentIndex"
								v-bind:tipItem="config.tips[currentIndex]"
								v-if="currentIndex !== 0"
							>
								<div class="item prev" @click="prev">上一步</div>
							</slot>
							<slot
								name="next"
								v-bind:index="currentIndex"
								v-bind:tipItem="config.tips[currentIndex]"
								v-if="currentIndex !== config.tips.length - 1"
							>
								<div class="item next" @click="next">下一步</div>
							</slot>
							<slot
								name="done"
								v-bind:index="currentIndex"
								v-bind:tipItem="config.tips[currentIndex]"
								v-if="currentIndex === config.tips.length - 1"
							>
								<div class="item done" @click="done">完成</div>
							</slot>
							<slot
								v-else
								name="skip"
								v-bind:index="currentIndex"
								v-bind:tipItem="config.tips[currentIndex]"
							>
								<div class="item skip" @click="done">跳过</div>
							</slot>
						</div>
					</div>
				</div>
				<div
					class="right"
					:style="{
						top: `${originalBox.top}px`,
						left: `${originalBox.left + originalBox.width}px`,
						width: `calc(100% - ${originalBox.left + originalBox.width}px)`,
						height: `${originalBox.height}px`,
						backgroundColor: `rgba(0, 0, 0, ${config.backgroundOpacity ? config.backgroundOpacity : 0.9})`,
					}"
					ref="tip_box"
				/>
			</div>
			<div
				class="bottom"
				:style="{
					height: `calc(100% - ${originalBox.top}px - ${originalBox.height}px)`,
					backgroundColor: `rgba(0, 0, 0, ${config.backgroundOpacity ? config.backgroundOpacity : 0.9})`,
				}"
			/>
		</div>
	</transition>
</template>
<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, watch, reactive, toRefs, watchEffect } from 'vue'
import { introStepProps } from './type'
import { useWindowSize } from '@ear-monster/use'

export default defineComponent({
	name: 'EarIntroStep',
	props: introStepProps,
	emits: ['update:show'],
	setup(props, { emit }) {
		const state = reactive({
			config: props.config,
			show: props.show,
			originalBox: {
				left: 250,
				top: 250,
				width: 200,
				height: 100,
			},
			// 提示盒子的位置
			tipBoxPosition: 'bottom',
			// 当前显示的提示进度索引
			currentIndex: 0,
		})

		const prev = async () => {
			// 判断是否有onPrev 是否可以继续往下走
			let flag = true
			if (state.config.tips[state.currentIndex] && state.config.tips[state.currentIndex].onPrev) {
				flag = await state.config.tips[state.currentIndex].onPrev()
			}

			// 如果不能继续往下走
			if (!flag) {
				throw new Error('onPrev 需要 Promise.resolve(true) 才可以继续往下走')
			}
			setBoxInfo(state.currentIndex - 1)
		}

		// 根据标签获取盒子的位置
		const setBoxInfo = async (index?: number) => {
			try {
				if (index === undefined) {
					index = state.currentIndex
				}

				if (state.show) {
					// 禁止页面滚动
					document.body.style.overflow = 'hidden'
				}

				let el = state.config.tips[index].el
				let box = document.querySelector(el)
				if (!box) {
					throw new Error('没有找到相应的元素')
				}
				let rect = box.getBoundingClientRect()
				state.originalBox = {
					left: rect.left,
					top: rect.top,
					width: rect.width,
					height: rect.height,
				}
				state.tipBoxPosition = state.config.tips[index].tipPosition

				state.currentIndex = index
			} catch (e: any) {
				throw new Error(e.message)
			}
		}

		useWindowSize(() => {
			console.log('变化了')
		}, 200)

		const next = async () => {
			// 判断是否有onNext 是否可以继续往下走
			let flag = true
			if (state.config.tips[state.currentIndex] && state.config.tips[state.currentIndex].onNext) {
				flag = await state.config.tips[state.currentIndex].onNext()
			}

			// 如果不能继续往下走
			if (!flag) {
				throw new Error('onNext 需要 Promise.resolve(true) 才可以继续往下走')
			}
			setBoxInfo(state.currentIndex + 1)
		}

		const done = () => {
			emit('update:show', false)
		}

		// 根据配置初始化
		const init = () => {
			// 获取config中的tips数组
			const { tips } = state.config
			let timer: any = null
			// 判断tips是否存在 并且tips是否是数组
			if (tips && Array.isArray(tips)) {
				// 如果tips存在 并且tips是数组
				// 判断tips数组是否有数据
				if (tips.length > 0) {
					// 如果tips数组有数据
					// 初始化当前提示进度索引
					state.currentIndex = 0
					// 获取第一个盒子
					try {
						let firstBox = document.querySelector(tips[0].el)
						timer = setInterval(() => {
							firstBox = document.querySelector(tips[0].el)
							if (firstBox) {
								// 如果第一个盒子存在
								setBoxInfo(0)
								clearInterval(timer)
							}
						}, 0)
					} catch (e: any) {
						throw new Error(e.message)
					}
				} else {
					throw new Error('tips数组不能为空')
				}
			} else {
				throw new Error('config中的tips不存在或者不是数组')
			}
		}

		watch(
			() => state.config,
			() => {
				// 监听配置变化 重置当前显示的索引
				state.currentIndex = 0
			},
		)

		watch(
			() => state.show,
			(val: any) => {
				if (val) {
					setBoxInfo()
				} else {
					// 允许页面滚动
					document.body.style.overflow = 'auto'
				}
			},
		)

		watchEffect(() => {
			state.show = props.show
		})

		const tipBoxStyle = computed(() => {
			// 如果提示盒子的位置是right
			if (state.tipBoxPosition === 'right') {
				return {
					left: `${state.originalBox.left + state.originalBox.width}px`,
					top: `${state.originalBox.top}px`,
				}
			} else if (state.tipBoxPosition === 'left') {
				return {
					right: `${window.innerWidth - state.originalBox.left}px`,
					top: `${state.originalBox.top}px`,
				}
			} else if (state.tipBoxPosition === 'top') {
				return {
					left: `${state.originalBox.left}px`,
					bottom: `${window.innerHeight - state.originalBox.top}px`,
				}
			} else if (state.tipBoxPosition === 'bottom') {
				return {
					left: `${
						state.originalBox.left > window.innerWidth - 300
							? window.innerWidth - 300
							: state.originalBox.left
					}px`,
					top: `${state.originalBox.top + state.originalBox.height}px`,
				}
			}
		})

		onBeforeMount(() => {
			init()
		})

		const throttle = (fn: () => void, delay: number) => {
			let timerId: any = null
			let flag = true
			return (...arg) => {
				if (!flag) return
				flag = false
				let args = arg
				timerId && clearTimeout(timerId)
				timerId = setTimeout(() => {
					flag = true
					fn.apply(this, args as any)
				}, delay || 1000)
			}
		}

		onMounted(() => {
			window.onresize = throttle(() => {
				if (state.show) {
					setBoxInfo()
				}
			}, 0)
		})

		return {
			...toRefs(state),
			init,
			prev,
			next,
			done,
			tipBoxStyle,
			setBoxInfo,
		}
	},
})
</script>
<style scoped>
#intro_box {
	position: fixed;
	left: 0px;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 99999;
}
#intro_box > .top {
	width: 100%;
}
#intro_box > .content {
	width: 100%;
}
#intro_box > .content > .left {
	position: absolute;
	left: 0;
}
#intro_box > .content > .original-box {
	position: absolute;
	background-color: transparent;
	transition: all 0.3s cubic-bezier(0, 0, 0.58, 1);
}
#intro_box > .content > .original-box .round {
	position: absolute;
	left: 14px;
	top: 50%;
	transform: translateY(-50%);
	width: 10px;
	height: 10px;
	border-radius: 50%;
	opacity: 0.65;
	background-color: #ffffff;
}
#intro_box > .content > .original-box .round-flicker:before,
#intro_box > .content > .original-box .round-flicker:after {
	content: '';
	width: 100%;
	height: 100%;
	position: absolute;
	left: -1px;
	top: -1px;
	box-shadow: #ffffff 0px 0px 2px 2px;
	border: 1px solid rgba(255, 255, 255, 0.5);
	border-radius: 50%;
	animation: warn 2s linear 0s infinite;
}
@keyframes warn {
	0% {
		transform: scale(0.5);
		opacity: 1;
	}
	25% {
		transform: scale(1);
		opacity: 0.75;
	}
	50% {
		transform: scale(1.5);
		opacity: 0.5;
	}
	75% {
		transform: scale(2);
		opacity: 0.25;
	}
	100% {
		transform: scale(2.5);
		opacity: 0;
	}
}
#intro_box > .content > .tip-box {
	position: absolute;
	/*宽度应为内容宽*/
	width: fit-content;
	max-width: 300px;
	box-sizing: border-box;
	/*高度应为内容高度*/
	height: fit-content;
	transition: all 0.3s;
	z-index: 99999;
	padding: 12px;
	font-size: 15px;
}
#intro_box > .content > .tip-box > .tip-content {
	border-radius: 10px;
	overflow: hidden;
	padding: 10px;
	color: #fff;
	padding-left: 40px;
}
#intro_box > .content > .tip-box > .tip-content > .title {
	font-weight: bold;
	margin-bottom: 10px;
}
#intro_box > .content > .tip-box > .tip-content > .content {
	white-space: normal;
	overflow-wrap: break-word;
	line-height: 1.5;
}
#intro_box > .content > .tip-box > .tip-content > .action {
	margin-top: 15px;
	width: 100%;
	display: flex;
}
#intro_box > .content > .tip-box > .tip-content > .action > .item {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	border-radius: 15px;
	font-size: 12px;
	cursor: pointer;
	transition: all 0.3s;
	padding: 5px 15px;
	color: #fff;
	font-weight: bold;
	border: 1px solid #ccc;
	margin: 5px;
}
#intro_box > .content > .tip-box > .tip-content > .action > .item.prev {
	color: #ccc;
}
#intro_box > .content > .tip-box > .tip-content > .action > .item.next {
	color: #ccc;
}
#intro_box > .content > .tip-box > .tip-content > .action > .item.done {
	color: #ccc;
}
#intro_box > .content > .tip-box > .tip-content > .action > .item.skip {
	color: #ccc;
}
#intro_box > .content > .right {
	position: absolute;
	background-color: rgba(0, 0, 0, 0.9);
}
#intro_box > .bottom {
	width: 100%;
	background-color: rgba(0, 0, 0, 0.9);
}
</style>
