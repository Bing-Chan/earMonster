<template>
	<div id="pages">
		<div class="panl-head">
			<h2>薪资组详情</h2>
			<span style="padding-left: 10px"><el-tag>2023-03-03开始生效</el-tag></span>
			<el-button type="primary" class="btn" size="small">返回</el-button>
		</div>
		<div class="query_box" style="margin-top: 10px">
			<el-form ref="queryRef" :inline="true" :model="queryForm" label-position="left">
				<el-form-item label="名称" prop="templateName">
					<el-input v-model.trim="queryForm.templateName" clearable placeholder="请输入名称"></el-input>
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
					<el-button type="primary" @click="importFlag = true">导入新增</el-button>
				</div>
			</div>
			<div class="table_list">
				<el-table :data="tableData" stripe border style="width: 100%" height="100%">
					<template #empty><SysEmpty></SysEmpty></template>
					<el-table-column min-width="120px" show-overflow-tooltip prop="monthSalaryStructure" label="编码" align="center"></el-table-column>
					<el-table-column min-width="100px" show-overflow-tooltip prop="monthSalaryStructure" label="中心" align="center"></el-table-column>
					<el-table-column min-width="100px" show-overflow-tooltip prop="monthSalaryStructure" label="模块" align="center"></el-table-column>
					<el-table-column min-width="100px" show-overflow-tooltip prop="monthSalaryStructure" label="工序岗位" align="center"></el-table-column>
					<el-table-column min-width="100px" show-overflow-tooltip prop="monthSalaryStructure" label="员工类型" align="center"></el-table-column>
					<el-table-column min-width="100px" show-overflow-tooltip prop="monthSalaryStructure" label="薪资标准" align="center"></el-table-column>
					<el-table-column min-width="100px" show-overflow-tooltip prop="monthSalaryStructure" label="基本工资" align="center"></el-table-column>
					<el-table-column min-width="100px" show-overflow-tooltip prop="monthSalaryStructure" label="绩效工资" align="center"></el-table-column>
					<el-table-column min-width="100px" show-overflow-tooltip prop="monthSalaryStructure" label="质量考核工资" align="center"></el-table-column>

					<el-table-column prop="annTitle" min-width="120px" label="操作" fixed="right" align="center">
						<template #default="scope">
							<el-button type="text" @click="addOrEdit(scope.row)">编辑</el-button>
							<el-button type="text" @click="addOrEdit(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="pagination" ref="pagination">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="queryForm.pageNo"
					:page-size="queryForm.limit"
					:page-sizes="[20, 30, 50]"
					layout="total, sizes, prev, pager, next, jumper"
					:total="queryForm.total"
				>
				</el-pagination>
			</div>
		</div>

		<!--导入-->
		<el-dialog custom-class="step-dialog" :close-on-click-modal="false" title="导入" v-model="importFlag" center width="800px">
			<div style="padding: 10px 15px">
				<by-import></by-import>
			</div>
		</el-dialog>
	</div>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted, inject, getCurrentInstance, nextTick, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { dateFormat } from '/@/utils/formatTime';
import { ElMessageBox, ElMessage } from 'element-plus';
import byImport from '/@/components/byImport.vue';
import {
	getSalaryStructureList,
	salaryStructureAdd,
	salaryStructureEdit,
	salaryStructureDelete,
	salaryStructureInfo,
} from '/@/api/salaryStructure/index';
import { getSalaryConfigAllList } from '/@/api/salaryConfig/index';

export default defineComponent({
	name: 'left',
	components: {
		byImport,
	},
	setup(props) {
		const { proxy } = getCurrentInstance() as any;
		const loading = ref(false);
		const router = useRouter();
		const state = reactive({
			importFlag: false,
			viewFlag: false,
			viewTab: '1',
			yulanFlag: false,
			stepActiveIndex: 1,
			addFlag: false,
			formTitle: '新增薪资结构模板',
			selection: [],
			defaulCheckedKeys: [],
			queryForm: {
				templateName: '',
				pageNo: 1,
				limit: 20,
				total: 0,
			},
			editForm: {
				templateName: '',
				effectiveEndTime: '',
				effectiveStartTime: '',
				id: '',
				suitStaff: '上海转运中心操作工',
			},
			formRules: {
				templateName: [{ required: true, message: '请输入模板名称', trigger: 'blue' }],
				effectiveStartTime: [{ required: true, message: '请选择有效开始日期', trigger: 'change' }],
				suitStaff: [{ required: true, message: '请输入适用人员', trigger: 'change' }],
			},
			tableData: [],
			dicList: {
				itemCategory: [
					{ categoryCode: 'basic_salary', category: '基本薪资', paymentType: 'income' },
					{ categoryCode: 'performance', category: '绩效', paymentType: 'income' },
					{ categoryCode: 'allowances', category: '津补贴', paymentType: 'income' },
					{ categoryCode: 'pre_tax_deductions', category: '税前扣款', paymentType: 'deduction' },
					{ categoryCode: 'social_security_housing_fund', category: '社保公积金', paymentType: 'deduction' },
					{ categoryCode: 'tax_deductions', category: '扣税', paymentType: 'deduction' },
					{ categoryCode: 'post_tax_deductions', category: '税后扣款', paymentType: 'deduction' },
				],
				actualValueSource: [
					{ name: '系统计算', code: 'system' },
					{ name: '人工维护', code: 'artificial' },
				],
				allocateToDaily: [
					{ name: '是', code: 1 },
					{ name: '否', code: 0 },
				],
			},
			setpInfo: {
				itemCategory: '',
				actualValueSource: '',
				allocateToDaily: '',
				tableData: [],
			},
		});

		const lodash = inject('lodash');

		const onSubmit = () => {
			state.queryForm.pageNo = 1;
			getList();
		};

		const getList = async () => {
			let res = await getSalaryStructureList(state.queryForm);
			console.log(res);
			if (res.status == 0) {
				state.tableData = res.data.resultData;
				state.queryForm.total = res.data.total;
			}
		};

		const bandReset = () => {
			proxy.$refs.queryRef.resetFields();
		};

		const handleSizeChange = (val: number) => {
			state.queryForm.limit = val;
			getList();
		};
		const handleCurrentChange = (val: number) => {
			state.queryForm.pageNo = val;
			getList();
		};

		// 打开
		const addOrEdit = async (row: any, isView) => {
			let id = '',
				path = '/salaryStructure/add';
			if (row) {
				path = '/salaryStructure/edit';
				id = row.id;
			}
			if (isView) {
				path = '/salaryStructure/view';
			}
			router.push({
				path: path,
				query: {
					id: id,
				},
			});
		};

		const handleStep = (step) => {
			proxy.$refs.formRef.validate(async (valid) => {
				if (!valid) return false;
				if (state.editForm.effectiveEndTime != '' && dayjs(state.editForm.effectiveEndTime).isBefore(state.editForm.effectiveStartTime)) {
					ElMessage.error('开始时间须小于结束时间！');
					return false;
				}
				state.stepActiveIndex = 2;
				proxy.$refs.jiegouRef.toggleRowSelection(state.selection);
			});
		};

		const handleSelectionChange = (val: any) => {
			state.selection = val;
		};

		const hanldeDelete = (row) => {
			ElMessageBox.confirm('确认要删除吗？', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(async () => {
					const res = await salaryStructureDelete({ id: row.id });
					if (res.status == 0) {
						ElMessage.success('删除成功');
						getList();
					} else {
						ElMessage.error(res.message);
					}
				})
				.catch(() => {});
		};

		const handleSave = async () => {
			if (!state.selection || state.selection.length == 0) {
				ElMessage.error('请设置薪资结构！');
				return false;
			}
			let parmas = {
				...state.editForm,
				...{
					effectiveEndTime: dateFormat(state.editForm.effectiveEndTime),
					effectiveStartTime: dateFormat(state.editForm.effectiveStartTime),
					salaryItemAddReqList: state.selection.map((x) => {
						return {
							dailySalaryStructFlag: x.allocateToDaily == 1,
							monthSalaryStructFlag: true,
							salaryCategoryCode: x.itemCategory,
							salaryItemConfigId: x.id,
						};
					}),
				},
			};

			let res;
			if (state.formTitle == '编辑薪资结构模板') {
				res = await salaryStructureEdit(parmas);
			} else {
				res = await salaryStructureAdd(parmas);
			}
			console.log(res);
			if (res.status == 0) {
				ElMessage.success('保存成功');
				state.yulanFlag = false;
				state.addFlag = false;
				getList();
			} else {
				ElMessage.error(res.message);
			}
		};

		const handleYulan = (result) => {
			state.yulanFlag = true;
			state.selection = result;
		};

		const init = async () => {
			let res = await getSalaryConfigAllList({ start: 0 });
			if (res.status == 0) {
				state.setpInfo.tableData = res.data;
			} else {
			}
		};

		const handleDeleteTag = (item) => {
			state.selection = state.selection.filter((x) => x.id !== item.id);
			proxy.$refs.jiegouRef.toggleRowSelection(state.selection);
		};

		onMounted(() => {
			init();
			getList();
		});

		return {
			...toRefs(state),
			bandReset,
			loading,
			addOrEdit,
			handleStep,
			handleSizeChange,
			handleCurrentChange,
			handleDeleteTag,
			handleSelectionChange,
			onSubmit,
			handleSave,
			hanldeDelete,
			handleYulan,
		};
	},
});
</script>
<style>
.step-dialog .el-dialog__body {
	padding-top: 0px !important;
	padding-left: 0px !important;
	padding-right: 0px !important;
}
.step-dialog .el-alert__content {
	padding: 0px 0px;
	font-size: 12px !important;
}

.step-content {
	padding: 20px 30px;
}
.alert-title .el-alert__title {
	font-size: 10px !important;
}

.el-step__line-inner {
	border-style: none;
}
</style>
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

.el-steps--simple {
	padding: 13px 20px;
	background: #edf2ff;
}

.tag-number {
	width: 16px;
	padding: 0 0;
	height: 16px;
	line-height: 16px;
	border-radius: 50%;
	border: solid 1px #c0c4cc;
	display: inline-block;
	text-align: center;
}

.is-finish .is-text {
	.tag-number {
		border: solid 1px #4c84ff !important;
	}
}

.filter-list {
	width: 100%;
	display: flex;
	box-sizing: border-box; //宽度包含边距
	outline: none;
	margin: 0;
	padding: 0;
	position: relative;
	overflow: hidden;
	line-height: 26px;
	&-title {
		width: 60px;
		font-size: 12px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #333333;
		line-height: 26px;
	}
	&-item {
		flex: 1;
		.el-tag {
			font-size: 12px;
			margin-left: 10px;

			&:hover {
				// background: #ecf5ff;
				// color: #409eff;
				// border-color:#d9ecff ;
				cursor: pointer;
			}
		}

		.dd-active {
			color: $color-primary;
		}
	}

	::v-deep(.el-input) {
		width: 120px !important;
		font-size: 12px;
	}
}

.lin20px {
	line-height: 10px;
	height: 10px;
}

.report-list {
	width: 100%;
	height: 400px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-content: center;
	padding-left: 10px;
	padding-top: 10px;
	&-item,
	&-w300 {
		flex: 1;
		width: 100px;
		height: 100%;
		margin-right: 10px;
		font-size: 12px;

		.title {
			padding: 0px 5px;
			line-height: 20px;
			height: 20px;
			border: solid 1px #cccccc;
			text-align: center;
			font-weight: 700;
			background: #daebfe;
		}
		.flag {
			padding: 0px 5px;
			line-height: 20px;
			word-wrap: break-word;
			border: solid 1px #cccccc;
			border-top: 0px;
			text-align: center;
			background: #ffffff;
			position: relative;

			.close {
				display: none;
				position: absolute;
				right: 5px;
				z-index: 999;
				top: 0px;
				cursor: pointer;
			}
		}
		.flag:hover {
			.close {
				display: block;
			}
		}
	}

	&-w300 {
		flex: content;
		width: 150px;
	}
}

.report-day {
	width: 100%;
	height: 150px;
	background: #eff6ff;
	display: flex;
	justify-content: flex-start;
	padding-left: 10px;
	padding-top: 10px;
	&-w150 {
		width: 100px;
		height: 100%;
		margin-right: 10px;
		font-size: 12px;

		.title {
			padding: 0px 5px;
			line-height: 20px;
			height: 20px;
			border: solid 1px #cccccc;
			text-align: center;
			font-weight: 700;
			background: #daebfe;
		}
		.flag {
			padding: 0px 5px;
			line-height: 20px;
			word-wrap: break-word;
			border: solid 1px #cccccc;
			border-top: 0px;
			text-align: center;
			background: #ffffff;
		}
	}
}
</style>
