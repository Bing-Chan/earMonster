import baseMixin from "@/mixins/base";
import { mapState, mapMutations } from "vuex";
import utils from "@/utils/utils";
import { lineChartOptionDouble } from "@/mixins/lineChartOptionDouble.js";

import {
  queryList,
  queryTrend,
  querySource,
  queryBtn,
  querySysDate
} from "@/api/personKanban";
import dayjs from "dayjs";

export default {
  mixins: [baseMixin],
  data: function() {
    return {
      notLinkDatas: ["合计"], //不带钻取的数据
      orgCodeLine: !this.$route.query.orgCodeLine
        ? ""
        : decodeURIComponent(this.$route.query.orgCodeLine), //	数据链路
      orgCodeLineName: !this.$route.query.orgCodeLineName
        ? ""
        : decodeURIComponent(this.$route.query.orgCodeLineName), //	数据链路
      toPersonFlag: !this.$route.query.toPersonFlag
        ? ""
        : decodeURIComponent(this.$route.query.toPersonFlag), //	是否人员明细
      deptEndFlag: !this.$route.query.deptEndFlag
        ? ""
        : decodeURIComponent(this.$route.query.deptEndFlag), //	是否人员明细

      buttons: [],
      title: "人员看板",
      tableType: "personKanban",
      headerTypeTypeList: [
        {
          value: "-1",
          label: "全部"
        },
        {
          value: "0",
          label: "国内"
        },
        {
          value: "1",
          label: "国际"
        }
      ],
      zyjmTypeList: [
        {
          value: "2",
          label: "直营",
          name: "ZY"
        },
        {
          value: "3",
          label: "加盟",
          name: "JM"
        }
      ],
      functionTypeList: [
        {
          value: "attributes",
          label: "用工属性"
        },
        {
          value: "line",
          label: "岗位条线"
        }
      ],
      tabMenu1TypeList: [
      ],
      tabMenu2TypeList: [
      ],
      format: {
        link: [], //链接
        relative: [], //环比
        plus: [], //正负
        number: [] //数字
      },
      demoType: "1"
    };
  },
  computed: {
    ...mapState("personKanban", [
      "headerTabType",
      "zyjmType",
      "functionType",
      "tabTypeTitle",
      "tabMenu1Type",
      "tabMenu2Type"
    ]),
    placeholder() {
      return "请输入组织";
    },
    pieChartTitle() {
      // const info = this.tabMenu1TypeList.find(x => x.value == this.tabMenu1Type);
      // return `${info.label}分析`;
      return "人员占比图";
    },
    lineChartTitle() {
      // const info = this.headerTypeTypeList.find(
      //   x => x.value == this.headerTabType
      // );
      return `人员趋势图`;
    },
    queryDetailsParams() {
      // 明细列表参数
      return {
        ...this.baseParams,
        deptEndFlag: this.deptEndFlag,
        dimension: "",
        first: false,
        isAllOrSum: 0,
        keyWord: "",
        lineName:
          this.tabMenu1Type == "其他" ? this.tabMenu2Type : this.tabMenu1Type,
        orgCodeLine: this.orgCodeLine,
        orgCodeLineName: this.orgCodeLineName,
        pageNo: this.pageNo,
        limit: 30,
        sortColumn: this.sortColumn,
        sortType: this.sortType,
        internationalFlag: this.headerTabType,
        lx: this.zyjmType,
        orgDimension: this.isZhiYing ? this.functionType : "",
        toPersonFlag: this.toPersonFlag,
        ...this.queryFirstParams
      };
    },
    queryLineChartParams() {
      let params = {
        ...this.baseParams,
        orgDimension: this.functionType,
        deptEndFlag: false,
        orgCodeLine: this.orgCodeLine,
        internationalFlag: this.headerTabType,
        lx: this.zyjmType,
        lineName:
          this.tabMenu1Type == "其他" ? this.tabMenu2Type : this.tabMenu1Type,
        ...this.queryFirstParams
      };
      return params;
    },
    queryPieChartParams() {
      let params = {
        ...this.baseParams,
        internationalFlag: this.headerTabType,
        lx: this.zyjmType,
        orgDimension: this.functionType,
        deptEndFlag: false,
        orgCodeLine: this.orgCodeLine,
        lineName:
          this.tabMenu1Type == "其他" ? this.tabMenu2Type : this.tabMenu1Type,
        ...this.queryFirstParams
      };
      return params;
    },
    queryBtn1Params() {
      let params = {
        type: "1",
        headerTypeType: this.headerTabType,
        functionType: this.functionType
      };
      return params;
    },
    queryBtn2Params() {
      let params = {
        type: "2",
        tabMenu1Type: this.tabMenu1Type
      };
      return params;
    },
    tabMenu2TypeShow() {
      return this.tabMenu2TypeList.length > 0;
    },
    isZhiYing() {
      //国内+直营
      return this.headerTabType == "0" && this.zyjmType == "2";
    }
  },
  methods: {
    ...mapMutations("personKanban", [
      "setTabTypeTitle",
      "setHeaderTabType",
      "setZyjmType",
      "setFunctionType",
      "setTabMenu1Type",
      "setTabMenu2Type"
    ]),
    async loadDicData() {
      //设置时间
      const sysDateRes = await querySysDate({});
      //设置时间
      this.setCurrentDate(new Date(dayjs(sysDateRes.data.queryDate)));

      const data = await this.queryBtnDataNew();
      this.tabMenu1TypeList = data.showFirst.map(x => {
        return {
          label: x,
          value: x
        };
      });

      this.tabMenu1TypeList.push({
        label: "其他",
        value: "其他"
      });
      if (this.tabMenu1Type == "") {
        this.setTabMenu1Type(data.showFirst[0]); //重置
      }
      this.tabMenu2TypeList = data.showOther.map(x => {
        return {
          label: x,
          value: x
        };
      });
    },
    getOrgCodeLine(codeLine, code) {
      if (!codeLine || codeLine == "") {
        return `${code}`;
      }
      return `${codeLine}|${code}`;
    },
    // 直营加盟回调
    setSetZyjmTypeCallback() {
      this.setFunctionType("attributes");
      this.dateChangeWatchHandle();
      // 数据时间变化触发函数,在时间组件接口请求完成之后触发
      // this.queryTableReset();
      // this.queryDetailsList(this.queryDetailsParams); //查询明细
      // this.queryPieChartData(this.queryPieChartParams); //查询饼图
    },
    // 第二个tab(除日期)
    setFunctionTypeCallback() {
      // 数据时间变化触发函数,在时间组件接口请求完成之后触发
      this.queryTableReset();
      this.refTable();
      this.queryDetailsList(this.queryDetailsParams); //查询明细
      this.queryPieChartData(this.queryPieChartParams); //查询饼图
    },
    // 第三个tab(除日期)
    setTabMenu1TypeCallback() {
      // debugger;
      if (this.tabMenu1Type == "其他") {
        this.setTabMenu2Type(this.tabMenu2TypeList[0].value);
      }
      this.setTabMenu2TypeCallback();
    },
    // 第四个tab
    setTabMenu2TypeCallback() {
      this.queryTableReset();
      this.refTable();
      this.queryDetailsList(this.queryDetailsParams); //查询明细
    },
    refTable() {
      // 刷新table
      this.tableHeadData = [];
      this.tableBodyData = [];
    },
    // 时间组件的数据时间接口请求完成后通过this.$emit('dateChangeWatchHandle');
    //触发此函数
    async dateChangeWatchHandle() {
      // 数据时间变化触发函数,在时间组件接口请求完成之后触发
      this.queryTableReset();
      this.refTable();
      this.queryDetailsList(this.queryDetailsParams); //查询明细
      this.queryLineChartData(this.queryLineChartParams); //查询折线图
      if (this.headerTabType == "0") {
        this.queryPieChartData(this.queryPieChartParams); //查询饼图
      }
    },
    pieOptionSet(data) {
      let chartPieOption = {
        tooltip: {
          trigger: "item",
          //formatter: formatter,
          textStyle: {
            fontSize: 11
          },
          extraCssText: "z-index:99"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: []
        },
        color: [
          "#2482FC",
          "#F35252",
          "#e6a733",
          "#3BB950",
          "#7A52E6",
          "#6D2763",
          "#56A0B0",
          "#838383"
        ],
        series: [
          {
            name: "",
            type: "pie",
            radius: ["30%", "50%"],
            startAngle: -120,
            // minAngle: 10,
            // minShowLabelAngle: 10,
            avoidLabelOverlap: true,
            label: {
              normal: {
                formatter: function(params) {
                  let percents = Math.round(params.percent * 100) / 100;
                  let s = percents.toString();
                  let rs = s.indexOf(".");
                  if (rs < 0) {
                    rs = s.length;
                    s += ".";
                  }
                  while (s.length <= rs + 2) {
                    s += "0";
                  }
                  return params.name + "(" + s + "%)";
                },
                rich: {
                  per: {
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: data.map(x => {
              return { name: x.label, value: x.value };
            })
          }
        ]
      };
      return chartPieOption;
    },
    getMaxByarr(max) {
      //只处理100万以下
      if (max >= 100 && max < 1000) {
        max = Math.ceil(max / 100) * 100 + 100;
      } else if (max >= 1000 && max < 10000) {
        max = Math.ceil(max / 1000) * 1000 + 1000;
      } else if (max >= 10000 && max < 100000) {
        max = Math.ceil(max / 10000) * 10000 + 10000;
      } else if (max >= 100000 && max < 1000000) {
        max = Math.ceil(max / 100000) * 100000;
      } else if (max >= 10 && max < 100) {
        max = Math.ceil(max / 10) * 10 + 10;
      } else if (max < 10) {
        max = 10;
      }
      return max;
    },
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
        //option.series[i].data = ydata[i];
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
    isLink(item, prop) {
      //不钻取字典处理
      if (this.notLinkDatas.includes(item.orgName)) {
        return false;
      }
      // 最后一层人员明细处理
      if (!item.clickFlag && item.deptEndFlag) {
        return false;
      }
      return true;
    },
    queryListApi: queryList,
    queryPieApi: querySource,
    queryLineApi: queryTrend,
    queryBtnApi: queryBtn
  }
};
