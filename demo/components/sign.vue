<template>
	<div>
		<ear-sign width="500" ref="signRef" :strokeColor="strokeColor"></ear-sign>
		<el-select style="margin-bottom: 10px" v-model="strokeColor" placeholder="请选择">
			<el-option label="红" value="red"></el-option>
			<el-option label="绿" value="green"></el-option>
			<el-option label="蓝" value="blue"></el-option>
		</el-select>
		{{ strokeColor }}
	</div>
</template>
<script setup lang="ts" name="signVue">
import { onMounted, reactive, ref, toRefs } from 'vue'
const state = reactive({
	strokeColor: '#000',
})
const json = ref({
	name: 111,
})

onMounted(() => {})

const { strokeColor } = toRefs(state)
</script>
