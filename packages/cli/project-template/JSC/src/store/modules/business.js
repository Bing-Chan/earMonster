const state = {
  classType: 'realTime', //车辆监控待卸车辆，班次时间选择， 实时 realTime, 早班 early, 中班 mid;
  hourBtnType:'06:00',  //车辆监控 24小时按钮
  // 三错
  tripleHeaderTabType: 'errorDevide',
  tripleLinkScopeType: 'center',
  tripleLatitudinalType: 'router',
  tripleTabType: 'sort',
  tripleCenterType: 'all',
  tripleBuildOrgType: 'all',
  cnDataTab: 'targetDetail',
  // 客服投诉
  complaintHeaderTabType: 'complaintRate',
  complaintRateTabType: 'all',
  complaintRatePieType: 'all',
  complaintEChartLineName: '',
  complaintBranchDrillType: 'byCol',
  complaintChannelType:'region',
  // 遗失
  arbLostType: 'one',
  loseThingChannelType: 'manage', // 管理 manage，考核 kpi
  dimensionType: 1, // 维度
  // 实时
  realActiveTab: '_Taking',
  // 虚假签收
  falseSignLatitudinalType: 'channel',
  falseSignTabType: 'del',
  // 异常网点
  abnormalTab: 'all',
  baseType: 'item',
  // A网业务量
  aNetActiveTab: 'takingType',
  aNetLinkScopeType: 'center',
  aNeteChartLineName: '揽件量',
  aNetPieType: 'all',
  // 正在加载
  isLoading: false,
  // 用车量
  carTabType: 'stone',
  carTab: 'all',
  carImgBoxType: 'car',
  carUniqueTabType: 'stone',
  carDirectType:'ALL',
  // 疑似遗失
  doubtHeaderTabType: 'doubtLoss',
  // 包裹路由
  packetPieTab: 'all',
  // 营运成本
  operateTabType: 'stone',
  operateBarTab: 'all',
  // 用户行为
  userLatitudinalType: '',
  // 网点驾驶舱
  // 分公司
  companyQueryType: 'date',
  companyHeaderTabType: 'business',
  companyTabType: 'taking',
  companyFormType: 'customer',
  companyLatitudinalType: 'kpi',
  positionRunRateType: '',
  wrongPieTab: '',
  // 全链路
  fullLinkMenuType: 'qll',
  ytGhjType: '1',
  cnGhjType: '0',
  fullLinkHeaderTabType: 'cnsc',
  fullLinkTableType: 'caiNiaoDuration',
  //中心质量
  cqTabType: 1,
  monthType: 'manage',
  centralProvType: 'zhibiao',
  centralCenterType: 'zhibiao',
  // 解决率
  // solutionRateTabType: 'one',
  // solutionRateBigType: 'all',
  // solutionRateSmallType: 'all',
  // solutionRateDutyType: '',
  // 解决率-新
  solveSelectType: 'total',
  solveRoleType: 'region',
  solveTabType: 'all',
  // 会话接待率
  chatSelectType: '0',
  chatRoleType: 'region',
  chatTabType: 'online',
  businessType: 'RECEIPT',
  headTableType: 'online',
  // 成本效能
  costBenefitTabType: '2',
  costBenefitSortColumn: 'perCapitaEfficiency',
  // 接待率
  receptionRateHeaderTabType: 'tel',
  onlineReceptionLatitudinalType: 'channel',
  onlineReceptionPieType: '0',
  onlineReceptionTabType: 'all',
  carRealTimeTabType: 'unload', //增加 tabType 参数 unload:待卸车， onway 在途， idle 已卸未发
  carRealUpdateTime: '', // 更新时间
  carRealTimelineType: 'main', // main=>干线 sub=>支线
  carRealTimeType: 'center',
  CentralOperatType: 'center', // 中心/网点 进出港类型
  CentralOperatUpdateTime: '', // 更新时间
  CentralclassesType: '', // 班次类型

  // 独立网点KPI
  branchKpiSelectType: '0', // 班次类型
  orderTrackingTabType: 'unTake', // 订单跟踪未揽未签tab
  orderTrackingChannelType: '1', // 订单跟踪tab类型 默认淘系
  carRealTimestoreyType: '1',
  orderLatestTime: '',
  branchKpiChannelTabsType: 0, // 0管理，1考核
  // 圆通指数
  branchKpiTabsType: '1', // 按钮类型: KPI得分：1；时效：2；服务：3
  branchKpiDimensionalityType: '1', // 列表类型 指标明细：1；省区得分：2
  branchKpiProvinceDrillType: 'index', // 省区页面 指标明细 index ，网点得分：score

  centralActvclassesType: '', // 班次类型
  centralstoreyType: '', // 中心和分公司层级
  centralfloorType: '1',

  ChartRatePieType: '', // 全部 本地 分

  //芝麻开门
  businessHeaderTabType:'yewu',
  businessCenterTabType:'lanjian',
  businessEchartTabType:'yto',
  businessCenterTabName:'揽件量',
  businessHeaderTopTabType:'origin',
  // 车辆监控
    carMonitorHeaderMenuType: 'realtime',
  carMonitorLinkType: 'TRANSFER_CENTER',
  carMonitorBatchTime: '',
  carMonitorQueryDate: '',
  carMonitorHhss: '',
  //目标完成率lineType
  completionRateLineType:'num',
  //全链路tab：与行业相比OR与通达系相比
  industryType:'2',
}
const getters = {

}
const mutations = {
  setCnDataTab (state, val) {
    state.cnDataTab = val
  },
  setClassType(state, val){
      state.classType = val;
  },
  setHourBtnType(state, val){  //车辆监控新增 已卸未发
    state.hourBtnType = val;
}, 
setActiveTabType(state, val){//车辆监控 已卸未发
  state.activeTabType = val;
}, //
  // 三错
  setTripleHeaderTabType (state, val) {
    state.tripleHeaderTabType = val
  },
  setTripleLinkScopeType (state, val) {
    state.tripleLinkScopeType = val
  },
  setTripleLatitudinalType (state, val) {
    state.tripleLatitudinalType = val
  },
  setTripleTabType (state, val) {
    state.tripleTabType = val
  },
  setTripleCenterType (state, val) {
    state.tripleCenterType = val
  },
  setTripleBuildOrgType (state, val) {
    state.tripleBuildOrgType = val
  },
  // 客服投诉
  setComplaintHeaderTabType (state, val) {
    state.complaintHeaderTabType = val
  },
  setComplaintRateTabType (state, val) {
    state.complaintRateTabType = val
  },
  setComplaintRatePieType (state, val) {
    state.complaintRatePieType = val
  },
  setComplaintEChartLineName (state, val) {
    state.complaintEChartLineName = val
  },
  setComplaintBranchDrillType (state, val) {
    state.complaintBranchDrillType = val
  },
  setComplaintChannelType (state, val) {
    state.complaintChannelType = val
  },
  // 遗失tab类型(lostType)
  setArbLostType (state, val) {
    state.arbLostType = val
  },
  setLoseThingChannelType (state, val) {
    state.loseThingChannelType = val
  },
  setDimensionType (state, val) {
    state.dimensionType = val
  },
  // 实时tab类型
  setRealActiveTab (state, val) {
    state.realActiveTab = val
  },
  // 虚假签收
  setFalseSignLatitudinalType (state, val) {
    state.falseSignLatitudinalType = val
  },
  setFalseSignTabType (state, val) {
    state.falseSignTabType = val
  },

  // 异常网点
  setAbnormalTab (state, val) {
    state.abnormalTab = val
  },
  setBaseType (state, val) {
    state.baseType = val
  },
  // A网业务量
  setANetActiveTab (state, val) {
    state.aNetActiveTab = val
  },
  setANetLinkScopeType (state, val) {
    state.aNetLinkScopeType = val
  },
  setANeteChartLineName (state, val) {
    state.aNeteChartLineName = val
  },
  setANetPieType (state, val) {
    state.aNetPieType = val
  },
  showLoading (state, isLoad) {
    state.isLoading = isLoad
  },

  // 用车量
  setCarTabType (state, val) {
    state.carTabType = val
  },
  // 用车量
  setCarTab (state, val) {
    state.carTab = val
  },
  // 用车量
  setCarImgBoxType (state, val) {
    state.carImgBoxType = val
  },
  // 用车量
  setCarUniqueTabType (state, val) {
    state.carUniqueTabType = val
  },
  setCarDirectType(state, val) {
    state.carDirectType = val;
  },
  // 疑似遗失
  setDoubtHeaderTabType (state, val) {
    state.doubtHeaderTabType = val
  },
  // 包裹路由
  setPacketPieTab (state, val) {
    state.packetPieTab = val
  },
  // 营运成本
  setOperateTabType (state, val) {
    state.operateTabType = val
  },
  // 营运成本
  setOperateBarTab (state, val) {
    state.operateBarTab = val
  },
  // 网点驾驶舱
  // 分公司
  setCompanyQueryType (state, val) {
    state.companyQueryType = val
  },
  setCompanyHeaderTabType (state, val) {
    state.companyHeaderTabType = val
  },
  setCompanyTabType (state, val) {
    state.companyTabType = val
  },
  setCompanyFormType (state, val) {
    state.companyFormType = val
  },
  setCompanyLatitudinalType (state, val) {
    state.companyLatitudinalType = val
  },
  setPositionRunRateType (state, val) {
    state.positionRunRateType = val
  },
  setWrongPieTab (state, val) {
    state.wrongPieTab = val
  },
  // 全链路
  setFullLinkMenuType (state, val) {
    state.fullLinkMenuType = val
  },
  setYtGhjType (state, val) {
    state.ytGhjType = val
  },
  setCnGhjType (state, val) {
    state.cnGhjType = val
  },
  setFullLinkHeaderTabType (state, val) {
    state.fullLinkHeaderTabType = val
  },
  setFullLinkTableType (state, val) {
    state.fullLinkTableType = val
  },
  // 中心质量
  setCqTabType (state, val) {
    state.cqTabType = val
  },
  // // 解决率一次多次
  // setSolutionRateTabType(state, val) {
  //     state.solutionRateTabType = val;
  // },
  // // 解决率大状态
  // setSolutionRateBigType(state, val) {
  //     state.solutionRateBigType = val;
  // },
  // // 解决率小状态
  // setSolutionRateSmallType(state, val) {
  //     state.solutionRateSmallType = val;
  // },
  // // 解决率有责/发出
  // setSolutionRateDutyType(state, val) {
  //     state.solutionRateDutyType = val;
  // },
  // 解决率 tabs
  setSolveTabType (state, val) {
    state.solveTabType = val
  },
  // 解决率-新 类型
  setSolveSelectType (state, val) {
    state.solveSelectType = val
  },
  // 解决率-新 角色类型
  setSolveRoleType (state, val) {
    state.solveRoleType = val
  },
  // 会话接待率 tabs
  setChatTabType (state, val) {
    state.chatTabType = val
  },
  // 会话接待率 类型
  setChatSelectType (state, val) {
    state.chatSelectType = val
  },
  // 会话接待率 角色类型
  setChatRoleType (state, val) {
    state.chatRoleType = val
  },
  // 会话接待率 折线类型
  setBusinessType (state, val) {
    state.businessType = val
  },
  // 会话接待率 最新日期标住
  setHeadTableType (state, val) {
    state.headTableType = val
  },
  // 成本效能
  setCostBenefitTabType (state, val) {
    state.costBenefitTabType = val
  },
  setCostBenefitSortColumn (state, val) {
    state.costBenefitSortColumn = val
  },
  // 用户行为
  setUserLatitudinalType (state, val) {
    state.userLatitudinalType = val
  },
  // 接待率
  setReceptionRateHeaderTabType (state, val) {
    state.receptionRateHeaderTabType = val
  },
  //
  setOnlineReceptionLatitudinalType (state, val) {
    state.onlineReceptionLatitudinalType = val
  },
  setOnlineReceptionPieType (state, val) {
    state.onlineReceptionPieType = val
  },
  setOnlineReceptionTabType (state, val) {
    state.onlineReceptionTabType = val
  },
  // 异常网点
  setAbnormalTab (state, val) {
    state.abnormalTab = val
  },
  setBaseType (state, val) {
    state.baseType = val
  },
  // A网业务量
  setANetActiveTab (state, val) {
    state.aNetActiveTab = val
  },
  setANetLinkScopeType (state, val) {
    state.aNetLinkScopeType = val
  },
  setANeteChartLineName (state, val) {
    state.aNeteChartLineName = val
  },
  showLoading (state, isLoad) {
    state.isLoading = isLoad
  },

  // 用车量
  setCarTabType (state, val) {
    state.carTabType = val
  },
  // 用车量
  setCarTab (state, val) {
    state.carTab = val
  },
  // 疑似遗失
  setDoubtHeaderTabType (state, val) {
    state.doubtHeaderTabType = val
  },
  // 包裹路由
  setPacketPieTab (state, val) {
    state.packetPieTab = val
  },
  // 营运成本
  setOperateTabType (state, val) {
    state.operateTabType = val
  },
  // 营运成本
  setOperateBarTab (state, val) {
    state.operateBarTab = val
  },
  // 网点驾驶舱
  // 分公司
  setCompanyQueryType (state, val) {
    state.companyQueryType = val
  },
  setCompanyHeaderTabType (state, val) {
    state.companyHeaderTabType = val
  },
  setCompanyTabType (state, val) {
    state.companyTabType = val
  },
  setCompanyFormType (state, val) {
    state.companyFormType = val
  },
  setCompanyLatitudinalType (state, val) {
    state.companyLatitudinalType = val
  },
  setPositionRunRateType (state, val) {
    state.positionRunRateType = val
  },
  setWrongPieTab (state, val) {
    state.wrongPieTab = val
  },
  // 全链路
  setFullLinkMenuType (state, val) {
    state.fullLinkMenuType = val
  },
  setYtGhjType (state, val) {
    state.ytGhjType = val
  },
  setCnGhjType (state, val) {
    state.cnGhjType = val
  },
  setFullLinkHeaderTabType (state, val) {
    state.fullLinkHeaderTabType = val
  },
  setFullLinkTableType (state, val) {
    state.fullLinkTableType = val
  },
   //中心质量
  setCqTabType(state, val) {
    state.cqTabType = val;
  },
  //中心质量
  setCqMonthType(state, val) {
      state.monthType = val;
  },
  //中心质量-省区得分
  setCentralProvType(state, val) {
      state.centralProvType = val;
  },
  //中心质量-中心得分
  setCentralCenterType(state, val) {
      state.centralCenterType = val;
  },
  // 成本效能
  setCostBenefitTabType (state, val) {
    state.costBenefitTabType = val
  },
  setCostBenefitSortColumn (state, val) {
    state.costBenefitSortColumn = val
  },
  // 用户行为
  setUserLatitudinalType (state, val) {
    state.userLatitudinalType = val
  },
  // 接待率
  setReceptionRateHeaderTabType (state, val) {
    state.receptionRateHeaderTabType = val
  },
  //
  setOnlineReceptionLatitudinalType (state, val) {
    state.onlineReceptionLatitudinalType = val
  },
  setOnlineReceptionPieType (state, val) {
    state.onlineReceptionPieType = val
  },
  setOnlineReceptionTabType (state, val) {
    state.onlineReceptionTabType = val
  },
  setCarRealTimeTabType (state, val) {
    state.carRealTimeTabType = val
  },
  setCarRealUpdateTime (state, val) {
    state.carRealUpdateTime = val
  },
  setcarRealTimelineType (state, val) {
    state.carRealTimelineType = val
  },
  setCentralOperatType (state, val) {
    state.CentralOperatType = val
  },
  setCentralOperatUpdateTime (state, val) {
    state.CentralOperatUpdateTime = val
  },
  setCentralclassesType (state, val) {
    state.CentralclassesType = val
  },
  // 独立网点kip
  setBranchKpiSelectType (state, val) {
    state.branchKpiSelectType = val
  },
  setBranchKpiChannelTabsType (state, val) {
    state.branchKpiChannelTabsType = val
  },
  // 订单跟踪
  setOrderTrackingTabType (state, val) {
    state.orderTrackingTabType = val
  },
  setOrderTrackingChannelType (state, val) {
    state.orderTrackingChannelType = val
  },
  setcarRealTimestoreyType (state, val) {
    state.carRealTimestoreyType = val
  },
  setCarRealTimeLinkType (state, val) {
    state.carRealTimeType = val
  },
  setOrderLatestTime (state, val) {
    state.orderLatestTime = val
  },
  // 圆通指数
  setBranchKpiTabsType (state, val) {
    state.branchKpiTabsType = val
  },
  setBranchKpiDimensionalityType (state, val) {
    state.branchKpiDimensionalityType = val
  },
  setBranchKpiProvinceDrillType (state, val) {
    state.branchKpiProvinceDrillType = val
  },
  setcentralActvclassesType (state, val) {
    state.centralActvclassesType = val
  },
  setcentralstoreyType (state, val) {
    state.centralstoreyType = val
  },
  setcentralfloorType (state, val) {
    state.centralfloorType = val
  },
  setChartRatePieType (state, val) {
    state.ChartRatePieType = val
  },
  setBusinessHeaderTabType (state, val) {
    state.businessHeaderTabType = val
  },
  setBusinessCenterTabType (state, val) {
    state.businessCenterTabType = val
  },
  setBusinessEchartTabType (state, val) {
    state.businessEchartTabType = val
  },
  setBusinessCenterTabName (state, val) {
    state.businessCenterTabName = val
  },
  setBusinessHeaderTopTabType (state, val) {
    state.businessHeaderTopTabType = val
  },
    setCarMonitorHeaderMenuType (state, val) {
        state.carMonitorHeaderMenuType = val
    },
  setCarMonitorLinkType (state, val) {
    state.carMonitorLinkType = val
  },
  setCarMonitorBatchTime (state, val) {
    state.carMonitorBatchTime = val
  },
  setCarMonitorQueryDate (state, val) {
    state.carMonitorQueryDate = val
  },
  setCarMonitorHhss (state, val) {
    state.carMonitorHhss = val
  },
  setCRLineType(state, val){
    state.completionRateLineType = val
  },
  setIndustryType(state,val) {
    state.industryType = val;
  },
}
const actions = {

}
export default {
  namespaced: true, // 用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
}
