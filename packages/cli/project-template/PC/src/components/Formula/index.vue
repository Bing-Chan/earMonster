<template>
	<div class="formula-warpper">
		<div>
			<el-input
				placeholder="请输入计算公式"
				type="textarea"
				show-word-limit
				rows="2"
				@click="handleFormula"
				v-model="keyWord"
				readonly
				style="width: 100%; color: #333; font-size: 14px"
				maxlength="100"
			></el-input>
		</div>
		<Teleport to="body">
			<el-dialog :close-on-click-modal="false" title="计算公式设置" center v-model="showFlag" width="800px">
				<div class="alert-title">
					<el-alert
						:closable="false"
						:title="`指标配置和参数配置的${jobType == 1 ? '「班次属性」' : ''}「数据维度」必须一致，才能进行指标实际值计算`"
						type="warning"
						show-icon
					/>
				</div>
				<el-form class="formula-form" :model="formData" label-position="right" label-width="110px">
					<el-form-item prop="name" label-width="0px">
						<el-input
							ref="inputRef"
							name="formulaText"
							show-word-limit
							class="code-input"
							maxlength="3000"
							v-model="result"
							@blur="handleSelectionStart"
							type="textarea"
							rows="8"
							placeholder="请在此处编写公式"
						></el-input>
					</el-form-item>
					<el-form-item label-width="0px">
						<div class="formula-wapper" @click="handleSelectZhibiao()">
							<div class="formula-wapper-item" v-if="zhibiaoList && zhibiaoList.length > 0">
								<div class="btns">
									<el-tag class="ml-2" v-for="(item, index) in zhibiaoList" :key="index" @click="handleZhibiao(item)"> {{ item.name }}</el-tag>
								</div>
								<div class="updatebtn">
									<el-button type="text" @click="handleSelectZhibiao(true)" style="color: #4c84ff">更改</el-button>
								</div>
							</div>
							<span v-else style="color: #999999; font-size: 12px">请点击添加相关{{ `${parameType == 1 ? '参数' : '指标'}` }}</span>
						</div>
					</el-form-item>

					<div class="keyword-wapper">
						<el-row :gutter="10">
							<el-col v-for="(item, index) in flagList" @click="handleSelect(item)" :key="index" :span="2"
								><div class="keyword-wapper-flag">{{ item.title }}</div></el-col
							>
							<el-col v-for="(item, index) in numList" @click="handleSelect(item)" :key="index" :span="2">
								<div :class="item.type == 'number' ? 'keyword-wapper-number' : 'keyword-wapper-flag'">{{ item.title }}</div></el-col
							>
						</el-row>
					</div>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="handleClear" size="small">置 空</el-button>
						<el-button @click="showFlag = false" size="small">取 消</el-button>

						<el-button type="primary" @click="handleSave" :loading="loading" size="small">保 存</el-button>
					</span>
				</template>
			</el-dialog>
			<!--指标列表-->
			<select-list ref="zhibiaoRef" :job-type="jobType" v-if="parameType == 2" @handleComplete="handleComplete"></select-list>
			<select-job-list ref="zhibiaoRef" :job-type="jobType" v-else @handleComplete="handleComplete"></select-job-list>
		</Teleport>
	</div>
</template>
<script lang="ts">
import { toRefs, reactive, ref, defineComponent, getCurrentInstance, nextTick, watch, toRaw, watchEffect } from 'vue';
import { SearchEnum } from '/@/enums/Search.ts';
import { getTagStyle, getNotArr } from '/@/utils/other.ts';
import { checkFormula, getQlAnalysisList } from '/@/api/templateConfig/index.ts';
import SelectList from '/@/components/SelectList.vue';
import SelectJobList from '/@/components/SelectJobList.vue';
import { ElMessage } from 'element-plus';
import $ from 'jquery';

export default defineComponent({
	name: 'Formula',
	components: {
		selectList: SelectList,
		SelectJobList,
	},
	props: {
		// 公式数组
		modeValue: {
			type: String,
			default() {
				return '';
			},
		},
		// 公式数组
		zhibiaoList: {
			type: String,
			default() {
				return '';
			},
		},
		// 工作类型  1:操作工;2;职能
		jobType: {
			type: Number,
			default() {
				return 1;
			},
		},
		// 参数类型  //  1:参数库;2;指标库
		parameType: {
			type: Number,
			default() {
				return 1;
			},
		},
		quotaDataDimensionId: {
			type: String,
			default() {
				return '';
			},
		},
		shiftCheckFlag: {
			type: Boolean,
			default() {
				return false;
			},
		},
		shiftFlag: {
			type: Boolean,
			default() {
				return false;
			},
		},
	},
	setup(props, { emit }) {
		const loading = ref(false);
		const { proxy } = getCurrentInstance() as any;
		const inputRef = ref<HTMLTextAreaElement | null>(null);
		const state = reactive({
			title: '',
			parameType: props.parameType,
			loading: false,
			zhibiaoFlag: false,
			keyWord: props.modeValue,
			showFlag: false,
			placeholder: '',
			zhibiaoTypeList: [
				{ title: '基础值', code: 1 },
				{ title: '目标值', code: 2 },
				{ title: '实际值', code: 3 },
			],
			numList: [
				{ title: '1', value: '1', index: 0, type: 'number' },
				{ title: '2', value: '2', index: 0, type: 'number' },
				{ title: '3', value: '3', index: 0, type: 'number' },
				{ title: '4', value: '4', index: 0, type: 'number' },
				{ title: '5', value: '5', index: 0, type: 'number' },
				{ title: '6', value: '6', index: 0, type: 'number' },
				{ title: '7', value: '7', index: 0, type: 'number' },
				{ title: '8', value: '8', index: 0, type: 'number' },
				{ title: '9', value: '9', index: 0, type: 'number' },
				{ title: '0', value: '0', index: 0, type: 'number' },
				{ title: '(', value: '(', index: 0, type: 'flag' },
				{ title: ')', value: ')', index: 0, type: 'flag' },
				{ title: '.', value: '.', index: 0, type: 'float' },
				// { title: ',', value: ',', index: 0 },
				{ title: '+', value: '+', index: 0, type: 'flag' },
				{ title: '-', value: '-', index: 0, type: 'flag' },
				{ title: '*', value: '*', index: 0, type: 'flag' },
				{ title: '/', value: '/', index: 0, type: 'flag' },
			], // 数字辅助按键
			flagList: [
				{ title: '如果', value: '如果 ()', index: 1, type: 'func' },
				{ title: '那么', value: '那么 { return ;}', index: 2, type: 'func' },
				{ title: '否则', value: '否则 { return ;}', index: 2, type: 'func' },
				{ title: '并且', value: '并且', index: 0, type: 'flag' },
				{ title: '或者', value: '或者', index: 0, type: 'flag' },
				{ title: '绝对值', value: '绝对值()', index: 1, type: 'func' },
				{ title: '==', value: '==', index: 0, type: 'flag' },
				{ title: '!=', value: '!=', index: 0, type: 'flag' },
				{ title: '>', value: '>', index: 0, type: 'flag' },
				{ title: '<', value: '<', index: 0, type: 'flag' },
				{ title: '<=', value: '<=', index: 0, type: 'flag' },
				{ title: '>=', value: '>=', index: 0, type: 'flag' },
			], // 逻辑符号按键
			formData: {
				zhibiao: [],
			},
			modelRules: {},
			result: '', //公式集合
			resultZhiBiaoList: [], //使用的指标集合
			zhibiaoList: [],
			campaignNameIndex: 0, //  光标位置
			shiftCheckFlag: props.shiftCheckFlag,
			quotaDataDimensionId: props.quotaDataDimensionId,
			shiftFlag: props.shiftFlag,
		});

		const handleSave = async () => {
			const toSave = () => {
				state.keyWord = state.result;
				emit('complete', {
					result: toRaw(state.result),
					list: toRaw(
						state.resultZhiBiaoList.map((x) => {
							return {
								id: x.id,
								name: x.name,
								valType: x.valType,
							};
						})
					),
				});
				state.showFlag = false;
			};

			if (state.result.trim() == '') {
				toSave();
				return false;
			}

			let reg = /'.*?'/g;
			let arr = state.result.match(reg);
			if (arr && arr.length > 0) {
				arr = [
					...new Set(
						arr.map((x) => {
							return x.replaceAll("'", '');
						})
					),
				];

				const res1 = await getQlAnalysisList({
					quotaOrJobNameList: arr,
					queryFlag: props.parameType, //  1:参数库;2;指标库
				});
				if (res1.status != 0) {
					ElMessage.error(res1.message);
					return false;
				}

				if (!res1.data.qlAnalyDtoList || res1.data.qlAnalyDtoList.length == 0) {
					ElMessage.error('指标不存在,请重新编辑公式！');
					return false;
				}
				let len = arr.filter((x) => !res1.data.qlAnalyDtoList.some((y) => x == y.name));
				if (len && len.length > 0) {
					// 差集
					ElMessage.error(len.join(',') + '不存在,请重新编辑公式！');
					return false;
				}
				state.resultZhiBiaoList = res1.data.qlAnalyDtoList;
			}

			let str = JSON.stringify(
				toRaw(
					state.resultZhiBiaoList.map((x) => {
						return {
							id: x.id,
							name: x.name,
							valType: x.valType,
						};
					})
				)
			);
			const res = await checkFormula({
				express: state.result,
				formualItem: str,
				quotaDataDimensionId: state.quotaDataDimensionId,
				shiftCheckFlag: state.shiftCheckFlag,
				shiftFlag: state.shiftFlag,
				jobType: props.jobType,
				parameType: props.parameType, //  1:参数库;2;指标库
			});
			if (res.status == 0) {
				toSave();
			} else {
				ElMessage.error(res.message);
			}
		};

		// 完成事件
		const handleComplete = (result: any) => {
			state.zhibiaoFlag = false;
			// 处理基础、目标、实际
			state.zhibiaoList = [];
			result.forEach((x) => {
				if (x.baseTargetState) {
					state.zhibiaoTypeList.forEach((y) => {
						state.zhibiaoList.push(
							JSON.parse(
								JSON.stringify({
									id: x.id,
									name: toName(x) + y.title,
									valType: y.code,
								})
							)
						);
					});
				} else {
					state.zhibiaoList.push(
						JSON.parse(
							JSON.stringify({
								id: x.id,
								name: toName(x),
								valType: 3,
							})
						)
					);
				}
			});
		};

		const toName = (x) => {
			if (x.paramName) {
				return x.paramName;
			} else if (x.quotaName) {
				return x.quotaName;
			}
			return '';
		};

		const handleFormula = () => {
			state.result = state.keyWord;
			state.showFlag = true;
		};

		//选择
		const handleSelect = (item: any) => {
			let EmptyStr = '';
			// 分类处理追加内容
			// 代码块
			// 逻辑关键字
			// 数字
			switch (item.type) {
				case 'number':
				case 'float':
					EmptyStr = '';
					break;
				case 'flag':
				case 'func':
					EmptyStr = ' ';
					break;
			}

			let focusStr = EmptyStr + item.value + EmptyStr;
			if (state.result) {
				// 光标位置
				focusStr = state.result.slice(0, state.campaignNameIndex) + focusStr;
			}
			setResult(focusStr);
			let pos = 0;
			if (item.type === 'func') {
				pos = focusStr.length - item.index - 1;
			} else if (item.type === 'number' || item.type === 'float') {
				pos = focusStr.length;
			} else {
				pos = focusStr.length;
			}
			setCaretPosition(pos);
		};

		/***
		 * 设置字符串
		 * focusStr:  焦点字符串
		 * index:
		 */
		const setResult = (focusStr) => {
			if (state.result) {
				let index = state.campaignNameIndex;
				let name = state.result;
				state.result = focusStr + name.slice(index);
			} else {
				state.result = focusStr;
			}
		};

		//点击指标
		const handleZhibiao = (item) => {
			let focusStr = " '" + item.name + "' ";
			if (state.result) {
				// 光标位置
				focusStr = state.result.slice(0, state.campaignNameIndex) + focusStr;
			}
			if (!(state.resultZhiBiaoList ?? []).some((x) => x.name && x.name == item['name'])) {
				state.resultZhiBiaoList.push(JSON.parse(JSON.stringify(item)));
			}
			setResult(focusStr);
			setCaretPosition(focusStr.length);
		};

		//设置光标位置
		const setCaretPosition = async (pos) => {
			// 设置光标位置
			await nextTick();
			var o = inputRef.value.$refs.textarea;
			var len = o.value.length;
			o.focus(); //先使光标聚集在输入框中
			o.setSelectionRange(pos, pos); //将光标定位到文本最前面
		};

		//删除
		const hanldeDelete = (item: any) => {
			state.result = state.result.filter((x) => x.key != item.key);
		};

		//点击
		const handleSelectZhibiao = (flag: Boolean = false) => {
			if (!flag && state.zhibiaoList.length > 0) {
				return false;
			}
			proxy.$refs.zhibiaoRef.open();
		};

		//删除
		const handleClear = (item: any) => {
			state.result = '';
		};

		// 获取光标位置
		const handleSelectionStart = (e) => {
			state.campaignNameIndex = e.srcElement.selectionStart;
		};

		watch(
			() => props.modeValue,
			() => {
				state.keyWord = props.modeValue;
				state.resultZhiBiaoList = !props.zhibiaoList || props.zhibiaoList == '' ? [] : JSON.parse(props.zhibiaoList);
			}
		);

		watchEffect(() => {
			state.shiftCheckFlag = props.shiftCheckFlag;
			state.quotaDataDimensionId = props.quotaDataDimensionId;
			state.shiftFlag = props.shiftFlag;
		});

		return {
			...toRefs(state),
			loading,
			handleSave,
			handleSelect,
			hanldeDelete,
			handleFormula,
			SearchEnum,
			getTagStyle,
			handleComplete,
			handleSelectZhibiao,
			handleClear,
			handleZhibiao,
			handleSelectionStart,
			setCaretPosition,
			inputRef,
			reset: () => {
				state.zhibiaoList = [];
			},
		};
	},
});
</script>
<style>
.formula-warpper .el-dialog__body {
	padding-bottom: 0px !important;
}

._mark {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, 0);
	z-index: 999;
	width: 200px;
}
.el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
	width: 200px;
}
.yearBtn {
	text-align: center;
	padding: 0;
}
.box-card {
	width: 322px;
	padding: 0 3px 20px;
	margin-top: 10px;
	position: fixed;
	z-index: 9999;
}
.el-date-picker__header-label {
	padding: 0 25px;
}
.item {
	text-align: center;
}

::v-deep .el-input--small .el-input__inner {
	height: 41px;
}

.formula-form .el-textarea__inner {
	font-size: 14px !important;
	color: #333 !important;
}
</style>
<style lang="scss" scoped>
.formula-wapper-item {
	display: flex;
	.btns {
		flex: 1;
	}
	.updatebtn {
		width: 60px;
	}
}
.selected {
	.el-button--text {
		color: $color-primary;
	}
}
.el-button--text {
	color: #666666;
}
.el-button + .el-button {
	margin-left: 0px !important;
}

.el-button {
	margin-right: 10px !important;
}

.formula-wapper {
	border: solid 1px #eeeeee;
	padding: 5px 10px;
	min-height: 60px;
	user-select: none;
	.el-tag {
		user-select: none;
		margin-right: 10px;
	}
}

.keyword-wapper-number,
.keyword-wapper-flag {
	cursor: pointer;
	text-align: center;
	line-height: 30px;
	border: solid 0.5px #eeeeee;
	margin-bottom: 10px;
	user-select: none;
}

.keyword-wapper-flag {
	background: #e6e6e6;
	border: solid 0.5px #c5c5c5;
}

.keyword-wapper-number:hover,
.keyword-wapper-flag:hover {
	background: $color-primary;
	color: #ffffff;
	box-shadow: 0px 0px 5px 0px rgba(11, 102, 203, 0.4);
}

.alert-title {
	margin-top: -15px;
	line-height: 26px;
	.el-alert {
		padding: 2px 10px;
	}
}
</style>
<style>
.alert-title .el-alert__title {
	font-size: 10px !important;
}
</style>
