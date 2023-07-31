<template>
	<div>
		<el-empty v-if="isShowImage" :description="description" :image-size="size" image="/images/empty.png">
			<slot></slot>
		</el-empty>
		<div class="emptyText" v-else>暂无数据</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	props: {
		size: {
			type: Number,
			default: 160,
		},
		description: {
			type: String,
			default: '',
		},
		isShowImage: {
			type: Boolean,
			default: true,
		},
	},
	mounted() {},
});
</script>
<style lang="scss">
.el-empty {
	padding: 20px 0px;
}
.emptyText {
	width: 100%;
	text-align: center;
	min-height: 100px;
	padding-top: 40px;
	color: #999999;
}
</style>

