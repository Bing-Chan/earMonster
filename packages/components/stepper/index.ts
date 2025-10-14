import { App } from 'vue'
import stepper from './stepper.vue'

stepper.install = (app: App): void => {
	app.component(stepper.name, stepper)
}

export default stepper
