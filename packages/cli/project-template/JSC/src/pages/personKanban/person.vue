<template>
  <div class="yzd-page" v-wechat-title="title" ref="box">
    <div class="fixed-wrapper" :style="{ height: height + 'px' }">
      <div class="fixed-box"   ref="fixedBox">
        <show-date   class="fixed-elem common-date-box"></show-date>
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
        :placeholder="placeholder"
        slot="searchPanel"
        :orgLevel="orgLevel"
        :getParams="getSearchParams"
        @select="handlerSelectOrgCode"
        :queryListAPI="queryListApi"
      ></yto-search-panel>
      <span class="refresh-btn" @click="searchPanelBackHandle" slot="back"
        >返回</span
      >
      <template v-slot:list="scope">
        <li
          v-for="(headItem, headIndex) in tableHeadData.filter(x =>x.show)"
          :key="headIndex"
          :data-prop="headItem.prop"
          @click="(e) => rowClickFilter(scope.item, headItem.prop)"
          :class="{
            'blue-li':
            headItem.click&& !notLinkDatas.includes(scope.item.orgName)&& scope.item.clickFlag,
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
import dayjs from "dayjs";

export default {
  name: "frist",
  mixins: [mixin],
  dimension: "region",

  data() {
    return {
      demoType: "3"
    };
  },
  created() {
  },
  computed:{
    placeholder(){
      return "请输入姓名";
    }
  },
  methods: {
    searchPanelShow() {
      return this.dimensionType == "org";
    },
    // 第一个tab(除日期)
    setHeaderTabTypeCallback() {
      this.$router.push({
          path: "/personKanban/first",
        });
    },
    pieChartShow() {
      return this.chartTabType != "all";
    },
    rowClickFilter(item, prop) {
      if(this.notLinkDatas.includes(item.orgName)||!item.clickFlag){
        return  false;
      }

      let path = `/employ/detailsNew`;
      let query = {
        emplid:  encodeURIComponent(item.empid),
      };
      this.$router.push({
        path: path,
        query: query,
      });
    },
  },
};
</script>