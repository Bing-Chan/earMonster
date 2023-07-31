<template>
	<div>
		<div class="filter-list">
			<div class="filter-list-title">薪资分类</div>
			<div class="filter-list-item">
				<el-tag class="ml-2" @click="handleChange('', 'itemCategory')" :type="setpInfo.itemCategory == '' ? '' : 'info'"
					>全部{{ ' ' + toFenleiNum('', 'itemCategory') }}</el-tag
				>
				<el-tag
					class="ml-2"
					val="item.categoryCode"
					v-for="item in dicList.itemCategory"
					:key="item.categoryCode"
					@click="handleChange(item.categoryCode, 'itemCategory')"
					:type="setpInfo.itemCategory == item.categoryCode ? '' : 'info'"
					>{{ item.category + ' ' + toFenleiNum(item.categoryCode, 'itemCategory') }}</el-tag
				>
			</div>
		</div>
		<div class="lin20px"></div>
		<div class="filter-list">
			<div class="filter-list-title">实际值来源</div>
			<div class="filter-list-item">
				<el-tag class="ml-2" @click="handleChange('', 'actualValueSource')" :type="setpInfo.actualValueSource == '' ? '' : 'info'"
					>全部{{ ' ' + toFenleiNum('', 'actualValueSource') }}</el-tag
				>
				<el-tag
					class="ml-2"
					val="item.code"
					v-for="item in dicList.actualValueSource"
					:key="item.code"
					@click="handleChange(item.code, 'actualValueSource')"
					:type="setpInfo.actualValueSource == item.code ? '' : 'info'"
					>{{ item.name + '  ' + toFenleiNum(item.code, 'actualValueSource') }}</el-tag
				>
			</div>
		</div>
		<div class="lin20px"></div>

		<div class="filter-list">
			<div class="filter-list-title">分摊到日</div>
			<div class="filter-list-item">
				<el-tag class="ml-2" @click="handleChange('', 'allocateToDaily')" :type="setpInfo.allocateToDaily === '' ? '' : 'info'"
					>全部{{ ' ' + toFenleiNum('', 'allocateToDaily') }}</el-tag
				>
				<el-tag
					class="ml-2"
					val="item.code"
					v-for="item in dicList.allocateToDaily"
					:key="item.code"
					@click="handleChange(item.code, 'allocateToDaily')"
					:type="setpInfo.allocateToDaily !== '' && setpInfo.allocateToDaily === item.code ? '' : 'info'"
					>{{ item.name + ' ' + toFenleiNum(item.code == 1, 'allocateToDaily') }}</el-tag
				>
			</div>
		</div>
		<div class="lin20px"></div>
		<div class="lin20px"></div>
		<div>
			<el-alert :closable="false" type="warning">
				<template #title>
					<span style="font-size: 12px">{{ toTitle() }}</span>
				</template>
			</el-alert>
		</div>
		<div class="lin20px"></div>
		<div class="lin20px"></div>
		<div class="table-none">
			<el-table
				:data="result"
				ref="tableRef"
				:row-key="(row) => row.id"
				stripe
				@selection-change="handleSelectionChange"
				border
				style="width: 100%"
				height="100%"
				min-height="400px"
			>
				<template #empty><SysEmpty></SysEmpty></template>
				<el-table-column v-if="isEdit" reserve-selection fixed type="selection" align="center" width="55"> </el-table-column>
				<el-table-column prop="itemCategoryStr" fixed label="薪资项分类" min-width="100" align="center"></el-table-column>
				<el-table-column prop="itemName" fixed min-width="120" label="薪资项名称 " align="center"></el-table-column>
				<el-table-column prop="applicableDetails" show-overflow-tooltip min-width="250" label="适用明细" align="center"></el-table-column>
				<el-table-column prop="paymentType" label="类型" align="center">
					<template #default="scope">
						{{ scope.row.paymentType == 'income' ? '收入项' : '扣减项' }}
					</template>
				</el-table-column>
				<el-table-column prop="deductFromTotal" label="从应发中扣除" min-width="120" align="center">
					<template #default="scope">
						{{ scope.row.deductFromTotal == null ? '-' : scope.row.deductFromTotal ? '是' : '否' }}
					</template>
				</el-table-column>
				<el-table-column prop="preTax" label="税前项目" align="center">
					<template #default="scope">
						{{ scope.row.preTax ? '是' : '否' }}
					</template>
				</el-table-column>
				<el-table-column prop="allocateToDaily" label="分摊到日" align="center">
					<template #default="scope">
						{{ scope.row.allocateToDaily ? '是' : '否' }}
					</template>
				</el-table-column>
				<el-table-column prop="actualValueSource" min-width="150" label="实际值来源" align="center">
					<template #default="scope">
						{{ dicList.actualValueSource.find((x) => x.code == scope.row.actualValueSource).name }}
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="lin20px"></div>
		<div class="setp-btns" v-show="isEdit">
			<el-button type="default" @click="handlelUp">上一步</el-button>
			<el-button type="primary" @click="handleYulan">预 览</el-button>
		</div>
	</div>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, nextTick, onMounted, watch, getCurrentInstance, watchEffect, toRaw } from 'vue';
import { getSalaryConfigAllList } from '/@/api/salaryConfig/index';
export default defineComponent({
	name: 'selectList',
	props: {
		dicList: {
			type: Object,
			default: () => {
				return {};
			},
		},
		tableData: {
			type: Array,
			default: () => {
				return [];
			},
		},
		isEdit: {
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
			selection: [],
			isEdit: props.isEdit,
			dicList: props.dicList,
			tableData: props.tableData,
			selectFlag: false,
			result: [],
			setpInfo: {
				itemCategory: '',
				actualValueSource: '',
				allocateToDaily: '',
			},
		});

		// 过滤当前选中的数据
		const handleChange = (val: any, column: string) => {
			console.log(column, val);
			state.setpInfo[column] = val;
			getList();
		};

		const handleSelectionChange = (val: any) => {
			if (state.selectFlag) return false;
			state.selection = JSON.parse(JSON.stringify(val));
		};

		const toggleRowSelection = (selected) => {
			state.selectFlag = true;
			state.result.forEach((x) => {
				let checked = selected.some((y) => y.id === x.id);
				if (checked) {
					proxy.$refs.tableRef.toggleRowSelection(x, true);
				} else {
					proxy.$refs.tableRef.toggleRowSelection(x, false);
				}
			});
			state.selection = JSON.parse(JSON.stringify(selected));
			state.selectFlag = false;
		};

		const toTitle = () => {
			//已选:全部12/12,其中:基础薪资2/2、绩效2/2、补贴2/2、扣款2/2、社保公积金2/2、税后扣款1/1
			let arr = [];
			arr.push(`已选：全部${state.selection.length}/${state.tableData.length}，其中：`);
			state.dicList.itemCategory.forEach((x, index) => {
				console.log(x, 'xxx');
				console.log(state.selection, 'xxx');
				console.log(state.tableData, 'xxx');

				arr.push(
					`${index == 0 ? '' : '、'} ${x.category}${state.selection.filter((y) => y.itemCategory == x.categoryCode).length}/
					${state.tableData.filter((y) => y.itemCategory == x.categoryCode).length}`
				);
			});
			return arr.join('').trimEnd();
		};

		const toFenleiNum = (code, column) => {
			if (code === '') {
				return state.tableData.length;
			}
			let len = state.tableData.filter((x) => x[column] === code).length;
			return len;
		};

		const handlelUp = () => {
			emit('up');
		};

		const handleYulan = () => {
			emit('review', state.selection);
		};

		const getList = async () => {
			state.result = state.tableData;
			let res = await getSalaryConfigAllList(toRaw(state.setpInfo));
			if (res.status == 0) {
				if (state.isEdit) {
					state.result = res.data;
				} else {
					state.result = state.result.filter((x) => res.data.some((y) => x.id == y.id));
				}
			}
		};

		watchEffect(() => {
			state.dicList = props.dicList;
			state.isEdit = props.isEdit;
			if (state.isEdit) {
				console.log(state.tableData, 'state.tableData');
				state.tableData = props.tableData ?? [];
				state.result = JSON.parse(JSON.stringify(state.tableData));
			} else {
				state.tableData = props.tableData ?? [];
				state.result = JSON.parse(JSON.stringify(props.tableData ?? []));
				state.selection = props.tableData;
			}
		});

		onMounted(() => {});

		return {
			...toRefs(state),
			toTitle,
			toFenleiNum,
			handleChange,
			handlelUp,
			handleYulan,
			handleSelectionChange,
			toggleRowSelection,
		};
	},
});
</script>
<style lang="scss">
.table-none {
	.el-table__fixed-right::before,
	.el-table__fixed::before {
		display: none;
	}
}
</style>
<style lang="scss" scoped>
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
		width: 80px;
		font-size: 12px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 26px;
		text-align: right;
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

.setp-btns {
	text-align: right;
	position: fixed;
	background: #ffffff;
	z-index: 999;
	bottom: 0px;
	right: 0px;
	height: 60px;
	padding: 0px 30px;
	width: 100%;
	border-top: solid 1px #eeeeee;
	padding-top: 10px;
}
</style>
