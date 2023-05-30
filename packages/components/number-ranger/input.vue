<template>
	<el-popover
		ref="popover"
		v-model:visible="showRange"
		trigger="manual"
		placement="bottom-start"
		title=""
		:width="350"
	>
		<div>
			<div>
				<el-input
					v-model="beginVal"
					:max="limtVal"
					type="number"
					placeholder="开始"
					style="width: 155px"
					@blur="handleMax"
					:maxlength="5"
				>
					<template #prepend>
						<el-select style="width: 50px" v-model="beginFlag" placeholder="">
							<el-option label="[" value="["></el-option>
							<el-option label="(" value="("></el-option>
						</el-select>
					</template>
				</el-input>
				-
				<el-input
					:min="limtVal"
					v-model="endVal"
					type="number"
					placeholder="结束"
					@blur="handleMin"
					style="width: 155px"
					:maxlength="8"
				>
					<template #append>
						<el-select style="width: 50px" v-model="endFlag" placeholder="">
							<el-option label="]" value="]"></el-option>
							<el-option label=")" value=")"></el-option>
						</el-select>
					</template>
				</el-input>
			</div>
			<div v-if="isError">
				<span class="item_error">请填写开始和结束</span>
			</div>
		</div>

		<div style="text-align: right; margin: 0; margin-top: 10px">
			<el-button size="mini" type="default" @click="showRange = false">取消</el-button>
			<el-button type="primary" size="mini" @click="handleSave">确定</el-button>
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
import { defineComponent, reactive, toRefs, watch } from 'vue'

export default defineComponent({
	name: 'EarNumberRanger',
	props: {
		// 双向绑定
		placeholder: {
			type: String,
			default: () => '请选择区间',
		},
		modelValue: {
			type: Array,
			default: () => {
				return []
			},
		},
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const state = reactive({
			showRange: false,
			isError: false,
			showValue: '',
			beginFlag: '[',
			endFlag: ']',
			limtVal: 0,
			endVal: '',
			beginVal: '',
		})

		//开始
		const handleMax = () => {
			state.isError = false
			//为空
			if (state.beginVal == '') {
				state.limtVal = parseInt(state.endVal)
			} else {
				if (parseInt(state.endVal) < parseInt(state.beginVal)) {
					state.beginVal = ''
					state.limtVal = parseInt(state.beginVal)
				}
			}

			if (state.beginVal == '') {
				state.isError = true
			}
		}

		//结束
		const handleMin = () => {
			state.isError = false
			//为空
			if (state.endVal == '') {
				state.limtVal = parseInt(state.beginVal)
			} else {
				if (parseInt(state.beginVal) > parseInt(state.endVal)) {
					state.endVal = ''
					state.limtVal = parseInt(state.endVal)
				}
			}

			if (state.endVal == '') {
				state.isError = true
			}
		}

		//完成事件
		const handleSave = () => {
			//
			if (state.beginVal == '' || state.endVal == '') {
				state.isError = true
				return false
			}

			state.showRange = !state.showRange
			state.showValue = ` ${state.beginFlag} ${state.beginVal} - ${state.endVal} ${state.endFlag}`
			debugger
			//处理日期
			emit('update:modelValue', [state.beginFlag, state.beginVal, state.endVal, state.endFlag])
		}

		const handleOpen = () => {
			state.showRange = true
			// 重置
			if (props.modelValue && props.modelValue.length > 0) {
				state.beginFlag = props.modelValue[0];
				state.beginVal = props.modelValue[1];
				state.endVal = props.modelValue[2];
				state.endFlag = props.modelValue[3];
			}
		}

		const reset = () => {
			state.beginFlag = '['
			state.beginVal = ''
			state.endVal = ''
			state.endFlag = ']'
		}

		return {
			...toRefs(state),
			handleMax,
			handleMin,
			handleSave,
			handleOpen,
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
