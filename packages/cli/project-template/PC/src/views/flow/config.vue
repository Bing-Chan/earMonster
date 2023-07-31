<template>
	<!-- 开始配置模板-->
	<div id="pages" v-loading="loading">
		<!--新手引导页 by Bing.Chan-->
		<intro-step v-model:show="show" :config="config">
			<template #done>
				<button class="intro-step-btn" @click="handleStep">开始添加</button>
			</template>
		</intro-step>
		<!--标题-->
		<div class="panl-head">
			<div class="panl-head--title">
				<h3>{{ reportName }}</h3>
			</div>
			<div class="panl-head--btn">
				<el-button type="primary" @click="goBack" size="small">返回</el-button>
			</div>
		</div>
		<div class="panl-container" :style="{ height: panlHeight }">
			<el-scrollbar class="layout-scrollbar" ref="layoutScrollbarRef">
				<div class="panl-container-left">
					<draggable
						class="dragArea list-group w-full"
						v-model="nodeList"
						handle=".panl-container-left--card"
						@change="startDrag"
						tag="transition-group"
						force-fallback="true"
						animation="300"
						ghostClass="ghost"
					>
						<transition-group>
							<el-card
								v-for="(element, index) in nodeList"
								:key="element.nodeName"
								:class="selectModelId == element.id ? 'panl-container-left--card selected' : 'panl-container-left--card'"
							>
								<div @click="handleModelClick(element)">
									<el-row class="title">
										<el-col :span="20">
											<p class="title-btn">
												{{ element.nodeName == '' ? '待编辑' : element.nodeName }}
											</p>
										</el-col>
										<el-col :span="4" @click.stop="handleModuleDelete(element)">
											<el-button
												class="title-delete"
												v-if="element.id != -1 && updateFlag != 0"
												type="text"
												@click.stop="handleModuleDelete(element)"
											>
												<SvgIcon :name="'elementClose'" size="16"></SvgIcon>
											</el-button>
										</el-col>
									</el-row>
									<el-row>
										<el-col class="tag">
											<el-tag class="ml-2" type="success">{{ `节点序号:${index + 1}` }}</el-tag
											>&nbsp;
											<template v-if="element.id !== -1">
												<el-tag v-if="element.flowRoleName == '直接上级'" class="ml-2" type="success">{{ element.flowRoleName }}</el-tag>
												<el-tag v-else-if="element.flowRoleName != ''" class="ml-2">{{ element.flowRoleName }}</el-tag>
											</template>
										</el-col>
									</el-row>
								</div>
							</el-card>
						</transition-group>
					</draggable>
					<SysEmpty style="padding-top: 100px" description="请添加流程节点" v-if="!nodeList || nodeList.length == 0"></SysEmpty>
					<!--操作按钮浮动框-->
					<div class="panl-container-left--btn">
						<el-tooltip placement="top" v-if="updateFlag == 1" :show-after="200" content="新增流程节点">
							<el-button id="addFlow" @click="handleAdd" type="primary" circle>
								<SvgIcon :size="18" :name="'elementPlus'" />
							</el-button>
						</el-tooltip>
					</div>
				</div>
			</el-scrollbar>
			<div v-loading="modelLoading" class="panl-container-right leftpx">
				<el-scrollbar class="layout-scrollbar">
					<div class="right-form">
						<!---模块基本信息-->
						<report-card v-if="nodeList && nodeList.length > 0" title="节点配置信息">
							<div>
								<el-form ref="basicRef" :model="modelForm" :rules="modelRules" label-position="right" label-width="120px">
									<el-form-item label="节点名称" prop="nodeName">
										<el-input :disabled="updateFlag == 0" v-model.trim="modelForm.nodeName" style="width: 500px" maxlength="100"></el-input>
									</el-form-item>
									<el-form-item label="节点类型" prop="nodeType">
										<el-select :disabled="updateFlag == 0" v-model="modelForm.nodeType" style="width: 500px" placeholder="请选择模块类型">
											<el-option
												v-for="(item, index) in useDictionaryList['sys_node']"
												:key="index"
												:label="item.dictItem"
												:value="item.dictItemCode"
											/>
										</el-select>
									</el-form-item>
									<el-form-item label="执行角色" prop="flowRoleId">
										<el-select
											:disabled="modelForm.nodeType == 'sys_node_confirm' || updateFlag == 0"
											v-model="modelForm.flowRoleId"
											style="width: 500px"
											placeholder="请选择角色类型"
										>
											<el-option v-for="(item, index) in useFlowRoleList" :key="index" :label="item.roleName" :value="item.id" />
										</el-select>
									</el-form-item>
									<el-form-item label="执行方式" prop="execMode" v-if="handleShowExe(modelForm.flowRoleId)">
										<el-radio-group :disabled="updateFlag == 0" v-model="modelForm.execMode">
											<el-radio :label="1">会签</el-radio>
											<el-radio :label="2">或签</el-radio>
										</el-radio-group>
									</el-form-item>
								</el-form>
							</div>
						</report-card>
						<SysEmpty style="padding-top: 200px" description="暂无信息，快去添加流程节点吧~" v-else :size="250"></SysEmpty>
					</div>
					<div class="submit-btn" v-if="isModelEdit && updateFlag == 1">
						<el-button type="default" @click="handleCancel" :loading="loading" size="small">取 消</el-button>
						<el-button type="primary" @click="handleSave" :loading="loading" size="small">保 存</el-button>
					</div>
				</el-scrollbar>
			</div>
		</div>

		<!--新增模块-->
		<el-dialog :close-on-click-modal="false" title="新增节点" center v-model="modelFlag" width="600px">
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form ref="modelRef" :model="modelFormAdd" :rules="modelRules" label-position="right" label-width="80px">
						<el-form-item label="节点名称" prop="nodeName">
							<el-input v-model.trim="modelFormAdd.nodeName" style="width: 100%" maxlength="100"></el-input>
						</el-form-item>
						<el-form-item label="节点类型" prop="nodeType">
							<el-select v-model="modelFormAdd.nodeType" style="width: 100%" placeholder="请选择模块类型">
								<el-option v-for="(item, index) in useDictionaryList['sys_node']" :key="index" :label="item.dictItem" :value="item.dictItemCode" />
							</el-select>
						</el-form-item>
						<el-form-item label="执行角色" prop="flowRoleId">
							<el-select v-model="modelFormAdd.flowRoleId" style="width: 100%" placeholder="请选择执行角色">
								<el-option v-for="(item, index) in useFlowRoleList" :key="index" :label="item.roleName" :value="item.id" />
							</el-select>
						</el-form-item>
						<el-form-item label="执行方式" prop="execMode" v-if="handleShowExe(modelFormAdd.flowRoleId)">
							<el-radio-group v-model="modelFormAdd.execMode">
								<el-radio :label="1">会签</el-radio>
								<el-radio :label="2">或签</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="modelFlag = false" size="small">取 消</el-button>
					<el-button type="primary" @click="handleModelSave" :loading="loading" size="small">保 存</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script lang="ts">
import { toRefs, reactive, ref, onMounted, nextTick, getCurrentInstance, watch, onBeforeMount } from 'vue';
// import dayjs from 'dayjs';
import { VueDraggableNext } from 'vue-draggable-next';
import { getNodeList, nodeAdd, flowNodeInfo, nodeDelete, nodeSort } from '/@/api/flow/index.ts';
import { SearchEnum } from '/@/enums/Search.ts';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { getTagStyle, formRulesValidate } from '/@/utils/other.ts';
import { useFlowRole } from '/@/hooks/web/useFlowRole';
import { useDictionary } from '/@/hooks/web/useDictionary';
import { nodeUpdate } from '/@/api/flow';
import { store } from '/@/store/index';

export default {
	name: '流程配置',
	components: {
		draggable: VueDraggableNext,
	},
	setup() {
		const route: any = useRoute();
		const router: any = useRouter();
		const { proxy } = getCurrentInstance() as any;
		const { useFlowRoleList } = useFlowRole();
		const { useDictionaryList } = useDictionary(['sys_node']);
		const modelRef = ref();
		const loading = ref(false);
		const state = reactive({
			isAlertTitle: false,
			isModelEdit: false,
			reportName: '',
			flowName: '',
			flowId: '1',
			calculateMode: 1, // 职能
			updateFlag: 0, // 是否引用模板
			nodeList: [],
			selectModelId: 4,
			modelFormAdd: {
				nodeName: '',
				nodeType: '',
				execMode: '',
				flowRoleId: '',
			},
			modelRules: {
				nodeName: [{ required: true, message: '请输入节点名称', trigger: 'blur' }],
				nodeType: [{ required: true, message: '请选择类型', trigger: 'change' }],
				execMode: [{ required: true, message: '请选择执行方式', trigger: 'change' }],
				flowRoleId: [{ required: true, message: '请选择执行角色', trigger: 'change' }],
			},
			//模块表单
			modelForm: {
				nodeName: '',
				nodeType: '',
				execMode: '',
				flowRoleId: '',
			},
			modelLoading: false,
			modelFlag: false, // 新增模块弹框
			panlHeight: 'calc(100vh - 120px)',

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
						el: '#addFlow',
						tipPosition: 'top',
						title: '新增节点',
						content: '点击此处添加流程节点',
					},
				],
			},
		});

		const startDrag = async () => {
			if (state.updateFlag == 1) {
				const res = await nodeSort({
					flowNodeList: state.nodeList.map((x, index) => {
						return {
							id: x.id,
							nodeOrder: index + 1,
							flowId: state.flowId,
						};
					}),
				});
				if (res.status == 0) {
					init();
				} else {
					ElMessage.warning(res.message);
				}
			}
		};

		/***
		 * 模块切换
		 * element 当前行
		 * isLoading 是否加载页面
		 */
		const handleModelClick = async (element: any, isLoading: boolean = false) => {
			if (element.id == -1) {
				return false;
			}

			if (state.nodeList.length == 1 && state.nodeList.some((x) => x.id == -1)) {
				return false;
			}
			if (!isLoading && state.isModelEdit && state.updateFlag == 1) {
				ElMessage.error('离开前请先保存~');
				return false;
			}
			if (element.nodeName == '') {
				state.isModelEdit = true;
				return false;
			}

			state.modelLoading = true;
			const res = await flowNodeInfo({ id: element.id });
			if (res.status == 0) {
				setTimeout(() => {
					state.modelForm = res.data;
				}, 300);
			}
			state.selectModelId = element.id;
			setTimeout(() => {
				state.modelLoading = false;
			}, 500);
		};

		const restFiled = () => {
			// 初始化基本信息
			state.modelForm.nodeName = '';
			state.modelForm.id = null;
			state.modelForm.nodeType = '';
		};

		// 打开弹框
		const handleAdd = async () => {
			if (state.isModelEdit) {
				ElMessage.error('离开前请先保存~');
				return false;
			}
			state.modelFlag = true;
			await nextTick();
			if (proxy.$refs[`modelRef`]) {
				proxy.$refs[`modelRef`].resetFields();
				proxy.$refs[`modelRef`].clearValidate();
			}
		};

		// 保存模块
		const handleSave = async () => {
			Promise.all([formRulesValidate(proxy.$refs.basicRef)]).then(async () => {
				// 开始组装数据
				let params = {
					flowId: state.flowId,
					...state.modelForm,
				};
				loading.value = true;
				const res = params['id'] ? await nodeUpdate(params) : await nodeAdd(params);
				loading.value = false;
				if (res.status == 0) {
					state.isModelEdit = false;
					init();
					ElMessage.success('保存成功！');
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
					flowId: state.flowId,
					...formData,
				};
				const res = await nodeAdd(params);
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

		//移除模块卡片
		const handleModuleDelete = async (element: any) => {
			if (state.updateFlag == 1) {
				ElMessageBox.confirm('确认要删除吗？', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					type: 'warning',
				})
					.then(async () => {
						loading.value = true;
						const res = await nodeDelete({ id: element.id });

						if (res.status == 0) {
							init();
							loading.value = false;
							ElMessage.success('删除成功！');
						} else {
							ElMessage.warning(res.message);
						}
					})
					.catch(() => {});
			}
		};

		// 返回
		const goBack = () => {
			router.replace({
				path: '/flowList',
			});
		};

		//初始化
		const init = async () => {
			state.nodeList = [];
			const res = await getNodeList({ flowId: state.flowId });
			if (res.status == 0) {
				if (res.data && res.data.length > 0) {
					state.nodeList = res.data.map((x) => {
						return {
							...x,
						};
					});
				}
			} else {
				ElMessage.error(res.message);
			}
			state.nodeList = state.nodeList.filter((x) => x.nodeName != '绩效结果');
			//无模块
			if (state.nodeList.length <= 0 && state.updateFlag == 1) {
				// 待编辑
				// state.nodeList.push({
				// 	id: -1,
				// 	nodeName: '',
				// 	nodeOrder: '',
				// 	nodeType: 'assessment',
				// 	nodeTypeName: '',
				// });
			}
			//无模块
			if (state.nodeList && state.nodeList.length > 0) {
				handleModelClick(JSON.parse(JSON.stringify(state.nodeList[0])), true);
			}
		};

		watch(
			() => state.modelForm,
			() => {
				if (!state.modelLoading) {
					state.isModelEdit = true;
				}
			},
			{ deep: true }
		);

		onBeforeMount(async () => {
			//绑定模板Id
			if (store.state.userInfos.showStep) {
				state.show = true;
				store.dispatch('userInfos/setShowStep', false);
			}
			state.flowId = route.query.flowId;
			state.calculateMode = parseInt(route.query.calculateMode);
			state.updateFlag = parseInt(route.query.updateFlag);
			state.reportName = route.query.flowName;
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
			loading,
			SearchEnum,
			getTagStyle,
			goBack,
			init,
			handleModuleDelete,
			useFlowRoleList,
			useDictionaryList,
			handleCancel: () => {
				state.isModelEdit = false;
				handleModelClick(state.modelForm);
			},
			handleShowExe: (flowRoleId: any) => {
				if (useFlowRoleList.value.some((x) => flowRoleId == x.id && ['JS000001', 'JS000002'].includes(x.roleCode))) {
					return false;
				}
				return true;
			},
			handleStep: () => {
				state.show = false;
				handleAdd();
			},
		};
	},
};
</script>
<style scoped lang="scss">
.panl-container {
	display: flex;
	width: 100%;
	height: calc(100vh - 120px);
	&-left,
	&-right {
		padding: 10px;
		background: #fff;
		height: 100%;
	}
	&-left {
		width: 270px;
		min-height: calc(100vh - 120px);
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

.title-delete {
	float: right;
	z-index: 999;
	position: absolute;
	top: 0px;
	right: 0px;
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
</style>
