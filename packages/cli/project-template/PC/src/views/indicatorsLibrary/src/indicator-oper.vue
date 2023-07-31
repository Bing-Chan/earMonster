<template>
	<div>
		<div class="query_box">
			<el-form :inline="true" label-position="left" :model="queryForm" ref="queryRef">
				<el-form-item label="指标名称/代码" prop="quotaName">
					<el-input v-model.trim="queryForm.quotaName" clearable placeholder="请输入指标名称/代码"></el-input>
				</el-form-item>
				<!-- <el-form-item label="指标分类" prop="quotaCategoryId">
					<el-select v-model="queryForm.quotaCategoryId" clearable placeholder="请选择">
						<el-option v-for="(item, index) in dictionaryList['sys_type']" :key="index" :value="item.dictItemCode" :label="item.dictItem"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="指标类型" prop="quotaTypeId">
					<el-select v-model="queryForm.quotaTypeId" clearable placeholder="请选择">
						<el-option label="定性" :value="1"></el-option>
						<el-option label="定量" :value="2"></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item label="适用工序岗位" prop="usePosition">
					<el-select v-model="queryForm.usePosition" clearable placeholder="请选择">
						<el-option v-for="(item, index) in usePositionList" :key="index" :label="`${item.name}`" :value="item.name" />
					</el-select>
				</el-form-item>
				<el-form-item label="指标数据维度" prop="quotaDataDimensionId">
					<el-select v-model="queryForm.quotaDataDimensionId" clearable placeholder="请选择">
						<el-option v-for="(item, index) in dictionaryList['sys_data']" :key="index" :value="item.dictItemCode" :label="item.dictItem"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="状态" prop="quotaState">
					<el-select v-model="queryForm.quotaState" clearable placeholder="请选择">
						<el-option label="启用" :value="1"></el-option>
						<el-option label="禁用" :value="0"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
					<el-button type="default" @click="bandReset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="content_list" v-loading="loading">
			<div>
				<el-button type="primary" @click="addorEditIndicator()">新 增</el-button>
				<el-button type="default" @click="turnOn(true)">启 用</el-button>
				<el-button type="default" @click="turnOn(false)">禁 用</el-button>
				<!-- <el-button type="default" @click="importIndicator">导 入</el-button>
				<el-button type="default" @click="exportIndicator" :loading="exportLoading">导 出</el-button> -->
			</div>
			<div class="table_list">
				<el-table :data="tableData" stripe @selection-change="handleSelectionChange" border style="width: 100%">
					<template #empty><SysEmpty></SysEmpty></template>
					<el-table-column type="selection" align="center" width="55"> </el-table-column>
					<el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
					<el-table-column prop="quotaCode" label="指标代码" width="150" align="center"></el-table-column>
					<el-table-column prop="quotaName" label="指标名称" min-width="150" align="center"></el-table-column>
					<el-table-column prop="usePositionValues" show-overflow-tooltip label="适用工序岗位" min-width="120" align="center">
						<template #default="scope">
							{{ scope.row.usePositionValues != null ? scope.row.usePositionValues.toString().replaceAll(',', '、') : '' }}
						</template>
					</el-table-column>
					<el-table-column prop="shiftFlag" label="班次属性" width="100" align="center">
						<template #default="scope">
							{{ scope.row.shiftFlag ? '有' : '无' }}
						</template>
					</el-table-column>
					<el-table-column prop="description" label="指标描述" align="center" show-overflow-tooltip min-width="150"></el-table-column>
					<!-- <el-table-column prop="resultUnitValue" min-width="80" label="数值单位" align="center">
            <template #default="scope">
							{{ scope.row.resultUnitValue  ?  scope.row.resultUnitValue : '-' }}
						</template>
          </el-table-column> -->
					<!-- <el-table-column prop="quotaCategoryValue" min-width="80" label="指标分类" align="center"></el-table-column>
					<el-table-column prop="name" label="指标类型" width="100" align="center">
						<template #default="scope">
							{{ scope.row.quotaTypeId == 1 ? '定性' : '定量' }}
						</template>
					</el-table-column> -->
					<el-table-column prop="quotaDataDimensionValue" label="指标数据维度" align="center" width="120"></el-table-column>
					<el-table-column label="得分来源" align="center" width="120">
						<template #default="scope">
							<span> {{ scope.row.scoreValueSource == 1 ? '人工评分' : '系统计算' }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="quotaState" label="状态" width="80" align="center">
						<template #default="scope">
							{{ scope.row.quotaState == 1 ? '启用' : '禁用' }}
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

					<el-table-column label="操作" align="center" fixed="right" width="150">
						<template #default="scope">
							<el-button type="text" @click="addorEditIndicator(scope.row, 2)">公式</el-button>
							<el-button type="text" @click="addorEditIndicator(scope.row)">修改</el-button>
							<el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
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
		<el-dialog
			custom-class="step-dialog"
			:close-on-click-modal="false"
			:title="dialogTitle"
			v-model="dialogVisible"
			width="800px"
			@close="handleCancle"
		>
			<div style="background: #edf2ff">
				<div style="width: 65%">
					<el-steps align-center="false" process-status="process" v-show="dialogTitle !== '指标公式'" :active="stepActiveIndex" simple>
						<el-step title="基本信息填写">
							<template #icon> <span class="tag-number">1</span></template>
						</el-step>
						<el-step title="配置公式">
							<template #icon><span class="tag-number">2</span></template>
						</el-step>
					</el-steps>
				</div>
			</div>
			<div class="step-content" v-if="stepActiveIndex == 1">
				<div class="alert-title" v-if="dialogTitle == '修改指标'">
					<el-alert title="使用中的指标部分内容不可修改，如有需求请新增指标。  例如：服务质量V2" type="warning" :closable="false" show-icon />
				</div>
				<el-form label-position="right" label-width="125px" ref="indicatorRef" :model="indicatorForm" :rules="formRules">
					<el-form-item label="指标名称" prop="quotaName" required>
						<el-input
							:disabled="indicatorForm.modifyFlag == 'no' || indicatorForm.formulaModifyFlag"
							v-model="indicatorForm.quotaName"
							clearable
							placeholder="请输入"
						></el-input>
					</el-form-item>
					<el-form-item label="指标描述" prop="description">
						<el-input
							:disabled="indicatorForm.modifyFlag == 'no'"
							v-model="indicatorForm.description"
							type="textarea"
							maxlength="200"
							show-word-limit
						></el-input>
					</el-form-item>
					<!-- <el-form-item prop="baseTargetState" required>
					<template #label>
						<span
							>是否有目标值
							<el-tooltip placement="top">
								<template #content> 是:指标有基础值、目标值、实际值<br />否:只有实际值 </template> -->
					<!-- <el-button type="text">Top center</el-button> -->
					<!-- <el-icon><InfoFilled />??</el-icon> -->
					<!-- <SvgIcon :name="'elementInfoFilled'"></SvgIcon>
							</el-tooltip>
						</span>
					</template> -->
					<!-- <el-radio-group v-model="indicatorForm.baseTargetState" :disabled="indicatorForm.columnModifyFlag == 'no'">
						<el-radio :label="1">是</el-radio>
						<el-radio :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item> -->
					<!-- <el-form-item label="指标分类" prop="quotaCategoryId" required>
					<el-select v-model="indicatorForm.quotaCategoryId" clearable placeholder="请选择">
						<el-option v-for="(item, index) in dictionaryList['sys_type']" :key="index" :value="item.dictItemCode" :label="item.dictItem"></el-option>
					</el-select>
				</el-form-item> -->
					<el-form-item label="适用工序岗位" prop="usePositions">
						<el-select
							multiple
							:disabled="indicatorForm.modifyFlag == 'no'"
							style="width: 100%"
							v-model="indicatorForm.usePositions"
							clearable
							placeholder="请选择（支持多选）"
						>
							<el-option v-for="(item, index) in usePositionList" :key="index" :label="`${item.name}`" :value="item.name" />
						</el-select>
					</el-form-item>
					<el-form-item label="有无班次属性" prop="shiftFlag">
						<el-radio-group v-model="indicatorForm.shiftFlag" :disabled="indicatorForm.modifyFlag === 'no' && indicatorForm.formulaModifyFlag">
							<el-radio :label="true">有</el-radio>
							<el-radio :label="false">无</el-radio>
						</el-radio-group>
					</el-form-item>

					<el-form-item label="指标数据维度" prop="quotaDataDimensionId" required>
						<el-select
							style="width: 100%"
							v-model="indicatorForm.quotaDataDimensionId"
							clearable
							placeholder="请选择"
							:disabled="indicatorForm.modifyFlag === 'no' || indicatorForm.formulaModifyFlag"
						>
							<el-option
								v-for="(item, index) in dictionaryList['sys_data']"
								:key="index"
								:value="item.dictItemCode"
								:label="item.dictItem"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="数值单位" prop="resultUnitId">
						<el-select
							style="width: 100%"
							:disabled="indicatorForm.modifyFlag == 'no'"
							v-model="indicatorForm.resultUnitId"
							clearable
							placeholder="请选择"
						>
							<el-option
								v-for="(item, index) in dictionaryList['sys_unit']"
								:key="index"
								:value="item.dictItemCode"
								:label="item.dictItem"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="指标类型" prop="quotaTypeId" required>
						<el-radio-group v-model="indicatorForm.quotaTypeId" :disabled="indicatorForm.modifyFlag == 'no' || indicatorForm.formulaModifyFlag">
							<el-radio :label="1">定性</el-radio>
							<el-radio :label="2">定量</el-radio>
						</el-radio-group>
					</el-form-item>
					<div style="text-align: center">
						<el-button type="default" @click="handleCancle">关 闭</el-button>
						<el-button type="primary" :loading="commitLoading" @click="handleSave">保 存</el-button>
					</div>
				</el-form>
			</div>
			<div class="step-content" v-if="stepActiveIndex == 2">
				<el-form label-position="right" label-width="125px" ref="indicatorRef1" :model="indicatorForm" :rules="formRules">
					<el-form-item prop="scoreValueSource" required>
						<template #label>
							<span>
								<el-tooltip placement="top" show-after="200">
									<template #content>
										人工评分 ：需要走流程进行评分。例：上级评价<br />
										系统计算：需要引入指标（基础值、目标值、实际值）进行计算。例：服务质量
									</template>
									<!-- <el-button type="text">Top center</el-button> -->
									<!-- <el-icon><InfoFilled />??</el-icon> -->
									<SvgIcon :name="'elementInfoFilled'" class="orange"></SvgIcon>
								</el-tooltip>
								得分来源
							</span>
						</template>
						<el-radio-group @change="handleScore($event, handleSourceChang)" v-model="indicatorForm.scoreValueSource">
							<el-radio :label="1">人工评分</el-radio>
							<el-radio :label="2">系统计算</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="公式类型" prop="formulaType" required v-if="indicatorForm.scoreValueSource == 2">
						<el-radio-group v-model="indicatorForm.formulaType">
							<el-radio :label="1">通用公式</el-radio>
							<!-- <el-radio :label="2">自定义对象公式</el-radio> -->
						</el-radio-group>
					</el-form-item>
					<el-form-item
						:label="' '"
						prop="commonCalculationFormula"
						required
						v-if="indicatorForm.scoreValueSource == 2 && indicatorForm.formulaType == 1"
					>
						<formula
							:shiftFlag="indicatorForm.shiftFlag"
							:quotaDataDimensionId="indicatorForm.quotaDataDimensionId"
							@complete="handleCommonFormulaComplete"
							v-model:modeValue="indicatorForm.commonCalculationFormula"
							:zhibiao-list="indicatorForm.commonCalculationFormulaItem"
							:jobType="1"
							:parameType="2"
							ref="calculationFormulaRef"
						></formula>
					</el-form-item>
					<el-form-item label="评分规则" prop="scoringRuleDesc" v-if="indicatorForm.formulaType == 1">
						<el-input v-model="indicatorForm.scoringRuleDesc" type="textarea" maxlength="200" show-word-limit></el-input>
					</el-form-item>

					<el-form-item prop="actualValueSource" required v-if="indicatorForm.scoreValueSource == 2">
						<template #label>
							<span>
								<el-tooltip placement="top" show-after="200">
									<template #content>
										人工 ：由人工批量导入指标结果。例：阶段性重点工作，是个分数，由人工批量导入指标结果。<br />
										系统：<br />
										不写公式：系统直接对接。例：服务质量，可直接从系统取到数据对接到指标结果。<br />
										写公式：需引入参数系统计算。例：操作工的卸车岗绩效。<br />
									</template>
									<!-- <el-button type="text">Top center</el-button> -->
									<!-- <el-icon><InfoFilled />??</el-icon> -->
									<SvgIcon :name="'elementInfoFilled'" class="orange"></SvgIcon>
								</el-tooltip>
								实际值来源
							</span>
						</template>
						<el-select v-model="indicatorForm.actualValueSource" style="width: 100%" clearable placeholder="请选择">
							<el-option label="人工" :value="1"></el-option>
							<el-option label="系统" :value="2"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="" prop="calculationFormula" v-if="indicatorForm.scoreValueSource == 2 && indicatorForm.actualValueSource == 2">
						<formula
							:shiftCheckFlag="true"
							:shiftFlag="indicatorForm.shiftFlag"
							:quotaDataDimensionId="indicatorForm.quotaDataDimensionId"
							@complete="handleFormulaComplete"
							v-model:modeValue="indicatorForm.calculationFormula"
							:zhibiao-list="indicatorForm.calculationFormulaItem"
							:jobType="1"
							:parameType="1"
							ref="calculationFormulaRef"
						></formula>
					</el-form-item>

					<div style="text-align: center">
						<el-button type="default" @click="handleStep2Cancle">关 闭</el-button>
						<!-- <el-button type="default" @click="handleUp">上一步</el-button> -->
						<el-button type="primary" :loading="commitLoading" @click="handleSave">完 成</el-button>
					</div>
				</el-form>
			</div>
		</el-dialog>
		<el-dialog :close-on-click-modal="false" title="导入" center v-model="importDialog" width="600px" @close="handleCloseImport">
			<div class="dialog-content">
				<el-button type="text" @click="exportTemplate">下载模板</el-button>
				<el-upload
					class="upload"
					accept="application/vnd.ms-excel"
					:show-file-list="false"
					:before-upload="beforeUpload"
					action="#"
					:multiple="false"
					:http-request="toUpload"
				>
					<el-input placeholder="请选择要导入的文件" v-model="fileName"></el-input>
				</el-upload>
				<el-result :icon="importResultIcon" v-show="importIfSuccess">
					<template #title>
						<span> {{ importResult.title }}</span>
					</template>
					<template #subTitle class="subTitle">
						<span>
							<span>
								导入成功
								<span class="greens">{{ successNums }}</span
								>条
							</span>
							<span>
								,导入失败
								<span class="reds">{{ failNums }}</span
								>条。
							</span>
						</span>
						<span>{{ importResult.message }}</span>
						<a v-if="failNums > 0" @click="downloadXls" class="link" href="#">下载失败文件</a>
					</template>
				</el-result>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="handleCloseImport" type="primary">关 闭</el-button>
					<!-- <el-button type="primary" @click="handleSubmit" > 确 定</el-button> -->
				</span>
			</template>
		</el-dialog>
		<quotaFormla ref="quotaFormlaRef"></quotaFormla>
	</div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, toRefs, onMounted, nextTick, ref, watch } from 'vue';
import {
	getIndicatorsList,
	addQuotalibrary,
	editQutotalLibrary,
	quotaLibraryOn,
	exportList,
	uploadFile,
	exportDemo,
	exportFail,
	deleteQuotalibrary,
	quotalibraryInfo,
} from '/@/api/indicatorsLibrary/index.ts';
import { getDictionary } from '/@/api/baseConfig/index.ts';
import { ElMessage, ElMessageBox } from 'element-plus';
import { downloadFile } from '../../../utils/download';
import { usePages } from '/@/hooks/event/useIndicatorsLibrary';
import dayjs from 'dayjs';
import quotaFormla from './formla.vue';
import { usePosition } from '/@/hooks/web/usePosition';

export default defineComponent({
	name: '',
	components: {
		quotaFormla,
	},
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const indicatorRef = ref();
		const state = reactive({
			tableData: [],
			stepActiveIndex: 1,
			pageNo: 1,
			limit: 20,
			total: 0,
			queryForm: {
				quotaState: '',
				quotaName: '',
				quotaCategoryId: '',
				quotaTypeId: '',
				quotaDataDimensionId: '',
				jobType: 1,
				usePosition: '',
			},
			selection: [],
			dialogVisible: false,
			dialogTitle: '新增指标',
			indicatorForm: {
				description: '',
				quotaName: '',

				quotaCategoryId: '',
				quotaDataDimensionId: '',
				resultUnitId: '',
				quotaTypeId: 2,
				baseTargetState: 0,
				columnModifyFlag: '', // 指标结果被引用后是否能修改 (废弃）
				formulaModifyFlag: false, //指标结果被引用后或者被公式引用是否能修改
				modifyFlag: '', // 模板被引用后是否能修改
				jobType: 1,
				shiftFlag: true, // 0、有、1、无
				formulaType: 1, //1-通用公式，2-自定义对象公式
				scoreValueSource: 2, //1、人工;2、系统
				actualValueSource: 2, //1、人工;2、系统
				commonCalculationFormula: '',
				commonCalculationFormulaItem: '',
				calculationFormulaItem: '[]',
				calculationFormula: '',
				scoringRuleDesc: '',
				usePositions: [],
			},
			typeList: [
				{
					code: 'ywL',
					name: '业务量',
				},
				{
					code: 'cb',
					name: '成本',
				},
				{
					code: 'zl',
					name: '质量',
				},
			],
			formRules: {
				quotaName: [{ required: true, message: '请输入指标名称', trigger: ['blur', 'change'] }],
				shiftFlag: [{ required: true, message: '请选择有无班次属性', trigger: ['change'] }],
				usePositions: [{ required: true, message: '请选择工序岗位', trigger: ['change'] }],
				quotaCategoryId: [{ required: true, message: '请选择指标分类', trigger: ['blur', 'change'] }],
				quotaDataDimensionId: [{ required: true, message: '请选择指标数据维度', trigger: ['blur', 'change'] }],
				quotaTypeId: [{ required: true, message: '请选择指标类型', trigger: ['blur', 'change'] }],

				// shiftFlag: [{ required: true, message: '请选择指标类型', trigger: ['blur', 'change'] }],
				formulaType: [{ required: true, message: '请选择公式类型', trigger: ['blur', 'change'] }],
				scoreValueSource: [{ required: true, message: '请选择得分来源', trigger: ['blur', 'change'] }],
				actualValueSource: [{ required: true, message: '请选择实际值来源', trigger: ['blur', 'change'] }],
				commonCalculationFormula: [{ required: true, message: '请输入通用公式', trigger: ['blur', 'change'] }],
			},
			addType: 1,
			dictionaryList: [],
			exportLoading: false,
			importDialog: false,
			successNums: 0,
			failNums: 0,
			importTotal: 0,
			importResult: {
				title: '导入成功',
				message: '',
				success: true,
			},
			importResultIcon: 'success',
			failKey: '',
			importIfSuccess: false,
			commitLoading: false,
			fileName: '',
			loading: false,
		});

		const getList = async () => {
			let params = { pageNo: state.pageNo, limit: state.limit };
			let res = await getIndicatorsList({ ...params, ...state.queryForm });
			if (res.status == 0) {
				state.tableData = res.data.resultData;
				state.total = res.data.total;
			} else {
				console.log(res.message);
			}
		};
		const { usePositionList } = usePosition();
		const usePageRefs = usePages(state);
		const handleSizeChange = (val: number) => {
			state.limit = val;
			getList();
		};
		const handleCurrentChange = (val: number) => {
			state.pageNo = val;
			getList();
		};

		const getDictionaryList = async () => {
			let params = ['sys_type', 'sys_data', 'sys_unit', 'sys_process_position'];
			let res = await getDictionary(params);
			if (res.status == 0) {
				state.dictionaryList = res.data;
			}
		};

		const onSubmit = () => {
			state.pageNo = 1;
			getList();
		};

		const bandReset = () => {
			proxy.$refs.queryRef.resetFields();
		};
		const handleCloseImport = () => {
			state.importDialog = false;
			state.importIfSuccess = false;
			state.fileName = '';
		};

		const handleSubmit = () => {
			state.importDialog = false;
			state.importIfSuccess = false;
			state.fileName = '';
			getList();
		};

		const addorEditIndicator = async (row: any, stepIndex: any) => {
			state.indicatorForm.calculationFormulaItem = '[]';
			state.indicatorForm.calculationFormula = '';
			state.stepActiveIndex = stepIndex ? stepIndex : 1;
			if (row) {
				state.addType = 2;
				state.dialogTitle = '修改指标';
				state.dialogVisible = true;
				const res = await quotalibraryInfo({ id: row.id });
				state.loading = false;
				if (res.status == 0) {
					nextTick(() => {
						usePageRefs.reset();
						for (var key in res.data) {
							if (res.data[key] != null) {
								state.indicatorForm[key] = res.data[key];
							}
						}
						state.indicatorForm.usePositions = res.data.usePositionValues;
					});
				} else {
					ElMessage.error(res.message);
					return false;
				}

				// state.indicatorForm.id = row.id
				// state.indicatorForm.quotaCategoryId = row.quotaCategoryId
				// state.indicatorForm.quotaDataDimensionId = row.quotaDataDimensionId
				// state.indicatorForm.quotaName = row.quotaName
				// state.indicatorForm.description = row.description
				// state.indicatorForm.resultUnitId = row.resultUnitId
				// state.indicatorForm.quotaTypeId = row.quotaTypeId
			} else {
				state.addType = 1;
				state.dialogTitle = '新增指标';
				state.dialogVisible = true;
				nextTick(() => {
					usePageRefs.reset();
				});
			}
			if (state.stepActiveIndex == 2) {
				state.dialogTitle = '指标公式';
			}
			if (proxy.$refs.calculationFormulaRef) {
				proxy.$refs.calculationFormulaRef.reset();
			}
		};

		const handleCancle = () => {
			state.dialogVisible = false;
			state.indicatorForm.formulaModifyFlag = false;
			state.indicatorForm.modifyFlag = '';
			usePageRefs.reset();
			getList();
		};

		const handleDelete = (row: any) => {
			ElMessageBox.confirm('确认要删除吗？', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(async () => {
					state.loading = true;
					const res = await deleteQuotalibrary({
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

		const handleSelectionChange = (val: any) => {
			state.selection = val;
		};

		const turnOn = async (val: boolean) => {
			let params = {
				on: val,
				ids: state.selection.map((item) => {
					// console.log(item)
					return item.id;
				}),
			};
			let warn = val ? '启用' : '禁用';
			if (params.ids.length == 0) {
				ElMessage.warning('请选择要' + warn + '的数据');
				return false;
			} else {
				let res = await quotaLibraryOn(params);
				if (res.status == 0) {
					ElMessage.success(val ? '启用成功' : '禁用成功');
					getList();
				} else {
					ElMessage.error(res.message);
				}
			}
		};

		const exportIndicator = async () => {
			state.exportLoading = true;
			let params = { pageNo: state.pageNo, limit: state.limit };
			let res = await exportList({ ...params, ...state.queryForm });
			let fileName = '指标库信息表' + dayjs(new Date()).format('YYYY-MM-DD') + '.xls';
			downloadFile(res, fileName);
			state.exportLoading = false;
		};

		const importIndicator = () => {
			state.importDialog = true;
		};
		const beforeUpload = (file: any) => {
			const isType = file.type == 'application/vnd.ms-excel';
			const isSize = file.size / 1024 / 1024 < 20;
			if (!isType) {
				ElMessage.warning(`文件类型不符合格式!`);
			}
			if (!isSize) {
				ElMessage.warning(`文件大小应小于20MB!`);
			}
			return isSize && isType;
		};

		const toUpload = async (param: any) => {
			let file = param.file;
			let formData = new FormData();
			formData.append('file', file);
			state.fileName = file.name;
			formData.append('fileName', file.name);
			let res = await uploadFile(formData);
			if (res.status == 0) {
				state.importIfSuccess = true;
				state.successNums = res.data.successNum;
				state.failNums = res.data.failNum;
				state.importTotal = res.data.importTotal;
				if (state.successNums <= 0 && state.failNums >= 0) {
					state.importResultIcon = 'error';
					state.importResult.title = '导入失败';
				} else {
					state.importResultIcon = 'success';
					state.importResult.title = '导入成功';
				}
				if (state.failNums > 0) {
					state.failKey = res.data.failKey;
				}
			} else {
				ElMessage.error(res.message);
			}
		};

		const exportTemplate = async () => {
			let res = await exportDemo();
			downloadFile(res, '模板.xls');
		};

		const downloadXls = async () => {
			console.log(state.failKey);
			let params = { failKey: state.failKey };
			console.log(params);
			let res = await exportFail(params);
			downloadFile(res, '导入失败记录.xls');
		};

		// 切换得分来源
		const handleSourceChang = () => {
			state.indicatorForm.scoringRuleDesc = '';
		};

		onMounted(() => {
			getDictionaryList();
			getList();
		});

		return {
			...toRefs(state),
			...usePageRefs,
			getList,
			addorEditIndicator,
			handleSizeChange,
			handleCurrentChange,
			handleCancle,
			onSubmit,
			bandReset,
			handleSelectionChange,
			turnOn,
			exportIndicator,
			importIndicator,
			beforeUpload,
			toUpload,
			exportTemplate,
			downloadXls,
			handleSubmit,
			handleCloseImport,
			indicatorRef,
			handleDelete,
			handleSourceChang,
			usePositionList,
		};
	},
});
</script>
<style lang="scss" scoped>
#pages {
	height: 100%;
	display: flex;
	flex-direction: column;
	.query_box {
		padding-left: 40px !important;
	}

	.step-content {
		padding: 20px 30px;
	}
}

.alert-title {
	margin-top: -15px;
	line-height: 26px;
	.el-alert {
		padding: 2px 10px;
	}
}
.tag-number {
	width: 16px;
	padding: 0 0;
	height: 16px;
	line-height: 16px;
	border-radius: 50%;
	border: solid 1px #c0c4cc;
	display: inline-block;
	text-align: center;
}

.is-finish .is-text {
	.tag-number {
		border: solid 1px #4c84ff !important;
	}
}

.formla-form {
	padding-left: 60px;
}
.formla-list {
	border: solid 1px #dcdfe6;
	background: #fafafa;
	padding: 20px 20px;
	text-align: center;
	padding-bottom: 10px;
}
.el-steps--simple {
	padding: 13px 20px;
	background: #edf2ff;
}
</style>
<style>
.alert-title .el-alert__title {
	font-size: 10px !important;
}
.step-dialog .el-dialog__body {
	padding-top: 0px !important;
	padding-left: 0px !important;
	padding-right: 0px !important;
}

.el-step__line-inner {
	border-style: none;
}
</style>
