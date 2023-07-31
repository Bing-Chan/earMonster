<template>
     <span class="line-memu" slot="topSelect">
       <span v-for="(item,index) in dimensionArr" :key="index" :class="{'active': tendType=== item.value}" @click="handleCenterType(item)">
<!--         <i class="icon icon-all"></i>-->
         {{item.label}}
       </span>
      </span>
</template>

<script>
  export default {
    name: "index.vue",
    props:{
      tendType:{
        type: String,
        default: ''
      },
      dimensionArr:{
        type: Array,
        default: () => []
      }
    },
    methods:{
      handleCenterType(val){
        this.$emit('handleCenterType',val);
      }
    }
  }
</script>

<style scoped lang="scss">
  .line-memu {
    display: inline-block;
    flex-shrink: 0;
    .icon {
      display: inline-block;
      vertical-align: middle;
      width: 12px;
      height: 12px;
      margin-right: 3px;
    }

    span {
      margin-right: 5px;
      padding: 3px 10px;
      font-size: 14px;
      background: #F5F5F5;
      border-radius: 5px;
      text-align: center;
      .icon-all {
        background: url("../../../assets/images/quanbu_icon_un@2x.png") center center no-repeat;
        background-size: 12px 12px;
      }

      .icon-directly {
        background: url("../../../assets/images/zhiyingzhongyun_icon_uns@2x.png") center center no-repeat;
        background-size: 12px 12px;
      }

      &.active {
        background: #D4E7FE;
        color: #2482FC;
        .icon-all {
          background: url("../../../assets/images/quanbu_icon_sel@2x.png") center center no-repeat;
          background-size: 12px 12px;
        }

        .icon-directly {
          background: url("../../../assets/images/zhiyingzhongyun_icon_sel@2x.png") center center no-repeat;
          background-size: 12px 12px;
        }
      }
    }
  }
</style>
