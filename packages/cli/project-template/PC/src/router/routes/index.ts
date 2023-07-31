import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/templateConfig',
		name: 'templateConfig',
		component: () => import('/@/views/templateConfig/config.vue'),
		meta: {
			title: '模板配置页面',
			isKeepAlive: true,
		},
	},
	{
		path: '/templateList',
		name: 'templateList',
		component: () => import('/@/views/templateConfig/index.vue'),
		meta: {
			title: '模板配置列表',
			isKeepAlive: true,
		},
	},
	{
		path: '/roleList',
		name: 'roleList',
		component: () => import('/@/views/role/index.vue'),
		meta: {
			title: '角色配置',
			isKeepAlive: true,
		},
	},
	{
		path: '/flowList',
		name: 'flowList',
		component: () => import('/@/views/flow/index.vue'),
		meta: {
			title: '流程配置列表',
			isKeepAlive: true,
		},
	},
	{
		path: '/flowConfig',
		name: 'flowConfig',
		component: () => import('/@/views/flow/config.vue'),
		meta: {
			title: '流程配置',
			isKeepAlive: true,
		},
	},
	{
		path: '/dictionary',
		name: 'dictionary',
		component: () => import('/@/views/basicConfig/dictionary.vue'),
		meta: {
			title: '数据字典配置',
			isKeepAlive: true,
		},
	},
	{
		path: '/perProgram',
		name: 'perProgram',
		component: () => import('/@/views/performancePlan/index.vue'),
		meta: {
			title: '绩效方案',
			isKeepAlive: true,
		},
	},
	{
		path: '/indicatorsLibrary',
		name: 'indicatorsLibrary',
		component: () => import('/@/views/indicatorsLibrary/index.vue'),
		meta: {
			title: '指标库配置',
			isKeepAlive: true,
		},
	},
	{
		path: '/indicatorResult',
		name: 'indicatorResult',
		component: () => import('/@/views/indicatorResult/index.vue'),
		meta: {
			title: '指标结果列表',
			isKeepAlive: true,
		},
	},
	{
		path: '/schemeDetail',
		name: 'schemeDetail',
		component: () => import('/@/views/performancePlan/performanceView.vue'),
		meta: {
			title: '指标结果列表',
			isKeepAlive: true,
		},
	},
	{
		path: '/schemeResult',
		name: 'schemeResult',
		component: () => import('/@/views/schemeResult/index.vue'),
		meta: {
			title: '绩效考核结果',
			isKeepAlive: true,
		},
	},
	{
		path: '/parameterResult',
		name: 'parameterResult',
		component: () => import('/@/views/parameterResult/index.vue'),
		meta: {
			title: '参数结果列表',
			isKeepAlive: true,
		},
	},
	{
		path: '/parameter',
		name: 'parameter',
		component: () => import('/@/views/parameter/index.vue'),
		meta: {
			title: '参数配置',
			isKeepAlive: true,
		},
	},
	{
		path: '/panorama',
		name: 'panorama',
		component: () => import('/@/views/panorama/index.vue'),
		meta: {
			title: '全景图',
			isKeepAlive: true,
		},
	},
	{
		path: '/sectionPrice',
		name: 'sectionPrice',
		component: () => import('/@/views/sectionPrice/index.vue'),
		meta: {
			title: '阶梯单价',
			isKeepAlive: true,
		},
	},
	{
		path: '/sectionPrice/edit',
		name: 'sectionPriceEdit',
		component: () => import('/@/views/sectionPrice/src/edit.vue'),
		meta: {
			title: '编辑阶梯单价',
			isKeepAlive: true,
		},
	},
	{
		path: '/perCoefficient',
		name: 'perCoefficient',
		component: () => import('/@/views/performanceCoefficient/index.vue'),
		meta: {
			title: '绩效系数',
			isKeepAlive: true,
		},
	},
	{
		path: '/daySalary',
		name: 'daySalary',
		component: () => import('/@/views/daySalary/index.vue'),
		meta: {
			titel: '日薪说明',
			isKeepAlive: true,
		},
	},
];

export default routes;
