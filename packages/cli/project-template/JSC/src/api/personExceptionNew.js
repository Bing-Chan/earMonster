import service from "@/utils/service";
import { uuid } from "vue-uuid";

// 柱状图+折线图
export function queryTrend(data) {
  return service({
    url: "/abnormal/v2/pillar",
    method: "post",
    data: data // body参数
  });
}

// 饼图
export function querySource(data) {
  return service({
    url: "/abnormal/v2/departDetailTotal",
    method: "post",
    data: data // body参数
  });
}

// 列表
export function queryList(data) {
  return service({
    url: "/abnormal/v2/departDetail",
    method: "post",
    data: data // body参数
  });
}
