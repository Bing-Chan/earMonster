import service from "@/utils/service";
import { uuid } from "vue-uuid";

//获取折线图数据
export function queryTrend(data) {
  return service({
    url: "/kanban/linechart",
    method: "post",
    data: data // body参数
  });
  //   return new Promise((resolve, reject) => {
  //   resolve({
  //     status: 0,
  //     message: "success",
  //     data: [
  //       {
  //         name: "在职人数",
  //         list: [
  //           { label: "07-11", value: "2" },
  //           { label: "07-12", value: "3" },
  //           { label: "07-13", value: "2" },
  //           { label: "07-14", value: "12" },
  //           { label: "07-15", value: "10" },
  //           { label: "07-16", value: "1000" },
  //           { label: "07-17", value: "2" }
  //         ]
  //       },
  //       {
  //         name: "人数11",
  //         list: [
  //           { label: "07-11", value: "4" },
  //           { label: "07-12", value: "5" },
  //           { label: "07-13", value: "4" },
  //           { label: "07-14", value: "5" },
  //           { label: "07-15", value: "4" },
  //           { label: "07-16", value: "5" },
  //           { label: "07-17", value: "2" }
  //         ]
  //       }
  //     ]
  //   });
  //  })
}

//列表
export function queryList(data) {
  return service({
    url: "/kanban/departDetail",
    method: "post",
    data: data // body参数
  });
  // return new Promise((resolve, reject) => {
  //   resolve({
  //     status: 0,
  //     message: "success",
  //     data: {
  //       page: { total: 25, totalPage: 2, pageSize: 20, pageNum: 1 },
  //       thead: [
  //         {
  //           prop: "orgName",
  //           label: "中心",
  //           sortable: false,
  //           click: true,
  //           defaultSort: false,
  //           sortNo: 1,
  //           show: true
  //         },
  //         {
  //           prop: "total",
  //           label: "总在职人数",
  //           sortable: true,
  //           click: false,
  //           defaultSort: false,
  //           sortNo: 2,
  //           show: true
  //         },
  //         {
  //           prop: "retentionRate",
  //           label: "同比",
  //           sortable: true,
  //           click: false,
  //           defaultSort: true,
  //           sortNo: 3,
  //           show: true
  //         }
  //       ],
  //       tbody: getList(data.type)
  //     }
  //   });
  // });
}



//饼形图
export function querySource(data) {
  return service({
    url: "/kanban/piechart",
    method: "post",
    data: data // body参数
  });
  // return new Promise((resolve, reject) => {
  //   resolve({
  //     status: 0,
  //     message: "success",
  //     data: [
  //       { name: "0711", value: 10 },
  //       { name: "0712", value: 80 },
  //       { name: "0713", value: 60 }
  //     ]
  //   });
  // });
}

//切换按钮查询
export function queryBtn(data) {
  return service({
    url: "/kanban/jobLineList",
    method: "get",
    data: data // body参数
  });
}

//获取最新日期
export function querySysDate(data) {
  // return new Promise((resolve, reject) => {
  //   resolve({
  //     status: 0,
  //     message: "success",
  //     data: "2022-11-13"
  //   });
  // });
  return service({
    url: "/kanban/getQueryDate",
    method: "get",
    data: data // body参数
  });
}
