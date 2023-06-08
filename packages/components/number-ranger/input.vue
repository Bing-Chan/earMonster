<template>
	<el-popover ref="popover" :visible="showRange" placement="bottom-start" :teleported="false" title="" :width="350">
		<div class="number-wapper">
			<el-form ref="formRef" :model="formData" :rules="formRules" label-width="0px">
				<div class="number-wapper-body">
					<div class="item">
						<el-form-item prop="beginVal" class="item—form">
							<el-input
								@focus="isError = false"
								v-model.trim="formData.beginVal"
								:max="limtVal"
								type="number"
								placeholder="左区间"
								style="width: 155px"
								@blur="handleMax"
								:maxlength="5"
							>
								<template #prepend>
									<el-select
										:popper-append-to-body="false"
										style="width: 50px"
										v-model="formData.beginFlag"
										placeholder=""
									>
										<el-option
											:label="SCOPE_TYPE.closeBegin.name"
											:value="SCOPE_TYPE.closeBegin.code"
										></el-option>
										<el-option
											:label="SCOPE_TYPE.openBegin.name"
											:value="SCOPE_TYPE.openBegin.code"
										></el-option>
									</el-select>
								</template>
							</el-input>
						</el-form-item>
					</div>
					<div class="item">-</div>
					<div class="item">
						<el-form-item prop="endVal" class="item—form">
							<el-input
								@focus="isError = false"
								:min="limtVal"
								v-model.trim="formData.endVal"
								placeholder="右区间"
								@blur="handleMin"
								style="width: 155px"
								:maxlength="8"
							>
								<template #append>
									<el-select
										:popper-append-to-body="false"
										style="width: 50px"
										v-model="formData.endFlag"
										placeholder=""
									>
										<el-option
											:label="SCOPE_TYPE.closeEnd.name"
											:value="SCOPE_TYPE.closeEnd.code"
										></el-option>
										<el-option
											:label="SCOPE_TYPE.openEnd.name"
											:value="SCOPE_TYPE.openEnd.code"
										></el-option>
									</el-select>
								</template>
							</el-input>
						</el-form-item>
					</div>
				</div>
				<!-- <div v-if="isError">
					<span class="item_error">开始和结束不能为空，且区间需要存在有效值</span>
				</div> -->
			</el-form>
		</div>

		<div style="text-align: right; margin: 0; margin-top: 10px">
			<el-button size="mini" type="default" @click="showRange = false">取消</el-button>
			<el-button type="primary" :loading="loading" size="mini" @click="handleSave">确定</el-button>
		</div>
		<template #reference>
			<el-input
				v-model="showValue"
				@click="handleOpen"
				readonly
				:placeholder="placeholder"
				style="width: 200px"
				clearable
			>
				<i slot="prefix" class="el-input__icon el-icon-date"></i>
			</el-input>
		</template>
	</el-popover>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watchEffect, getCurrentInstance } from 'vue'
import { SCOPE_TYPE } from '@ear-monster/constants/number'
import { validateEnd, validateStart, toBeginFlag, toEndFlag } from '@ear-monster/utils/validate'

export default defineComponent({
	name: 'EarNumberRanger',
	props: {
		// 双向绑定
		placeholder: {
			type: String,
			default: () => '请填写',
		},
		modelValue: {
			type: Array,
			default: () => {
				return []
			},
		},
		row: {
			type: Object,
			default: () => {
				return {}
			},
		},
		isOpen: {
			type: Boolean,
			default: () => {
				return true
			},
		},
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const { proxy } = getCurrentInstance() as any
		const state = reactive({
			loading: false,
			showRange: false,
			isError: false,
			showValue: '',
			limtVal: 0,
			isOpen: true,
			formData: {
				endVal: '',
				beginVal: '',
				beginFlag: 1,
				endFlag: 1,
			},
			formRules: {
				endVal: [
					{
						required: true,
						validator: (rule, value, callback) => {
							validateEnd(rule, value, callback, state.formData)
						},
						trigger: 'blur',
					},
				],
				beginVal: [
					{
						required: true,
						validator: (rule, value, callback) => {
							validateStart(rule, value, callback, state.formData)
						},
						trigger: 'blur',
					},
				],
			},
			selected: [],
		})

		//开始
		const handleMax = () => {
			// state.isError = false;
			// //为空
			// if (state.formData.beginVal == '') {
			// 	state.limtVal = parseInt(state.formData.endVal);
			// } else {
			// 	if (parseInt(state.formData.endVal) < parseInt(state.formData.beginVal)) {
			// 		state.formData.beginVal = '';
			// 		state.limtVal = parseInt(state.formData.beginVal);
			// 	}
			// }
			// if (state.formData.beginVal == '') {
			// 	state.isError = true;
			// }
		}

		//结束
		const handleMin = () => {
			// state.isError = false;
			// //为空
			// if (state.formData.endVal == '') {
			// 	state.limtVal = parseInt(state.formData.beginVal);
			// } else {
			// 	if (parseInt(state.formData.beginVal) > parseInt(state.formData.endVal)) {
			// 		state.formData.endVal = '';
			// 		state.limtVal = parseInt(state.formData.endVal);
			// 	}
			// }
			// if (state.formData.endVal == '') {
			// 	state.isError = true;
			// }
		}

		//完成事件
		const handleSave = () => {
			proxy.$refs.formRef.validate((valid: boolean) => {
				if (!valid) return false
				state.loading = true
				setTimeout(() => {
					state.loading = false
					state.showRange = !state.showRange
					state.showValue = ` ${toBeginFlag(state.formData.beginFlag)} ${state.formData.beginVal} , ${
						state.formData.endVal
					} ${toEndFlag(state.formData.endFlag)}`
					state.selected = [
						state.formData.beginFlag,
						state.formData.beginVal,
						state.formData.endVal,
						state.formData.endFlag,
					]
					//处理日期
					emit('update:modelValue', state.selected)
					emit('complete', { row: props.row, selected: state.selected })
				}, 200)
			})
		}

		const handleOpen = () => {
			if (!state.isOpen) {
				emit('open')
				proxy.$refs.popover.doClose()
			} else {
				state.showRange = true
				state.isError = false
				// 重置
				reset()
				if (state.selected && state.selected.length > 0) {
					state.formData.beginFlag = state.selected[0]
					state.formData.beginVal = state.selected[1]
					state.formData.endVal = state.selected[2]
					state.formData.endFlag = state.selected[3]
				}
				proxy.$refs.formRef.clearValidate()
			}
		}

		watchEffect(() => {
			state.isOpen = props.isOpen
			state.selected = JSON.parse(JSON.stringify(props.modelValue))
			console.log(state.selected, 'state.selected ')

			if (state.selected && state.selected.length > 0) {
				state.showValue = ` ${toBeginFlag(state.selected[0])} ${state.selected[1]} , ${
					state.selected[2]
				} ${toEndFlag(state.selected[3])}`
			} else {
				state.showValue = ''
			}
		})

		const reset = () => {
			state.formData.beginFlag = 1
			state.formData.beginVal = ''
			state.formData.endVal = ''
			state.formData.endFlag = 1
		}

		return {
			...toRefs(state),
			handleMax,
			handleMin,
			handleSave,
			handleOpen,
			SCOPE_TYPE,
		}
	},
})
</script>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
.item_error {
	color: #f56c6c;
	font-size: 12px;
}
</style>
<style lang="scss" scoped>
.number-wapper-body {
	display: flex;
	width: 100%;
	.item {
		flex: 1;
	}
}
</style>
