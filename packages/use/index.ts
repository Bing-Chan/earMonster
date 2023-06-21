import { math, core } from './index.json'

const modulePaths = [
	...math.map((x: any) => {
		return x.link
	}),
	...core.map((x: any) => {
		return x.link
	}),
]

let moduleList
const init = () => {
	console.log("开始运行")
	Promise.all(modulePaths.map(modulePath => import(modulePath)))
		.then(modules => {
			modules.forEach(module => {
				moduleList.push(module)
			})
		})
		.catch(error => {
			// 处理导入模块时的错误
		})
}
init()

export { moduleList }
