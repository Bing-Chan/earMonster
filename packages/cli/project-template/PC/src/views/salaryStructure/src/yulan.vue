<template>
	<div class="yulan">
		<div class="one-title"><span>月薪-薪资结构</span></div>
		<div style="background: #eff6ff">
			<el-scrollbar>
				<div :class="!isEdit ? 'report-list' : 'report-list leftList'">
					<div
						:class="item1.categoryCode == 'allowances' ? 'report-list-w300' : 'report-list-item'"
						v-for="(item1, index1) in dicList.itemCategory"
						:key="index1"
					>
						<div :class="item1.paymentType == 'income' ? 'title' : 'title red'">
							{{ (item1.paymentType == 'income' ? '+' : '-') + item1.category }}
						</div>
						<div
							class="flag"
							v-for="(item, index) in selection.filter((x) => x.itemCategory === item1.categoryCode)"
							@click="handleDeleteTag(item)"
							:key="index"
						>
							{{ item.itemName }}
							<span v-if="isEdit" class="close"><SvgIcon :name="'elementClose'"></SvgIcon></span>
						</div>
					</div>
				</div>
			</el-scrollbar>
		</div>
		<div class="lin20px"></div>
		<div class="one-title"><span>日薪-薪资结构</span></div>
		<div class="report-day">
			<div v-for="(item1, index1) in dicList.itemCategory" :key="index1">
				<div class="report-day-w150" v-if="selection.some((x) => x.itemCategory == item1.categoryCode && x.allocateToDaily == 1)">
					<div :class="item1.paymentType == 'income' ? 'title' : 'title red'">{{ (item1.paymentType == 'income' ? '+' : '-') + item1.category }}</div>
					<div
						class="flag"
						v-for="(item, index) in selection.filter((x) => x.itemCategory == item1.categoryCode && x.allocateToDaily == 1)"
						:key="index"
					>
						{{ item.itemName }}
					</div>
				</div>
			</div>
		</div>
		<div class="lin20px"></div>
		<div v-if="!isEdit">
			<el-form label-position="left" label-width="85px" ref="formRef" :model="info" :rules="formRules">
				<el-form-item label="模板名称：" prop="templateName">
					<span style="font-weight: bold">{{ info.templateName }}</span>
				</el-form-item>

				<el-form-item label="适用人员：" prop="suitStaff">
					<span style="font-weight: bold">{{ info.suitStaff }}</span>
				</el-form-item>
				<el-form-item label="有效期：" prop="effectiveStartTime">
					<span style="font-weight: bold">{{ info.effectiveStartTime + '~' + (info.effectiveEndTime == null ? '' : info.effectiveEndTime) }}</span>
				</el-form-item>
			</el-form>
			<div class="lin20px"></div>
		</div>
		<div style="text-align: right" v-if="isEdit && isButton">
			<el-button type="default" @click="handleColse">关闭预览</el-button>
			<el-button type="primary" @click="handleSave">直接提交</el-button>
		</div>
	</div>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted, getCurrentInstance, watchEffect } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';

export default defineComponent({
	name: 'selectList',
	props: {
		// 适用对象，suitableFilterFlag=true时起效
		dicList: {
			type: Object,
			default: () => {
				return {};
			},
		},
		selection: {
			type: Array,
			default: () => {
				return [];
			},
		},
		data: {
			type: Object,
			default: () => {
				return {};
			},
		},
		isEdit: {
			type: Boolean,
			default: () => {
				return false;
			},
		},
		isButton: {
			type: Boolean,
			default: () => {
				return true;
			},
		},
	},
	setup(props, { emit }) {
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			flag: false,
			dicList: props.dicList,
			selection: props.selection,
			info: props.data,
		});

		const handleColse = () => {
			console.log(state.selection, 'yulan');
			emit('close');
		};

		const handleSave = async () => {
			emit('save', state.selection);
		};

		const handleDeleteTag = (item) => {
			emit('delete', item);
		};

		watchEffect(() => {
			state.dicList = props.dicList;
			state.selection = props.selection;
			state.info = props.data;
		});

		onMounted(() => {});

		return {
			handleSave,
			handleColse,
			handleDeleteTag,
			...toRefs(state),
		};
	},
});
</script>
<style lang="scss" scoped>
.lin20px {
	line-height: 10px;
	height: 10px;
}
.red {
	color: $color-red;
}
.one-title {
	padding: 5px 5px;
	color: #333;
}

.report-list {
	min-width: 600px;
	width: 100%;
	height: 360px;
	display: flex;
	flex-wrap: wrap;
	justify-content: left;
	align-content: center;
	padding-left: 10px;
	padding-top: 10px;
	&-item,
	&-w300 {
		width: 150px;
		height: 100%;
		margin-right: 10px;
		font-size: 12px;

		.title {
			padding: 0px 5px;
			line-height: 20px;
			height: 20px;
			border: solid 1px #cccccc;
			text-align: center;
			font-weight: 700;
			background: #daebfe;
		}
		.flag {
			padding: 0px 5px;
			line-height: 20px;
			word-wrap: break-word;
			border: solid 1px #cccccc;
			border-top: 0px;
			text-align: center;
			background: #ffffff;
			position: relative;

			.close {
				display: none;
				position: absolute;
				right: 5px;
				z-index: 999;
				top: 0px;
				cursor: pointer;
			}
		}
		.flag:hover {
			.close {
				display: block;
			}
		}
	}
}

.leftList {
	justify-content: center;
	.report-list-item,
	.report-list-w300 {
		flex: 1;
	}
}

.report-day {
	width: 100%;
	height: 150px;
	background: #eff6ff;
	display: flex;
	justify-content: flex-start;
	padding-left: 10px;
	padding-top: 10px;
	&-w150 {
		min-width: 150px;
		height: 100%;
		margin-right: 10px;
		font-size: 12px;

		.title {
			padding: 0px 5px;
			line-height: 20px;
			height: 20px;
			border: solid 1px #cccccc;
			text-align: center;
			font-weight: 700;
			background: #daebfe;
		}
		.flag {
			padding: 0px 5px;
			line-height: 20px;
			word-wrap: break-word;
			border: solid 1px #cccccc;
			border-top: 0px;
			text-align: center;
			background: #ffffff;
		}
	}
}
.el-form-item--small.el-form-item {
	margin-bottom: 0px !important;
}

/*当页面宽度大于1280px且小于1366px的时候执行,1280-1366*/
@media screen and (max-width: 1440px) {
	.report-list-item {
		flex: 1;
	}
}

/*当页面宽度大于1280px且小于1366px的时候执行,1280-1366*/
@media screen and (min-width: 1440px) {
	.report-list-item {
		width: 150px;
	}
}
</style>
