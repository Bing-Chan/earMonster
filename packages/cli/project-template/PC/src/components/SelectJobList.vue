<template>
	<el-dialog :close-on-click-modal="false" v-model="flag" center title="参数列表" width="760px">
		<div id="pages">
			<div class="query_box">
				<el-form :inline="true" label-position="left" :model="queryForm" ref="queryRef">
					<el-form-item label="参数名称" prop="paramName">
						<el-input v-model.trim="queryForm.paramName" clearable placeholder="请输入参数名称"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">查询</el-button>
						<el-button type="default" @click="bandReset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="content_list">
				<div class="table_list">
					<el-table height="400px" :data="tableData" stripe @selection-change="handleSelectionChange" border style="width: 100%">
						<template #empty><SysEmpty></SysEmpty></template>
						<el-table-column align="center" type="selection" width="50" label="全选" />
						<el-table-column prop="paramName" label="参数名称" align="center"></el-table-column>
						<el-table-column prop="paramCode" label="参数代码" align="center"></el-table-column>
						<el-table-column prop="description" label="参数描述" align="center"></el-table-column>
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
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="handleClose" size="small">取 消</el-button>
				<el-button type="primary" @click="handleSave" size="small">保 存</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted, getCurrentInstance } from 'vue';
import { getParamLibraryList } from '/@/api/indicatorsLibrary/index.ts';

export default defineComponent({
	name: 'selectList',
	props: {
		// 指标
		jobType: {
			type: Number,
			default: 1,
		},
	},
	setup(props, { emit }) {
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			flag: false,
			selection: [],
			tableData: [],
			currentPage: 1,
			limit: 20,
			total: 0,
			queryForm: {
				paramName: '',
			},
		});

		const bandReset = () => {
			proxy.$refs.queryRef.resetFields();
		};
		const onSubmit = () => {
			state.currentPage = 1;
			getList();
		};
		const handleSelectionChange = (val) => {
			state.selection = val;
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

		const handleSave = () => {
			state.flag = false;
			emit('handleComplete', state.selection);
		};

		const getList = async () => {
			let params = {
				jobType: props.jobType,
				pageNo: state.currentPage,
				limit: state.limit,
				paramName: state.queryForm.paramName,
			};
			let res = await getParamLibraryList(params);
			state.tableData = res.data.resultData;
			state.total = res.data.total;
		};

		const handleClose = () => {
			state.flag = false;
		};

		onMounted(() => {
			getList();
		});

		return {
			...toRefs(state),
			onSubmit,
			bandReset,
			handleSelectionChange,
			handleSizeChange,
			handleCurrentChange,
			getSelectList,
			handleSave,
			handleClose,
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

#pages .content_list {
	min-height: 400px !important;
	padding-top: 0px;
}
#pages .dialog-content .el-form--inline .el-form-item,
#pages .query_box .el-form--inline .el-form-item {
	margin-bottom: 5px;
}

#pages {
	margin-top: -15px;
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
