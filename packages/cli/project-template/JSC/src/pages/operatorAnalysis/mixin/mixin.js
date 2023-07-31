import baseMixin from "@/mixins/base";
import { mapState, mapMutations } from "vuex";
import { queryList, queryTrend, querySource } from "@/api/operatorAnalysis";

export default {
  mixins: [baseMixin],
  data: function() {
    return {
      notLinkDatas: ["合计"], //不带钻取的数据
      buttons: ["date", "month", "year"],
      title: "中心操作人员",
      tableType: "operatorAnalysis",
      dimensionTypeTypeList: [
        {
          value: "org",
          label: "组织维度"
        },
        {
          value: "job",
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
      ///all-全部|work-工龄|age-年龄|degree-学历|sex-性别|recruitment-来源
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
          label: "来源"
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
    ...mapState("operatorAnalysis", [
      "headerTabType",
      "chartTabType",
      "tabTypeTitle",
      "dimensionType"
    ]),
    placeholder() {
      return "输入关键字";
    },
    pieChartTitle() {
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
        orgDimension: this.dimensionType
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
