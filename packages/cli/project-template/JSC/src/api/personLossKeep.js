import service from "@/utils/service";

//获取折线图数据
export function queryTrend(data) {

  return service({
    url: "/ps/flow/linechart",
    method: "post",
    data: data // body参数
  });
 
}


export function queryList(data) {

  return service({
    url: "/ps/flow/details",
    method: "post",
    data: data // body参数
  });
}