import GAButton from './components/button'
import GALink from './components/link'
import GAIntroStep from './components/introStep'
import GAInpput from './components/input'
import { App } from 'vue'

export { default as GAButton } from './components/button'
export { default as GALink } from './components/link'
export { default as GAIntroStep } from './components/introStep'
export { default as GAInpput } from './components/input'

const component = { GAButton, GALink, GAIntroStep, GAInpput }
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
