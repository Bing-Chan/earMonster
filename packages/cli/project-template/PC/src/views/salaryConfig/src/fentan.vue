<template>
	<div id="pages">
		<div class="query_box">
			<el-form :inline="true" label-position="left" :model="queryForm" ref="queryRef">
				<el-form-item label="薪资项" prop="itemName">
					<el-input v-model.trim="queryForm.itemName" clearable placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="薪资项分类" prop="itemCategory">
					<el-select v-model="queryForm.itemCategory" clearable placeholder="请选择薪资项分类">
						<el-option v-for="item in categoryList" :value="item.categoryCode" :label="item.category"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
					<el-button type="default" @click="bandReset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="content_list">
			<div class="table_list">
				<el-table :data="tableData" stripe border style="width: 100%">
					<template #empty><SysEmpty></SysEmpty></template>
					<el-table-column prop="itemNumber" label="薪资项编号" align="center"></el-table-column>
					<el-table-column prop="itemName" label="薪资项名称" align="center"></el-table-column>
					<el-table-column prop="itemCategoryStr" label="薪资项分类" align="center"></el-table-column>
					<el-table-column prop="applicableDetails" label="适用明细" align="center" width="200" show-overflow-tooltip></el-table-column>
					<el-table-column prop="paymentType" label="类型" align="center">
						<template #default="scope">
								{{ scope.row.paymentType == 'income' ? '收入项' : '扣减项' }}
							</template>
					</el-table-column>
					<el-table-column prop="deductFromTotal" label="从应发中扣除" align="center">
						<template #default="scope">
							{{ scope.row.deductFromTotal ? '是' : scope.row.deductFromTotal == null ? '-' : '否' }}
						</template>
					</el-table-column>
					<el-table-column prop="preTax" label="税前项目" align="center">
						<template #default="scope">
							{{ scope.row.preTax ? '是' : '否' }}
						</template>
					</el-table-column>
					<el-table-column prop="allocateToDaily" label="分摊到日" align="center">
						<template #default="scope">
							{{ scope.row.allocateToDaily ? '是' : '否' }}
						</template>
					</el-table-column>
					<el-table-column prop="actualValueSource" label="实际值来源" align="center">
						<template #default="scope">
							{{ scope.row.actualValueSource == 'artificial' ? '人工维护' : '系统计算' }}
						</template>
					</el-table-column>
					<el-table-column prop="effectiveStatus" label="生效状态" align="center">
						<template #default="scope">
								{{ scope.row.effectiveStatus ? '启用' : '停用' }}
							</template>
					</el-table-column>
					<el-table-column prop="isQuote" label="引用状态" align="center">
						<template #default="scope">
								{{ scope.row.isQuote ? '已引用' : '未引用' }}
							</template>
					</el-table-column>
					<el-table-column prop="updateUser" label="操作人" align="center" ></el-table-column>
					<el-table-column prop="updateTime" label="操作时间" align="center" width="150"></el-table-column>
					<el-table-column prop="quotaName" label="操作" align="center">
						<template #default="scope">
							<el-button type="text" disabled>计算规则</el-button>
						</template>
					</el-table-column>						

				</el-table>
			</div>
			<div class="pagination" ref="pagination">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="queryForm.pageNo"
					:page-size="queryForm.limit"
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
import { toRefs, reactive, defineComponent, onMounted, getCurrentInstance } from 'vue';
import { getSalaryList, getSalaryItemCategory, getSummary, getApplicableConfig, addSalaryConfig, deleteSalaryConfig, changeSalaryStatus, getSalaryConfig, updateSalaryConfig } from '/@/api/salaryConfig/index'
import { ElMessage, ElMessageBox, } from 'element-plus';

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
			totalInfo: {},
			selection: [],
			tableData: [],
			categoryList: [],
			
			total: 0,
			queryForm: {
				itemName: '',
				itemCategory: '',
				allocateToDaily: true,
				pageNo: 1,
				limit: 20,
			},
		});

		const bandReset = () => {
			proxy.$refs.queryRef.resetFields();
		};
		const onSubmit = () => {
			state.queryForm.pageNo = 1;
			getList();
		};
		const handleSelectionChange = (val) => {
			state.selection = val;
		};
		const handleSizeChange = (val: number) => {
			state.queryForm.limit = val;
			getList();
		};
		const handleCurrentChange = (val: number) => {
			state.queryForm.pageNo = val;
			getList();
		};

		const getSelectList = () => {
			return state.selection;
		};

		const handleSave = () => {
			state.flag = false;
			emit('handleComplete', state.selection);
		};

			const getItemCategory = async () => {
			let res = await getSalaryItemCategory()
			if (res.status == 0) {
				state.categoryList = res.data
			}
		}

		const getList = async () => {
			let res = await getSalaryList(state.queryForm)
			if (res.status == 0) {
				state.tableData = res.data.resultData
				state.total = res.data.total
			} else {
				ElMessage.error(res.message)
			}
		};

		const handleClose = () => {
			state.flag = false;
		};

		onMounted(() => {
			getList();
			getItemCategory()
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
			getItemCategory,
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

</style>
