<template>
	<div>
		<el-card v-for="(item, index) in moduleList" :key="index" class="box-card">
			<template #header>
				<div class="card-header">
					<span>Card name</span>
					<el-button class="button" text>Operation button</el-button>
				</div>
			</template>
			<div>
				<component :is="item"></component>
			</div>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, toRefs } from 'vue'

const moduleList = []
</script>
