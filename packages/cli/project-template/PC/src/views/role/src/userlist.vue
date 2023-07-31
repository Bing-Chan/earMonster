<template>
	<!--人员分配-->
	<darwer v-model="personData.flag">
		<template #title>
			<span> {{ personData.title }}</span>
		</template>
		<div class="drawer-content" v-loading="tableData.loading">
			<el-scrollbar clas="scorll-content">
				<el-row>
					<el-form :inline="true" ref="formRef" label-width="auto" :model="tableData.param">
						<el-form-item label="姓名/工号" prop="userSearchKey">
							<el-input v-model.trim="tableData.param.userSearchKey" clearable placeholder="请输入姓名/工号"></el-input>
						</el-form-item>
						<el-form-item label-width="0px">
							<el-button type="primary" @click="onSubmit">查询</el-button>
							<el-button type="default" @click="bandReset">重置</el-button>
						</el-form-item>
					</el-form>
				</el-row>
				<el-row>
					<el-col>
						<el-button type="primary" @click="handleAddUser()">新增</el-button>
						<!-- <el-button type="danger" @click="handleDelUser()">删除</el-button> -->
					</el-col>
				</el-row>
				<el-row>
					<el-table border stripe :data="tableData.data" @selection-change="handleSelectionChange">
						<template #empty><SysEmpty></SysEmpty></template>

						<el-table-column type="index" label="序号" align="center" width="56" fixed="left"></el-table-column>
						<el-table-column property="userName" align="center" label="姓名" />
						<el-table-column property="userCode" align="center" label="工号" />
						<template v-if="roleType == 2">
							<el-table-column property="userCode" align="center" label="负责的范围">
								<template #default="scope">
									<span>{{ getOrgNameStr(scope.row) }}</span>
								</template>
							</el-table-column>
						</template>
						<el-table-column label="操作" width="120" align="center">
							<template #default="scope">
								<el-button type="text" @click="handleDelUser(scope.row)">删除</el-button>
								<el-button v-if="roleType == 2" type="text" @click="handleAddUser(scope.row)">修改</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-pagination
							class="right"
							@size-change="onHandleSizeChange"
							@current-change="onHandleCurrentChange"
							:current-page="tableData.param.pageNo"
							:page-size="tableData.param.limit"
							:page-sizes="[20, 30, 50]"
							layout="total, sizes, prev, pager, next, jumper"
							:total="tableData.total"
							background
						>
						</el-pagination>
					</el-col>
				</el-row>
			</el-scrollbar>
		</div>

		<!--修改-->
		<el-dialog :close-on-click-modal="false" center :title="title" v-model="editInfo.flag" width="500px">
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form :rules="editInfo.formRules" ref="userRef" label-width="auto" :label-position="'right'" :model="editInfo.formData">
						<el-form-item label="工号" prop="userCode">
							<search @change="handleChange" :control-type="SearchEnum.PERSON" v-model="editInfo.formData.userCode"></search>
						</el-form-item>
						<el-form-item label="范围选择" prop="selectList" v-if="roleType == 2">
							<org-tree ref="orgRef" :orgDataList="editInfo.formData.selectList" @change="handleSelectedOrgTree" :hasFilter="false"></org-tree>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="small">取 消</el-button>
					<el-button type="primary" @click="handleSave" size="small">保 存</el-button>
				</span>
			</template>
		</el-dialog>
	</darwer>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, onBeforeMount, getCurrentInstance, toRaw, ref, nextTick } from 'vue';
import { getRoleUserList, roleUserAdd, roleUserDelete, roleUserUpdate } from '/@/api/role/index.ts';
import Search from '/@/components/Search.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import orgTree from '/@/components/orgTree/index.vue';
import { SearchEnum } from '/@/enums/Search.ts';

export default defineComponent({
	name: 'left',
	components: { Search, orgTree },
	setup(props, { emit }) {
		const { proxy } = getCurrentInstance() as any;
		const formRef = ref();
		const userRef = ref();
		const state = reactive({
			isCollapse: false,
			total: 300,
			selection: [],
			roleType: 1,
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					pageNo: 1,
					limit: 20,
					userSearchKey: '',
					roleId: '',
				},
			},
			title: '新增人员',
			personData: {
				flag: false,
				title: '权限组名称',
				titleRole: '',
			},
			editInfo: {
				flag: false,
				formData: {
					id: '',
					groupCode: '',
					operationType: 1,
					userCode: '',
					userName: '',
					selectList: [],
				},
				formRules: {
					userCode: [{ required: true, message: '请输入姓名/工号', trigger: 'change' }],
					selectList: [{ required: true, message: '请选择组织', trigger: 'change' }],
				},
			},
			orgInfo: {
				checkedOrg: [],
				org: '',
			},
			recruitSourceDetailData: [],
		});
		const bandReset = () => {
			resetForm();
		};
		const onCancel = () => {
			state.editInfo.flag = false;
		};
		//查询页面
		const onSubmit = () => {
			state.tableData.param.pageNo = 1;
			getList();
		};
		const handleSelectionChange = (val: any) => {
			state.selection = val;
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.limit = val;
			getList();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.pageNo = val;
			getList();
		};
		const resetForm = () => {
			proxy.$refs.formRef.resetFields();
		};
		const getList = async () => {
			try {
				state.tableData.loading = true;
				const param = {
					pageNo: state.tableData.param.pageNo,
					limit: state.tableData.param.limit,
					roleId: state.tableData.param.roleId,
					userSearchKey: state.tableData.param.userSearchKey,
					// userCode: state.tableData.param.userCode,
					// groupCode: state.tableData.param.groupCode,
				};
				const res = await getRoleUserList(toRaw(param));
				if (res.status == 0) {
					state.tableData.data = res.data.resultData;
					state.tableData.total = res.data.total;
					state.tableData.loading = false;
				} else {
					state.tableData.loading = false;
					state.personData.flag= false;
					ElMessage.error(res.message);
				}
			} catch (ex) {
				state.tableData.loading = false;
			}
		};
		//处理
		const handleAddUser = async (row: any) => {
			state.editInfo.flag = !state.editInfo.flag;
			state.title = '新增人员';
			await nextTick();
			state.editInfo.formData.id = '';
			userRef.value.resetFields();
			if (row) {
				state.title = '修改';
				state.editInfo.formData.id = row.id;
				state.editInfo.formData.userCode = row.userCode;
				state.editInfo.formData.userName = row.userName;
				state.editInfo.formData.selectList = row.userScopeList;
			}

			userRef.value.clearValidate();
		};

		const handleDelUser = (row: any) => {
			ElMessageBox.confirm('确认要删除吗？', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(async () => {
					const res = await roleUserDelete(
						toRaw({
							id: row.id,
						})
					);
					if (res.status == 0) {
						ElMessage.success('删除成功');
						state.editInfo.flag = false;
						getList();
					} else {
						ElMessage.error(res.message);
					}
				})
				.catch(() => {});
		};

		// const handleDelUser = () => {
		// 	if (!state.selection || state.selection.length <= 0) {
		// 		ElMessage.error('至少选择一条！');
		// 		return false;
		// 	}
		// 	ElMessageBox.confirm('确认要删除吗？', {
		// 		confirmButtonText: '确认',
		// 		cancelButtonText: '取消',
		// 		type: 'warning',
		// 	})
		// 		.then(async () => {
		// 			let users = state.selection.map((x: any) => {
		// 				return {
		// 					userCode: x.userCode,
		// 					userName: x.userName,
		// 				};
		// 			});

		// 			let ids = state.selection.map((x: any) => {
		// 				return parseInt(x.id);
		// 			});
		// 			console.log(ids, 'ids');

		// 			const res = await roleUserDelete(
		// 				toRaw({
		// 					groupCode: state.editInfo.formData.groupCode,
		// 					operationType: OperationEnum.DELETE,
		// 					userCodes: users,
		// 					ids: ids,
		// 				})
		// 			);
		// 			if (res.status == 0) {
		// 				ElMessage.success('删除成功');
		// 				state.editInfo.flag = false;
		// 				getList();
		// 			} else {
		// 				ElMessage.error(res.message);
		// 			}
		// 		})
		// 		.catch(() => {});
		// };

		const open = async (row: any) => {
			state.personData.flag = !state.personData.flag;
			await nextTick();
			formRef.value.resetFields();
			state.roleType = row.roleType;
			state.personData.titleRole = row.roleTypeDesc;
			state.personData.title = `${row.roleName}`;
			state.editInfo.formData.roleId = row.id;
			state.tableData.param.roleId = row.id;
			getList();
		};

		const handleChange = (row: any) => {
			state.editInfo.formData.userCode = row.value;
			state.editInfo.formData.userName = row.desc;
		};

		const handleSave = () => {
			userRef.value.validate(async (valid: any) => {
				if (!valid) return false;
				let params = {
					id: state.editInfo.formData.id,
					roleId: state.tableData.param.roleId,
					userCode: state.editInfo.formData.userCode,
					userName: state.editInfo.formData.userName,
					userScopeList: state.editInfo.formData.selectList.map((x: any) => {
						return {
							...x,
							orgFullPk: x.orgCodeLine,
						};
					}),
				};
				const res = state.editInfo.formData['id'] ? await roleUserUpdate(toRaw(params)) : await roleUserAdd(toRaw(params));
				if (res.status == 0) {
					ElMessage.success('操作成功');
					state.editInfo.flag = false;
					getList();
				} else {
					ElMessage.error(res.message);
				}
			});
		};
		onBeforeMount(() => {
			getList();
		});
		return {
			...toRefs(state),
			onCancel,
			onSubmit,
			bandReset,
			handleSelectionChange,
			onHandleSizeChange,
			onHandleCurrentChange,
			handleAddUser,
			handleDelUser,
			open,
			handleSave,
			userRef,
			formRef,
			SearchEnum,
			handleChange,
			getOrgNameStr: (row: any) => {
				if (row.userScopeList && row.userScopeList.length > 0) {
					return row.userScopeList
						.map((x) => {
							return x.orgName;
						})
						.join(',');
				}
				return '';
			},
			//组织树选择
			handleSelectedOrgTree: (selectValue: any) => {
				state.editInfo.formData.selectList = selectValue;
				console.log(state.editInfo.formData.selectList, '11');
				// state.editForm.suoshudanwei = selectValue;
				// if (selectValue && selectValue.length > 0) {
				// 	state.editForm.danweiStr = state.editForm.suoshudanwei
				// 		.map((x) => {
				// 			return x.orgCode;
				// 		})
				// 		.join('');
				// }
			},
		};
	},
});
</script>
<style lang="scss" scoped>
.drawer-content {
	height: calc(100vh - 130px);
	.el-row {
		padding: 5px 0;
	}
}
.scorll-content {
	height: calc(100vh - 130px);
}

.right {
	float: right;
}

.title-icon {
	.el-icon {
		color: $color-primary;
		font-size: 20px;
		vertical-align: middle;
	}
	line-height: 30px;
	height: 30px;
}
.dialog-footer {
	text-align: center;
	display: block;
}
</style>
