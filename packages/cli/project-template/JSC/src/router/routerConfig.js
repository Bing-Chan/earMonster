const constantRouterMap = [
  // mode: 'history', // 后端支持可开
  {
    path: "/demo",
    name: "demo",
    component: () => import("@/pages/demo"),
    meta: {
      title: "demo"
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import(`@/pages/404`),
    meta: {
      title: "404"
    }
  },
  {
    path: "/zanwu",
    name: "zanwu",
    component: () => import(`@/pages/zanwu`),
    meta: {
      title: "暂无权限"
    }
  },
  {
    path: "/403",
    name: "403",
    component: () => import(`@/pages/zanwu`),
    meta: {
      title: "暂无权限"
    }
  },
  {
    path: "/JumpPage",
    name: "JumpPage",
    component: () => import(`@/pages/JumpPage`),
    meta: {
      title: "合作中间跳转页面"
    }
  },
  {
    path: "/TargetDetailPage",
    name: "TargetDetailPage",
    component: () => import(`@/pages/TargetDetailPage`),
    meta: {
      title: "指标说明"
    }
  },
  {
    path: "/employ/first",
    name: "employarchiveQuery",
    component: () => import(`@/pages/employ/archiveQuery.vue`),
    meta: {
      title: "档案查询"
    }
  },
  {
    path: "/employ/details",
    name: "employDetails",
    component: () => import(`@/pages/Employ/details.vue`),
    meta: {
      title: "个人基本信息"
    }
  },

  // 只传工号的员工详情
  {
    path: "/employ/detailsNew",
    name: "employDetailsNew",
    component: () => import(`@/pages/Employ/detailsNew.vue`),
    meta: {
      title: "人员档案"
    }
  },

  //操作人员分析
  {
    path: "/operatorAnalysis/first",
    name: "operatorAnalysisFirst",
    component: () => import("@/pages/operatorAnalysis/first"),
    meta: {
      title: "操作人员分析"
    }
  },
  {
    path: "/operatorAnalysis/center",
    name: "operatorAnalysisCenter",
    component: () => import("@/pages/operatorAnalysis/center"),
    meta: {
      title: "操作中心"
    }
  },
  {
    path: "/operatorAnalysis/post",
    name: "operatorAnalysisPost",
    component: () => import("@/pages/operatorAnalysis/post"),
    meta: {
      title: "岗位"
    }
  },
  {
    path: "/operatorAnalysis/person",
    name: "operatorAnalysisPerson",
    component: () => import("@/pages/operatorAnalysis/person"),
    meta: {
      title: "人员"
    }
  },

  // 操作工考勤 
  {
    path: "/operatorWorkAttendance/first",
    name: "operatorWorkAttendanceFirst",
    component: () => import("@/pages/operatorWorkAttendance/first"),
    meta: {
      title: "中心"
    }
  },
  {
    path: "/operatorWorkAttendance/class",
    name: "operatorWorkAttendanceClass",
    component: () => import("@/pages/operatorWorkAttendance/class"),
    meta: {
      title: "班"
    }
  },
  {
    path: "/operatorWorkAttendance/group",
    name: "operatorWorkAttendanceGroup",
    component: () => import("@/pages/operatorWorkAttendance/group"),
    meta: {
      title: "组"
    }
  },
  {
    path: "/operatorWorkAttendance/person",
    name: "operatorWorkAttendancePerson",
    component: () => import("@/pages/operatorWorkAttendance/person"),
    meta: {
      title: "人"
    }
  },

  // 中心人员分析
  {
    path: "/personStatistics/first",
    name: "/personStatisticsFirst",
    component: () => import("@/pages/personStatistics/first"),
    meta: {
      title: "中心人员分析"
    }
  },
  {
    path: "/personStatistics/center",
    name: "/personStatisticsCenter",
    component: () => import("@/pages/personStatistics/center"),
    meta: {
      title: "中心人员分析"
    }
  },
  {
    path: "/personStatistics/post",
    name: "/personStatisticsPost",
    component: () => import("@/pages/personStatistics/post"),
    meta: {
      title: "中心人员分析"
    }
  },
  {
    path: "/personStatistics/person",
    name: "/personStatisticsPerson",
    component: () => import("@/pages/personStatistics/person"),
    meta: {
      title: "中心人员分析"
    }
  },
  {
    path: "/personStatistics/childone",
    name: "/personStatisticsChildone",
    component: () => import("@/pages/personStatistics/childone"),
    meta: {
      title: "中心人员分析"
    }
  },
  {
    path: "/personStatistics/childtwo",
    name: "/personStatisticsChildtwo",
    component: () => import("@/pages/personStatistics/childtwo"),
    meta: {
      title: "中心人员分析"
    }
  },

  // 中心人员流动
  {
    path: "/personLossKeep/first",
    name: "/personLossKeepFirst",
    component: () => import("@/pages/personLossKeep/first"),
    meta: {
      title: "中心人员流动"
    }
  },
  {
    path: "/personLossKeep/center",
    name: "/personLossKeepCenter",
    component: () => import("@/pages/personLossKeep/center"),
    meta: {
      title: "中心人员流动"
    }
  },
  {
    path: "/personLossKeep/orglevel3",
    name: "/personLossKeepOrglevel3",
    component: () => import("@/pages/personLossKeep/orglevel3"),
    meta: {
      title: "中心人员流动"
    }
  },
  {
    path: "/personLossKeep/orglevel4",
    name: "/personLossKeepOrglevel4",
    component: () => import("@/pages/personLossKeep/orglevel4"),
    meta: {
      title: "中心人员流动"
    }
  },
  {
    path: "/personLossKeep/orglevel5",
    name: "/personLossKeepOrglevel5",
    component: () => import("@/pages/personLossKeep/orglevel5"),
    meta: {
      title: "中心人员流动"
    }
  },
  {
    path: "/personLossKeep/orglevel6",
    name: "/personLossKeepOrglevel6",
    component: () => import("@/pages/personLossKeep/orglevel6"),
    meta: {
      title: "中心人员流动"
    }
  },
  {
    path: "/personLossKeep/orglevel7",
    name: "/personLossKeepOrglevel7",
    component: () => import("@/pages/personLossKeep/orglevel7"),
    meta: {
      title: "中心人员流动"
    }
  },
  {
    path: "/personLossKeep/personnelDetail",
    name: "/personLossKeepPersonnelDetail",
    component: () => import("@/pages/personLossKeep/personnelDetail"),
    meta: {
      title: "中心人员流动"
    }
  },

  // 人员看板
  {
    path: "/personKanban/first",
    name: "personKanbanFirst",
    component: () => import("@/pages/personKanban/first"),
    meta: {
      title: "人员看板"
    }
  },
  {
    path: "/personKanban/secound",
    name: "personKanbanSecound",
    component: () => import("@/pages/personKanban/secound"),
    meta: {
      title: "人员看板"
    }
  },
  {
    path: "/personKanban/secound/:id",
    name: "personKanbanSecoundId",
    component: () => import("@/pages/personKanban/secound"),
    meta: {
      title: "人员看板"
    }
  },
  {
    path: "/personKanban/person",
    name: "personKanbanPerson",
    component: () => import("@/pages/personKanban/person"),
    meta: {
      title: "人员看板"
    }
  },

  // 数据治理
  // {
  //   path: "/personException/first",
  //   name: "personExceptionFirst",
  //   component: () => import("@/pages/personException/first"),
  //   meta: {
  //     title: "数据治理"
  //   }
  // },
  // {
  //   path: "/personException/secound",
  //   name: "personExceptionSecound",
  //   component: () => import("@/pages/personException/secound"),
  //   meta: {
  //     title: "数据治理"
  //   }
  // },
  // {
  //   path: "/personException/secound/:id",
  //   name: "personExceptionSecoundId",
  //   component: () => import("@/pages/personException/secound"),
  //   meta: {
  //     title: "数据治理"
  //   }
  // },
  // {
  //   path: "/personException/person",
  //   name: "personExceptionPerson",
  //   component: () => import("@/pages/personException/person"),
  //   meta: {
  //     title: "数据治理"
  //   }
  // },
  
  // 数据治理 new
  {
    path: "/personException/first",
    name: "personExceptionFirst",
    component: () => import("@/pages/personExceptionNew/first"),
    meta: {
      title: "数据治理"
    }
  },
];

/*
1.有角色区分,注册路由需在此数组中配置相关模块
2.redirect为空表示该路由需要根据角色（userOrgType）显示对应页面，比如总区(通过accessToken获取userOrgType为HEAD)，则访问：“http：//localhost:8080/ANetAmount？accessToken=***”重定向到“http：//localhost:8080/ANetAmount/Head？orgCode=**&userOrgType=HEAD&..."
3.redirect不为空时表示访问某路由需重定向到对应页面 比如无论什么身份都需要访问首页，则访问：”http：//localhost:8080/RookieIndex？accessToken=***“重定向到”http：//localhost:8080/RookieIndex/Head？orgCode=**&userOrgType=HEAD&...“
4.注意：如果不需要任何重定向，则只需在constantRouterMap配置相关路由即可，访问方式”http：//localhost:8080/A/B？key1=value1&key2=value2&...”
5.authority 默认无此属性，authority为true,表示此菜单对应总部，管区，省区，片区，中心权限一致，都能看到总部数据
*/
const fullRountMenu = [
  {
    path: "/operatorAnalysis",
    redirect: "",
    menuName: "操作工分析"
  },
  {
    path: "/operatorWorkAttendance",
    redirect: "first",
    menuName: "操作工考勤"
  },

  // 中心人员分析 new
  {
    path: "/personStatistics",
    redirect: "",
    menuName: "中心人员分析"
  },
  {
    path: "/personLossKeep",
    redirect: "",
    menuName: "中心人员流动"
  },
  {
    path: "/personKanban",
    redirect: "first",
    menuName: "人员看板"
  },
  {
    path: "/personException",
    redirect: "first",
    menuName: "数据治理"
  },
  {
    path: "/employ",
    redirect: "archiveQuery",
    menuName: "档案查询"
  },

];

// 权限类型转换（此定义后不需改动）
const orgLevelArr = {
  first: 1, // 总部
  center: 2, // 省区
  post: 3, // 中心
  person: 4 // 岗位
};

export { fullRountMenu, constantRouterMap, orgLevelArr };
