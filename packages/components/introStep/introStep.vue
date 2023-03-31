<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, watch, reactive, toRefs } from 'vue'
import { introStepProps } from './type'

export default defineComponent({
	name: 'GAIntroStep',
	props: introStepProps,
	emits: ['update:show'],
	setup(props, { emit }) {
		const state = reactive({
			config: props.config,
			show: false,
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

// export default /*#__PURE__*/ defineComponent({
// 	name: 'GAIntroStep', // vue component name
// 	props: introStepProps,
// 	emits: introStepEmits,
// 	data() {
// 		return {
// 			// 聚焦盒子的信息
// 			originalBox: {
// 				left: 250,
// 				top: 250,
// 				width: 200,
// 				height: 100,
// 			},
// 			// 提示盒子的位置
// 			tipBoxPosition: 'bottom',
// 			// 当前显示的提示进度索引
// 			currentIndex: 0,
// 		}
// 	},
// 	watch: {
// 		config: {
// 			deep: true,
// 			handler() {
// 				// 监听配置变化 重置当前显示的索引
// 				state.currentIndex = 0
// 			},
// 			immediate: true,
// 		},
// 		show(val) {
// 			if (val) {
// 				state.setBoxInfo()
// 			} else {
// 				// 允许页面滚动
// 				document.body.style.overflow = 'auto'
// 			}
// 		},
// 	},
// 	computed: {
// 		// 计算提示盒子的位置
// 		// eslint-disable-next-line vue/return-in-computed-property
// 		tipBoxStyle() {
// 			// 如果提示盒子的位置是right
// 			if (state.tipBoxPosition === 'right') {
// 				return {
// 					left: `${state.originalBox.left + state.originalBox.width}px`,
// 					top: `${state.originalBox.top}px`,
// 				}
// 			} else if (state.tipBoxPosition === 'left') {
// 				return {
// 					right: `${window.innerWidth - state.originalBox.left}px`,
// 					top: `${state.originalBox.top}px`,
// 				}
// 			} else if (state.tipBoxPosition === 'top') {
// 				return {
// 					left: `${state.originalBox.left}px`,
// 					bottom: `${window.innerHeight - state.originalBox.top}px`,
// 				}
// 			} else if (state.tipBoxPosition === 'bottom') {
// 				return {
// 					left: `${
// 						state.originalBox.left > window.innerWidth - 300
// 							? window.innerWidth - 300
// 							: state.originalBox.left
// 					}px`,
// 					top: `${state.originalBox.top + state.originalBox.height}px`,
// 				}
// 			}
// 		},
// 	},
// 	created() {
// 		state.init()
// 	},
// 	mounted() {
// 		window.onresize = throttle(() => {
// 			if (state.show) {
// 				state.setBoxInfo()
// 			}
// 		}, 100)
// 	},
// 	beforeUnmount() {
// 		window.onresize = null
// 	},
// 	methods: {},
// })
</script>

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
