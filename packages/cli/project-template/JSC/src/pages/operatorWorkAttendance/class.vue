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
          class="fixed-elem common-date-box"
          @select="openPicker"
          queryFlag="new"
          :height="height"
          :buttons="buttons"
          :tableType="tableType"
          @timeupdate="dateChangeWatchHandle"
          @switchDateBtn="switchDateBtn"
        >
        </date-panel>
      </div>
    </div>

    <!--line chart-->
    <card-box
      :title="`${lineChartTitle}`"
      :hasData="lineHasData"
      :pageLoading="lineChartLoading"
      class="reset-scroll-elem"
    >
      <div class="line-chart-box" ref="linechartContext" slot="chart"></div>
      <template #topSelect>
        <line-dimension-select 
        :dimensionArr="chartTabList" 
        :tendType="lineType"
        @handleCenterType="handleCenterType"
        ></line-dimension-select>
      </template>
    </card-box>

    <custom-table
      @headClick="headClick"
      @loadMore="loadMoreHandle"
      ref="customTable"
      :props="tablePropCollection"
      :topFixed="topFixed"
    >
      <yto-search-panel
        :orgCode="orgCode"
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
          <span>{{
            scope.item[headItem.prop] | columnTransfer(headItem.prop, that)
          }}</span>
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
  name: "frist",
  mixins: [mixin],
  data() {
    return {}
  },
  created() {},
  methods: {
    rowClickFilter(item, prop) {
      this.rowClickFlag = true;
       if(this.notLinkDatas.includes(item.orgName)) {
        return false;
      }else{
        let path = `/operatorWorkAttendance/group`;
        let query = {
          orgCode: this.$route.query.orgCode + ',' + encodeURIComponent( item.orgCode),
          orgName: encodeURIComponent(item.orgName),
          orgLevel: encodeURIComponent(item.orgLevel),
        };
        this.$router.push({
          path: path,
          query: query,
        });
      }
      
    },
  }
  
}
</script>