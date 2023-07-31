import { ElMessage } from 'element-plus';
import { onBeforeMount, ref } from 'vue';
import { getDictionary } from '/@/api/baseConfig/index.ts';

/**
 * 字典hook
 * by Bing.Chan
 * @param dicTypeList =字典类型数组
 * @returns
 */
export function useDictionary(dicTypeList: any = []) {
	let useDictionaryList = ref([]);
	//获取字典方法
	async function initDictionaryList() {
		let res = await getDictionary(dicTypeList);
		if (res.status == 0) {
			useDictionaryList.value = res.data;
		} else {
			ElMessage.error(res.message);
		}
	}

	onBeforeMount(() => {
		initDictionaryList();
	});

	return {
		useDictionaryList,
	};
}
