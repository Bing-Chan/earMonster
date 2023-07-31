<template>
	<div id="pages">
		<div class="query_box">
			<el-form :inline="true" label-position="left"  :model="queryForm" ref="queryRef">
				<el-form-item label="角色名称/代码" prop="roleSearchKey">
					<el-input v-model.trim="queryForm.roleSearchKey" clearable placeholder="请输入角色名称/代码"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit" >查询</el-button>
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
					<el-table-column prop="roleCode" label="角色代码" align="center"></el-table-column>
					<el-table-column prop="roleName" label="角色名称" align="center"> </el-table-column>
					<el-table-column prop="roleTypeDesc" label="角色类型" align="center"></el-table-column>

					<el-table-column prop="createUser" label="更新人" align="center"></el-table-column>
					<el-table-column prop="createTime" label="更新时间" align="center"></el-table-column>
					<el-table-column label="操作" width="120" align="center">
						<template #default="scope">
							<el-button v-if="!['JS000001', 'JS000002'].includes(scope.row.roleCode)" type="text" @click="hanldeFenpei(scope.row)"
								>分配</el-button
							>
							<el-button v-if="!['JS000001', 'JS000002'].includes(scope.row.roleCode)" type="text" @click="addOrEdit(scope.row)"
								>修改</el-button
							>
							<el-button v-if="!['JS000001', 'JS000002'].includes(scope.row.roleCode)" type="text" @click="hanldeDelete(scope.row)"
								>删除</el-button
							>
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
		<el-dialog   :close-on-click-modal="false"  :title="formTitle" center v-model="addFlag" width="600px">
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form ref="formRef" :model="editForm" :rules="formRules" label-position="right" label-width="80px">
						<el-form-item label="角色名称" prop="roleName">
							<el-input v-model.trim="editForm.roleName" style="width: 100%" maxlength="100"></el-input>
						</el-form-item>
						<el-form-item label="角色类型" prop="roleType">
							<el-radio-group v-model="editForm.roleType" class="ml-4">
								<el-radio :label="1" size="large">普通角色</el-radio>
								<el-radio :label="2" size="large">特殊角色（无组织对应关系）</el-radio>
							</el-radio-group>
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

		<userlist ref="userlistRef"></userlist>
	</div>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted, getCurrentInstance, nextTick, toRaw } from 'vue';
import { getRoleList, roleAdd, roleDelete, roleUpate } from '/@/api/role/index.ts';
import userlist from './src/userlist.vue';
import { ElMessage, ElMessageBox } from 'element-plus';

export default defineComponent({
	name: 'role',
	components: { userlist },
	setup(props) {
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			currentPage: 1,
			limit: 20,
			total: 0,
			loading: false,
			importFlag: false,
			queryForm: {
				roleSearchKey: '',
			},
			tableData: [],
			formTitle: '',
			selection: [],
			addFlag: false,
			fenpeiFlag: false,
			editForm: {
				roleName: '',
				roleType: 1,
			},
			formRules: {
				roleName: [{ required: true, message: '请输入角色名称', trigger: 'change' }],
				roleType: [{ required: true, message: '请选择角色类型', trigger: 'change' }],
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
			state.formTitle = '新增角色';
			if (row) {
				state.formTitle = '修改角色';
				state.editForm = JSON.parse(JSON.stringify(row));
			}
			proxy.$refs.formRef.resetFields();
			proxy.$refs.formRef.clearValidate();
		};

		// 分配
		const hanldeFenpei = async (row: any) => {
			proxy.$refs.userlistRef.open(row);
		};

		const getList = async () => {
			let params = {
				pageNo: state.currentPage,
				limit: state.limit,
				roleSearchKey: state.queryForm.roleSearchKey,
			};
			let res = await getRoleList(params);
			state.tableData = res.data.resultData;
			state.total = res.data.total;
		};

		//启用/禁用
		const hanldeDelete = (row: any) => {
			ElMessageBox.confirm('确认要删除吗？', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(async () => {
					state.loading = true;
					const res = await roleDelete(
						toRaw({
							id: row.id,
						})
					);
					state.loading = false;
					if (res.status == 0) {
						ElMessage.success('删除成功');
						getList();
					} else {
						ElMessage.error(res.message);
					}
				})
				.catch(() => {});
		};

		// 保存
		const handleSave = () => {
			proxy.$refs.formRef.validate(async (valid: any) => {
				if (!valid) return false;
				state.loading = true;
				const res = state.editForm.id ? await roleUpate(toRaw(state.editForm)) : await roleAdd(toRaw(state.editForm));
				state.loading = false;
				if (res.status == 0) {
					state.addFlag = false;
					ElMessage.success('保存成功！');
					getList();
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
			hanldeDelete,
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
