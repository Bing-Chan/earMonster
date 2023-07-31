import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { searchDept } from '/@/api/org/index.ts';

/**
 * 字典hook
 * by Bing.Chan
 * @param dicTypeList =字典类型数组
 * @returns
 */
export function useDepartment() {
	let useDepartmentList = ref([]);
	const reloadList = async (orgCode: String) => {
		let res = await searchDept({
			orgCode: orgCode,
		});
		if (res.status == 0) {
			useDepartmentList.value = res.data.map((x) => {
				return {
					label: x.orgName,
					value: x.orgCode,
					desc: x.orgCodeLine,
				};
			});
		} else {
			ElMessage.error(res.message);
		}
	};

	return {
		useDepartmentList,
		reloadList,
	};
}
