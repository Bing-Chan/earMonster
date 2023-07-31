<template>
	<div
		style="
			height > 0? {
				min-height: `${height}px`;
			}
			: {
			}
		"
		v-if="hasAuth == 1"
		class="menuItem"
		@click="goPage(title)"
	>
		<slot name="default"></slot>
	</div>
	<el-tooltip v-else-if="hasAuth == 0" placement="bottom" :show-after="200" :content="'暂无权限'">
		<div
			style="
			height > 0? {
				min-height: `${height}px`;
			}
			: {
			}
		"
			class="menuItem disabled"
		>
			<slot name="default"></slot>
		</div>
	</el-tooltip>
	<div
		style="
			height > 0? {
				min-height: `${height}px`;
			}
			: {
			}
		"
		v-else
		class="menuItem disabled"
	>
		<slot name="default"></slot>
	</div>
</template>
<script lang="ts">
import { ElMessage } from 'element-plus';
import { defineComponent, reactive, toRefs, watchEffect } from 'vue';

export default defineComponent({
	props: {
		title: {
			type: String,
			default: () => '111',
		},
		list: {
			type: Array,
			default: () => [],
		},
		height: {
			type: Number,
			default: () => 0,
		},
	},
	setup(props) {
		const state = reactive({
			hasAuth: 0, // -1：h5菜单 ; 0:无权限  ；1：有权限
			title: props.title,
			list: props.list,
			isSub: false, // 是否包含子菜单
			height:props.height
		});

		watchEffect(() => {
			state.title = props.title;
			state.list = props.list;
			state.height=props.height
			state.hasAuth = 0; // 无权限
			let titles = [state.title];

			//子菜单都不存在时禁用整个
			if (state.title == '基础配置') {
				titles = ['数据字典配置', '强分规则配置'];
				state.isSub = true;
			} else if (state.title == '流程配置') {
				titles = ['数据字典配置', '强分规则配置'];
				state.isSub = true;
			}

			if (state.list) {
				let result = state.list.filter((x) => titles.includes(x.menuName));
				if (result.some((x) => x.defaultFlag == 1 && x.menuFlag == 1)) {
					state.hasAuth = 1; // 有权限
				} else if (result.some((x) => x.menuFlag == 0)) {
					state.hasAuth = -1; // H5菜单
				}
			}
		});

		const goPage = (name: any) => {
			if (state.isSub) {
				return false;
			}
			let info = state.list.find((x) => x.menuName === state.title);
			if (info && info.routerUrl && info.routerUrl != '') {
				top.location.href = `${info.domain}${info.routerUrl}`;
			} else {
				ElMessage.error('该菜单未配置路由');
			}
		};

		return {
			...toRefs(state),
			goPage,
		};
	},
});
</script>
