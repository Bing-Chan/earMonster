<template>
	<div id="pages">
		<div class="query_box">
			<el-form ref="queryRef" :inline="true" :model="queryForm" label-position="left">
				<el-form-item label="模板名称" prop="templateNameOrCode">
					<el-input v-model.trim="queryForm.templateNameOrCode" clearable placeholder="请输入模板名称"></el-input>
				</el-form-item>
				<el-form-item label="更新人" prop="createOrUpdateUser">
					<el-input v-model.trim="queryForm.createOrUpdateUser" clearable placeholder="请输入更新人"></el-input>
				</el-form-item>
				<el-form-item label="算分方式" prop="calculateMode">
					<el-select clearable v-model="queryForm.calculateMode" placeholder="请选择算分方式">
						<el-option key="1" label="权重" value="1" />
						<el-option key="2" label="非权重" value="2" />
					</el-select>
				</el-form-item>
				<el-form-item label="状态" prop="templateState">
					<el-select clearable v-model="queryForm.templateState" placeholder="请选择状态">
						<el-option key="1" label="启用" value="1" />
						<el-option key="0" label="禁用" value="0" />
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
					<el-button type="default" @click="bandReset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="content_list">
			<div class="content_title" ref="contentTitle">
				<div>
					<el-button type="primary" @click="addOrEdit()">新增</el-button>
					<el-button type="default" @click="handleFlag(1)">启用</el-button>
					<el-button type="default" @click="handleFlag(0)">禁用</el-button>
				</div>
			</div>
			<div class="table_list">
				<el-table :data="tableData" stripe @selection-change="handleSelectionChange" border style="width: 100%" height="100%">
					<template #empty><SysEmpty></SysEmpty></template>
					<el-table-column type="selection" align="center" width="55"> </el-table-column>
					<el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
					<el-table-column prop="templateCode" min-width="160" label="模板代码" align="center"></el-table-column>
					<el-table-column prop="templateName" min-width="200" label="模板名称" align="center">
						<template #default="scope">
							<el-button type="text" @click="handleConfig(scope.row)">{{ scope.row.templateName }}</el-button>
						</template>
					</el-table-column>
					<el-table-column min-width="100" label="适用类型" align="center">
						<template #default="scope">
							<span>{{ scope.row.jobType == 1 ? '操作工' : '职能' }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="description" min-width="200" show-overflow-tooltip label="描述" align="center"></el-table-column>
					<el-table-column prop="flowName" min-width="200" label="流程名称" align="center"></el-table-column>
					<el-table-column prop="calculateMode" label="算分方式" width="80" align="center">
						<template #default="scope">
							<span>{{ getQuanZhong(scope.row.calculateMode) }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="templateState" label="状态" width="80" align="center">
						<template #default="scope">
							<span>{{ getState(scope.row.templateState) }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="createOrUpdateUser" label="更新人" width="80" align="center"></el-table-column>
					<el-table-column prop="createOrUpdateTime" width="150" label="更新时间" align="center"></el-table-column>

					<el-table-column prop="annTitle" label="操作" fixed="right" min-width="120" align="center">
						<template #default="scope">
							<el-button type="text" @click="addOrEdit(scope.row)">修改</el-button>
							<el-button type="text" @click="hanldeOpenCopy(scope.row)">复制</el-button>
							<el-button type="text" @click="hanldeDelete(scope.row)">删除</el-button>
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

		<!--修改模板-->
		<el-dialog :close-on-click-modal="false" :title="formTitle" v-model="addFlag" center width="600px">
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form ref="formRef" :model="editForm" :rules="formRules" label-position="right" label-width="100px">
						<el-form-item label="模板名称" prop="templateName">
							<el-input v-model.trim="editForm.templateName" placeholder="请输入模板名称" style="width: 100%" maxlength="100"></el-input>
						</el-form-item>
						<el-form-item v-if="formTitle == '复制模板'" label="复制模板" prop="templateNameCopy">
							<el-input disabled v-model.trim="editForm.templateNameCopy" style="width: 100%" maxlength="100"></el-input>
						</el-form-item>
						<el-form-item v-if="formTitle != '复制模板'" label="引入流程" prop="flowFlag">
							<el-switch size="large" v-model="editForm.flowFlag" />
						</el-form-item>
						<el-form-item v-if="formTitle != '复制模板' && editForm.flowFlag" label="流程引入" prop="flowId">
							<el-select v-model="editForm.flowId" style="width: 100%" placeholder="请选择流程">
								<el-option v-for="(item, index) in useFlowList" :disabled="item.flowStatus != 1" :key="index" :label="item.flowName" :value="item.id">
									{{ item.flowName }}</el-option
								>
								<el-option
									v-if="editForm.flowId != '' && !useFlowList.some((x) => x.id == editForm.flowId)"
									:value="editForm.flowId"
									:label="editForm.flowName"
									disabled
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item v-if="formTitle != '复制模板'" label="适用类型" prop="jobType">
							<el-radio-group :disabled="formTitle == '修改模板'" @change="handleChangeType" v-model="editForm.jobType" class="ml-4">
								<el-radio :label="1" size="large">操作工</el-radio>
								<el-radio :label="2" size="large">职能</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item v-if="formTitle != '复制模板'" label="算分方式" prop="calculateMode">
							<el-radio-group :disabled="formTitle == '修改模板' || editForm.jobType == 2" v-model="editForm.calculateMode" class="ml-4">
								<el-radio :label="1" size="large">权重</el-radio>
								<el-radio :label="2" size="large">非权重</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item v-if="formTitle != '复制模板' && editForm.jobType == 2" label="适用对象" prop="suitableCode">
							<el-select v-model="editForm.suitableCode" placeholder="请选择">
								<el-option
									v-for="(item, index) in useDictionaryList['sys_applicable']"
									:key="index"
									:label="item.dictItem"
									:value="item.dictItemCode"
								/>
							</el-select>
						</el-form-item>
						<el-form-item label="描述" prop="description">
							<el-input v-model="editForm.description" show-word-limit style="width: 100%" type="textarea" rows="4"></el-input>
						</el-form-item>
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
	</div>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted, getCurrentInstance, nextTick, ref } from 'vue';
import {
	getTemplateList,
	templateAdd,
	templateUpdate,
	templateDisable,
	templateCopy,
	templateDelete,
	getTemplateInfo,
} from '/@/api/templateConfig/index.ts';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { ElMessageBox, ElMessage } from 'element-plus';
import { getQuanZhong, getState } from '/@/utils/other.ts';
import { useFlow } from '/@/hooks/web/useFlow';
import { getNodeList } from '/@/api/flow/index.ts';
import { useDictionary } from '/@/hooks/web/useDictionary';
import { store } from '/@/store/index';

export default defineComponent({
	name: 'left',
	setup(props) {
		const { proxy } = getCurrentInstance() as any;
		const { useDictionaryList } = useDictionary(['sys_applicable']);
		const { useFlowList } = useFlow();
		const loading = ref(false);
		const state = reactive({
			currentPage: 1,
			limit: 20,
			total: 0,
			addFlag: false,
			formTitle: '新增模板',
			selection: [],
			queryForm: {
				templateNameOrCode: '',
				createOrUpdateUser: '',
				templateState: '',
				calculateMode: '',
			},
			editForm: {
				templateName: '',
				flowFlag: false,
				flowId: '',
				oldFlowId: '', // 旧流程
				oldFlowFlag: false, // 旧流程
				calculateMode: 2,
				jobType: 1,
				description: '',
				suitableCode: 'sys_applicable_all',
				templateNameCopy: '',
			},
			formRules: {
				templateName: [{ required: true, message: '请输入模板名称', trigger: 'blue' }],
				flowId: [{ required: true, message: '请选择流程', trigger: 'change' }],
				calculateMode: [{ required: true, message: '请选择算分方式', trigger: 'change' }],
				jobType: [{ required: true, message: '请选择适用类型', trigger: 'change' }],
			},
			tableData: [],
		});
		const router = useRouter();
		const bandReset = () => {
			proxy.$refs.queryRef.resetFields();
		};
		const onSubmit = () => {
			state.currentPage = 1;
			getList();
		};

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

		const hanldeOpenCopy = async (row: any) => {
			state.addFlag = true;
			await nextTick();
			if (row) {
				state.formTitle = '复制模板';
				const res = await getTemplateInfo({ templateId: row.id });
				if (res.status == 0) {
					state.editForm = JSON.parse(JSON.stringify(res.data));
					state.editForm.templateNameCopy = state.editForm.templateName;
					state.editForm.templateName = '';
				} else {
					ElMessage.error(res.message);
				}
			}
			proxy.$refs.formRef.resetFields();
			proxy.$refs.formRef.clearValidate();
		};

		// 打开
		const addOrEdit = async (row: any) => {
			state.addFlag = true;
			await nextTick();
			state.formTitle = '新增模板';
			proxy.$refs.formRef.resetFields();
			if (row) {
				state.formTitle = '修改模板';
				const res = await getTemplateInfo({ templateId: row.id });
				if (res.status == 0) {
					state.editForm = JSON.parse(JSON.stringify(res.data));
					console.log(state.editForm, 'state.editForm ');
					state.editForm.oldFlowId = state.editForm.flowId;
					state.editForm.oldFlowFlag = state.editForm.flowFlag;
				} else {
					ElMessage.error(res.message);
				}
			}
			proxy.$refs.formRef.clearValidate();
		};

		const getList = async () => {
			let params = {
				pageNum: state.currentPage,
				pageSize: state.limit,
				...state.queryForm,
			};

			let res = await getTemplateList(params);
			state.tableData = res.data.resultData;
			state.total = res.data.total;
		};

		//模板配置
		const handleConfig = async (row: any) => {
			setTimeout(() => {
				router.replace({
					path: '/templateConfig',
					query: {
						templateId: row.id,
						calculateMode: row.calculateMode,
						flowName: row.flowName,
						templateName: row.templateName,
						jobType: row.jobType,
						suitableCode: row.suitableCode,
					},
				});
			}, 500);
		};

		//启用/禁用
		const handleFlag = async (val: any) => {
			if (!state.selection || state.selection.length == 0) {
				ElMessage.warning('请至少选择一个！');
				return false;
			}
			loading.value = true;
			let params = {
				enableFlag: val,
				templateIdList: state.selection.map((x) => {
					return x.id;
				}),
			};
			let res = await templateDisable(params);
			loading.value = false;
			if (res.status == 0) {
				getList();
				ElMessage.success('操作成功！');
			} else {
				ElMessage.warning(res.message);
			}
		};

		//启用/禁用
		const hanldeDelete = async (row: any) => {
			ElMessageBox.confirm('确认要删除？', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(async () => {
					loading.value = true;
					let params = {
						templateId: row.id,
					};
					let res = await templateDelete(params);
					loading.value = false;
					if (res.status == 0) {
						ElMessage.success('操作成功！');
						getList();
					} else {
						ElMessage.warning(res.message);
					}
				})
				.catch(() => {});
		};

		//启用/禁用
		const hanldeCopy = async (row: any) => {
			loading.value = true;
			let params = {
				description: row.description,
				id: row.id,
				templateName: row.templateName,
			};
			let res = await templateCopy(params);
			loading.value = false;
			if (res.status == 0) {
				ElMessage.success('操作成功！');
				getList();
			} else {
				ElMessage.warning(res.message);
			}
		};

		// 保存
		const handleSave = async () => {
			if (
				state.formTitle == '修改模板' &&
				(state.editForm.flowId != state.editForm.oldFlowId || state.editForm.flowFlag != state.editForm.oldFlowFlag)
			) {
				ElMessageBox.confirm('修改流程会导致各节点权限控制失效，是否继续？如果继续，请保存后去模板中重新配置各节点权限！', {
					confirmButtonText: '是',
					cancelButtonText: '否',
					type: 'warning',
				})
					.then(async () => {
						toSave();
					})
					.catch(() => {});
			} else {
				toSave();
			}
		};

		const toSave = async () => {
			proxy.$refs.formRef.validate(async (valid: any) => {
				if (!valid) return false;

				let params = {
					...state.editForm,
				};
				let isAdd = state.formTitle == '新增模板';
				if (params.flowFlag) {
					const flowRes = await getNodeList({ flowId: params.flowId });
					if (!(flowRes.status == 0 && flowRes.data && flowRes.data.length > 0)) {
						ElMessage.error('请先配置流程节点！');
						return false;
					}

					if (state.formTitle == '复制模板' && !useFlowList.value.some((x) => x.id == params.flowId)) {
						ElMessage.error('该模板引用流程已禁用，不可复制！');
						return false;
					}
				}

				loading.value = true;

				let res = {};
				if (state.formTitle == '复制模板') {
					res = await templateCopy(params);
				} else {
					if (params.jobType == 1) {
						params.suitableCode = '';
					}
					res = !isAdd ? await templateUpdate(params) : await templateAdd(params);
				}
				loading.value = false;
				if (res.status == 0) {
					getList();
					state.addFlag = false;
					if (isAdd || state.formTitle == '复制模板') {
						if (isAdd) {
							store.dispatch('userInfos/setShowStep', true);
						}

						let floeName = '';
						if (useFlowList.value.some((x) => x.id == params.flowId)) {
							floeName = useFlowList.value.find((x) => x.id == params.flowId).flowName;
						}
						// 新增 跳转配置页面
						handleConfig({
							id: res.data,
							calculateMode: params.calculateMode,
							flowName: floeName,
							templateName: params.templateName,
							jobType: params.jobType,
							suitableCode: params.suitableCode,
						});
					} else {
						ElMessage.success('保存成功！');
					}
				} else {
					ElMessage.warning(res.message);
				}
			});
		};

		onMounted(() => {
			getList();
		});

		return {
			...toRefs(state),
			onSubmit,
			bandReset,
			handleSelectionChange,
			handleSizeChange,
			handleCurrentChange,
			addOrEdit,
			handleConfig,
			handleFlag,
			hanldeDelete,
			hanldeCopy,
			handleSave,
			loading,
			getQuanZhong,
			getState,
			hanldeOpenCopy,
			useFlowList,
			useDictionaryList,
			handleChangeType: () => {
				state.editForm.calculateMode = 1;
			},
		};
	},
});
</script>
<style lang="scss" scoped>
#pages {
	height: 100%;
	display: flex;
	flex-direction: column;

	.content_list {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 20px;
		min-height: 100px !important;
		padding-bottom: 0px;
		.table_list {
			flex: auto;
			// 重点是这里：开始
			position: relative;

			::v-deep(.el-table) {
				position: absolute;
				height: 100%;
			}
		}
		.content_title {
			padding-bottom: 0px;
		}
		.content_title,
		.pagination {
			flex-shrink: 0;
		}

		.pagination {
			margin: 0;
			padding: 0;
		}
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
</style>
