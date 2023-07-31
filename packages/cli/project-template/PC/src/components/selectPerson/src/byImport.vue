<template>
	<div>
		<div class="upload-wapper" v-if="!importIfSuccess">
			<el-upload
				accept="application/vnd.ms-excel"
				:show-file-list="false"
				class="upload-demo"
				:before-upload="beforeUpload"
				action="#"
				drag
				:multiple="false"
				:http-request="toUpload"
			>
				<div class="el-upload__text" style="padding-top: 60px">
					<span class="uploadIcon"><SvgIcon :name="'elementUpload'" :size="40"></SvgIcon></span><br />
					<span>拖动到此处或者<el-button style="font-size: 14px" type="text"> 点击导入 </el-button></span>
					<!-- <el-button type="primary" size="200">
						<div style="font-weight: 500; line-height: 26px; font-size: 16px">
							<SvgIcon :name="'elementUpload'" :size="16"></SvgIcon>
							点击导入
						</div>
					</el-button> -->
				</div>
				<template #tip>
					<div style="text-align: center">
						<div style="font-size: 12px; line-height: 16px">
							支持xls、xlsx文件，且文件大小不能超过20MB,<el-button type="text" @click="exportTemplate">下载模板</el-button>
						</div>
					</div>
				</template>
			</el-upload>
		</div>

		<div v-else class="pageList">
			<div class="content_list">
				<span style="line-height: 36px"
					>导入数据{{ successNums }}条，以下数据为成功{{ successNums }}条，失败{{ failNums }}条
					<span v-if="failKey"
						>请
						<el-button style="font-size: 14px" type="text" @click="downloadXls"> 点击此处下载 </el-button>
						查看。</span
					></span
				>
				<el-button style="float: right; font-size: 14px" type="text" title="重新导入" @click="hanldeReset">
					重新导入<SvgIcon :name="'elementUpload'" :size="16"></SvgIcon>
				</el-button>
				<div class="table_list">
					<el-table height="400px" :data="tableData" stripe @selection-change="handleSelectionChange" border style="width: 100%">
						<template #empty><SysEmpty></SysEmpty></template>
						<el-table-column prop="orgCode"  label="工号" min-width="80" align="center"></el-table-column>
						<el-table-column prop="orgName" show-overflow-tooltip  min-width="80" label="姓名" align="center"></el-table-column>
						<el-table-column prop="jobName" show-overflow-tooltip min-width="120" label="岗位名称" align="center"></el-table-column>
						<el-table-column prop="deptName" show-overflow-tooltip min-width="120" label="部门名称" align="center"></el-table-column>
						<el-table-column prop="unitName" show-overflow-tooltip  label="单位名称" align="center"></el-table-column>
						<el-table-column  label="状态" min-width="80" align="center">
							<template #default="scope">
								<span class="td-number">成功</span>
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
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, reactive, toRefs, ref, onMounted, watchEffect } from 'vue';
import { downloadFile } from '/@/utils/download';
import { ElMessage } from 'element-plus';
import { useArrayFilter } from '/@/hooks/core/useArrayFilter';
import { uploadFile, indicatorDownTemplete, exportFail } from '/@/api/org/index.ts';

export default defineComponent({
	name: 'byImport',
	props: {
		// 选择的节点
		selectedList: {
			type: Array,
			default() {
				return [];
			},
		},
		// 双向绑定
		modeValue: {
			type: Boolean,
			default: () => false,
		},
		jobType: {
			type: Number,
			default: () => 1,
		},
		type: {
			type: String,
			default: () => '',
		},
		title: {
			type: String,
			default: () => '',
		},
	},
	emits: ['update:selectedList'],
	setup(props, { emit }) {
		const state = reactive({
			tableData: [],
			result: [],
			currentPage: 1,
			limit: 20,
			total: 0,
			exportLoading: false,
			importDialog: false,
			importIfSuccess: false,
			fileName: '',
			importTotal: 0,
			importResult: {
				title: '导入成功',
				message: '',
				success: true,
			},
			selected: [],
			importResultIcon: 'success',
			failNums: 0,
			successNums: 0,
			failKey: '',
		});

		const funcListRef = ref({
			uploadFile: (params) => {},
			indicatorDownTemplete: () => {},
			exportFail: (params) => {},
		});
		const importIndicator = () => {
			state.importDialog = true;
		};
		const beforeUpload = (file: any) => {
			const isType = file.type == 'application/vnd.ms-excel';
			const isSize = file.size / 1024 / 1024 < 20;
			if (!isType) {
				ElMessage.warning(`文件类型不符合格式!`);
			}
			if (!isSize) {
				ElMessage.warning(`文件大小应小于20MB!`);
			}
			return isSize && isType;
		};

		const equelRow = (traget, source) => {
			return (
				traget.orgCode === source.orgCode &&
				traget.orgName === source.orgName &&
				traget.jobCode === source.jobCode &&
				traget.deptName === source.deptName &&
				traget.unitName === source.unitName
			);
		};

		const toUpload = async (param: any) => {
			let file = param.file;
			let formData = new FormData();
			formData.append('file', file);
			formData.append('jobType', props.jobType);
			formData.append('fileName', file.name);
			state.fileName = file.name;
			state.exportLoading = true;
			let res = await funcListRef.value.uploadFile(formData);
			state.exportLoading = false;
			if (res.status == 0) {
				state.importIfSuccess = true;
				state.result = res.data.importStaffInfoSuccessResList;
				state.total = res.data.successNum;
				state.failKey = res.data.failKey;
				state.failNums = res.data.failNum;
				state.successNums = res.data.successNum;
				debugger;
				// 处理选中
				state.result.forEach((x) => {
					if (!state.selected.some((y) => equelRow(x, y))) {
						state.selected.push(x);
					}
				});
				emit('update:selectedList', state.selected);
				getList();
			} else {
				ElMessage.error(res.message);
			}
		};

		const exportTemplate = async () => {
			let res = await funcListRef.value.indicatorDownTemplete();
			downloadFile(res, props.title + '模板.xls');
		};

		const downloadXls = async () => {
			let params = { failKey: state.failKey };
			let res = await funcListRef.value.exportFail(params);
			downloadFile(res, '导入失败记录.xls');
		};

		const handleCloseImport = () => {
			state.importDialog = false;
			state.importIfSuccess = false;
			state.fileName = '';
		};

		const handleSubmit = () => {
			state.importDialog = false;
			state.importIfSuccess = false;
			state.fileName = '';
		};

		const handleSelectionChange = (val) => {
			// state.selection = val;
		};
		const handleSizeChange = (val: number) => {
			state.limit = val;
			getList();
		};
		const handleCurrentChange = (val: number) => {
			state.currentPage = val;
			getList();
		};

		const hanldeReset = () => {
			state.importIfSuccess = false;
			state.selected = state.selected.filter((x) => !state.result.some((y) => equelRow(x, y)));
			emit('update:selectedList', state.selected);
		};

		watchEffect(() => {
			debugger;
			state.selected = props.selectedList ? props.selectedList : [];
		});

		const getList = async () => {
			let params = {
				pageNo: state.currentPage,
				limit: state.limit,
			};
			state.tableData = state.result.filter((x, i) => i + 1 > (params.pageNo - 1) * params.limit && i + 1 <= params.pageNo * params.limit);
			//  useArrayFilter(state.result, (i) => i + 1 > params.pageNo * params.limit && i + 1 < (params.pageNo + 1) * params.limit);
			state.total = state.result.length;
		};

		// 打开对话框
		const reset = () => {
			state.importIfSuccess = false;
			state.result = [];
			state.tableData = [];
		};

		onBeforeMount(() => {
			console.log(props.type);
			funcListRef.value.uploadFile = uploadFile;
			funcListRef.value.indicatorDownTemplete = indicatorDownTemplete;
			funcListRef.value.exportFail = exportFail;
		});

		onMounted(() => {
			console.log(props.type);
		});

		return {
			...toRefs(state),
			beforeUpload,
			downloadXls,
			toUpload,
			exportTemplate,
			handleCloseImport,
			handleSubmit,
			importIndicator,
			funcListRef,
			reset,
			handleSelectionChange,
			handleSizeChange,
			handleCurrentChange,
			hanldeReset,
			open: () => {
				state.importDialog = true;
			},
		};
	},
});
</script>
<style lang="scss" scoped>
.upload-wapper {
	width: 100%;
	height: 300px;
	flex-flow: column;
	display: flex;
	justify-content: center;
	align-items: center;
}

.el-upload:hover {
	.uploadIcon {
		color: $color-primary;
	}
}

.pageList {
	margin-top: -15px;
	padding: 20px 10px;

	.content_list {
		min-height: 400px !important;
		padding-top: 0px;
	}
	.dialog-content .el-form--inline .el-form-item,
	.query_box .el-form--inline .el-form-item {
		margin-bottom: 10px;
	}
}

.td-number {
	color: #67c23a;
}
</style>
<style lang="scss">
.el-upload {
	.el-upload-dragger {
		width: 500px;
		height: 200px;
		el-icon-upload {
			margin: 20px 0 16px;
		}
	}
}
</style>
