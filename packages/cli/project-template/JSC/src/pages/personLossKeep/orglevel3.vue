<template>
  <div class="yzd-page" v-wechat-title="title" ref="box">
    <header-tab
    v-if="orgLevel == 1"
    @selectHandle="
      (...args) => {
        selectHandle(
          'headerTabType',
          'setHeaderTabType',
          args[0],
          setHeaderTabTypeCallback
        )
        selectHandle2(
          args[0],
          setHeaderTabTypeCallback
        )

      }" :active="headerTabType" :tabContent="headerTypeTypeList"></header-tab>
    <div class="fixed-wrapper" :style="{ height: height + 'px' }">
      <div class="fixed-box" ref="fixedBox">
        <date-panel style="overflow:hidden" class="fixed-elem common-date-box" @select="openPicker" queryFlag="new"
          :buttons="cbuttons" :tableType="tableType" :pageType="'LossKeepBase'" @timeupdate="dateChangeWatchHandle"
          @switchDateBtn="switchDateBtn" :style="{ height: height + 'px' }">
        </date-panel>
      </div>
    </div>
    <dimension-box :dimensionData="chartTabList" :active="chartTabType" v-if="monthShow()" class="reset-scroll-elem"
      @selectHandle="
        (...args) =>
          selectHandle(
            'chartTabType',
            'setChartTabType',
            args[0],
            setChartTabTypeCallback,
          )
      " />

    <!--line chart-->
    <card-box :title="`人员${lineChartTitle}`" :hasData="lineHasData" :pageLoading="lineChartLoading"
      class="reset-scroll-elem">
      <div v-if="headerTabType == 1" slot="topSelect">
        <line-dimension-select :dimensionArr="lzchartTabList" :tendType="lineType" @handleCenterType="(...args) => selectHandle(
          'lineType',
          'setLineType',
          args[0],
          setLineTypeCallback
        )"></line-dimension-select>
      </div>
      <div class="line-chart-box" ref="linechartContext" slot="chart"></div>
    </card-box>

    <custom-table @headClick="headClick" @loadMore="loadMoreHandle" ref="customTable" :props="tablePropCollection"
      :topFixed="topFixed">
      <yto-search-panel :orgCode="orgCode" :dimension="dimensionType" :placeholder="placeholder"
        :getParams="getSearchParams" slot="searchPanel" :orgLevel="orgLevel" @select="handlerSelectOrgCode"
        :queryListAPI="queryListApi"></yto-search-panel>
      <span class="refresh-btn" @click="searchPanelBackHandle" slot="back">返回</span>
      <template v-slot:list="scope">
        <li v-for="(headItem, headIndex) in tableHeadData" v-if="headItem.show" :key="headIndex"
          :data-prop="headItem.prop" @click="(e) => rowClickFilter(scope.item, headItem.prop)" :class="{
            'blue-li':
              headItem.click && !notLinkDatas.includes(scope.item.orgName),
          }">
          <span v-html="
            $options.filters.columnTransfer(
              scope.item[headItem.prop],
              headItem.label,
              that
            )
          "></span>
        </li>
      </template>
    </custom-table>
    <yto-date-range ref="picker" :value="
      activeType === 'custom' ? [customStartDay, customEndDay] : currentDate
    " :dateType="activeType" @confirm="confirmDate" :selectMaxDate="selectMaxDate" :selectMinDate="selectMinDate"
      :minYear="2021" :yearRange="1">
    </yto-date-range>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import mixin from "./mixin/mixin.js";
import { Session } from "@/utils/storge";
import { mapState, mapMutations } from 'vuex'
export default {
  name: "orglevel3",
  mixins: [mixin],
  data() {
    return {
      that: this,
      dimension: "region",
      needUpdateType: this.$route.params.needUpdateType
    };
  },
  computed: {
    selectMinDate() {
      return dayjs('2023-04-01').format('YYYY-MM-DD')
    },
    selectMaxDate() {
      return this.headerTabType == "1" ? (this.activeType == 'date' ? dayjs().subtract(1, 'day').format('YYYY-MM-DD') : (this.activeType == 'month' && dayjs().date() == 1 ? dayjs().subtract(1, 'month').format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'))) : dayjs().subtract(1, 'month').format('YYYY-MM-DD')
    }
  },
  created() {
    this.selectHandle2({ value: '1' })
    this.height = 80
  },
  mounted() {
    let userInfo = Session.getJson("user");
    this.title = decodeURI('中心人员流动');
    if (this.headerTabType == "1") {
      this.height = 80
    } else {
      this.height = 40
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === '/personLossKeep/center') {
      to.params.needUpdateType = '1';
    } else {
      to.params.needUpdateType = '2';
    }
    next()
  },
  methods: {
    ...mapMutations('common', ['switchType']),

    selectHandle2({ value }) {
      if (value == '2') {
        this.setButtons(["month"])
        this.height = 40
        this.queryDetailsParams.sortColumn = "keepRate"
        this.queryDetailsParams.sortType = "ASC"
        let Datepermission = Session.getJson("Datepermission")
        let userInfo = Session.getJson("user");
        if (Datepermission.KeepFlag == 1) {
          let path = `/personLossKeep/first`;
          let query = {
            orgCode: "",
            orgName: encodeURIComponent("中心人员流动"),
            orgLevel: 1,
          };
          this.$router.push({
            path: path,
            query: query,
          });
        }
        if (Datepermission.KeepFlag == 2) {
          Session.setJson("qiao", 2);
          let path = `/personLossKeep/center`;
          let query = {
            orgCode: "",
            orgName: this.$route.query.orgName,
            orgLevel: 2,
          };
          this.$router.push({
            path: path,
            query: query,
          });
        }
      } else {
        this.setButtons(["date", "month", "year"])
        this.height = 80
        //   this.sortColumn= "dimissionRate"
        // this.sortType="DESC"
        this.queryDetailsParams.sortColumn = "dimissionRate"
        this.queryDetailsParams.sortType = "DESC"
      }
    },
    //重置维度筛选
    searchPanelShow() {
      return this.dimensionType == "org";
    },
    //   pieChartShow() {
    //     return this.chartTabType != "all";
    //   },
    monthShow() {
      return this.headerTabType !== "1"
    },
    rowClickFilter(item, prop) {
      this.rowClickFlag = true;
      if (item.ifHasNext == 1) {
        Session.setJson("weiyi", 2);
        let path = `/personLossKeep/orglevel4`;
        let query = {
          orgCode: encodeURIComponent(item.orgCode),
          orgName: encodeURIComponent(item.orgName),
          orgLevel: encodeURIComponent(item.orgLevel),
          orgFullCode: item.orgFullCode,
          ifHasNext: 1
        };
        this.$router.push({
          path: path,
          query: query,
        });
      } else if (item.ifHasNext == 0) {
        let path = `/personLossKeep/personnelDetail`;
        let query = {
          orgCode: encodeURIComponent(item.orgCode),
          orgName: encodeURIComponent(item.orgName),
          orgLevel: encodeURIComponent(item.orgLevel),
          orgFullCode: item.orgFullCode,
          ifHasNext: 0
        };
        this.$router.push({
          path: path,
          query: query,
        });
      }
      else {
        return false
      }
    },
  },
};
</script>

