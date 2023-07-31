<template>
	<div>
		<!-- 基本信息-->
		<!-- <report-card v-if="calculateMode == 1"   title="基础信息" :expand="false">
			<div style="margin-bottom: 10px">
				<el-form class="print_form" inline label-position="right" label-width="120px">
					<el-row>
						<el-col :span="8">
							<el-form-item label="受约人姓名:" class="item—form">
								<span class="detail" style="width: 140px"> {{ info.name }}</span>
							</el-form-item></el-col
						>
						<el-col :span="8">
							<el-form-item label="受约人岗位:" class="item—form">
								<span class="detail" style="width: 165px"> {{ info.name }}</span>
							</el-form-item></el-col
						>
						<el-col :span="8">
							<el-form-item label="受约人单位名称:" label-width="140px" class="item—form">
								<span class="detail" style="width: 150px"> {{ info.name }}</span>
							</el-form-item></el-col
						>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label="考核时间:" class="item—form">
								<span class="detail" style="width: 140px"> {{ info.assessDateShow }}</span>
							</el-form-item></el-col
						>
						<el-col :span="8">
							<el-form-item label="考核周期:" class="item—form">
								<span class="detail" style="width: 165px"> {{ info.assessCycleTypeShow }}</span>
							</el-form-item></el-col
						>
						<el-col :span="8"> </el-col>
					</el-row>
				</el-form>
			</div>
		</report-card>

		<report-card v-else title="基础信息" :expand="false">
			<div style="margin-bottom: 10px">
				<el-form class="print_form" inline label-position="right" label-width="120px">
					<el-row>
						<el-col :span="8">
							<el-form-item label="被考核人姓名:" class="item—form">
								<span class="detail" style="width: 140px"> {{ info.name }}</span>
							</el-form-item></el-col
						>
						<el-col :span="8">
							<el-form-item label="被考核人岗位:" class="item—form">
								<span class="detail" style="width: 165px"> {{ info.name }}</span>
							</el-form-item></el-col
						>
						<el-col :span="8">
							<el-form-item label="被考核人单位名称:" label-width="140px" class="item—form">
								<span class="detail" style="width: 150px"> {{ info.name }}</span>
							</el-form-item></el-col
						>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label="考核时间:" class="item—form">
								<span class="detail" style="width: 140px"> {{ info.assessDateShow }}</span>
							</el-form-item></el-col
						>
						<el-col :span="8">
							<el-form-item label="考核周期:" class="item—form">
								<span class="detail" style="width: 165px"> {{ info.assessCycleTypeShow }}</span>
							</el-form-item></el-col
						>
						<el-col :span="8"> </el-col>
					</el-row>
				</el-form>
			</div>
		</report-card> -->

		<!--遍历所有 指标、一票否决模块-->
		<report-card v-for="(item, index) in moduleList" :expand="false" :key="index" :title="item.moduleName">
			<template #btn>
				<div v-if="calculateMode == 1 && item.moduleType == 'assessment'">
					<span class="tags">模块权重：{{ item.moduleWeight }}</span>
					<span class="tags">模块权重之和：{{ moduleWeightTotal }}</span>
				</div>
			</template>
			<div style="margin-bottom: 10px">
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
						<tr v-for="(item1, index1) in item.quotaList" :key="index1">
							<td>{{ index1 + 1 }}</td>
							<td>{{ item1.quotaName }}</td>
							<td>{{ isEmpty(item1.quotaDescription) }}</td>
							<td v-if="calculateMode == 1 && item.moduleType == 'assessment'">{{ isEmpty(item1.quotaWeight) }}</td>
							<td v-if="calculateMode == 1">{{ isEmpty(item1.scoreRangeStart) + '-' + isEmpty(item1.scoreRangeEnd) }}</td>
							<td>{{ item1.scoringRuleDesc }}</td>
							<td v-if="item.isShowBaseTarget">-</td>
							<td v-if="item.isShowBaseTarget" >-</td>
							<td>&nbsp;</td>
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
							<td>{{ item1.description }}</td>
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
			<div style="margin-bottom: 10px">
				<table class="gridtable" style="width: 100%">
					<tr v-if="isTip" :style="{ border: 'solid 2px red' }">
						<td style="width: 80px">上级评价</td>
						<td style="text-align: left">&nbsp;</td>
					</tr>
					<template v-if="calculateMode == 1 && !isTip">
						<tr v-for="(item, index) in jixiaoInfo.flowNodeName" :key="index">
							<td style="width: 80px">{{ item }}</td>
							<td style="text-align: left">&nbsp;</td>
						</tr>
					</template>
					<tr>
						<td style="width: 80px">总分</td>
						<td style="text-align: left"></td>
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
import { drillSchemeName } from '/@/api/scheme/index.ts';

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
			jixiaoInfo: {},
			calculateMode: 1,
			moduleWeightTotal: 0,
		});
		const route: any = useRoute();

		const handleShow = () => {
			state.isShow = !state.isShow;
		};

		const loadData = async () => {
			state.loading = true;
			const res = await templateReview({ templateId: route.query.templateId });
			state.loading = false;
			if (res.status == 0) {
				state.moduleList = res.data.moduleList.filter((x) => x.moduleName !== '绩效结果');
				state.jixiaoInfo = res.data.moduleList.find((x) => x.moduleName == '绩效结果');
				state.moduleWeightTotal = res.data.moduleWeightTotal;
			} else {
				ElMessage.warning(res.message);
			}
		};

		const loadSchemeData = async () => {
			state.loading = true;
			let params = {
				source: props.source,
				drillId: props.id,
			};
			const res = await drillSchemeName(params);
			state.loading = false;
			if (res.status == 0) {
				state.calculateMode = res.data.calculateMode;
				state.info.assessCycleTypeShow = res.data.assessCycleTypeShow;
				state.info.assessDateShow = res.data.assessDateShow;
				state.moduleList = res.data.moduleList.filter((x) => x.moduleName !== '绩效结果');
				state.moduleWeightTotal = res.data.moduleWeightTotal;
			} else {
				ElMessage.error(res.message);
			}
		};

		onMounted(() => {
			if (props.kind == 2) {
				loadSchemeData();
			} else {
				state.calculateMode = parseInt(route.query.calculateMode);
				loadData();
			}
		});

		return {
			...toRefs(state),
			handleShow,
			loadData,
			isEmpty,
			loadSchemeData,
		};
	},
});
</script>

<style lang="scss" scoped>
.modules-box {
	height: auto;
	width: 100%;
	box-sizing: border-box;
	padding:10px 20px;
	margin-bottom: 0;
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
}

.el-divider--horizontal {
	margin: 8px 0px;
}
</style>
