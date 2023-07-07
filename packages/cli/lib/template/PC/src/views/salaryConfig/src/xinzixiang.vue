<template>
	<div id="pages">
		<div class="query_box">
			<el-form :inline="true" label-position="left" :model="queryForm" ref="queryRef">
				<el-form-item label="薪资项" prop="quotaName">
					<el-input v-model.trim="queryForm.quotaName" clearable placeholder="请输入指标名称"></el-input>
				</el-form-item>
				<el-form-item label="薪资项分类" prop="quotaName">
					<el-input v-model.trim="queryForm.quotaName" clearable placeholder="请输入指标名称"></el-input>
				</el-form-item>
				<el-form-item label="实际值来源" prop="quotaName">
					<el-input v-model.trim="queryForm.quotaName" clearable placeholder="请输入指标名称"></el-input>
				</el-form-item>
				<el-form-item label="分摊到日" prop="quotaName">
					<el-input v-model.trim="queryForm.quotaName" clearable placeholder="请输入指标名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
					<el-button type="default" @click="bandReset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="total_box">
			<!--汇总模块-->
			<div>
				<el-row :gutter="5">
					<el-col :span="24"
						><div class="grid-content">
							<table class="single-table">
								<tr>
									<td class="total-title">汇总</td>
									<td class="title">
										<span>入职成功率 </span>
									</td>
									<td class="title">环比</td>
									<td class="title">办理入职总人数</td>
									<td class="title">待入职数</td>
									<td class="title">入职成功数</td>
									<td class="title">待审核数</td>
									<td class="title">初审不通过数</td>
									<td class="title">复审不通过数</td>
									<td class="title">放弃入职数</td>
								</tr>
								<tr>
									<td>{{ totalInfo.successRateStr }}</td>
									<td>{{ totalInfo.successRateStr }}</td>
									<td>{{ totalInfo.successRateChainRateStr }}</td>
									<td>{{ totalInfo.total }}</td>
									<td>{{ totalInfo.toBeHiredCount }}</td>
									<td>{{ totalInfo.successEntryCount }}</td>
									<td>{{ totalInfo.pendingReviewCount }}</td>
									<td>{{ totalInfo.firstFailedCount }}</td>
									<td class="reds">{{ totalInfo.secondReviewFailedCount }}</td>
									<td class="reds">{{ totalInfo.giveUpCount }}</td>
								</tr>
							</table>
						</div></el-col
					>
				</el-row>
			</div>
		</div>
		<div class="content_list">
			<div class="content_title" ref="contentTitle">
				<div>
					<el-button type="primary" >新增</el-button>
				</div>
			</div>
			<div class="table_list">
				<el-table height="400px" :data="tableData" stripe @selection-change="handleSelectionChange" border style="width: 100%">
					<template #empty><SysEmpty></SysEmpty></template>
					<el-table-column align="center" type="selection" width="50" label="全选" />

					<el-table-column prop="quotaName" label="薪资项编号" align="center"></el-table-column>
					<el-table-column prop="quotaName" label="薪资项名称" align="center"></el-table-column>
					<el-table-column prop="quotaName" label="薪资项分类" align="center"></el-table-column>
					<el-table-column prop="quotaName" label="适用明细" align="center"></el-table-column>
					<el-table-column prop="quotaName" label="薪资项类型" align="center"></el-table-column>
					<el-table-column prop="quotaName" label="从应发中扣除" align="center"></el-table-column>
					<el-table-column prop="quotaName" label="税前项目" align="center"></el-table-column>
					<el-table-column prop="quotaName" label="分摊到日" align="center"></el-table-column>
					<el-table-column prop="quotaName" label="实际值来源" align="center"></el-table-column>
					<el-table-column prop="quotaName" label="生效状态" align="center"></el-table-column>
					<el-table-column prop="quotaName" label="引用状态" align="center"></el-table-column>
					<el-table-column prop="quotaName" label="操作人" align="center"></el-table-column>
					<el-table-column prop="quotaName" label="操作时间" align="center"></el-table-column>
					<el-table-column prop="quotaName" label="操作" align="center"></el-table-column>
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
import { toRefs, reactive, defineComponent, onMounted, getCurrentInstance } from 'vue';

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

		const getList = async () => {};

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
.single-table {
	border: 1px solid #d8dce6 !important;
	border-collapse: collapse !important;

	th,
	td {
		border: 1px solid #d8dce6;
		text-align: center;
		padding: 4px 0px;
	}
}

.grid-content {
	padding: 8px 10px;
}

.total_box {
	background: #fff;
	border-radius: 4px;
	margin-top: 10px;
	margin-bottom: 10px;
	font-size: 14px;
	padding-top: 10px;
	padding-bottom: 10px;
	.grid-content {
		color: #333333;
		font-weight: 700;
		.single-table {
			width: 100%;
			border-collapse: collapse;
			// background-color: #edeef2;
			// border-radius: 5px;
			color: #333;

			.total-title,
			.title {
				font-size: 14px;
				color: #333333;
				font-weight: normal;
			}

			td {
				position: relative;
				text-align: center;
				height: 30px;
				line-height: 30px;
				font-size: 20px;
			}
		}
	}
}

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
