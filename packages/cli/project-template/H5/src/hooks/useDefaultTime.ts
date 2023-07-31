import { ref } from 'vue';
import dayjs from 'dayjs';
import { getDefalutTime } from '/@/api/index';

export function useDefaultTime(hook: (val) => any) {
  //获取字典方法
  async function initDefaultTime() {
    const res = await getDefalutTime();
    if (res.status == 0) {
      hook(dayjs(res.data).format('YYYY年MM月DD日'));
    } else {
    }
  }

  onBeforeMount(() => {
    initDefaultTime();
  });
}
