// import EarButton from './button'
// import EarLink from './link'
import EarIntroStep from './introStep'
// import EarInpput from './input'
import EarSign from './sign'
import EarNumberRanger from './number-ranger'
import EarUpload from './upload'
import EarStepper from './stepper'
// export { default as EarButton } from './button'
// export { default as EarLink } from './link'
export { default as EarIntroStep } from './introStep'
// export { default as EarInpput } from './input'
export { default as EarSign } from './sign'
export { default as EarNumberRanger } from './number-ranger'
export { default as EarUpload } from './upload'

export { default as EarStepper } from './stepper'

const component = { EarIntroStep, EarSign, EarNumberRanger, EarUpload, EarStepper }
export default {
	version() {
		return process.env.version
	},
	install(app) {
		Object.values(component).forEach(item => {
			app.use(item)
		})
	},
}
