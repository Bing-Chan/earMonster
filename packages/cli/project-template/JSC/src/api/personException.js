import service from "@/utils/service";
import { uuid } from "vue-uuid";

// 获取折线图数据
export function queryTrend(data) {
  return service({
    url: "/abnormal/linechart",
    method: "post",
    data: data // body参数
  });
}

// 列表
export function queryList(data) {
  return service({
    url: "/abnormal/departDetail",
    method: "post",
    data: data // body参数
  });
}

// 饼形图
export function querySource(data) {
  return service({
    url: "/abnormal/piechart",
    method: "post",
    data: data // body参数
  });
}
// 切换按钮查询
export function queryBtn(data) {
  return service({
    url: "/kanban/jobLineList",
    method: "get",
    data: data // body参数
  });
}
// 获取最新日期
export function querySysDate(data) {
  return service({
    url: "/kanban/getQueryDate",
    method: "get",
    data: data // body参数
  });
}
