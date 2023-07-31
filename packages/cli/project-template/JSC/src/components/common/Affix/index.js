/*
 * @Author: dengjihua
 * @description: no des
 * @LastEditors: dengjihua
 * @LastEditTime: 2020-07-10 14:15:01
 * @Date: 2020-07-10 13:41:37
 */ 
import Comp from './src/main.vue'
import './src/main.scss'

Comp.install = function (Vue) {
    Vue.component(Comp.name, Comp)
}


export default Comp