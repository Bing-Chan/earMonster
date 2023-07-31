<template>
  <div id="searchPanel">
    <div class="search-box">
      <i class="icon-search"></i>
      <input class="input-text" v-model.trim="empName" :placeholder="placeholder" >

    <img v-show="empName" @click="del()" src="../../../../static/images/x.png" style="width: 10px;" alt="">
    </div>
    <div v-show="showOrgSelectDialog" class="org-list" ref="orgList">
      <div class="loading-panel">
        <mt-spinner v-show="pageLoading" type="fading-circle" :size="30"></mt-spinner>
      </div>
      <ul v-if="orgSelectList.length !== 0">
        <li v-for="(item, index) in orgSelectList" :key="index" @click="handlerSelectOrgCode(item)">
          <slot name="list" :item="item">{{ item.orgName || item.empName }}</slot>
        </li>
      </ul>
      <div v-else-if="!pageLoading && orgSelectList.length === 0" class="none-data">
        暂无数据
      </div>
    </div>
  </div>
</template>
<script>
import utils from '@/utils/utils'
export default {
  props: {
    placeholder: {
      type: String,
      default: '输入组织'
    },
    authority: {
      type: String,
      default: 'true'
    },
    dimension: {
      type: String,
      default: ''
    },
    orgCode: {
      type: String,
      default: ''
    },
    useDefaultSearchFun: { // 使用默认模糊搜索函数 queryListApi
      type: Boolean,
      default: true
    },
    deptEndFlag: { // 是否查询人员列表
      type: Boolean,
      default: false
    },
    orgLists: { // 组织列表
      type: Array,
      default: () => {
        return []
      }
    },
    /**
     * 接口API参数
     * 需要在调用页面赋具体业务明细列表接口
     */
    getParams: Function,
    /**
     * 接口API方法
     * 需要在调用页面赋具体业务明细列表接口
     */
    queryListAPI: Function,
  },
  data() {
    return {
      empName: '',
      orgSelectList: [],
      showOrgSelectDialog: false,
      pageLoading: true
    }
  },
  mounted() {
    window.addEventListener('touchstart', this.handlerSelectDialog)
  },
  methods: {
    startPageLoading() {
      this.pageLoading = true;
    },
    closePageLoading() {
      this.pageLoading = false;
    },
    closeOrgSelectDialog() {
      this.showOrgSelectDialog = false
    },
    // 组织机构查询
    async querySelectOrg(empName) {
      if (!empName) {
        return this.showOrgSelectDialog = false
      }
      if (!this.deptEndFlag) {
        this.showOrgSelectDialog = true;
        this.pageLoading = false;
        this.orgSelectList = this.orgLists.filter((item) => {
          return item.orgName.indexOf(empName) > -1
        });
        console.log('this.orgSelectList', this.orgSelectList)
      } else {
        if (this.useDefaultSearchFun) { // 使用默认的搜索函数
          this.querySelectOrgDefault(empName)
        } else { // 根据模块和层级不同使用各自的搜索函数
          this.$emit('customSearchHandle', empName); // 使用自定义搜索函数
        }
      }
    },
    querySelectOrgDefault(empName) { // 默认的公共搜索函数
      let params = {
        ...this.getParams(),
        empName: empName,
      }
      this.pageLoading = true;
      this.orgSelectList = [];
      this.queryListAPI(params).then(res => {
        this.pageLoading = false;
        this.orgSelectList = res.data.tbody || [];
        this.showOrgSelectDialog = true;
      })
        .catch(e => {
          this.pageLoading = false;
          this.orgSelectList = [];
        })
    },
    //选择组织(回传)
    handlerSelectOrgCode(item) {
      this.showOrgSelectDialog = false;
      this.$emit('select', item)
      // this.empName = ;
      this.showOrgSelectDialog = false;
    },
    del() {
      this.empName = ''
      this.$emit("del");
      this.showOrgSelectDialog = false;
    },
    //隐藏组织弹窗
    handlerSelectDialog(event) {
      if (this.showOrgSelectDialog) {
        if (!this.$refs.orgList.contains(event.target)) {
          this.showOrgSelectDialog = false;
          this.empName = '';
        }
      }
    },
    setOrgSelectList(arr) {
      this.orgSelectList = [...arr];
    }
  },
  watch: {
    empName() {
      utils.throttle(() => {
        this.querySelectOrg(this.empName);
      }, 300);
    }
  },
  destroyed() {
    window.removeEventListener('touchstart', this.handlerSelectDialog);
  },
}
</script>
<style lang="scss" scoped>
#searchPanel {
  display: inline-block;

  .none-data {
    text-align: center;
    color: #999999;
    background-color: #fff;
  }
}
</style>
