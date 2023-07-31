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

    <!-- 国内国外 -->
    <dimension-box
      v-if="headerTabType == 2 && !deptEndFlag"
      :dimensionData="zyjmTypeList"
      :active="zyjmType"
      @selectHandle="
        (...args) =>
          selectHandle(
            'zyjmType',
            'setZyjmType',
            args[0],
            setSetZyjmTypeCallback
          )
      "
    />

    <!-- line chart 折线图 -->
    <card-box
      :title="`${lineChartTitle}`"
      :hasData="lineHasData"
      :pageLoading="lineChartLoading"
      class="reset-scroll-elem"
    >
      <div class="line-chart-box" ref="linechartContext" slot="chart"></div>
    </card-box>

    <!-- pie chart 饼图 -->
    <card-box
      v-if="!deptEndFlag"
      :title="pieChartTitle"
      :pageLoading="pieChartLoading"
      :hasData="pieHasData"
      class="reset-scroll-elem"
    >
      <div class="pie-chart-box" ref="piechartContext" slot="chart"></div>
    </card-box>

    <!-- 直营用工属性岗位条线 -->
    <dimension-box
      v-if="headerTabType == 2 && !deptEndFlag && orgCode == 'ZY'"
      :dimensionData="functionTypeList"
      :active="functionType"
      class="reset-scroll-elem"
      @selectHandle="
        (...args) =>
          selectHandle(
            'functionType',
            'setFunctionType',
            args[0],
            setFunctionTypeCallback
          )
      "
    />

    <!-- 直营岗位条线 -->
    <legend-select
      v-if="headerTabType == 2 && functionType == 'line' && !deptEndFlag"
      @selectHandle="
        (...args) =>
          selectHandle(
            'tabMenu1Type',
            'setTabMenu1Type',
            args[0],
            setTabMenu1TypeCallback
          )
      "
      :active="tabMenu1Type"
      :tabContent="tabMenu1TypeList"
    ></legend-select>

    <!-- 直营岗位条线其他 -->
    <legend-select
      v-if="
        headerTabType == 2 &&
        functionType == 'line' &&
        tabMenu1Type == 'qitaxian' &&
        !deptEndFlag
      "
      @selectHandle="
        (...args) =>
          selectHandle(
            'tabMenu2Type',
            'setTabMenu2Type',
            args[0],
            setTabMenu2TypeCallback
          )
      "
      :active="tabMenu2Type"
      :tabContent="tabMenu2TypeList"
    ></legend-select>

    <!-- 加盟关键岗位 -->
    <legend-select
      v-if="headerTabType == 3 && !deptEndFlag"
      @selectHandle="
        (...args) =>
          selectHandle(
            'tabMenu3Type',
            'setTabMenu3Type',
            args[0],
            setTabMenu3TypeCallback
          )
      "
      :active="tabMenu3Type"
      :tabContent="tabMenu3TypeList"
    ></legend-select>

    <!-- 人员审核状态 -->
    <legend-select
      v-if="deptEndFlag"
      :style="{ marginTop: deptEndFlag ? '-8px' : '0' }"
      @selectHandle="
        (...args) =>
          selectHandle(
            'tabMenu4Type',
            'setTabMenu4Type',
            args[0],
            setTabMenu4TypeCallback
          )
      "
      :active="tabMenu4Type"
      :tabContent="tabMenu4TypeList"
    ></legend-select>

    <!-- 明细列表 -->
    <custom-table
      @headClick="headClick"
      @loadMore="loadMoreHandle"
      ref="customTable"
      :props="tablePropCollection"
      :topFixed="topFixed"
    >
      <search-panel-new
        v-if="
          (headerTabType == 2 || headerTabType == 3) &&
          !(first && ((keyJob && headerTabType == 3) || (keyJob && headerTabType == 2)))
        "
        :placeholder="placeholder"
        slot="searchPanel"
        :deptEndFlag="deptEndFlag"
        :orgLevel="orgLevel"
        :getParams="getSearchParams"
        @select="handlerSelectOrgCode"
        @del="del"
        :queryListAPI="queryListApi"
        :orgLists="orgLists"
      ></search-panel-new>
      <span class="refresh-btn" @click="searchPanelBackHandle" slot="back"
        >返回</span
      >
      <template v-slot:list="scope">
        <li
          v-for="(headItem, headIndex) in tableHeadData.filter((x) => x.show)"
          :key="headIndex"
          :data-prop="headItem.prop"
          @click="(e) => rowClickFilter(scope.item, headItem.prop)"
          :class="{
            'blue-li': headItem.click && isLink(scope.item, headItem),
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
export default {
  name: "frist",
  mixins: [mixin],
  dimension: "region",
  data() {
    return {
      demoType: "2",
    };
  },
  created() {},

  methods: {
    searchPanelShow() {
      return false;
    },
    pieChartShow() {
      return this.chartTabType != "all";
    },
    rowClickFilter(item, prop) {
      if (!this.isLink(item, prop)) {
        return false;
      }
      // 首页
      if (this.first && this.headerTabType == 1) {
        if (item.orgCode == "ZY") {
          this.selectHandle(
            "headerTabType",
            "setHeaderTabType",
            {
              value: "2",
            },
            this.setHeaderTabTypeCallback
          );
        } else if (item.orgCode == "JM") {
          this.selectHandle(
            "headerTabType",
            "setHeaderTabType",
            {
              value: "3",
            },
            this.setHeaderTabTypeCallback
          );
        }
        return false;
      }

      // 加盟首页
      if (this.first && this.headerTabType == 3 && item.keyJob) {
        if (item.orgCode == "JM") {
          this.selectHandle(
            "tabMenu3Type",
            "setTabMenu3Type",
            {
              value: item.keyJob,
            },
            this.setTabMenu3TypeCallback
          );
        }
        return false;
      }

      if (!item.empid) {
        let query = {
          keyJob: this.keyJob, // 直营岗位条线，加盟关键岗位
          orgCode: encodeURIComponent(item.orgCode),
          orgName: encodeURIComponent(item.orgName),
          orgLevel: "",
          orgCodeLine: encodeURIComponent(item.orgCodeLine),
          orgCodeLineName: encodeURIComponent(item.orgCodeLineName),
          ifHasNext: item.ifHasNext,
          deptEndFlag: item.deptEndFlag,
          toPersonFlag: item.toPersonFlag,
          yzlNum: item.yzlNum,
          dzlNum: item.dzlNum,
          headerTabType: this.headerTabType,
          zyjmType: this.zyjmType,
          functionType: this.functionType,
          tabMenu1Type: this.tabMenu1Type,
          tabMenu2Type: this.tabMenu2Type,
          tabMenu3Type: this.tabMenu3Type,
          tabMenu4Type: this.tabMenu4Type,
        };
        let path = `/personException/first`;
        let h = this.pageHistory + 1;
        this.setPageHistory(h);
        this.$router.push({
          path: path,
          query: query,
        });
      } else {
        let path = `/employ/detailsNew`;
        let query = {
          emplid: encodeURIComponent(item.empidEncrypt),
        };
        this.$router.push({
          path: path,
          query: query,
        });
      }
    },
  },
};
</script>
