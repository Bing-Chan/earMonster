import { useYtoRouter } from '@yto-security/vue3-sdk';
import routes from './routes/index.ts';


/**
 * 创建一个可以被 Vue 应用程序使用的路由实例
 * @method createRouter(options: RouterOptions): Router
 * @link 参考：https://next.router.vuejs.org/zh/api/#createrouter
 */
const router = useYtoRouter({
	//history: 'hash', //createWebHashHistory(),
	routes: routes,
});

export default router;
