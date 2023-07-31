<template>
  <div class="salary-details">
    <div>
      <vanRow class="top bcg">
        <vanCol span="6">日期</vanCol>
        <vanCol span="6">岗位</vanCol>
        <vanCol span="4">单价</vanCol>
        <vanCol span="4">操作量</vanCol>
        <vanCol span="4">绩效</vanCol>
      </vanRow>
      <vanRow class="top">
        <vanCol span="6">日期</vanCol>
        <vanCol span="6">岗位</vanCol>
        <vanCol span="4">单价</vanCol>
        <vanCol span="4">操作量</vanCol>
        <vanCol span="4">绩效</vanCol>
      </vanRow>
    </div>
    <div class="module">
      <vanCell title="基本信息" class="title"></vanCell>
      <vanCellGroup class="basic">
        <vanField label="工序岗位：" v-model="salary"></vanField>
        <vanField label="出勤日期：" v-model="salary"></vanField>
        <vanField label="班次属性：" v-model="salary"></vanField>
      </vanCellGroup>
    </div>
    <div class="module">
      <vanCell title="我的绩效" class="title"></vanCell>
      <vanCellGroup class="basic">
        <vanField label="卸车效率：" v-model="salary"></vanField>
        <vanField label="效率单价：" v-model="salary"></vanField>
        <vanField label="卸车重量：" v-model="salary"></vanField>
      </vanCellGroup>
    </div>
    <div class="module">
      <vanCell :title="title" class="title"></vanCell>
      <vanRow class="table-line">
        <vanCol span="7">档位</vanCol>
        <vanCol span="10">卸车效率</vanCol>
        <vanCol span="7">卸车效率单价</vanCol>
      </vanRow>
      <vanRow class="table-line" v-for="(item,index) in list" :key="index">
        <vanCol span="7">{{ index + 1 }}</vanCol>
        <vanCol span="10">{{item.salary}}</vanCol>
        <vanCol span="7">{{item.salaryPrice}}</vanCol>
      </vanRow>
    </div>
  </div>
</template>

<script type="ts">
  export default defineComponent({
     setup() {
       let router = useRouter();
       const state = reactive({
        title: '南京转运中心-进港-卸车员  阶梯单价',
        list:[
          {
            salary: '[1800,00)件/时',
            salaryPrice: 7.22,
          },
          {
            salary: '[1800,00)件/时',
            salaryPrice: 7.22,
          },
          {
            salary: '[1800,00)件/时',
            salaryPrice: 7.22,
          }
        ],
        salary: '1338.00件/时'
       })
       return {
        ...toRefs(state),
      }
     }
  })
</script>

<style lang="scss">
.salary-details{
  height: 100%;
  text-align: center;
  background: #F5F5F5;
  font-size: 28px;
  .top{
    background-color: #ffffff;
    height: 80px;
    line-height: 80px;
  }
  .bcg{
    background: #F2F8FF;  
  }
  .module{
    margin-top: 20px;
    text-align: left;
    .table-line{
      background-color: #ffffff;
      height: 80px;
      line-height: 80px; 
      text-align: center;
    }
    .basic{
      padding: 10px 0;
      .van-cell{
        padding: 8px 30px !important;
      }
      .van-cell:after{
        border-bottom: 0;
      }
      .van-field__label{
        color: #999999;
      }
    }
    .title{
      font-weight: 1000;
      color: #333333;
      position: relative;
      .van-cell__title{
        margin-left: 6px;
      }
      ::before{
        content: '';
        position: absolute;
        top: 46px;
        left: 24px;
        width: 4px;
        height: 30px;
        background: #4c84ff;
        transform: translateY(-50%);
        border-radius: 4px;
      }
    }
  }
}


</style>