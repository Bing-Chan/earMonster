<template>
	<div id="pages">
		<div class="panl-head">
			<h2>{{ formTitle }}</h2>
			<el-button type="primary" class="btn" @click="goBack" size="small">返回</el-button>
		</div>
		<div style="background: #edf2ff">
			<div style="width: 65%">
				<el-steps align-center="false" process-status="process" v-show="dialogTitle !== '指标公式'" :active="stepActiveIndex" simple>
					<el-step title="填写基本信息">
						<template #icon> <span class="tag-number">1</span></template>
					</el-step>
					<el-step title="设置薪资结构">
						<template #icon><span class="tag-number">2</span></template>
					</el-step>
				</el-steps>
			</div>
		</div>
		<div class="content_list" style="min-height: 800px">
			<div class="step-content" v-show="stepActiveIndex == 1">
				<el-form label-position="right" label-width="100px" ref="formRef" :model="editForm" :rules="formRules">
					<el-form-item label="模板名称" prop="templateName">
						<el-input v-model="editForm.templateName" clearable placeholder="请输入模板名称"></el-input>
					</el-form-item>

					<el-form-item label="适用人员" prop="suitStaff">
						<el-input v-model="editForm.suitStaff" disabled clearable placeholder="请输入适用人员"></el-input>
					</el-form-item>

					<el-form-item label="有效期开始" prop="effectiveStartTime">
						<el-date-picker
							format="YYYY-MM-DD"
							placeholder="请选择有效期开始"
							type="date"
							style="width: 100%"
							v-model="editForm.effectiveStartTime"
						></el-date-picker>
					</el-form-item>

					<el-form-item label="有效期结束" prop="effectiveEndTime">
						<el-date-picker
							format="YYYY-MM-DD"
							placeholder="请选择有效期结束"
							type="date"
							style="width: 100%"
							v-model="editForm.effectiveEndTime"
						></el-date-picker>
					</el-form-item>

					<div class="setp-btns">
						<!-- <el-button type="default" @click="addFlag = false">取 消</el-button> -->
						<el-button type="primary" @click="handleStep(1)">下一步</el-button>
					</div>
				</el-form>
			</div>
			<div class="step-content" v-show="stepActiveIndex == 2">
				<jiegou
					ref="jiegouRef"
					:dicList="dicList"
					:tableData="setpInfo.tableData"
					:idEdit="true"
					@up="stepActiveIndex = 1"
					@review="handleYulan"
				></jiegou>
				<div style="min-height: 60px"></div>
			</div>
		</div>
		<!--预览结果-->
		<el-dialog custom-class="step-dialog" :close-on-click-modal="false" title="预览" v-model="yulanFlag" center width="1000px">
			<div style="padding: 10px 15px">
				<yulan
					@delete="handleDeleteTag"
					:dicList="dicList"
					:selection="selection"
					@save="handleSave"
					:isEdit="true"
					@close="yulanFlag = false"
				></yulan>
			</div>
		</el-dialog>
	</div>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted, inject, getCurrentInstance, nextTick, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import dayjs from 'dayjs';
import { dateFormat } from '/@/utils/formatTime';
import { ElMessageBox, ElMessage } from 'element-plus';
import {
	getSalaryStructureList,
	salaryStructureAdd,
	salaryStructureEdit,
	salaryStructureDelete,
	salaryStructureInfo,
} from '/@/api/salaryStructure/index';
import { getSalaryConfigAllList } from '/@/api/salaryConfig/index';
import jiegou from './src/jiegou.vue';
import yulan from './src/yulan.vue';

export default defineComponent({
	name: 'left',
	components: {
		jiegou,
		yulan,
	},
	setup(props) {
		const { proxy } = getCurrentInstance() as any;
		const loading = ref(false);
		const state = reactive({
			viewFlag: false,
			viewTab: '1',
			yulanFlag: false,
			stepActiveIndex: 1,
			addFlag: false,
			formTitle: '新增薪资结构模板',
			selection: [],
			queryForm: {
				templateName: '',
				currentPage: 1,
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

		const router = useRouter();
		const route = useRoute();
		const lodash = inject('lodash');

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
				router.go(-1);
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
			let list = res.data;
			let id = route.query.id;
			await nextTick();
			state.selection = [];
			state.formTitle = '新增薪资结构模板';
			proxy.$refs.formRef.resetFields();
			debugger;
			if (id && id != '') {
				state.formTitle = '编辑薪资结构模板';
				const res = await salaryStructureInfo({ id: id });
				if (res.status == 0) {
					state.editForm = JSON.parse(JSON.stringify(res.data));
					state.setpInfo.tableData = list.filter(
						(x) => x.effectiveStatus || res.data.salaryItemAddReqList.some((y) => x.id === y.salaryItemConfigId)
					);
					state.selection = list.filter((x) => res.data.salaryItemAddReqList.some((y) => x.id === y.salaryItemConfigId));
				} else {
					ElMessage.error(res.message);
				}
			} else {
				state.setpInfo.tableData = list.filter((x) => x.effectiveStatus);
			}

			proxy.$refs.formRef.clearValidate();
		};

		const handleDeleteTag = (item) => {
			state.selection = state.selection.filter((x) => x.id !== item.id);
			proxy.$refs.jiegouRef.toggleRowSelection(state.selection);
		};

		// 返回
		const goBack = () => {
			router.go(-1);
		};

		onMounted(() => {
			init();
		});

		return {
			...toRefs(state),
			loading,
			handleStep,
			handleDeleteTag,
			handleSave,
			handleYulan,
			goBack,
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
.step-content {
	padding: 0px 0px;
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

.panl-head {
	width: 100%;
	background: #ffffff;
	min-height: 50px;
	margin-bottom: 0px;
	padding: 0px 10px;
	line-height: 50px;
	h2 {
		float: left;
	}
	.btn {
		float: right;
		margin-right: 10px;
		margin-top: 10px;
	}
}

.setp-btns {
	text-align: right;
	position: fixed;
	background: #ffffff;
	z-index: 999;
	bottom: 0px;
	right: 0px;
	height: 60px;
	padding: 0px 30px;
	width: 100%;
	border-top: solid 1px #eeeeee;
	padding-top: 10px;
}
</style>
