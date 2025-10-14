<script setup lang="ts">
import { useDeepCopy } from '@ear-monster/use'

const template = { fruit: 'banana', drink: 'water' }

const { cloned, sync } = useDeepCopy(template)
</script>

<template>
	<p  style="width: 300px;line-height: 50px;">
		<el-input v-model="cloned.fruit" type="text" />
		<el-input v-model="cloned.drink" type="text" />
		<el-button type="primary" @click="sync()">reset</el-button>
	</p>
</template>
