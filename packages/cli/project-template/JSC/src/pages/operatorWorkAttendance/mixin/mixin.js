import baseMixin from "@/mixins/base";
import { mapState, mapMutations } from "vuex";
import { queryList, queryTrend } from "@/api/operatorWorkAttendance";
import dayjs from "dayjs";
import { Session } from "@/utils/storge";

export default {
  mixins: [baseMixin],
  data() {
    return {
      orgCode: "",
      orgName: "全国",
      orgLevel:"2", //	数据类型
      notLinkDatas:["合计", "1"],//不带钻取的数据 
      buttons: [],
      title: "操作工考勤",
      height: 40,
      tableType: "operatorWorkAttendance",
      headerTypeTypeList: [
        {
          value: "1",
          label: "全部"
        },
        {
          value: "2",
          label: "固定工"
        },
        {
          value: "3",
          label: "计时工"
        },{
          value: "4",
          label: "项目外包工"
        },
        {
          value: "5",
          label: "试工"
        }
      ],
      ///all-总工时|count-出勤人数
      chartTabList: [
        {
          value: "2",
          label: "出勤人数"
        },
        {
          value: "1",
          label: "总工时"
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
    ...mapState("operatorWorkAttendance", [
      "headerTabType",
      "lineType",
      "tabTypeTitle",
    ]),
    placeholder() {
      return "输入组织";
    },
    lineChartTitle() {
      const info = this.headerTypeTypeList.find(
        x => x.value == this.headerTabType
      );
      return `${this.orgName}${ info.label == '全部'? '考勤' : info.label}`;
    },
    queryDetailsParams() {
      // 明细列表参数
      return {
        ...this.baseParams,
        pageNo: this.pageNo,
        limit: 20,
        lineType: this.lineType,
        lx: this.headerTabType,
        sortColumn: this.sortColumn,
        sortType: this.sortType,
      };
    },
    queryLineChartParams() {
      let params = {
        ...this.baseParams,
        tabType: this.tabType,
        lx: this.headerTabType,
        lineType: this.lineType
      };
      return params;
    },
  },
  methods: {
    ...mapMutations("operatorWorkAttendance", [
      "setHeaderTabType",
      "setLineType",
      "setTabTypeTitle",
    ]),
    ...mapMutations("common", [
      "setCurrentDate"
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
    },
    queryListApi: queryList,
    queryLineApi: queryTrend,
    //切换折线图选择回调
    handleCenterType(item) {
      this.setLineType(item.value)
      this.queryLineChartData(this.queryLineChartParams);
    }
  },
  
};
