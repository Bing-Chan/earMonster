import { ElMessage } from 'element-plus';
import { onBeforeMount, ref, toRaw } from 'vue';
import { getFlowList } from '/@/api/flow/index.ts';

/**
 * 流程数组
 * by Bing.Chan
 * @returns
 */
export function useFlow(flowType = 'sys_flow_type_main') {
	let useFlowList = ref([]);
	//获取流程方法
	async function initFlowList() {
		let params = {
			pageNo: 1,
			limit: 100,
			flowStatus: 1,
			flowType: flowType,
		};
		let res = await getFlowList(toRaw(params));
		if (res.status == 0) {
			useFlowList.value = res.data.resultData ?? [];
		} else {
			ElMessage.error(res.message);
		}
	}

	onBeforeMount(() => {
		initFlowList();
	});

	return {
		useFlowList,
	};
}
