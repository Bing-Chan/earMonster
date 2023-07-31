import personExceptionNewMixin from "@/mixins/personExceptionNew";
import { mapState, mapMutations } from "vuex";
// import utils from "@/utils/utils";
import { queryList, queryTrend, querySource } from "@/api/personExceptionNew";
// import dayjs from "dayjs";

// 引入 ECharts 主模块
const echarts = require("echarts/lib/echarts");
// 引入标题
require("echarts/lib/component/legend");
// 引入柱状图
require("echarts/lib/chart/line");
require("echarts/lib/chart/bar");
require("echarts/lib/chart/pie");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/dataZoom");

export default {
  mixins: [personExceptionNewMixin],
  data: function() {
    return {
      notLinkDatas: ["合计"], //不带钻取的数据
      orgCodeLine: "",
      orgCodeLineName: "",
      toPersonFlag: "", //	是否人员明细
      deptEndFlag: false, //	是否人员明细
      keyJob: "",
      buttons: [],
      title: "数据治理",
      tableTitle: "明细数据",
      tableType: "personException",
      headerTypeTypeList: [
        {
          value: "1",
          label: "全部"
        },
        {
          value: "2",
          label: "直营"
        },
        {
          value: "3",
          label: "加盟"
        }
      ],
      zyjmTypeList: [
        {
          value: "0",
          label: "国内"
        },
        {
          value: "1",
          label: "国际"
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
      // 岗位条线：营运线、网管线、营销线、客服线、质控线、财务线、人资线、中心操作线、其他
      tabMenu1TypeList: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "yyx",
          label: "营运线"
        },
        {
          value: "wgx",
          label: "网管线"
        },
        {
          value: "yxx",
          label: "营销线"
        },
        {
          value: "kfx",
          label: "客服线"
        },
        {
          value: "zkx",
          label: "质控线"
        },
        {
          value: "cwx",
          label: "财务线"
        },
        {
          value: "rzx",
          label: "人资线"
        },
        {
          value: "zxczx",
          label: "中心操作线"
        },
        {
          value: "qitaxian",
          label: "其他"
        }
      ],
      // 其他条线：经营管理线、安保监察线、总部职能线、公关线、行政线、后勤线、IT线、航空线、操作支持线、直营分公司线、集团线、IE线、集配线、亚运项目线、其他（未在以上条线中的人员）
      tabMenu2TypeList: [
        {
          value: "jyglx",
          label: "经营管理线"
        },
        {
          value: "abjcx",
          label: "安保监察线"
        },
        {
          value: "zbznx",
          label: "总部职能线"
        },
        {
          value: "ggx",
          label: "公关线"
        },
        {
          value: "xzx",
          label: "行政线"
        },
        {
          value: "hqx",
          label: "后勤线"
        },
        {
          value: "itx",
          label: "IT线"
        },
        {
          value: "hkx",
          label: "航空线"
        },
        {
          value: "czzcx",
          label: "操作支持线"
        },
        {
          value: "zyfgsx",
          label: "直营分公司线"
        },
        {
          value: "jtx",
          label: "集团线"
        },
        {
          value: "iex",
          label: "IE线"
        },
        {
          value: "jpx",
          label: "集配线"
        },
        {
          value: "yyxmx",
          label: "亚运项目线"
        },
        {
          value: "qtx",
          label: "其他线"
        }
      ],
      tabMenu3TypeList: [
        {
          value: "-1",
          label: "全部"
        },
        {
          value: "jmWdYwy",
          label: "业务员"
        },
        {
          value: "jmWdKf",
          label: "客服"
        },
        {
          value: "jmWdCzy",
          label: "操作工"
        },
        {
          value: "jmWdFgsfzr",
          label: "分公司负责人"
        },
        {
          value: "jmWdFbfzr",
          label: "分部负责人"
        },
        {
          value: "jmYzDz",
          label: "驿站店长"
        }
      ],
      tabMenu4TypeList: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "4",
          label: "待治理"
        },
        {
          value: "0",
          label: "待审核"
        },
        {
          value: "2",
          label: "已治理"
        }
      ],
      format: {
        link: [], // 链接
        flagEnum: ["治理进度"]
      },
      demoType: "1"
    };
  },
  computed: {
    ...mapState("personExceptionNew", [
      "headerTabType",
      "zyjmType",
      "functionType",
      "tabTypeTitle",
      "tabMenu1Type",
      "tabMenu2Type",
      "tabMenu3Type",
      "tabMenu4Type"
    ]),
    placeholder() {
      return this.deptEndFlag ? " 请输入姓名" : "请输入组织";
    },
    pieChartTitle() {
      return "数据治理总进度";
    },
    lineChartTitle() {
      return `数据治理趋势图`;
    },
    queryParams() {
      let params = {
        ...this.baseParams,
        internationalFlag: this.headerTabType == 1 ? 1 : 3,
        orgArea: this.zyjmType,
        keyJob: this.keyJob
      };
      return params;
    }
  },
  methods: {
    ...mapMutations("personExceptionNew", [
      "setTabTypeTitle",
      "setHeaderTabType",
      "setZyjmType",
      "setFunctionType",
      "setTabMenu1Type",
      "setTabMenu2Type",
      "setTabMenu3Type",
      "setTabMenu4Type"
    ]),
    getData() {
      this.queryTableReset();
      this.refTable();
      this.queryLineChartData(); // 查询柱状图+折线图数据
      if (!this.deptEndFlag) {
        this.queryPieChartData(); // 查询饼图数据
      } else {
        this.pieHasData = true;
        this.pieChartLoading = true;
        let option = this.pieOptionSet([
          {
            value: this.deptEndFlag ? this.yzlNum : res.data.yzlNum || 0,
            name: "已治理"
          },
          {
            value: this.deptEndFlag ? this.dzlNum : res.data.dzlNum || 0,
            name: "待治理"
          },
          {
            value: this.deptEndFlag ? this.dshSumNum : res.data.yzlNum || 0,
            name: "待审核"
          }
        ]);
        // 画饼图
        if (this.$refs.piechartContext) {
          if (this.pieChartInstance) {
            this.chartInstanceClear(this.pieChartInstance);
          }
          this.pieChartInstance = echarts.init(this.$refs.piechartContext);
          this.drawChart(this.pieChartInstance, option);
          this.pieChartLoading = false;
        }
      }
      if (
        this.headerTabType == 2 ||
        (this.headerTabType == 3 && this.tabMenu3Type != "")
      ) {
        this.queryDetailsList(); // 查询表格数据
      }
    },
    // 顶部tab回调
    setHeaderTabTypeCallback() {
      if (this.$route.query.orgCode && this.$route.query.orgName) {
        let query = {};
        let path = `/personException/first`;
        let h = this.pageHistory + 1;
        this.setPageHistory(h);
        this.$router.push({
          path: path,
          query: query
        });
      } else {
        this.setDefaultData(true);
        this.getData();
      }
    },
    setDefaultData(reset) {
      if (reset) {
        this.setZyjmType("0");
        this.setFunctionType("attributes");
        this.setTabMenu1Type("");
        this.setTabMenu2Type("");
        this.setTabMenu3Type("-1");
      }
      this.queryTableReset();
      this.refTable();
      if (this.headerTabType == 1) {
        this.orgCode = "";
        this.orgName = "";
        this.orgCodeLine = "";
        this.keyJob = "";
      } else if (this.headerTabType == 2) {
        if (this.zyjmType == 0) {
          this.orgCode = "ZY";
          this.orgName = "国内";
          this.orgCodeLine = "ZY";
          this.keyJob = "zy";
        } else if (this.zyjmType == 1) {
          this.orgCode = "ZB";
          this.orgName = "国际";
          this.orgCodeLine = "ZY|ZB";
          this.keyJob = "zy";
        }
      } else if (this.headerTabType == 3) {
        this.orgCode = "JM";
        this.orgName = "加盟";
        this.orgCodeLine = "JM";
        this.keyJob = "QG";
      }
    },
    // 直营加盟回调
    setSetZyjmTypeCallback() {
      this.setFunctionType("attributes");
      this.setTabMenu1Type("");
      this.setTabMenu2Type("");
      this.setTabMenu3Type("-1");
      this.queryTableReset();
      if (this.zyjmType == 0) {
        this.orgCode = "ZY";
        this.orgName = "国内";
        this.orgCodeLine = "ZY";
        this.keyJob = "zy";
      } else if (this.zyjmType == 1) {
        this.orgCode = "ZB";
        this.orgName = "国际";
        this.orgCodeLine = "ZY|ZB";
        this.keyJob = "zy";
      }
      this.getData();
    },
    // 用工属性和岗位条线回调
    setFunctionTypeCallback() {
      // 数据时间变化触发函数,在时间组件接口请求完成之后触发
      if (this.functionType == "attributes") {
        this.getData();
      } else if (this.functionType == "line") {
        this.setTabMenu1Type("");
        this.setTabMenu2Type("");
        this.keyJob = "zy";
        this.getData();
      }
    },
    // 直营回调
    setTabMenu1TypeCallback() {
      if (this.tabMenu1Type == "qitaxian") {
        this.setTabMenu2Type(this.tabMenu2TypeList[0].value);
        this.keyJob = this.tabMenu2TypeList[0].value;
        this.setTabMenu2TypeCallback();
      } else {
        this.keyJob = this.tabMenu1Type || "zy";
        this.getData();
      }
    },
    // 直营其他回调
    setTabMenu2TypeCallback() {
      this.keyJob = this.tabMenu2Type;
      this.getData();
    },
    // 加盟回调
    setTabMenu3TypeCallback() {
      this.keyJob = this.tabMenu3Type == "-1" ? "QG" : this.tabMenu3Type;
      this.getData();
    },
    // 人员列表回调
    setTabMenu4TypeCallback() {
      this.auditState = this.tabMenu4Type;
      this.getData();
    },
    // 刷新table
    refTable() {
      this.tableHeadData = [];
      this.tableBodyData = [];
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
    isLink(item, prop) {
      // 不钻取字典处理
      if (this.notLinkDatas.includes(item.orgName)) {
        return false;
      }
      // 部门人数等于0不可点
      if (item.orgCode && item.orgName && !item.num) {
        return false;
      }
      // debugger
      // // 最后一层人员明细处理
      // if (!item.clickFlag && item.deptEndFlag) {
      //   return false;
      // }
      return true;
    },
    queryListApi: queryList,
    queryPieApi: querySource,
    queryLineApi: queryTrend
  }
};
