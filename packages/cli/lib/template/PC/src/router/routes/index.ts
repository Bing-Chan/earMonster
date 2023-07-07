import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/salaryConfig',
		name: 'salaryConfig',
		component: () => import('/@/views/salaryConfig/index.vue'),
		meta: {
			title: '薪资配置',
			isKeepAlive: true,
		},
	},
	{
		path: '/salaryStructure',
		name: 'salaryStructure',
		component: () => import('/@/views/salaryStructure/index.vue'),
		meta: {
			title: '薪资结构',
			isKeepAlive: true,
		},
	},
];

export default routes;
