<template>
  <div class="yzd-page" v-wechat-title="title" ref="box">
    <header-tab
    class="6666"
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
  name: "frist",
  mixins: [mixin],
  data() {
    return {
      that: this,
      dimension: "region",
      needUpdateType: this.$route.params.needUpdateType,
      orgName: "中心人员流动"
    };
  },
  computed: {
    //日期弹框最小日期设置
    selectMinDate() {
      return dayjs('2023-04-01').format('YYYY-MM-DD')
    },
    //日期弹框最大日期设置
    selectMaxDate() {
      return this.headerTabType == "1" ? (this.activeType == 'date' ? dayjs().subtract(1, 'day').format('YYYY-MM-DD') : (this.activeType == 'month' && dayjs().date() == 1 ? dayjs().subtract(1, 'month').format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'))) : dayjs().subtract(1, 'month').format('YYYY-MM-DD')
    }
  },
  created() {
    if (this.needUpdateType == '1') {
      this.selectHandle2({ value: '1' })
    }
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
      to.params.needUpdateType = '2';
    } else {
      to.params.needUpdateType = '1';
    }
    next()
  },
  methods: {
    ...mapMutations('common', ['switchType']),

    selectHandle2({ value }) {
      if (value == '2') {
        this.switchType('month')
        this.height = 40
      } else {
        this.setButtons(["date", "month", "year"])
        this.height = 80
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
      Session.setJson("weiyi", 2);
      let path = `/personLossKeep/center`;
      let query = {
        orgCode: encodeURIComponent(item.orgCode),
        orgName: encodeURIComponent(item.orgName),
        orgLevel: encodeURIComponent(item.orgLevel),
        ifHasNext: 1
      };
      this.$router.push({
        path: path,
        query: query,
      });
    },
  },
};
</script>
