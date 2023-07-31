import baseMixin from "@/mixins/LossKeepBase";
import { mapState, mapMutations } from "vuex";
import { queryList, queryTrend, } from "@/api/personLossKeep";
import dayjs from 'dayjs';
import { lineChartOptionDouble } from "@/mixins/lineChartOptionDouble.js";
import utils from "@/utils/utils";
import { Session } from "@/utils/storge";


export default {
  mixins: [baseMixin],
  data: function () {
    return {
      orgFullCode: !this.$route.query.orgFullCode ? "" : decodeURIComponent(this.$route.query.orgFullCode), // 数据链路
      ifHasNext: decodeURIComponent(this.$route.query.ifHasNext), // 数据链路
      notLinkDatas: ["合计"], //不带钻取的数据
      title: "中心人员流动",
      tableType: "personLossKeep",
      // dimensionTypeTypeList: [
      //   {
      //     value: "org",
      //     label: "组织维度"
      //   },
      //   {
      //     value: "job",
      //     label: "工序维度"
      //   }
      // ],
      headerTypeTypeList: [
        {
          value: "1",
          label: "流失率"
        },
        {
          value: "2",
          label: "留存率"
        },
      ],
      ///all-全部|work-工龄|age-年龄|degree-学历|sex-性别|recruitment-来源
      chartTabList: [
        {
          value: "6",
          label: "六个月"
        },
        {
          value: "3",
          label: "三个月"
        },
        {
          value: "1",
          label: "一个月"
        },
      ],
      lxchartTabList: [
        {
          value: "3",
          label: "离职"
        },
        {
          value: "1",
          label: "在职"
        },
      ],
      lzchartTabList: [
        {
          value: "1",
          label: "流失率"
        },
        {
          value: "2",
          label: "离职人数"
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

  mounted() {
    if (this.headerTabType == "1") {
      this.height = 80
    } else {
      this.height = 40
    }
  },

  created() {
    if (this.ifHasNext == "" || this.ifHasNext == "undefined") {
      this.ifHasNext = 1
    }

    let Datepermission = Session.getJson("Datepermission")
    let qiao = Session.getJson("qiao")
    let userInfo = Session.getJson("user");
    let weiyi = Session.getJson("weiyi");
    if (weiyi == 1) {
      if (qiao == 1) {
        console.log(userInfo)
        let path = `/personLossKeep/first`;
        let querys = {
          orgCode: "",
          orgName: encodeURIComponent("中心人员流动"),
          orgLevel: 1,
        };
        this.$router.replace({
          path: path,
          query: querys,
        });
      }
      if (qiao == 2) {
        let path = `/personLossKeep/center`;
        let querys = {
          orgCode: "",
          orgName: encodeURIComponent("中心人员流动"),
          orgLevel: 2,
        };
        this.$router.replace({
          path: path,
          query: querys,
        });
      }
      if (qiao == 3) {
        let path = `/personLossKeep/orglevel3`;
        let querys = {
          orgCode: "",
          orgName: encodeURIComponent("中心人员流动"),
          orgLevel: 3,
        };
        this.$router.replace({
          path: path,
          query: querys,
        });
      }
    }
  },

  computed: {
    ...mapState("personLossKeep", [
      "headerTabType",
      "chartTabType",
      "tabTypeTitle",
      "dimensionType",
      "cbuttons",
      "lxchartTabType",
      "lineType",
    ]),
    placeholder() {
      return "请输入组织";
    },
    // pieChartTitle() {
    //   const info = this.chartTabList.find(x => x.value == this.chartTabType);
    //   return `${info.label}分析`;
    // },
    lineChartTitle() {
      const info = this.headerTypeTypeList.find(
        x => x.value == this.headerTabType
      );
      return `${info.label.substring(0, 2)}趋势图`;
    },
    queryDetailsParams() {
      // 明细列表参数
      return {
        ...this.baseParams,
        pageNo: this.pageNo,
        limit: 20,
        sortColumn: this.sortColumn,
        sortType: this.sortType,
        rateType: this.headerTabType,
        dimension: this.chartTabType,
        keepMonth: this.chartTabType,
        queryDateType: this.activeType == 'date' ? 'day' : this.activeType,
        orgFullCode: this.orgFullCode,
        ifHasNext: this.ifHasNext,
        lx: this.lxchartTabType,
        // 测试参数
        // queryDate: "2023-04-16"
      };
    },
    queryLineChartParams() {
      let params = {
        ...this.baseParams,
        rateType: this.headerTabType,
        dimension: this.chartTabType,
        keepMonth: this.chartTabType,
        queryDateType: this.activeType == 'date' ? 'day' : this.activeType,
        orgFullCode: this.orgFullCode,
        lineType: this.lineType,
        // 测试参数
        // queryDate: "2023-04-16",
      };
      return params;
    },
    // queryPieChartParams() {
    //   let params = {
    //     ...this.baseParams,
    //     rateType: this.headerTabType,
    //     dimension: this.chartTabType,
    //     orgDimension: this.dimensionType
    //   };
    //   return params;
    // }
  },

  methods: {
    ...mapMutations("personLossKeep", [
      "setHeaderTabType",
      "setChartTabType",
      "setTabType",
      "setTabTypeTitle",
      "setDimensionType",
      "setButtons",
      "setlxChartTabType",
      "setLineType",
    ]),

    setLineTypeCallback() {
      this.queryLineChartData(this.queryLineChartParams);
    },

    // 菜单一个月 三个月 六个月 tab选择回调
    setChartTabTypeCallback() {
      //切换图表菜单
      this.queryTableReset();
      // this.queryPieChartData(this.queryPieChartParams);
      this.queryDetailsList(this.queryDetailsParams);
      this.queryLineChartData(this.queryLineChartParams)
    },

    setlxChartTabTypeCallback() {
      //切换图表菜单
      this.queryTableReset();
      this.queryDetailsParams.lx = this.lxchartTabType
      // this.queryPieChartData(this.queryPieChartParams);
      this.queryDetailsList(this.queryDetailsParams);
    },

    // 明细tab选择回调
    setDimensionTypeCallback() {
      // 处理搜索函数
      // 重置搜索类型
      this.queryTableReset();
      //查询明细数据
      this.queryDetailsList(this.queryDetailsParams);
    },
    // 顶部tab选择回调
    setHeaderTabTypeCallback() {
      // this.dateChangeWatchHandle();
      if (this.headerTabType == "1") {
        this.setLineType('1');
        this.queryTableReset();
        this.queryDetailsParams.sortColumn = "dimissionRate"
        this.queryDetailsParams.sortType = "DESC"
        this.switchType('date')
        this.setButtons(["date", "month", "year"])
        this.buttons = ["date", "month", "year"]
        this.queryDetailsParams.queryDateType = "day"
        this.queryLineChartParams.queryDateType = "day"
        this.queryDetailsParams.queryType = "day"
        this.queryLineChartParams.queryType = "day"
        this.queryDetailsParams.queryDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
        this.queryLineChartParams.queryDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
        this.queryDetailsList(this.queryDetailsParams)
        this.queryLineChartData(this.queryLineChartParams)
      } else if (this.headerTabType == "2") {
        this.queryTableReset();
        this.queryDetailsParams.sortColumn = "keepRate"
        this.queryDetailsParams.sortType = "ASC"
        this.switchType('month')
        this.setButtons(["month"])
        this.buttons = ["month"]
        this.queryDetailsParams.queryDateType = "month"
        this.queryLineChartParams.queryDateType = "month"
        this.queryDetailsParams.queryType = "month"
        this.queryLineChartParams.queryType = "month"
        this.queryDetailsParams.queryDate = dayjs().subtract(1, 'month').format('YYYY-MM-DD')
        this.queryLineChartParams.queryDate = dayjs().subtract(1, 'month').format('YYYY-MM-DD')
        this.queryDetailsList(this.queryDetailsParams)
        this.queryLineChartData(this.queryLineChartParams)
      }
    },
    // 时间组件的数据时间接口请求完成后通过this.$emit('dateChangeWatchHandle');
    // 触发此函数
    dateChangeWatchHandle() {
      // 数据时间变化触发函数,在时间组件接口请求完成之后触发
      this.queryTableReset();
      this.queryDetailsList(this.queryDetailsParams)//查询明细
      this.queryLineChartData(this.queryLineChartParams); //查询折线图
    },
    getMaxByarr(max) {
      // 只处理100万以下
      // if (max >= 100 && max < 1000) {
      //   max = Math.ceil(max / 100) * 100 + 100;
      // } else if (max >= 1000 && max < 10000) {
      //   max = Math.ceil(max / 1000) * 1000 + 1000;
      // } else if (max >= 10000 && max < 100000) {
      //   max = Math.ceil(max / 10000) * 10000 + 10000;
      // } else if (max >= 100000 && max < 1000000) {
      //   max = Math.ceil(max / 100000) * 100000;
      // } else if (max >= 10 && max < 100) {
      //   max = Math.ceil(max / 10) * 10 + 10;
      // } else if (max < 10) {
      //   max = 10;
      // }
      if (max >= 100 && max < 1000) {
        max = Math.ceil(max / 100) * 100;
      } else if (max >= 1000 && max < 10000) {
        max = Math.ceil(max / 1000) * 1000;
      } else if (max >= 10000 && max < 100000) {
        max = Math.ceil(max / 10000) * 10000;
      } else if (max >= 100000 && max < 1000000) {
        max = Math.ceil(max / 100000) * 100000;
      } else if (max >= 10 && max < 100) {
        max = Math.ceil(max / 10) * 10;
      }
      return max;
    },
    // 双折线图上下文字
    lineOptionSet(option, xdata = [], ydata = [], legend = []) {
      option = lineChartOptionDouble;
      option.xAxis[0].data = xdata;
      option.legend.data = [];

      let max = Math.max(...ydata[0]);
      if (ydata.length > 1) {
        if (max <= Math.max(...ydata[1])) {
          max = Math.max(...ydata[1]);
        }
      }
      option.yAxis[0]["max"] = this.getMaxByarr(max);

      if (!!ydata) {
        let datas = utils.lineLabelPosition(ydata, null);
        option.series[0].data = datas[0];
        option.series[1].data = datas[1];
      }

      for (let i = 0; i < option.series.length; i++) {
        // option.series[i].data = ydata[i];
        option.series[i].name = legend[i];
      }

      if (!!legend) {
        legend.forEach((item, index) => {
          if (option.series[index]) {
            option.series[index].name = item;
            option.legend.data.push({ name: item, icon: "line" });
          }
        });
      }
      return option;
    },

    queryListApi: queryList,
    // queryPieApi: querySource,
    queryLineApi: queryTrend
  }
};
