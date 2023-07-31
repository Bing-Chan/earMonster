<template>
  <div class="dimension-box">
    <ul>
      <li v-for="(item,index) in dimensionData" :class="{active: active == item.value}" @click="selectHandle(item,index)">{{item.label}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    dimensionData: {
      type: Array,
      default: () => []
    },
    active: {
      type: String,
      default: ''
    }
  },
  methods: {
    selectHandle(item,index){
      if(item.value === this.active) return;
      this.$emit('selectHandle',item,index);
    }
  }
}
</script>

<style scoped lang="scss">
 .dimension-box{
   padding: 0 15px 10px 15px;
   ul{
     display: flex;
     overflow-x: auto;
     li{
       display: inline-block;
       height: 30px;
       line-height: 30px;
       text-align: center;
       flex: 1;
       border: 1px solid rgba(36,130,252,1);
       border-right: none;
       font-size: 14px;
       font-family: PingFangSC-Medium, PingFang SC;
       font-weight: 400;
       color: rgba(36,130,252,1);
       padding-left: 9px;
       padding-right: 9px;
       word-break: keep-all;
       &.active{
         color: rgba(255,255,255,1);
         background-color: rgba(36,130,252,1);
       }
       border-right: none;
       &:first-child{
         border-radius: 2px 0px 0px 2px;
         border: 1px solid rgba(36,130,252,1);
         border-right: none;
       }
       &:last-child{
         border-radius: 0px 2px 2px 0px;
         border-right: 1px solid rgba(36,130,252,1);
       }
     }
   }
 }
</style>
