import { request, requestNew } from "@/utils/request";
import service from "@/utils/service";

const Curl = "api-expj/expj/";
const Surl = "api-cntj/";
const Durl = "api-base/base/";
const CscUrl = "api-csc/csc/";
const Turl = "api-cntj/cntj/";
const BrcUrl = "api-brc/brc/";
const Customer = "api-customer/customer/";

// 公共接口 start
// 根据token活动用户信息
export function queryEmpByUser(data) {
  console.log("进入页面");
  return service({
    url: "/cockpit/cockpitUser",
    data
  });
}

// 操作工考勤
export function queryCzgKqPermissionByUser(data) {
  console.log("进入页面");
  return service({
    url: "/cockpit/cockpitAccess",
    data
  });
}

//获取个人基本信息
export function queryEmpInfo(data) {
  return service({
    url: "/op/info",
    method: "post",
    data: data // body参数
  });
}

//驾驶舱流失率留存率 数据权限接口
export function queryDatePermission(data) {
  return service({
    url: "/cockpit/cockpitAccess",
    data
  });
}

//获取折线图数据
export function queryEmpInfoNew(data) {
  return service({
    url: "/kanban/getinfobyaesempid?empId=" + encodeURIComponent(data.emplid),
    method: "post",
    data: {} //data // body参数
  });
}

// 根据kpiCode获取指标说明
export function queryIndexInfoByCondition(data) {
  return request({
    url: Durl + "index/queryIndexInfoByCondition",
    data
  });
}
// 更改组织机构
export function queryUpdateOrgCode(data) {
  return request({
    url: Durl + "apiForNative/whitelistEmployee/updateOrgCode",
    data
  });
}
// 组织机构查询
export function querySelectOrgByCondition(data) {
  return requestNew({
    url: Durl + "orgSelect/queryByCondition",
    data
  });
}

// 根据code获取名称
export function queryGetMenuNameByCode(data) {
  return request({
    url: Durl + "apiForNative/menuInfo/getMenuNameByCode",
    data
  });
}
// 根据menuCode获取菜单列表
export function queryMenuTreeByCondition(data) {
  return request({
    url: Durl + "menu/queryMenuTreeByCondition",
    data
  });
}
// 公共接口 end

// A网业务Tabs数据
export function getBusinessByCondition(data) {
  return requestNew({
    url: Curl + "bsnController/getBusinessByCondition",
    data
  });
}
// A网业务揽收表格数据
export function queryTakingByCondition(data) {
  return requestNew({
    url: Curl + "takingController/queryTakingByCondition",
    data
  });
}
// A网业务揽收图表数据
export function queryTakingEchartByCondition(data) {
  return requestNew({
    url: Curl + "takingController/queryTakingEchartByCondition",
    data
  });
}
// A网业务派件表格数据
export function queryDeliveryByCondition(data) {
  return requestNew({
    url: Curl + "deliveryController/queryDeliveryByCondition",
    data
  });
}
// A网业务派件图表数据
export function queryDeliveryEchartByCondition(data) {
  return requestNew({
    url: Curl + "deliveryController/queryDeliveryEchartByCondition",
    data
  });
}
// A网业务签收表格数据
export function querySignatureByCondition(data) {
  return requestNew({
    url: Curl + "signController/querySignatureByCondition",
    data
  });
}
// A网业务签收图表数据
export function querySignEchartByCondition(data) {
  return requestNew({
    url: Curl + "signController/querySignEchartByCondition",
    data
  });
}
// A网业务饼图-渠道数据
export function queryBussinessPieByChannel(data) {
  return requestNew({
    url: Curl + "takingController/queryBussinessPieByChannel",
    data
  });
}
// A网业务饼图-重量段数据
export function queryBussinessPieByWeight(data) {
  return requestNew({
    url: Curl + "takingController/queryBussinessPieByWeight",
    data
  });
}
// A网业务分公司表格数据-揽收
export function queryTakingBranchBussNum(data) {
  return requestNew({
    url: Curl + "takingController/queryTakingBranchBussNum",
    data
  });
}
// A网业务分公司表格数据-派件
export function queryDeliveryBranchBussNum(data) {
  return requestNew({
    url: Curl + "deliveryController/queryDeliveryBranchBussNum",
    data
  });
}
// A网业务分公司表格数据-签收
export function querySignBranchBussNum(data) {
  return requestNew({
    url: Curl + "signController/querySignBranchBussNum",
    data
  });
}
// A网业务-签收-库渠道分析饼图
export function querySignControllertByEchartPie(data) {
  return requestNew({
    url: Curl + "signController/queryPie",
    data
  });
}

// A网业务分公司KPI数据
export function queryNetKpiDrillTab(data) {
  return requestNew({
    url: Curl + "branchKpiController/queryNetKpiDrillTab",
    data
  });
}
// A网业务分公司KPI数据
export function queryNetKpiDrillForm(data) {
  return requestNew({
    url: Curl + "branchKpiController/queryNetKpiDrillForm",
    data
  });
}
// A网业务分公司KPI数据
export function queryBranchKpiPage(data) {
  return requestNew({
    url: Curl + "branchKpiController/queryBranchKpiPage",
    data
  });
}
// A网业务分公司网点指数折线图数据
export function queryBranchKpiByEchartLine(data) {
  return requestNew({
    url: Curl + "branchKpiController/queryNetKpiDrillLine",
    data
  });
}
// 分公司服务质量列表数据
export function queryServiceQualityList(data) {
  return request({
    url: BrcUrl + "service/queryServiceQualityList",
    data
  });
}
// 分公司服务质量折线图
export function queryServiceQualityChart(data) {
  return request({
    url: BrcUrl + "service/queryServiceQualityChart",
    data
  });
}
// 分公司服务质量其他列表数据
export function queryServiceQualityOtherList(data) {
  return request({
    url: BrcUrl + "wrong/queryServiceQualityOtherList",
    data
  });
}
// 分公司服务质量网点KPI
export function queryServiceQualityTable(data) {
  return request({
    url: BrcUrl + "service/queryServiceQualityTable",
    data
  });
}
// 分公司业务量模块 产品结构分析扇形图
export function queryBussinessPie(data) {
  return request({
    url: BrcUrl + "branchJscController/queryBussinessPie",
    data
  });
}
// 异常网点折线图
export function getNormalItemLineChart(data) {
  return request({
    url: CscUrl + "exceptOrg/queryLikeLineExcept",
    data
  });
}
// 异常网点饼图
export function getNormalItemBarChart(data) {
  return request({
    url: CscUrl + "exceptOrg/queryLikeColumnsExcept",
    data
  });
}
// 异常网点列表
export function getNormalItemListData(data) {
  return request({
    url: CscUrl + "exceptOrg/queryLikeExceptList",
    data
  });
}
// 异常网点黑榜曲线图
export function getNormalAllmLineChart(data) {
  return request({
    url: CscUrl + "exceptOrg/queryLineExcept",
    data
  });
}
// 异常网点黑榜饼图图
export function getNormalAllBarChart(data) {
  return request({
    url: CscUrl + "exceptOrg/queryColumnsExcept",
    data
  });
}
export function getNormalAllListData(data) {
  return request({
    url: CscUrl + "exceptOrg/queryExceptList",
    data
  });
}

// 获取默认时间
export function getDataTime(data) {
  return new Promise((resolve, reject) => {
    resolve({
      status: 0,
      message: "success",
      data: {
        date: "2022-07-11"
      }
    });
  });
}

export function newSelectPersonBIList(data) {
  sessionStorage.setItem('source','APP-HRBI-SERVER')
  return service({
    url: "/personnel/list",
    method: "post",
    data: data // body参数
  });
}

// 加载枚举列表
export function getCategoryList(data) {
  sessionStorage.setItem('source','APP-HRBI-SERVER')
  return service({
    url: "/personnel/category/list",
    method: "post",
    data: data // body参数
  });
}

// 查询搜索历史记录
export function getRecordHistory(params) {
  sessionStorage.setItem('source','APP-HRBI-SERVER')
  return service({
    url: "/personnel/record/query/history",
    method: "get",
    params: params // body参数
  });
}

// 清空搜索历史记录
export function removeRecordHistory(params) {
  sessionStorage.setItem('source','APP-HRBI-SERVER')
  return service({
    url: "/personnel/record/remove/history",
    method: "get",
    params: params // body参数
  });
}
