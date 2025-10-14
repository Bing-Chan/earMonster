<template>
	<p>
		<span>Ready: {{ isReady.toString() }}</span>
		<span>Loading: {{ isLoading.toString() }}</span>
		<el-button @click="handleClick">Execute</el-button>
	</p>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { useAsyncState } from '@ear-monster/use'
export default defineComponent({
	setup() {
		const react = reactive({
			show: false,
			info: {
				id: 0,
				name: '',
			},
			isReady: false,
			isLoading: false,
		})

		const syncDemo = async () => {
			console.log('异步执行')
			react.info.id = 1
			react.info.name = '测试'
		}

		const handleClick = () => {
			react.isReady = true
			react.isLoading = false
			const { state, isReady, isLoading } = useAsyncState(syncDemo(), {})
			react.isReady = isReady.value
			react.isLoading = isLoading.value
		}

		return {
			...toRefs(react),
			handleClick,
		}
	},
})
</script>
