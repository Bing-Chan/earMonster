<template>
  <div class="yto-panel">
    <span class="yto-panel-head" v-show="headShow">
      <span class="title">{{title}}</span>
      <slot name="topSelect" class="buttons"></slot>
    </span>
    <div  class="chart-panel" :class="{'hidden':!hasData||pageLoading}">
      <div id="businessVolumeChartLine" class="chart-canvas">
        <slot name="chart"></slot>
      </div>
    </div>
    <slot name="pieChartLegendSelect"></slot>
    <div class="loading-panel">
      <div class="loading-box" v-show="pageLoading">
        <mt-spinner  type="fading-circle" :size="30" ></mt-spinner>
      </div>
    </div>
    <div class="chart-none-data" v-if="!pageLoading && !hasData">暂无数据</div>
    <slot name="listTypeFilter"></slot>
  </div>
</template>

<script>
  export default {
    name: "CardBox",
    props:{
      headShow: {
        type: Boolean,
        default: true
      },
      title:{
        type: String,
        default: '趋势图'
      },
      hasData:{
        type: Boolean,
        default: true
      },
      pageLoading:{
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped lang="scss">
  .yto-panel-head{
    width: 100%;
    display: inline-flex;
    box-sizing: border-box;
    flex-wrap: nowrap;
    justify-content: space-between;
    .title{
      display: inline-block;
      flex-grow: 0;
      word-break: break-all;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .chart-panel{
    width: 100%;
  }
  .hidden{
    position: absolute;
    left: -3000px
  }
  .loading-box {
    padding: 20px 0;
  }
</style>
