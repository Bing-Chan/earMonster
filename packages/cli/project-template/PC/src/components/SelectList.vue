<template>
	<el-dialog :close-on-click-modal="false" v-model="flag" center title="指标列表" width="760px">
		<div id="pages">
			<div class="query_box">
				<el-form :inline="true" label-position="left" :model="queryForm" ref="queryRef">
					<el-form-item label="指标名称" prop="quotaName">
						<el-input v-model.trim="queryForm.quotaName" clearable placeholder="请输入指标名称"></el-input>
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
						<el-table-column prop="quotaName" label="指标名称" align="center"></el-table-column>
						<el-table-column prop="quotaCode" label="指标代码" align="center"></el-table-column>
						<el-table-column prop="description" label="指标描述" align="center"></el-table-column>
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
import { getIndicatorsList } from '/@/api/indicatorsLibrary/index.ts';

export default defineComponent({
	name: 'selectList',
	props: {
		// 适用对象，suitableFilterFlag=true时起效
		suitableCode: {
			type: String,
			default: '',
		},
		// 是否需要根据适用对象过滤
		suitableFilterFlag: {
			type: Boolean,
			default: false,
		},
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
				quotaName: '',
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
				pageNo: state.currentPage,
				limit: state.limit,
				quotaName: state.queryForm.quotaName,
				quotaState: 1,
				jobType: props.jobType,
				showPerformance: true,
			};
			let res = await getIndicatorsList(params);
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
