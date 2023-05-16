import GAButton from './button'
import GALink from './link'
import GAIntroStep from './introStep'
import GAInpput from './input'
import GASign from './sign'
export { default as GAButton } from './button'
export { default as GALink } from './link'
export { default as GAIntroStep } from './introStep'
export { default as GAInpput } from './input'
export { default as GASign } from './sign'
const component = { GAButton, GALink, GAIntroStep, GAInpput, GASign }
export default {
	version() {
		return process.env.version
	},
	install(app) {
		debugger
		Object.values(component).forEach(item => {
			app.use(item)
		})
	},
}
