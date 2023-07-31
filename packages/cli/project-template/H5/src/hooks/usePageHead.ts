import * as dd from 'dingtalk-jsapi';
import { useRoute } from 'vue-router';

export function usePageHead() {
  const route = useRoute();

  onBeforeMount(() => {
    const isDingTalk = !('notInDingTalk' === dd.env.platform);
    if (isDingTalk) {
      // 设置标题
      dd.biz.navigation.setTitle({
        title: route.meta.title, //控制标题文本，空字符串表示显示默认文本
        onSuccess: function (result) {},
        onFail: function (err) {},
      });

      if (route.meta.isHelp) {
        dd.biz.navigation.setIcon({
          showIcon: true, //是否显示icon
          iconIndex: 1, //显示的iconIndex, 如上图
          onSuccess: function (result) {},
          onFail: function (err) {
            //jsapi调用失败将会回调此函数
          },
        });
      }
    }
  });
}
