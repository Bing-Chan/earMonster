<template>
	<div>
		<div class="query_box">
			<el-form :inline="true" label-position="left" :model="queryForm" ref="queryRef">
				<el-form-item label="单位名称" prop="unitName">
					<search
						@change="
							(item) => {
								queryForm.unitName = item.label;
							}
						"
						:control-type="SearchEnum.COMPANY"
						isLoadAll
						v-model="queryForm.unitName"
					></search>
					<!-- <el-input style="width: 100%" v-model.trim="queryForm.unitName" clearable placeholder="请输入单位名称"></el-input> -->
				</el-form-item>
				<el-form-item label="工序岗位" prop="usePosition">
					<el-select style="width: 100%" v-model="queryForm.usePosition" clearable placeholder="请选择">
						<el-option v-for="(item, index) in usePositionList" :key="index" :label="`${item.name}`" :value="item.name" />
					</el-select>
				</el-form-item>
				<el-form-item label="时间维度" prop="timeRangeType">
					<el-select style="width: 100%" @change="handleTimeChange('queryForm')" placeholder="请选择" v-model="queryForm.timeRangeType" clearable>
						<el-option
							v-for="(item, index) in useDictionaryList['sys_time']"
							:key="index"
							:value="item.dictItemCode"
							:label="item.dictItem"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="数据时间范围" prop="dateArr">
					<el-date-picker
						style="width: 100%"
						v-model="queryForm.dateArr"
						v-if="queryForm.timeRangeType == 'sys_time_day' || queryForm.timeRangeType == ''"
						type="daterange"
						value-format="YYYY-MM-DD"
						@change="handleDateChange"
						range-separator="——"
						start-placeholder="请选择开始时间"
						end-placeholder="请选择结束时间"
					></el-date-picker>

					<el-date-picker
						style="width: 100%"
						v-model="queryForm.dateArr"
						v-if="queryForm.timeRangeType == 'sys_time_month'"
						type="monthrange"
						value-format="YYYY-MM"
						range-separator="——"
						start-placeholder="请选择开始时间"
						end-placeholder="请选择结束时间"
					></el-date-picker>

					<el-date-picker
						style="width: 100%"
						v-else-if="queryForm.timeRangeType == 'sys_time_year'"
						v-model="queryForm.timeRangeStart"
						type="year"
						value-format="YYYY"
						placeholder="请选择"
					/>
					<quarter v-else-if="queryForm.timeRangeType == 'sys_time_quarter'" :control-type="'quarter'" v-model="queryForm.timeRangeStart"></quarter>
					<quarter v-else-if="queryForm.timeRangeType == 'sys_time_halfyear'" v-model="queryForm.timeRangeStart"></quarter>
				</el-form-item>
				<!-- <el-form-item label="数据维度" prop="paramDataDimensionType">
					<el-select style="width: 100%" v-model="queryForm.paramDataDimensionType" placeholder="请选择" clearable>
						<el-option
							v-for="(item, index) in useDictionaryList['sys_data']"
							:key="index"
							:value="item.dictItemCode"
							:label="item.dictItem"
						></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item label="考核对象" prop="dimensionCodeOrName">
					<el-input style="width: 100%" v-model.trim="queryForm.dimensionCodeOrName" clearable placeholder="请输入考核对象"></el-input>
				</el-form-item>
				<el-form-item label="参数名称" prop="paramName">
					<search
						@change="
							(item) => {
								queryForm.paramName = item.label;
							}
						"
						isLoadAll
						placeholder="请输入参数名称"
						:control-type="SearchEnum.PARAM"
						v-model="queryForm.paramName"
					></search>
				</el-form-item>
				<el-form-item label="班次属性" prop="shiftAttrCode">
					<el-select v-model="queryForm.shiftAttrCode" style="width: 100%" placeholder="请选择班次属性" clearable>
						<el-option v-for="(item, index) in useDictionaryList['sys_attribute']" :key="index" :label="item.dictItem" :value="item.dictItemCode" />
					</el-select>
				</el-form-item>
				<!-- <el-form-item label="参数属性" prop="dataSourceType">
					<el-select v-model="queryForm.dataSourceType" clearable placeholder="请选择">
						<el-option label="系统对接" :value="1"></el-option>
						<el-option label="人工维护" :value="2"></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
					<el-button type="default" @click="bandReset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="content_list">
			<div class="content_title" ref="contentTitle">
				<div>
					<!-- <el-button type="primary" @click="addOrEdit()">新增</el-button> -->
					<!-- <el-button type="default" @click="handleImport">导入</el-button>
					<el-button type="default" @click="handleExport()">导出</el-button> -->
				</div>
			</div>
			<div class="table_list table_fixed">
				<el-table :data="tableData" stripe @selection-change="handleSelectionChange" border style="width: 100%">
					<template #empty><SysEmpty></SysEmpty></template>

					<el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
					<el-table-column prop="unitName" min-width="250" label="单位名称" align="center">
						<template #default="scope">{{ scope.row.unitCode + ' ' + scope.row.unitName }} </template>
					</el-table-column>
					<el-table-column prop="usePosition" label="工序岗位" width="100" align="center"> </el-table-column>
					<el-table-column prop="annTitle" label="数据时间范围" width="120" align="center">
						<template #default="scope">{{ getTimeStr(scope.row) }} </template>
					</el-table-column>
					<el-table-column prop="shiftAttrName" label="班次属性" width="100" align="center">
						<template #default="scope">
							{{ scope.row.shiftAttrName ? scope.row.shiftAttrName : '-' }}
						</template>
					</el-table-column>
					<el-table-column prop="timeRangeTypeDesc" min-width="300" label="考核对象" align="center">
						<template #default="scope"
							>{{ scope.row.dimensionCode + ' ' + scope.row.dimensionName.replace(scope.row.dimensionCode, '').replace('-', '') }}
						</template>
					</el-table-column>
					<el-table-column prop="paramName" min-width="150" label="参数名称" align="center"></el-table-column>
					<el-table-column prop="realityValStr" label="参数实际值" width="120" align="center">
						<template #default="scope">
							<span class="td-number">{{ scope.row.realityValStr }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="resultUnitDesc" label="数值单位" width="90" align="center"></el-table-column>
					<el-table-column prop="dataSourceTypeDesc" label="参数属性" width="100" align="center"></el-table-column>
					<el-table-column prop="updateUser" label="更新人" width="100" align="center"></el-table-column>
					<el-table-column prop="updateTime" label="更新时间" width="160" align="center">
						<template #default="scope">{{ scope.row.updateTime }} </template>
					</el-table-column>
					<el-table-column label="操作" min-width="120" align="center">
						<template #default="scope">
							<el-button :disabled="(scope.row.updateUser || scope.row.createUser) == '系统对接'" type="text" @click="addOrEdit(scope.row)"
								>修改</el-button
							>
						</template>
					</el-table-column>
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
		<!--修改参数数据-->
		<el-dialog :close-on-click-modal="false" v-model="addFlag" :title="formTitle" center width="700px">
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form ref="formRef" :model="editForm" :rules="formRules" label-position="right" label-width="150px">
						<el-form-item label="参数名称" prop="paramName">
							<search @change="handleZhibiaoChange" :control-type="SearchEnum.PARAM" v-model="editForm.paramName"></search>
						</el-form-item>
						<el-form-item label="参数描述" prop="paramDesc">
							<el-input disabled type="textarea" v-model.trim="editForm.paramDesc" style="width: 100%" maxlength="100"></el-input>
						</el-form-item>
						<el-form-item label="班次属性" prop="shiftAttrCode" v-if="editForm.shiftFlag" required>
							<el-select v-model="editForm.shiftAttrCode" style="width: 100%" placeholder="请选择班次属性" :disabled="formTitle == '修改参数数据'">
								<el-option
									v-for="(item, index) in useDictionaryList['sys_attribute']"
									:key="index"
									:label="item.dictItem"
									:value="item.dictItemCode"
								/>
							</el-select>
						</el-form-item>
						<el-form-item label="数值单位" prop="resultUnitId">
							<el-select disabled v-model="editForm.resultUnitId" style="width: 100%" placeholder="请选择数值单位">
								<el-option v-for="(item, index) in useDictionaryList['sys_unit']" :key="index" :label="item.dictItem" :value="item.dictItemCode" />
							</el-select>
						</el-form-item>
						<el-form-item label="工序岗位" prop="usePosition" required>
							<el-select style="width: 100%" v-model="editForm.usePosition" clearable placeholder="请选择">
								<el-option v-for="(item, index) in editForm.usePositionList" :key="index" :label="item.usePosition" :value="item.usePosition" />
							</el-select>
						</el-form-item>
						<el-form-item v-if="editForm.baseTargetState" label="基础值" prop="baseVal">
							<el-input
								oninput="only_input_number(this)"
								@blur="editForm.baseVal = $event.target.value"
								v-model.trim="editForm.baseVal"
								placeholder="请输入"
								style="width: 100%"
								maxlength="100"
							></el-input>
						</el-form-item>
						<el-form-item v-if="editForm.baseTargetState" label="目标值" prop="targetVal">
							<el-input
								oninput="only_input_number(this)"
								@blur="editForm.targetVal = $event.target.value"
								v-model.trim="editForm.targetVal"
								placeholder="请输入"
								style="width: 100%"
								maxlength="100"
							></el-input>
						</el-form-item>
						<el-form-item label="实际值" prop="realityVal">
							<el-input
								oninput="only_input_number(this)"
								@blur="editForm.realityVal = $event.target.value"
								v-model.trim="editForm.realityVal"
								placeholder="请输入"
								style="width: 100%"
								maxlength="100"
							></el-input>
						</el-form-item>
						<el-form-item label="时间维度" prop="timeRangeType">
							<el-select
								v-model="editForm.timeRangeType"
								clearable
								@change="handleTimeChange('editForm')"
								style="width: 100%"
								placeholder="请选择时间维度"
							>
								<el-option v-for="(item, index) in useDictionaryList['sys_time']" :key="index" :label="item.dictItem" :value="item.dictItemCode" />
							</el-select>
						</el-form-item>
						<el-form-item v-if="editForm.timeRangeType !== 'sys_time_long_valid'" label="数据时间范围" prop="timeRangeStr">
							<el-date-picker
								style="width: 100%"
								v-if="editForm.timeRangeType == 'sys_time_day'"
								v-model="editForm.timeRangeStr"
								type="date"
								value-format="YYYY-MM-DD"
								placeholder="请选择"
							/>
							<el-date-picker
								style="width: 100%"
								v-else-if="editForm.timeRangeType == 'sys_time_month'"
								v-model="editForm.timeRangeStr"
								type="month"
								value-format="YYYY-MM"
								placeholder="请选择"
							/>
							<el-date-picker
								style="width: 100%"
								v-else-if="editForm.timeRangeType == 'sys_time_year'"
								v-model="editForm.timeRangeStr"
								type="year"
								value-format="YYYY"
								placeholder="请选择"
							/>
							<quarter
								v-if="editForm.timeRangeType == 'sys_time_quarter'"
								:control-type="'quarter'"
								v-model:modelValue="editForm.timeRangeStr"
							></quarter>
							<quarter v-else-if="editForm.timeRangeType == 'sys_time_halfyear'" v-model:modelValue="editForm.timeRangeStr"></quarter>
						</el-form-item>
						<el-form-item label="单位名称" prop="orgList">
							<org-tree
								:disabled="SearchEnum.PERSON == editForm.paramDataDimensionId"
								ref="orgRef"
								:orgDataList="editForm.orgList"
								@change="handleSelectedOrgTree"
								:hasFilter="false"
								:isCheck="false"
							></org-tree>
						</el-form-item>
						<el-form-item label="考核对象代码/名称" prop="dimensionName" v-if="editForm.paramDataDimensionId == SearchEnum.COMPANY">
							<el-input v-model="editForm.dimensionName" disabled placeholder="" style="width: 100%" maxlength="100"></el-input>
						</el-form-item>
						<el-form-item label="考核对象代码/名称" prop="dimensionName" v-if="editForm.paramDataDimensionId == SearchEnum.PERSON">
							<search
								ref="dataSearchRef"
								isDanwei
								:control-type="SearchEnum.PERSON"
								v-model="editForm.dimensionName"
								@change="handleWeiDuChange"
							></search>
						</el-form-item>
						<el-form-item label="考核对象代码/名称" prop="dimensionName" v-if="editForm.paramDataDimensionId == SearchEnum.DEPARTMENT">
							<el-select v-model="editForm.dimensionCode" @change="handlebumenChange">
								<el-option v-for="(item, index) in useDepartmentList" :key="index" :label="item.label" :value="item.value">{{
									item.label
								}}</el-option>
							</el-select>
						</el-form-item>
						<!-- <el-form-item label="备注" prop="remark">
							<el-input v-model="editForm.remark" placeholder="请输入备注" type="textarea" maxlength="200" show-word-limit></el-input>
						</el-form-item> -->
					</el-form>
				</el-col>
			</el-row>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="addFlag = false" size="small">取 消</el-button>
					<el-button type="primary" @click="handleSave" :loading="loading" size="small">保 存</el-button>
				</span>
			</template>
		</el-dialog>
		<import-file ref="importRef" @complete="handleComplete"></import-file>
	</div>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted, getCurrentInstance, nextTick, ref, toRaw } from 'vue';
import { paramResultAdd, paramResultList, paramResultUpdate, paramResultInfo, indicatorExport } from '/@/api/parameterResult/index.ts';
import { searchDept } from '/@/api/org/index.ts';
import dayjs from 'dayjs';
import orgTree from '/@/components/orgTree/index.vue';
import { ElMessage } from 'element-plus';
// import OrgTreeTransfer from '/@/components/OrgTreeTransfer.vue';
import Search from '/@/components/Search.vue';
import ImportFile from '/@/components/ImportFile.vue';
import { SearchEnum } from '/@/enums/Search.ts';
import { useDictionary } from '/@/hooks/web/useDictionary';
import { useDepartment } from '/@/hooks/web/useDepartment';
import { downloadFile } from '/@/utils/download';
import { searchQutotalLibrary } from '/@/api/indicatorsLibrary/index.ts';
import { usePosition } from '/@/hooks/web/usePosition';
import { useSystemTime } from '/@/hooks/web/useSystemTime';

export default defineComponent({
	name: 'caozuo',
	components: {
		orgTree,
		search: Search,
		importFile: ImportFile,
	},
	setup(props) {
		const { useDictionaryList } = useDictionary(['sys_data', 'sys_time', 'sys_unit', 'sys_time', 'sys_attribute']);
		const { proxy } = getCurrentInstance() as any;
		const { useDepartmentList, reloadList } = useDepartment();
		const loading = ref(false);
		const state = reactive({
			options: [],
			weiduOptions: [],
			currentPage: 1,
			limit: 20,
			total: 0,
			importFlag: false,
			exportLoading: false,
			queryForm: {
				dataSource: '',
				paramDataDimensionType: '',
				paramId: '',
				resultState: '',
				start: 0,
				timeRangeEnd: '',
				timeRangeStart: '',
				timeRangeType: 'sys_time_day',
				unitCode: '',
				unitName: '',
				dateArr: [], //[dayjs().add(-1, 'day').format('YYYY-MM-DD'), dayjs().add(-1, 'day').format('YYYY-MM-DD')],
				paramName: '',
				jobType: 1,
				dataSourceType: null,
				usePosition: '',
				dimensionCodeOrName: '',
				shiftAttrCode: '',
			},
			tableData: [],
			formTitle: '添加参数数据',
			selection: [],
			addFlag: false,
			editForm: {
				id: 0,
				paramId: 0,
				paramName: '',
				paramDesc: '', //参数描述
				baseVal: '',
				targetVal: '',
				realityVal: '',
				timeRangeType: 'sys_time_day', //时间维度
				timeRangeStr: '',
				dimensionCode: '', // 数据维度代码
				dimensionName: '',
				dimensionLink: '',
				dateArr: [],
				paramDataDimensionType: '',
				remark: '',
				jobType: 1,
				unitCode: '',
				unitName: '',
				shifFlag: '',
				shiftAttrCode: '',
				// 隐藏值
				resultUnitId: '',
				baseTargetState: false,
				paramDataDimensionId: 'Department',
				orgList: [],
				usePosition: '',
				shiftFlag: false,
				usePositionList: [],
			},
			usePosition: [],
			formRules: {
				paramName: [{ required: true, message: '请选择参数', trigger: 'change' }],
				realityVal: [{ required: true, message: '请输入具体数值', trigger: 'change' }],
				timeRangeType: [{ required: true, message: '请选择时间维度', trigger: 'change' }],
				timeRangeStr: [{ required: true, message: '请选择数据时间范围', trigger: 'change' }],
				orgList: [{ required: true, message: '请选择单位名称', trigger: 'change' }],
				usePosition: [{ required: true, message: '请选择工序岗位', trigger: 'change' }],
				dimensionName: [{ required: true, message: '请选择数据维度代码', trigger: 'change' }],
			},
		});

		const bandReset = () => {
			proxy.$refs.queryRef.resetFields();
			const { initSystemTime, toDefaultTime } = useSystemTime();
			initSystemTime((time) => {
				let defalutTime = toDefaultTime(time);
				state.queryForm.timeRangeEnd = defalutTime;
				state.queryForm.timeRangeStart = defalutTime;
				state.queryForm.dateArr = [defalutTime, defalutTime];
			});
			state.queryForm.timeRangeStart = '';
		};
		const onSubmit = () => {
			state.currentPage = 1;
			getList();
		};

		const { usePositionList } = usePosition();
		const handleSelectionChange = (val: any) => {
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

		// 打开
		const addOrEdit = async (row: any) => {
			state.addFlag = true;

			await nextTick();
			proxy.$refs.formRef.resetFields();
			state.formTitle = '新增参数数据';
			state.editForm['id'] = 0;
			state.editForm.orgList = [];
			state.editForm.dimensionCode = '';
			state.editForm.dimensionName = '';
			state.editForm.dimensionLink = '';
			state.editForm.targetVal = '';
			state.editForm.baseVal = '';
			(state.editForm.shiftFlag = false), (state.editForm.shiftAttrCode = '');

			if (row) {
				state.formTitle = '修改参数数据';
				const res = await paramResultInfo({ id: row.id });
				if (res.status == 0) {
					state.editForm = { ...state.editForm, ...res.data };

					// 转换单位名称
					state.editForm.orgList = [
						{
							orgCode: state.editForm.unitCode,
							orgName: state.editForm.unitName,
						},
					];
					state.editForm.paramDataDimensionId = toQuotaDataDimension(state.editForm.paramDataDimensionType);
					if (state.editForm.paramDataDimensionId == SearchEnum.DEPARTMENT) {
						reloadList(state.editForm.orgList[0].orgCode);
					}
					// 转换数据维度
					// 转换参数
				} else {
					ElMessage.warning(res.message);
				}
			}
			// proxy.$refs.formRef.clearValidate();
		};

		const getList = async () => {
			// if (state.queryForm.timeRangeType == 'sys_time_quarter') {
			// 	state.queryForm.timeRangeStart = toTimeStr(state.queryForm.timeRangeStart);
			// }
			state.queryForm.dateArr = state.queryForm.dateArr ?? [];
			if (
				(state.queryForm.timeRangeType == 'sys_time_day' || state.queryForm.timeRangeType == 'sys_time_month') &&
				state.queryForm.dateArr.length > 0
			) {
				state.queryForm.timeRangeStart = state.queryForm.dateArr[0];
				state.queryForm.timeRangeEnd = state.queryForm.dateArr[1];
			} else {
				if (state.queryForm.timeRangeType == 'sys_time_year') {
					state.queryForm.timeRangeStart = dayjs(state.queryForm.timeRangeStart).format('YYYY');
				}
				state.queryForm.timeRangeEnd = '';
			}

			if (state.queryForm.timeRangeStart == 'Invalid Date') {
				state.queryForm.timeRangeStart = '';
			}
			if (state.queryForm.timeRangeEnd == 'Invalid Date') {
				state.queryForm.timeRangeEnd = '';
			}

			let params = {
				pageNo: state.currentPage,
				limit: state.limit,
				...state.queryForm,
			};
			let res = await paramResultList(params);
			state.tableData = res.data.resultData;
			state.total = res.data.total;
		};

		//启用/禁用
		const handleFlag = async (val: any) => {
			// if (!state.selection || state.selection.length == 0) {
			// 	ElMessage.warning('请至少选择一个！');
			// 	return false;
			// }
			// let res = await indicatorResultDisable({
			// 	resultState: val,
			// 	idList: state.selection.map((x) => {
			// 		return x.id;
			// 	}),
			// });
			// loading.value = false;
			// if (res.status == 0) {
			// 	getList();
			// 	ElMessage.success('操作成功！');
			// } else {
			// 	ElMessage.warning(res.message);
			// }
		};

		//组织树选择
		const handleSelectedOrgTree = async (selectValue: any) => {
			state.editForm.orgList = selectValue;
			state.editForm.unitCode = state.editForm.orgList[0].orgCode;
			state.editForm.unitName = state.editForm.orgList[0].orgName;

			if (state.editForm.paramDataDimensionId == SearchEnum.COMPANY) {
				state.editForm.dimensionCode = state.editForm.unitCode;
				state.editForm.dimensionName = state.editForm.unitName;
				state.editForm.dimensionLink = state.editForm.orgList[0].orgCodeLine;
			} else if (state.editForm.paramDataDimensionId == SearchEnum.DEPARTMENT) {
				state.editForm.dimensionCode = '';
				state.editForm.dimensionName = '';
				state.editForm.dimensionLink = '';
			}
			reloadList(state.editForm.unitCode);
		};

		// 保存
		const handleSave = () => {
			proxy.$refs.formRef.validate(async (valid: any) => {
				if (!valid) return false;
				loading.value = true;
				// if (state.editForm.timeRangeType == 'sys_time_quarter') {
				// 	state.editForm.timeRangeStr = toTimeStr(state.editForm.timeRangeStr);
				// }
				let res;
				if (state.editForm.id && state.editForm.id > 0) {
					res = await paramResultUpdate(
						toRaw({
							...state.editForm,
						})
					);
				} else {
					res = await paramResultAdd(
						toRaw({
							...state.editForm,
						})
					);
				}

				loading.value = false;
				if (res.status == 0) {
					state.addFlag = false;
					getList();
					ElMessage.success('操作成功！');
				} else {
					ElMessage.warning(res.message);
				}
			});
		};

		// 选中参数
		const handleZhibiaoChange = async (item: any) => {
			console.log(item);
			state.editForm.paramId = item.value;
			state.editForm.paramName = item.label;
			state.editForm.paramDesc = item.desc;
			state.editForm.shiftFlag = item.shiftFlag;
			state.editForm.paramDataDimensionId = toQuotaDataDimension(item.item.paramDataDimensionId);
			state.editForm.dimensionName = '';
			state.editForm.dimensionCode = '';
			state.editForm.dimensionLink = '';
			state.editForm.orgList = [];
			state.editForm.unitCode = '';
			state.editForm.unitName = '';
			state.editForm.resultUnitId = item.item.resultUnitId;
			state.editForm.baseTargetState = item.item.baseTargetState;
			// state.editForm.usePosition = item.item.usePosition
			state.editForm.usePositionList = item.item.paramLibraryPositionResList;
			if (state.editForm.orgList.length > 0 || state.editForm.paramDataDimensionId == SearchEnum.PERSON) {
				await nextTick();
				let code = state.editForm.orgList.length > 0 ? state.editForm.orgList[0].orgCode : '';
				proxy.$refs.dataSearchRef.setControlType(state.editForm.paramDataDimensionId, code);
			}
		};

		const toQuotaDataDimension = (val) => {
			if (val == 'sys_data_unit') {
				return SearchEnum.COMPANY;
			} else if (val == 'sys_data_department') {
				return SearchEnum.DEPARTMENT;
			} else if (val == 'sys_data_people') {
				return SearchEnum.PERSON;
			}
		};

		const handleTimeChange = (form) => {
			state[form].timeRangeStart = '';
			state[form].timeRangeEnd = '';
			state[form].timeRangeStr = '';
			state[form].dateArr = [];
		};

		const handlebumenChange = (item: any) => {
			state.editForm.dimensionName = useDepartmentList.value.find((x) => x.value == item).label;
			state.editForm.dimensionLink = useDepartmentList.value.find((x) => x.value == item).desc;
		};

		const handleWeiDuChange = (item: any) => {
			state.editForm.dimensionCode = item.value;
			state.editForm.dimensionName = item.item.orgName;
			if (state.editForm.paramDataDimensionId == SearchEnum.PERSON) {
				state.editForm.unitCode = item.item.unitCode;
				state.editForm.unitName = item.item.unitName;
				state.editForm.orgList = [
					{
						orgCode: item.item.unitCode,
						orgName: item.item.unitName,
					},
				];
			}
		};

		const isDisabledDanwei = () => {
			return state.editForm.paramDataDimensionId;
		};

		const getDepartment = async (query) => {
			const res = await searchDept({
				searchStr: query,
				orgCode: state.orgCode,
			});
			toBindList(res);
		};

		const handleExport = async () => {
			state.exportLoading = true;

			if (state.queryForm.dateArr.length > 0) {
				state.queryForm.timeRangeStart = state.queryForm.dateArr[0];
				state.queryForm.timeRangeEnd = state.queryForm.dateArr[1];
			}
			let params = {
				...state.queryForm,
			};
			let res = await indicatorExport(params);
			let fileName = '参数数据' + dayjs(new Date()).format('YYYY-MM-DD') + '.xls';
			downloadFile(res, fileName);
			state.exportLoading = false;
		};
		const remoteMethod = (query: string) => {
			let timer;
			clearTimeout(timer);
			if (query) {
				loading.value = true;
				timer = setTimeout(async () => {
					const res = await searchQutotalLibrary({
						paramName: query,
					});
					if (res.status == 0) {
						state.options = res.data.map((x) => {
							return { value: x.id, label: x.paramName };
						});
					}
					loading.value = false;
				}, 500);
			} else {
				state.options = [];
			}
		};

		onMounted(() => {
			const { initSystemTime, toDefaultTime } = useSystemTime();
			initSystemTime((time) => {
				let defalutTime = toDefaultTime(time);
				state.queryForm.timeRangeEnd = defalutTime;
				state.queryForm.timeRangeStart = defalutTime;
				state.queryForm.dateArr = [defalutTime, defalutTime];
				getList();
			});
		});

		return {
			...toRefs(state),
			handleTimeChange,
			onSubmit,
			bandReset,
			handleSelectionChange,
			handleSizeChange,
			handlebumenChange,
			handleCurrentChange,
			addOrEdit,
			handleSelectedOrgTree,
			handleSave,
			handleFlag,
			SearchEnum,
			handleZhibiaoChange,
			useDictionaryList,
			loading,
			handleWeiDuChange,
			isDisabledDanwei,
			handleExport,
			remoteMethod,
			useDepartmentList,
			getTimeStr: (row) => {
				// if (row.timeRangeType == 'sys_time_month') {
				// 	return dayjs(row.timeRangeStr).format('YYYY-MM');
				// } else if (row.timeRangeType == 'sys_time_year') {
				// 	return dayjs(row.timeRangeStr).format('YYYY');
				// } else if (row.timeRangeType == 'sys_time_quarter') {
				// 	return row.timeRangeStr.replace('|', '年第') + '季度';
				// } else if (row.timeRangeType == 'sys_time_halfyear') {
				// 	let arr = row.timeRangeStr.split('|');
				// 	return `${arr[0]}年${arr[1] == '1' ? '上半年' : '下半年'}`;
				// }
				return row.timeRangeStr;
			},
			usePositionList,
			handleImport: async () => {
				await nextTick();
				proxy.$refs.importRef.open();
			},
			handleChange: (val: any) => {
				console.log(val, 'val');
			},
			handleDateChange: () => {
				if (state.queryForm.timeRangeType == '') {
					ElMessage.error('请先选择时间维度');
					state.queryForm.dateArr = [];
				}
			},
			getDataSource: (row) => {
				// let isSame = row.targetValSource == row.realityValSource && row.targetValSource == row.baseValSource;
				let isNull = !row.targetValSource || !row.realityValSource || !row.baseValSource;
				if (isNull) {
					return row.targetValSource;
				}
				return '基础值:' + row.baseValSource + '；目标值:' + row.targetValSource + '；实际值:' + row.realityValSource;
			},
			handleComplete: () => {
				state.currentPage = 1;
				getList();
			},
		};
	},
});
</script>
<style lang="scss" scoped>
#pages {
	height: 100%;
	position: relative;
	display: flex;
	flex-direction: column;

	// .content_list {
	// 	flex: 1;
	// 	display: flex;
	// 	flex-direction: column;
	// 	padding: 15px;
	// 	padding-bottom: 0px;
	// 	min-height: 100px !important;
	// 	.table_list {
	// 		flex: auto;
	// 		// 重点是这里：开始
	// 		position: relative;

	// 		::v-deep(.el-table) {
	// 			position: absolute;
	// 			height: 100%;
	// 		}
	// 	}

	// 	.content_title,
	// 	.pagination {
	// 		flex-shrink: 0;
	// 	}

	// 	.pagination {
	// 		margin: 0;
	// 		padding: 0;
	// 	}
	// }
}
.query_box {
	padding-left: 40px !important;
}
.content_list {
	.content_title {
		padding-bottom: 0px !important;
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

// ::v-deep .el-input__inner {
// 	width: 100% !important;
// }

// ::v-deep .el-input {
// 	width: 100% !important;
// }

// ::v-deep .my-select {
// 	display: block !important;
// 	width: 100% !important;
// }
</style>
