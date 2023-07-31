import baseMixin from "@/mixins/base";
import { mapState, mapMutations } from "vuex";
import utils from "@/utils/utils";

import {
  queryList,
  queryTrend,
  querySource,
  queryBtn
} from "@/api/personStatistics";
import { TimeSelect } from "element-ui";

export default {
  mixins: [baseMixin],
  data: function() {
    return {
      notLinkDatas: ["合计"], //不带钻取的数据
      buttons: ["date", "month"],
      title: "人员分析",
      tableType: "operatorAnalysis",
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
      functionTypeList: [
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
      tabMenu1TypeList: [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "work",
          label: "工龄"
        }
      ],
      tabMenu2TypeList: [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "work",
          label: "工龄"
        }
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
    ...mapState("personStatistics", [
      "headerTabType",
      "functionType",
      "tabTypeTitle",
      "tabMenu1Type",
      "tabMenu2Type"
    ]),
    placeholder() {
      return "输入关键字";
    },
    pieChartTitle() {
      // const info = this.tabMenu1TypeList.find(x => x.value == this.tabMenu1Type);
      // return `${info.label}分析`;
      return "人员结构占比图";
    },
    lineChartTitle() {
      const info = this.headerTypeTypeList.find(
        x => x.value == this.headerTabType
      );
      return `人员趋势图`;
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
        function: this.functionType,
        dimension1: this.tabMenu1Type,
        dimension2: this.tabMenu2Type,
        queryDateType: utils.toConvertDateType(this.activeType)
      };
    },
    queryLineChartParams() {
      let params = {
        ...this.baseParams,
        lx: this.headerTabType,
        function: this.functionType,
        dimension1: this.tabMenu1Type,
        dimension2: this.tabMenu2Type,
        queryDateType: utils.toConvertDateType(this.activeType)
      };
      return params;
    },
    queryPieChartParams() {
      let params = {
        ...this.baseParams,
        lx: this.headerTabType,
        function: this.functionType,
        dimension1: this.tabMenu1Type,
        dimension2: this.tabMenu2Type,
        dimension2: this.tabMenu2Type,
        queryDateType: utils.toConvertDateType(this.activeType)
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
    }
  },
  methods: {
    ...mapMutations("personStatistics", [
      "setTabTypeTitle",
      "setHeaderTabType",
      "setFunctionType",
      "setTabMenu1Type",
      "setTabMenu2Type"
    ]),
    // 第一个tab(除日期)
    setHeaderTabTypeCallback() {
      this.dateChangeWatchHandle();
    },
    // 第二个tab(除日期)
    setFunctionTypeCallback() {
      this.queryTableReset();
      //第一个菜单
      this.queryBtnData(this.queryBtn1Params, data => {
        this.tabMenu1TypeList = data.list;
        this.setTabMenu1Type(data.selected); //重置
        //第二个菜单
        this.queryBtnData(this.queryBtn2Params, data1 => {
          this.tabMenu2TypeList = data1.list;
          this.setTabMenu2Type(data1.selected); //重置
          this.queryLineChartData(this.queryLineChartParams); //查询折线图
          this.queryPieChartData(this.queryPieChartParams);
          this.queryDetailsList(this.queryDetailsParams);
        });
      });
    },
    // 第三个tab(除日期)
    setTabMenu1TypeCallback() {
      //第二个菜单
      this.queryBtnData(this.queryBtn2Params, data1 => {
        this.tabMenu2TypeList = data1.list;
        this.setTabMenu2Type(data1.selected); //重置
        this.queryTableReset();
        this.queryPieChartData(this.queryPieChartParams);
        this.queryDetailsList(this.queryDetailsParams);
      });
    },
    // 第四个tab(除日期)
    setTabMenu2TypeCallback() {
      this.queryTableReset();
      this.queryDetailsList(this.queryDetailsParams);
    },
    // 时间组件的数据时间接口请求完成后通过this.$emit('dateChangeWatchHandle');
    //触发此函数
    dateChangeWatchHandle() {
      // 数据时间变化触发函数,在时间组件接口请求完成之后触发
      this.queryTableReset();
      //第一个菜单
      this.queryBtnData(this.queryBtn1Params, data => {
        this.tabMenu1TypeList = data.list;
        this.setTabMenu1Type(data.selected); //重置
        //第二个菜单
        this.queryBtnData(this.queryBtn2Params, data1 => {
          this.tabMenu2TypeList = data1.list;
          this.setTabMenu2Type(data1.selected); //重置
          this.queryDetailsList(this.queryDetailsParams); //查询明细
          this.queryLineChartData(this.queryLineChartParams); //查询折线图
          this.queryPieChartData(this.queryPieChartParams); //查询饼图
        });
      });
    },
    queryListApi: queryList,
    queryPieApi: querySource,
    queryLineApi: queryTrend,
    queryBtnApi: queryBtn
  }
};
