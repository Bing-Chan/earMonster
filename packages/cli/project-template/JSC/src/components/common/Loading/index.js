import Vue from 'vue'
import LoadingVue from './index.vue'
const LoadingConstructor = Vue.extend(LoadingVue)

const instance = new LoadingConstructor({
    el: document.createElement('div'),
})
document.body.appendChild(instance.$el)

const Loading = {}

Loading.open = function() {
    instance.visible = true
}

Loading.close = function() {
    instance.visible = false
}

export default Loading
