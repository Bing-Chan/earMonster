<template>
	<el-popover ref="popover" v-model="showRange" placement="bottom-start" title="" :width="350" trigger="click">
		<div>
			<el-input
				v-model="beginVal"
				:max="limtVal"
				type="number"
				placeholder="开始"
				style="width: 155px"
				@blur="handleMax"
				maxlength="8"
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
				maxlength="8"
			>
				<template #append>
					<el-select style="width: 50px" v-model="endFlag" placeholder="">
						<el-option label="]" value="]"></el-option>
						<el-option label=")" value=")"></el-option>
					</el-select>
				</template>
			</el-input>
		</div>
		<div style="text-align: right; margin: 0; margin-top: 10px">
			<el-button size="mini" type="default" @click="showRange = false">取消</el-button>
			<el-button type="primary" size="mini" @click="handleSave">确定</el-button>
		</div>
		<template #reference>
			<el-input v-model="showValue" @click="showRange = true" :placeholder="placeholder" style="width: 200px" clearable>
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
		value:
	},
	setup(props, { emit }) {
		const state = reactive({
			showRange: false,
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
		const handleMin = value => {
			if (state.limtVal > parseInt(state.endVal)) {
				state.endVal = state.limtVal
			}
			// return !isNaN(parseFloat(n)) && isFinite(n);
		}

		//完成事件
		const handleSave = value => {
			emi
		}

		watch(
			() => state.beginVal,
			() => {
				if (state.beginVal !== '') {
					state.limtVal = parseInt(state.beginVal)
				}
			},
		)

		return {
			...toRefs(state),
			handleMax,
			handleMin,
			handleSave,
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
