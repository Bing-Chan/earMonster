<template>
  <div id="app" :key="appKey">
    <transition>
      <!-- <router-view v-wechat-title='$route.meta.title'></router-view> -->
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "App",
  data() {
    return {
      appKey: 1,
    };
  },
  methods: {
    ...mapMutations("personExceptionNew", [
      "setTabMenu3Type",
      "setTabMenu4Type",
      "setTabMenu1Type"
    ]),
  },
  watch: {
    $route: function (n, o) {
      console.log("$route1111deep", this.$route.query);
      //  返回监听 路由, 重置
      if (!n.query.tabMenu3Type) {
        this.setTabMenu3Type(this.$route.query.tabMenu3Type);
      }
      if(!n.query.tabMenu1Type){
        this.setTabMenu1Type(this.$route.query.tabMenu1Type)
      }
      this.appKey = new Date().getTime();
    },
    deep: true,
  },
  mounted: async function () {
    //此方法刷新页面时也会执行
    // if(envConfig.type === 'pro' || envConfig.type === 'uat'){
    //     window.addEventListener('unload',function(){
    //         localStorage.clear(); //清除缓存数据
    //         sessionStorage.clear(); //清除sessionStorage数据;
    //     })
    // }
  },
};
</script>
