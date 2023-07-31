/*
 * @Author: dengjihua
 * @description: no des
 * @LastEditors: dengjihua
 * @LastEditTime: 2020-11-26 21:24:30
 * @Date: 2020-03-18 17:00:33
 */

import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login";
import business from "./modules/business";
import common from "./modules/common";
import commonDate from "./modules/commonDate";
import operatorAnalysis from "./modules/operatorAnalysis";
import operatorWorkAttendance from "./modules/operatorWorkAttendance";
import personStatistics from "./modules/personStatistics";
import personLossKeep from"./modules/personLossKeep";
import personKanban from "./modules/personKanban";
import personException from "./modules/personException";
import personExceptionNew from "./modules/personExceptionNew";


Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    login,
    business,
    common,
    commonDate,
    operatorAnalysis,
    operatorWorkAttendance,
    personStatistics,
    personLossKeep,
    personKanban,
    personException,
    personExceptionNew
  }
});
