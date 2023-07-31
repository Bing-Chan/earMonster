<template>
	<div id="pages">
		<div class="query_box">
			<el-form inline :model="queryForm" ref="queryRef">
				<el-form-item label="考核表名称" prop="schemeName">
					<el-input v-model="queryForm.schemeName" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="考核周期" prop="assessCycleType">
					<el-select v-model="queryForm.assessCycleType" @change="changeAssessCycle" clearable>
						<el-option
							v-for="(item, index) in dictionaryList['sys_period']"
							:key="index"
							:value="item.dictItemCode"
							:label="item.dictItem"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="考核时间" prop="value1">
					<el-date-picker
						v-model="queryForm.value1"
						v-if="queryForm.assessCycleType == 'sys_period_day' || queryForm.assessCycleType == ''"
						type="daterange"
						range-separator="——"
						start-placeholder="请选择开始时间"
						end-placeholder="请选择结束时间"
					></el-date-picker>

					<el-date-picker
						v-model="queryForm.value1"
						v-if="queryForm.assessCycleType == 'sys_period_month'"
						type="monthrange"
						range-separator="——"
						start-placeholder="请选择开始时间"
						end-placeholder="请选择结束时间"
					></el-date-picker>

					<el-date-picker
						style="width: 100%"
						v-else-if="queryForm.assessCycleType == 'sys_period_year'"
						v-model="queryForm.assessStartDate"
						type="year"
						placeholder="请选择"
					/>
					<quarter
						v-else-if="queryForm.assessCycleType == 'sys_period_quarter'"
						:control-type="'quarter'"
						v-model="queryForm.assessStartDate"
					></quarter>
					<quarter v-else-if="queryForm.assessCycleType == 'sys_period_halfyear'" v-model="queryForm.assessStartDate"></quarter>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
					<el-button type="default" @click="bandReset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="content_list">
			<div>
				<el-button type="primary" @click="add">新增</el-button>
				<el-button type="default" v-if="activeTab == 1 || activeTab == 3" @click="terminationScheme">终止考核表</el-button>
				<el-button type="default" v-if="activeTab == 3" @click="issueImmediately">立即下发</el-button>
			</div>
			<div class="table_list">
				<el-tabs type="card" @tab-click="changeTab" v-model="activeTab">
					<el-tab-pane label="待下发的考核表" name="3">
						<pro-list
							:queryData="queryForm"
							:listType="3"
							ref="comingRef"
							@finishSelection="finishSelection"
							@copyScheme="copyScheme"
							@editScheme="editScheme"
						></pro-list>
					</el-tab-pane>

					<el-tab-pane label="进行中的考核表" name="1">
						<pro-list :queryData="queryForm" ref="onWayRef" :listType="1" @finishSelection="finishSelection" @copyScheme="copyScheme"></pro-list>
					</el-tab-pane>

					<el-tab-pane label="已完成的考核表" name="2">
						<pro-list :queryData="queryForm" :listType="2" ref="finishedRef" @copyScheme="copyScheme"></pro-list>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
		<darwer v-model="addDialogVisible" @close="handleCancel">
			<template #title>
				<span>{{ darwerTitle }}</span>
			</template>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form :model="tableForm" ref="tableFormRef" :rules="rules" label-position="right" label-width="150px">
						<el-form-item label="考核表名称" prop="schemeName">
							<el-input
								v-model="tableForm.schemeName"
								:disabled="tableForm.updateFlag && darwerTitle == '修改考核表'"
								placeholder="请输入考核表名称"
							></el-input>
						</el-form-item>
						<el-form-item label="描述" prop="description">
							<el-input
								type="textarea"
								:disabled="tableForm.updateFlag && darwerTitle == '修改考核表'"
								v-model="tableForm.description"
								placeholder="请输入"
								maxlength="100"
								show-word-limit=""
							></el-input>
						</el-form-item>
						<el-form-item label="模板引用" prop="templateName">
							<search
								:disabled="tableForm.updateFlag && darwerTitle == '修改考核表'"
								:control-type="SearchEnum.TEMPLATE"
								v-model="tableForm.templateName"
								@change="handleTemplate"
							></search>
						</el-form-item>
						<el-form-item label="适用类型">
							<el-radio-group disabled v-model="tableForm.jobType">
								<el-radio :label="1">操作工</el-radio>
								<el-radio :label="2">职能</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="考核周期" prop="assessCycleType">
							<el-select
								:disabled="tableForm.updateFlag && darwerTitle == '修改考核表'"
								v-model="tableForm.assessCycleType"
								@change="changeAssCycleType"
							>
								<el-option
									v-for="(item, index) in dictionaryList['sys_period']"
									:key="index"
									:value="item.dictItemCode"
									:label="item.dictItem"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="是否按周期自动下发" prop="flagByCycle">
							<el-radio-group
								:disabled="tableForm.updateFlag && darwerTitle == '修改考核表'"
								v-model="tableForm.flagByCycle"
								@change="changeFlagCycle"
							>
								<el-radio :label="1">是</el-radio>
								<el-radio :label="0">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="考核时间" prop="assessDateVal">
							T -
							<el-input-number
								:disabled="tableForm.updateFlag && darwerTitle == '修改考核表'"
								:min="1"
								:max="5"
								v-model="tableForm.assessDateVal"
								precision="0"
							></el-input-number>
							<div class="message">
								T-1表示考核上一周期 <br />
								例如：按日考核，下发时间2023.2.5，考核时间T-2，列表回显考核时间：2.3
							</div>
						</el-form-item>
						<el-form-item label="本次下发时间" prop="initSendTime" v-if="tableForm.flagByCycle == 0">
							<el-date-picker
								type="date"
								:disabled="tableForm.updateFlag && darwerTitle == '修改考核表'"
								v-model="tableForm.initSendTime"
								placeholder="请选择日期"
								:disabled-date="disabledDate"
							></el-date-picker>
						</el-form-item>
						<el-form-item label="初次下发时间" prop="initSendTime" v-else>
							<el-date-picker
								type="date"
								:disabled="tableForm.updateFlag && darwerTitle == '修改考核表'"
								v-model="tableForm.initSendTime"
								placeholder="请选择日期"
								:disabled-date="disabledDate"
							></el-date-picker>
						</el-form-item>
						<el-form-item label="下发截止时间" v-if="tableForm.flagByCycle == 1" prop="sendEndTime">
							<el-date-picker type="date" v-model="tableForm.sendEndTime" placeholder="请选择日期" :disabled-date="disabledDate"></el-date-picker>
						</el-form-item>
						<el-form-item
							label="周期下发时间"
							v-show="tableForm.assessCycleTypeValue != '日' && tableForm.assessCycleTypeValue != ''"
							prop="cycleSendTine"
							v-if="tableForm.flagByCycle == 1"
						>
							每 <span class="red"> {{ tableForm.assessCycleTypeValue }} </span> 第
							<el-input-number
								:disabled="tableForm.updateFlag && darwerTitle == '修改考核表'"
								:min="1"
								:max="maxCycleSendTine"
								v-model="tableForm.cycleSendTine"
								precision="0"
							></el-input-number>
							天(自然日)
						</el-form-item>
						<el-form-item label="考核人员" prop="assessRangeList">
							<select-person v-model:selectedList="tableForm.assessRangeList"></select-person>
						</el-form-item>
						<el-form-item label="不参与人员">
							<select-person v-model:selectedList="tableForm.assessExcludeRangeList"></select-person>
						</el-form-item>
						<!-- <el-form-item label="考核表最晚执行时间">
              <el-switch v-model="tableForm.latestExecSwitch" />
            </el-form-item>
            <el-form-item v-for="item in nodeList" :key="item" :label="item.nodeName" v-if="tableForm.latestExecSwitch">
              下发之日起第<el-input-number :min="0" v-model="item.days"></el-input-number>天(自然日)
            </el-form-item> -->
						<!-- <el-form-item label="考核前是否需要签约" prop="">
              <el-radio-group v-model="tableForm.signContract">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="前置流程" v-if="tableForm.signContract">
              <el-select v-model="tableForm.flowId" style="width: 100%" placeholder="请选择流程" clearable>
								<el-option v-for="(item, index) in useFlowList" :key="index" :label="item.flowName" :value="item.id"></el-option>
							</el-select>
            </el-form-item>
            <el-form-item label="考核表签约时间" v-if="tableForm.signContract">
              下发之日前<el-input-number :min="0" v-model="tableForm.signEndDays"></el-input-number> —— 
              <el-input-number :min="0" v-model="tableForm.signStartDays"></el-input-number>天(自然日)
            </el-form-item> -->
					</el-form>
				</el-col>
			</el-row>
			<template #footer>
				<el-button type="default" @click="handleCancel">取消</el-button>
				<el-button type="primary" @click="handleCommit" :loading="addLoading">保存</el-button>
			</template>
		</darwer>
	</div>
</template>

<script lang="ts">
import Vue, { defineComponent, toRefs, reactive, onMounted, ref, getCurrentInstance, nextTick } from 'vue';
import proList from './src/proList.vue';
import Search from '/@/components/Search.vue';
import { SearchEnum } from '/@/enums/Search.ts';
import { getDictionary } from '/@/api/baseConfig/index.ts';
import OrgTreeTransfer from '/@/components/OrgTreeTransfer.vue';
import selectPerson from '/@/components/selectPerson/index.vue';
import { addScheme, schemeTermination, schemeCopy, schemeImmediately, getScheme, schemeEdit } from '/@/api/scheme/index.ts';
import { getFlowNode } from '/@/api/flow/index.ts';
import { ElMessage, ElMessageBox } from 'element-plus';
import dayjs from 'dayjs';
// import { useFlow } from '/@/hooks/web/useFlow';

export default defineComponent({
	name: 'perProgram',
	components: { proList, search: Search, orgTree: OrgTreeTransfer, selectPerson },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		// const { useFlowList } = useFlow('sys_flow_type_sign');
		const onWayRef = ref();
		const tableFormRef = ref();
		const finishedRef = ref();
		const comingRef = ref();
		const state = reactive({
			queryForm: {
				schemeName: '',
				assessCycleType: '',
				assessEndDate: '',
				assessStartDate: '',
				value1: [],
			},

			activeTab: '3',
			addDialogVisible: false,
			tableForm: {
				schemeName: '',
				description: '',
				templateId: '',
				templateName: '',
				assessCycleType: '',
				assessCycleTypeValue: '',
				flagByCycle: 1,
				initSendTime: '',
				sendEndTime: '',
				signContract: 0,
				assessExcludeRangeList: [],
				assessRangeList: [],
				assessDateVal: 0,
				cycleSendTine: 1,
				latestExecSwitch: 0,
				updateFlag: false,
				jobType: '',
			},
			dictionaryList: [],
			maxCycleSendTine: 30,

			rules: {
				schemeName: [{ required: true, message: '请输入考核表名称', trigger: ['blur', 'change'] }],
				templateName: [{ required: true, message: '请选择考核模板', trigger: ['blur', 'change'] }],
				assessCycleType: [{ required: true, message: '请选择考核周期', trigger: ['blur', 'change'] }],
				flagByCycle: [{ required: true, message: '请选择是否按周期下发', trigger: ['blur', 'change'] }],
				initSendTime: [{ required: true, message: '请选择初次下发时间', trigger: ['blur', 'change'] }],
				assessRangeList: [{ required: true, message: '请选择考核人员', trigger: ['change'] }],
				assessDateVal: [{ required: true, message: '请选择考核时间', trigger: ['change'] }],
				cycleSendTine: [{ required: true, message: '请选择周期下发时间', trigger: ['change'] }],
			},
			nodeList: [],
			selectionIdList: [],
			darwerTitle: '新建考核表',
			addLoading: false,
		});

		const add = () => {
			state.addDialogVisible = true;
			console.log(state.tableForm.updateFlag, 'ssadsa');
			state.darwerTitle = '新建考核表';
		};
		const getDictionaryList = async () => {
			let params = ['sys_period'];
			let res = await getDictionary(params);
			if (res.status == 0) {
				state.dictionaryList = res.data;
			}
		};
		const disabledDate = (time: Date) => {
			let now = dayjs().add(-1, 'day');
			return dayjs(time.getTime()).isBefore(now);
		};
		const changeAssCycleType = (val: any) => {
			state.tableForm.assessCycleTypeValue = state.dictionaryList['sys_period'].filter((item) => item.dictItemCode == val)[0].dictItem;
			state.maxCycleSendTine = changeCycleSendTine(state.tableForm.assessCycleTypeValue);
		};
		const changeCycleSendTine = (val: any) => {
			switch (val) {
				case '月':
					return 30;
				case '季度':
					return 90;
				case '半年':
					return 180;
				case '年':
					return 365;
			}
		};
		const handleCancel = () => {
			proxy.$refs.tableFormRef.resetFields();
			state.tableForm.assessExcludeRangeList = [];
			state.tableForm.assessRangeList = [];
			state.tableForm.initSendTime = '';
			state.tableForm.assessCycleTypeValue = '';
			state.tableForm.updateFlag = false;
			state.addDialogVisible = false;
		};
		const handleTemplate = async (val: any) => {
			console.log(val);
			state.tableForm.templateName = val.label;
			state.tableForm.templateId = val.id;
			state.tableForm.jobType = val.jobType;
			//根据选择的模板去查询所引用的流程
			let res = await getFlowNode({ templateId: state.tableForm.templateId });
			if (res.status == 0) {
				state.nodeList = { ...{ days: 0 }, ...res.data.flowNodeInitResList };
				console.log(state.nodeList);
			}
		};

		const onSubmit = () => {
			// state.queryForm.assessStartDate = state.value1 ? '' : dayjs(state.value1[0]).format('YYYY-MM-DD')
			// state.queryForm.assessEndDate = state.value1 ? '' : dayjs(state.value1[1]).format('YYYY-MM-DD')
			getList(state.activeTab);
		};

		const bandReset = () => {
			proxy.$refs.queryRef.resetFields();
			state.queryForm.value1 = [];
		};
		const changeAssessCycle = () => {
			state.queryForm.value1 = [];
			state.queryForm.assessStartDate = '';
		};

		const issueImmediately = async () => {
			if (state.selectionIdList.length == 0) {
				ElMessage.warning('请选择要立即下发的考核表');
			} else {
				ElMessageBox.confirm('确认要立即下发选中的考核表吗？', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					type: 'warning',
				})
					.then(async () => {
						let params = {
							ids: state.selectionIdList,
							continueFlag: false,
						};
						let res = await schemeImmediately(params);
						if (
							res.status == 0 &&
							(res.data.dateReject == null || res.data.dateReject.length <= 0) &&
							(res.data.statusReject == null || res.data.statusReject.length <= 0)
						) {
							ElMessage.success('考核表立即下发成功');
							getList(state.activeTab);
						} else {
							ElMessage.error('存在不符合条件的考核表，请重新选择');
						}
					})
					.catch(() => {});
			}
		};

		const terminationScheme = async () => {
			if (state.selectionIdList.length == 0) {
				ElMessage.warning('请选择要终止的考核表');
			} else {
				ElMessageBox.confirm('确认要终止选中的考核表吗？', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					type: 'warning',
				})
					.then(async () => {
						let source = Object.is(state.activeTab, '1') ? 1 : 3;
						let params = {
							ids: state.selectionIdList,
							source: source,
						};
						let res = await schemeTermination(params);
						if (res.status == 0) {
							ElMessage.success('考核表终止成功');
							getList(state.activeTab);
						} else {
							ElMessage.error(res.message);
						}
					})
					.catch(() => {});
			}
		};

		const handleCommit = async () => {
			tableFormRef.value.validate(async (valid: any) => {
				if (!valid) return false;
				try {
					if (Object.is(state.darwerTitle, '新建考核表')) {
						// state.tableForm.templateId = state.template.id
						//新增
						state.addLoading = true;
						state.tableForm.initSendTime =
							state.tableForm.initSendTime == '' || state.tableForm.initSendTime == null
								? ''
								: dayjs(state.tableForm.initSendTime).format('YYYY-MM-DD');
						state.tableForm.sendEndTime =
							state.tableForm.sendEndTime == '' || state.tableForm.sendEndTime == null ? '' : dayjs(state.tableForm.sendEndTime).format('YYYY-MM-DD');
						let res = await addScheme(state.tableForm);
						if (res.status == 0) {
							state.addLoading = false;
							state.addDialogVisible = false;
							ElMessage.success(res.data ? res.data : '新增成功');
							proxy.$refs.tableFormRef.resetFields();
							getList(state.activeTab);
						} else {
							ElMessage.error(res.message);
							state.addLoading = false;
						}
					} else if (Object.is(state.darwerTitle, '修改考核表')) {
						state.tableForm.initSendTime =
							state.tableForm.initSendTime == '' || state.tableForm.initSendTime == null
								? ''
								: dayjs(state.tableForm.initSendTime).format('YYYY-MM-DD');
						state.tableForm.sendEndTime =
							state.tableForm.sendEndTime == '' || state.tableForm.sendEndTime == null ? '' : dayjs(state.tableForm.sendEndTime).format('YYYY-MM-DD');
						state.addLoading = true;
						let res = await schemeEdit({ ...state.tableForm });
						if (res.status == 0) {
							state.addLoading = false;
							state.addDialogVisible = false;
							ElMessage.success('修改成功');
							proxy.$refs.tableFormRef.resetFields();
							getList(state.activeTab);
						} else {
							ElMessage.error(res.message);
							state.addLoading = false;
						}
					} else {
						//复制
						console.log(state.tableForm);
						state.tableForm.initSendTime =
							state.tableForm.initSendTime == '' || state.tableForm.initSendTime == null
								? ''
								: dayjs(state.tableForm.initSendTime).format('YYYY-MM-DD');
						state.tableForm.sendEndTime =
							state.tableForm.sendEndTime == '' || state.tableForm.sendEndTime == null ? '' : dayjs(state.tableForm.sendEndTime).format('YYYY-MM-DD');
						let params = {
							copyId: state.tableForm.id,
							source: Number(state.activeTab),
							signContract: 0,
						};
						state.addLoading = true;
						let res = await schemeCopy({ ...params, ...state.tableForm });
						if (res.status == 0) {
							state.addLoading = false;
							state.addDialogVisible = false;
							ElMessage.success(res.data ? res.data : '复制成功');
							proxy.$refs.tableFormRef.resetFields();
							getList(state.activeTab);
						} else {
							ElMessage.error(res.message);
							state.addLoading = false;
						}
					}
				} catch (ex) {
					state.addLoading = false;
				}
			});
		};

		const changeTab = (activeTab: any) => {
			getList(activeTab.paneName);
		};

		const changeFlagCycle = (val: any) => {
			console.log(val);
			if (val == 0) {
				state.tableForm.sendEndTime = '';
			}
		};

		const getList = (activeName: any) => {
			if (activeName == 1) {
				onWayRef.value.getList(activeName);
			} else if (activeName == 2) {
				finishedRef.value.getList(activeName);
			} else {
				comingRef.value.getList(activeName);
			}
		};

		const finishSelection = (selection: any) => {
			state.selectionIdList = selection;
			console.log(state.selectionIdList);
		};

		const copyScheme = async (row: any) => {
			state.darwerTitle = '复制考核表';
			let copyRow;
			let id = row.id;
			if (state.activeTab == 1 || state.activeTab == 2) {
				let params = {
					source: state.activeTab,
					id: row.id,
				};
				let res = await getScheme(params);
				if (res.status == 0) {
					copyRow = { ...res.data };
					copyRow.id = id;
				} else {
					ElMessage.error(res.message);
				}
			} else {
				copyRow = { ...row };
			}
			state.addDialogVisible = true;
			// state.tableForm.assessRangeList = row.assessRangeList
			// state.tableForm.assessExcludeRangeList = row.assessExcludeRangeList
			copyRow.flagByCycle = Number(copyRow.flagByCycle);
			//清空考核表名称，本次下发时间或初次下发时间
			copyRow.schemeName = '';
			if (new Date(copyRow.initSendTime) < new Date()) {
				copyRow.initSendTime = '';
			}
			nextTick(() => {
				state.tableForm = { ...copyRow };
				console.log(state.tableForm.assessRangeList);
			});
		};

		// 修改自定义方案
		const editScheme = async (row: any) => {
			state.darwerTitle = '修改考核表';
			let eidtRow;
			eidtRow = { ...row };
			state.addDialogVisible = true;
			// state.tableForm.assessRangeList = row.assessRangeList
			// state.tableForm.assessExcludeRangeList = row.assessExcludeRangeList
			eidtRow.flagByCycle = Number(eidtRow.flagByCycle);
			//清空考核表名称，本次下发时间或初次下发时间
			// copyRow.schemeName = '';
			// if (new Date(copyRow.initSendTime) < new Date()) {
			// 	copyRow.initSendTime = '';
			// }
			nextTick(() => {
				state.tableForm = { ...eidtRow };
			});
		};

		onMounted(() => {
			getDictionaryList();
			getList(state.activeTab);
		});

		return {
			...toRefs(state),
			add,
			SearchEnum,
			getDictionaryList,
			changeAssCycleType,
			handleCommit,
			handleCancel,
			tableFormRef,
			onSubmit,
			bandReset,
			changeTab,
			onWayRef,
			comingRef,
			finishedRef,
			handleTemplate,
			//useFlowList,
			disabledDate,
			terminationScheme,
			finishSelection,
			copyScheme,
			changeAssessCycle,
			issueImmediately,
			changeFlagCycle,
			editScheme,
		};
	},
});
</script>
<style lang="scss" scoped>
.red {
	color: red;
}
.message {
	background-color: #f0f2f5;
	margin-top: 10px;
	padding: 0 0 0 5px;
	color: #333333;
	font-size: 12px;
	line-height: 24px;
}
</style>
