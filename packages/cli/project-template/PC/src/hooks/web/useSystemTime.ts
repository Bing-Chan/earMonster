import { ElMessage } from 'element-plus';
import { onBeforeMount, ref } from 'vue';
import dayjs from 'dayjs';
import { getSystemTime } from '/@/api/baseConfig/index.ts';

export function useSystemTime() {
	let sysTime = ref();
	let defalutTime = ref();
	let maxHour = ref(21);

	//获取字典方法
	async function initSystemTime(callback) {
		let res = await getSystemTime();
		if (res.status == 0) {
			callback(res.data);
		} else {
			ElMessage.error(res.message);
		}
	}

	const toDefaultTime = (now) => {
		let t = dayjs(now);
		if (t.hour() >= maxHour.value) {
			return t.add(-1, 'day').format('YYYY-MM-DD');
		}
		return t.add(-2, 'day').format('YYYY-MM-DD');
	};

	return {
		toDefaultTime,
		initSystemTime,
		maxHour,
	};
}
