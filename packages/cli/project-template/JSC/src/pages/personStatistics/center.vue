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
        <date-panel class="fixed-elem common-date-box" @select="openPicker" queryFlag="new" :buttons="buttons"
          :tableType="tableType" @timeupdate="dateChangeWatchHandle" @switchDateBtn="switchDateBtn">
        </date-panel>
      </div>
    </div>

    <dimension-box :dimensionData="functionTypeList" :active="functionType" class="reset-scroll-elem" @selectHandle="
      (...args) =>
        selectHandle(
          'functionType',
          'setFunctionType',
          args[0],
          setFunctionTypeCallback
        )
    " />

    <!--line chart 折线图-->
    <card-box :title="`${lineChartTitle}`" :hasData="lineHasData" :pageLoading="lineChartLoading"
      class="reset-scroll-elem">
      <div class="line-chart-box" ref="linechartContext" slot="chart"></div>
    </card-box>

    <!--bar menu-->
    <legend-select @selectHandle="
      (...args) =>
        selectHandle(
          'tabMenu1Type',
          'setTabMenu1Type',
          args[0],
          setTabMenu1TypeCallback
        )
    " :active="tabMenu1Type" :tabContent="tabMenu1TypeList"></legend-select>

    <!--pie chart-->
    <card-box :title="pieChartTitle" :pageLoading="pieChartLoading" :hasData="pieHasData" class="reset-scroll-elem">
      <div class="pie-chart-box" ref="piechartContext" slot="chart"></div>
    </card-box>

    <!--bar2 menu-->
    <legend-select v-if="tabMenu2TypeShow" @selectHandle="
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
      <yto-search-panel v-if="searchPanelShow()" :orgCode="orgCode" :dimension="dimensionType" :placeholder="placeholder"
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
    " :dateType="activeType" @confirm="confirmDate">
    </yto-date-range>
  </div>
</template>
<script>
import mixin from "./mixin/mixin.js";
import { Session } from "@/utils/storge";
import dayjs from 'dayjs'
export default {
  name: "frist",
  mixins: [mixin],
  dimension: "region",

  data() {
    return {
    };
  },
  created() { },
  methods: {
    searchPanelShow() {
      return this.dimensionType == "org";
    },

    pieChartShow() {
      return this.chartTabType != "all";
    },
    rowClickFilter(item, prop) {
      this.rowClickFlag = true;
      if (
        this.notLinkDatas.includes(this.headerTabType) ||
        this.notLinkDatas.includes(item.orgName)
      ) {
        return false;
      } else {

        // if(this.functionType!=="2"){
        let path = `/personStatistics/post`;
        let query = {
          orgCode: encodeURIComponent(item.orgCode),
          orgName: encodeURIComponent(item.orgName),
          orgLevel: encodeURIComponent(item.orgLevel),
          ifHasNext: encodeURIComponent(item.ifHasNext),
        };
        this.$router.push({
          path: path,
          query: query,
        });
        // }
        // else{

        // let tt = {
        //   pageNo: this.pageNo,
        //   limit: 20,
        //   sortColumn: this.sortColumn,
        //   sortType: this.sortType,
        //   lx: this.headerTabType,
        //   function: this.functionType,
        //   dimension1: this.tabMenu1Type,
        //   dimension2: this.tabMenu2Type,

        //   orgCode: encodeURIComponent(item.orgCode),
        //   orgName: encodeURIComponent(item.orgName),
        //   orgLevel: encodeURIComponent(item.orgLevel),
        //   ifHasNext: encodeURIComponent(item.ifHasNext),
        //   queryDate: dayjs(this.currentDate).format("YYYY-MM-DD"),
        //   queryDateType: this.activeType,
        // };

        //  const res=this.queryDetailsList(tt);

        //  const dd= res.data.tbody[1]

        //       let path = `/personStatistics/childone`;
        //     let querydd = {
        //       orgCode: encodeURIComponent(dd.orgCode),
        //       orgName: encodeURIComponent(dd.orgName),
        //       orgLevel: encodeURIComponent(dd.orgLevel),
        //       ifHasNext: encodeURIComponent(dd.ifHasNext),
        //     };
        //     this.$router.push({
        //         path: path,
        //         query: querydd,
        //     });
        //   try {

        //     this.queryDetailsList(tt).then(res => {
        //       // debugger
        //         if(res.status ==0){
        //             // this.menuList = res.data.menuList;
        //         }else{
        //             this.$toast("读取接口失败");
        //         }
        //         //this.$loading.close();
        //     })
        //  }catch (err) {
        //     this.$loading.close();
        //     this.$toast("网络异常，请稍后重试");
        //  }
        // }
      }
    },
  },
};
</script>