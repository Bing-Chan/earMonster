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
    ></header-tab>
    <div class="fixed-wrapper" :style="{ height: height + 'px' }">
      <div class="fixed-box" ref="fixedBox">
        <date-panel
          v-if="first"
          class="fixed-elem common-date-box"
          @select="openPicker"
          queryFlag="new"
          :buttons="buttons"
          :tableType="tableType"
          @timeupdate="dateChangeWatchHandle"
          @switchDateBtn="switchDateBtn"
        >
        </date-panel>
        <show-date v-else class="fixed-elem common-date-box"></show-date>
      </div>
    </div>

    <!--line chart-->
    <card-box
      :title="lineChartTitle"
      :hasData="lineHasData"
      :pageLoading="lineChartLoading"
      class="reset-scroll-elem"
    >
      <div class="line-chart-box" ref="linechartContext" slot="chart"></div>
    </card-box>

    <!--bar menu-->
    <legend-select
      @selectHandle="
        (...args) =>
          selectHandle(
            'chartTabType',
            'setChartTabType',
            args[0],
            setChartTabTypeCallback
          )
      "
      :active="chartTabType"
      :tabContent="chartTabList"
    ></legend-select>

    <!--切换按钮-->
    <dimension-box
      v-if="first"
      :dimensionData="dimensionTypeTypeList"
      :active="dimensionType"
      class="reset-scroll-elem"
      @selectHandle="
        (...args) =>
          selectHandle(
            'dimensionType',
            'setDimensionType',
            args[0],
            setDimensionTypeCallback
          )
      "
    />

    <!--pie chart-->
    <card-box
      :title="pieChartTitle"
      v-if="pieChartShow()"
      :pageLoading="lineChartLoading"
      :hasData="pieHasData"
      class="reset-scroll-elem"
    >
      <div class="pie-chart-box" ref="piechartContext" slot="chart"></div>
    </card-box>

    <!--自定义表格-->
    <custom-table
      @headClick="headClick"
      @loadMore="loadMoreHandle"
      ref="customTable"
      :props="tablePropCollection"
      :topFixed="topFixed"
    >
      <yto-search-panel
        :initValue="initValue"
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
                 'blue-li': headItem.click && !notLinkDatas.includes(scope.item.orgName),
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
export default {
  name: "secoud",
  mixins: [mixin],
  data() {
    return {
      that: this,
      dimension: "region",
    };
  },

  methods: {
    //重置维度筛选
    searchPanelShow() {
      return this.dimensionType == "org";
    },
    pieChartShow() {
      return this.chartTabType != "all";
    },
    rowClickFilter(item, prop) {
      //钻取时间
      this.rowClickFlag = true;
      let path = "/operatorAnalysis/post";
      let query = {
        orgCode: encodeURIComponent(item.orgCode),
        orgName: encodeURIComponent(item.orgName),
        orgLevel: encodeURIComponent(item.orgLevel),
      };
      this.$router.push({
        path: path,
        query: query,
      });
    },
  },
};
</script>
