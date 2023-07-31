<template>
	<div :class="`modules-box ${isBorder ? 'boderStyle' : ''}`">
		<div class="modules-box-title">
			<div :style="{ width: width + 'px' }" class="title">{{ title }}</div>
			<div class="icon"></div>
			<div class="btn">
				<el-button type="text" @click="handleDown" v-if="expand"
					>{{ !isUp ? '展开' : '收起' }}
					<SvgIcon :name="isUp ? 'elementArrowDown' : 'elementArrowUp'"></SvgIcon>
				</el-button>
				<slot name="btn"></slot>
			</div>
		</div>
		<div class="modules-box-content" v-if="isUp">
			<slot></slot>
			<div style="width: 100%; text-align: right">
				<slot name="footer"></slot>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
	props: {
		title: {
			type: String,
			default: () => '',
		},
		//标题宽度
		width: {
			type: Number,
			default: () => 120,
		},
		//是否需要展开收起
		expand: {
			type: Boolean,
			default: () => true,
		},
		//是否需要边线
		isBorder: {
			type: Boolean,
			default: () => false,
		},
	},
	name: 'reportCard',
	setup(props: any) {
		const state = reactive({
			tableData: {},
			isUp: true,
		});
		return {
			...toRefs(state),
			handleDown: () => {
				state.isUp = !state.isUp;
			},
		};
	},
});
</script>

<style lang="scss" scoped>
.modules-box {
	height: auto;
	width: 100%;
	box-sizing: border-box;
	margin-bottom: 10px;
	&-title {
		height: 28px;
		line-height: 28px;
		background: #f1f1f1;
		border-bottom: solid 1px $color-primary;
		margin-bottom: 15px;
		.title {
			height: 28px;
			line-height: 28px;
			padding-left: 8px;
			background: $color-primary;
			color: #ffffff;
			float: left;

			font-size: 16px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
		}
		.icon {
			width: 0;
			height: 0;
			position: relative;
			float: left;
			border-bottom: 28px solid $color-primary;
			border-right: 28px solid transparent;
		}
		.btn {
			float: right;
			min-width: 70px;
			text-align: right;
			padding: 0px 8px;
		}
	}
}
.boderStyle {
	border: solid 1px #ebeef5;
	padding: 15px 15px;
	margin-bottom: 20px;
}


</style>
