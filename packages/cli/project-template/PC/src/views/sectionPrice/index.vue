<template>
	<div id="pages">
		<div class="query_box">
			<el-form :inline="true" label-position="left" :model="queryForm" ref="queryRef">
				<el-form-item label="单位名称" prop="unit">
					<el-input v-model.trim="queryForm.unit" clearable placeholder="请输入单位名称"></el-input>
				</el-form-item>
				<el-form-item label="岗位名称/代码" prop="processPosition">
					<el-input v-model.trim="queryForm.processPosition" clearable placeholder="请输入岗位名称/代码"></el-input>
				</el-form-item>
				
				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
					<el-button type="default" @click="bandReset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="content_list">
			<div class="content_title">
				<div>
					<el-button type="primary" @click="addOrEdit()">新增</el-button>
					<!-- <el-button type="default" @click="handleImport">导入</el-button>
					<el-button type="default" @click="handleExport()">导出</el-button> -->
				</div>
			</div>
			<div class="table_list">
				<el-table
	      :data="tableData"
	      style="width: 100%"
	      row-key="id"
	      border
				ref="tableRef"
	      :tree-props="{ children: 'sectionPriceList', hasChildren: 'hasChildren' }"
	    >
					<template #empty><SysEmpty></SysEmpty></template>
					<!-- <el-table-column type="index" label="序号" align="center" width="55"></el-table-column> -->
					<el-table-column prop="ruleName" label="规则名称" width="280" align="center">
						<template #default="scope">
							<div style="text-align: left;">
								{{ scope.row.ruleName }}
								<el-button type="text" v-if="scope.row.sectionPriceList && !scope.row.expanded" @click="openRow(scope.row)">展开</el-button>
								<el-button type="text" v-if="scope.row.sectionPriceList && scope.row.expanded" @click="closeRow(scope.row)">收起</el-button>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="processPositionName" label="适用工序岗位" min-width="80" align="center">
						<template #default="scope"> {{ scope.row.processPositionCode }} {{ scope.row.processPositionName }}</template>
					</el-table-column>
					<el-table-column prop="unitName" label="单位名称" min-width="120" align="center"></el-table-column>
					<!-- <el-table-column prop="basisPrice" label="基准单价" min-width="150" align="center"></el-table-column> -->
					<el-table-column prop="" label="有效期开始" min-width="150" align="center">
						<template #default="scope">
							{{ scope.row.validPeriodStart }}&nbsp;&nbsp;   
							<el-tag  v-if="scope.row.referenceFlag" type="danger">已引用</el-tag>
							<el-tag type="success" v-else>未引用</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="validPeriodEnd" label="有效期截止" min-width="100" align="center">
						<template #default="scope">
							{{ scope.row.validPeriodEnd || '-' }}
						</template>
					</el-table-column>
					<el-table-column prop="priority" label="优先级" align="center">
							<template #default="scope">
								<el-input v-model="scope.row.newPriority" v-if="scope.row.updateFlag" @blur="handleUpdatePrio(scope.row)"></el-input>
								<el-button @click="updatePriority(scope.row)" type="text" v-else>{{ scope.row.priority }}</el-button>
							</template>
						</el-table-column>
					<el-table-column prop="updateUser" label="更新人" min-width="80" align="center"></el-table-column>
					<el-table-column prop="updateTime" label="更新时间" min-width="100" align="center"></el-table-column>
					<el-table-column prop="" label="操作" fixed="right" align="center" width="180">
						<template #default="scope">
							<el-button type="text" @click="goToDetail(scope.row)">查看</el-button>
							<el-button type="text" @click="addOrEdit(scope.row)" :disabled="scope.row.referenceFlag">编辑</el-button>
							<el-button type="text" @click="deleteRow(scope.row)" :disabled="scope.row.referenceFlag">删除</el-button>
							<el-button type="text" @click="addOrEdit(scope.row, true)">添加</el-button>
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
			<el-dialog close-on-click-modal="false" :title="dialogTitle" v-model="dialogVisible" width="850px">
				<div>
					<div class="moudle">
						<div class="title">
							<span>基本信息</span>
						</div>
						<el-form inline label-width="100px" style="margin-top: 15px;">
							<el-form-item label="单位名称:">
								<span class="content">{{ sectionPriceBasicInfoRes.unitName }}</span>
							</el-form-item>
							<el-form-item label="工序岗位:">
								<span class="content">{{ sectionPriceBasicInfoRes.processPositionCode }} - {{ sectionPriceBasicInfoRes.processPositionName }}</span>
							</el-form-item>
							<el-form-item label="有效期开始:">
								<span class="content">{{ sectionPriceBasicInfoRes.validPeriodStart }}</span>
							</el-form-item>
							<el-form-item label="有效期截止:">
								<span v-if="sectionPriceBasicInfoRes.validPeriodEnd" class="content">{{ sectionPriceBasicInfoRes.validPeriodEnd}}</span>
								<span v-else>未填写</span>
							</el-form-item>
						</el-form>
					</div>
					<div class="moudle second">
						<div class="title">
							<span>阶梯单价规则</span>
						</div>
						<div class="rules">
							<p>1.基准单价：根据所在中心、所属工序岗位的绩效薪资标准和操作效能要求制定的基准单价。</p>
							<p>2.阶梯单价：操作效能不同，效率单价阶梯式浮动定价的规则表。</p>
							<el-form inline label-width="120px" style="margin-top: 15px;">
								<div class="priceLine">
									<el-form-item prop="basisEfficiency" :label="`${sectionPriceBasicInfoRes.processPositionName.replace('员','')}基准效率:`" class="item—form">
										<span class="content"> {{ sectionPriceBasicInfoRes.basisEfficiency }}</span>  &nbsp;
										<span >{{ sectionPriceBasicInfoRes.basisEfficiencyUnit }}</span>
									</el-form-item>
									<el-form-item :label="`${sectionPriceBasicInfoRes.processPositionName.replace('员', '')}基准单价:`" class="item—form">
										<span class="content">{{ sectionPriceBasicInfoRes.basisPrice }}</span> &nbsp;
										<span>{{ sectionPriceBasicInfoRes.basisPriceUnit }}</span>
									</el-form-item>
								</div>
							</el-form>
							<div class="table_list">
								<el-table :data="detailResList" stripe border style="width: 100%">
									<template #empty><SysEmpty></SysEmpty></template>
									<el-table-column type="index" label="档位" align="center" width="55"></el-table-column>
									<el-table-column
										prop="refValue"
										:label="`${sectionPriceBasicInfoRes.processPositionName}效率`"
										width="230"
										align="center"
									></el-table-column>
									<el-table-column
										prop="priceStr"
										:label="`${sectionPriceBasicInfoRes.processPositionName}效率单价`"
										min-width="150"
										align="center"
									></el-table-column>
									<el-table-column prop="basisFlag" label="是否基准单价" min-width="150" align="center">
										<template #default="scope">
											<span style="color: #56c156;">
												<font-awesome-icon icon="check-square" v-if="scope.row.basisFlag"/>
											</span>
										</template>
									</el-table-column>
								</el-table>
								<!-- <div style="margin-top: 5px">
									<span>共 {{ size }} 条</span>
								</div> -->
							</div>
						</div>
					</div>
				</div>
			</el-dialog>
		</div>
	</div>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, h,  getCurrentInstance, nextTick, ref, toRaw } from 'vue';
import { getPage, getSectionList, deletePrice, modifyPriority } from '/@/api/sectionPrice/index.ts';
import { useRouter } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';
import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated';
import dayjs from 'dayjs';

export default defineComponent({
	name: 'sectionPrice',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			queryForm: {
				limit: 20,
				pageNo: 1,
				unit: '',
				processPosition: '',
			},
			total: 0,
			dialogTitle: '',
			dialogVisible: false,
			tableData: [],
			detailResList: [],
			size: 0,
			sectionPriceBasicInfoRes: {
				unitName: '',
				processPositionCode: '',
				processPositionName: '',
				validPeriodStart: '',
				validPeriodEnd: '',
				basisPriceUnit: '',
				basisEfficiencyUnit: '',
				basisPrice: '',
				basisEfficiency: '',
				
			},
		});

		let router = useRouter();

		const getList = async () => {
			let res = await getPage(state.queryForm);
			console.log(res);
			if (res.status == 0) {
				state.tableData = res.data.resultData;
				state.total = res.data.total;
				let tableRef = proxy.$refs.tableRef
				state.tableData.forEach(row => {
					row['updateFlag'] = false
					row['newPriority'] = ''
					row['expanded'] = false
					tableRef.toggleRowExpansion(row, false)
				})
				
			}
		};

		const goToDetail = async (row: any) => {
			console.log(row);
			state.dialogTitle = row.ruleName;

			let res = await getSectionList({ sectionPriceId: row.id });
			console.log(res);
			if (res.status == 0) {
				state.dialogVisible = true;
				state.detailResList = res.data.detailResList;
				state.sectionPriceBasicInfoRes = res.data.sectionPriceBasicInfoRes;
				state.size = res.data.size;
			}
		};

		const onSubmit = () => {
			state.queryForm.pageNo = 1;
			getList();
		};

		const bandReset = () => {
			proxy.$refs.queryRef.resetFields();
		};

		onMountedOrActivated(() => {
			getList();
		});

		const handleSizeChange = (val: number) => {
			state.queryForm.limit = val;
			getList();
		};
		const handleCurrentChange = (val: number) => {
			state.queryForm.pageNo = val;
			getList();
		};

		const addOrEdit = (row, isPublish) => {
			router.push({
				path: '/sectionPrice/edit',
				query: {
					id: !row ? null : row.id,
					isPublish: !isPublish ? null : isPublish,
				},
			});
		};

		const deleteRow = (row: any) => {
			ElMessageBox.confirm(row ,
				{
					title: `${row.ruleName}`,
					message: h('p', null, [
						h(
							'span',
							null,
							`点击确认，删除
								${row.validPeriodEnd != null ?
								'[' + dayjs(row.validPeriodStart).format('YYYY-MM-DD') + '至' + dayjs(row.validPeriodEnd).format('YYYY-MM-DD') + ']有效' :
								'[' + dayjs(row.validPeriodStart).format('YYYY-MM-DD') + ']开始生效'
								}的阶梯单价。`
						)
					]),
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					
			}).then(async () => {
				let params = {
					id: row.id,
				};
				let res = await deletePrice(params);
				if (res.status == 0) {
					ElMessage.success('删除成功');
					getList();
				} else {
					ElMessage.error(res.message);
				}
			})
			.catch(() => {
				
			});;
		};

		const updatePriority = (row: any) => {
			row.updateFlag = true
			row.newPriority = row.priority
		}

		const  handleUpdatePrio = async (row: any) => {
			console.log(row)
			let params = {
				id: row.id,
				beforePriority: row.priority,
				nowPriority: Number(row.newPriority)
			}
			let res = await modifyPriority(params)
			if(res.status == 0){
				row.newPriority = ''
				row.updateFlag = false
				getList()
			}else{
				ElMessage.error(res.message)
			}
		}

		const openRow = (row: any) => {
			let tableRef = proxy.$refs.tableRef
			tableRef.toggleRowExpansion(row, true)
			row.expanded = true
		}

		const closeRow = (row: any) => {
			let tableRef = proxy.$refs.tableRef
			tableRef.toggleRowExpansion(row, false)
			row.expanded = false
		}

		return {
			...toRefs(state),
			getList,
			onSubmit,
			bandReset,
			goToDetail,
			handleCurrentChange,
			handleSizeChange,
			addOrEdit,
			deleteRow,
			updatePriority,
			handleUpdatePrio,
			openRow,
			closeRow
		};
	},
});
</script>
<style lang="scss" scoped>
.el-form-item--small.el-form-item{
	margin-bottom: 5px;
}

p {
	line-height: 24px;
	span {
		font-weight: 600;
	}
}
.second {
	margin-top: 20px;
	.rules {
		padding: 0 20px;
		margin-top: 18px;
		p{
			font-size: 12px;
		}
	}
}
.priceLine{
	padding: 5px 10px 0 10px;
	margin-top: 5px;
	background-color: #edf2ff;
	border-radius: 2px;
}
.moudle {
	position: relative;
	border: 1px solid #ddd;
	padding: 10px 5px;
	.title {
		margin-left: 10px;
		// height: 20px;
		font-size: 14px;
		::before {
			content: '';
			position: absolute;
			top: 20px;
			left: 5px;
			width: 3px;
			height: 15px;
			background: #4c84ff;
			transform: translateY(-50%);
			border-radius: 4px;
		}
	}
	.content {
		font-weight: 600;
	}
}
.content {
	font-weight: 600;
}
 :deep .el-table__expand-icon{
	display: none !important;
}

::v-deep(.el-table__row--level-1) {
	 td:first-child{
		padding-left: 20px;
	 }
	
}

::v-deep(.el-table__indent),::v-deep(.el-table__placeholder){
	display: none !important;
}

</style>
