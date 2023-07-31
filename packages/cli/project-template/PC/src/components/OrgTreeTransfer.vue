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
		<el-dialog append-to-body :close-on-click-modal="false" v-model="flag" title="组织信息" width="760px" center @close="handelClose">
			<div class="org-dialog-search">
				<el-input v-model="keyWord" placeholder="搜索" @input="handleSearch" clearable></el-input>
			</div>
			<div class="org-dialog">
				<div class="org-dialog-left">
					<div class="org_title">
						<!--自定义面包屑-->
						<el-tabs v-model="activeName" class="yto_tab" @tab-click="handleTab">
							<el-tab-pane name="组织架构">
								<template v-slot:label>
									<span>组织架构</span>
									<i class="icons el-icon-arrow-right"></i>
								</template>
							</el-tab-pane>
							<el-tab-pane v-for="(item, index) in navList" :item="item" :key="index" :name="item.orgCode">
								<template v-slot:label>
									<span>{{ item.orgName }}</span>
									<i class="icons el-icon-arrow-right"></i>
								</template>
							</el-tab-pane>
						</el-tabs>
					</div>
					<!--结果集-->
					<div class="org_list" v-loading="loading">
						<el-scrollbar class="layout-scrollbar" ref="layoutScrollbarRef">
							<ul class="org_data">
								<li class="org_item" v-for="(item, index) in orgList" :key="index">
									<div class="org_item-flex">
										<div class="item-left">
											<el-checkbox v-model="item.checked" @change="handleSelected(item, $event)">
												<span class="org-item-label">{{ item.orgName }}</span>
											</el-checkbox>
											<div v-show="toOrgLineName(item) != ''" style="padding-left: 20px" class="column-tip">{{ toOrgLineName(item) }}</div>
										</div>
										<div class="item-right">
											<i class="iconfont icon-zuzhi" v-if="!item.checked && item.nextFlag" @click="goNext(item)"></i>
											<i class="iconfont icon-zuzhi icon-zuzhi-disabled" v-else></i>
										</div>
									</div>
								</li>
							</ul>
						</el-scrollbar>
					</div>
				</div>
				<div class="org-dialog-right">
					<div class="org_title">
						<!--自定义面包屑-->
						<el-tabs class="yto_tab">
							<el-tab-pane name="已选">
								<template v-slot:label>
									<span>已选</span>
									<i class="icons el-icon-arrow-right"></i>
								</template>
							</el-tab-pane>
						</el-tabs>
					</div>
					<div class="already-checked">
						<el-scrollbar>
							<el-table :data="selected" :show-header="false" style="min-height: 300px; width: 100%">
								<el-table-column prop="orgName" show-overflow-tooltip>
									<template v-slot="scope">
										<span class="column-tip-title">{{ `${scope.row.orgName}` }}</span
										><br />
										<span class="column-tip">{{ toOrgLineName(scope.row) }}</span>
									</template>
								</el-table-column>
								<el-table-column align="center" width="40">
									<template v-slot="scope">
										<div class="but_box">
											<span class="item_but">
												<SvgIcon :name="'elementClose'" @click="handleDelete(scope.row)"></SvgIcon>
											</span>
										</div>
									</template>
								</el-table-column>
							</el-table>
						</el-scrollbar>
					</div>
				</div>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="handelClose" size="small">取 消</el-button>
					<el-button type="primary" @click="handelSave" :loading="loadingBtn" size="small">保 存</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watchEffect, getCurrentInstance, nextTick } from 'vue';
import { getChildren, searchList } from '/@/api/org/index.ts';
import type { TabsPaneContext } from 'element-plus';

export default defineComponent({
	name: 'OrgTreeTransfer',
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
			flag: false,
			keyWord: '',
			navList: [],
			activeName: 2,
			orgList: [], //当前组织列表
			loading: false,
			selected: [], // 选中节点
			loadingBtn: false, // 加载按钮
			result: [], //返回结果
			isDisabled: props.disabled,
		});
		const { proxy } = getCurrentInstance() as any;

		// 点击节点 ,上一步
		const handleTab = (tab: TabsPaneContext, event: any) => {
			let info = state.navList.find((x) => tab.paneName == x.orgCode);
			state.navList = state.navList.filter((x) => info.orgLevel >= x.orgLevel);
			getList(getCurrentNode());
		};

		//钻取下级
		const goNext = (row: any) => {
			state.navList.push({
				...row,
				orgLevel: state.navList.length + 1,
			});
			getList(getCurrentNode());
		};

		//获取当前节点
		const getCurrentNode = () => {
			if (state.navList.length == 0) {
				return {
					orgName: '',
					orgType: '',
					orgCode: '',
				};
			}
			return state.navList[state.navList.length - 1];
		};

		// 打开对话框
		const openDialog = () => {
			if (state.isDisabled) {
				return false;
			}
			state.keyWord = '';
			state.selected = JSON.parse(JSON.stringify(state.result));
			getList(getCurrentNode());
			state.flag = !state.flag;
		};

		// 获取结果
		const getList = async (params: any) => {
			state.loading = true;
			state.activeName = params.orgCode;
			const res = await getChildren(params);
			if (res.status !== 0) {
				state.orgList = [];
			}
			//绑定当前选中值
			state.orgList = res.data.map((x) => {
				return {
					...x,
					checked: state.selected.some((y) => x.orgCode == y.orgCode),
				};
			});
			state.loading = false;
		};

		// 选择节点
		const handleSelected = async (obj: any, ent: any) => {
			if (!obj.checked) {
				state.selected = state.selected.filter((x) => x.orgCode !== obj.orgCode);
			} else {
				state.selected.push(JSON.parse(JSON.stringify(obj)));
			}
		};

		//删除节点
		const handleDelete = async (obj: any) => {
			state.selected = state.selected.filter((x) => x.orgCode !== obj.orgCode);
		};

		//保存
		const handelSave = async () => {
			state.flag = false;
			//保存选择结果
			state.result = JSON.parse(JSON.stringify(state.selected));
			emit('update:selectedList', state.result);
			emit('change', state.result);
		};

		const handelClose = () => {
			state.flag = false;
			state.navList = [];
		};
		//实时搜索
		const handleSearch = async () => {
			let timer;
			clearTimeout(timer);
			if (state.keyWord && state.keyWord.length > 0) {
				timer = setTimeout(async () => {
					state.loading = true;
					const res = await searchList({
						// applyForIdCode: this.form.applyForIdCode,
						searchStr: state.keyWord,
					});
					if (res.status == 0) {
						state.orgList = res.data;
					}
					state.loading = false;
				}, 500);
			}
		};

		watchEffect(() => {
			state.result = props.selectedList ? props.selectedList : [];
			state.isDisabled = props.disabled;
		});

		return {
			...toRefs(state),
			openDialog,
			handleTab,
			goNext,
			handleSelected,
			handleDelete,
			handelSave,
			handleSearch,
			handelClose,
			toOrgLineName: (row) => {
				let arr = [];
				if (row.unitName && row.unitName != '') {
					arr.push(row.unitName);
				}
				if (row.deptName && row.deptName != '') {
					arr.push(row.deptName);
				}
				if (row.jobName && row.jobName != '') {
					arr.push(row.jobName);
				}
				if (arr.length > 0) {
					return `(${arr.join('-')})`;
				}
				return '';
			},
			reset: () => {},
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
