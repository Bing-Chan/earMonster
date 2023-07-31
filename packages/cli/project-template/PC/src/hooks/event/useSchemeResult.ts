import { getCurrentInstance, ComputedRef, nextTick } from 'vue';
import type { Ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
// 页面公用方法
export function usePages(state) {
	const { proxy } = getCurrentInstance();

	const getAssessCycleType = (assessCycleType: any) => {
		if (assessCycleType && state.dictionaryList && state.dictionaryList.length > 0) {
			return state.dictionaryList['sys_period'].find((x) => {
				return x.dictItemCode == assessCycleType;
			}).dictItem;
		}
		return '';
	};

	return {
		getAssessCycleType,
	};
}
