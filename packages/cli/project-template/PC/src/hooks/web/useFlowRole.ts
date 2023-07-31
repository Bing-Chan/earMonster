import { ElMessage } from 'element-plus';
import { onBeforeMount, ref } from 'vue';
import { getRoleList } from '/@/api/role/index.ts';

/**
 * 字典hook
 * by Bing.Chan
 * @param dicTypeList =字典类型数组
 * @returns
 */
export function useFlowRole() {
	let useFlowRoleList = ref([]);
	//获取字典方法
	async function initFlowRoleList() {
		let res = await getRoleList({
			pageNo: 1,
			limit: 100,
		});
		if (res.status == 0) {
			useFlowRoleList.value = res.data.resultData;
		} else {
			ElMessage.error(res.message);
		}
	}

	onBeforeMount(() => {
		initFlowRoleList();
	});

	return {
		useFlowRoleList,
	};
}
