<template>
  <div class="yzd-page" v-wechat-title="title" ref="box">
    <div class="fixed-wrapper" :style="{ height: height + 'px' }">
      <div class="fixed-box" ref="fixedBox">
        <show-date class="fixed-elem common-date-box"></show-date>
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

    <custom-table
      @headClick="headClick"
      @loadMore="loadMoreHandle"
      ref="customTable"
      :props="tablePropCollection"
      :topFixed="topFixed"
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
import { mapState } from "vuex";
import dayjs from "dayjs";

export default {
  name: "person",
  mixins: [mixin],
  computed: {
    ...mapState("common", ["currentDate", "activeType"]),
    ...mapState("operatorAnalysis", [
      "headerTabType",
      "chartTabType",
      "tabTypeTitle",
      "dimensionType",
    ]),
  },
  data() {
    return {
      that: this,
      dimension: "region",
    };
  },
  created() {},
  methods: {
    rowClickFilter(item, prop) {
      this.rowClickFlag = true;
      if (this.dimensionType == "CUSTOM") return;
      let path = `/employ/details`;
      let query = {
        emplid: item.emplid,
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
