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
    <div  :style="{ height: height + 'px' }">
      <div   ref="fixedBox">
        <show-date class="fixed-elem common-date-box"></show-date>
      </div>
    </div>

    <dimension-box
       style="padding-top:0px"
      v-show="headerTabType!='-1'"
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

    <!--line chart 折线图-->
    <card-box
      :title="`${lineChartTitle}`"
      :hasData="lineHasData"
      :pageLoading="lineChartLoading"
      class="reset-scroll-elem"
    >
      <div class="line-chart-box" ref="linechartContext" slot="chart"></div>
    </card-box>

    <dimension-box
      v-if="isZhiYing"
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

    <!--pie chart-->
    <card-box
      v-if="headerTabType=='0'"
      :title="pieChartTitle"
      :pageLoading="pieChartLoading"
      :hasData="pieHasData"
      class="reset-scroll-elem"
    >
      <div class="pie-chart-box" ref="piechartContext" slot="chart"></div>
    </card-box>

        <!--bar menu-->
      <legend-select
      v-if="isZhiYing&&functionType=='line'"
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

    <legend-select
    v-if="isZhiYing&&functionType=='line'&&tabMenu1Type=='其他'"
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

    <!--明细列表-->
    <custom-table
      @headClick="headClick"
      @loadMore="loadMoreHandle"
      ref="customTable"
      :props="tablePropCollection"
      :topFixed="topFixed"
    >
      <yto-search-panel
        v-show="searchPanlShow"
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
              headItem.click && isLink(scope.item,headItem),
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
    return {};
  },
  computed: {
    queryFirstParams() {
      let params = {
        orgCodeLine: this.getFirstOrg().orgCodeLine,
        orgCodeLineName: this.getFirstOrg().orgCodeLineName,
        orgCode: this.getFirstOrg().orgCode,
        lx:this.getFirstOrg().lx,
        internationalFlag:this.getFirstOrg().internationalFlag,
      };
      return params;
    },
    searchPanlShow(){
        return  this.headerTabType=="0"&&this.zyjmType=="3";
    }
  },
  created() {
    this.title = decodeURI('人员看板');
    this.setPageHistory(1);
  },
  methods: {
    /***
     *  处理第一层默认链路
     * headerTabType   ""=全部；0=国内；1=国际
     * zyjmType  1=""=全部 ;  2="ZY"=直营;  3="JM"=加盟
     */
    getFirstOrg(){
      if(this.headerTabType=="-1"){
        //全部
        return {
          internationalFlag:null, // 国内国际
          orgCodeLine:"", // 链路
          orgCode:"",
          orgCodeLineName:"",
          lx:"1" // 全部
        };
      }else if(this.headerTabType=="0"){
        //国内
        let code=this.zyjmTypeList.find(x =>this.zyjmType==x.value).name;
        return {
          internationalFlag:this.headerTabType, // 国内国际
          orgCodeLine: code, // 链路
          orgCode: code, // 链路
          orgCodeLineName:this.zyjmTypeList.find(x =>this.zyjmType==x.value).label,
          lx:this.zyjmType // 全部
        };
      }else if(this.headerTabType=="1"){
        //国际
        let  lineName=this.zyjmTypeList.find(x =>this.zyjmType==x.value).label,
              lineCode=this.zyjmTypeList.find(x =>this.zyjmType==x.value).name;
        let code=lineCode;
        if(this.zyjmType=="2"){
          //直营
          lineName+="|总部";
          lineCode+="|ZB";
          code="ZB";
        }
        return {
          internationalFlag:this.headerTabType, // 国内国际
          orgCodeLine: lineCode, // 链路
          orgCode: code, // 
          orgCodeLineName:lineName,
          lx:this.zyjmType // 全部
        };
      }
    },
    searchPanelShow() {
      return true;
    },

    pieChartShow() {
      return this.chartTabType != "all";
    },
    // 第一个tab(除日期)
    setHeaderTabTypeCallback() {
      this.setZyjmType("2");
      this.setFunctionType("attributes");
      this.dateChangeWatchHandle();
    },
    rowClickFilter(item, prop) {
      if(this.notLinkDatas.includes(item.orgName)||!item.clickFlag){
        return  false;
      }
      //国内或国际
      if(this.headerTabType!="-1"){
        let h =this.pageHistory+ 1;
        this.setPageHistory(h);
        let path = `/personKanban/secound`;
        let codeLine=this.getFirstOrg().orgCodeLine;
        let codeLineTitle=this.getFirstOrg().orgCodeLineName;
        let query = {
          orgCode: encodeURIComponent(item.orgCode),
          orgName: encodeURIComponent(item.orgName),
          orgLevel: encodeURIComponent(""),
          orgCodeLine: encodeURIComponent(this.getOrgCodeLine(codeLine,item.orgCode)),
          orgCodeLineName: encodeURIComponent(this.getOrgCodeLine(codeLineTitle,item.orgName)),
        };
        this.$router.push({
          path: path,
          query: query,
        });
      }else{
          //等于全部时,所有切换不跳转
          this.setHeaderTabType(item.orgCode)
          this.setZyjmType("1")
          this.setHeaderTabTypeCallback()
      }
    },
  },
};
</script>