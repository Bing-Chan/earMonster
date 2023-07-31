<template>
	<!-- 开始配置模板-->
	<div id="pages">
		<!--标题-->
		<div class="panl-head">
			<div class="panl-head--title">
				<h3>{{ templateName }}</h3>
				<span>考核流程：{{ !flowName || flowName == '' ? '无' : flowName }}</span>
			</div>
			<div class="panl-head--btn">
				<el-button type="primary" @click="goBack" size="small">返回</el-button>
			</div>
		</div>
		<div class="alert-title" v-if="isAlertTitle">
			<el-alert
				@click="handleCloseTitle"
				title="修改绩效模板不会影响已下发的绩效考核表，如需对已下发的考核表生效需进入考核表的详情页签下修改 "
				type="warning"
				show-icon
			/>
		</div>
		<div class="panl-container" :style="{ height: panlHeight }">
			<el-scrollbar class="layout-scrollbar" ref="layoutScrollbarRef">
				<div class="panl-container-left">
					<draggable
						class="dragArea list-group w-full"
						v-model="modelList"
						handle=".panl-container-left--card"
						@change="startDrag"
						tag="transition-group"
						force-fallback="true"
						animation="300"
						ghostClass="ghost"
					>
						<transition-group>
							<el-card
								v-for="element in modelList"
								:key="element.moduleName"
								:class="selectModelId == element.id ? 'panl-container-left--card selected' : 'panl-container-left--card'"
							>
								<div @click="handleModelClick(element)">
									<el-row class="title">
										<el-col :span="20">
											<p class="title-btn">
												{{ element.moduleName == '' ? '待编辑' : element.moduleName }}
											</p>
										</el-col>
										<el-col :span="4">
											<el-button type="text" @click.stop="handleModuleDelete(element)" style="float: right">
												<SvgIcon :name="'elementClose'" size="16"></SvgIcon>
											</el-button>
										</el-col>
									</el-row>
									<el-row>
										<el-col class="tag">
											<el-tag v-if="getTagStyle(element.moduleType) == 'success'" class="ml-2" type="success">指标评估</el-tag>
											<el-tag v-else-if="getTagStyle(element.moduleType) == 'danger'" class="ml-2" type="danger">一票否决</el-tag>
											<el-tag v-else class="ml-2">绩效结果</el-tag>
											&nbsp;&nbsp;<el-tag
												v-if="getTagStyle(element.moduleType) == 'success' && element.moduleWeight > 0"
												type="info"
												effect="plain"
												class="ml-2"
												>权重：{{ element.moduleWeight }}</el-tag
											>
										</el-col>
									</el-row>
								</div>
							</el-card>
						</transition-group>
					</draggable>
					<el-card
						style="margin-bottom: 50px"
						:class="selectModelId == jixiaoModelInfo.id ? 'panl-container-left--card selected' : 'panl-container-left--card'"
					>
						<div @click="handleModelClick(jixiaoModelInfo)">
							<el-row class="title">
								<el-col :span="24">
									<p class="title-btn">{{ jixiaoModelInfo.moduleName }}</p>
								</el-col>
							</el-row>
							<el-row>
								<el-col class="tag">
									<el-tag class="ml-2">{{ jixiaoModelInfo.moduleName }}</el-tag>
								</el-col>
							</el-row>
						</div>
					</el-card>

					<!--操作按钮浮动框-->
					<div class="panl-container-left--btn">
						<el-tooltip placement="top" :show-after="200" content="新增模块">
							<el-button id="addModel" @click="handleAdd(AddType.ADD_MODEL, $event)" type="primary" circle>
								<SvgIcon :size="18" :name="'elementPlus'" />
							</el-button>
						</el-tooltip>
						<el-tooltip placement="top" :show-after="200" content="预览模板">
							<el-button @click="handleReview" type="primary" circle>
								<SvgIcon :size="18" :name="'elementDocument'" />
							</el-button>
						</el-tooltip>
					</div>
				</div>
			</el-scrollbar>
			<div v-loading="modelLoading" class="panl-container-right leftpx">
				<el-scrollbar class="layout-scrollbar">
					<div class="right-form">
						<!---模块基本信息-->
						<report-card title="基本信息" v-if="['success', 'danger'].includes(getTagStyle(modelForm.moduleType))">
							<div>
								<el-form ref="basicRef" :model="modelForm" :rules="modelRules" label-position="right" label-width="140px">
									<el-row>
										<el-col :span="12">
											<el-form-item label="模块名称" prop="moduleName">
												<el-input v-model.trim="modelForm.moduleName" style="width: 100%" maxlength="100"></el-input> </el-form-item
										></el-col>
										<el-col :span="12">
											<el-form-item label="模块类型" prop="moduleType">
												<el-select disabled v-model="modelForm.moduleType" style="width: 100%" placeholder="请选择模块类型">
													<el-option key="assessment" label="指标评估" value="assessment" />
													<el-option key="reject" v-if="jobType == 2" label="一票否决" value="reject" />
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="12" v-if="jobType == 2 && modelForm.moduleType != 'reject'">
											<el-form-item label="展示基础值、目标值" prop="isShowBaseTarget">
												<el-switch size="large" v-model="modelForm.isShowBaseTarget" />
											</el-form-item>
										</el-col>

										<el-col :span="12" v-if="calculateMode == 1 && modelForm.moduleType == 'assessment'">
											<el-form-item label="模块权重" prop="moduleWeight">
												<el-input
													v-model.trim="modelForm.moduleWeight"
													oninput="only_input_number(this)"
													@blur="modelForm.moduleWeight = $event.target.value"
													style="width: 100%"
													maxlength="100"
												></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="24">
											<el-form-item label="描述" prop="description">
												<el-input
													v-model.trim="modelForm.description"
													show-word-limit
													:rows="3"
													style="width: 100%"
													type="textarea"
													maxlength="100"
												></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-form>
							</div>
						</report-card>
						<!--指标列表-->
						<report-card title="指标列表" v-if="getTagStyle(modelForm.moduleType) == 'success'">
							<div style="margin-bottom: 10px">
								<el-table :data="zhibiaoList" stripe border style="width: 100%">
									<template #empty><SysEmpty></SysEmpty></template>
									<el-table-column type="index" width="60" label="序号" align="center"></el-table-column>
									<el-table-column prop="quotaName" label="指标名称" align="center"></el-table-column>
									<el-table-column prop="quotaDescription" label="指标描述" align="center"></el-table-column>
									<el-table-column show-overflow-tooltip prop="scoringRuleDesc" label="评分规则" align="center"></el-table-column>
									<template v-if="calculateMode == 1">
										<el-table-column prop="quotaWeight" label="权重" align="center"></el-table-column>
									</template>
									<el-table-column label="操作" width="120" align="center">
										<template #default="scope">
											<el-button type="text" @click="handlezhibiaoEdit(scope.row)">修改</el-button>
											<el-button type="text" @click="handlezhibiaoCopy(scope.row)">复制</el-button>
											<el-button type="text" @click="handleRmove(scope.row, AddType.ADD_ZHIBIAO, $event)">删除</el-button>
										</template>
									</el-table-column>
								</el-table>
							</div>
							<template #footer>
								<el-button type="primary" @click="handleAdd(AddType.ADD_ZHIBIAO, $event)">引入指标</el-button>
							</template>
						</report-card>
						<!--一票否决项-->
						<report-card title="一票否决项" v-if="getTagStyle(modelForm.moduleType) == 'danger'">
							<div style="margin-bottom: 10px">
								<el-table :data="yipiaoList" stripe border style="width: 100%">
									<template #empty><SysEmpty></SysEmpty></template>
									<el-table-column type="index" width="60" label="序号" align="center"></el-table-column>
									<el-table-column prop="quotaName" label="名称" align="center"></el-table-column>
									<el-table-column prop="description" label="评定标准" align="center"></el-table-column>
									<el-table-column label="操作" width="120" align="center">
										<template #default="scope">
											<el-button type="text" @click="handleRmove(scope.row, AddType.ADD_YIPIAOFOUJUE, $event)">删除</el-button>
										</template>
									</el-table-column>
								</el-table>
							</div>
							<template #footer>
								<el-button type="primary" @click="handleAdd(AddType.ADD_YIPIAOFOUJUE, $event)">引入一票否决项</el-button>
							</template>
						</report-card>
						<!--各步骤参与角色及权限控制-->
						<report-card title="各步骤参与角色及权限控制" v-if="hasFlow() && ['success', 'danger'].includes(getTagStyle(modelForm.moduleType))">
							<div class="step-wapper" style="margin-bottom: 100px">
								<el-row class="model-item">
									<el-col>
										<el-steps :active="stepState">
											<el-step v-for="item in flowData" :key="item.flowNodeId" :title="item.nodeName" @click="handleStep(item)">
												<template #icon>
													<font-awesome-icon icon="circle" />
												</template>
											</el-step>
											<el-step :key="flowData.length + 1" title="结束">
												<template #icon>
													<font-awesome-icon icon="circle" />
												</template>
											</el-step>
										</el-steps>
									</el-col>
								</el-row>
								<el-row class="model-item step-wapper-form">
									<el-col :span="14">
										<el-form ref="flowFormRef" :inline="true" :model="flowFormAdd" :rules="flowFormRules" label-position="right" label-width="155px">
											<el-row>
												<el-col>
													<el-form-item label="角色" prop="roleName">
														<span>{{ flowFormAdd.roleName }}</span>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col>
													<el-form-item label="模块可见设置" prop="moduleDisplay">
														<el-radio-group v-model="flowFormAdd.moduleDisplay" class="ml-4">
															<el-radio :label="true" size="large">可见</el-radio>
															<el-radio v-if="flowFormAdd.nodeType == 'sys_node_evaluation'" :label="false" size="large">不可见</el-radio>
														</el-radio-group>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row v-if="flowFormAdd.nodeType == 'sys_node_evaluation'">
												<el-col>
													<el-form-item label="指标可见/可评分设置" prop="quotaAuth">
														<el-radio-group v-model="flowFormAdd.quotaAuth" class="ml-4">
															<el-radio :label="true" size="large">全部可见可评分</el-radio>
															<el-radio :label="false" size="large">部分</el-radio>
														</el-radio-group>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row v-if="!flowFormAdd.quotaAuth && flowFormAdd.nodeType == 'sys_node_evaluation'">
												<el-col>
													<el-form-item :label="' '">
														<table class="gridtable">
															<tr>
																<th>名称</th>
																<th style="width: 80px">可见</th>
																<th style="width: 100px">可评分</th>
															</tr>
															<tr v-for="(item, index) in flowFormAdd.moduleQuotaAuthList" :key="index">
																<td>{{ item.quotaName }}</td>
																<td><el-checkbox v-model="item.display"></el-checkbox></td>
																<td><el-checkbox :disabled="item.quotaTypeId == 2" v-model="item.scorable"></el-checkbox></td>
															</tr>
															<!-- <tr>
																<td colspan="3">暂无数据</td>
															</tr> -->
														</table>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row v-if="flowFormAdd.nodeType == 'sys_node_evaluation'">
												<el-col>
													<el-form-item label="完成情况" prop="completionColumn">
														<el-switch size="large" v-model="flowFormAdd.completionColumn" />
													</el-form-item>
													<el-form-item label-width="80px" label="" v-if="flowFormAdd.completionColumn"
														><el-checkbox v-model="flowFormAdd.commentRequir" label="必填" size="large"
													/></el-form-item>
												</el-col>
											</el-row>
											<el-row v-if="flowFormAdd.nodeType == 'sys_node_evaluation'">
												<el-col>
													<el-form-item label="评分" prop="scoringColumn">
														<el-switch size="large" v-model="flowFormAdd.scoringColumn" />
													</el-form-item>
													<el-form-item label-width="70px" label="权重" prop="scoringWeight" v-if="flowFormAdd.scoringColumn">
														<el-input
															v-model.trim="flowFormAdd.scoringWeight"
															oninput="only_input_number(this)"
															@blur="flowFormAdd.scoringWeight = $event.target.value"
															style="width: 80px"
															maxlength="100"
														></el-input
														>%
													</el-form-item>
												</el-col>
											</el-row>
										</el-form>
									</el-col>
								</el-row>
							</div>
						</report-card>
						<!--绩效结果-->
						<report-card title="绩效结果" v-if="getTagStyle(modelForm.moduleType) == 'info'">
							<div>
								<el-form ref="jixiaoRef" :model="modelForm" label-position="right" label-width="120px">
									<el-form-item label="评语" v-if="hasFlow()">
										<div class="pingyu-wapper">
											<div class="pingyu-wapper--switch">
												<el-switch v-model="modelForm.commentRow" />
											</div>
											<div class="pingyu-wapper--checkbox">
												<el-checkbox v-model="modelForm.commentRequir">必填</el-checkbox>
											</div>
											<div class="pingyu-wapper--tip">
												<div style="width: 450px">
													该评语开启，显示在最后的考核结果中，选中几个节点，几行评语，示例
													<el-popover placement="right" :fallback-placements="['bottom', 'top', 'right', 'left']" :width="800" trigger="hover">
														<template #reference>
															<SvgIcon :name="'elementInfoFilled'"></SvgIcon>
														</template>
														<report-view :is-tip="true"></report-view>
													</el-popover>
												</div>
											</div>
										</div>
									</el-form-item>
									<el-form-item v-if="hasFlow()" label=" ">
										<el-checkbox-group v-model="moduleAuthList">
											<el-checkbox
												v-for="item in flowData.filter((x) => x.nodeType == 'sys_node_evaluation')"
												:key="item.flowNodeId"
												:label="item.flowNodeId"
												>{{ item.nodeName }}</el-checkbox
											>
										</el-checkbox-group>
									</el-form-item>
									<el-form-item label="总分">
										<el-switch disabled v-model="modelForm.totalScoreDisplay" />
									</el-form-item>
									<!-- <el-form-item v-if="calculateMode == 1" label="总等级">
										<el-switch v-model="modelForm.totalGradeDisplay" />
									</el-form-item> -->
								</el-form>
							</div>
						</report-card>
					</div>
					<div class="submit-btn" v-if="isModelEdit">
						<el-button type="default" @click="handleCancel" :loading="loading" size="small">取 消</el-button>
						<el-button type="primary" @click="handleSave" :loading="loading" size="small">保 存</el-button>
					</div>
				</el-scrollbar>
			</div>
		</div>
		<!--新增模块-->
		<el-dialog :close-on-click-modal="false" title="新增模块" center v-model="modelFlag" width="600px">
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form ref="modelRef" :model="modelFormAdd" :rules="modelRules" label-position="right" label-width="110px">
						<el-form-item label="模块名称" prop="moduleName">
							<el-input v-model.trim="modelFormAdd.moduleName" style="width: 100%" maxlength="100"></el-input>
						</el-form-item>
						<el-form-item label="模块类型" prop="moduleType">
							<el-select v-model="modelFormAdd.moduleType" style="width: 100%" placeholder="请选择模块类型">
								<el-option key="assessment" label="指标评估" value="assessment" />
								<el-option key="reject" label="一票否决" value="reject" v-if="jobType == 2" />
							</el-select>
						</el-form-item>
						<!-- 标题宽度发生变化后请处理此处 -->
						<el-form-item
							label-width="180px"
							v-if="jobType == 2 && modelFormAdd.moduleType != 'reject'"
							label="展示基础值、目标值"
							prop="isShowBaseTarget"
						>
							<el-switch size="large" v-model="modelFormAdd.isShowBaseTarget" />
						</el-form-item>
						<el-form-item label="模块权重" prop="moduleWeight" v-if="calculateMode == 1 && modelFormAdd.moduleType == 'assessment'">
							<el-input
								oninput="only_input_number(this)"
								@blur="modelFormAdd.moduleWeight = $event.target.value"
								v-model.trim="modelFormAdd.moduleWeight"
								style="width: 100%"
								maxlength="100"
							></el-input>
						</el-form-item>
						<el-form-item label="描述" prop="description">
							<el-input
								v-model.trim="modelFormAdd.description"
								show-word-limit
								:rows="3"
								style="width: 100%"
								type="textarea"
								maxlength="100"
							></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="handleClose(AddType.ADD_MODEL, $event)" size="small">取 消</el-button>
					<el-button type="primary" @click="handleModelSave" :loading="loading" size="small">保 存</el-button>
				</span>
			</template>
		</el-dialog>
		<!--指标引入-->
		<el-dialog :close-on-click-modal="false" :title="zhibiaoTitle" center v-model="zhibiaoFlag" width="800px">
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form ref="zhibiaoRef" :model="zhibiaoFormAdd" :rules="zhibiaoRules" label-position="right" label-width="80px">
						<el-form-item label="指标名称" prop="quotaName">
							<search
								:disabled="zhibiaoTitle == '修改'"
								@change="handleZhibiaoChange"
								:control-type="SearchEnum.ZHIBIAO"
								v-model="zhibiaoFormAdd.quotaName"
								:suitable-code="suitableCode"
								:isCaoZuo="jobType === 1"
								suitable-filter-flag
							></search>
						</el-form-item>
						<el-form-item label="指标描述" prop="quotaDescription">
							<el-input
								type="textarea"
								rows="3"
								show-word-limit
								v-model.trim="zhibiaoFormAdd.quotaDescription"
								style="width: 100%"
								maxlength="100"
							></el-input>
						</el-form-item>
						<el-form-item label="评分规则" prop="scoringRuleDesc">
							<el-input disabled type="textarea" rows="3" v-model.trim="zhibiaoFormAdd.scoringRuleDesc" style="width: 100%"></el-input>
						</el-form-item>
						<!-- <el-form-item label="得分来源" prop="guidelineFlag">
							<el-radio-group v-model="zhibiaoFormAdd.guidelineFlag" class="ml-4">
								<el-radio :label="1" size="large">人工评分</el-radio>
								<el-radio :label="2" size="large">系统计算</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="计算公式" prop="calculationFormula" v-if="zhibiaoFormAdd.guidelineFlag == 2">
							<formula
								@complete="handleFormulaComplete"
								v-model:modeValue="zhibiaoFormAdd.calculationFormula"
								:zhibiao-list="zhibiaoFormAdd.calculationFormulaItem"
								:jobType="jobType"
							></formula>
						</el-form-item> -->
						<el-form-item label="指标权重" prop="quotaWeight" v-if="calculateMode == 1">
							<el-input
								oninput="only_input_number(this)"
								@blur="zhibiaoFormAdd.quotaWeight = $event.target.value"
								v-model.trim="zhibiaoFormAdd.quotaWeight"
								style="width: 120px"
								maxlength="100"
							></el-input>

							<div class="input-tips">
								1.本模块权重为{{ modelForm.moduleWeight }}，请输入0-{{ modelForm.moduleWeight }} <br />2.如果是扣分项，不设定权重，权重输入0
							</div>
						</el-form-item>
						<el-form-item label="评分范围" v-if="calculateMode == 1" prop="scoreRangeStart">
							<el-input-number min="0" :max="zhibiaoFormAdd.maxquotaWeight" v-model="zhibiaoFormAdd.scoreRangeStart" /><span style="padding: 0px 15px"
								>-</span
							><el-input-number min="0" :max="zhibiaoFormAdd.maxquotaWeight" v-model="zhibiaoFormAdd.scoreRangeEnd" />
						</el-form-item>
						<el-form-item label="备注" prop="description" v-if="calculateMode == 1">
							<el-input
								type="textarea"
								show-word-limit
								rows="3"
								v-model.trim="zhibiaoFormAdd.description"
								style="width: 100%"
								maxlength="100"
							></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<template #footer>
				<el-button @click="handleClose(AddType.ADD_ZHIBIAO, $event)" size="small">取 消</el-button>
				<el-button type="primary" @click="handlezhibiaoSave" :loading="loading" size="small">保 存</el-button>
			</template>
		</el-dialog>
		<!--引入一票否决项-->
		<el-dialog :close-on-click-modal="false" title="引入一票否决项" center v-model="yipiaoFlag" width="800px">
			<yipiao-page ref="yipiaoPageRef"></yipiao-page>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="handleClose(AddType.ADD_YIPIAOFOUJUE, $event)" size="small">取 消</el-button>
					<el-button type="primary" @click="handleyipiaoSave" :loading="loading" size="small">保 存</el-button>
				</span>
			</template>
		</el-dialog>
		<!--预览-->
		<el-dialog :close-on-click-modal="false" title="预览模板" v-model="yulanFlag" style="min-width: 800px" width="80%">
			<report-view ref="reportRef"></report-view
		></el-dialog>
		<!--新手引导页 by Bing.Chan-->
		<intro-step v-model:show="show" :config="config">
			<template #done>
				<button class="intro-step-btn" @click="stepComplete">开始添加</button>
			</template>
		</intro-step>
	</div>
</template>
<script lang="ts">
import { toRefs, reactive, ref, onMounted, nextTick, getCurrentInstance, watch, unref, onBeforeMount } from 'vue';
// import dayjs from 'dayjs';
import yipiaoPage from './src/yipiaoPage.vue';
import reportView from './src/reportView.vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { modelDetail, AddType, modelAdd, getModelList, modelSave, modelDelete, modelSort } from '/@/api/templateConfig/index.ts';
import { getFlowNode } from '/@/api/flow/index.ts';
import { SearchEnum } from '/@/enums/Search.ts';
import Search from '/@/components/Search.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { getTagStyle, formRulesValidate } from '/@/utils/other.ts';
import { store } from '/@/store/index';

export default {
	name: '模板配置',
	components: {
		draggable: VueDraggableNext,
		search: Search,
		yipiaoPage,
		reportView,
	},
	setup() {
		interface ListItem {
			value: string;
			label: string;
		}

		const route: any = useRoute();
		const router: any = useRouter();
		const { proxy } = getCurrentInstance() as any;
		const modelRef = ref();
		const zhibiaoRef = ref();
		const loading = ref(false);
		const options = ref<ListItem[]>([]);

		const state = reactive({
			isAlertTitle: true,
			isModelEdit: false,
			templateName: '',
			suitableCode: '',
			jobType: 1, //操作工
			flowName: '',
			flowId: '1',
			templateId: 0,
			calculateMode: 1, // 职能
			modelList: [],
			selectModelId: 4,
			moduleAuthList: [],
			modelFormAdd: {
				moduleName: '',
				moduleType: 'assessment',
				description: '',
				isShowBaseTarget: false,
			},
			zhibiaoFormAdd: {
				quotaId: '',
				quotaName: '',
				guidelineFlag: '',
				calculationFormula: '',
				calculationFormulaStr: '',
				calculationFormulaItem: '',
				quotaWeight: '',
				scoringRuleDesc: '',
				description: '',
				quotaDescription: '',
				scoreRangeStart: '',
				scoreRangeEnd: '',
				quotaTypeId: '',
				maxquotaWeight: 1,
			},
			flowFormAdd: {
				moduleDisplay: true, // 模块是否可见
				quotaAuth: true, // 指标可见/可评分设置 0：部分可见（查询指标权限配置表） 1：全部可见可评分
				completionColumn: false, // 完成情况列 ;0：否 1：是
				scoringColumn: true, // 评分列 ;0：否 1：是
				scoringWeight: '',
				moduleQuotaAuthList: [], // 勾选指标
			},
			flowFormRules: {
				moduleDisplay: [{ required: true, message: '请选择模块可见', trigger: 'change' }],
				quotaAuth: [{ required: true, message: '请选择指标可见/可评分设置', trigger: 'change' }],
				completionColumn: [{ required: true, message: '请选择完成情况', trigger: 'change' }],
				scoringColumn: [{ required: true, message: '请选择评分', trigger: 'change' }],
				scoringWeight: [{ required: true, message: '请输入权重', trigger: 'blur' }],
			},
			modelRules: {
				moduleName: [{ required: true, message: '请输入模块名称', trigger: 'blur' }],
				moduleType: [{ required: true, message: '请输入类型', trigger: 'blur' }],
				moduleWeight: [{ required: true, message: '请输入模块权重', trigger: 'blur' }],
			},
			zhibiaoRules: {},
			//模块表单
			modelForm: {
				moduleName: '',
				moduleType: 'assessment',
				description: '',
				moduleWeight: '',
				moduleOrder: 0,
				totalGradeDisplay: false,
				totalScoreDisplay: true,
				isShowBaseTarget: false,
			},
			flowList: [], // 原始节点数据
			flowData: [], // 流程保存数据
			yipiaoList: [], //一票否决集合
			zhibiaoList: [], // 指标集合
			modelLoading: false,
			modelFlag: false, // 新增模块弹框
			zhibiaoFlag: false, // 指标弹框
			yipiaoFlag: false, // 指标弹框
			jisuangongshiFlag: false, //计算公式抽屉
			yulanFlag: false, //预览
			tableData: [],
			zhibiaoTitle: '指标引入',
			stepState: 1,
			jixiaoModelInfo: {},
			panlHeight: 'calc(100vh - 130px)',

			show: false,
			config: {
				backgroundOpacity: 0.5,
				titleStyle: {
					textAlign: 'left',
					fontSize: '19px',
				},
				contentStyle: {
					textAlign: 'left',
					fontSize: '15px',
				},
				tips: [
					{
						el: '#addModel',
						tipPosition: 'top',
						title: '新增模块',
						content: '点击此处添加模块',
					},
				],
			},
		});

		const validNumber = async (rule: any, value: any, callback: any) => {
			if (value == '') {
				callback();
			} else {
				var reg = /^[0-9]*$/;
				if (!reg.test(value)) {
					callback(new Error('只能输入数字'));
				} else if (parseInt(value) > parseInt(state.modelForm.moduleWeight)) {
					callback(new Error('只能输入数字且不能大于模块权重'));
				}
			}
			callback();
		};

		state.zhibiaoRules = {
			quotaName: [{ required: true, message: '请输入指标名称', trigger: 'blur' }],
			guidelineFlag: [{ required: true, message: '请选择得分来源', trigger: 'change' }],
			quotaWeight: [
				{ required: true, message: '请输入权重', trigger: 'change' },
				{ validator: validNumber, trigger: 'change' },
			],
		};

		const startDrag = async () => {
			const res = await modelSort({
				moduleSortListReqList: state.modelList.map((x, index) => {
					return {
						moduleId: x.id,
						sortNo: index + 1,
					};
				}),
			});
			if (res.status == 0) {
				init();
			} else {
				ElMessage.warning(res.message);
			}
		};

		/***
		 * 模块切换
		 * element 当前行
		 * isLoading 是否加载页面
		 */
		const handleModelClick = async (element: any, isLoading: boolean = false) => {
			if (!isLoading && state.isModelEdit) {
				ElMessage.error('离开前请先保存~');
				return false;
			}
			restFiled();
			//切换之前初始化数据
			state.flowData = JSON.parse(
				JSON.stringify(
					state.flowList.map((x) => {
						return {
							...x,
							...{
								moduleDisplay: true, // 模块是否可见
								quotaAuth: true, // 指标可见/可评分设置 0：部分可见（查询指标权限配置表） 1：全部可见可评分
								completionColumn: false, // 完成情况列 ;0：否 1：是
								scoringColumn: true, // 评分列 ;0：否 1：是
								scoringWeight: '',
								moduleQuotaAuthList: [],
							},
						};
					})
				)
			);

			if (element.moduleName == '') {
				state.isModelEdit = true;
				return false;
			}
			state.modelLoading = true;
			const res = await modelDetail({ moduleId: element.moduleId, moduleType: element.moduleType });
			if (res.status == 0) {
				//初始化模块
				// 基础信息
				state.modelForm = res.data;
				state.modelForm.moduleOrder = element.moduleOrder;
				switch (element.moduleType) {
					case 'assessment':
						state.zhibiaoList = res.data.moduleQuotaList ?? [];
						// 流程信息初始化
						if (res.data.moduleAuthList && res.data.moduleAuthList.length > 0) {
							state.flowData.forEach((x) => {
								let info = res.data.moduleAuthList.find((y) => y.flowNodeId == x.flowNodeId);
								if (info) {
									for (let key in info) {
										x[key] = info[key];
									}
								}
							});
						}
						if (state.flowData.length > 0) {
							state.flowFormAdd = JSON.parse(JSON.stringify(state.flowData[0]));
						}
						break;
					case 'reject':
						state.yipiaoList = res.data.moduleQuotaList ?? [];
						// 流程信息初始化
						if (res.data.moduleAuthList && res.data.moduleAuthList.length > 0) {
							state.flowData.forEach((x) => {
								let info = res.data.moduleAuthList.find((y) => y.flowNodeId == x.flowNodeId);
								if (info) {
									for (let key in info) {
										x[key] = info[key];
									}
								}
							});
						}
						if (state.flowData.length > 0) {
							state.flowFormAdd = JSON.parse(JSON.stringify(state.flowData[0]));
						}
						break;
					default:
						// 绩效
						if (res.data.moduleAuthList && res.data.moduleAuthList.length > 0) {
							state.moduleAuthList = res.data.moduleAuthList.map((x) => {
								return x.flowNodeId;
							});
						}
						break;
				}
				state.modelForm.moduleId = element.moduleId;
			}
			state.selectModelId = element.moduleId;
			setTimeout(() => {
				state.modelLoading = false;
			}, 500);
		};

		const restFiled = () => {
			// 初始化基本信息
			state.modelForm = {
				moduleName: '',
				moduleType: 'assessment',
				description: '',
				moduleWeight: '',
				totalGradeDisplay: true,
			};
			// 初始化指标、一票否决
			// 初始化流程权限
			if (proxy.$refs.flowFormRef) {
				proxy.$refs.flowFormRef.resetFields();
			}
		};

		// 打开弹框
		const handleAdd = async (addType: AddType, evt: any) => {
			if (state.isModelEdit && addType == AddType.ADD_MODEL) {
				ElMessage.error('离开前请先保存~');
				return false;
			}
			state[`${addType}Flag`] = true;
			await nextTick();
			if (proxy.$refs[`${addType}Ref`]) {
				proxy.$refs[`${addType}Ref`].resetFields();
				proxy.$refs[`${addType}Ref`].clearValidate();
			}
			state.zhibiaoTitle = '引入指标';
			state.zhibiaoFormAdd.calculationFormula = '';
			state.zhibiaoFormAdd.calculationFormulaItem = '';
		};

		// 取消
		const handleClose = (addType: AddType, evt: any) => {
			state[`${addType}Flag`] = false;
		};

		// 保存模块
		const handleSave = async () => {
			Promise.all([
				formRulesValidate(proxy.$refs.basicRef),
				formRulesValidate(proxy.$refs.flowFormRef),
				formRulesValidate(proxy.$refs.jixiaoRef),
			]).then(async () => {
				//存在流程的情况
				if (state.flowData.length > 0) {
					for (let key in state.flowFormAdd) {
						state.flowData[state.stepState - 1][key] = state.flowFormAdd[key];
					}
				}
				// 开始组装数据
				let params = {
					templateId: state.templateId,
					...state.modelForm,
					templateModuleId: state.modelForm.moduleId,
					moduleQuotaList: state.modelForm.moduleType === 'assessment' ? state.zhibiaoList : state.yipiaoList,
					moduleAuthList: state.flowData,
				};

				// 绩效结果保存
				if (state.modelForm.moduleType === 'result') {
					params = {
						templateId: state.templateId,
						templateModuleId: state.modelForm.moduleId,
						...state.modelForm,
					};
					if (state.modelForm.commentRow) {
						params['moduleAuthList'] = state.moduleAuthList.map((x: any) => {
							return {
								moduleAuthId: state.modelForm.moduleAuthId, //模块
								flowId: state.flowId,
								flowNodeId: x,
								commentRow: true, // 评语行
								commentRequir: state.modelForm.commentRequir, // 评语必填
							};
						});
					}
				}
				loading.value = true;
				const res = await modelSave(params);
				loading.value = false;
				if (res.status == 0) {
					params.moduleOrder = params.moduleOrder - 1;
					state.isModelEdit = false;
					if (params.moduleName == '绩效结果') {
						params.moduleOrder = -1;
					}
					init(params.moduleOrder);
					// if (state.modelForm.moduleId) {
					// 	//编辑
					// 	state.modelForm.moduleId = res.data;
					// 	handleModelClick(state.modelForm, true);
					// } else {
					// 	init();
					// }
					ElMessage.success('保存成功！');
					state.modelFlag = false;
					loading.value = false;
				} else {
					ElMessage.warning(res.message);
				}
			});
		};

		// 模块基本信息保存
		const handleModelSave = () => {
			submitModelSave(state.modelFormAdd);
		};

		// 模块保存
		const submitModelSave = (formData: any, isAdd: boolean = true) => {
			let refFlag = isAdd ? proxy.$refs.modelRef : proxy.$refs.model1Ref;
			refFlag.validate(async (valid: any) => {
				if (!valid) return false;

				loading.value = true;
				let params = {
					templateId: state.templateId,
					moduleOrder: state.modelList.length + 1,
					...formData,
				};
				const res = await modelAdd(params);
				loading.value = false;
				if (res.status == 0) {
					init();
					ElMessage.success('保存成功！');
					state.modelFlag = false;
					loading.value = false;
				} else {
					ElMessage.warning(res.message);
				}
			});
		};

		// 搜索
		const remoteMethod = (query: string) => {
			if (query) {
				loading.value = true;
				setTimeout(() => {
					loading.value = false;
					options.value = list.value.filter((item) => {
						return item.label.toLowerCase().includes(query.toLowerCase());
					});
				}, 200);
			} else {
				options.value = [];
			}
		};

		// 保存指标
		const handlezhibiaoSave = () => {
			zhibiaoRef.value.validate(async (valid: any) => {
				if (!valid) return false;
				if (state.zhibiaoTitle == '修改') {
					let info = state.zhibiaoList.find((x) => state.zhibiaoFormAdd.quotaId == x.quotaId);
					for (let key in state.zhibiaoFormAdd) {
						info[key] = state.zhibiaoFormAdd[key];
					}
				} else {
					if (state.zhibiaoList.some((x) => state.zhibiaoFormAdd.quotaId == x.quotaId)) {
						ElMessage.error('指标已存在！');
						return false;
					}
					loading.value = true;
					let params = JSON.parse(JSON.stringify(state.zhibiaoFormAdd));
					params['id'] = state.zhibiaoList.length + 1;
					state.zhibiaoList.push(params);
				}
				setTimeout(() => {
					state.zhibiaoFlag = false;
					loading.value = false;
				}, 500);
			});
		};

		//移除模块卡片
		const handleModuleDelete = async (element: any) => {
			ElMessageBox.confirm('确认要删除吗？', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(async () => {
					loading.value = true;
					const res = await modelDelete({ moduleId: element.id });
					loading.value = false;
					if (res.status == 0) {
						init();
						ElMessage.success('删除成功！');
					} else {
						ElMessage.warning(res.message);
					}
				})
				.catch(() => {});
		};

		// 复制指标
		const handlezhibiaoCopy = async (row: any) => {
			state.zhibiaoFlag = true;
			state.zhibiaoTitle = '复制';
			await nextTick();
			zhibiaoRef.value.resetFields();
			state.zhibiaoFormAdd.scoreRangeEnd = '';
			state.zhibiaoFormAdd.maxquotaWeight = 1;
			zhibiaoRef.value.clearValidate();
			state.zhibiaoFormAdd = JSON.parse(JSON.stringify(row));
			state.zhibiaoFormAdd.quotaId = '';
			state.zhibiaoFormAdd.quotaName = '';
		};

		// 修改指标
		const handlezhibiaoEdit = async (row: any) => {
			state.zhibiaoFlag = true;
			state.zhibiaoTitle = '修改';
			await nextTick();
			zhibiaoRef.value.resetFields();
			state.zhibiaoFormAdd.scoreRangeEnd = '';
			state.zhibiaoFormAdd.maxquotaWeight = 1;
			zhibiaoRef.value.clearValidate();
			state.zhibiaoFormAdd = JSON.parse(JSON.stringify(row));
			console.log(state.zhibiaoFormAdd, 'state.zhibiaoFormAdd');
		};

		//保存一票否决
		const handleyipiaoSave = () => {
			state.yipiaoFlag = false;
			let selectList = proxy.$refs.yipiaoPageRef.getSelectList();
			if (selectList && selectList.length > 0) {
				state.yipiaoList = selectList.map((x) => {
					return {
						quotaName: x.quotaName,
						quotaId: x.id,
						id: x.id,
						description: x.description,
					};
				});
			}
		};

		// 切换步骤条
		const handleStep = (item) => {
			proxy.$refs.flowFormRef.validate(async (valid: any) => {
				if (!valid) return false;
				for (let key in state.flowFormAdd) {
					state.flowData[state.stepState - 1][key] = state.flowFormAdd[key];
				}
				//切换步骤条前保存数据
				state.stepState = state.flowData.findIndex((x) => x.flowNodeId == item.flowNodeId) + 1;
				proxy.$refs.flowFormRef.resetFields();
				//赋值刚才保存节点
				let nextNode = state.flowData.find((x) => x.flowNodeId == item.flowNodeId);
				// 处理指标可见
				//if(nextNode.moduleQuotaAuthList)
				state.flowFormAdd = JSON.parse(JSON.stringify(nextNode));
				setFlowZhibiao(state.modelForm.moduleType == 'reject' ? state.yipiaoList : state.zhibiaoList, state.flowFormAdd.moduleQuotaAuthList);
			});
		};

		// 选中指标
		const handleZhibiaoChange = (item: any) => {
			state.zhibiaoFormAdd.quotaId = item.value;
			state.zhibiaoFormAdd.quotaName = item.label;
			state.zhibiaoFormAdd.quotaDescription = item.desc;
			state.zhibiaoFormAdd.quotaTypeId = item.typeId;
			state.zhibiaoFormAdd.scoringRuleDesc = item.item.scoringRuleDesc;
		};

		// 返回
		const goBack = () => {
			router.replace({
				path: '/templateList',
			});
		};

		// 预览
		const handleReview = async () => {
			state.yulanFlag = true;
			await nextTick();
			proxy.$refs.reportRef.loadData();
		};

		//初始化
		const init = async (orderId = 0) => {
			const flowRes = await getFlowNode({ templateId: state.templateId });
			if (flowRes.status == 0 && flowRes.data.flowNodeInitResList && flowRes.data.flowNodeInitResList.length > 0) {
				state.flowList = flowRes.data.flowNodeInitResList.map((x: any) => {
					return {
						flowId: state.flowId,
						nodeName: x.nodeName,
						flowNodeId: x.id,
						nodeType: x.nodeType,
						roleName: x.roleName,
					};
				});
				//当前节点
				state.stepState = 1;
			} else {
				// ElMessage.error("请先配置流程节点！");
			}
			const res = await getModelList({ templateId: state.templateId });
			if (res.status == 0) {
				if (res.data.templateModuleResList && res.data.templateModuleResList.length > 0) {
					state.modelList = res.data.templateModuleResList.map((x) => {
						return {
							...x,
							moduleId: x.id,
						};
					});
				}
			} else {
				ElMessage.error(res.message);
			}
			//获取绩效结果模块
			state.jixiaoModelInfo = JSON.parse(JSON.stringify(state.modelList.find((x) => x.moduleName == '绩效结果')));
			state.modelList = state.modelList.filter((x) => x.moduleName != '绩效结果').sort((x) => x.moduleOrder);

			// //无模块
			if (state.modelList.length <= 0) {
				// 待编辑
				// state.modelList.push({
				// 	id: 9999,
				// 	description: '',
				// 	moduleName: '',
				// 	moduleOrder: '',
				// 	moduleType: 'assessment',
				// 	moduleTypeName: '',
				// 	moduleWeight: 0,
				// });
			}
			handleModelClick(
				JSON.parse(JSON.stringify(state.modelList.length <= 0 || orderId < 0 ? state.jixiaoModelInfo : state.modelList[orderId])),
				true
			);
		};

		/***
		 * 绑定指标可见数据
		 * dic:指标字典
		 */
		const setFlowZhibiao = (dic: any, selectData: any) => {
			state.flowFormAdd.moduleQuotaAuthList = dic.map((x) => {
				let info = (selectData ?? []).find((y) => y.templateQuotaId == x.quotaId);
				return {
					quotaName: x.quotaName,
					templateQuotaId: x.quotaId,
					display: info ? info.display : false,
					quotaTypeId: x.quotaTypeId,
					flowId: state.flowId,
					flowNodeId: state.flowFormAdd.flowNodeId,
					scorable: info ? info.scorable : false,
					templateId: state.templateId,
					templateModuleId: state.modelForm.moduleId,
				};
			});
		};

		//设置保存按钮
		const setSaveBtn = (addType: AddType = AddType.NONE) => {
			if (!state.modelLoading) {
				state.isModelEdit = true;
			}
			if (addType == AddType.ADD_ZHIBIAO || addType == AddType.ADD_YIPIAOFOUJUE) {
				let list = addType == AddType.ADD_ZHIBIAO ? state.zhibiaoList : state.yipiaoList;
				setFlowZhibiao(list, state.flowFormAdd.moduleQuotaAuthList);
			}
		};

		// 公式完成
		const handleFormulaComplete = (item) => {
			state.zhibiaoFormAdd.calculationFormula = item.result;
			state.zhibiaoFormAdd.calculationFormulaItem = JSON.stringify(item.list);
		};

		watch(
			() => state.flowFormAdd,
			() => {
				setSaveBtn();
			},
			{ deep: true }
		);

		watch(
			() => state.zhibiaoFormAdd.quotaWeight,
			(val) => {
				state.zhibiaoFormAdd.maxquotaWeight = parseInt(val);
			}
		);

		watch(
			() => state.yipiaoList,
			() => {
				// 绑定指标可见值
				setSaveBtn(AddType.ADD_YIPIAOFOUJUE);
			},
			{ deep: true }
		);

		watch(
			() => state.moduleAuthList,
			() => {
				// 绑定指标可见值
				setSaveBtn();
			},
			{ deep: true }
		);

		watch(
			() => state.modelForm,
			() => {
				setSaveBtn();
			},
			{ deep: true }
		);
		watch(
			() => state.zhibiaoList,
			() => {
				// 绑定指标可见值
				setSaveBtn(AddType.ADD_ZHIBIAO);
			},
			{ deep: true }
		);

		onBeforeMount(async () => {
			//绑定模板Id
			if (store.state.userInfos.showStep) {
				state.show = true;
				store.dispatch('userInfos/setShowStep', false);
			}
			//绑定模板Id
			state.templateId = route.query.templateId;
			state.calculateMode = parseInt(route.query.calculateMode); // 权重控制得分
			state.jobType = parseInt(route.query.jobType); // 工作类型控制指标适应对象范围
			state.templateName = route.query.templateName; //
			state.flowName = route.query.flowName; // 流程控制是否显示流程
			state.suitableCode = route.query.suitableCode;
			init();
		});

		return {
			...toRefs(state),
			startDrag,
			handleModelClick,
			handleAdd,
			handleSave,
			handleModelSave,
			modelRef,
			AddType,
			handleClose,
			remoteMethod,
			loading,
			options,
			handlezhibiaoSave,
			zhibiaoRef,
			handlezhibiaoEdit,
			handlezhibiaoCopy,
			handleyipiaoSave,
			handleStep,
			SearchEnum,
			getTagStyle,
			handleZhibiaoChange,
			goBack,
			init,
			setSaveBtn,
			handleModuleDelete,
			handleFormulaComplete,
			handleReview,
			handleCancel: () => {
				state.isModelEdit = false;
				handleModelClick(state.modelForm);
			},

			//移除
			handleRmove: (element: any, addType: AddType, evt: any) => {
				// 部分可见指标
				// if (!state.flowFormAdd.quotaAuth && state.flowFormAdd.selectList.some((x) => x.quotaId == element.quotaId)) {
				// 	ElMessage.error('请先删除流程控制中的对应指标！');
				// 	return false;
				// }
				state[`${addType}List`] = state[`${addType}List`].filter((x) => x.quotaId != element.quotaId);
			},
			handleCloseTitle: () => {
				state.isAlertTitle = false;
				state.panlHeight = 'calc(100vh - 100px)';
			},
			hasFlow: () => {
				console.log(state.flowName, 'fff');
				return state.flowName && state.flowName != '';
			},
			stepComplete: () => {
				state.show = false;
				handleAdd(AddType.ADD_MODEL, null);
			},
		};
	},
};
</script>
<style scoped lang="scss">
.panl-container {
	display: flex;
	width: 100%;
	height: calc(100vh - 140px);
	&-left,
	&-right {
		padding: 10px;
		background: #fff;
		height: 100%;
	}
	&-left {
		width: 270px;

		&--card:hover {
			cursor: move;
			background: #fafafa;
			// border: solid 1px $color-primary !important;
		}
		.selected {
			border: solid 1px $color-primary;
			.title-btn {
				margin-left: -10px;
				border-left: solid 2px $color-primary;
				padding-left: 10px;
			}
		}

		&--card {
			margin-bottom: 10px;
			padding: 10px;
			min-height: 50px;
			width: 100%;

			.title {
				font-weight: 700;
				font-size: 16px;
				padding-bottom: 10px;
				line-height: 32px;
				cursor: pointer;
			}

			.tag {
			}
		}

		&--btn {
			position: absolute;
			bottom: 20px;
			right: 20px;
		}
	}
	&-right {
		flex: 1;
		overflow: auto;
		.right-form {
			padding: 10px 10px;
		}
		.step-wapper {
			.model-item {
				padding: 20px 20px;
			}

			&-form {
				background: #fafbfc;
				border: 1px solid #e6e8eb;
				border-radius: 5px;
				padding: 16px;
			}
		}

		.submit-btn {
			position: absolute;
			width: 100%;
			text-align: center;
			bottom: 0px;
			height: 80px;
			line-height: 80px;
			border-top: solid 1px #eeeeee;
			background: #ffffff;
			opacity: 1;
			z-index: 30;
		}
	}
}

.leftpx {
	margin-left: 8px;
}

.chosen {
	background-color: #fafafa !important;
	opacity: 1 !important;
}

.ghost {
	border: solid 3px $color-primary !important;
}

.el-card {
	--el-card-padding: 0px;
}

.pingyu-wapper {
	display: flex;
	&--switch {
		width: 60px;
	}

	&--checkbox {
		width: 60px;
	}

	&--tip {
		flex: 1;
		line-height: 30px;
		height: 30px;
		background: #f2f2f2;
		color: #999999;
		padding: 0px 10px;
		font-size: 12px;
	}
}

.input-tips {
	margin-top: 10px;
	background: #f2f2f2;
	color: #999999;
	padding: 0px 10px;
	font-size: 12px;
	line-height: 20px;
}

.fallbackClass {
	// background-color: aquamarine;
}

.gridtable {
	font-family: verdana, arial, sans-serif;
	font-size: 11px;
	color: #333333;
	border-width: 1px;
	border-color: #d3d3d3;
	border-collapse: collapse;
	text-align: center;
	width: 100%;
	min-width: 500px;
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

.panl-head {
	display: flex;
	width: 100%;
	background: #ffffff;
	min-height: 60px;
	margin-bottom: 8px;
	&--btn {
		width: 100px;
		line-height: 50px;
	}
	&--title {
		flex: 1;
		padding: 8px 20px;
		line-height: 25px;
		font-size: 16px;
		font-weight: 700;

		span {
			font-size: 12px;
			color: #999999;
			font-size: 12px;
			font-weight: 500;
		}
	}
}
.alert-title {
	min-height: 30px;
	width: 100%;
	margin-bottom: 8px;
}
.el-alert--warning.is-light {
	color: #333;
	background: #e6f7ff;
	border: solid 1px #91d5ff;
	::v-deep(.el-icon) {
		color: $color-primary;
	}
}
</style>
