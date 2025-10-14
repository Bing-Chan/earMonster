import { App } from 'vue'
import Upload from './index.vue'

Upload.install = (app: App): void => {
	app.component(Upload.name, Upload)
}

export default Upload
