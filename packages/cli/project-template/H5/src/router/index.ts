import { createRouter, createWebHistory, Router } from 'vue-router';
import routes from './routes';
import { getUserInfo } from '../api/index';
import { useUserStore } from '/@/store/modules/user';

const router: Router = createRouter({
  history: createWebHistory('/'),
  routes: routes,
});

router.beforeEach(async (_to, _from, next) => {
  // const userStore = useUserStore();
  // const user = userStore.getUserInfo;
  // console.log(user.orgCode,"user")
  // if (!user.orgCode) {
  //   const res = await getUserInfo({});
  //   if (res.status == 0) {
  //     userStore.setInfo(res.data);
  //   }
  // }
  next();
});

export default router;
