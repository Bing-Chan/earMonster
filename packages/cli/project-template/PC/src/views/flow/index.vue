<template>
	<div id="pages">
		<div class="query_box">
			<el-form :inline="true" label-position="left" :model="queryForm" ref="queryRef">
				<el-form-item label="流程类型" prop="flowType">
					<el-select clearable v-model="queryForm.flowType" style="width: 100%" placeholder="请选择流程类型">
						<el-option v-for="(item, index) in useDictionaryList['sys_flow_type']" :key="index" :label="item.dictItem" :value="item.dictItemCode" />
					</el-select>
				</el-form-item>
				<el-form-item label="更新人" prop="userSearchKey">
					<el-input v-model.trim="queryForm.userSearchKey" clearable placeholder="请输入更新人"></el-input>
				</el-form-item>
				<el-form-item label="状态" prop="flowStatus">
					<el-select clearable v-model="queryForm.flowStatus" placeholder="请选择状态">
						<el-option key="1" label="启用" :value="1" />
						<el-option key="0" label="禁用" :value="0" />
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
				</div>
			</div>
			<div class="table_list">
				<el-table :data="tableData" stripe @selection-change="handleSelectionChange" border style="width: 100%">
					<template #empty><SysEmpty></SysEmpty></template>
					<el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
					<el-table-column prop="flowCode" width="160" label="流程代码" align="center"></el-table-column>
					<el-table-column prop="flowName" min-width="200" label="流程名称" align="center">
						<template #default="scope">
							<el-button type="text" @click="handleConfig(scope.row)">{{ scope.row.flowName }}</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="versionStr" label="流程版本" width="80" align="center"></el-table-column>
					<el-table-column prop="flowType" min-width="100" label="流程类型" align="center">
						<template #default="scope">
							{{ getFlowTypeName(scope.row) }}
						</template>
					</el-table-column>
					<el-table-column prop="description" label="流程描述" show-overflow-tooltip min-width="200" align="center"> </el-table-column>
					<el-table-column prop="flowStatus" label="状态" align="center" width="80">
						<template #default="scope">
							{{ scope.row.flowStatus == 1 ? '启用' : '禁用' }}
						</template>
					</el-table-column>
					<el-table-column prop="createUser" label="更新人" align="center" width="100"></el-table-column>
					<el-table-column prop="createTime" label="更新时间" width="150" align="center"></el-table-column>

					<el-table-column prop="annTitle" label="操作" min-width="220" fixed="right" align="center">
						<template #default="scope">
							<el-button type="text" v-if="scope.row.updateFlag == 1" @click="addOrEdit(scope.row)">修改</el-button>
							<el-button type="text" v-if="scope.row.enableFlag == 1" @click="hanldeDisable(scope.row, scope.row.flowStatus == 1 ? 0 : 1)">{{
								scope.row.flowStatus == 1 ? '禁用' : '启用'
							}}</el-button>
							<el-button type="text" @click="hanldeYinyong(scope.row)">已引用模板</el-button>
							<el-button type="text" v-if="scope.row.canAddVersFlag == 1" @click="hanldeRelease(scope.row)">新增版本</el-button>
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
		<!--修改指标结果-->
		<el-dialog :close-on-click-modal="false" :title="formTitle" center v-model="addFlag" width="600px">
			<el-row :gutter="35">
				<el-col>
					<el-form ref="formRef" :model="editForm" :rules="formRules" label-position="right" label-width="80px">
						<el-form-item label="流程名称" prop="flowName">
							<el-input
								v-model.trim="editForm.flowName"
								:disabled="formTitle == '修改流程'"
								placeholder="请输入流程名称"
								style="width: 100%"
								maxlength="100"
							></el-input>
						</el-form-item>
						<el-form-item label="流程类型" prop="flowType">
							<el-select v-model="editForm.flowType" :disabled="formTitle == '修改流程'" style="width: 100%" placeholder="请选择流程类型">
								<el-option
									v-for="(item, index) in useDictionaryList['sys_flow_type']"
									:key="index"
									:label="item.dictItem"
									:value="item.dictItemCode"
								/>
							</el-select>
						</el-form-item>
						<el-form-item label="状态" prop="flowStatus" v-if="formTitle === '新增流程'">
							<el-radio-group v-model="editForm.flowStatus" class="ml-4">
								<el-radio :label="1" size="large">启用</el-radio>
								<el-radio :label="0" size="large">禁用</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="流程描述" prop="description">
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

		<!--发布-->
		<el-dialog :close-on-click-modal="false" title="发布流程" center v-model="releaseFlag" width="600px">
			<el-row :gutter="35">
				<el-col>
					<el-form ref="formRef" :model="versionForm" :rules="formRules" label-position="right" label-width="100px">
						<el-form-item label="流程名称" prop="flowName">
							<el-input disabled v-model.trim="versionForm.flowName" placeholder="请输入流程名称" style="width: 100%" maxlength="100"></el-input>
						</el-form-item>
						<el-form-item label="当前版本" prop="versionStr">
							<el-input disabled v-model.trim="versionForm.versionStr" style="width: 100%" maxlength="100"></el-input>
						</el-form-item>
						<el-form-item label="新生成版本" prop="versionNew">
							<el-input disabled v-model.trim="versionForm.versionNew" style="width: 100%" maxlength="100"></el-input>
						</el-form-item>
						<el-form-item label="流程描述" prop="description">
							<el-input maxlength="100" v-model="versionForm.description" show-word-limit style="width: 100%" type="textarea" rows="4"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="releaseFlag = false" size="small">取 消</el-button>
					<el-button type="primary" @click="saveRelease" :loading="loading" size="small">保 存</el-button>
				</span>
			</template>
		</el-dialog>

		<templete-list ref="templeteRef" v-model.visable="templeteFlag"></templete-list>
	</div>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted, getCurrentInstance, nextTick, toRaw } from 'vue';
import { getFlowList, flowAdd, releaseFlow, flowUpdate, flowDisable } from '/@/api/flow/index.ts';
import { ElMessage } from 'element-plus';
import { useDictionary } from '/@/hooks/web/useDictionary';
import templeteList from '/@/components/templeteList.vue';
import { useRouter } from 'vue-router';
import { store } from '/@/store/index';

export default defineComponent({
	name: 'role',
	components: {
		templeteList,
	},
	setup(props) {
		const { proxy } = getCurrentInstance() as any;
		const { useDictionaryList } = useDictionary(['sys_flow_type']);
		const router = useRouter();
		const state = reactive({
			currentPage: 1,
			templeteFlag: false,
			limit: 20,
			total: 0,
			loading: false,
			importFlag: false,
			queryForm: {
				flowType: null,
				flowStatus: null,
				userSearchKey: '',
			},
			tableData: [],
			formTitle: '分配',
			selection: [],
			addFlag: false,
			fenpeiFlag: false,
			releaseFlag: false,
			versionForm: {
				flowName: '',
				id: 0,
				version: '',
				versionStr: '',
				versionNew: '',
				description: '',
			},
			editForm: {
				flowName: '',
				flowType: '',
				description: '',
				flowStatus: 1,
			},
			formRules: {
				flowName: [{ required: true, message: '请输入流程名称', trigger: 'change' }],
				flowType: [{ required: true, message: '请选择流程类型', trigger: 'change' }],
				flowStatus: [{ required: true, message: '请选择状态', trigger: 'change' }],
			},
		});

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

		// 打开
		const addOrEdit = async (row: any) => {
			state.addFlag = true;
			await nextTick();
			state.formTitle = '新增流程';
			if (row) {
				state.formTitle = '修改流程';
				state.editForm = JSON.parse(JSON.stringify(row));
			}
			proxy.$refs.formRef.resetFields();
			proxy.$refs.formRef.clearValidate();
		};

		// 分配
		const hanldeFenpei = async (row: any) => {
			state.loading = true;
			const res = await flowDisable(
				toRaw({
					id: row.id,
					flowStatus: tag,
				})
			);
			state.loading = false;
			if (res.status == 0) {
				ElMessage.success('操作成功');
				getList();
			} else {
				ElMessage.error(res.message);
			}
		};

		// 发布版本
		const hanldeRelease = async (row: any) => {
			state.releaseFlag = true;
			await nextTick();
			if (row) {
				state.versionForm = JSON.parse(JSON.stringify(row));
				state.versionForm.versionNew = 'V' + (state.versionForm.version + 1);
			}
			proxy.$refs.formRef.resetFields();
			proxy.$refs.formRef.clearValidate();
		};

		// 发布版本
		const saveRelease = async () => {
			state.loading = true;
			const res = await releaseFlow(
				toRaw({
					id: state.versionForm.id,
					description: state.versionForm.description,
				})
			);
			state.loading = false;
			if (res.status == 0) {
				ElMessage.success('保存成功');
				state.releaseFlag = false;
				getList();
				// store.dispatch('userInfos/setShowStep', true);
				handleConfig({ id: res.data, flowName: state.versionForm.flowName, updateFlag: 1 });
			} else {
				ElMessage.error(res.message);
			}
		};

		const getList = async () => {
			let params = {
				pageNo: state.currentPage,
				limit: state.limit,
				userSearchKey: state.queryForm.userSearchKey,
				flowStatus: state.queryForm.flowStatus,
				flowType: state.queryForm.flowType,
			};
			let res = await getFlowList(params);
			state.tableData = res.data.resultData;
			state.total = res.data.total;
		};

		//启用/禁用
		const hanldeDisable = async (row: any, tag: any) => {
			state.loading = true;
			const res = await flowDisable(
				toRaw({
					id: row.id,
					flowStatus: tag,
				})
			);
			state.loading = false;
			if (res.status == 0) {
				ElMessage.success('操作成功');
				getList();
			} else {
				ElMessage.error(res.message);
			}
		};

		const handleConfig = (row: any) => {
			setTimeout(() => {
				router.replace({
					path: '/flowConfig',
					query: { flowId: row.id, flowName: row.flowName, updateFlag: row.updateFlag },
				});
			}, 500);
		};

		// 保存
		const handleSave = () => {
			proxy.$refs.formRef.validate(async (valid: any) => {
				if (!valid) return false;
				state.loading = true;
				let isAdd = state.formTitle == '新增流程';
				const res = !isAdd ? await flowUpdate(toRaw(state.editForm)) : await flowAdd(toRaw(state.editForm));
				state.loading = false;
				if (res.status == 0) {
					state.addFlag = false;
					getList();
					if (isAdd) {
						store.dispatch('userInfos/setShowStep', true);
						handleConfig({ id: res.data, flowName: state.editForm.flowName, updateFlag: 1 });
					}else{
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
			handleSave,
			hanldeFenpei,
			hanldeDisable,
			useDictionaryList,
			hanldeRelease,
			saveRelease,
			handleConfig,
			hanldeYinyong: (row: any) => {
				proxy.$refs.templeteRef.open(row);
				state.templeteFlag = true;
			},
			getFlowTypeName: (row: any) => {
				let info = useDictionaryList.value['sys_flow_type'].find((x) => x.dictItemCode == row.flowType);
				if (info) {
					return info.dictItem;
				}
				return '';
			},
		};
	},
});
</script>
<style lang="scss" scoped>
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
