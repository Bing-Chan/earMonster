<template>
	<div class="page">
		<el-card class="box-card">
			<template #header>
				<div class="card-header">
					<span>Card name</span>
					<el-button class="button" text>Operation button</el-button>
				</div>
			</template>
			<div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
		</el-card>
	</div>
</template>
<script setup lang="ts"  name="page"  >
import { markRaw, reactive, ref, defineProps } from 'vue'


interface Props {
	title?: string
	components: any[]
}

const props = defineProps<Props>()

const currentTab = reactive({
	name: props.components[0].name,
	components: markRaw(props.components[0]),
})
</script>

<style lang="scss" scoped>
.page {
	display: flex;
	justify-content: start;
	height: 100vh;
	.slider {
		text-align: center;
		width: 200px;
		border: 1px solid #e1e1e1;
		box-sizing: border-box;
		min-height: 100vh;
		.title {
			margin-bottom: 10px;
		}
		.menu-li {
			height: 40px;
			cursor: pointer;
			font-size: 16px;
			font-weight: 400;
		}
	}
	.container {
		width: 100%;
		padding: 10px;
		box-sizing: border-box;
	}
	.current-tab {
		color: rgb(30, 128, 255);
	}
}
</style>
