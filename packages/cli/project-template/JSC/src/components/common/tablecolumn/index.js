/*
 * @Author: dengjihua
 * @description: no des
 * @LastEditors: dengjihua
 * @LastEditTime: 2020-07-14 17:30:15
 * @Date: 2020-07-10 13:41:37
 */ 
import Comp from './src/main.js'

Comp.install = function (Vue) {
    Vue.component(Comp.name, Comp)
}


export default Comp