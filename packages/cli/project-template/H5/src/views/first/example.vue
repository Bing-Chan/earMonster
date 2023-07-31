<template>
  <div class="example">
    <div class="tips">
      <img src="/src/assets/images/tips.png" alt="">
      每日22:00更新前一天的绩效工资，可能有延迟请耐心等待。
    </div>
    <div class="content">
      <vanCell title="绩效工资计算" class="name"></vanCell>
      <div class="salary-com">
        <img src="/src/assets/images/salary.png" alt="">
          <span>  绩效工资=效率单价✖️操作量</span>
        </div>
      <vanCell title="例如：进港卸车岗"></vanCell>
      <vanRow style="" class="table-line title">
        <vanCol span="7">效率单价</vanCol>
        <vanCol span="7">操作量</vanCol>
        <vanCol span="10">绩效考核工资</vanCol>
      </vanRow>
      <vanRow class="table-line">
        <vanCol span="7">4.81元/吨</vanCol>
        <vanCol span="7">✖️30 吨</vanCol>
        <vanCol span="10">120元</vanCol>
      </vanRow>
    </div>
    <div style="margin-top: 10px;">
       <vanCell title="效率单价换算" class="name"></vanCell>
       <vanCell title="例如：进港卸车岗"></vanCell>
       <vanRow class="table-line title">
        <vanCol span="7">档位</vanCol>
        <vanCol span="10">卸车效率</vanCol>
        <vanCol span="7">卸车效率单价</vanCol>
      </vanRow>
      <vanRow class="table-line">
        <vanCol span="7">1</vanCol>
        <vanCol span="10">[1800,00)件/时</vanCol>
        <vanCol span="7">7.22元</vanCol>
      </vanRow>
      <vanRow class="table-line">
        <vanCol span="7">2</vanCol>
        <vanCol span="10">[1700,1800)件/时</vanCol>
        <vanCol span="7">6.62元</vanCol>
      </vanRow>
      <vanRow class="table-line">
        <vanCol span="7">3</vanCol>
        <vanCol span="10">[1600,1700)件/时</vanCol>
        <vanCol span="7">6.02元</vanCol>
      </vanRow>
      <vanRow class="table-line">
        <vanCol span="7">4</vanCol>
        <vanCol span="10">[1500,1600)件/时</vanCol>
        <vanCol span="7">5.41元</vanCol>
      </vanRow>
      <vanRow class="table-line">
        <vanCol span="7">5</vanCol>
        <vanCol span="10">[0,1500)件/时</vanCol>
        <vanCol span="7">4.81元</vanCol>
      </vanRow>
      <vanCell value="备注：淡旺季的阶梯单价不一样，具体价格见绩效详情-阶梯单价" class="remark"></vanCell>
    </div>
  </div>
</template>
<style lang="scss">
.example{
  background-color: #f5f5f5;
  height: 100%;
  font-size: 26px;
  .content{
    .salary-com{
      height: 84px;
      display: flex;
      align-items: center;
      flex-direction: row;
      img{
        height: 30px;
        width: 30px;
        margin-left: 30px;
        padding-right: 10px;
      }
    }
    
  }
  .name{
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
  .table-line{
    background-color: #ffffff;
    height: 80px;
    line-height: 80px; 
    text-align: center;
  }
  .title{
    background: #F2F8FF;
  }
  .tips, .remark{
    font-size: 24px;
    color: #626262;
    img{
      height: 30px;
      width: 30px;
      padding: 0 10px;
      
    }
  }
  .tips{
    height: 84px;
    display: flex;
    align-items: center;
    flex-direction: row;
  }
}
</style>