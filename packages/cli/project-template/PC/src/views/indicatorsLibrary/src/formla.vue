<template>
	<el-dialog @close="handleClose" :close-on-click-modal="false" title="查看公式" center v-model="editorVal" width="800px">
		<div class="quta" v-loading="loading">
			<el-form label-position="right" label-width="125px" ref="indicatorRef" :model="indicatorForm">
				<el-form-item label="指标名称:" prop="quotaName">
					<span>{{ indicatorForm.quotaName }}</span>
				</el-form-item>
				<el-form-item label="实际值来源:" prop="actualValueSource" v-if="indicatorForm.scoreValueSource == 2">
					<span> {{ toActual() }}</span>
				</el-form-item>
				<el-form-item
					label="实际值计算公式:"
					prop="calculationFormula"
					v-if="indicatorForm.scoreValueSource == 2 && indicatorForm.actualValueSource == 2 && indicatorForm.calculationFormula != ''"
				>
					<el-input disabled v-model="indicatorForm.calculationFormula" type="textarea" show-word-limit></el-input>
				</el-form-item>
				<el-form-item label="得分来源:" prop="scoreValueSource">
					<span> {{ indicatorForm.scoreValueSource == 1 ? '人工评分' : '系统计算' }}</span>
				</el-form-item>
				<el-form-item label="公式类型:" prop="formulaType" v-if="indicatorForm.scoreValueSource == 2">
					<span>{{ indicatorForm.formulaType == 1 ? '通用公式' : '自定义对象' }}</span>
				</el-form-item>
				<el-form-item
					label="得分计算公式:"
					prop="commonCalculationFormula"
					v-if="indicatorForm.scoreValueSource == 2 && indicatorForm.formulaType == 1"
				>
					<el-input disabled v-model="indicatorForm.commonCalculationFormula" type="textarea" show-word-limit></el-input>
				</el-form-item>
				<el-form-item label="评分规则:" prop="scoringRuleDesc" v-if="indicatorForm.formulaType == 1">
					<el-input disabled v-model="indicatorForm.scoringRuleDesc" type="textarea" show-word-limit></el-input>
				</el-form-item>

				<el-form-item v-if="indicatorForm.scoreValueSource == 2 && indicatorForm.formulaType == 2">
					<el-table :data="indicatorForm.quotaFormulaConfigReqList" stripe border style="width: 100%">
						<template #empty><SysEmpty></SysEmpty></template>
						<el-table-column prop="suitableCodeValue" label="适用对象" show-overflow-tooltip width="150" align="center"></el-table-column>
						<el-table-column prop="scoringRuleDesc" label="评分规则" show-overflow-tooltip align="center"></el-table-column>
						<el-table-column prop="calculationFormula" label="公式" show-overflow-tooltip align="center"></el-table-column>
					</el-table>
				</el-form-item>
			</el-form>
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="editorVal = false" type="primary">关 闭</el-button>
				<!-- <el-button type="primary" @click="handleSubmit" > 确 定</el-button> -->
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { emit } from 'process';
import { quotalibraryInfo } from '/@/api/indicatorsLibrary/index.ts';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: '',
	setup(props, { emit }) {
		const state = reactive({
			editorVal: false,
			loading: false,
			indicatorForm: {},
		});

		const handleClose = () => {
			emit('close');
		};

		const open = async (id) => {
			state.loading = true;
			state.editorVal = true;
			const res = await quotalibraryInfo({ id: id });
			state.loading = false;
			if (res.status == 0) {
				state.indicatorForm = res.data;
			} else {
				ElMessage.error(res.message);
			}
		};

		return {
			...toRefs(state),
			handleClose,
			open,
			toActual: () => {
				if (state.indicatorForm.actualValueSource == 1) {
					return '人工';
				} else if (state.indicatorForm.actualValueSource == 2 && state.indicatorForm.calculationFormula == '') {
					return '系统对接';
				} else {
					return '系统计算';
				}
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
	padding: 0 20px;
	overflow: auto;
}

.hr-drawer__footer {
	overflow: auto;
	padding: 10px 40px;
	border-top: solid 1px #eeeeee;
	display: flex;
	justify-content: flex-end;
}

.title-icon {
	.el-icon {
		color: $color-primary;
		font-size: 20px;
		vertical-align: middle;
		margin-right: 5px;
	}
	line-height: 30px;
	height: 30px;
}
</style>
<style lang="scss">
.el-drawer__header {
	padding: 15px 10px;
	border-bottom: solid 1px #eee;
	margin-bottom: 20px !important;
}
.el-drawer__body {
	padding: 0px !important;
	margin: 0px !important;
	height: 100%;
	overflow: auto;
}
.el-drawer:focus {
	outline: 0;
}
</style>
<style>
.quta .el-table th.el-table__cell {
	padding: 3px 0 !important;
}
</style>
