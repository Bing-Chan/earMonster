<template>
	<div class="pageList">
		<div class="query_box">
			<el-form @submit.native.prevent :inline="true" label-position="left" :model="queryForm" ref="queryRef">
				<el-form-item label="岗位名称" prop="searchPosition">
					<el-input v-model.trim="queryForm.searchPosition" @keyup.enter.native="onSubmit" clearable placeholder="请输入岗位名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
					<el-button type="default" @click="bandReset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="content_list" v-loading="loading">
			<div class="table_list">
				<el-table
					ref="tableRef"
					height="400px"
					@select-all="handleSelectionAll"
					:data="tableData"
					stripe
					@select="handleSelectionChange"
					border
					style="width: 100%"
				>
					<template #empty><SysEmpty></SysEmpty></template>
					<el-table-column align="center" fixed type="selection" width="50" label="全选" />
					<el-table-column prop="orgCode" fixed label="工号" align="center"></el-table-column>
					<el-table-column prop="orgName" fixed label="姓名" align="center"></el-table-column>
					<el-table-column prop="jobName" label="岗位名称" min-width="150" align="center"></el-table-column>
					<el-table-column prop="deptName" label="部门名称" min-width="150" align="center"></el-table-column>
					<el-table-column prop="unitName" label="单位名称" min-width="150" align="center"></el-table-column>
				</el-table>
			</div>
			<div class="pagination" ref="pagination">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-size="limit"
					:page-sizes="[20, 30, 50]"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total"
				>
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted, nextTick, getCurrentInstance, watchEffect } from 'vue';
import { getPostList } from '/@/api/org/index.ts';

export default defineComponent({
	name: 'selectList',
	props: {
		// 选择的节点
		selectedList: {
			type: Array,
			default() {
				return [];
			},
		},
	},
	emits: ['update:selectedList'],
	setup(props, { emit }) {
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			flag: false,
			loading: false,
			selected: [],
			selection: [],
			tableData: [],
			currentPage: 1,
			limit: 20,
			total: 0,
			queryForm: {
				searchPosition: '',
			},
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

		const bandReset = () => {
			proxy.$refs.queryRef.resetFields();
		};
		const onSubmit = () => {
			state.currentPage = 1;
			getList();
		};
		const handleSelectionChange = (val, row) => {
			state.selection = JSON.parse(JSON.stringify(val));
			console.log(val, 'val');
			if (state.selection.some((x) => equelRow(x, row))) {
				//选中
				if (!state.selected.some((x) => equelRow(x, row))) {
					state.selected.push(row);
				}
			} else {
				state.selected = state.selected.filter((x) => !equelRow(x, row));
			}
			console.log(state.selected, 'state.selected');
			emit('update:selectedList', state.selected);
		};
		const handleSelectionAll = (val) => {
			state.selection = val;
			let list;
			if (!state.selection || state.selection.length == 0) {
				state.selected = state.selected.filter((x) => !state.tableData.some((y) => equelRow(x, y)));
			} else {
				state.selection.forEach((x) => {
					if (!state.selected.some((y) => equelRow(x, y))) {
						state.selected.push(x);
					}
				});
			}
			emit('update:selectedList', state.selected);
		};

		const handleSizeChange = (val: number) => {
			state.limit = val;
			getList();
		};
		const handleCurrentChange = (val: number) => {
			state.currentPage = val;
			getList();
		};

		const getSelectList = () => {
			return state.selection;
		};

		const getList = async () => {
			let params = {
				pageNo: state.currentPage,
				limit: state.limit,
				searchPosition: state.queryForm.searchPosition,
			};
			state.loading = true;
			let res = await getPostList(params);
			state.loading = false;
			state.tableData = res.data.resultData;
			setSelectList();
			state.total = res.data.total;
		};

		const handleClose = () => {
			state.flag = false;
		};

		//设置选中项
		const setSelectList = async () => {
			await nextTick();
			if (proxy.$refs.tableRef) {
				proxy.$refs.tableRef.clearSelection();
				state.tableData.forEach((x) => {
					let checked = state.selected.some((y) => equelRow(x, y));
					console.log(checked, 'checked');
					proxy.$refs.tableRef.toggleRowSelection(x, checked);
				});
			}
		};

		// 打开对话框
		const reset = () => {
			state.queryForm.searchPosition = '';
			state.currentPage = 1;
			state.limit = 20;
			getList();
		};

		watchEffect(() => {
			state.selected = props.selectedList ? props.selectedList : [];
		});

		onMounted(() => {
			getList();
		});

		return {
			...toRefs(state),
			onSubmit,
			bandReset,
			handleSelectionChange,
			handleSelectionAll,
			handleSizeChange,
			handleCurrentChange,
			getSelectList,
			handleClose,
			reset,
			setSelectList,
			open: () => {
				state.flag = true;
				getList();
			},
		};
	},
});
</script>
<style lang="scss" scoped>
.content {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
}

::v-deep(.el-form-item__label) {
	font-family: Microsoft YaHei;
	color: #666;
}
::v-deep(.el-table__cell) {
	.cell {
		font-family: Microsoft YaHei;
		color: #666;
	}
}
::v-deep(.el-table) {
	th.el-table__cell > .cell {
		color: #333;
		font-family: Microsoft YaHei;
		font-size: 14px;
	}
}

.pageList {
	margin-top: -15px;
	padding: 20px 10px;

	.content_list {
		min-height: 400px !important;
		padding-top: 0px;
	}
	.dialog-content .el-form--inline .el-form-item,
	.query_box .el-form--inline .el-form-item {
		margin-bottom: 10px;
	}
}

.content_list {
	padding-bottom: 0px !important;
	margin-bottom: 0px;
}
.el-dialog__body {
	padding-top: 0px;
}
.el-dialog__footer {
	margin-top: -20px !important;
}
</style>
