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
import sign from './components/sign.vue'
import counter from './components/counter.vue'
import stepper from './components/stepper.vue'
import numberRange from './components/numberRange.vue'
const moduleList = [numberRange,sign, counter,stepper]
</script>
<style lang="scss">
.box-card {
	margin-bottom: 20px;
	line-height: 40px;
}
</style>
