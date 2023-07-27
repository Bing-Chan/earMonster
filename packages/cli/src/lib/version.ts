import * as path from 'path'
import * as fs from 'fs-extra'	// const jsonPath = path.join(__dirname, '../package.json')
	// const jsonContent = fs.readFileSync(jsonPath, 'utf-8')
	// const jsonResult = JSON.parse(jsonContent)

// 获取当前包的信息
const getPkgInfo = () => {

	return {
		pkgVersion: "8.0.0"
	}
}

export const cliVersion = getPkgInfo().pkgVersion
