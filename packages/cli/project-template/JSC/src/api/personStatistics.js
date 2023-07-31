import service from "@/utils/service";

//获取折线图数据
export function queryTrend(data) {
  return service({
    url: "/ps/linechart",
    method: "post",
    data: data // body参数
  });
  // return new Promise((resolve, reject) => {
  //   resolve({
  //     status: 0,
  //     message: "success",
  //     data: [
  //       {
  //         name: "在职人数",
  //         list: [
  //           { label: "07-11", value: "0" },
  //           { label: "07-12", value: "0" },
  //           { label: "07-13", value: "0" },
  //           { label: "07-14", value: "0" },
  //           { label: "07-15", value: "0" },
  //           { label: "07-16", value: "1482" },
  //           { label: "07-17", value: "1433" }
  //         ]
  //       }
  //     ]
  //   });
  // });
}

//列表
export function queryList(data) {
  return service({
    url: "/ps/details",
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
  //       tbody: [
  //         {
  //           orgLevel: 2,
  //           orgCode: "",
  //           orgName: "全国",
  //           total: 1433,
  //           retentionRate: "62.58%",
  //           momGrowth: -84,
  //           momGrowthRate: "-3.54%",
  //           yoyGrowth: -133,
  //           yoyGrowthRate: "-5.49%",
  //           activeCount: null,
  //           entryCount: null,
  //           entryRate: null,
  //           dimissionCount: null,
  //           dimissionRate: null,
  //           lessThanOneCount: null,
  //           lessThanOneRate: null,
  //           moreThanOneCount: null,
  //           moreThanOneRate: null,
  //           averageAge: null,
  //           overAge: null,
  //           daZhuan: null,
  //           daZhuanAbove: null,
  //           man: null,
  //           women: null,
  //           mainSource: null,
  //           mainSourceCount: null,
  //           moreThanOneEmpRate: null,
  //           secondSource: null,
  //           secondSourceCount: null,
  //           moreThanOneWorkRate: null,
  //           moreSourcEmpRate: null,
  //           name: null,
  //           workmonth: null,
  //           sex: null,
  //           zgxl: null,
  //           age: null,
  //           cHrZpqd: null,
  //           emplid: null
  //         },
  //         {
  //           orgLevel: 2,
  //           orgCode: "1027",
  //           orgName: "山东省区",
  //           total: 132,
  //           retentionRate: "62.86%",
  //           momGrowth: 0,
  //           momGrowthRate: "0.00%",
  //           yoyGrowth: 0,
  //           yoyGrowthRate: "0.00%",
  //           activeCount: null,
  //           entryCount: null,
  //           entryRate: null,
  //           dimissionCount: null,
  //           dimissionRate: null,
  //           lessThanOneCount: null,
  //           lessThanOneRate: null,
  //           moreThanOneCount: null,
  //           moreThanOneRate: null,
  //           averageAge: null,
  //           overAge: null,
  //           daZhuan: null,
  //           daZhuanAbove: null,
  //           man: null,
  //           women: null,
  //           mainSource: null,
  //           mainSourceCount: null,
  //           moreThanOneEmpRate: null,
  //           secondSource: null,
  //           secondSourceCount: null,
  //           moreThanOneWorkRate: null,
  //           moreSourcEmpRate: null,
  //           name: null,
  //           workmonth: null,
  //           sex: null,
  //           zgxl: null,
  //           age: null,
  //           cHrZpqd: null,
  //           emplid: null
  //         },
  //         {
  //           orgLevel: 2,
  //           orgCode: "1061",
  //           orgName: "四川省区",
  //           total: 44,
  //           retentionRate: "62.86%",
  //           momGrowth: 0,
  //           momGrowthRate: "0.00%",
  //           yoyGrowth: 0,
  //           yoyGrowthRate: "0.00%",
  //           activeCount: null,
  //           entryCount: null,
  //           entryRate: null,
  //           dimissionCount: null,
  //           dimissionRate: null,
  //           lessThanOneCount: null,
  //           lessThanOneRate: null,
  //           moreThanOneCount: null,
  //           moreThanOneRate: null,
  //           averageAge: null,
  //           overAge: null,
  //           daZhuan: null,
  //           daZhuanAbove: null,
  //           man: null,
  //           women: null,
  //           mainSource: null,
  //           mainSourceCount: null,
  //           moreThanOneEmpRate: null,
  //           secondSource: null,
  //           secondSourceCount: null,
  //           moreThanOneWorkRate: null,
  //           moreSourcEmpRate: null,
  //           name: null,
  //           workmonth: null,
  //           sex: null,
  //           zgxl: null,
  //           age: null,
  //           cHrZpqd: null,
  //           emplid: null
  //         },
  //         {
  //           orgLevel: 2,
  //           orgCode: "2177",
  //           orgName: "福建省区",
  //           total: 88,
  //           retentionRate: "62.86%",
  //           momGrowth: 0,
  //           momGrowthRate: "0.00%",
  //           yoyGrowth: 0,
  //           yoyGrowthRate: "0.00%",
  //           activeCount: null,
  //           entryCount: null,
  //           entryRate: null,
  //           dimissionCount: null,
  //           dimissionRate: null,
  //           lessThanOneCount: null,
  //           lessThanOneRate: null,
  //           moreThanOneCount: null,
  //           moreThanOneRate: null,
  //           averageAge: null,
  //           overAge: null,
  //           daZhuan: null,
  //           daZhuanAbove: null,
  //           man: null,
  //           women: null,
  //           mainSource: null,
  //           mainSourceCount: null,
  //           moreThanOneEmpRate: null,
  //           secondSource: null,
  //           secondSourceCount: null,
  //           moreThanOneWorkRate: null,
  //           moreSourcEmpRate: null,
  //           name: null,
  //           workmonth: null,
  //           sex: null,
  //           zgxl: null,
  //           age: null,
  //           cHrZpqd: null,
  //           emplid: null
  //         },
  //         {
  //           orgLevel: 2,
  //           orgCode: "2179",
  //           orgName: "湖北省区",
  //           total: 88,
  //           retentionRate: "62.86%",
  //           momGrowth: 0,
  //           momGrowthRate: "0.00%",
  //           yoyGrowth: 0,
  //           yoyGrowthRate: "0.00%",
  //           activeCount: null,
  //           entryCount: null,
  //           entryRate: null,
  //           dimissionCount: null,
  //           dimissionRate: null,
  //           lessThanOneCount: null,
  //           lessThanOneRate: null,
  //           moreThanOneCount: null,
  //           moreThanOneRate: null,
  //           averageAge: null,
  //           overAge: null,
  //           daZhuan: null,
  //           daZhuanAbove: null,
  //           man: null,
  //           women: null,
  //           mainSource: null,
  //           mainSourceCount: null,
  //           moreThanOneEmpRate: null,
  //           secondSource: null,
  //           secondSourceCount: null,
  //           moreThanOneWorkRate: null,
  //           moreSourcEmpRate: null,
  //           name: null,
  //           workmonth: null,
  //           sex: null,
  //           zgxl: null,
  //           age: null,
  //           cHrZpqd: null,
  //           emplid: null
  //         },
  //         {
  //           orgLevel: 2,
  //           orgCode: "2278",
  //           orgName: "河北省区",
  //           total: 44,
  //           retentionRate: "62.86%",
  //           momGrowth: 0,
  //           momGrowthRate: "0.00%",
  //           yoyGrowth: 0,
  //           yoyGrowthRate: "0.00%",
  //           activeCount: null,
  //           entryCount: null,
  //           entryRate: null,
  //           dimissionCount: null,
  //           dimissionRate: null,
  //           lessThanOneCount: null,
  //           lessThanOneRate: null,
  //           moreThanOneCount: null,
  //           moreThanOneRate: null,
  //           averageAge: null,
  //           overAge: null,
  //           daZhuan: null,
  //           daZhuanAbove: null,
  //           man: null,
  //           women: null,
  //           mainSource: null,
  //           mainSourceCount: null,
  //           moreThanOneEmpRate: null,
  //           secondSource: null,
  //           secondSourceCount: null,
  //           moreThanOneWorkRate: null,
  //           moreSourcEmpRate: null,
  //           name: null,
  //           workmonth: null,
  //           sex: null,
  //           zgxl: null,
  //           age: null,
  //           cHrZpqd: null,
  //           emplid: null
  //         },
  //         {
  //           orgLevel: 2,
  //           orgCode: "2279",
  //           orgName: "山西省区",
  //           total: 44,
  //           retentionRate: "62.86%",
  //           momGrowth: 0,
  //           momGrowthRate: "0.00%",
  //           yoyGrowth: 0,
  //           yoyGrowthRate: "0.00%",
  //           activeCount: null,
  //           entryCount: null,
  //           entryRate: null,
  //           dimissionCount: null,
  //           dimissionRate: null,
  //           lessThanOneCount: null,
  //           lessThanOneRate: null,
  //           moreThanOneCount: null,
  //           moreThanOneRate: null,
  //           averageAge: null,
  //           overAge: null,
  //           daZhuan: null,
  //           daZhuanAbove: null,
  //           man: null,
  //           women: null,
  //           mainSource: null,
  //           mainSourceCount: null,
  //           moreThanOneEmpRate: null,
  //           secondSource: null,
  //           secondSourceCount: null,
  //           moreThanOneWorkRate: null,
  //           moreSourcEmpRate: null,
  //           name: null,
  //           workmonth: null,
  //           sex: null,
  //           zgxl: null,
  //           age: null,
  //           cHrZpqd: null,
  //           emplid: null
  //         },
  //         {
  //           orgLevel: 2,
  //           orgCode: "2280",
  //           orgName: "内蒙古省区",
  //           total: 22,
  //           retentionRate: "62.86%",
  //           momGrowth: 0,
  //           momGrowthRate: "0.00%",
  //           yoyGrowth: 0,
  //           yoyGrowthRate: "0.00%",
  //           activeCount: null,
  //           entryCount: null,
  //           entryRate: null,
  //           dimissionCount: null,
  //           dimissionRate: null,
  //           lessThanOneCount: null,
  //           lessThanOneRate: null,
  //           moreThanOneCount: null,
  //           moreThanOneRate: null,
  //           averageAge: null,
  //           overAge: null,
  //           daZhuan: null,
  //           daZhuanAbove: null,
  //           man: null,
  //           women: null,
  //           mainSource: null,
  //           mainSourceCount: null,
  //           moreThanOneEmpRate: null,
  //           secondSource: null,
  //           secondSourceCount: null,
  //           moreThanOneWorkRate: null,
  //           moreSourcEmpRate: null,
  //           name: null,
  //           workmonth: null,
  //           sex: null,
  //           zgxl: null,
  //           age: null,
  //           cHrZpqd: null,
  //           emplid: null
  //         },
  //         {
  //           orgLevel: 2,
  //           orgCode: "2281",
  //           orgName: "广东省区",
  //           total: 132,
  //           retentionRate: "62.86%",
  //           momGrowth: 0,
  //           momGrowthRate: "0.00%",
  //           yoyGrowth: 0,
  //           yoyGrowthRate: "0.00%",
  //           activeCount: null,
  //           entryCount: null,
  //           entryRate: null,
  //           dimissionCount: null,
  //           dimissionRate: null,
  //           lessThanOneCount: null,
  //           lessThanOneRate: null,
  //           moreThanOneCount: null,
  //           moreThanOneRate: null,
  //           averageAge: null,
  //           overAge: null,
  //           daZhuan: null,
  //           daZhuanAbove: null,
  //           man: null,
  //           women: null,
  //           mainSource: null,
  //           mainSourceCount: null,
  //           moreThanOneEmpRate: null,
  //           secondSource: null,
  //           secondSourceCount: null,
  //           moreThanOneWorkRate: null,
  //           moreSourcEmpRate: null,
  //           name: null,
  //           workmonth: null,
  //           sex: null,
  //           zgxl: null,
  //           age: null,
  //           cHrZpqd: null,
  //           emplid: null
  //         },
  //         {
  //           orgLevel: 2,
  //           orgCode: "2283",
  //           orgName: "海南省区",
  //           total: 44,
  //           retentionRate: "62.86%",
  //           momGrowth: 0,
  //           momGrowthRate: "0.00%",
  //           yoyGrowth: 0,
  //           yoyGrowthRate: "0.00%",
  //           activeCount: null,
  //           entryCount: null,
  //           entryRate: null,
  //           dimissionCount: null,
  //           dimissionRate: null,
  //           lessThanOneCount: null,
  //           lessThanOneRate: null,
  //           moreThanOneCount: null,
  //           moreThanOneRate: null,
  //           averageAge: null,
  //           overAge: null,
  //           daZhuan: null,
  //           daZhuanAbove: null,
  //           man: null,
  //           women: null,
  //           mainSource: null,
  //           mainSourceCount: null,
  //           moreThanOneEmpRate: null,
  //           secondSource: null,
  //           secondSourceCount: null,
  //           moreThanOneWorkRate: null,
  //           moreSourcEmpRate: null,
  //           name: null,
  //           workmonth: null,
  //           sex: null,
  //           zgxl: null,
  //           age: null,
  //           cHrZpqd: null,
  //           emplid: null
  //         },
  //         {
  //           orgLevel: 2,
  //           orgCode: "2286",
  //           orgName: "江西省区",
  //           total: 66,
  //           retentionRate: "62.86%",
  //           momGrowth: 0,
  //           momGrowthRate: "0.00%",
  //           yoyGrowth: 0,
  //           yoyGrowthRate: "0.00%",
  //           activeCount: null,
  //           entryCount: null,
  //           entryRate: null,
  //           dimissionCount: null,
  //           dimissionRate: null,
  //           lessThanOneCount: null,
  //           lessThanOneRate: null,
  //           moreThanOneCount: null,
  //           moreThanOneRate: null,
  //           averageAge: null,
  //           overAge: null,
  //           daZhuan: null,
  //           daZhuanAbove: null,
  //           man: null,
  //           women: null,
  //           mainSource: null,
  //           mainSourceCount: null,
  //           moreThanOneEmpRate: null,
  //           secondSource: null,
  //           secondSourceCount: null,
  //           moreThanOneWorkRate: null,
  //           moreSourcEmpRate: null,
  //           name: null,
  //           workmonth: null,
  //           sex: null,
  //           zgxl: null,
  //           age: null,
  //           cHrZpqd: null,
  //           emplid: null
  //         },
  //         {
  //           orgLevel: 2,
  //           orgCode: "2287",
  //           orgName: "安徽省区",
  //           total: 66,
  //           retentionRate: "62.86%",
  //           momGrowth: 0,
  //           momGrowthRate: "0.00%",
  //           yoyGrowth: 0,
  //           yoyGrowthRate: "0.00%",
  //           activeCount: null,
  //           entryCount: null,
  //           entryRate: null,
  //           dimissionCount: null,
  //           dimissionRate: null,
  //           lessThanOneCount: null,
  //           lessThanOneRate: null,
  //           moreThanOneCount: null,
  //           moreThanOneRate: null,
  //           averageAge: null,
  //           overAge: null,
  //           daZhuan: null,
  //           daZhuanAbove: null,
  //           man: null,
  //           women: null,
  //           mainSource: null,
  //           mainSourceCount: null,
  //           moreThanOneEmpRate: null,
  //           secondSource: null,
  //           secondSourceCount: null,
  //           moreThanOneWorkRate: null,
  //           moreSourcEmpRate: null,
  //           name: null,
  //           workmonth: null,
  //           sex: null,
  //           zgxl: null,
  //           age: null,
  //           cHrZpqd: null,
  //           emplid: null
  //         },
  //         {
  //           orgLevel: 2,
  //           orgCode: "2288",
  //           orgName: "浙江省区",
  //           total: 176,
  //           retentionRate: "62.86%",
  //           momGrowth: 0,
  //           momGrowthRate: "0.00%",
  //           yoyGrowth: 0,
  //           yoyGrowthRate: "0.00%",
  //           activeCount: null,
  //           entryCount: null,
  //           entryRate: null,
  //           dimissionCount: null,
  //           dimissionRate: null,
  //           lessThanOneCount: null,
  //           lessThanOneRate: null,
  //           moreThanOneCount: null,
  //           moreThanOneRate: null,
  //           averageAge: null,
  //           overAge: null,
  //           daZhuan: null,
  //           daZhuanAbove: null,
  //           man: null,
  //           women: null,
  //           mainSource: null,
  //           mainSourceCount: null,
  //           moreThanOneEmpRate: null,
  //           secondSource: null,
  //           secondSourceCount: null,
  //           moreThanOneWorkRate: null,
  //           moreSourcEmpRate: null,
  //           name: null,
  //           workmonth: null,
  //           sex: null,
  //           zgxl: null,
  //           age: null,
  //           cHrZpqd: null,
  //           emplid: null
  //         },
  //         {
  //           orgLevel: 2,
  //           orgCode: "2290",
  //           orgName: "辽宁省区",
  //           total: 66,
  //           retentionRate: "62.86%",
  //           momGrowth: 0,
  //           momGrowthRate: "0.00%",
  //           yoyGrowth: 0,
  //           yoyGrowthRate: "0.00%",
  //           activeCount: null,
  //           entryCount: null,
  //           entryRate: null,
  //           dimissionCount: null,
  //           dimissionRate: null,
  //           lessThanOneCount: null,
  //           lessThanOneRate: null,
  //           moreThanOneCount: null,
  //           moreThanOneRate: null,
  //           averageAge: null,
  //           overAge: null,
  //           daZhuan: null,
  //           daZhuanAbove: null,
  //           man: null,
  //           women: null,
  //           mainSource: null,
  //           mainSourceCount: null,
  //           moreThanOneEmpRate: null,
  //           secondSource: null,
  //           secondSourceCount: null,
  //           moreThanOneWorkRate: null,
  //           moreSourcEmpRate: null,
  //           name: null,
  //           workmonth: null,
  //           sex: null,
  //           zgxl: null,
  //           age: null,
  //           cHrZpqd: null,
  //           emplid: null
  //         },
  //         {
  //           orgLevel: 2,
  //           orgCode: "2291",
  //           orgName: "吉林省区",
  //           total: 22,
  //           retentionRate: "62.86%",
  //           momGrowth: 0,
  //           momGrowthRate: "0.00%",
  //           yoyGrowth: 0,
  //           yoyGrowthRate: "0.00%",
  //           activeCount: null,
  //           entryCount: null,
  //           entryRate: null,
  //           dimissionCount: null,
  //           dimissionRate: null,
  //           lessThanOneCount: null,
  //           lessThanOneRate: null,
  //           moreThanOneCount: null,
  //           moreThanOneRate: null,
  //           averageAge: null,
  //           overAge: null,
  //           daZhuan: null,
  //           daZhuanAbove: null,
  //           man: null,
  //           women: null,
  //           mainSource: null,
  //           mainSourceCount: null,
  //           moreThanOneEmpRate: null,
  //           secondSource: null,
  //           secondSourceCount: null,
  //           moreThanOneWorkRate: null,
  //           moreSourcEmpRate: null,
  //           name: null,
  //           workmonth: null,
  //           sex: null,
  //           zgxl: null,
  //           age: null,
  //           cHrZpqd: null,
  //           emplid: null
  //         },
  //         {
  //           orgLevel: 2,
  //           orgCode: "2292",
  //           orgName: "黑龙江省区",
  //           total: 22,
  //           retentionRate: "62.86%",
  //           momGrowth: 0,
  //           momGrowthRate: "0.00%",
  //           yoyGrowth: 0,
  //           yoyGrowthRate: "0.00%",
  //           activeCount: null,
  //           entryCount: null,
  //           entryRate: null,
  //           dimissionCount: null,
  //           dimissionRate: null,
  //           lessThanOneCount: null,
  //           lessThanOneRate: null,
  //           moreThanOneCount: null,
  //           moreThanOneRate: null,
  //           averageAge: null,
  //           overAge: null,
  //           daZhuan: null,
  //           daZhuanAbove: null,
  //           man: null,
  //           women: null,
  //           mainSource: null,
  //           mainSourceCount: null,
  //           moreThanOneEmpRate: null,
  //           secondSource: null,
  //           secondSourceCount: null,
  //           moreThanOneWorkRate: null,
  //           moreSourcEmpRate: null,
  //           name: null,
  //           workmonth: null,
  //           sex: null,
  //           zgxl: null,
  //           age: null,
  //           cHrZpqd: null,
  //           emplid: null
  //         },
  //         {
  //           orgLevel: 2,
  //           orgCode: "2293",
  //           orgName: "河南省区",
  //           total: 66,
  //           retentionRate: "62.86%",
  //           momGrowth: 0,
  //           momGrowthRate: "0.00%",
  //           yoyGrowth: 0,
  //           yoyGrowthRate: "0.00%",
  //           activeCount: null,
  //           entryCount: null,
  //           entryRate: null,
  //           dimissionCount: null,
  //           dimissionRate: null,
  //           lessThanOneCount: null,
  //           lessThanOneRate: null,
  //           moreThanOneCount: null,
  //           moreThanOneRate: null,
  //           averageAge: null,
  //           overAge: null,
  //           daZhuan: null,
  //           daZhuanAbove: null,
  //           man: null,
  //           women: null,
  //           mainSource: null,
  //           mainSourceCount: null,
  //           moreThanOneEmpRate: null,
  //           secondSource: null,
  //           secondSourceCount: null,
  //           moreThanOneWorkRate: null,
  //           moreSourcEmpRate: null,
  //           name: null,
  //           workmonth: null,
  //           sex: null,
  //           zgxl: null,
  //           age: null,
  //           cHrZpqd: null,
  //           emplid: null
  //         },
  //         {
  //           orgLevel: 2,
  //           orgCode: "2294",
  //           orgName: "湖南省区",
  //           total: 44,
  //           retentionRate: "62.86%",
  //           momGrowth: 0,
  //           momGrowthRate: "0.00%",
  //           yoyGrowth: 0,
  //           yoyGrowthRate: "0.00%",
  //           activeCount: null,
  //           entryCount: null,
  //           entryRate: null,
  //           dimissionCount: null,
  //           dimissionRate: null,
  //           lessThanOneCount: null,
  //           lessThanOneRate: null,
  //           moreThanOneCount: null,
  //           moreThanOneRate: null,
  //           averageAge: null,
  //           overAge: null,
  //           daZhuan: null,
  //           daZhuanAbove: null,
  //           man: null,
  //           women: null,
  //           mainSource: null,
  //           mainSourceCount: null,
  //           moreThanOneEmpRate: null,
  //           secondSource: null,
  //           secondSourceCount: null,
  //           moreThanOneWorkRate: null,
  //           moreSourcEmpRate: null,
  //           name: null,
  //           workmonth: null,
  //           sex: null,
  //           zgxl: null,
  //           age: null,
  //           cHrZpqd: null,
  //           emplid: null
  //         },
  //         {
  //           orgLevel: 2,
  //           orgCode: "2297",
  //           orgName: "贵州省区",
  //           total: 22,
  //           retentionRate: "62.86%",
  //           momGrowth: 0,
  //           momGrowthRate: "0.00%",
  //           yoyGrowth: 0,
  //           yoyGrowthRate: "0.00%",
  //           activeCount: null,
  //           entryCount: null,
  //           entryRate: null,
  //           dimissionCount: null,
  //           dimissionRate: null,
  //           lessThanOneCount: null,
  //           lessThanOneRate: null,
  //           moreThanOneCount: null,
  //           moreThanOneRate: null,
  //           averageAge: null,
  //           overAge: null,
  //           daZhuan: null,
  //           daZhuanAbove: null,
  //           man: null,
  //           women: null,
  //           mainSource: null,
  //           mainSourceCount: null,
  //           moreThanOneEmpRate: null,
  //           secondSource: null,
  //           secondSourceCount: null,
  //           moreThanOneWorkRate: null,
  //           moreSourcEmpRate: null,
  //           name: null,
  //           workmonth: null,
  //           sex: null,
  //           zgxl: null,
  //           age: null,
  //           cHrZpqd: null,
  //           emplid: null
  //         },
  //         {
  //           orgLevel: 2,
  //           orgCode: "2470",
  //           orgName: "广西省区",
  //           total: 44,
  //           retentionRate: "62.86%",
  //           momGrowth: 0,
  //           momGrowthRate: "0.00%",
  //           yoyGrowth: 0,
  //           yoyGrowthRate: "0.00%",
  //           activeCount: null,
  //           entryCount: null,
  //           entryRate: null,
  //           dimissionCount: null,
  //           dimissionRate: null,
  //           lessThanOneCount: null,
  //           lessThanOneRate: null,
  //           moreThanOneCount: null,
  //           moreThanOneRate: null,
  //           averageAge: null,
  //           overAge: null,
  //           daZhuan: null,
  //           daZhuanAbove: null,
  //           man: null,
  //           women: null,
  //           mainSource: null,
  //           mainSourceCount: null,
  //           moreThanOneEmpRate: null,
  //           secondSource: null,
  //           secondSourceCount: null,
  //           moreThanOneWorkRate: null,
  //           moreSourcEmpRate: null,
  //           name: null,
  //           workmonth: null,
  //           sex: null,
  //           zgxl: null,
  //           age: null,
  //           cHrZpqd: null,
  //           emplid: null
  //         }
  //       ]
  //     }
  //   });
  // });
}

//饼形图
export function querySource(data) {
  return service({
    url: "/ps/piechart",
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
  return new Promise((resolve, reject) => {
    let result;
    if (data.type == "1") {
      result = getTabData(data);
      //第一个
    } else if (data.type == "2") {
      result = getBtData(data);
    }
    resolve({
      status: 0,
      message: "success",
      data: result
    });
  });
}

function getTabData(data) {
  let params = {},
    chartTabList;
  params.head = data.headerTypeType;
  params.dimension = data.functionType;

  //入职情况下，全部操作类职能类，饼形图上部tab 切换规则
  if (params.head == "1" && params.dimension == "1") {
    chartTabList = [
      {
        value: "all",
        label: "全部"
      },
      {
        value: "work",
        label: "工龄"
      },
      {
        value: "age",
        label: "年龄"
      },
      {
        value: "degree",
        label: "学历"
      },
      {
        value: "sex",
        label: "性别"
      },
      {
        value: "zj",
        label: "职级"
      }
    ];
  }
  if (params.head == "1" && params.dimension == "2") {
    chartTabList = [
      {
        value: "all",
        label: "全部"
      },
      {
        value: "gwlx",
        label: "岗位类型"
      },
      {
        value: "work",
        label: "工龄"
      },
      {
        value: "age",
        label: "年龄"
      },
      {
        value: "degree",
        label: "学历"
      },
      {
        value: "sex",
        label: "性别"
      }
    ];
  }
  if (params.head == "1" && params.dimension == "3") {
    chartTabList = [
      {
        value: "all",
        label: "全部"
      },
      {
        value: "work",
        label: "工龄"
      },
      {
        value: "age",
        label: "年龄"
      },
      {
        value: "degree",
        label: "学历"
      },
      {
        value: "sex",
        label: "性别"
      },
      {
        value: "zj",
        label: "职级"
      }
    ];
  }
  //在职情况下，全部操作类职能类，饼形图上部tab 切换规则
  if (params.head == "2" && params.dimension == "1") {
    chartTabList = [
      {
        value: "all",
        label: "全部"
      },
      {
        value: "recruitment",
        label: "招聘来源"
      },
      {
        value: "work",
        label: "工龄"
      },
      {
        value: "age",
        label: "年龄"
      },
      {
        value: "degree",
        label: "学历"
      },
      {
        value: "sex",
        label: "性别"
      },
      {
        value: "zj",
        label: "职级"
      }
    ];
  }
  if (params.head == "2" && params.dimension == "2") {
    chartTabList = [
      {
        value: "all",
        label: "全部"
      },
      {
        value: "recruitment",
        label: "招聘来源"
      },
      {
        value: "work",
        label: "工龄"
      },
      {
        value: "age",
        label: "年龄"
      },
      {
        value: "degree",
        label: "学历"
      },
      {
        value: "sex",
        label: "性别"
      },
      {
        value: "zj",
        label: "职级"
      }
    ];
  }
  if (params.head == "2" && params.dimension == "3") {
    chartTabList = [
      {
        value: "all",
        label: "全部"
      },
      {
        value: "recruitment",
        label: "招聘来源"
      },
      {
        value: "work",
        label: "工龄"
      },
      {
        value: "age",
        label: "年龄"
      },
      {
        value: "degree",
        label: "学历"
      },
      {
        value: "sex",
        label: "性别"
      },
      {
        value: "zj",
        label: "职级"
      }
    ];
  }
  //离职情况下，全部操作类职能类，饼形图上部tab 切换规则
  if (params.head == "3" && params.dimension == "1") {
    chartTabList = [
      {
        value: "all",
        label: "全部"
      },
      {
        value: "lzyy",
        label: "离职原因"
      },
      {
        value: "work",
        label: "工龄"
      },
      {
        value: "age",
        label: "年龄"
      },
      {
        value: "degree",
        label: "学历"
      },
      {
        value: "sex",
        label: "性别"
      },
      {
        value: "zj",
        label: "职级"
      }
    ];
  }
  if (params.head == "3" && params.dimension == "2") {
    chartTabList = [
      {
        value: "all",
        label: "全部"
      },
      {
        value: "lzyy",
        label: "离职原因"
      },
      {
        value: "work",
        label: "工龄"
      },
      {
        value: "age",
        label: "年龄"
      },
      {
        value: "degree",
        label: "学历"
      },
      {
        value: "sex",
        label: "性别"
      },
      {
        value: "zj",
        label: "职级"
      }
    ];
  }
  if (params.head == "3" && params.dimension == "3") {
    chartTabList = [
      {
        value: "all",
        label: "全部"
      },
      {
        value: "lzyy",
        label: "离职原因"
      },
      {
        value: "work",
        label: "工龄"
      },
      {
        value: "age",
        label: "年龄"
      },
      {
        value: "degree",
        label: "学历"
      },
      {
        value: "sex",
        label: "性别"
      },
      {
        value: "zj",
        label: "职级"
      }
    ];
  }
  return { list: chartTabList, selected: chartTabList[0].value };
}

function getBtData(data) {
  let params = {},
    chartTabList = [];
  params.tabval = data.tabMenu1Type;
  //饼形图上部tab 为全部，下部tab切换规则
  if (params.tabval == "all") {
    chartTabList = [
      {
        value: "e0",
        label: "全部"
      },
      {
        value: "e1",
        label: "合同工"
      },
      {
        value: "e2",
        label: "明亮类"
      },
      {
        value: "e3",
        label: "劳务工"
      },
      {
        value: "e4",
        label: "其他"
      }
    ];
  }
  //饼形图上部tab 为职级，下部tab切换规则
  if (params.tabval == "zj") {
    chartTabList = [
      {
        value: "M",
        label: "M岗"
      },
      {
        value: "T",
        label: "T岗"
      },
      {
        value: "P",
        label: "P岗"
      },
      {
        value: "O",
        label: "O岗"
      }
    ];
  }
  //饼形图上部tab 为离职原因，下部tab切换规则
  if (params.tabval == "lzyy") {
    chartTabList = [
      {
        value: "l1",
        label: "健康欠佳及家庭生活因素"
      },
      {
        value: "l2",
        label: "工作氛围不佳，福利活动少"
      },
      {
        value: "l3",
        label: "工作强度大，工作时间长"
      },
      {
        value: "l4",
        label: "中心现场管理问题"
      },
      {
        value: "l5",
        label: "职业发展受限"
      },
      {
        value: "l6",
        label: "缺乏绩效激励，涨薪难"
      },
      {
        value: "l7",
        label: "食宿交通工作环境不佳"
      }
    ];
  }
  return {
    list: chartTabList,
    selected: chartTabList.length == 0 ? "" : chartTabList[0].value
  };
}
