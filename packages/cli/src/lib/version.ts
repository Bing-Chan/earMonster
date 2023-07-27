import * as path from 'path'
import fs from 'fs-extra'

// 获取当前包的信息
const getPkgInfo = () => {
	const jsonPath = path.join(__dirname, '../package.json')
	const jsonContent = fs.readFileSync(jsonPath, 'utf-8')
	const jsonResult = JSON.parse(jsonContent)
	return {
		pkgVersion: jsonResult.version,
		pkgName: jsonResult.name,
	}
}

export const cliVersion = getPkgInfo().pkgVersion
