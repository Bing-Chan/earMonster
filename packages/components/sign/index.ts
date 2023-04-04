import { App } from 'vue'
import sign from './sign.vue'

sign.install = (app: App): void => {
	app.component('GaSign', sign)
}

export default sign
