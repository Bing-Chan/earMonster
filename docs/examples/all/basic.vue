<template>
	<div>
		<div v-for="(item, index) in modules" :key="index" class="modles">
			<h3 class="modles-title">{{ item.title }}</h3>
			<div class="modles-body">
				<div v-for="(item1, index1) in item.child" :key="index1" class="modles-body-item">
					<a class="title" href="#">{{ item1.name }}</a>
					<span class="flag">-</span>
					<span class="desc">{{ item1.desc }}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, reactive, toRefs } from 'vue'
import configData from './config.ts'

export default defineComponent({
	setup() {
		const state = reactive({
			show: false,
			modules: [] as any,
		})

		onBeforeMount(() => {
			state.modules.push({ title: 'core', child: configData.core })
			state.modules.push({ title: 'math', child: configData.math })
			state.modules.push({ title: 'router', child: configData.router })
		})

		return {
			...toRefs(state),
		}
	},
})
</script>
<style lang="scss" scoped>
.modles {
	&-title {
		margin-bottom: 20px;
	}
	&-body {
		padding-left: 20px;
		&-item {
			line-height: 36px;
			font-size: 16px;
			.flag {
				padding: 0px 10px;
				color: #999999;
			}
			.desc {
				color: #333333;
			}
		}
	}
}
</style>
