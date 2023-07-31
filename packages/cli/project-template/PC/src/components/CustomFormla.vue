<template>
	<!---自定义对象公式配置-->
	<div class="quta">
		<el-form :v-loading="loading" ref="customRef" :model="customForm" :rules="customRules">
			<el-table :data="tableList" stripe border style="width: 100%">
				<template #empty><SysEmpty></SysEmpty></template>
				<el-table-column label="适用对象" align="center" width="150">
					<template #default="scope">
						<el-form-item v-if="scope.row.isUpdate" prop="suitableCode" label-width="">
							<el-select v-model="customForm.suitableCode" clearable placeholder="请选择">
								<el-option
									v-for="(item, index) in dictionaryList['sys_applicable'].filter((x) => x.dictItemCode !== 'sys_applicable_all')"
									:key="index"
									:label="item.dictItem"
									:value="item.dictItemCode"
								/>
							</el-select>
						</el-form-item>
						<span v-else>{{
							scope.row.suitableCode && scope.row.suitableCode !== ''
								? dictionaryList['sys_applicable'].find((x) => x.dictItemCode == scope.row.suitableCode).dictItem
								: ''
						}}</span>
					</template>
				</el-table-column>
				<el-table-column label="评分规则" align="center">
					<template #default="scope">
						<el-form-item v-if="scope.row.isUpdate" prop="scoringRuleDesc" label-width="0px">
							<el-input
								rows="2"
								placeholder="请输入评分规则"
								v-model="customForm.scoringRuleDesc"
								type="textarea"
								maxlength="200"
								show-word-limit
							></el-input>
						</el-form-item>
						<span v-else>{{ scope.row.scoringRuleDesc }}</span>
					</template>
				</el-table-column>
				<el-table-column label="公式" show-overflow-tooltip width="200" align="center">
					<template #default="scope">
						<el-form-item v-show="scope.row.isUpdate" prop="calculationFormula" label-width="0px">
							<formula
								:quotaDataDimensionId="quotaDataDimensionId"
								@complete="handleFormulaComplete"
								v-model:modeValue="customForm.calculationFormula"
								:zhibiao-list="customForm.calculationFormulItem"
								:jobType="2"
								:parameType="2"
							></formula>
						</el-form-item>
						<span v-show="!scope.row.isUpdate">{{ scope.row.calculationFormula }}</span>
						<!-- <el-button v-if="scope.row.isUpdate" type="text">计算公式</el-button>
						<span v-else>计算公式</span> -->
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="100">
					<template #default="scope">
						<el-button v-if="!scope.row.isUpdate" type="text" :disabled="updateLoading" @click="handleUpdate(scope.row)">修改</el-button>
						<el-popconfirm
							v-if="!scope.row.isUpdate"
							width="220"
							confirm-button-text="是"
							cancel-button-text="否"
							:icon="InfoFilled"
							icon-color="#626AEF"
							@confirm="handleDelete(scope.row)"
							title="确认要删除吗"
						>
							<template #reference>
								<el-button :disabled="updateLoading" type="text">删除</el-button>
							</template>
						</el-popconfirm>

						<el-button v-if="scope.row.isUpdate" type="text" @click="handleSave(scope.row)">保存</el-button>

						<el-popconfirm
							v-if="scope.row.isUpdate"
							width="220"
							confirm-button-text="是"
							cancel-button-text="否"
							:icon="InfoFilled"
							icon-color="#626AEF"
							@confirm="handleCancle(scope.row)"
							title="是否取消编辑？"
						>
							<template #reference>
								<el-button v-if="scope.row.isUpdate" type="text">取消</el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
		</el-form>
		<el-button style="margin-top: 10px" :disabled="updateLoading" @click="handleAdd()"  plain>
			<SvgIcon :name="'elementPlus'"></SvgIcon> 新增</el-button
		>
	</div>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted, getCurrentInstance, watchEffect, toRaw } from 'vue';
import { ElMessage } from 'element-plus';
import { formulaAdd, formulaList, formulaDelete, formulaUpdate } from '/@/api/formula/index.ts';
import { useDictionary } from '/@/hooks/web/useDictionary';
import lodash from 'lodash';

export default defineComponent({
	name: 'CustomFormla',
	props: {
		tableList: {
			type: Array,
			default: [], // quarter=季度; halfYear=半年
		},
		dictionaryList: {
			type: Array,
			default: [], // quarter=季度; halfYear=半年
		},
		quotaDataDimensionId: {
			type: String,
			default: '', // 数据维度
		},
	},
	setup(props, { emit }) {
		const { proxy } = getCurrentInstance() as any;

		const state = reactive({
			loading: false,
			flag: false,
			tableList: [],
			dictionaryList: {},
			quotaDataDimensionId: '',
			updateLoading: false,
			quotaId: 0,
			name: '', // 指标名称
			customForm: {
				calculationFormula: '',
				calculationFormulaEcho: '[]',
				calculationFormulaItem: '',
				idd: -1,
				quotaId: '',
				scoringRuleDesc: '',
				suitableCode: '', // 适用对象
			},
			customRules: {
				suitableCode: [{ required: true, message: '请选择适用对象', trigger: ['change'] }],
				scoringRuleDesc: [{ required: true, message: '请输入评分规则', trigger: ['blur'] }],
				calculationFormula: [{ required: true, message: '请输入公式', trigger: ['change'] }],
			},
		});

		const bindData = (row) => {
			proxy.$refs.customRef.resetFields();
			state.customForm = lodash.cloneDeep(row);
			proxy.$refs.customRef.clearValidate();
		};

		// // 查询列表
		// const getList = async () => {
		// 	state.loading = true;
		// 	let params = {
		// 		quotaId: state.quotaId,
		// 	};
		// 	let res = await formulaList(params);
		// 	state.loading = false;
		// 	state.tableList = res.data;
		// };

		const handleAdd = () => {
			if (state.tableList.length > 5) {
				ElMessage.error('最大职能添加5条！');
				return false;
			}
			if (state.tableList.some((x) => x.isUpdate)) {
				ElMessage.error('请先完成其他数据的保存！');
				return false;
			}
			state.updateLoading = true;
			state.tableList.push({
				calculationFormula: '',
				calculationFormulaEcho: '[]',
				calculationFormulaItem: '',
				idd: -1,
				quotaId: 156,
				scoringRuleDesc: '',
				suitableCode: '', // 适用对象
				isUpdate: true,
			});
			bindData(state.tableList[state.tableList.length - 1]);
		};

		const handleUpdate = (row) => {
			row.isUpdate = true;
			state.updateLoading = true;
			bindData(row);
		};

		const handleSave = (row) => {
			proxy.$refs.customRef.validate(async (valid: boolean) => {
				if (!valid) return false;
				state.loading = true;
				let params = toRaw(state.customForm);

				if (!(state.customForm.idd && state.customForm.idd > 0)) {
					delete params.idd;
				}

				//区分修改
				let isUpdate = row.suitableCode !== '';
				if (
					state.tableList.some(
						(x) =>
							(isUpdate && x.suitableCode == params.suitableCode && row.suitableCode != params.suitableCode) ||
							(!isUpdate && x.suitableCode == params.suitableCode)
					)
				) {
					ElMessage.error('该适应对象已存在！');
					return false;
				}

				// state.customForm.quotaId = state.quotaId;
				state.updateLoading = false;
				row.isUpdate = false;
				row.idd = state.tableList.length + 1;
				row.calculationFormula = params.calculationFormula;
				row.calculationFormulaItem = params.calculationFormulaItem;
				row.scoringRuleDesc = params.scoringRuleDesc;
				row.suitableCode = params.suitableCode;
				//const res = await (state.customForm.idd && state.customForm.idd > 0 ? formulaUpdate(params) : formulaAdd(params));
				state.loading = false;
				// if (res.status == 0) {
				// 	state.updateLoading = false;
				// 	row.isUpdate = false;
				// 	getList();
				// } else {
				// 	ElMessage.error(res.message);
				// }
			});
		};

		const handleCancle = (row) => {
			if (row.idd == -1) {
				state.tableList.pop();
			}
			state.updateLoading = false;
			row.isUpdate = false;
		};

		const handleClose = () => {
			state.flag = false;
		};

		const handleDelete = async (row) => {
			state.loading = true;
			state.tableList = state.tableList.filter((x) => x.suitableCode != row.suitableCode);
			// const res = await formulaDelete({ idd: row.idd });
			state.loading = false;
			// if (res.status == 0) {
			// 	getList();
			// } else {
			// 	ElMessage.error(res.message);
			// }
		};

		// 公式完成
		const handleFormulaComplete = (item) => {
			state.customForm.calculationFormula = item.result;
			state.customForm.calculationFormulaItem = JSON.stringify(item.list);
		};

		const init = (idd, name) => {
			state.updateLoading = false;
			// getList();
		};

		const getResult = () => {
			if (state.updateLoading) {
				ElMessage.error('请先处理完成自定义对象配置！');
				return false;
			}
			return state.tableList;
		};

		watchEffect(() => {
			state.tableList = props.tableList;
			state.dictionaryList = props.dictionaryList;
			state.quotaDataDimensionId = props.quotaDataDimensionId;
		});

		onMounted(() => {});

		return {
			...toRefs(state),
			handleClose,
			bindData,
			handleAdd,
			handleCancle,
			handleUpdate,
			handleSave,
			handleFormulaComplete,
			handleDelete,
			init,
			getResult,
		};
	},
});
</script>
<style>

</style>
<style>
.quta .el-table th.el-table__cell {
	padding: 3px 0 !important;
	background-color: #fff !important;
}

</style>
