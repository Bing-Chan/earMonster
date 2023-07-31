import { ElMessage } from 'element-plus';
import { onBeforeMount, ref } from 'vue';
import { getPosition } from '/@/api/baseConfig/index.ts';

/**
 * 工序岗位
 * by Bing.Chan
 * @returns
 */
export function usePosition() {
	let usePositionList = ref([]);
	//获取字典方法
	async function initPositionList() {
		let res = await getPosition();
		if (res.status == 0) {
			usePositionList.value = res.data.map((x) => {
				return {
					...x,
					name: `${x.jobCode} ${x.jobName}`,
				};
			});
		} else {
			ElMessage.error(res.message);
		}
	}

	onBeforeMount(() => {
		initPositionList();
	});

	return {
		usePositionList,
	};
}
