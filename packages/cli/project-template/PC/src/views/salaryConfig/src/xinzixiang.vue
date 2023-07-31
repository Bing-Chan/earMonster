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
				<el-form-item label="实际值来源" prop="actualValueSource">
					<el-select v-model="queryForm.actualValueSource" clearable placeholder="请选择实际值来源">
						<el-option label="系统计算" value="system"></el-option>
						<el-option label="人工维护" value="artificial"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="分摊到日" prop="allocateToDaily">
					<el-select v-model="queryForm.allocateToDaily" clearable placeholder="请选择">
						<el-option label="是" :value="1"></el-option>
						<el-option label="否" :value="0"></el-option>
					</el-select>
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
					<el-col :span="15">
						<div class="grid-content">
							<table class="single-table">
								<tr>
									<td class="title">汇总</td>
									<td class="title">基础薪资</td>
									<td class="title">绩效</td>
									<td class="title">津补贴</td>
									<td class="title">税前扣款</td>
									<td class="title">社保公积金</td>
									<td class="title">代扣税</td>
									<td class="title">税后扣款</td>
								</tr>
								<tr>
									<td>{{ totalInfo.summary }}</td>
									<td>{{ totalInfo.basicSalary }}</td>
									<td>{{ totalInfo.performance }}</td>
									<td>{{ totalInfo.allowances }}</td>
									<td>{{ totalInfo.preTaxDeductions }}</td>
									<td>{{ totalInfo.socialSecurityHousingFund }}</td>
									<td>{{ totalInfo.taxDeductions }}</td>
									<td>{{ totalInfo.postTaxDeductions }}</td>
								</tr>
							</table>
						</div></el-col>
				 <el-col :span="5">
					<div class="grid-content">
						<table class="single-table">
							<tr>
								<td class="title">系统计算</td>
								<td class="title">人工维护</td>
							</tr>
							<tr>
								<td>{{ totalInfo.systemCount }}</td>
								<td>{{ totalInfo.artificial }}</td>
							</tr>
						</table>
					</div>
					</el-col>
				 <el-col :span="4">
					<div class="grid-content">
						<table class="single-table">
							<tr>
								<td class="title">分摊到日-是</td>
								<td class="title">分摊到日-否</td>
							</tr>
							<tr>
								<td>{{ totalInfo.allocateToDaily }}</td>
								<td>{{ totalInfo.noAllocateToDaily }}</td>
							</tr>
						</table>
					</div>
				 </el-col>
				</el-row>
			</div>
		</div>
		<div class="content_list">
			<div class="content_title" ref="contentTitle">
				<div>
					<el-button type="primary" @click="handleAdd()">新增薪资项</el-button>
				</div>
			</div>
			<div class="table_list">
				<el-table :data="tableData" stripe border style="width: 100%">
					<template #empty><SysEmpty></SysEmpty></template>
					<el-table-column prop="itemNumber" label="薪资项编号" align="center"></el-table-column>
					<el-table-column prop="itemName" label="薪资项名称" align="center" min-width="100"></el-table-column>
					<el-table-column prop="itemCategoryStr" label="薪资项分类" align="center"></el-table-column>
					<el-table-column prop="applicableDetails" label="适用明细" align="center" width="200" show-overflow-tooltip ></el-table-column>
					<el-table-column prop="paymentType" label="类型" align="center">
						<template #default="scope">
							{{ scope.row.paymentType == 'income' ? '收入项' :  '扣减项' }}
						</template>
					</el-table-column>
					<el-table-column prop="deductFromTotal" label="从应发中扣除" align="center">
						<template #default="scope">
							{{ scope.row.deductFromTotal ? '是' : scope.row.deductFromTotal == null ? '-':'否' }}
						</template>
					</el-table-column>
					<el-table-column prop="preTax" label="税前项目" align="center">
						<template #default="scope">
							{{ scope.row.preTax ? '是' : '否' }}
						</template>
					</el-table-column>
					<el-table-column prop="allocateToDaily" label="分摊到日" align="center">
						<template #default="scope">
							{{ scope.row.allocateToDaily ? '是' : '否'}}
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
					<el-table-column prop="updateUser" label="操作人" align="center"></el-table-column>
					<el-table-column prop="updateTime" label="操作时间" align="center" width="150"></el-table-column>
					<el-table-column prop="quotaName" label="操作" align="center" width="150">
						<template #default="scope" >
							<el-button type="text" @click="handleAdd(scope.row)" :disabled="scope.row.isQuote">编辑</el-button>
							<el-button type="text" @click="handleStop(scope.row.id, false)" v-if="scope.row.effectiveStatus">停用</el-button>
							<el-button type="text" @click="handleStop(scope.row.id, true)" v-else>启用</el-button>
							<el-button type="text" @click="handleDelete(scope.row.id)" :disabled="scope.row.isQuote">删除</el-button>
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
		<el-dialog custom-class="step-dialog" :close-on-click-modal="false" :title="dialogTitle" v-model="dialogVisible" center width="850px" @close="handleClose">
			<div>
				<div >
					<el-form :model="addForm" label-position="right" label-width="100px" ref="addFormRef" :rules="rules">
						<div class="dialogBox">
							<div class="mtitle">
								<span>基本信息</span>
							</div>
						</div>
						<el-form-item label="薪资项名称" prop="itemName" required >
							<el-input v-model.trim="addForm.itemName" clearable placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="薪资项分类" prop="itemCategory">
							<el-select v-model="addForm.itemCategory" clearable placeholder="请选择薪资项分类" @change="checkedItemCategory">
								<el-option v-for="item in categoryList" :value="item.categoryCode" :label="item.category"></el-option>
							</el-select>
							<br/>
							<span v-if="addForm.itemCategory">{{ paymentType }} , {{ preTax }}</span> 
						</el-form-item>
						<el-form-item label="适用明细" prop="salaryApplicableReqList">
							<el-select v-model="addForm.salaryApplicableReqList" clearable placeholder="请选择" multiple>
								<el-option v-for="item in applicableList" :value="item.applicableDetails" :label="item.applicableDetails"></el-option>
							</el-select>
						</el-form-item>
						<div class="dialogBox">
								<div class="mtitle">
									<span>月薪计算</span>
								</div>
							</div>
						<el-form-item label="实际值来源" prop="actualValueSource">
							<el-select v-model="addForm.actualValueSource" clearable placeholder="请选择实际值来源">
								<el-option label="系统计算" value="system"></el-option>
								<el-option label="人工维护" value="artificial"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="计算公式" prop="actualValueFormula">
							<el-input v-model.trim="addForm.actualValueFormula" clearable placeholder="请输入"></el-input>
						</el-form-item>
						
						<div class="dialogBox">
								<div class="mtitle">
									<span>日薪计算</span>
								</div>
							</div>
						<el-form-item label="分摊到日" prop="allocateToDaily" required>
							<el-radio-group v-model="addForm.allocateToDaily">
								<el-radio :label="1">是</el-radio>
								<el-radio :label="0">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="计算公式" prop="apportionToDailyFormula">
							<el-input v-model.trim="addForm.apportionToDailyFormula" clearable placeholder="请输入"></el-input>
						</el-form-item>
					</el-form>
				</div>
				<div style="text-align: center;">
					<el-button type="default" @click="handleClose">取消</el-button>
					<el-button type="primary" @click="handleSave">保存</el-button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted, getCurrentInstance } from 'vue';
import { getSalaryList, getSalaryItemCategory, getSummary, getApplicableConfig, addSalaryConfig, deleteSalaryConfig, changeSalaryStatus, getSalaryConfig, updateSalaryConfig } from '/@/api/salaryConfig/index'
import { ElMessage, ElMessageBox,} from 'element-plus';
import { nextTick } from 'vue';

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
			totalInfo: {
				summary: 0,
				basicSalary: 0,
				performance: 0,
				allocateToDaily: 0,
				allowances: 0,
				preTaxDeductions: 0,
				socialSecurityHousingFund:0,
				postTaxDeductions: 0,
				taxDeductions: 0,
				systemCount: 0,
				artificial: 0,
				noAllocateToDaily: 0,
			},
			categoryList:[],
			tableData: [],
			
			total: 0,
			queryForm: {
				itemName: '',
				actualValueSource: '', //实际值来源
				allocateToDaily: '',
				itemCategory: '',
				pageNo: 1,
				limit: 20,
			},
			dialogVisible: false,
			dialogTitle: '新增薪资项',
			addForm: {
				itemName: '',
				itemCategory: '',
				salaryApplicableReqList:[],
				actualValueSource: '',
				actualValueFormula: '',
				allocateToDaily: 1,
				apportionToDailyFormula: '',
			},
			salaryApplicableReqList: [],
			applicableList: [],
			editFlag: false,
			paymentType: '',
			preTax: '',
			rules: {
				itemName: [{ required: true, message: '请输入薪资项名称', trigger: ['change', 'blur'] }],
				itemCategory: [{ required: true, message: '请选择薪资项分类', trigger: 'change' }],
				actualValueSource: [{ required: true, message: '请选择实际值来源', trigger: 'change' }],
			}
		});

		const bandReset = () => {
			proxy.$refs.queryRef.resetFields();
		};
		const onSubmit = () => {
			state.queryForm.pageNo = 1;
			getList();
			getAllCount()
		};
	
		const handleSizeChange = (val: number) => {
			state.queryForm.limit = val;
			getList();
		};
		const handleCurrentChange = (val: number) => {
			state.queryForm.pageNo = val;
			getList();
		};

		const handleSave = async() => {
			proxy.$refs.addFormRef.validate(async (valid) => {
				if(!valid) return false;
				console.log(state.addForm)
				if (state.addForm.salaryApplicableReqList != null) {
					state.addForm.salaryApplicableReqList = state.addForm.salaryApplicableReqList.map(item => {
						return { applicableDetails: item }
					})
				}
				if (state.editFlag) {
					let res = await updateSalaryConfig(state.addForm)
					if (res.status == 0) {
						ElMessage.success('编辑成功')
						getList()
						state.dialogVisible = false
						state.editFlag = false
						nextTick(() => {
							proxy.$refs.addFormRef.resetFields();
						})
					} else {
						ElMessage.error(res.message)
					}
				} else {
					let res = await addSalaryConfig(state.addForm)
					if (res.status == 0) {
						ElMessage.success('新增成功')
						getList()
						getAllCount()
						state.dialogVisible = false
						nextTick(() => {
							proxy.$refs.addFormRef.resetFields();
						})
					} else {
						ElMessage.error(res.message)
					}
				}
			})
			
		};

		const getList = async () => {
			let res = await getSalaryList(state.queryForm)
			if(res.status == 0){
				state.tableData = res.data.resultData
				state.total = res.data.total
			}else{
				ElMessage.error(res.messge)
			}
		};

		const handleClose = () => {
			state.dialogVisible = false;
			state.editFlag = false,
			nextTick(() => {
				proxy.$refs.addFormRef.resetFields();
			})
		};

		const handleAdd = async (row: any) => {
			state.dialogVisible = true
			if(row)	{
				state.dialogTitle = '编辑薪资项'
				state.editFlag = true
				let res = await getSalaryConfig({id: row.id})
				if(res.status == 0){
					if(res.data.salaryApplicableResList != null){
						res.data.salaryApplicableReqList = res.data.salaryApplicableResList.map(item => {
							return item.applicableDetails
						})
					}
					res.data.allocateToDaily = Number(res.data.allocateToDaily)
					checkedItemCategory(res.data.itemCategory)
					nextTick(() => {
						state.addForm = { ...res.data }
					})
				}		
			}else{
				state.dialogTitle = '新增薪资项'
				state.editFlag = false
			}

		}

		const getItemCategory = async() => {
			let res = await getSalaryItemCategory()
			if(res.status == 0){
				state.categoryList = res.data
			}		
		}

		const getAllCount = async() => {
			let res = await getSummary(state.queryForm)
			if(res.status == 0){
				state.totalInfo = res.data
			}
		}
		const checkedItemCategory = async(categoryCode : string) => {
			console.log(categoryCode)
			if(categoryCode){
				let arr = state.categoryList.filter(item => {
					if (item.categoryCode == categoryCode) {
						return true
					}
				})
				console.log(arr[0])
				state.paymentType = arr[0].paymentType == 'income' ? '收入项' : '扣减项'
				state.preTax = arr[0].preTax ? '税前项' : '税后项'
				let res = await getApplicableConfig({ categoryCode })
				if (res.status == 0) {
					state.applicableList = res.data.data
				}
			}
			
		}

		const handleDelete = async(id)=> {
			ElMessageBox.confirm('确认要删除吗？', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(async () => {
					const res = await deleteSalaryConfig({ id});
					if (res.status == 0) {
						ElMessage.success('删除成功');
						getList();
						getAllCount();
					} else {
						ElMessage.error(res.message);
					}
				})
				.catch(() => { });
		}
		const handleStop = async(id, status) => {
			let params = {
				ids: [id],
				on: status,
			}
			let res = await changeSalaryStatus(params)
			if(res.status == 0){
				ElMessage.success('状态修改成功')
				getList()
			}else{
				ElMessage.error(res.message)
			}
		}
		onMounted(() => {
			getList();
			getItemCategory();
			getAllCount()
		});

		return {
			...toRefs(state),
			onSubmit,
			bandReset,
			handleSizeChange,
			handleCurrentChange,
			handleSave,
			handleClose,
			handleAdd,
			getItemCategory,
			checkedItemCategory,
			handleDelete,
			handleStop,
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

.dialogBox{
	position: relative;
	height: 25px;
	.mtitle{
		margin-left: 5px;
		// height: 20px;
		::before{
			content: '';
			position: absolute;
			top: 10px;
			left: -4px;
			width: 3px;
			height: 16px;
			background: #4c84ff;
			transform: translateY(-50%);
			border-radius: 4px;
		}
	}
}


</style>
