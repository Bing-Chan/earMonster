import { App } from 'vue'
import sign from './sign.vue'

sign.install = (app: App): void => {
	app.component('EarSign', sign)
}

export default sign
