import { mdPlugin } from './config/plugins'
const path = require('path')

module.exports = {
	lang: 'zh-CN',
	title: 'ear-monster',
	description: 'ear-monster',
	base: '/ear-monster/',
	head: [
		[
			'link',
			{
				rel: 'icon',
				href: '/11.ico',
			},
		],
	],
	plugins: [],
	markdown: {
		config: md => mdPlugin(md),
	},
	themeConfig: {
		// repo: 'fish-uncle/design-plus', 自动生成github链接
		logo: '/logo.jpg',
		nav: [
			{ text: '主页', link: '/' },
			{ text: 'PC端', link: '/component/pc/index.html' },
			{ text: 'Use', link: '/component/use/index.html' },
		
			// { text: 'H5端', link: '/component/h5/index.html' },
			{ text: 'Gitee', link: 'https://gitee.com/duochan' },
		],
		sidebar: {
			'/guide/': [
				{
					text: '基础',
					link: '/guide/design.html',
				},
				{
					text: '安装',
					link: '/guide/installation.html',
				},
				{
					text: '快速开始',
					link: '/guide/quickstart.html',
				},
			],
			'/component/pc/': [
				{
					text: 'PC基础组件',
					collapsible: true,
					children: [
						{
							text: '引导页',
							link: '/component/pc/introStep.html',
						},
						{
							text: '电子签名',
							link: '/component/pc/sign.html',
						},
						{
							text: '区间选择',
							link: '/component/pc/number-ranger.html',
						},
					],
				},
			],
			'/component/use/': [
				{
					text: 'State',
					collapsible: true,
					children: [
						{ text: 'useAsyncState', link: '/component/use/state/useAsyncState.html' },
						{ text: 'useLocalStorage', link: '/component/use/state/useLocalStorage.html' },
						{ text: 'useSessionStorage', link: '/component/use/state/useSessionStorage.html' },
						{ text: 'useStorage', link: '/component/use/state/useStorage.html' },
						{ text: 'useStorageAsync', link: '/component/use/state/useStorageAsync.html' },
					],
				},
				{
					text: 'Router',
					collapsible: true,
					children: [
						{
							text: 'useRouteParams',
							link: '/component/use/router/useRouteParams.html',
						},
						{
							text: 'useRouteQuery',
							link: '/component/use/router/useRouteQuery.html',
						},
						{
							text: 'useRouteHash',
							link: '/component/use/router/useRouteHash.html',
						},
					],
				},
				{
					text: 'Math',
					collapsible: true,
					children: [
						{ text: 'createGenericProjection', link: '/component/use/math/createGenericProjection.html' },
						{ text: 'createProjection', link: '/component/use/math/createProjection.html' },
						{ text: 'logicAnd', link: '/component/use/math/logicAnd.html' },
						{ text: 'logicNot', link: '/component/use/math/logicNot.html' },
						{ text: 'logicOr', link: '/component/use/math/logicOr.html' },
						{ text: 'useAbs', link: '/component/use/math/useAbs.html' },
						{ text: 'useAverage', link: '/component/use/math/useAverage.html' },
						{ text: 'useFloor', link: '/component/use/math/useFloor.html' },
						{ text: 'useMath', link: '/component/use/math/useMath.html' },
						{ text: 'useMax', link: '/component/use/math/useMax.html' },
						{ text: 'useMin', link: '/component/use/math/useMin.html' },
						{ text: 'useRound', link: '/component/use/math/useRound.html' },
						{ text: 'useSum', link: '/component/use/math/useSum.html' },
					],
				},
			],
		},
	},
}
