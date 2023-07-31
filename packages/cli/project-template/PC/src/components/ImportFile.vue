<template>
	<el-dialog :close-on-click-modal="false" center title="导入" v-model="importDialog" width="600px" @close="handleCloseImport">
		<div class="dialog-content" v-loading="exportLoading">
			<el-button type="text" @click="exportTemplate">下载模板</el-button>
			<el-upload
				class="upload"
				accept="application/vnd.ms-excel"
				:show-file-list="false"
				:before-upload="beforeUpload"
				action="#"
				:multiple="false"
				:http-request="toUpload"
			>
				<el-input placeholder="请选择要导入的文件" v-model="fileName"></el-input>
			</el-upload>
			<el-result :icon="importResultIcon" v-show="importIfSuccess">
				<template #title>
					<span> {{ importResult.title }}</span>
				</template>
				<template #subTitle class="subTitle">
					<span>
						<span>
							导入成功
							<span class="greens">{{ successNums }}</span
							>条
						</span>
						<span>
							,导入失败
							<span class="reds">{{ failNums }}</span
							>条。
						</span>
					</span>
					<span>{{ importResult.message }}</span>
					<a v-if="failNums > 0" @click="downloadXls" class="link" href="#">下载失败文件</a>
				</template>
			</el-result>
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="handleCloseImport" type="primary">关 闭</el-button>
				<!-- <el-button type="primary" @click="handleSubmit"> 确 定</el-button> -->
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, toRefs, ref, onMounted } from 'vue';
import { downloadFile } from '/@/utils/download';
import { ElMessage } from 'element-plus';
// import { uploadFile, indicatorDownTemplete, exportFail } from '../api/indicatorResult/index.ts';
// import { uploadFile, indicatorDownTemplete, exportFail } from '/@/api/parameterResult/index.ts';
export default defineComponent({
	name: 'ImportFile',
	props: {
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
		}
	},
	setup(props, { emit }) {
		const state = reactive({
			exportLoading: false,
			importDialog: false,
			importIfSuccess: false,
			fileName: '',
			successNums: 0,
			failNums: 0,
			importTotal: 0,
			importResult: {
				title: '导入成功',
				message: '',
				success: true,
			},
			importResultIcon: 'success',
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
			emit('complete');
			if (res.status == 0) {
				state.importIfSuccess = true;
				state.successNums = res.data.successNum;
				state.failNums = res.data.failNum;
				state.importTotal = res.data.importTotal;
				if (state.successNums <= 0 && state.failNums >= 0) {
					state.importResultIcon = 'error';
					state.importResult.title = '导入失败';
				} else {
					state.importResultIcon = 'success';
					state.importResult.title = '导入成功';
				}
				if (state.failNums > 0) {
					state.failKey = res.data.failKey;
				}
			} else {
				ElMessage.error(res.message);
			}
		};

		const exportTemplate = async () => {
			let res = await funcListRef.value.indicatorDownTemplete();
			downloadFile(res, (props.title + '模板.xls'));
		};

		const downloadXls = async () => {
			let params = { batchNum: state.failKey, jobType: props.jobType };
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

		onBeforeMount(() => {
			console.log(props.type)
			if(props.type){
				let  uploadFile = import(`../api/${props.type}/index.ts`).then(res =>{
				funcListRef.value.uploadFile = res.uploadFile;
				funcListRef.value.indicatorDownTemplete = res.indicatorDownTemplete
				funcListRef.value.exportFail = res.exportFail 
			})
			}	
		});

		onMounted(() =>{
			console.log(props.type)
		})

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
			open: () => {
				state.importDialog = true;
			},
		};
	},
});
</script>
<style lang="scss" scoped>
.hr-drawer__content {
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 0 0px;

	.page_box {
		margin-top: 7px;
	}
}

.hr-drawer__body {
	flex: 1;
	padding: 0 40px;
}

.hr-drawer__footer {
	display: flex;
	padding: 10px 40px;
	border-top: solid 1px #eeeeee;
	justify-content: flex-end;
}
.hr-drawer__header {
	background: #4ab26c;
	align-items: center;
	color: #fff;
	display: flex;
	padding: 15px 10px;
}
</style>
<style lang="scss">
.el-drawer__header {
	padding: 15px 10px;
	border-bottom: solid 1px #eee;
}
.el-drawer__body {
	padding: 0px !important;
}
.el-drawer:focus {
	outline: 0;
}
</style>
