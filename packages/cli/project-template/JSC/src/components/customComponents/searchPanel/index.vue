<template>
  <div id="searchPanel">
    <div class="search-box">
      <i class="icon-search"></i>
      <input class="input-text" v-model.trim="keyword" :placeholder="placeholder" type="search">
    </div>
    <div v-show="showOrgSelectDialog" class="org-list" ref="orgList">
      <div class="loading-panel">
        <mt-spinner v-show="pageLoading" type="fading-circle" :size="30"></mt-spinner>
      </div>
      <ul v-if="orgSelectList.length !== 0">
        <li v-for="(item,index) in orgSelectList" :key="index"
            @click="handlerSelectOrgCode(item)">
          <slot name="list" :item="item">{{item.name}}</slot>
        </li>
      </ul>
      <div v-else-if="!pageLoading && orgSelectList.length === 0" class="none-data">
        暂无数据
      </div>
    </div>
  </div>
</template>
<script>
  import {
    querySelectOrgByCondition,
    oneselfExtractFuzzy, // 终端管理：业务量：(自提柜+第三方驿站)最后层级的模糊搜索接口
    queryStationBusinessDetail
  } from '@/api'
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
      useDefaultSearchFun: { // 使用默认模糊搜索函数 querySelectOrgByCondition
        type: Boolean,
        default: true
      },
    },
    data () {
      return {
        keyword: '',
        orgSelectList: [],
        showOrgSelectDialog: false,
        pageLoading: true
      }
    },
    mounted () {
      window.addEventListener('touchstart', this.handlerSelectDialog)
    },
    methods: {
      startPageLoading(){
          this.pageLoading = true;
      },
      closePageLoading(){
        this.pageLoading = false;
      },
      closeOrgSelectDialog () {
        this.showOrgSelectDialog = false
      },
      // 组织机构查询
      async querySelectOrg (keyword) {
        if (!keyword) {
          return this.showOrgSelectDialog = false
        }
        this.showOrgSelectDialog = true;
        if (this.useDefaultSearchFun) { // 使用默认的搜索函数
          this.querySelectOrgDefault(keyword)
        } else { // 根据模块和层级不同使用各自的搜索函数
          this.$emit('customSearchHandle', keyword); // 使用自定义搜索函数
        }
      },
      querySelectOrgDefault (keyword) { // 默认的公共搜索函数
        let params = {
          authority: this.authority,         //是否进行权限管控 true or false
          dimension: this.dimension,     //查询维度:  ‘region’ 省区 ‘center’ 中心 ‘branch’ 分公司，'orgCenter' 直营中心，'customCenter' 非直营中心
          keyword: keyword,			//查询关键词 输入code 或者 name 进行模糊查询
          currentOrgCode: this.orgCode,  //当前页面组织结构代码，如果是首页，为userOrgCode, 如果是下钻后的页面，则为下钻的 组织机构代码
        }
        this.pageLoading = true;
        this.orgSelectList = [];
        querySelectOrgByCondition(params).then(res => {
          this.pageLoading = false;
          this.orgSelectList = res.data.orgSelectList;
          this.showOrgSelectDialog = true;
        })
        .catch(e => {
          this.pageLoading = false;
          this.orgSelectList = [];
        })
      },
      //选择组织(回传)
      handlerSelectOrgCode (item) {
        this.$emit('handlerSelectOrgCode', item)
        this.showOrgSelectDialog = false;
        this.keyword = '';
      },
      //隐藏组织弹窗
      handlerSelectDialog (event) {
        if (this.showOrgSelectDialog) {
          if (!this.$refs.orgList.contains(event.target)) {
            this.showOrgSelectDialog = false;
            this.keyword = '';
          }
        }
      },
      setOrgSelectList(arr){
        this.orgSelectList = [...arr];
      }
    },
    watch: {
      keyword () {
        utils.throttle(() => {
          this.querySelectOrg(this.keyword);
        }, 300);
      }
    },
    destroyed () {
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


