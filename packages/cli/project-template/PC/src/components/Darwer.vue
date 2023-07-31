<template>
	<el-drawer v-model="editorVal" direction="rtl" size="50%" @close="handleClose">
		<template #title>
			<!---title-->
			<div class="title-icon">
				<SvgIcon :name="'elementSetting'"></SvgIcon>
				<slot name="title"></slot>
			</div>
		</template>
		<div class="hr-drawer__content">
			<div class="hr-drawer__body">
				<el-scrollbar>
					<!---body-->
					<div style="width: 100%; overflow: hidden; padding: 0px 15px">
						<slot></slot>
					</div>
				</el-scrollbar>
			</div>
			<div class="hr-drawer__footer">
				<!--footer-->
				<slot name="footer"></slot>
			</div>
		</div>
	</el-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { emit } from 'process';

export default defineComponent({
	name: 'drawer',
	props: {
		// 双向绑定
		modeValue: {
			type: Boolean,
			default: () => false,
		},
	},
	setup(props, { emit }) {
		const state = reactive({
			editorVal: props.modeValue,
		});

		const handleClose = () => {
			emit('close');
		};

		return {
			...toRefs(state),
			handleClose,
		};
	},
});
</script>
<style lang="scss" scoped>
.hr-drawer__content {
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 0 0px;

	.page_box {
		margin-top: 7px;
	}
}

.hr-drawer__body {
	flex: 1;
	padding: 0 20px;
	overflow: auto;
}

.hr-drawer__footer {
	overflow: auto;
	padding: 10px 40px;
	border-top: solid 1px #eeeeee;
	display: flex;
	justify-content: flex-end;
}

.title-icon {
	.el-icon {
		color: $color-primary;
		font-size: 20px;
		vertical-align: middle;
		margin-right: 5px;
	}
	line-height: 30px;
	height: 30px;
}
</style>
<style lang="scss">
.el-drawer__header {
	padding: 15px 10px;
	border-bottom: solid 1px #eee;
	margin-bottom: 20px !important;
}
.el-drawer__body {
	padding: 0px !important;
	margin: 0px !important;
	height: 100%;
	overflow: auto;
}
.el-drawer:focus {
	outline: 0;
}
</style>
