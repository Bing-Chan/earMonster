import { mdPlugin } from './config/plugins'
const path = require('path')

module.exports = {
	lang: 'zh-CN',
	title: 'Ear Monster',
	description: 'ear-monster',
	base: '/',
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
					text: '快速指南',
					collapsible: true,
					children: [
						{
							text: '介绍',
							link: '/component/pc/introStep.html',
						},
						{
							text: '脚手架安装',
							link: '/component/pc/introStep.html',
						},
					],
				},
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
						{
							text: '步进器',
							link: '/component/pc/stepper.html',
						},
						{
							text: '公式编辑器',
							link: '/component/pc/formale.html',
						},
						{
							text: '文档预览',
							link: '/component/pc/preview.html',
						},
						{
							text: '拖拽',
							link: '/component/pc/number-ranger.html',
						},
					],
				},
				{
					text: '扩展组件',
					collapsible: true,
					children: [
						{
							text: '图片裁剪',
							link: '/component/pc/upload.html',
						},
					],
				},
				{
					text: '业务组件',
					collapsible: true,
					children: [
						{
							text: '叫号系统',
							link: '/component/pc/introStep.html',
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
					text: 'utilities',
					collapsible: true,
					children: [
						{ text: 'useDeepCopy', link: '/component/use/utilities/useDeepCopy.html' },
					],
				},
				{
					text: 'time',
					collapsible: true,
					children: [
						{ text: 'useDateFormat', link: '/component/use/time/useDateFormat.html' },
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
					text: 'Watch',
					collapsible: true,
					children: [{ text: 'whenever', link: '/component/use/watch/whenever.html' }],
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
		editLink: {
			pattern: 'https://github.com/Bing-Chan/earMonster/tree/master/docs/:path',
			text: 'Suggest changes to this page',
		},

		footer: {
			message: 'Released under the MIT License.',
			copyright: 'Copyright © EAR MONSTER contributors',
		},
	},
}
