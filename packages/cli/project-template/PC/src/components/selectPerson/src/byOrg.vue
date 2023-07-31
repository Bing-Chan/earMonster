<template>
	<div>
		<div class="org-dialog-search">
			<el-input v-model.trim="keyWord" placeholder="请输入工号/姓名/单位/部门" @input="handleSearch" clearable></el-input>
		</div>
		<div class="org-dialog" v-loading="loading">
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
								<!-- <SvgIcon :name="'elementArrowRight'"></SvgIcon> -->
							</template>
						</el-tab-pane>
					</el-tabs>
				</div>
				<!--结果集-->
				<div class="org_list">
					<el-scrollbar class="layout-scrollbar" ref="layoutScrollbarRef">
						<ul class="org_data" v-if="orgList && orgList.length > 0">
							<li class="org_item" v-for="(item, index) in orgList" :key="index">
								<div class="org_item-flex">
									<div class="item-left">
										<el-checkbox v-model="item.checked" @change="handleSelected(item, $event)">
											<span class="org-item-label">{{ item.orgName }}</span>
											<span class="column-tip" v-if="item.orgType == 3">{{ ' ' + item.orgCode }}</span>
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
						<ul v-else>
							<SysEmpty></SysEmpty>
						</ul>
					</el-scrollbar>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watchEffect, getCurrentInstance, nextTick } from 'vue';
import { getChildren, searchList } from '/@/api/org/index.ts';
import type { TabsPaneContext } from 'element-plus';

export default defineComponent({
	name: 'byOrg',
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
			isDisabled: props.disabled,
		});
		const { proxy } = getCurrentInstance() as any;

		// 点击节点 ,上一步
		const handleTab = (tab: TabsPaneContext, event: any) => {
			let info = state.navList.find((x) => tab.paneName == x.orgCode);
			if (info) {
				state.navList = state.navList.filter((x) => info.orgLevel >= x.orgLevel);
			} else {
				state.navList = [];
			}
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

		const equelRow = (traget, source) => {
			return (
				traget.orgCode === source.orgCode &&
				traget.orgName === source.orgName &&
				traget.jobCode === source.jobCode &&
				traget.deptName === source.deptName &&
				traget.unitName === source.unitName
			);
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
		const reset = () => {
			if (state.isDisabled) {
				return false;
			}
			state.navList = [];
			state.keyWord = '';
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
					checked: state.selected.some((y) => equelRow(x, y)),
				};
			});
			state.loading = false;
		};

		// 选择节点
		const handleSelected = async (obj: any, ent: any) => {
			if (!obj.checked) {
				state.selected = state.selected.filter((x) => !equelRow(x, obj));
			} else {
				if (!state.selected.some((x) => equelRow(x, obj))) {
					state.selected.push(JSON.parse(JSON.stringify(obj)));
				}
			}
			emit('update:selectedList', state.selected);
		};

		//删除节点
		const handleDelete = async (obj: any) => {
			state.selected = state.selected.filter((x) => !equelRow(x, obj));
			emit('update:selectedList', state.selected);
		};

		//实时搜索
		const handleSearch = async () => {
			let timer;
			clearTimeout(timer);
			timer = setTimeout(async () => {
				state.loading = true;
				state.navList = [];
				if (state.keyWord && state.keyWord.length > 0 && state.keyWord != '') {
					const res = await searchList({
						// applyForIdCode: this.form.applyForIdCode,
						searchStr: state.keyWord,
					});
					if (res.status == 0) {
						state.orgList = res.data;
					}
				} else {
					getList(getCurrentNode());
				}
				state.loading = false;
			}, 1000);
		};

		//  选中复选框
		const setSelectList = () => {
			state.orgList.forEach((x) => {
				x.checked = state.selected.some((y) => equelRow(x, y));
			});
		};

		watchEffect(() => {
			state.selected = props.selectedList ? props.selectedList : [];
			setSelectList();
			state.isDisabled = props.disabled;
		});

		return {
			...toRefs(state),
			reset,
			handleTab,
			goNext,
			handleSelected,
			handleDelete,
			handleSearch,
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
		};
	},
});
</script>
<style lang="scss">
.org-dialog {
	.el-tabs__item {
		padding: 0px 10px !important;
	}
}
</style>
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
	width: 100%;
	height: 40px;
	padding: 0px 15px;
}
.org-dialog {
	display: flex;
	justify-content: space-between;
	padding: 0px 10px;
	height: 378px;
	&-right,
	&-left {
		padding: 10px 15px;
		font-size: 16px;
		padding-top: 0px;
		width: 100%;
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
	height: calc(100% - 55px);
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
