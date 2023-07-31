<template>
  <div class="yzd-page" v-wechat-title="title" ref="box">
    <header-tab
      @selectHandle="
        (...args) =>
          selectHandle(
            'headerTabType',
            'setHeaderTabType',
            args[0],
            setHeaderTabTypeCallback
          )
      "
      :active="headerTabType"
      :tabContent="headerTypeTypeList"
    >
    </header-tab>
    <div class="fixed-wrapper" :style="{ height: height + 'px' }">
      <div class="fixed-box" ref="fixedBox">
        <date-panel
          class="fixed-elem common-date-box"
          @select="openPicker"
          queryFlag="new"
          :buttons="buttons"
          :tableType="tableType"
          @timeupdate="dateChangeWatchHandle"
          @switchDateBtn="switchDateBtn"
        >
        </date-panel>
      </div>
    </div>

    <!--line chart 折线图-->
    <card-box
      :title="`${lineChartTitle}`"
      :hasData="lineHasData"
      :pageLoading="lineChartLoading"
      class="reset-scroll-elem"
    >
      <div class="line-chart-box" ref="linechartContext" slot="chart"></div>
    </card-box>

    <!--明细列表-->
    <custom-table
      @headClick="headClick"
      @loadMore="loadMoreHandle"
      ref="customTable"
      :props="tablePropCollection"
      :topFixed="topFixed"
    >
      <yto-search-panel
      v-if="searchPanelShow()"
        :orgCode="orgCode"
        :dimension="dimensionType"
        :placeholder="placeholder"
        :getParams="getSearchParams"
        slot="searchPanel"
        :orgLevel="orgLevel"
        @select="handlerSelectOrgCode"
        :queryListAPI="queryListApi"
      ></yto-search-panel>
      <span class="refresh-btn" @click="searchPanelBackHandle" slot="back"
        >返回</span
      >
      <template v-slot:list="scope">
        <li
          v-for="(headItem, headIndex) in tableHeadData"
          v-if="headItem.show"
          :key="headIndex"
          :data-prop="headItem.prop"
          @click="(e) => rowClickFilter(scope.item, headItem.prop)"
          :class="{
            'blue-li':
              headItem.click && !notLinkDatas.includes(scope.item.orgName),
          }"
        >
          <span
            v-html="
              $options.filters.columnTransfer(
                scope.item[headItem.prop],
                headItem.label,
                that
              )
            "
          ></span>
        </li>
      </template>
    </custom-table>

    <yto-date-range
      ref="picker"
      :value="
        activeType === 'custom' ? [customStartDay, customEndDay] : currentDate
      "
      :dateType="activeType"
      @confirm="confirmDate"
    >
    </yto-date-range>
  </div>
</template>
  <script>
import mixin from "./mixin/mixin.js";
import { Session } from "@/utils/storge";
import  dayjs  from 'dayjs'

export default {
  name: "frist",
  mixins: [mixin],
  dimension: "region",

  data() {
    return {};
  },
  created() {},
  methods: {
    searchPanelShow() {
      return this.dimensionType == "org";
    },
    rowClickFilter(item, prop) {
      this.rowClickFlag = true;

      if (this.dimensionType == "CUSTOM") return;
      let path = `/employ/details`;
      let query = {
        emplid:encodeURIComponent(item.emplid),
        lx: this.headerTabType,
        orgDimension: this.dimensionType,
        queryDate: dayjs(this.currentDate).format("YYYY-MM-DD"),
        queryType: this.activeType,
      };
      this.$router.push({
        path: path,
        query: query,
      });
    },
  },
};
</script>