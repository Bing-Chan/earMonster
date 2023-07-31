<template>
	<div>
		<el-table :data="tableData" @selection-change="handleSelectionChange" stripe border style="width: 100%">
			<template #empty><SysEmpty></SysEmpty></template>
			<el-table-column type="selection" align="center" width="55" v-if="listType == 1 || listType == 3"> </el-table-column>
			<el-table-column type="index" label="序号" width="65" align="center"></el-table-column>
			<el-table-column prop="schemeName" label="考核表名称" align="center" width="200px">
				<template #default="scope">
					<el-button type="text" @click="goToDetail(scope.row)">{{ scope.row.schemeName }}</el-button>
				</template>
			</el-table-column>
			<el-table-column label="适用类型" width="80" align="center">
				<template #default="scope">
					{{ scope.row.jobType == 1 ? '操作工' : '职能' }}
				</template>
			</el-table-column>
			<el-table-column prop="assessCycleTypeValue" label="考核周期" width="80" align="center"></el-table-column>
			<el-table-column prop="assessDateShow" label="考核时间" align="center" width="100px"></el-table-column>
			<el-table-column prop="description" label="描述" align="center" min-width="200" show-overflow-tooltip></el-table-column>
			<el-table-column prop="personNum" label="参与人数" width="80" align="center"></el-table-column>
			<el-table-column prop="recordState" label="状态" align="center" width="80" v-if="listType == 2">
				<template #default="scope">
					{{ getRecordState(scope.row.recordState) }}
				</template>
			</el-table-column>
			<el-table-column prop="initSendTime" label="初次下发时间" align="center" v-if="listType == 3" width="110px"></el-table-column>
			<el-table-column prop="nextSendTime" label="下次下发时间" align="center" v-if="listType == 3" width="110px">
				<template #default="scope">
					{{ scope.row.nextSendTime || '-' }}
				</template>
			</el-table-column>
			<el-table-column prop="sendEndTime" label="下发截止时间" align="center" v-if="listType == 3" width="110px">
				<template #default="scope">
					{{ scope.row.sendEndTime || '-' }}
				</template>
			</el-table-column>
			<el-table-column prop="sendTime" label="考核表下发时间" align="center" v-if="listType !== 3"></el-table-column>
			<el-table-column prop="" label="更新人" align="center" width="120px">
				<template #default="scope">
					{{ !scope.row.updateUserCode ? scope.row.createUser : scope.row.updateUser }}
				</template>
			</el-table-column>
			<el-table-column prop="" label="更新时间" align="center" width="140">
				<template #default="scope">
					{{ scope.row.updateTime || scope.row.createTime }}
				</template>
			</el-table-column>
			<!-- <el-table-column prop="" label="签约" align="center" v-if="listType == 3"></el-table-column> -->
			<el-table-column label="操作" fixed="right" width="150" align="center">
				<template #default="scope">
					<el-button type="text" @click="goToResult(scope.row)" v-if="!Object.is(listType, 3)">查看结果表</el-button>
					<el-button type="text" @click="copyScheme(scope.row)">复制</el-button>
					<el-button type="text" @click="editScheme(scope.row)" v-if="Object.is(listType, 3)">修改</el-button>
				</template>
			</el-table-column>
		</el-table>
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
		<!--预览-->
		<el-dialog :close-on-click-modal="false" :title="schemeTitle" v-model="yulanFlag" style="min-width: 800px" width="80%">
			<report-view ref="dialogRef" :kind="2" :id="schemeId" :source="listType"></report-view>
		</el-dialog>
	</div>
</template>
<script lang="ts">
import Vue, { defineComponent, reactive, onMounted, toRefs, getCurrentInstance, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { listOhter, listtobeIssued } from '/@/api/scheme/index.ts';
import { ElMessage } from 'element-plus';
import { emit } from 'process';
import dayjs from 'dayjs';
import reportView from '/@/views/templateConfig/src/reportView.vue';

export default defineComponent({
	name: 'proList',
	components: {
		reportView,
	},
	props: {
		queryData: {
			type: Object,
			default() {
				return {};
			},
		},
		listType: {
			type: Number,
			default() {
				return 0;
			},
		},
	},
	setup(props, { emit }) {
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			tableData: [],
			total: 0,
			limit: 20,
			pageNo: 1,
			selection: [],
			yulanFlag: false,
			schemeId: 0,
			schemeTitle: '',
		});
		let router = useRouter();
		const getList = async (paneName: any) => {
			let params = {
				limit: state.limit,
				pageNo: state.pageNo,
				recordState: paneName,
				assessCycleType: props.queryData.assessCycleType,
				schemeName: props.queryData.schemeName,
				assessStartDate:
					props.queryData.value1.length > 0
						? Object.is(props.queryData.assessCycleType, 'sys_period_day') || props.queryData.assessCycleType == ''
							? dayjs(props.queryData.value1[0]).format('YYYY-MM-DD')
							: dayjs(props.queryData.value1[0]).format('YYYY-MM')
						: Object.is(props.queryData.assessCycleType, 'sys_period_year') && props.queryData.assessStartDate != ''
						? dayjs(props.queryData.assessStartDate).format('YYYY')
						: props.queryData.assessStartDate,
				assessEndDate:
					props.queryData.value1.length > 0
						? Object.is(props.queryData.assessCycleType, 'sys_period_day') || props.queryData.assessCycleType == ''
							? dayjs(props.queryData.value1[1]).format('YYYY-MM-DD')
							: dayjs(props.queryData.value1[1]).format('YYYY-MM')
						: Object.is(props.queryData.assessCycleType, 'sys_period_year')
						? ''
						: props.queryData.assessEndDate,
			};
			if (paneName == 1 || paneName == 2) {
				//进行中、已完成的考核表
				let res = await listOhter(params);
				if (res.status == 0) {
					state.total = res.data.total;
					state.tableData = res.data.resultData;
				} else {
					ElMessage.error(res.message);
				}
			} else {
				//待下发的考核表

				let res = await listtobeIssued(params);
				if (res.status == 0) {
					state.total = res.data.total;
					state.tableData = res.data.resultData;
				} else {
					ElMessage.error(res.message);
				}
			}
		};
		const handleSizeChange = (val: number) => {
			state.limit = val;
			getList(props.listType);
		};

		const handleCurrentChange = (val: number) => {
			state.pageNo = val;
			getList(props.listType);
		};
		const getRecordState = (status: any) => {
			switch (status) {
				case 1:
					return '进行中';
				case 2:
					return '已完成';
				case 3:
					return '已终止';
			}
		};
		const handleSelectionChange = (val: any) => {
			console.log(val);
			state.selection = val.map((item) => {
				return item.id;
			});
			console.log(state.selection);
			emit('finishSelection', state.selection);
		};
		const goToDetail = (row: any) => {
			//预览
			state.schemeId = row.id;
			state.schemeTitle = row.schemeName;
			state.yulanFlag = true;
			nextTick(() => {
				proxy.$refs.dialogRef.loadSchemeData();
			});
		};
		const goToResult = (row: any) => {
			router.push({
				path: '/schemeResult',
				query: {
					id: row.id,
					schemeName: row.schemeName,
					jobType: row.jobType,
				},
			});
		};
		const copyScheme = (row: any) => {
			console.log(row);
			emit('copyScheme', row);
		};
		const editScheme = (row: any) => {
			console.log(row);
			emit('editScheme', row);
		};
		onMounted(() => {});
		return {
			...toRefs(state),
			getList,
			handleCurrentChange,
			handleSizeChange,
			goToDetail,
			goToResult,
			copyScheme,
			handleSelectionChange,
			getRecordState,
			editScheme,
		};
	},
});
</script>
