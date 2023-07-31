<template>
	<div id="pages">
		<el-table height="300px" :data="tableData" stripe @selection-change="handleSelectionChange" border style="width: 100%">
			<template #empty><SysEmpty></SysEmpty></template>
			<el-table-column type="selection" width="55" label="全选" />
			<el-table-column prop="quotaName" label="名称" align="center"></el-table-column>
			<el-table-column prop="description" label="评定标准" align="center"></el-table-column>
		</el-table>
	</div>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted, getCurrentInstance } from 'vue';
import { getIndicatorsList } from '/@/api/indicatorsLibrary/index.ts';

export default defineComponent({
	name: 'yipiaoPage',
	setup(props) {
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			isCollapse: false,
			tableData: [],
			selection: [],
		});

		const bandReset = () => {
			proxy.$refs.queryRef.resetFields();
		};
		const onSubmit = () => {
			getList();
		};
		const handleSelectionChange = (val) => {
			state.selection = val;
		};
		const handleSizeChange = (val: number) => {
			state.limit = val;
			getList();
		};
		const handleCurrentChange = (val: number) => {
			state.currentPage = val;
			getList();
		};

		const getSelectList = () => {
			return state.selection;
		};

		const getList = async () => {
			let res = await getIndicatorsList({
				limit: 1000,
				pageNo: 1,
				quotaCategoryId: 'sys_type_veto',
				quotaState: 1,
			});
			state.tableData = res.data.resultData;
		};

		onMounted(() => {
			getList();
		});

		return {
			...toRefs(state),
			onSubmit,
			bandReset,
			handleSelectionChange,
			handleSizeChange,
			handleCurrentChange,
			getSelectList,
		};
	},
});
</script>
<style lang="scss" scoped>
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
</style>
