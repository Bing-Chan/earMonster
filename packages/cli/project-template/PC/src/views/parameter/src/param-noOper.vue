<template>
	<div>
		<div class="query_box">
			<el-form :inline="true" label-position="left" :model="queryForm" ref="queryRef">
				<el-form-item label="参数名称/代码" prop="paramName">
					<el-input v-model.trim="queryForm.paramName" clearable placeholder="请输入参数名称/代码"></el-input>
				</el-form-item>
				<el-form-item label="参数属性" prop="paramProperties">
					<el-select v-model="queryForm.paramProperties" clearable placeholder="请选择">
						<el-option label="系统对接" :value="1"></el-option>
						<el-option label="人工维护" :value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="参数数据维度" prop="paramDataDimensionId">
					<el-select v-model="queryForm.paramDataDimensionId" clearable placeholder="请选择" :disabled="parameterForm.columnModifyFlag == 'no'">
						<el-option v-for="(item, index) in dictionaryList['sys_data']" :key="index" :value="item.dictItemCode" :label="item.dictItem"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
					<el-button type="default" @click="bandReset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="content_list">
			<div>
				<el-button type="primary" @click="addorEditParameter()">新 增</el-button>
			</div>
			<div class="table_list">
				<el-table :data="tableData" stripe border style="width: 100%">
					<template #empty><SysEmpty></SysEmpty></template>
					<el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
					<el-table-column prop="paramCode" label="参数代码" width="150" align="center"></el-table-column>
					<el-table-column prop="paramName" label="参数名称" min-width="150" align="center"></el-table-column>
					<el-table-column prop="description" label="参数描述" min-width="150" align="center"></el-table-column>
					<!-- <el-table-column prop="quotaNames" label="关联的指标" min-width="150" align="center"></el-table-column> -->
					<el-table-column prop="paramDataDimensionValue" label="参数数据维度" min-width="150" align="center"></el-table-column>
					<el-table-column prop="paramProperties" label="参数属性" min-width="150" align="center">
						<template #default="scope">
							{{ scope.row.paramProperties == 1 ? '系统对接' : '人工维护' }}
						</template>
					</el-table-column>
					<el-table-column prop="createUser" label="更新人" width="80" align="center">
						<template #default="scope">
							{{ scope.row.updateUser || scope.row.createUser }}
						</template>
					</el-table-column>
					<el-table-column prop="createTime" label="更新时间" align="center" width="150">
						<template #default="scope">
							{{ scope.row.updateTime || scope.row.createTime }}
						</template>
					</el-table-column>
					<el-table-column label="操作" align="center" fixed="right" width="130">
						<template #default="scope">
							<el-button
								type="text"
								@click="addorEditParameter(scope.row)"
								:disabled="scope.row.nameUpdateFlag && (scope.row.updateUser || scope.row.createUser) == '系统对接'"
								>修改</el-button
							>
							<el-button type="text" @click="handleDelete(scope.row)" :disabled="scope.row.delDisplayFlag">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="pagination" ref="pagination">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="pageNo"
					:page-size="limit"
					:page-sizes="[20, 30, 50]"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total"
				>
				</el-pagination>
			</div>
		</div>
		<el-dialog :close-on-click-modal="false" :title="dialogTitle" v-model="dialogVisible" width="600px" @close="handleCancle">
			<el-form label-position="right" label-width="125px" ref="parameterRef" :model="parameterForm" :rules="formRules">
				<el-form-item label="参数名称" prop="paramName" required>
					<el-input v-model="parameterForm.paramName" clearable placeholder="请输入"></el-input>
				</el-form-item>

				<!-- <el-form-item label="关联的指标" prop="quotaCategoryId">
					<el-input v-model="selectListString" @click="openIndicatorList"></el-input>
				</el-form-item> -->
				<el-form-item label="参数数据维度" prop="paramDataDimensionId" required>
					<el-select
						v-model="parameterForm.paramDataDimensionId"
						clearable
						placeholder="请选择"
						:disabled="parameterForm.dimensionFlag"
						style="width: 100%"
					>
						<el-option v-for="(item, index) in dictionaryList['sys_data']" :key="index" :value="item.dictItemCode" :label="item.dictItem"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="数值单位" prop="resultUnitId">
					<el-select v-model="parameterForm.resultUnitId" clearable placeholder="请选择" style="width: 100%">
						<el-option v-for="(item, index) in dictionaryList['sys_unit']" :key="index" :value="item.dictItemCode" :label="item.dictItem"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="参数属性" prop="paramProperties">
					<el-select v-model="parameterForm.paramProperties" clearable placeholder="请选择" style="width: 100%">
						<el-option label="系统对接" :value="1"></el-option>
						<el-option label="人工维护" :value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="参数描述" prop="description">
					<el-input v-model="parameterForm.description" type="textarea" maxlength="200" show-word-limit></el-input>
				</el-form-item>
				<div style="text-align: center">
					<el-button type="default" @click="handleCancle">取 消</el-button>
					<el-button type="primary" @click="handleCommit" :loading="commitLoading">保 存</el-button>
				</div>
			</el-form>
		</el-dialog>
		<!--指标列表-->
		<select-list ref="zhibiaoRef" @handleComplete="handleComplete"></select-list>
	</div>
</template>
<script lang="ts">
import Vue from 'vue';
import { defineComponent, reactive, getCurrentInstance, toRefs, onMounted, ref, nextTick } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getParamsList, deleteParameter, addParams, editParams } from '/@/api/parameter/index.ts';
import { getDictionary } from '/@/api/baseConfig/index.ts';
import SelectList from '/@/components/SelectList.vue';
export default defineComponent({
	name: 'paramOper',
	components: {
		selectList: SelectList,
	},
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const parameterRef = ref();
		const state = reactive({
			tableData: [],
			pageNo: 1,
			limit: 20,
			total: 0,
			queryForm: {
				paramProperties: '',
				quotaState: '',
				jobType: 2,
				quotaCategoryId: '',
				quotaTypeId: '',
				quotaDataDimensionId: '',
			},
			dialogVisible: false,
			dialogTitle: '新增参数',
			dictionaryList: [],
			parameterForm: {
				jobType: 2,
				paramName: '',
				description: '',
				resultUnitId: '',
				paramDataDimensionId: '',
				paramProperties: '',
				baseTargetState: 0,
				columnModifyFlag: '',
				paramWithQuotaList: [],
				dimensionFlag: false,
			},
			formRules: {
				paramName: [{ required: true, message: '请输入参数名称', trigger: ['blur', 'change'] }],
				paramDataDimensionId: [{ required: true, message: '请选择参数数据维度', trigger: ['blur', 'change'] }],
			},
			zhibiaoFlag: false,
			selectListString: '',
		});
		const handleSizeChange = (val: number) => {
			state.limit = val;
			getList();
		};
		const handleCurrentChange = (val: number) => {
			state.pageNo = val;
			getList();
		};
		const getList = async () => {
			let params = { pageNo: state.pageNo, limit: state.limit };
			let res = await getParamsList({ ...params, ...state.queryForm });
			if (res.status == 0) {
				state.tableData = res.data.resultData;
				state.total = res.data.total;
			} else {
				console.log(res.message);
			}
		};
		const onSubmit = () => {
			state.pageNo = 1;
			getList();
		};
		const bandReset = () => {
			proxy.$refs.queryRef.resetFields();
		};
		const handleDelete = (row: any) => {
			ElMessageBox.confirm('确认要删除吗？', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(async () => {
					state.loading = true;
					const res = await deleteParameter({
						id: row.id,
					});
					state.loading = false;
					if (res.status == 0) {
						ElMessage.success('删除成功');
						getList();
					} else {
						ElMessage.error(res.message);
					}
				})
				.catch(() => {});
		};
		const handleCommit = async () => {
			parameterRef.value.validate(async (valid: any) => {
				if (!valid) return false;
				state.commitLoading = true;
				if (state.addType == 1) {
					let res = await addParams(state.parameterForm);
					if (res.status == 0) {
						state.commitLoading = false;
						state.dialogVisible = false;
						proxy.$refs.parameterRef.resetFields();
						ElMessage.success('新增成功');

						getList();
					} else {
						ElMessage.error(res.message);
						state.commitLoading = false;
					}
				} else {
					let res = await editParams(state.parameterForm);
					if (res.status == 0) {
						state.commitLoading = false;
						state.dialogVisible = false;
						proxy.$refs.parameterRef.resetFields();
						ElMessage.success('修改成功');
						getList();
					} else {
						state.commitLoading = false;
						ElMessage.error(res.message);
					}
				}
			});
		};
		const handleCancle = () => {
			state.dialogVisible = false;
			state.parameterForm.columnModifyFlag = '';
			state.parameterForm.dimensionFlag = false;
			state.selectListString = '';
			proxy.$refs.parameterRef.resetFields();
		};

		const addorEditParameter = (row: any) => {
			if (row) {
				state.addType = 2;
				state.dialogTitle = '修改参数';
				state.dialogVisible = true;
				row.baseTargetState = Number(row.baseTargetState);
				// row.paramWithQuotaList.forEach((x) => {
				//   state.selectListString += x.quotaName + ','
				//   state.parameterForm.paramWithQuotaList.push(
				// 		JSON.parse(
				// 			JSON.stringify({
				// 				quotaId: x.id,
				// 				quotaName: x.quotaName,
				// 			})
				// 		)
				//   );
				// })
				// state.selectListString = state.selectListString.slice(0, state.selectListString.length-1)
				nextTick(() => {
					state.parameterForm = { ...row };
				});
				// state.parameterForm.id = row.id
				// state.parameterForm.quotaCategoryId = row.quotaCategoryId
				// state.parameterForm.quotaDataDimensionId = row.quotaDataDimensionId
				// state.parameterForm.quotaName = row.quotaName
				// state.parameterForm.description = row.description
				// state.parameterForm.resultUnitId = row.resultUnitId
				// state.parameterForm.quotaTypeId = row.quotaTypeId
			} else {
				state.addType = 1;
				state.dialogTitle = '新增参数';
				state.dialogVisible = true;
			}
		};

		const getDictionaryList = async () => {
			let params = ['sys_type', 'sys_data', 'sys_unit'];
			let res = await getDictionary(params);
			if (res.status == 0) {
				state.dictionaryList = res.data;
			}
		};

		const openIndicatorList = () => {
			proxy.$refs.zhibiaoRef.open();
			state.parameterForm.paramWithQuotaList = [];
			state.selectListString = '';
		};
		const handleComplete = (result: any) => {
			state.zhibiaoFlag = false;
			result.forEach((x) => {
				state.selectListString += x.quotaName + ',';
				state.parameterForm.paramWithQuotaList.push(
					JSON.parse(
						JSON.stringify({
							quotaId: x.id,
							quotaName: x.quotaName,
						})
					)
				);
			});
			state.selectListString = state.selectListString.slice(0, state.selectListString.length - 1);
		};
		onMounted(() => {
			getDictionaryList();
			getList();
		});

		return {
			...toRefs(state),
			getList,
			addorEditParameter,
			handleSizeChange,
			handleCurrentChange,
			handleCancle,
			handleCommit,
			onSubmit,
			bandReset,
			parameterRef,
			handleDelete,
			openIndicatorList,
			handleComplete,
		};
	},
});
</script>
<style lang="scss" scoped>
.query_box {
	padding-left: 40px !important;
}
</style>
