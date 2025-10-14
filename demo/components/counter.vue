<template>
	<div style="width: 300px; line-height: 40px">
		<el-input v-model="time">
		</el-input>毫秒
		<el-button type="primary" @click="handleStart">开始</el-button>
		<el-button type="primary" @click="handlePause">暂停</el-button>
		<el-button type="primary" @click="handleGo">继续</el-button>
		<div>
			<span v-if="current">{{ `时:${current.hours}  分:${current.minutes} 秒:${current.seconds}` }}</span>
		</div>
	</div>
</template>
<script lang="ts">
import { ref, getCurrentInstance, defineComponent, onMounted, reactive, toRefs, computed } from 'vue'
import { useCountDown, CurrentTime } from '$/useCountDown'

export default defineComponent({
	props: {},
	setup() {
		const time = ref(0)
		const { proxy } = getCurrentInstance() as any
		const state = reactive({})

		const useCountInfo = useCountDown({
			time: time.value,
			onChange: (current1: CurrentTime) => {
				console.log('变化了...')
			},
			onFinish: () => {
				console.log('执行完成')
			},
		})

		const handleStart = () => {
			useCountInfo.reset(parseInt(time.value))
			useCountInfo.start()
		}

		const handleGo = () => {
			useCountInfo.start()
		}

		// 暂停
		const handlePause = () => {
			useCountInfo.pause()
		}

		const toCountDown = () => {}

		return {
			...toRefs(state),
			handleStart,
			handleGo,
			handlePause,
			time,
			current: useCountInfo.current,
		}
	},
})
</script>
<style lang="scss" scoped></style>
