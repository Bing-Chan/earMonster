<template>
  <div class="all-box">
    <div class="tips">
      <img src="/src/assets/images/tips.png" alt="">
      日绩效是预估收入，最终薪资以月薪发放为准。
      <img src="/src/assets/images/question.png" class="question" @click="goDetails">
    </div>

    <div class="center">
      <div class="date">{{ date }}</div>
      <!-- <div>排行榜</div> -->
      <img src="/src/assets/images/sorting.png" alt="">
      <div class="nubmer">
        <div> {{ count }}</div>
        <div class="message">日绩效预估(元)</div>
      </div>
    </div>
    <div class="list">
      <!-- <vanDatetimePicker 
        v-model="currentDate"
        type="year-month"
        title="选择年月"
      /> -->
      <div class="detail">
        <div class="left" @click="show=true">
          <span> {{ date }}</span>
          <vanCalendar v-model:show="show" @confirm="onConfirm" />
          
        </div>
        <div class="right">
          <span class="date-range">{{ startDate }}至{{ endDate }}  </span>
          <span class="normal">  预估总额  </span><span class="total-money"> {{ totalMoney }}</span>
        </div>
       
      </div>
      <div style="text-align: center;">
        <vanRow style="background-color: #ffffff;height: 40px;line-height: 40px;">
          <vanCol span="6">工序岗位</vanCol>
          <vanCol span="6">单价</vanCol>
          <vanCol span="6">操作量</vanCol>
          <vanCol span="6">绩效</vanCol>
        </vanRow>
        <vanCollapse v-model="allList">
          <vanCollapseItem title="6月23">
             <vanRow style="background-color: #ffffff;height: 40px;line-height: 40px;">
              <vanCol span="6">工序岗位</vanCol>
              <vanCol span="6">单价</vanCol>
              <vanCol span="6">操作量</vanCol>
              <vanCol span="6">绩效</vanCol>
            </vanRow>
            <vanRow style="background-color: #ffffff;height: 40px;line-height: 40px;">
                <vanCol span="6">工序岗位</vanCol>
                <vanCol span="6">单价</vanCol>
                <vanCol span="6">操作量</vanCol>
                <vanCol span="6">绩效</vanCol>
              </vanRow>
          </vanCollapseItem>
        </vanCollapse>
      </div>     
    </div> 
  </div>
</template>
<script type="ts">
export default defineComponent({
  setup() {
    let router = useRouter();
    const state = reactive({
      allList: [],
      date: '2023年06月23日',
      count: 175.94,
      currentDate: new Date(),
      startDate: '06月23日',
      endDate: '06月25日',
      totalMoney: '1500.00',
      show: false,
    })
    const goDetails = () => {
      router.push({
        path: '/example',
      })
    }

    const onConfirm = (value) => {
      state.show = false
    }
    return {
      ...toRefs(state),
      goDetails,
      onConfirm
    }
  }
  
})

</script>
<style lang="scss">
.all-box{
  background: #F5F5F5;
  padding:  0 26px;
  height: 100%;
  .tips{
    height: 84px;
    display: flex;
    align-items: center;
    flex-direction: row;
    font-size: 24px;
    color: #626262;
    img {
      width: 30px;
      height: 30px;
      padding: 0 10px;
    }
    .question{
      width: 30px;
      height: 30px;
      text-align: right;
    }
  }
  .center{
    background-image: url('/src/assets/images/background.png') ;
    background-position:center;
    height: 360px;
    width: 100%;
    border-radius: 20px;
    position: relative;
    img{
      width: 162px;
      height: 88px;
      position: absolute;
      right: -24px;
      top: 30px;
    }

    .date{
      font-size: 36px;
      color: #ffffff;
      position: absolute;
      top: 40px;
      left: 36px;
    }
    .nubmer{
      text-align: center;
      color: #ffffff;
      font-size: 72px;
      position: absolute;
      top: 120px;
      left: 30%;
      .message{
        font-size: 24px;
      }
    }
  }
  .list{
    .detail{
      display: flex;
      height: 50px;
      justify-content: space-between;
      right: {
       
      };
    }
    .date-range{
      font-size: 24px;
      font-weight: 400;
      color: #929292;
      height: 50px;
    }
    .normal{
      font-size: 24px;
      color: #333333;
      font-weight: 400;
      height: 34px;
    }
    .total-money{
      font-size: 36px;
      font-weight: 500;
      color: #333333;
      height: 50px;
      vertical-align: middle;
    }
  }
}
</style>