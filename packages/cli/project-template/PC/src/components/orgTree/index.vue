<template>
	<div>
		<!--输入框-->
		<div>
			<el-input
				v-model.trim="orgText"
				readonly
				:disabled="disabled"
				class="dept-code"
				style="float: left; width: 100%"
				placeholder="请选择单位/部门"
				@click="openDialog"
			></el-input>
		</div>
		<!--组织树-->
		<el-dialog append-to-body :close-on-click-modal="false" :title="title" center v-model="orgDialogFlag" width="500px">
			<div class="org-content" v-loading="loading">
				<div v-if="hasFilter" class="org_filter">
					<el-row :gutter="10">
						<el-col :span="19">
							<el-input style="width: 100%" placeholder="输入关键字进行过滤" v-model.trim="filterText"> </el-input>
						</el-col>
						<el-col :span="5">
							<el-button type="primary" size="small" @click="reset">清空已选项</el-button>
						</el-col>
					</el-row>
				</div>
				<div v-loading="orgLoading" class="tree-content">
					<el-scrollbar class="layout-scrollbar" ref="layoutScrollbarRef">
						<div class="org_list" v-if="orgDialogFlag">
							<el-tree
								:data="orgList"
								ref="treeRef"
								:filter-node-method="filterNode"
								show-checkbox
								node-key="orgCode"
								:default-expanded-keys="defaulCheckedKeys"
								:default-checked-keys="defaulCheckedKeys"
								:props="defaultProps"
								@check="handleCheckChange"
								:check-strictly="!isCheck"
							>
							</el-tree>
						</div>
					</el-scrollbar>
				</div>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button size="small" @click="closeDialog">取 消</el-button>
					<el-button type="primary" size="small" @click="getCheckedNodes">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted, watch, ref, watchEffect, nextTick } from 'vue';
import { getOrgTree, getAllOrgTree } from '/@/api/org/index.ts';
import { getSimpleCheckedNodes } from '/@/utils/other.ts';

export default defineComponent({
	name: 'orgTree',
	props: {
		// 选择的节点
		orgDataList: {
			type: Array,
			default() {
				return [];
			},
		},
		// 对话框标题
		title: {
			type: String,
			default: '组织架构树',
		},
		//是否提供搜索
		hasFilter: {
			type: Boolean,
			default: true,
		},
		//是否多选
		isCheck: {
			type: Boolean,
			default: true,
		},
		isDisabledDanwei: {
			type: Boolean,
			default: false,
		},
		//是否只选单位
		isDanwei: {
			type: Boolean,
			default: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, { emit }) {
		const treeRef = ref();
		let filterText = ref('');
		const state = reactive({
			orgLoading: false,
			orgText: '',
			orgDialogFlag: false, //组织树弹框
			selectedList: [],
			orgList: [],
			loading: false,
			defaulCheckedKeys: [],
			hasFilter: true,
			isCheck: props.isCheck,
			defaultProps: {
				children: 'childList',
				label: 'orgName',
				disabled: function (data, node) {
					if (props.isDisabledDanwei && data.orgType === 1) {
						return true;
					}
					return false;
				},
			},
		});

		const init = () => {
			state.selectedList = props.orgDataList; // 默认选择树
			getOrgList();
		};

		const closeDialog = () => {
			state.orgDialogFlag = false;
		};

		const filterNode = (value, data) => {
			if (!value) return true;
			return data.orgName.indexOf(value) !== -1;
		};

		const getOrgList = async () => {
			let res = await (props.isDanwei ? getOrgTree() : getAllOrgTree());
			if (res.status == 0) {
				state.orgList = res.data.data;
			} else {
				state.orgList = [];
			}
		};

		const handleCheckChange = (data) => {
			if (!props.isCheck) {
				let checked = data; //暂存选中节点
				treeRef.value.setCheckedKeys([]); //删除所有选中节点
				treeRef.value.setCheckedNodes([checked]); //选中已选中节点
			}
		};

		const openDialog = async () => {
			state.orgDialogFlag = !state.orgDialogFlag;
			state.loading = true;
			filterText.value = '';
			state.defaulCheckedKeys = [];
			if (!state.orgList || state.orgList.length == 0) {
				let res = await (props.isDanwei ? getOrgTree() : getAllOrgTree());
				if (res.status == 0) {
					state.orgList = res.data;
				} else {
					state.orgList = [];
				}
			}
			if (state.selectedList.length > 0) {
				state.defaulCheckedKeys = state.selectedList.map((item: any) => {
					return item.orgCode;
				});
			}
			state.loading = false;
		};

		const reset = () => {
			state.orgLoading = true;
			state.defaulCheckedKeys = [];
			state.selectedList = [];
			state.orgText = '';
			treeRef.value.setCheckedKeys(state.defaulCheckedKeys);
			state.orgLoading = false;
		};

		const getCheckedNodes = () => {
			let checkedNodes = props.isCheck ? getSimpleCheckedNodes(treeRef.value.store) : treeRef.value.getCheckedNodes();
			let list: any = [];
			let str = '';
			checkedNodes.forEach((item: any) => {
				str += item.orgName + '、';
				list.push({
					orgCode: item.orgCode,
					orgType: item.orgType,
					orgName: item.orgName,
					orgCodeLine: item.orgCodeLine,
				});
			});
			let reg = /、$/gi;
			str = str.replace(reg, '');
			state.selectedList = list;
			state.orgText = str;
			state.orgDialogFlag = false;
			// 传递选中值
			emit('change', state.selectedList);
		};

		watch(
			() => props.orgDataList,
			(val) => {
				if (val instanceof Array) {
					state.selectedList = val;
					state.orgText =
						val.length > 0
							? val
									.map((item: any) => {
										return item.orgName;
									})
									.join('、')
							: '';
				}
			}
		);

		watch(filterText, (val) => {
			state.orgLoading = true;
			let timer = null;
			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(() => {
				treeRef.value.filter(val);
				state.orgLoading = false;
			}, 200);
		});

		onMounted(() => {
			init();
		});

		return {
			openDialog,
			getCheckedNodes,
			closeDialog,
			handleCheckChange,
			reset,
			filterNode,
			filterText,
			treeRef,
			...toRefs(state),
		};
	},
});
</script>
<style lang="scss" scoped>
.org-content {
	height: 400px;
	margin-bottom: 20px;
	.org_filter {
		padding-left: 10px;
		padding-right: 10px;
		margin-bottom: 10px;
	}
	.org_list {
		padding-left: 10px;
		padding-right: 10px;
	}
	.tree-content {
		height: 400px;
	}
}
</style>
<style>
.highlight {
	color: #7f4893 !important;
	font-weight: bold !important;
}
</style>
