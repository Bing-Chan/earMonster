<template>
	<el-dialog   :close-on-click-modal="false"  v-model="flag" title="模板列表" width="760px">
		<div id="pages">
			<!-- <div class="query_box">
				<el-form :inline="true" label-width="auto" :model="queryForm" ref="queryRef">
					<el-form-item label="指标名称" prop="quotaName">
						<el-input v-model.trim="queryForm.quotaName" clearable placeholder="请输入指标名称"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit" >查询</el-button>
						<el-button type="default" @click="bandReset">重置</el-button>
					</el-form-item>
				</el-form>
			</div> -->
			<div class="content_list">
				<div class="table_list">
					<el-table height="400px" :data="tableData" stripe @selection-change="handleSelectionChange" border style="width: 100%">
						<template #empty><SysEmpty></SysEmpty></template>
					
						<el-table-column prop="templateName" label="模板名称" align="center"></el-table-column>
						<el-table-column prop="templateCode" label="模板代码" align="center"></el-table-column>
						<el-table-column prop="description" label="描述" align="center"></el-table-column>
					</el-table>
				</div>
				<!-- <div class="pagination" ref="pagination">
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
				</div> -->
			</div>
		</div>
		<!-- <template #footer>
			<span class="dialog-footer">
				<el-button @click="handleClose" size="small">取 消</el-button>
				<el-button type="primary" @click="handleSave" size="small">保 存</el-button>
			</span>
		</template> -->
	</el-dialog>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted, getCurrentInstance } from 'vue';
import { getTempListByFlowId } from '/@/api/flow/index.ts';

export default defineComponent({
	name: 'templeteList',
	props: {
		visable: {
			type: Boolean,
			default: false,
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
				flowId: '',
			},
		});

		const bandReset = () => {
			proxy.$refs.queryRef.resetFields();
		};
		const onSubmit = () => {
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
			emit('handleComplete', state.selection);
		};

		const getList = async () => {
			let params = {
				// pageNo: state.currentPage,
				// limit: state.limit,
				flowId: state.queryForm.flowId,
			};
			let res = await getTempListByFlowId(params);
			state.tableData = res.data;
			state.total = res.data.total;
		};

		const handleClose = () => {
			state.flag = false;
		};

		onMounted(() => {
			state.flag = props.visable;
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
			open: (row: any) => {
				state.queryForm.flowId = row.id;
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
</style>
