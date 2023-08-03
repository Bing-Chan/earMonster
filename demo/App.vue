<template>
	<div style="width: 60%; margin: 0 auto">
		<el-card v-for="(item, index) in moduleList" :key="index" class="box-card">
			<template #header>
				<div class="card-header">
					<span>示例{{ index + 1 }}</span>
				</div>
			</template>
			<div>
				<component :is="item"></component>
			</div>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import signVue from './components/sign.vue'

const moduleList = [signVue]
</script>
