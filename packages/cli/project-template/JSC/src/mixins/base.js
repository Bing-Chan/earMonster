//此文件数据不能更改，只能在对应模块重写
// By  Bing.chan
// 2022.07.12

import { mapState, mapMutations } from "vuex";
import utils from "@/utils/utils";
import cardBox from "@/components/customComponents/cardBox/cardBox";
import customTable from "./CustomTable";
import showDate from "@/components/common/showDate";
import datePanel from "@/components/customComponents/datePanel/datePanel";
import dimensionBox from "@/components/customComponents/dimensionBox";
import headerTab from "@/components/customComponents/headerTab";
import legendSelect from "@/components/customComponents/legentSelect";
import lineDimensionSelect from "@/components/customComponents/lineDimensionSelect";

// 引入 ECharts 主模块
const echarts = require("echarts/lib/echarts");
//引入标题
require("echarts/lib/component/legend");
// 引入柱状图
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/dataZoom");

import { lineChartOption } from "./lineChartOption.js";
import dayjs from "dayjs";

export default {
  components: {
    "card-box": cardBox, // 卡片控件
    "custom-table": customTable, //列表组件
    "date-panel": datePanel, // 时间面板
    "show-date": showDate, // 只读时间显示控件
    "dimension-box": dimensionBox, //带样式控件
    "header-tab": headerTab, //顶部选项卡
    "legend-select": legendSelect, //滚动选项卡
    "line-dimension-select": lineDimensionSelect
  },
  data: function() {
    return {
      that: this,
      orgCode: "",
      orgName: "",
      ifHasNext: !this.$route.query.ifHasNext
        ? "1"
        : decodeURIComponent(this.$route.query.ifHasNext), //	数据类型
      orgLevel: !this.$route.query.orgLevel
        ? "1"
        : decodeURIComponent(this.$route.query.orgLevel), //	数据类型
      first: this.$route.query.first, //是否用户首页
      // 列表请求中单独使用的参数---start
      paging: true,
      limit: 20,
      tableTitle: "明细数据",
      topFixed: 152,
      pageNo: 1,
      // 列表请求中单独使用的参数---end
      // 请求参数---end
      height: 40,
      tableType: "",
      restTab: false, // 是否重置选项卡
      buttons: ["date", "month", "year", "custom"],
      //业务类属性
      lineHasData: false, // 折线图是否存在数据
      pieHasData: false, // 饼图图是否存在数据
      tableHasData: false, //明细是否存在数据

      lineChartLoading: false, //  折线模块加载
      pieChartLoading: false, //  饼图模块加载
      listChartLoading: false, //  折线模块加载

      lineChartInstance: null,
      pieChartInstance: null,
      sortColumn: "",
      pieShow: true,
      sortType: "",
      tableHeadData: [],
      tableBodyData: [],
      searchResultList: [], // 模糊搜索结果
      detailsListLoading: false, // 明细列表loading
      hasMore: false, // 明细列表是否有下一页标志
      currentPage: this.$route.path.substring(
        this.$route.path.lastIndexOf("/") + 1,
        this.$route.path.length
      ), // 当前页面
      fixed: false,
      dimensionTypeTypeList: [
        {
          value: "1",
          label: "组织维度"
        },
        {
          value: "2",
          label: "工序维度"
        }
      ],
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
      chartTabList: [
        {
          value: "1",
          label: "全部"
        },
        {
          value: "3",
          label: "工龄"
        },
        {
          value: "4",
          label: "年龄"
        },
        {
          value: "6",
          label: "学历"
        },
        {
          value: "7",
          label: "性别"
        },
        {
          value: "5",
          label: "来源"
        }
      ]
    };
  },
  computed: {
    ...mapState("common", [
      "currentDate",
      "customStartDay",
      "customEndDay",
      "activeType",
      "isNullData",
      "pageHistory"
    ]),
    tablePropCollection: function() {
      return {
        tableHeadData: this.tableHeadData,
        tableBodyData: this.tableBodyData,
        sortColumn: this.sortColumn,
        sortType: this.sortType,
        pageLoading: this.detailsListLoading,
        hasMore: this.hasMore,
        topFixed: this.topFixed,
        searchType: this.searchType,
        placeholder: this.tableTitle, //'明细数据',
        disableScroll: false,
        expand: this.expand
      };
    },
    baseParams() {
      // 所有接口请求的基础参数
      let params = {
        queryDate: dayjs(this.currentDate).format("YYYY-MM-DD"),
        queryType: utils.toConvertDateType(this.activeType),
        startDate: this.customStartDay,
        endDate: this.customEndDay,
        //层级字段
        orgCode: this.orgCode,
        orgName: this.orgName,
        orgLevel: this.orgLevel,
        first: this.first,
        ifHasNext: this.ifHasNext
      };
      return params;
    },
    buttonParams() {
      let params = {
        ...this.baseParams
      };
      return params;
    }
  },
  filters: {
    //字段转换
    columnTransfer(val, name, that) {
      if (that.format.relative.includes(name)) {
        return utils.filterColorByRate(val);
      } else if (that.format.plus.includes(name)) {
        return utils.filterColorByRate(val);
      } else if (
        that.format &&
        that.format.flagEnum &&
        that.format.flagEnum.includes(name)
      ) {
        return utils.filterFlagColor(val);
      }
      // else if (that.format.number.includes(name)) {
      // }
      return val;
    }
  },
  async mounted() {
    if (this.$route.query.orgName && this.$route.query.orgName != "") {
      this.orgCode = decodeURIComponent(this.$route.query.orgCode);
      this.orgName = decodeURIComponent(this.$route.query.orgName);
      this.orgLevel = decodeURIComponent(this.$route.query.orgLevel);
      this.title = decodeURI(this.$route.query.orgName);
    }
    utils.setPageTitle(this.title);
    await this.loadDicData(); // 加载所有字典值
    this.routeParamsInit();
    this.$nextTick(() => {
      this.fixedEleHeightCalc();
      setTimeout(() => {
        window.scrollTo(0, 1);
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 10);
      }, 50);
    });
    window.addEventListener("scroll", this.scrollHandle);
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener("scroll", this.scrollHandle);
    next();
  },
  methods: {
    ...mapMutations("common", [
      "setCurrentDate",
      "setCustomStartDay",
      "setCustomEndDay",
      "setActiveType",
      "setIsTimeFlag",
      "setPageHistory"
    ]),
    selectHandle(type, funName, item, callback) {
      if (this[type] === item.value) return;
      this.$options.methods[funName].bind(this)(item.value);
      callback();
    },
    setDicList(type, funName, value) {
      this.$options.methods[funName].bind(this)(value);
    },
    getSearchParams() {
      return this.queryDetailsParams;
    },
    loadDicData() {},
    handlerSelectOrgCode(item, key) {
      this.pageNo = 1;
      this.queryDetailsList({
        ...this.queryDetailsParams,
        ...{ keyWord: item.orgName }
      });
    },
    queryTableReset() {
      this.searchType = 0;
      this.pageNo = 1;
      this.sortColumn = "";
      this.sortType = "";
      this.restTab = true;
    },
    scrollHandle() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop >= 36) {
        this.fixed = true;
      }
      if (scrollTop < 40) {
        this.fixed = false;
      }
    },
    //初始化路由
    routeParamsInit() {
      this.dateChangeWatchHandle();
    },
    //重新设置滚动高度
    resetScrollEleHeightCalc() {
      this.rheight = 0;
      this.$refs.box.querySelectorAll(".reset-scroll-elem").forEach(item => {
        if (item.style.display !== "none") {
          this.rheight += item.offsetHeight;
        }
      });
    },
    //冻结模块高度计算
    fixedEleHeightCalc() {
      // 固定位置元素高度计算
      this.height = 0;
      if (
        !!this.$refs.fixedBox &&
        !!this.$refs.fixedBox.querySelectorAll(".fixed-elem")
      ) {
        this.$refs.fixedBox.querySelectorAll(".fixed-elem").forEach(item => {
          this.height += item.offsetHeight;
        });
      }
      this.topFixed = this.height;
    },
    //打开选择器
    openPicker() {
      this.$refs.picker.open();
    },
    //日期选择完成
    confirmDate(val) {
      if (this.activeType === "custom") {
        this.setCustomStartDay(val[0]);
        this.setCustomEndDay(val[1]);
      } else {
        this.setCurrentDate(val);
      }
      this.dateChangeWatchHandle();
    },
    //绘制图表
    drawChart(instance, option) {
      // 图绘制
      if (!!instance) instance.clear();
      instance.setOption(option);
    },
    lineOptionSet(option, xdata = [], ydata = [], legend = []) {
      option.series = [];
      option.legend.data = [];
      option.xAxis[0].data = xdata;
      option.yAxis[0].axisLabel.formatter = function(value, index) {
        if (value >= 10000) {
          let percents = Math.round((value / 10000) * 100) / 100;
          return percents + "万";
        } else {
          return value;
        }
      };
      if (!!ydata) {
        ydata.forEach((item, index) => {
          option.series.push({
            name: "",
            type: "line",
            symbol: "circle",
            data: item,
            label: {
              distance: 10,
              rotate: 35,
              show: true,
              formatter: function(params) {
                if (params.value >= 10000) {
                  let percents = Math.round((params.value / 10000) * 100) / 100;
                  return percents;
                } else {
                  return params.value;
                }
              }
            }
          });
        });
      }
      for (let i = 0; i < option.series.length; i++) {
        option.series[i].data = ydata[i];
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
    switchDateBtn() {
      this.dateChangeWatchHandle();
    },
    chartInstanceClear(instance) {
      instance ? instance.clear() : "";
    },
    headClick(item) {
      // 明细列表表头排序点击
      if (!this.$refs.customTable.tableHeadFixed) {
        window.scrollTo(0, window.scrollY);
      } else {
        this.resetScrollEleHeightCalc();
        window.scrollTo(0, this.rheight + 43);
      }

      if (!!item.sortable && this.sortColumn === item.prop) {
        if (this.sortType === "DESC") {
          this.sortType = "ASC";
        } else {
          this.sortType = "DESC";
        }
      } else if (!!item.sortable && this.sortColumn !== item.prop) {
        this.sortColumn = item.prop;
        // this.setSortColumn(item.prop);
        this.sortType = "DESC";
      }
      this.pageNo = 1;
      this.hasMore = false;
      this.queryDetailsList(this.queryDetailsParams);
    },
    loadMoreHandle() {
      if (this.detailsListLoading) {
        return;
      }
      // 滚动加载函数
      if (this.tablePropCollection.hasMore) {
        this.pageNo++;
        this.queryDetailsList(this.queryDetailsParams);
      }
    },
    // 明细列表
    async queryDetailsList(params) {
      // 查询明细数据列表
      let res;
      this.detailsListLoading = true;
      try {
        res = await this.queryListApi(params);
        if (
          !!res.data &&
          res.data.thead &&
          res.data.tbody &&
          res.data.tbody.length > 0
        ) {
          if (
            res.data.page.pageNum <= res.data.page.totalPage &&
            res.data.page.pageNum !== 1
          ) {
            this.tableBodyData = this.tableBodyData.concat(res.data.tbody);
          }
          if (this.pageNo === 1) {
            this.tableHeadData = res.data.thead;
            this.tableBodyData = res.data.tbody;
          }
          //加载时字段为空，处理默认排序  By Bing.Chan  20220714
          const isLoad = !this.sortColumn || this.sortColumn == "";
          if (isLoad || this.restTab) {
            if (this.restTab) {
              //排序完成后，重置此字段，很重要！！！
              this.restTab = false;
            }
            const info = this.tableHeadData.find(x => x.defaultSort);
            if (info) {
              this.sortColumn = info.prop;
              this.sortType =
              info.defaultSortType && info.defaultSortType != ""
                  ? info.defaultSortType
                  : "DESC";  
              this.sortType=this.sortType.toUpperCase();
            }
          }

          this.hasMore = this.pageNo < res.data.page.totalPage;
          this.$nextTick(() => {
            this.tableHasData =
              res.data.tbody !== undefined && res.data.tbody.length !== 0;
            if (this.scrollType && this.tableHeadFixed) {
              window.scrollTo(
                0,
                utils.getElementToPageTop(
                  document.getElementById("tableHead")
                ) - this.tablePropCollection.topFixed
              );
            }
            this.scrollType = false;
          });
        } else {
          this.hasMore = false;
          this.tableHeadData = [];
          this.tableBodyData = [];
        }
        this.detailsListLoading = false;
      } catch (e) {
        this.detailsListLoading = false;
      }
    },
    //饼图
    async queryPieChartData(params) {
      try {
        this.pieHasData = true;
        this.pieChartLoading = true;
        this.pieShow = true;
        let res;
        res = await this.queryPieApi(params);
        this.pieHasData = false;
        if (res.data && res.data !== undefined && res.data.length !== 0) {
          this.pieHasData = true;
          if (res.data.filter(x => x.value != 0).length == 1) {
            this.pieShow = false;
          }
        }

        if (this.pieHasData) {
          this.$loading.close();
          let option = this.pieOptionSet(res.data);
          //画折线图
          if (this.$refs.piechartContext) {
            if (this.pieChartInstance) {
              this.chartInstanceClear(this.pieChartInstance);
            }
            this.pieChartInstance = echarts.init(this.$refs.piechartContext);
            this.drawChart(this.pieChartInstance, option);
            this.pieChartLoading = false;
          }
        } else {
          this.pieHasData = false;
          this.$nextTick(() => {
            this.chartInstanceClear(this.pieChartInstance);
            this.pieChartLoading = false;
            this.$loading.close();
          });
        }
      } catch (ex) {}
    },
    //折线图
    async queryLineChartData(params) {
      this.lineHasData = true;
      this.lineChartLoading = true;
      let res;
      res = await this.queryLineApi(params);
      if (res.status === 0) {
        this.lineHasData =
          res &&
          res.data &&
          res.data.length !== 0 &&
          res.data[0].list &&
          res.data[0].list.length !== 0;
        let xdata = res.data[0].list.map(x => {
          return x.label;
        });
        let ydata = res.data.map(x => {
          return x.list.map(y => {
            return y.value;
          });
        });
        let legend = res.data.map(x => {
          return x.name;
        });
        let option = this.lineOptionSet(lineChartOption, xdata, ydata, legend);
        this.setEchartZoomOption(option, xdata);
        let that = this;
        this.$nextTick(() => {
          if (that.lineChartInstance) {
            that.chartInstanceClear(that.lineChartInstance);
          }
          that.lineChartInstance = echarts.init(that.$refs.linechartContext);
          //画折线图
          // !this.lineChartInstance
          //   ? (this.lineChartInstance = echarts.init(
          //       this.$refs.linechartContext
          //     ))
          //   : null;
          that.lineChartLoading = false;
          that.drawChart(that.lineChartInstance, option);
        });
      } else {
        this.lineHasData = false;
        this.$nextTick(() => {
          this.chartInstanceClear(this.lineChartInstance);
          this.lineChartLoading = false;
          this.$loading.close();
        });
      }
    },
    //获取切换按钮
    async queryBtnDataNew(params, callback) {
      return new Promise((resolve, reject) => {
        this.queryBtnApi(params)
          .then(res => {
            if (res.status === 0) {
              resolve(res.data);
            }
          })
          .catch(res => {
            reject(null);
          });
      });
    },
    //获取切换按钮
    async queryBtnData(params, callback) {
      let res;
      res = await this.queryBtnApi(params);
      if (res.status === 0) {
        callback(res.data);
      }
    },
    searchPanelBackHandle() {
      this.pageNo = 1;
      this.searchType = 0;
      this.queryDetailsList(this.queryDetailsParams);
    },
    //明细抽象方法
    queryListApi() {},
    //饼图抽象方法
    queryPieApi() {},
    //折线抽象方法
    queryLineApi() {},
    //柱状图抽象方法
    queryColumnApi() {},
    //切换动态按钮查询
    queryBtnApi() {}
  }
};
