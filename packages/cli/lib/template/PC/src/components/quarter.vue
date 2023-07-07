<template>
	<el-popover ref="popover" v-model:visible="showSeason" placement="bottom-start" title="" :width="200" trigger="click">
		<div>
			<div class="clearfix yearBtn">
				<el-button type="text" @click.stop="prev">
					<SvgIcon :name="'elementArrowLeft'"></SvgIcon>
				</el-button>
				<button type="button" class="el-picker-panel__icon-btn el-icon-arrow-left" @click="prev"></button>
				<span role="button" class="el-date-picker__header-label">{{ year }}年</span>
				<el-button type="text" @click.stop="next">
					<SvgIcon :name="'elementArrowRight'"></SvgIcon>
				</el-button>
			</div>
			<div class="text">
				<el-row>
					<el-col class="item" v-for="(item, index) in data" :key="index" :class="item.code == code ? 'selected item' : 'item'" :span="12">
						<el-button type="text" size="medium" @click.stop="selectSeason(item.code)" class="_right">{{ item.name }}</el-button>
					</el-col>
				</el-row>
			</div>
		</div>

		<template #reference>
			<el-input @click="handleOpen" :placeholder="placeholder" v-model="showValue" size="small" style="width: 100%" :disabled="disabled" clearable>
				<i slot="prefix" class="el-input__icon el-icon-date"></i>
			</el-input>
		</template>
	</el-popover>
</template>
<script lang="ts">
import dayjs from 'dayjs';
import { defineComponent, onBeforeMount, reactive, toRefs, watchEffect, watch } from 'vue';

export default defineComponent({
	props: {
		placeholder: {
			type: String,
			default: '请选择', // quarter=季度; halfYear=半年
		},
		controlType: {
			type: String,
			default: 'halfYear', // quarter=季度; halfYear=半年
		},
		modelValue: {
			type: String,
			default: '', // quarter=季度; halfYear=半年
		},
	},
	setup(props, { emit }) {
		const state = reactive({
			showSeason: false,
			season: '',
			showValue: '',
			disabled0: true,
			disabled1: true,
			disabled2: true,
			disabled3: true,
			year: 0,
			code: 1,
			data: [
				{ name: '上半年', code: 1 },
				{ name: '下半年', code: 2 },
			],
		});

		const prev = () => {
			state.year = state.year * 1 - 1;
		};
		const next = () => {
			state.year = state.year * 1 + 1;
		};
		const reast = () => {
			state.showValue = '';
		};
		const selectSeason = (i) => {
			state.showValue = `${state.year}${state.data.find((x) => x.code == i).name}`;
			state.showSeason = false;
			emit('update:modelValue', `${state.year}|${i}`);
		};

		const handleOpen = () => {
			if (props.modelValue.length > 0) {
				let arr = props.modelValue.split('|');
				state.year = arr[0]; // 当前年份
				state.code = arr[1]; //当前按钮
			}
			state.showSeason = true;
		};

		watchEffect(() => {
			if (props.modelValue != '') {
				let arr = props.modelValue.split('|');
				state.showValue = arr[0] + state.data.find((x) => x.code == arr[1]).name;
			}
		});

		watch(
			() => state.showValue,
			() => {
				if (state.showValue == '') {
					emit('update:modelValue', '');
				}
			}
		);

		onBeforeMount(() => {
			state.year = dayjs().year();
			if ('quarter' == props.controlType) {
				state.data = [
					{ name: '第1季度', code: 1 },
					{ name: '第2季度', code: 2 },
					{ name: '第3季度', code: 3 },
					{ name: '第4季度', code: 4 },
				];
			}
		});

		return {
			...toRefs(state),
			prev,
			next,
			reast,
			selectSeason,
			handleOpen,
		};
	},
});
</script>
<style>
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
</style>
<style lang="scss" scoped>
.selected {
	.el-button--text {
		color: $color-primary;
	}
}
.el-button--text {
	color: #666666;
}
</style>
