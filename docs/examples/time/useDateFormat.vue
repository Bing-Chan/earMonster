<template>
	<div style="width: 300px;line-height: 40px;">
		<p class="text-20px font-bold text-emerald-500">
			{{ formatted }}
		</p>
		<div class="flex items-center">
			<span class="mr-5px text-18px">Formatter Editor :</span>
			<el-input v-model="formatter" type="text" />
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, unref } from 'vue'
import { useNow } from '@vueuse/core'
import { useDateFormat } from '@ear-monster/use'
const formatter = ref('YYYY-MM-DD HH:mm:ss')
const formatted = useDateFormat(useNow(), formatter)
</script>
