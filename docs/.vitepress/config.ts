import { mdPlugin } from './config/plugins'
const path = require('path')

module.exports = {
	lang: 'zh-CN',
	title: 'galaxy-ui',
	description: 'galaxy-ui',
	base: '/request_cb/',
	head: [
		[
			'link',
			{
				rel: 'icon',
				href: '/favicon.ico',
			},
		],
	],
	plugins: [],
	markdown: {
		config: md => mdPlugin(md),
	},
	themeConfig: {
		// repo: 'fish-uncle/design-plus', 自动生成github链接
		logo: '/logo.png',
		nav: [
			{ text: '主页', link: '/' },
			{ text: 'PC端', link: '/component/pc/index.html' },
			{ text: 'H5端', link: '/component/h5/index.html' },
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
			'/component/h5/': [
				{
					text: 'H5基础组件',
					collapsible: true,
					children: [
						{
							text: 'Button 按钮',
							link:  '/component/button.html',
						},
					],
				},
			],
			'/component/pc/': [
				{
					text: 'PC基础组件',
					collapsible: true,
					children: [
						{
							text: 'Button 按钮',
							link:  '/component/pc/button.html',
						}
					],
				},
			],
		},
	},
}
