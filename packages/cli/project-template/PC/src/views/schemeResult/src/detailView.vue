<template>
	<div>
		<!-- 基本信息-->
		<report-card v-if="(calculateMode == 1)" title="基础信息" :expand="false">
			<div>
				<table class="gridtable" style="width: 100%">
					<tr>
						<td class="td-title">受约人姓名</td>
						<td>{{ info.userName }}</td>
						<td class="td-title">受约人岗位</td>
						<td>{{ info.jobName }}</td>
						<td class="td-title">受约人单位名称</td>
						<td>{{ info.unitName }}</td>
					</tr>

					<tr>
						<td class="td-title">考核时间</td>
						<td>{{ info.assessDate }}</td>
						<td class="td-title">考核周期</td>
						<td>{{ info.assessCycleType }}</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>
				</table>
				<!-- <el-form class="print_form" inline label-position="right" label-width="120px">
					<el-row class="table-col">
						<el-col :span="8" class="table-item">
							<el-form-item label="受约人姓名:" class="item—form"> <span class="detail" style="width: 140px"> </span> </el-form-item
						></el-col>
						<el-col :span="8" class="table-item">
							<el-form-item label="受约人岗位:" class="item—form"> <span class="detail" style="width: 165px"> </span> </el-form-item
						></el-col>
						<el-col :span="8" class="table-item">
							<el-form-item label="受约人单位名称:" label-width="140px" class="item—form">
								<span class="detail" style="width: 150px"> {{ info.unitName }}</span>
							</el-form-item></el-col
						>
					</el-row>
					<el-row class="table-col">
						<el-col :span="8" class="table-item">
							<el-form-item label="考核时间:" class="item—form">
								<span class="detail" style="width: 140px"> {{ info.assessDate }}</span>
							</el-form-item></el-col
						>
						<el-col :span="8" class="table-item">
							<el-form-item label="考核周期:" class="item—form">
								<span class="detail" style="width: 165px"> {{ info.assessCycleType }}</span>
							</el-form-item></el-col
						>
						<el-col :span="8" class="table-item"> </el-col>
					</el-row>
				</el-form> -->
			</div>
		</report-card>

		<report-card v-else title="基础信息" :expand="false">
			<div>
				<table class="gridtable" style="width: 100%">
					<tr>
						<td class="td-title">被考核人姓名</td>
						<td>{{ info.userName }}</td>
						<td class="td-title">被考核人岗位</td>
						<td>{{ info.jobName }}</td>
						<td class="td-title">被考核人单位名称</td>
						<td>{{ info.unitName }}</td>
					</tr>

					<tr>
						<td class="td-title">考核时间</td>
						<td>{{ info.assessDate }}</td>
						<td class="td-title">考核周期</td>
						<td>{{ info.assessCycleType }}</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>
				</table>
				<!-- <el-form class="print_form" inline label-position="right" label-width="120px">
					<el-row>
						<el-col :span="7">
							<el-form-item label="被考核人姓名:" class="item—form">
								<span class="detail" style="width: 140px"> {{ info.userName }}</span>
							</el-form-item></el-col
						>
						<el-col :span="10">
							<el-form-item label="被考核人岗位:" class="item—form">
								<span class="detail" style="width: 165px"> {{ info.jobName }}</span>
							</el-form-item></el-col
						>
						<el-col :span="7">
							<el-form-item label="被考核人单位名称:" label-width="140px" class="item—form">
								<span class="detail" style="width: 150px"> {{ info.unitName }}</span>
							</el-form-item></el-col
						>
					</el-row>
					<el-row>
						<el-col :span="7">
							<el-form-item label="考核时间:" class="item—form">
								<span class="detail" style="width: 140px"> {{ info.assessDate }}</span>
							</el-form-item></el-col
						>
						<el-col :span="10">
							<el-form-item label="考核周期:" class="item—form">
								<span class="detail" style="width: 165px"> {{ info.assessCycleType }}</span>
							</el-form-item></el-col
						>
						<el-col :span="7"> </el-col>
					</el-row>
				</el-form> -->
			</div>
		</report-card>

		<!--遍历所有 指标、一票否决模块-->
		<report-card v-for="(item, index) in moduleList" :expand="false" :key="index" :title="item.moduleName">
			<template #btn>
				<div v-if="calculateMode == 1 && item.moduleType == 'assessment'">
					<span class="tags">模块权重：{{ item.moduleWeight }}</span>
					<span class="tags">模块权重之和：{{ moduleWeightTotal }}</span>
				</div>
			</template>
			<div>
				<table class="gridtable" style="width: 100%">
					<tr v-if="item.moduleType !== 'reject'">
						<th style="width: 55px">序号</th>
						<th style="min-width: 150px">指标名称</th>
						<th style="min-width: 150px">指标描述</th>
						<th style="width: 80px" v-if="calculateMode == 1 && item.moduleType == 'assessment'">权重</th>
						<th style="width: 100px" v-if="calculateMode == 1">评分范围</th>
						<th>评分规则</th>
						<th v-if="item.isShowBaseTarget">基础值</th>
						<th v-if="item.isShowBaseTarget">目标值</th>
						<th style="width: 80px">得分</th>
					</tr>
					<template v-if="item.moduleType !== 'reject'">
						<tr v-for="(item1, index1) in item.moduleQuotaResList" :key="index1">
							<td>{{ index1 + 1 }}</td>
							<td>{{ item1.quotaName }}</td>
							<td>{{ isEmpty(item1.description) }}</td>
							<td v-if="calculateMode == 1 && item.moduleType == 'assessment'">{{ isEmpty(item1.quotaWeight) }}</td>
							<td v-if="calculateMode == 1">{{ isEmpty(item1.scoreRangeStart) + '-' + isEmpty(item1.scoreRangeEnd) }}</td>
							<td>{{ item1.scoringRuleDesc }}</td>
							<td v-if="item.isShowBaseTarget">{{item1.baseVal}}</td>
							<td v-if="item.isShowBaseTarget" >{{item1.targetVal}}</td>
							<td>
								<!-- <el-tooltip placement="top" show-after="200" :fallback-placements="['bottom', 'top', 'right', 'left']" trigger="hover" :width="200">
                  <template #default> -->
								<el-button type="text">{{ item1.scoreStr }}</el-button>
								<!-- </template> -->
								<!-- <template #content>
                    <p>计算参数：</p>
                    <div v-for="record in item1.recordResList" :key="record">
                      <span>{{record.name}} : {{record.value}}{{record.unit}}</span>
                    </div>
                  </template> -->
								<!-- </el-tooltip> -->
							</td>
						</tr>
					</template>

					<tr v-if="item.moduleType == 'reject'">
						<th style="width: 55px">序号</th>
						<th style="width: 200px">否决项</th>
						<th>指标描述(评定规则)</th>
						<th style="width: 100px">是否违反</th>
					</tr>
					<template v-if="item.moduleType == 'reject'">
						<tr v-for="(item1, index1) in item.quotaList" :key="index1">
							<td>{{ index1 + 1 }}</td>
							<td>{{ item1.quotaName }}</td>
							<td>{{ item1.quotaDescription }}</td>
							<td>{{ item1.violationFlag == 1 ? '是' : '否' }}</td>
						</tr>
					</template>
				</table>
			</div>
		</report-card>
		<!-- <div class="modules-box" v-for="(item, index) in moduleList" :key="index">
			<div class="modules-box-title">
				<div class="title">{{ item.moduleName }}</div>
				<div class="tags">模块权重：{{ item.moduleWeight }}</div>
				<div class="tags">模块权重之和：{{ item.moduleWeightTotal }}</div>
			</div>
			<div class="modules-box-content">
				<div>
					<table class="gridtable" style="width: 100%">
						<tr>
							<th style="width: 55px">序号</th>
							<th style="width: 200px">指标名称</th>
							<th style="width: 10%">指标描述</th>
							<th style="width: 80px">权重</th>
							<th style="width: 30%">评分范围</th>
							<th>评分规则</th>
							<th style="width: 80px">得分</th>
						</tr>
						<tr v-for="(item1, index1) in item.quotaList" :key="index1">
							<td>{{ index1 + 1 }}</td>
							<td>{{ item1.quotaName }}</td>
							<td>{{ isEmpty(item1.quotaDescription) }}</td>
							<td>{{ isEmpty(item1.quotaWeight) }}</td>
							<td>{{ isEmpty(item1.scoreRangeStart) + '-' + isEmpty(item1.scoreRangeEnd) }}</td>
							<td>{{ item1.scoringRuleDesc }}</td>
							<td>&nbsp;</td>
						</tr>
					</table>
				</div>
			</div>
		</div> -->
		<!--绩效结果-->
		<report-card title="绩效结果" :expand="false">
			<div>
				<table class="gridtable" style="width: 100%">
					<tr v-if="calculateMode == 1" :style="isTip ? { border: 'solid 2px red' } : ''">
						<td style="width: 80px">上级评价</td>
						<td style="text-align: left"></td>
					</tr>
					<tr>
						<td style="width: 80px">总分</td>
						<td style="text-align: left">{{ resultInfo.totalScoreStr }}</td>
					</tr>
				</table>
			</div>
		</report-card>
	</div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';

import { templateReview } from '/@/api/templateConfig/index.ts';
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';
import { isEmpty } from '/@/utils/other.ts';
import { drillSchemeName, detailPc } from '/@/api/scheme/index.ts';

export default defineComponent({
	props: {
		isTip: {
			type: Boolean,
			default: () => false,
		},
		kind: {
			type: Number,
			default: () => 0,
		},
		id: {
			type: Number,
			default: () => 0,
		},
		source: {
			type: Number,
			default: () => 0,
		},
	},
	name: 'reportView',
	setup(props: any) {
		const state = reactive({
			tableData: {},
			isShow: true,
			loading: false,
			info: {},
			moduleList: [],
			calculateMode: 0,
			moduleWeightTotal: 0,
			resultInfo: {},
		});
		const route: any = useRoute();

		const handleShow = () => {
			state.isShow = !state.isShow;
		};

		const loadPersonData = async () => {
			state.loading = true;
			const res = await detailPc({ resultId: props.id });
			if (res.status == 0) {
				// state.moduleList = res.data.moduleList
				console.log(res);
				state.moduleList = res.data.data.moduleList;
				state.info = res.data.data.basicRes;
				state.resultInfo = JSON.parse(JSON.stringify(state.moduleList.find((x) => x.moduleName == '绩效结果')));
				state.moduleList = state.moduleList.filter((x) => x.moduleName != '绩效结果');
			}
		};

		onMounted(() => {
			loadPersonData();
		});

		return {
			...toRefs(state),
			handleShow,
			isEmpty,
			loadPersonData,
		};
	},
});
</script>

<style lang="scss" scoped>
.modules-box {
	height: auto;
	width: 100%;
	box-sizing: border-box;
	padding: 10px 20px;
	&-title {
		height: 20px;
		line-height: 20px;
		display: flex;
		.title {
			flex: 1;
			height: 20px;
			line-height: 20px;
			padding-left: 8px;
			color: #333;
			border-left: 3px solid $color-primary;
			float: left;

			font-size: 16px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
		}
		.tags {
			margin-right: 10px;
			color: #999;
			font-size: 12px;
		}
		.icon {
			width: 0;
			height: 0;
			position: relative;
			float: left;
			border-bottom: 28px solid $color-primary;
			border-right: 28px solid transparent;
		}
		.btn {
			float: right;
			min-width: 30px;
		}
	}

	&-content {
		padding: 20px 10px;
	}

	.tags {
		margin-left: 20px;
		color: #999;
		font-size: 12px;
	}

	.gridtable {
		font-family: verdana, arial, sans-serif;
		font-size: 11px;
		color: #333333;
		border-width: 1px;
		border-color: #d3d3d3;
		border-collapse: collapse;
		text-align: center;
	}
	.gridtable th {
		border-width: 1px;
		line-height: 30px;
		border-style: solid;
		border-color: #d3d3d3;
		background-color: #f1f1f1;
		text-align: center;
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}
	.gridtable td {
		border-width: 1px;
		padding: 8px;
		border-style: solid;
		border-color: #d3d3d3;
		background-color: #ffffff;

		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}

	.td-title {
		background-color: #f1f1f1 !important;
		color: #666666 !important;
	}
}

.el-divider--horizontal {
	margin: 8px 0px;
}
</style>
