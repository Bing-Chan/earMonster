<template>
  <div> 
    <VanButton  >测试按钮</VanButton>
  </div>
</template>

<script lang="ts" setup name="HomePage">
  import { setLang } from '/@/i18n';

  const changeLang = (type) => {
    setLang(type);
  };
</script>
<style lang="scss">
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    font-size: 40px;
    img {
      width: 90px;
      height: 90px;
    }
  }

  .intro-header {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }

  .supportList {
    margin: 0 16px;

    .nut-cell-group__title {
      margin-top: 30px;
    }
  }

  .btn-wrap {
    margin: 20px;
  }
  .btn-confirm {
    @include main-lang-bg(302px, 82px, '/@/assets/button', 'confirm.png');
  }
</style>
