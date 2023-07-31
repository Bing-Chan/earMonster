import Vue from 'vue'
import MessageBoxComponent from './index.vue'

const MessageBoxConstructor = Vue.extend(MessageBoxComponent)

let confirmInstance

export const Confirm = (options = '') => {
    if (!confirmInstance) {
        confirmInstance = new MessageBoxConstructor({
            el: document.createElement('div'),
        })
        document.body.appendChild(confirmInstance.$el)
    }
    if (typeof options === 'string') {
        options = {
            message: options,
        }
    }

    Object.assign(confirmInstance.$data, options)
    confirmInstance.type = 'confirm'

    return new Promise((resolve, reject) => {
        confirmInstance.visible = true

        const confirm = confirmInstance.confirm
        const cancel = confirmInstance.cancel

        confirmInstance.confirm = () => {
            confirm()
            resolve(confirmInstance)
        }
        confirmInstance.cancel = () => {
            cancel()
            reject(confirmInstance)
        }
    })
}

let alertInstance

export const Alert = (options = '') => {
    if (!alertInstance) {
        alertInstance = new MessageBoxConstructor({
            el: document.createElement('div'),
        })
        document.body.appendChild(alertInstance.$el)
    }
    if (typeof options === 'string') {
        options = {
            message: options,
        }
    }

    Object.assign(alertInstance.$data, options)
    alertInstance.type = 'alert'

    return new Promise((resolve, reject) => {
        alertInstance.visible = true
        const success = alertInstance.success

        alertInstance.success = () => {
            success()
            resolve(alertInstance)
        }
    })
}
