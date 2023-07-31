import Vue from 'vue'
import ToastVue from './index.vue'
const ToastConstructor = Vue.extend(ToastVue)

let instance
function Toast(options = {}) {
    if (!instance) {
        instance = new ToastConstructor({
            el: document.createElement('div'),
        })
        document.body.appendChild(instance.$el)
    }

    if (typeof options === 'string') {
        options = {
            message: options,
        }
    }
    Object.assign(instance, options)
    instance.visible = true

    return instance
}

export default Toast
