<script setup lang="ts">
import { useDeepCopy } from '@ear-monster/use/core/useDeepCopy'

const template = { fruit: 'banana', drink: 'water' }

const { cloned, exec } = useDeepCopy(template)
</script>

<template>
	<div>
		<el-row>
			<el-col :span="8"><el-input v-model="cloned.fruit"></el-input></el-col>
		</el-row>
		<el-row >
			<el-col :span="8"><el-input v-model="cloned.drink"></el-input></el-col>
		</el-row>
		<el-row>
			<el-col :span="8"><el-button type="primary" @click="exec()">reset</el-button></el-col>
		</el-row>
	</div>
</template>
<style lang="scss" scoped>
.el-row{
	padding: 5px 10px;
}
</style>
