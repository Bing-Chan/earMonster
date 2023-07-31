<template>
  <div class="yzd-page" v-wechat-title="title" ref="box">
    <header-tab @selectHandle="
      (...args) =>
        selectHandle(
          'headerTabType',
          'setHeaderTabType',
          args[0],
          setHeaderTabTypeCallback
        )
    " :active="headerTabType" :tabContent="headerTypeTypeList">
    </header-tab>
    <div class="fixed-wrapper" :style="{ height: height + 'px' }">
      <div class="fixed-box" ref="fixedBox">
        <show-date class="fixed-elem common-date-box"></show-date>
      </div>
    </div>

    <!--line chart 折线图-->
    <card-box :title="`${lineChartTitle}`" :hasData="lineHasData" :pageLoading="lineChartLoading"
      class="reset-scroll-elem">
      <div class="line-chart-box" ref="linechartContext" slot="chart"></div>
    </card-box>

    <!--pie chart-->
    <card-box v-if="headerTabType == '0' && functionType == 'line' && pieShow" :title="pieChartTitle"
      :pageLoading="pieChartLoading" :hasData="pieHasData" class="reset-scroll-elem">
      <div class="pie-chart-box" ref="piechartContext" slot="chart"></div>
    </card-box>

    <!--bar menu-->
    <legend-select v-if="isZhiYing && functionType == 'line'" @selectHandle="
      (...args) =>
        selectHandle(
          'tabMenu1Type',
          'setTabMenu1Type',
          args[0],
          setTabMenu1TypeCallback
        )
    " :active="tabMenu1Type" :tabContent="tabMenu1TypeList"></legend-select>
    <legend-select v-if="isZhiYing && functionType == 'line' && tabMenu1Type == '其他'" @selectHandle="
      (...args) =>
        selectHandle(
          'tabMenu2Type',
          'setTabMenu2Type',
          args[0],
          setTabMenu2TypeCallback
        )
    " :active="tabMenu2Type" :tabContent="tabMenu2TypeList"></legend-select>

    <!--明细列表-->
    <custom-table @headClick="headClick" @loadMore="loadMoreHandle" ref="customTable" :props="tablePropCollection"
      :topFixed="topFixed">
      <yto-search-panel :placeholder="placeholder" slot="searchPanel" :orgLevel="orgLevel" :getParams="getSearchParams"
        @select="handlerSelectOrgCode" :queryListAPI="queryListApi"></yto-search-panel>
      <span class="refresh-btn" @click="searchPanelBackHandle" slot="back">返回</span>
      <template v-slot:list="scope">
        <li v-for="(headItem, headIndex) in tableHeadData.filter(x => x.show)" :key="headIndex" :data-prop="headItem.prop"
          @click="(e) => rowClickFilter(scope.item, headItem.prop)" :class="{
            'blue-li': headItem.click && isLink(scope.item, headItem),
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
    " :dateType="activeType" @confirm="confirmDate">
    </yto-date-range>
  </div>
</template>
<script>
import mixin from "./mixin/mixin.js";
import { Session } from "@/utils/storge";
export default {
  name: "frist",
  mixins: [mixin],
  dimension: "region",

  data() {
    return {
      demoType: "2"
    };
  },
  created() {
    window.onhashchange = (e) =>{
      if(e.oldURL.includes("personException/secound")){
        //锁定后退返回
        let h =this.pageHistory- 1;
        this.setPageHistory(h);
      }
    }
  },
  methods: {
    searchPanelShow() {
      return false
    },
    // 第一个tab(除日期)
    setHeaderTabTypeCallback() {
        this.$router.replace({
          path: "/personException/first",
        });
    },
    pieChartShow() {
      return this.chartTabType != "all";
    },
    rowClickFilter(item, prop) {
      if (!this.isLink(item, prop)) {
        return false;
      }
      let query = {
        orgCode: encodeURIComponent(item.orgCode),
        orgName: encodeURIComponent(item.orgName),
        orgLevel: encodeURIComponent(""),
        orgCodeLine: encodeURIComponent(this.getOrgCodeLine(item.orgCodeLine, item.orgCode)),
        orgCodeLineName: encodeURIComponent(this.getOrgCodeLine(item.orgCodeLineName, item.orgName)),
        deptEndFlag: encodeURIComponent(item.deptEndFlag),
        toPersonFlag: item.toPersonFlag,
      };
      let path = `/personException/secound/${item.orgCode}`;
      if (item.deptEndFlag) {
        path = `/personException/person`;
      } else {
        let h = this.pageHistory + 1;
        this.setPageHistory(h);
      }
      this.$router.push({
        path: path,
        query: query,
      });
    },
  },
};
</script>