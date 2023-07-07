<template>
	<div id="pages">
		<div class="query_box">
			<el-form ref="queryRef" :inline="true" :model="queryForm" label-position="left">
				<el-form-item label="名称" prop="templateNameOrCode">
					<el-input v-model.trim="queryForm.templateNameOrCode" clearable placeholder="请输入名称"></el-input>
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
				<el-table :data="tableData" stripe border style="width: 100%" height="100%">
					<template #empty><SysEmpty></SysEmpty></template>
					<el-table-column label="名称" align="center"></el-table-column>
					<el-table-column prop="templateCode" min-width="160" label="月薪结构" align="center"></el-table-column>
					<el-table-column prop="templateCode" min-width="160" label="日薪结构" align="center"></el-table-column>
					<el-table-column prop="templateCode" min-width="160" label="适用人员" align="center"></el-table-column>
					<el-table-column prop="templateName" min-width="200" label="日薪结构" align="center">
						<template #default="scope">
							<el-button type="text" @click="handleConfig(scope.row)">{{ scope.row.templateName }}</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="templateName" min-width="200" label="有效期" align="center"> </el-table-column>
					<el-table-column prop="templateName" min-width="200" label="引用状态" align="center"> </el-table-column>

					<el-table-column prop="annTitle" label="操作" fixed="right" min-width="120" align="center">
						<template #default="scope">
							<el-button type="text" @click="addOrEdit(scope.row)">修改</el-button>
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
		<el-dialog custom-class="step-dialog" :close-on-click-modal="false" :title="formTitle" v-model="addFlag" center width="850px">
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
			<div class="step-content" v-if="stepActiveIndex == 1">
				<el-form label-position="right" label-width="100px" ref="indicatorRef" :model="editForm" :rules="formRules">
					<el-form-item label="模板名称" prop="quotaName" required>
						<el-input
							:disabled="editForm.modifyFlag == 'no' || editForm.formulaModifyFlag"
							v-model="editForm.quotaName"
							clearable
							placeholder="请输入"
						></el-input>
					</el-form-item>

					<el-form-item label="适用人员" prop="quotaName" required>
						<el-input
							:disabled="editForm.modifyFlag == 'no' || editForm.formulaModifyFlag"
							v-model="editForm.quotaName"
							clearable
							placeholder="请输入"
						></el-input>
					</el-form-item>

					<el-form-item label="有效期开始" prop="quotaName" required>
						<el-input
							:disabled="editForm.modifyFlag == 'no' || editForm.formulaModifyFlag"
							v-model="editForm.quotaName"
							clearable
							placeholder="请输入"
						></el-input>
					</el-form-item>

					<el-form-item label="有效期结束" prop="quotaName" required>
						<el-input
							:disabled="editForm.modifyFlag == 'no' || editForm.formulaModifyFlag"
							v-model="editForm.quotaName"
							clearable
							placeholder="请输入"
						></el-input>
					</el-form-item>

					<div style="text-align: right">
						<el-button type="default">取 消</el-button>
						<el-button type="primary" @click="handleStep(1)">下一步</el-button>
					</div>
				</el-form>
			</div>
			<div class="step-content" v-if="stepActiveIndex == 2">
				<div>
					<div class="filter-list">
						<div class="filter-list-title">薪资分类</div>
						<div class="filter-list-item">
							<el-tag class="ml-2" @click="handleChange('', 'shijizhi')" :type="setpInfo.shijizhi == '' ? '' : 'info'">全部</el-tag>
							<el-tag
								class="ml-2"
								val="item.code"
								v-for="item in dicList.shijizhi"
								:key="item.code"
								@click="handleChange(item.code, 'shijizhi')"
								:type="setpInfo.shijizhi == item.code ? '' : 'info'"
								>{{ item.name }}</el-tag
							>
						</div>
					</div>
					<div class="lin20px"></div>
					<div class="filter-list">
						<div class="filter-list-title">实际值来源</div>
						<div class="filter-list-item">
							<el-tag class="ml-2" @click="handleChange('', 'fenlei')" :type="setpInfo.fenlei == '' ? '' : 'info'">全部</el-tag>
							<el-tag
								class="ml-2"
								val="item.code"
								v-for="item in dicList.fenlei"
								:key="item.code"
								@click="handleChange(item.code, 'fenlei')"
								:type="setpInfo.fenlei == item.code ? '' : 'info'"
								>{{ item.name }}</el-tag
							>
						</div>
					</div>
					<div class="lin20px"></div>
					<div class="filter-list">
						<div class="filter-list-title">分摊到日</div>
						<div class="filter-list-item">
							<el-tag class="ml-2" @click="handleChange('', 'fentan')" :type="setpInfo.fentan == '' ? '' : 'info'">全部</el-tag>
							<el-tag
								class="ml-2"
								val="item.code"
								v-for="item in dicList.fentan"
								:key="item.code"
								@click="handleChange(item.code, 'fentan')"
								:type="setpInfo.fentan == item.code ? '' : 'info'"
								>{{ item.name +' '+toFenleiNum() }}</el-tag
							>
						</div>
					</div>
					<div class="lin20px"></div>

					<div>
						<el-table :data="setpInfo.tableData" stripe @selection-change="handleSelectionChange" border style="width: 100%" height="350px">
							<template #empty><SysEmpty></SysEmpty></template>
							<el-table-column fixed type="selection" align="center" width="55"> </el-table-column>
							<el-table-column prop="name" fixed label="薪资项分类" min-width="100" align="center"></el-table-column>
							<el-table-column prop="name" fixed min-width="120" label="薪资项名称 " align="center"></el-table-column>
							<el-table-column prop="name" label="适用明细" align="center"></el-table-column>
							<el-table-column prop="name" label="类型" align="center"></el-table-column>
							<el-table-column prop="name" label="从应发中扣除" align="center"> </el-table-column>
							<el-table-column prop="templateName" label="税前项目" align="center"> </el-table-column>
							<el-table-column prop="templateName" label="分摊到日" align="center"> </el-table-column>
							<el-table-column prop="templateName" min-width="150" label="实际值来源" align="center"> </el-table-column>
						</el-table>
					</div>
					<div class="lin20px"></div>
					<div style="text-align: right">
						<el-button type="default" @click="stepActiveIndex = 1">上一步</el-button>
						<el-button type="primary" @click="yulanFlag = true">预 览</el-button>
					</div>
				</div>
			</div>
		</el-dialog>

		<!--预览结果-->
		<el-dialog :close-on-click-modal="false" title="预览" v-model="yulanFlag" center width="900px">
			<div style="background: #eff6ff">
				<el-scrollbar>
					<div class="report-list">
						<div class="report-list-item">
							<div class="title">{{ dicList.fenlei.find((x) => x.code == 1).name }}</div>
							<div class="flag" v-for="(item, index) in selection.filter((x) => x.type == 1)" :key="index">{{ item.name }}</div>
						</div>
						<div class="report-list-item">
							<div class="title">{{ dicList.fenlei.find((x) => x.code == 2).name }}</div>
							<div class="flag" v-for="(item, index) in selection.filter((x) => x.type == 2)" :key="index">{{ item.name }}</div>
						</div>
						<div class="report-list-item">
							<div class="title">{{ dicList.fenlei.find((x) => x.code == 3).name }}</div>
							<div class="flag" v-for="(item, index) in selection.filter((x) => x.type == 3)" :key="index">{{ item.name }}</div>
						</div>
						<div class="report-list-item">
							<div class="title">{{ dicList.fenlei.find((x) => x.code == 4).name }}</div>
							<div class="flag" v-for="(item, index) in selection.filter((x) => x.type == 4)" :key="index">{{ item.name }}</div>
						</div>
						<div class="report-list-item">
							<div class="title">{{ dicList.fenlei.find((x) => x.code == 5).name }}</div>
							<div class="flag" v-for="(item, index) in selection.filter((x) => x.type == 5)" :key="index">{{ item.name }}</div>
						</div>
						<div class="report-list-item">
							<div class="title">{{ dicList.fenlei.find((x) => x.code == 6).name }}</div>
							<div class="flag" v-for="(item, index) in selection.filter((x) => x.type == 6)" :key="index">{{ item.name }}</div>
						</div>
						<div class="report-list-item">
							<div class="title">{{ dicList.fenlei.find((x) => x.code == 7).name }}</div>
							<div class="flag" v-for="(item, index) in selection.filter((x) => x.type == 7)" :key="index">{{ item.name }}</div>
						</div>
					</div>
				</el-scrollbar>
			</div>

			<div class="lin20px"></div>
			<div class="report-day">
				<div class="report-day-item">
					<div class="title">{{ dicList.fenlei.find((x) => x.code == 1).name }}</div>
					<div class="flag" v-for="(item, index) in selection.filter((x) => x.type == 1)" :key="index">{{ item.name }}</div>
				</div>
				<div class="report-day-item">
					<div class="title">{{ dicList.fenlei.find((x) => x.code == 2).name }}</div>
					<div class="flag" v-for="(item, index) in selection.filter((x) => x.type == 2)" :key="index">{{ item.name }}</div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted, getCurrentInstance, nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { ElMessageBox, ElMessage } from 'element-plus';
import { getQuanZhong, getState } from '/@/utils/other.ts';
import { store } from '/@/store/index';

export default defineComponent({
	name: 'left',
	setup(props) {
		const { proxy } = getCurrentInstance() as any;
		const loading = ref(false);
		const state = reactive({
			yulanFlag: false,
			stepActiveIndex: 1,
			currentPage: 1,
			limit: 20,
			total: 0,
			addFlag: false,
			formTitle: '新增薪资结构模板',
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
			dicList: {
				fenlei: [
					{ name: '基本薪资', code: 1 },
					{ name: '绩效', code: 2 },
					{ name: '津补贴', code: 3 },
					{ name: '税前扣款', code: 4 },
					{ name: '社保公积金', code: 5 },
					{ name: '扣税 ', code: 6 },
					{ name: '税后扣款', code: 7 },
				],
				shijizhi: [
					{ name: '系统计算', code: 1 },
					{ name: '人工维护', code: 2 },
				],
				fentan: [
					{ name: '是', code: 1 },
					{ name: '否', code: 2 },
				],
			},
			setpInfo: {
				fenlei: '',
				shijizhi: '',
				fentan: '',
				tableData: [
					{ name: '基本薪资', code: 1, type: 1 },
					{ name: '绩效', code: 2, type: 1 },
					{ name: '津补贴', code: 3, type: 1 },
					{ name: '税前扣款', code: 4, type: 1 },
					{ name: '社保公积金', code: 5, type: 2 },
					{ name: '扣税 ', code: 6, type: 2 },
					{ name: '税后扣款', code: 7, type: 2 },
					{ name: '基本薪资', code: 1, type: 2 },
					{ name: '绩效', code: 2, type: 2 },
					{ name: '津补贴', code: 3, type: 2 },
					{ name: '税前扣款', code: 4, type: 3 },
					{ name: '社保公积金', code: 5, type: 3 },
					{ name: '扣税 ', code: 6, type: 4 },
					{ name: '税后扣款', code: 7, type: 4 },
					{ name: '税后扣款', code: 7, type: 4 },
					{ name: '税后扣款', code: 7, type: 4 },
					{ name: '税后扣款', code: 7, type: 4 },
					{ name: '税后扣款', code: 7, type: 4 },
					{ name: '税后扣款', code: 7, type: 4 },
					{ name: '税后扣款税后扣款税后', code: 7, type: 4 },
					{ name: '税后扣款', code: 7, type: 4 },
					{ name: '税后扣款', code: 7, type: 4 },
					{ name: '税后扣款', code: 7, type: 4 },

					{ name: '税后扣款', code: 7, type: 4 },
					{ name: '税后扣款', code: 7, type: 4 },
					{ name: '税后扣款', code: 7, type: 5 },
					{ name: '税后扣款', code: 7, type: 5 },
					{ name: '税后扣款', code: 7, type: 6 },
					{ name: '税后扣款', code: 7, type: 7 },
					{ name: '税后扣款', code: 7, type: 7 },
				],
			},
		});

		const router = useRouter();
		const bandReset = () => {
			proxy.$refs.queryRef.resetFields();
		};

		// 打开
		const addOrEdit = async (row: any) => {
			state.addFlag = true;
			await nextTick();
			state.formTitle = '新增薪资结构模板';
			proxy.$refs.formRef.resetFields();
			if (row) {
				state.formTitle = '编辑薪资结构模板';
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

		const handleStep = (step) => {
			state.stepActiveIndex = 2;
		};

		// 过滤当前选中的数据
		const handleChange = (val: any, column: string) => {
			state.setpInfo[column] = val;
		};

		const handleSelectionChange = (val: any) => {
			state.selection = val;
			console.log(state.selection, 'state.selection ');
		};

		onMounted(() => {});

		return {
			...toRefs(state),
			bandReset,
			loading,
			getQuanZhong,
			getState,
			addOrEdit,
			handleStep,
			handleChange,
			handleSelectionChange,
			handleChangeType: () => {
				state.editForm.calculateMode = 1;
			},
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
	&-item {
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
		}
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
	&-item {
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
		}
	}
}
</style>
