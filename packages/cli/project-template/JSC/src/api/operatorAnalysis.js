import service from "@/utils/service";

//获取折线图数据
export function queryTrend(data) {
  return service({
    url: "/op/linechart",
    method: "post",
    data: data // body参数
  });
}

export function queryList(data) {
  return service({
    url: "/op/details",
    method: "post",
    data: data // body参数
  });
}

export function queryButton(data) {
  return new Promise((resolve, reject) => {
    resolve({
      status: 0,
      message: "success",
      data: [
        { name: "在职", value: 40 },
        { name: "女", value: 50 },
        { name: "不祥", value: 80 }
      ],
      time: null
    });
  });
}

//获取来源分析饼图
export function querySource(data) {
  return service({
    url: "/op/piechart",
    method: "post",
    data: data // body参数
  });
}
