import * as path from 'path'
import * as inquirer from 'inquirer'
import { questions, fsextent as fs } from './lib/index'

let TemplatePath = path.resolve(__dirname, '../project-template/')
let ProjectPath = path.resolve(process.cwd(), './')

//filter file Function
const filterFunc = from => {
	if (from.indexOf('.empty') !== -1) {
		return false
	}
	return true
}
function addQuestions() {
	return fs.readdir(TemplatePath).then((data: any) => {
		let tempMap: any = { H5: true, PC: true }
		let choices = ['PC', 'H5']
		data.forEach(value => {
			if (!tempMap[value]) {
				tempMap[value] = true
				choices.push(value)
			}
		})
		tempMap = null
		questions.questionOne.push({
			name: 'templateName',
			type: 'list',
			message: 'Use template:',
			choices: choices,
			default: 'PC',
			validate(value) {
				return true
			},
		})
	})
}

const init = async opts => {
	let bAll = false
	let toPath = ProjectPath
	let fromPath = TemplatePath
	//  显示文件
	fs.showNpmInfo()
	console.log("AasAS")
	debugger
	let args
	try {
		args = await inquirer.prompt([
			{
				name: 'projectName',
				type: 'input',
				message: "Enter your Project's name:",
			},
		])
	} catch (ex) {}

	//user input project info
	//toPath = path.join(toPath, args.projectName)

	// if (opts.pc && opts.h5) {
	// 	bAll = true
	// } else if (opts.pc) {
	// 	toPath = path.join(toPath, '/PC')
	// 	fromPath = path.join(fromPath, '/PC')
	// } else if (opts.h5) {
	// 	toPath = path.join(toPath, '/H5')
	// 	fromPath = path.join(fromPath, '/H5')
	// } else {
	// 	fromPath = path.join(fromPath, args.templateName)
	// }
	// console.log('zoudaozhe')
	// //check dir
	// return fs.ensureDir(toPath)
	//clear dir
	// .then(() => {
	// 	return fs.emptyDir(toPath)
	// })
	// //copy template
	// .then(() => {
	// 	fs.showCreateDirInfo(`\n Project directory：${toPath}`)
	// 	fs.showCreateDirInfo('begin')
	// 	if (bAll) {
	// 		let aCopy = [
	// 			fs.copy(`${fromPath}/PC`, `${toPath}/PC`, filterFunc),
	// 			fs.copy(`${fromPath}/H5`, `${toPath}/H5`, filterFunc),
	// 		]
	// 		return Promise.all(aCopy)
	// 	}
	// 	return fs.copy(fromPath, toPath, filterFunc)
	// })
	// //copy end
	// .then(() => {
	// 	return fs.showCreateDirInfo('end')
	// })
	// //error
	// .catch(err => {
	// 	console.log('err:', err)
	// })
}

const runInit = opts => {
	// if (!(opts.pc || opts.h5)) {
	// 	addQuestions().then(() => {
	// 		init(opts)
	// 	})
	// 	return
	// }
	init(opts)
	return
}

export default runInit
