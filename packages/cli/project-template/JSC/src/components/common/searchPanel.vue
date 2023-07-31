<template>
    <div id="searchPanel">
        <div class="search-box">
            <i class="icon-search"></i>
            <input class="input-text" v-model.trim="keyword" :placeholder="placeholder" type="search">
        </div>
        <div v-show="showOrgSelectDialog" class="org-list" ref="orgList">
            <ul v-if="orgSelectList.length !== 0">
                <li v-for="(item,index) in orgSelectList" :key="index"
                    @click="handlerSelectOrgCode(item)">
                    {{item.name}}
                </li>
            </ul>
            <div v-else class="none-data">
                暂无搜索结果
            </div>
        </div>
    </div>
</template>
<script>

import {querySelectOrgByCondition} from '@/api'
import utils from '@/utils/utils'

export default {
  props: {
    columnName: {
      type: String,
      default: ''
    },
    authority: {
      type: String,
      default: 'true'
    },
    dimension: {
      type: String,
      default: ''
    },
    orgLevel: {
      type: String,
      default: ''
    },
    orgCode: {
      type: String,
      default: ''
    },
    // TODO:字段传入方式代优化
    queryType: {
      type: String,
      default: ''
    },
    queryDate: {
      type: Date,
      default: () => (new Date())
    },
    startDate: {
      type: Date,
      default: () => (new Date())
    },
    endDate: {
      type: Date,
      default: () => (new Date())
    },
    placeholder:{
      type: String,
      default: '输入组织'
    },
    getParams: Function,
    inOutType: String,
    inOutSearchType: String,
  },
  data () {
    return {
      keyword: '',
      orgSelectList: [],
      showOrgSelectDialog: false
    }
  },
  mounted () {
    window.addEventListener('touchstart', this.handlerSelectDialog)
  },
  methods: {

    // 组织机构查询
    querySelectOrg (keyword) {
      if (!keyword) {
        return this.showOrgSelectDialog = false
      }
      let params = {
        authority: this.authority, // 是否进行权限管控 true or false
        dimension: this.dimension ? this.dimension : this.orgLevel, // 查询维度:  ‘region’ 省区 ‘center’ 中心 ‘branch’ 分公司，'orgCenter' 直营中心，'customCenter' 非直营中心
        keyword: keyword,			// 查询关键词 输入code 或者 name 进行模糊查询
        currentOrgCode: this.orgCode // 当前页面组织结构代码，如果是首页，为userOrgCode, 如果是下钻后的页面，则为下钻的 组织机构代码
      }
      querySelectOrgByCondition(params).then(res => {
        this.orgSelectList = res.data.orgSelectList
        // this.showOrgSelectDialog = res.data.orgSelectList.length !== 0;
        this.showOrgSelectDialog = true
      })
    },
    // 选择组织(回传)
    handlerSelectOrgCode (item) {
      this.$emit('handlerSelectOrgCode', item)
      this.showOrgSelectDialog = false
      this.keyword = ''
    },
    // 隐藏组织弹窗
    handlerSelectDialog (event) {
      if (this.showOrgSelectDialog) {
        if (!this.$refs.orgList.contains(event.target)) {
          this.showOrgSelectDialog = false
          this.keyword = ''
        }
      }
    },

  },
  watch: {
    keyword () {
      utils.throttle(() => {
        this.querySelectOrg(this.keyword)
      }, 300)
    }
  },
  destroyed () {
    window.removeEventListener('touchstart', this.handlerSelectDialog)
  }
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
