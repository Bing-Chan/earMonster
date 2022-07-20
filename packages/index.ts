import GAButton from './components/button'
import GALink from './components/link'
import { App } from 'vue'

export { default as GAButton } from './components/button'
export { default as GALink } from './components/link'

const component = { GAButton, GALink }
export default {
	version() {
		return process.env.version
	},
	install(app: App) {
		Object.values(component).forEach(item => {
			// @ts-ignore
			app.use(item)
		})
	},
}
