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
				<span>sdsad</span>
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
		value: {
			default: () => {},
		},
	},
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
		const handleMax = value => {
			if (state.limtVal < parseInt(state.beginVal)) {
				state.beginVal = state.limtVal
			}
			if (state.endVal != '' && parseInt(state.endVal) < parseInt(state.beginVal)) {
				state.beginVal = ''
			}
			// return !isNaN(parseFloat(n)) && isFinite(n);
		}

		//结束
		const handleMin = () => {
			if (state.limtVal > parseInt(state.endVal)) {
				state.endVal = state.limtVal
			}
			// return !isNaN(parseFloat(n)) && isFinite(n);
		}

		//完成事件
		const handleSave = () => {
			state.showRange = !state.showRange
			state.showValue = ` ${state.beginFlag} ${state.beginVal} - ${state.endVal} ${state.endFlag}`
			//处理日期
			emit('update:value', {
				v1: state.beginFlag,
				v2: state.beginVal,
				v3: state.endVal,
				v4: state.endFlag,
			})
		}

		const handleOpen = () => {
			state.showRange = true
			// 重置
			debugger
			if (props.value && Object.keys(props.value).length > 0) {
				state.beginFlag = props.value.v1
				state.beginVal = props.value.v2
				state.endVal = props.value.v3
				state.endFlag = props.value.v4
			}
		}

		const reset = () => {
			state.beginFlag = '['
			state.beginVal = ''
			state.endVal = ''
			state.endFlag = ']'
		}

		watch(
			() => state.beginVal,
			(newVal, oldVal) => {
				
				if (state.limtVal > parseInt(state.endVal)) {
					state.endVal = state.limtVal
				}

				if (state.endVal == '') {
					state.limtVal = parseInt(state.beginVal)
				} else {
				}
			},
		)

		watch(
			() => state.endVal,
			(newVal, oldVal) => {
				if (state.beginVal == '') {
					state.limtVal = parseInt(state.endVal)
				} else {
				}
			},
		)

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
</style>
