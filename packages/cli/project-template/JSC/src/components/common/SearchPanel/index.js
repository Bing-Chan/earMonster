/*
 * @Author: dengjihua
 * @description: no des
 * @LastEditors: dengjihua
 * @LastEditTime: 2021-01-21 10:47:02
 * @Date: 2021-01-21 10:47:01
 */
import Comp from './src/main.vue'
import './src/main.scss'

Comp.install = function (Vue) {
    Vue.component(Comp.name, Comp)
}


export default Comp