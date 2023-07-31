<template>
	<div>
		<!--输入框-->
		<div>
			<div :class="isDisabled ? 'org-input input-disabled' : 'org-input'" v-if="result.length > 0" @click="openDialog">
				<el-tag class="ml-2" v-for="(item, index) in result" :key="index" type="info">{{ item.orgName }}</el-tag>
			</div>
			<div :class="isDisabled ? 'org-input input-disabled' : 'org-input'" v-else @click="openDialog">
				<span>请选择组织或人员</span>
			</div>
			<el-input v-show="false" v-model="result"></el-input>
		</div>
		<!--组织树-->
		<el-dialog
			append-to-body
			custom-class="selectPerson"
			:close-on-click-modal="false"
			v-model="flag"
			title="组织信息"
			width="800px"
			@close="handelClose"
		>
			<div class="tabs is-hover-shadow">
				<ul class="tabs-header">
					<li @click="handelTabs(1)" :class="activeName == 1 ? 'is-active' : ''">
						<span class="first-title">按组织筛选</span>
					</li>
					<li @click="handelTabs(2)" :class="activeName == 2 ? 'is-active' : ''">
						<span class="first-title">按岗位筛选</span>
					</li>
					<li @click="handelTabs(3)" :class="activeName == 3 ? 'is-active' : ''">
						<span class="first-title">导入</span>
					</li>
				</ul>
			</div>
			<div class="tabs-body">
				<div class="tabs-body-item" v-show="activeName == 1">
					<by-org ref="orgRef" v-model:selected-list="selected"></by-org>
				</div>
				<div class="tabs-body-item" v-show="activeName == 2">
					<by-post ref="postRef" v-model:selected-list="selected"></by-post>
				</div>
				<div class="tabs-body-item" v-show="activeName == 3">
					<by-import ref="importRef" v-model:selected-list="selected"></by-import>
				</div>
			</div>

			<!--已选择 浮动框-->
			<template #footer>
				<div class="tabs-select">
					<div class="tabs-select-list" v-show="isCollspe">
						<el-scrollbar
							><div>
								<el-tag v-for="(item, index) in selected" @close="handleDelete(item)" closable :key="index" class="ml-2">{{ item.orgName }}</el-tag>
							</div></el-scrollbar
						>
					</div>
					<div class="tabs-select-item" style="text-align: left">
						<div>
							<span style="margin-right: 20px">已选{{ selected.length }}条</span>
							<el-button type="text" style="margin-right: 10px" @click="isCollspe = !isCollspe">
								{{ isCollspe ? '收起' : '展开' }} <SvgIcon :name="isCollspe ? 'elementArrowDown' : 'elementArrowUp'"></SvgIcon
							></el-button>
							<el-button type="text" @click="handleDelete(null)"> 全部清除 </el-button>
							<el-button style="float: right" type="primary" @click="handelSave" :loading="loadingBtn" size="small">保 存</el-button>
							<el-button style="float: right" @click="handelClose" size="small">取 消</el-button>
						</div>
						<div></div>
					</div>
				</div>
			</template>
		</el-dialog>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watchEffect, getCurrentInstance, nextTick } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import byOrg from './src/byOrg.vue';
import byPost from './src/byPost.vue';
import byImport from './src/byImport.vue';

export default defineComponent({
	name: 'selectPerson',
	components: {
		byOrg,
		byPost,
		byImport,
	},
	props: {
		// 选择的节点
		selectedList: {
			type: Array,
			default() {
				return [];
			},
		},
		//是否多选
		isCheck: {
			type: Boolean,
			default: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['update:selectedList'],
	setup(props, { emit }) {
		const state = reactive({
			activeName: 1,

			flag: false,
			keyWord: '',
			navList: [],
			orgList: [], //当前组织列表
			loading: false,
			selected: [], // 选中节点
			loadingBtn: false, // 加载按钮
			result: [], //返回结果
			isDisabled: props.disabled,

			isCollspe: false,
		});
		const { proxy } = getCurrentInstance() as any;

		const handelTabs = (tabs: any) => {
			state.activeName = tabs;
			if (proxy.$refs.postRef && state.activeName == 2) {
				proxy.$refs.postRef.getList();
			}
		};

		// 打开对话框
		const openDialog = async () => {
			// 默认打开第一个页签
			state.flag = !state.flag;
			state.selected = props.selectedList ? props.selectedList : [];
			state.keyWord = '';
			state.selected = JSON.parse(JSON.stringify(state.result));
			state.activeName = 1;
			await nextTick();
			if (proxy.$refs.orgRef) {
				proxy.$refs.orgRef.reset();
			}
			if (proxy.$refs.postRef) {
				proxy.$refs.postRef.reset();
			}
			if (proxy.$refs.importRef) {
				proxy.$refs.importRef.reset();
			}
		};

		const handelClose = () => {
			state.flag = false;
		};

		// 选中集合
		const handleDelete = (obj) => {
			if (obj) {
				state.selected = state.selected.filter((x) => !equelRow(x, obj));
			} else {
				state.selected = [];
			}
			if (proxy.$refs.postRef) {
				proxy.$refs.postRef.setSelectList();
			}
		};

		//选中
		const handelSave = async () => {
			state.flag = false;
			//保存选择结果
			state.result = JSON.parse(JSON.stringify(state.selected));
			emit('update:selectedList', state.result);
			emit('change', state.result);
		};

		watchEffect(async () => {
			state.result = props.selectedList ? props.selectedList : [];
		});

		const equelRow = (traget, source) => {
			return (
				traget.orgCode === source.orgCode &&
				traget.orgName === source.orgName &&
				traget.jobCode === source.jobCode &&
				traget.deptName === source.deptName &&
				traget.unitName === source.unitName
			);
		};

		return {
			...toRefs(state),
			openDialog,
			handelTabs,
			handelClose,
			handleDelete,
			handelSave,
		};
	},
});
</script>

<style lang="scss" scoped>
.column-tip {
	font-size: 6px !important;
	color: #999999 !important;
}
.column-tip-title {
	font-size: 12px !important;
	color: #333;
}

.org-item-label {
	width: 100px;
	text-overflow: ellipsis;
}

.org-dialog-search {
	width: 50%;
	height: 40px;
	padding: 0px 10px;
}
.org-dialog {
	display: flex;
	justify-content: space-between;
	padding: 0px 10px;
	height: 378px;
	&-right,
	&-left {
		padding: 0 10px;
		font-size: 16px;
		width: 50%;
	}

	&-right {
		border-left: solid 1px #eeeeee;
		&-checkList {
			background: #f4f6f8;
			text-align: left;
			font-size: 14px;
			height: 330px;
		}
	}

	&-left {
		&-list {
			padding: 10px;
			background: #f4f6f8;
			height: 330px;
		}

		&-filter {
			height: 35px;
			width: 100%;
			display: flex;
			align-items: center;
			&-btn {
				width: 110px;
				padding-left: 5px;
			}
			&-input {
				flex-grow: 1;
			}
		}

		&-tree {
			height: 350px;
		}
	}
}

.already-checked,
.org_list {
	height: calc(100% - 36px);
	padding-top: 10px;
}

.org_list {
	.org_data {
		padding: 0 16px;
		.org_item {
			list-style-type: none;
			padding: 0;
			margin: 0;
			.icon-zuzhi {
				cursor: pointer;
				color: $color-primary;
				font-size: 16px;
			}
			.icon-zuzhi-disabled {
				cursor: default;
				color: #999;
				font-size: 16px;
			}

			&-flex {
				display: flex;
				flex-direction: row;
				width: 100%;
				align-items: center;
				justify-content: center;
				.item-left {
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.item-right {
					width: 50px;
					text-align: center;
					vertical-align: middle;
					position: relative;
				}
			}
		}
	}
}

.el-table__header-wrapper {
	display: none;
}

::v-deep .el-input__validateIcon {
	display: none;
}

.el-breadcrumb__item {
	line-height: 30px;
	span,
	button {
		font-size: 12px;
	}
}

.dialog-footer {
	text-align: center !important;
}

.org-input {
	cursor: pointer;
	display: block;
	resize: vertical;
	padding: 0px 15px;
	line-height: 30px;
	min-height: 30px;
	box-sizing: border-box;
	width: 100%;
	font-size: inherit;
	font-family: inherit;
	color: #666666;
	background-color: #ffffff;
	background-image: none;
	border: solid 1px #dcdfe6;
	border-radius: 4px;
	transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

	.ml-2 {
		margin-right: 8px;
	}
	span {
		color: #c0c4cc;
		font-size: 13px;
	}
}

.org-input:hover {
	border-color: #c0c4cc;
}

.org-input:active {
	border-color: $color-primary;
}

.el-table::before {
	height: 0px;
}

.item_but:hover {
	cursor: pointer;
	color: #333;
}
.input-disabled {
	background: #f5f7fa;
}
</style>
<style lang="scss">
.selectPerson {
	.el-dialog__body {
		padding: 0px 0px !important;
	}

	.el-dialog__footer {
		border-top: solid 1px #eeeeee;
		z-index: 999;
		background-color: #ffffff;
		text-align: justify;
		padding-left: 0px !important;
		padding-right: 0px !important;
	}
}
</style>
<style lang="scss" scoped>
.tabs {
	display: flex;
	width: 100%;
	flex-direction: column;
	transition: 0.3s;
	background-color: #ffffff;
	padding: 5px 5px;
	font-size: 14px;
	font-weight: 500;

	ul,
	li {
		padding: 0px 0px;
		margin: 0px 0px;
	}

	li {
		list-style-type: none;
		float: left;
		min-width: 80px;
		margin-right: 15px;

		cursor: pointer;
		text-align: center;
		padding: 0px 5px;
		padding-left: 0px;
		line-height: 40px;
		height: 40px;
	}

	li:hover {
		color: $color-primary;
		span {
			color: $color-primary;
		}
	}

	&-header {
		padding-top: 5px;
		line-height: 40px;
		background-color: inherit;
		width: 100%;
		border-bottom: solid 1px $border-gray;

		li {
			padding-left: 10px;
			padding-right: 10px;
			user-select: none;
		}
		&--more {
			float: right !important;
			line-height: 40px;
			height: 100%;
			button {
				vertical-align: middle;
				margin-top: 5px;
			}
		}
	}
	&-body {
		padding: 20px 20px;
		padding-top: 10px;
		padding-bottom: 0px;
		min-height: 400px;
		background-color: inherit;
	}

	&-header-scroll {
		display: flex;
		padding-top: 5px;
		line-height: 40px;
		background-color: inherit;
		width: 100%;
		border-bottom: solid 1px $border-gray;
		flex: 1;
		&-left {
			width: 90%;
			display: flex;
			flex: 1;
			.menuList {
				flex-shrink: 0;
				display: flex;
				&-item {
					flex-shrink: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					min-width: 80px;
					padding: 0px 5px;
					padding-left: 0px;
					line-height: 40px;
					margin-right: 15px;
					cursor: pointer;
				}
				&-item:hover {
					color: $color-primary;
					span {
						color: $color-primary;
					}
				}
			}
		}
		&-right {
			width: 100px;
		}
	}

	.is-active {
		color: $color-primary;
		border-bottom: solid 2px $color-primary;
		span {
			color: $color-primary;
		}
	}
}

.tabs-select {
	width: 100%;
	padding: 0px 0px;
	font-size: 12px;
	position: relative;

	&-item {
		padding-left: 10px;
		padding-right: 10px;
	}

	&-list {
		position: absolute;
		top: -111px;
		left: 0px;
		z-index: 999;
		padding: 10px 10px;
		height: 100px;
		width: 100%;
		background: #ffffff;
		box-shadow: 0px -5px 5px 0px rgba(204, 204, 204, 0.4);

		.el-tag {
			margin-right: 10px;
			margin-bottom: 10px;
		}
	}
}
</style>
