<!-- 步进器组件 -->
<template>
	<div class="stepper__main">
		<button class="stepper__main-add" @click="addSteppernum">+</button>
		<input type="text" readonly v-model="num" />
		<button class="stepper__main-cut" @click="cutSteppernum">-</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
	name: 'EarStepper',
	setup() {
		const state = reactive({
			num: 0,
		})

		const cutSteppernum = () => {
			if (state.num === 0) {
				return
			}
			state.num = --state.num
		}
		const addSteppernum = () => {
			state.num = ++state.num
		}

		return {
			...toRefs(state),
			addSteppernum,
			cutSteppernum,
		}
	},
})
</script>
<style>
.stepper__main {
	display: flex;
	flex-direction: row;
	width: 100%;
}

.stepper__main input {
	display: inline-block;
	box-sizing: border-box;
	text-align: center;
	width: 50px;
	height: 30px;
	margin: 0 5px;
}
.stepper__main button {
	appearance: none;
	width: 30px;
	height: 30px;
	outline: none;
	cursor: pointer;
	border-radius: 10px;
	border: 0;
	font-size: 20px;
	color: #666666;
}

.stepper__main button:hover {
	color: rgb(119, 173, 245);
}

.stepper__main-add {
	display: inline-block;
}
</style>
