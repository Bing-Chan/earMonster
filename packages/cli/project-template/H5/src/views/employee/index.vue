<template>
  <div class="pages">
    <nut-fixed-nav :position="{ bottom: '70px' }" />
    <nut-cell>
      <nut-collapse icon="down-arrow">
        <nut-collapse-item title="基础信息" :name="3">
          <nut-form>
            <nut-form-item label="受约人">
              <nut-input v-model="basicData.name" class="nut-input-text" placeholder="请输入姓名" type="text" />
            </nut-form-item>
            <nut-form-item label="年龄">
              <nut-input v-model="basicData.age" class="nut-input-text" placeholder="请输入年龄" type="text" />
            </nut-form-item>
            <nut-form-item label="联系电话">
              <nut-input v-model="basicData.tel" class="nut-input-text" placeholder="请输入联系电话" type="text" />
            </nut-form-item>
            <nut-form-item v-model="basicData.address" label="地址">
              <nut-input class="nut-input-text" placeholder="请输入地址" type="text" />
            </nut-form-item>
            <nut-form-item label="备注">
              <nut-textarea placeholder="请输入备注" type="text" />
            </nut-form-item>
          </nut-form>
        </nut-collapse-item>
      </nut-collapse>
    </nut-cell>
    <nut-cell>
      <nut-collapse icon="down-arrow">
        <nut-collapse-item title="关键项考核" :name="3"> 在产品的功能、体验、易用性和灵活性等各个方面做了全面的升级！ </nut-collapse-item>
      </nut-collapse>
    </nut-cell>
    <nut-cell>
      <nut-collapse icon="down-arrow">
        <nut-collapse-item title="关键项考核" :name="3"> 在产品的功能、体验、易用性和灵活性等各个方面做了全面的升级！ </nut-collapse-item>
      </nut-collapse>
    </nut-cell>
  </div>

  <!-- <div class="btn-wrap">
    <nut-button shape="square" size="small" type="default" @click="changeLang('zh-cn')">
      {{ $t('language.zh') }}
    </nut-button>
    <nut-button shape="square" size="small" type="default" @click="changeLang('en-us')">
      {{ $t('language.en') }}
    </nut-button>
  </div>
  {{ getUserInfo }} -->
</template>

<script lang="ts" setup name="HomePage">
  import { computed } from 'vue';
  import { useUserStore } from '/@/store/modules/user';
  import { setLang } from '/@/i18n';
  import { useI18n } from 'vue-i18n';
  import { Github, Check } from '@nutui/icons-vue';

  const { locale } = useI18n();
  const visible = ref(false);
  const basicData = ref({});
  

  let cellList = ['vue3', 'vite', 'vue-router', 'axios', 'Pinia', 'vue-i18n', 'postcss-px-to-viewport', 'varlet / vant / nutUI', 'eruda'];
  const userStore = useUserStore();
  const getUserInfo = computed(() => {
    const { name = '' } = userStore.getUserInfo || {};
    return name;
  });

  const changeLang = (type) => {
    setLang(type);
  };
</script>
<style lang="scss" scoped>
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

  .pages {
    background: #f7f8fa;
    height: 100vh;
    padding: 8px 20px;

    .nut-cell {
      padding: 5px 5px;
    }
  }
</style>
