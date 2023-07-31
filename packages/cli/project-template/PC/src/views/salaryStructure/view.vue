<template>
	<div id="pages">
		<div class="panl-head">
			<h2>{{ formTitle }}</h2>
			<el-button type="primary" class="btn" @click="goBack" size="small">返回</el-button>
		</div>
		<div style="padding: 0px 15px; background: #ffffff; ">
			<div class="tabs is-hover-shadow">
				<ul class="tabs-header">
					<li @click="handelTabs(1)" :class="viewTab == 1 ? 'is-active' : ''">
						<span class="first-title">薪资结构</span>
					</li>
					<li @click="handelTabs(2)" :class="viewTab == 2 ? 'is-active' : ''">
						<span class="first-title">结构明细</span>
					</li>
				</ul>
			</div>

			<div v-if="viewTab == 1" style="min-height: 800px;">
				<yulan :dicList="dicList" :data="editForm" :selection="selection" :isEdit="false"></yulan>
			</div>
			<div class="step-content" v-else style="min-height: 800px;padding:10px 0px">
				<jiegou :dicList="dicList" :tableData="selection" :isEdit="false"></jiegou>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted, inject, getCurrentInstance, nextTick, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import dayjs from 'dayjs';
import { dateFormat } from '/@/utils/formatTime';
import { ElMessageBox, ElMessage } from 'element-plus';
import {
	getSalaryStructureList,
	salaryStructureAdd,
	salaryStructureEdit,
	salaryStructureDelete,
	salaryStructureInfo,
} from '/@/api/salaryStructure/index';
import { getSalaryConfigAllList } from '/@/api/salaryConfig/index';
import jiegou from './src/jiegou.vue';
import yulan from './src/yulan.vue';

export default defineComponent({
	name: 'left',
	components: {
		jiegou,
		yulan,
	},
	setup(props) {
		const { proxy } = getCurrentInstance() as any;
		const loading = ref(false);
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			viewFlag: false,
			viewTab: 1,
			yulanFlag: false,
			stepActiveIndex: 1,
			addFlag: false,
			formTitle: '查看薪资结构模板',
			selection: [],
			queryForm: {
				templateName: '',
				currentPage: 1,
				limit: 20,
				total: 0,
			},
			editForm: {
				templateName: '',
				effectiveEndTime: '',
				effectiveStartTime: '',
				id: '',
				suitStaff: '上海转运中心操作工',
			},
			formRules: {
				templateName: [{ required: true, message: '请输入模板名称', trigger: 'blue' }],
				effectiveStartTime: [{ required: true, message: '请选择有效开始日期', trigger: 'change' }],
				suitStaff: [{ required: true, message: '请输入适用人员', trigger: 'change' }],
			},
			tableData: [],
			dicList: {
				itemCategory: [
					{ categoryCode: 'basic_salary', category: '基本薪资', paymentType: 'income' },
					{ categoryCode: 'performance', category: '绩效', paymentType: 'income' },
					{ categoryCode: 'allowances', category: '津补贴', paymentType: 'income' },
					{ categoryCode: 'pre_tax_deductions', category: '税前扣款', paymentType: 'deduction' },
					{ categoryCode: 'social_security_housing_fund', category: '社保公积金', paymentType: 'deduction' },
					{ categoryCode: 'tax_deductions', category: '扣税', paymentType: 'deduction' },
					{ categoryCode: 'post_tax_deductions', category: '税后扣款', paymentType: 'deduction' },
				],
				actualValueSource: [
					{ name: '系统计算', code: 'system' },
					{ name: '人工维护', code: 'artificial' },
				],
				allocateToDaily: [
					{ name: '是', code: 1 },
					{ name: '否', code: 0 },
				],
			},
			setpInfo: {
				itemCategory: '',
				actualValueSource: '',
				allocateToDaily: '',
				tableData: [],
			},
		});
		const lodash = inject('lodash');

		const handelTabs = (tabs: any) => {
			state.viewTab = tabs;
		};

		const init = async () => {
			let res = await getSalaryConfigAllList({ start: 0 });
			if (res.status == 0) {
				state.setpInfo.tableData = res.data;
			}
			let id = route.query.id;
			if (id != '') {
				const res = await salaryStructureInfo({ id: id });
				if (res.status == 0) {
					state.editForm = JSON.parse(JSON.stringify(res.data));
					state.selection = state.setpInfo.tableData.filter((x) => res.data.salaryItemAddReqList.some((y) => x.id === y.salaryItemConfigId));
				} else {
					ElMessage.error(res.message);
				}
			}
		};

		
		// 返回
		const goBack = () => {
			router.go(-1);
		};

		onMounted(() => {
			init();
		});

		return {
			...toRefs(state),
			handelTabs,
			loading,
			goBack
		};
	},
});
</script>
<style>
.step-dialog .el-dialog__body {
	padding-top: 0px !important;
	padding-left: 0px !important;
	padding-right: 0px !important;
}
.step-dialog .el-alert__content {
	padding: 0px 0px;
	font-size: 12px !important;
}

.step-content {
	padding: 20px 30px;
}
.alert-title .el-alert__title {
	font-size: 10px !important;
}

.el-step__line-inner {
	border-style: none;
}
</style>
<style lang="scss" scoped>
#pages {
	height: 100%;
	display: flex;
	flex-direction: column;

	.content_list {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 20px;
		min-height: 100px !important;
		padding-bottom: 0px;
		.table_list {
			flex: auto;
			// 重点是这里：开始
			position: relative;

			::v-deep(.el-table) {
				position: absolute;
				height: 100%;
			}
		}
		.content_title {
			padding-bottom: 0px;
		}
		.content_title,
		.pagination {
			flex-shrink: 0;
		}

		.pagination {
			margin: 0;
			padding: 0;
		}
	}
}

.content {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
}

::v-deep(.el-form-item__label) {
	font-family: Microsoft YaHei;
	color: #666;
}
::v-deep(.el-table__cell) {
	.cell {
		font-family: Microsoft YaHei;
		color: #666;
	}
}
::v-deep(.el-table) {
	th.el-table__cell > .cell {
		color: #333;
		font-family: Microsoft YaHei;
		font-size: 14px;
	}
}

.el-steps--simple {
	padding: 13px 20px;
	background: #edf2ff;
}

.tag-number {
	width: 16px;
	padding: 0 0;
	height: 16px;
	line-height: 16px;
	border-radius: 50%;
	border: solid 1px #c0c4cc;
	display: inline-block;
	text-align: center;
}

.is-finish .is-text {
	.tag-number {
		border: solid 1px #4c84ff !important;
	}
}

.filter-list {
	width: 100%;
	display: flex;
	box-sizing: border-box; //宽度包含边距
	outline: none;
	margin: 0;
	padding: 0;
	position: relative;
	overflow: hidden;
	line-height: 26px;
	&-title {
		width: 60px;
		font-size: 12px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #333333;
		line-height: 26px;
	}
	&-item {
		flex: 1;
		.el-tag {
			font-size: 12px;
			margin-left: 10px;

			&:hover {
				// background: #ecf5ff;
				// color: #409eff;
				// border-color:#d9ecff ;
				cursor: pointer;
			}
		}

		.dd-active {
			color: $color-primary;
		}
	}

	::v-deep(.el-input) {
		width: 120px !important;
		font-size: 12px;
	}
}

.lin20px {
	line-height: 10px;
	height: 10px;
}

.report-list {
	width: 100%;
	height: 400px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-content: center;
	padding-left: 10px;
	padding-top: 10px;
	&-item,
	&-w300 {
		flex: 1;
		width: 100px;
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

	&-w300 {
		flex: content;
		width: 150px;
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
		width: 100px;
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

.tabs {
	display: flex;
	width: 100%;
	flex-direction: column;
	transition: 0.3s;
	background-color: #ffffff;
	padding: 5px 0px;

	ul,
	li {
		padding: 0px 0px;
		margin: 0px 0px;
	}

	li {
		list-style-type: none;
		float: left;
		min-width: 80px;
		margin-right: 15px;

		cursor: pointer;
		text-align: center;
		padding: 0px 5px;
		padding-left: 0px;
		line-height: 40px;
		height: 40px;
	}

	li:hover {
		color: $color-primary;
		span {
			color: $color-primary;
		}
	}

	&-header {
		padding-top: 5px;
		line-height: 40px;
		background-color: inherit;
		width: 100%;
		border-bottom: solid 1px $border-gray;

		&--more {
			float: right !important;
			line-height: 40px;
			height: 100%;
			button {
				vertical-align: middle;
				margin-top: 5px;
			}
		}
	}
	&-body {
		padding: 20px 0px;
		background-color: inherit;
	}

	&-header-scroll {
		display: flex;
		padding-top: 5px;
		line-height: 40px;
		background-color: inherit;
		width: 100%;
		border-bottom: solid 1px $border-gray;
		flex: 1;
		&-left {
			width: 90%;
			display: flex;
			flex: 1;
			.menuList {
				flex-shrink: 0;
				display: flex;
				&-item {
					flex-shrink: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					min-width: 80px;
					padding: 0px 5px;
					padding-left: 0px;
					line-height: 40px;
					margin-right: 15px;
					cursor: pointer;
				}
				&-item:hover {
					color: $color-primary;
					span {
						color: $color-primary;
					}
				}
			}
		}
		&-right {
			width: 100px;
		}
	}

	.is-active {
		color: $color-primary;
		border-bottom: solid 2px $color-primary;
		span {
			color: $color-primary;
		}
	}
}

.panl-head {
	width: 100%;
	background: #ffffff;
	min-height: 50px;
	margin-bottom: 10px;
	padding: 0px 10px;
	line-height: 50px;
	h2 {
		float: left;
	}
	.btn {
		float: right;
		margin-right: 10px;
		margin-top: 10px;
	}
}
</style>
