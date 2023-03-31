import { App } from 'vue'
import introStep from './introStep.vue'

introStep.install = (app: App): void => {
	app.component(introStep.name, introStep)
}

export default introStep
