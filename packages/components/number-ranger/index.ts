import { App } from 'vue'
import Input from './input.vue'

Input.install = (app: App): void => {
	app.component(Input.name, Input)
}

export default Input
