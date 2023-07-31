import baseMixin from "@/mixins/base";
import { mapState, mapMutations } from "vuex";
import { queryList, queryTrend, } from "@/api/operatorWorkAttendance";
import {  querySource } from "@/api/operatorAnalysis";
// import { queryList, queryTrend,querySource } from "@/api/personAnalysis";

import { Session } from "@/utils/storge";
import dayjs from "dayjs";


export default {
  mixins: [baseMixin],
  data: function() {
    return {
      notLinkDatas: ["合计"], //不带钻取的数据
      buttons: ["date", "month"],
      title: "中心人员分析",
      tableType: "personAnalysis",

      headerTypeTypeList: [
        {
          value: "1",
          label: "在职"
        },
        {
          value: "2",
          label: "入职"
        },
        {
          value: "3",
          label: "离职"
        }
      ],
      dimensionTypeTypeList: [
        {
          value: "1",
          label: "全部"
        },
        {
          value: "2",
          label: "操作类"
        },
        {
          value: "3",
          label: "职能类"
        }
      ],

      // zz 在职 全部 all-全部|work-工龄|age-年龄|degree-学历|sex-性别|recruitment-来源
      chartTabList: [
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
          value: "recruitment",
          label: "职级"
        }
      ],


       // zz 在职  操作类  all-全部|work-工龄|age-年龄|degree-学历|sex-性别|recruitment-来源
       zz_cz_chartTabList: [
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
      ],

        // zz 在职  职能类  all-全部|work-工龄|age-年龄|degree-学历|sex-性别|recruitment-来源
      zz_zn_chartTabList: [
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
      ],

       // rz 入职   all-全部，操作类职能类|work-工龄|age-年龄|degree-学历|sex-性别|recruitment-来源
      rz_chartTabList: [
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
      ],
      // lz-离职 全部操作类职能类  all-全部|work-工龄|age-年龄|degree-学历|sex-性别|recruitment-来源

      lz_chartTabList: [
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
      ],




        chartTabListB: [
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
        },

      ],
      leavReason: [
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
          value: "7",
          label: "食宿交通工作环境不佳"
        },

      ],

      zj: [
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
        },


      ],




      format: {
        link: [], //链接
        relative: [], //环比
        plus: [], //正负
        number: [] //数字
      }
    };
  },
  computed: {
    ...mapState("operatorAnalysis", [
      "headerTabType",
      "chartTabType",
      "tabTypeTitle",
      "dimensionType"
    ]),
    getCurrentDate() {
      let userInfo = Session.getJson("user");
      let day = new Date(dayjs(userInfo.systemTime))
      let now = new Date(dayjs().hour(14).minute(0).second(0))
      if(day <= now) {
        this.setCurrentDate(new Date(dayjs(userInfo.systemTime).add(-2, 'day')))
      }else {
        this.setCurrentDate(new Date(dayjs(userInfo.systemTime).add(-1, 'day')))
      }
    },
    placeholder() {
      return "输入关键字";
    },
    pieChartTitle() {
     // debugger
      // if(headerTypeTypeList.value=="1"){
      //   if(dimensionTypeTypeList.value=="1"){
      //     const info = this.zz_all_chartTabList.find(x => x.value == this.chartTabType);
      //     return `${info.label}分析` 
      //   }else if(dimensionTypeTypeList.value=="2"){
      //     const info = this.zz_cz_chartTabList.find(x => x.value == this.chartTabType);
      //     return `${info.label}分析` 

      //   }else if(dimensionTypeTypeList.value=="2"){
      //     const info = this.zz_zn_chartTabList.find(x => x.value == this.chartTabType);
      //     return `${info.label}分析` 

      //   }
      // }
      // if(headerTypeTypeList.value=="2"){
        
      //     const info = this.rz_chartTabList.find(x => x.value == this.chartTabType);
      //     return `${info.label}分析` 
        
      // }
      // if(headerTypeTypeList.value=="3"){
        
      //   const info = this.lz_chartTabList.find(x => x.value == this.chartTabType);
      //   return `${info.label}分析` 
      
      //  }
      const info = this.chartTabList.find(x => x.value == this.chartTabType);
      return `${info.label}分析`;
    },
    lineChartTitle() {
      const info = this.headerTypeTypeList.find(
        x => x.value == this.headerTabType
      );
      return `${info.label}人数`;
    },
    queryDetailsParams() {
      // 明细列表参数
      return {
        ...this.baseParams,
        pageNo: this.pageNo,
        limit: 20,
        sortColumn: this.sortColumn,
        sortType: this.sortType,
        lx: this.headerTabType,
        dimension: this.chartTabType,
        orgDimension: this.dimensionType
      };
    },
    queryLineChartParams() {
      let params = {
        ...this.baseParams,
        lx: this.headerTabType,
        dimension: this.chartTabType,
        orgDimension: this.dimensionType,
        function: this.dimensionType.value,
      };
      return params;
    },
    queryPieChartParams() {
      let params = {
        ...this.baseParams,
        lx: this.headerTabType,
        dimension: this.chartTabType,
        orgDimension: this.dimensionType
      };
      return params;
    }
  },
  methods: {
    ...mapMutations("operatorAnalysis", [
      "setHeaderTabType",
      "setChartTabType",
      "setTabType",
      "setTabTypeTitle",
      "setDimensionType"
    ]),
    // 饼图菜单tab选择回调
    setChartTabTypeCallback() {
        //切换图表菜单

        this.queryTableReset();
        this.queryPieChartData(this.queryPieChartParams);
        this.queryDetailsList(this.queryDetailsParams);
    },
    // 明细tab选择回调
    setDimensionTypeCallback() {
      // //处理搜索函数

      // // 重置搜索类型
      this.queryTableReset();
      //查询明细数据
      this.queryDetailsList(this.queryDetailsParams);
    },
    // 顶部tab选择回调
    setHeaderTabTypeCallback() {
      this.dateChangeWatchHandle();
    },
    // 时间组件的数据时间接口请求完成后通过this.$emit('dateChangeWatchHandle');
    //触发此函数
    dateChangeWatchHandle() {
      // 数据时间变化触发函数,在时间组件接口请求完成之后触发

      this.queryTableReset();
      this.queryDetailsList(this.queryDetailsParams); //查询明细
      this.queryLineChartData(this.queryLineChartParams); //查询折线图
      this.queryPieChartData(this.queryPieChartParams); //查询饼图
    },
    queryListApi: queryList,
    queryPieApi: querySource,
    queryLineApi: queryTrend
  }
};
