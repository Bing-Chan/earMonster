<template>
	<div>
		<!-- <div class="panl-head" v-if="formSchame">
			<div class="panl-head--btn">
				<el-button type="primary" @click="goBack" size="small">返回</el-button>
			</div>
		</div> -->
		<div class="query_box">
			<el-form inline :model="queryForm" ref="queryRef">
				<el-form-item label="考核表名称" prop="schemeName">
					<el-input :disabled="formSchame" v-model.trim="queryForm.schemeName" placeholder="请输入" clearable></el-input>
				</el-form-item>
				<el-form-item label="单位名称" prop="unitName">
					<el-input v-model.trim="queryForm.unitName" placeholder="请输入" clearable></el-input>
				</el-form-item>
				<el-form-item label="部门名称" prop="deptName">
					<el-input v-model.trim="queryForm.deptName" placeholder="请输入" clearable></el-input>
				</el-form-item>
				<el-form-item label="岗位名称" prop="jobName">
					<el-input v-model.trim="queryForm.jobName" placeholder="请输入" clearable></el-input>
				</el-form-item>

				<el-form-item label="考核状态" prop="appraiseState" v-show="!formSchame">
					<el-select v-model="queryForm.appraiseState" clearable>
						<el-option label="进行中" value="1"></el-option>
						<el-option label="已完成" value="2"></el-option>
						<el-option label="已终止" value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="工号/姓名" prop="userCode">
					<el-input v-model.trim="queryForm.userCode" placeholder="请输入工号/姓名" clearable></el-input>
				</el-form-item>
				<el-form-item label="考核周期" prop="assessCycleType" v-show="!formSchame">
					<el-select v-model="queryForm.assessCycleType" clearable @change="changeAssessCycleType">
						<el-option
							v-for="(item, index) in dictionaryList['sys_period']"
							:key="index"
							:value="item.dictItemCode"
							:label="item.dictItem"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="考核时间" prop="" v-show="!formSchame">
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
				<!-- <el-form-item label="组织" prop="orgList">
          <org-tree :isDanwei="false" v-model:orgDataList="queryForm.orgList" @change="handleSelectedOrgTree"></org-tree>
        </el-form-item> -->
				<!-- <el-form-item label="人员状态" prop="lx">
          <el-select v-model="queryForm.lx" clearable>
            <el-option label="在职" value="0"></el-option>
            <el-option label="离职" value="2"></el-option>
          </el-select>
        </el-form-item> -->
				<!-- <el-form-item label="计算方式" prop="calculateMode">
          <el-select v-model="queryForm.calculateMode" clearable>
            <el-option label="权重" value="1"></el-option>
            <el-option label="非权重" value="2"></el-option>
          </el-select>
        </el-form-item> -->
				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
					<el-button type="default" @click="bandReset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="content_list">
			<div>
				<el-button type="primary" @click="exportResult" :loading="exportLoading">导出</el-button>
				<!-- <el-button type="default" >终止考核</el-button> -->
			</div>
			<div class="table_list">
				<el-table :data="tableData" @selection-change="handleSelectionChange" stripe border style="width: 100%">
					<template #empty><SysEmpty></SysEmpty></template>
					<!-- <el-table-column type="selection" align="center" width="55"> </el-table-column> -->
					<el-table-column type="index" label="序号" width="65" align="center"></el-table-column>
					<el-table-column prop="userCode" label="工号" align="center"></el-table-column>
					<el-table-column prop="userName" label="姓名" align="center">
						<template #default="scope">
							<el-button type="text" @click="goToDetail(scope.row)">{{ scope.row.userName }}</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="jobName" label="岗位名称" align="center" width="160px"></el-table-column>
					<el-table-column prop="deptName" label="部门名称" align="center" width="100px"></el-table-column>
					<el-table-column prop="unitName" label="单位名称" align="center" width="120px"></el-table-column>
					<el-table-column prop="schemeName" label="考核表名称" align="center" width="180px"></el-table-column>
					<el-table-column prop="assessCycleTypeValue" label="考核周期" align="center"></el-table-column>
					<el-table-column prop="assessDateShow" label="考核时间" align="center" width="100px"></el-table-column>
					<el-table-column prop="totalScoreStr" label="考核结果" align="center">
						<template #default="scope">
							{{ scope.row.totalScore != null ? scope.row.totalScore : '-' }}
						</template>
					</el-table-column>
					<!-- <el-table-column prop="lx" label="人员状态" align="center"></el-table-column> -->
					<el-table-column prop="appraiseState" label="考核状态" align="center">
						<template #default="scope">
							{{ getAppState(scope.row.appraiseState) }}
						</template>
					</el-table-column>
				</el-table>
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
		<!--预览-->
		<el-dialog :close-on-click-modal="false" :title="schemeTitle" v-model="yulanFlag" style="min-width: 800px" width="80%">
			<report-view ref="dialogRef" :kind="3" :id="resultId"></report-view>
		</el-dialog>
	</div>
</template>
<script lang="ts">
import Vue, { defineComponent, reactive, toRefs, onMounted, getCurrentInstance, nextTick } from 'vue';
import { getDictionary } from '/@/api/baseConfig/index.ts';
import { getResult, resultExport } from '/@/api/schemeResult/index.ts';
import dayjs from 'dayjs';
import reportView from '../src/detailView.vue';
import orgTree from '/@/components/orgTree/index.vue';
import { downloadFile } from '../../../utils/download';
import { useRoute, useRouter } from 'vue-router';
import { usePages } from '/@/hooks/event/useSchemeResult';

export default defineComponent({
	components: {
		reportView,
		orgTree,
	},
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			queryForm: {
				schemeRecordId: 0,
				schemeName: '',
				assessCycleType: 'sys_period_month',
				lx: '',
				appraiseState: '',
				calculateMode: '',
				userCode: '',
				limit: 20,
				pageNo: 1,
				value1: [],
				assessStartDate: '',
				assessEndDate: '',
				orgCodeLine: '',
				orgList: [],
				jobType: 2,
				jobName: '',
				deptName: '',
				unitName: '',
			},
			tableData: [],
			dictionaryList: [],
			total: 0,
			yulanFlag: false,
			resultId: '',
			schemeTitle: '',
			exportLoading: false,
			formSchame: false,
		});
		const usePageRefs = usePages(state);
		const route: any = useRoute();
		const router: any = useRouter();

		const getDictionaryList = async () => {
			let params = ['sys_period'];
			let res = await getDictionary(params);
			if (res.status == 0) {
				state.dictionaryList = res.data;
			}
		};
		const onSubmit = () => {
			state.queryForm.pageNo = 1;
			getList();
		};

		const bandReset = () => {
			nextTick(() => {
				proxy.$refs.queryRef.resetFields();
				state.queryForm.orgList = [];
				state.queryForm.orgCodeLine = '';
				if (state.formSchame) {
					state.queryForm.schemeName = route.query.schemeName;
				}
			});
		};
		const handleSelectedOrgTree = (selectValue: any) => {
			console.log(selectValue);
			if (selectValue.length == 0) {
				state.queryForm.orgCodeLine = '';
			} else {
				state.queryForm.orgCodeLine = selectValue[0].orgCodeLine;
			}
		};
		const changeAssessCycleType = () => {
			state.queryForm.assessStartDate = '';
			state.queryForm.value1 = [];
		};
		const goToDetail = (row: any) => {
			state.yulanFlag = true;
			state.resultId = row.id;
			state.schemeTitle = row.userName;
			nextTick(() => {
				proxy.$refs.dialogRef.loadPersonData();
			});
		};
		const handleSelectionChange = (val: any) => {
			console.log(val);
		};
		const getAppState = (appState: any) => {
			switch (appState) {
				case 0:
					return '未开始';
				case 1:
					return '进行中';
				case 2:
					return '已完成';
				case 3:
					return '已终止';
			}
		};
		const getList = async () => {
			state.queryForm.assessStartDate = getAssesStartDate(state.queryForm.value1, state.queryForm.assessCycleType, state.queryForm.assessStartDate);
			// != null && state.queryForm.value1.length > 0 ?
			//    Object.is(state.queryForm.assessCycleType, 'sys_period_day') ||  state.queryForm.assessCycleType == "" ? dayjs(state.queryForm.value1[0]).format('YYYY-MM-DD') : dayjs(state.queryForm.value1[0]).format('YYYY-MM')
			//    : Object.is(state.queryForm.assessCycleType, 'sys_period_year') && state.queryForm.assessStartDate != "" ? dayjs(state.queryForm.assessStartDate).format('YYYY') : state.queryForm.assessStartDate,
			state.queryForm.assessEndDate = getAssesEndDate(state.queryForm.value1, state.queryForm.assessCycleType, state.queryForm.assessEndDate);
			// state.queryForm.value1 != null && state.queryForm.value1.length > 0 ?
			//     Object.is(state.queryForm.assessCycleType, 'sys_period_day') ||  state.queryForm.assessCycleType == "" ? dayjs(state.queryForm.value1[1]).format('YYYY-MM-DD') : dayjs(state.queryForm.value1[1]).format('YYYY-MM')
			//     : Object.is(state.queryForm.assessCycleType, 'sys_period_year') ? '' : state.queryForm.assessEndDate
			let res = await getResult({ ...{ isAccurate: state.formSchame }, ...state.queryForm });
			if (res.status == 0) {
				state.tableData = res.data.resultData;
				state.total = res.data.total;
			}
		};

		const getAssesStartDate = (val: any, assessCycleType: any, assessStartDate: any) => {
			if (val == null) {
				return '';
			} else if (val.length > 0) {
				if (Object.is(assessCycleType, 'sys_period_day') || assessCycleType == '') {
					return dayjs(val[0]).format('YYYY-MM-DD');
				} else if (Object.is(assessCycleType, 'sys_period_month')) {
					return dayjs(val[0]).format('YYYY-MM');
				}
			} else if (Object.is(assessCycleType, 'sys_period_year') && assessStartDate != '') {
				return dayjs(assessStartDate).format('YYYY');
			} else {
				return assessStartDate;
			}
		};
		const getAssesEndDate = (val: any, assessCycleType: any, assessEndDate: any) => {
			if (val == null) {
				return '';
			} else if (val.length > 0) {
				if (Object.is(assessCycleType, 'sys_period_day') || assessCycleType == '') {
					return dayjs(val[1]).format('YYYY-MM-DD');
				} else if (Object.is(assessCycleType, 'sys_period_month')) {
					return dayjs(val[1]).format('YYYY-MM');
				}
			} else if (Object.is(assessCycleType, 'sys_period_year') && assessEndDate != '') {
				return dayjs(assessEndDate).format('YYYY');
			} else {
				return assessEndDate;
			}
		};
		const exportResult = async () => {
			state.exportLoading = true;
			state.queryForm.assessStartDate = getAssesStartDate(state.queryForm.value1, state.queryForm.assessCycleType, state.queryForm.assessStartDate);
			state.queryForm.assessEndDate = getAssesEndDate(state.queryForm.value1, state.queryForm.assessCycleType, state.queryForm.assessEndDate);
			let res = await resultExport({ ...{ isAccurate: state.formSchame }, ...state.queryForm });
			let fileName = '绩效结果' + dayjs(new Date()).format('YYYY-MM-DD') + '.xls';
			downloadFile(res, fileName);
			state.exportLoading = false;
		};
		// 返回
		const goBack = () => {
			router.go(-1);
		};
		const handleSizeChange = (val: number) => {
			state.queryForm.limit = val;
			getList();
		};

		const handleCurrentChange = (val: number) => {
			state.queryForm.pageNo = val;
			getList();
		};

		onMounted(() => {
			getDictionaryList();
			state.queryForm.schemeName = route.query.schemeName;
			state.queryForm.schemeRecordId = Number(route.query.id);
			state.formSchame = route.query.schemeName ? true : false;
			if (state.formSchame) {
				//如果是钻取页面，清空日期默认条件
				state.queryForm.assessCycleType = '';
			}
			getList();
		});
		return {
			...toRefs(state),
			...usePageRefs,
			getDictionaryList,
			bandReset,
			onSubmit,
			handleSelectionChange,
			getList,
			getAppState,
			goToDetail,
			exportResult,
			goBack,
			handleSizeChange,
			handleCurrentChange,
			handleSelectedOrgTree,
			getAssesStartDate,
			getAssesEndDate,
			changeAssessCycleType,
		};
	},
});
</script>

<style lang="scss" scoped>
.query_box {
	padding-left: 40px !important;
}
.panl-head {
	width: 100%;
	background: #ffffff;
	min-height: 60px;
	margin-bottom: 8px;
	&--btn {
		position: absolute;
		right: 20px;
		top: 23px;
	}
}
</style>
