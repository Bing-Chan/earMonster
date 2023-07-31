<template>
  <div class="tab">
    <span v-for="(item, index) in tabItems" @click="(event)=>tabItemHandle(item, index,event)"
          :key="index" class="tab-item" :class="{active: activeIndex === index,tabDisabled: disabledIndexList.length > 0 && disabledIndexList.indexOf(index) !== -1}">
      {{item[labelKey]}}
      <!--{{item[valueKey]}}-->
    </span>
    <span class="bottom-line" :style="{left: pos + 'px'}"></span>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    disabledIndexList: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number],
      required: true,
      default: ''
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    tabItems:{
      type: Array,
      required: true,
      default: function () {
        return []
      }
    },
    caiNiaoTabDisabled: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      activeIndex: 0,
    }
  },
  computed: {
    pos: function (){
      let len = this.tabItems.length;
      for(let item in this.tabItems){
        if(this.tabItems[item].value == this.value){
          this.activeIndex = parseInt(item);
        }
      }
      return (document.body.offsetWidth / len) * (this.activeIndex + 0.5)  - 10
    }
  },
  methods: {
    tabItemHandle (item, index,event) {
      if(Array.from(event.target.classList).indexOf('tabDisabled') !== -1){
        return;
      }
      this.activeIndex = index;
      this.$emit('tabHandle',item,index)
    }
  }
}
</script>

<style scoped lang="scss">
.tab{
  z-index: 100;
  display: flex;
  font-size:14px;
  font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;;
  color:#666666;
  background:rgba(255,255,255,1);
  /*padding-bottom: 10px;*/
  position: relative;
  .tab-item{
    display: inline-block;
    height: 40px;
    line-height: 40px;
    text-align: center;
    flex: 1;
    flex-shrink: 0;
    &.active{
      font-size:14px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(36,130,252,1);
    }
    &.tabDisabled{
      color: #ccc;
    }
  }
  .bottom-line{
    position: absolute;
    display: inline-flex;
    width:20px;
    height:2px;
    background:rgba(36,130,252,1);
    border-radius:1px;
    bottom: 0;
    left: calc(((100vw / 3) - 20px) / 2);
    transition: left 0.2s;
  }
}
</style>
