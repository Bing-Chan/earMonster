<template>
  <div class="custom-table">
    <!--   数据列表展示  -->
    <div class="yto-panel">
      <div class="yto-panel-head">
        {{props.placeholder}}
        <slot name="searchPanel"></slot>
      </div>
      <div class="list-custom" id="tableHead" ref="tableHead">
        <ul class="list-head" :class="{'tableFixed':tableHeadFixed}" :style="{top: props.topFixed + 'px'}">
          <template>
            <li class="expand" v-show="expand"></li>
            <li v-for="(item,index) in props.tableHeadData" :key="index" @click="headClick(item)"
                v-if="item.show">
              {{item.label}}
              <i
                v-if="item.sortable"
                class="icon-sort-default"
                :class="{'icon-sort-desc': props.sortColumn === item.prop && props.sortType === 'DESC', 'icon-sort-asc': props.sortColumn === item.prop && props.sortType === 'ASC'}"
              >
              </i>
            </li>
          </template>
        </ul>
        <ul class="list-head-space" v-if="tableHeadFixed">
          <li></li>
        </ul>
        <div class="infiniteScroll" v-infinite-scroll="loadMore" infinite-scroll-distance="10">
          <slot name="body">
            <ul class="list-body" v-for="(item,index) in props.tableBodyData" :key="index"
                @click="(e)=>rowClick(item,e,index)">
            </ul>
          </slot>
        </div>
        <ul v-show="props.tableBodyData.length===0  && !props.pageLoading" class="list-foot">
          <li v-if="props.searchType === 1">
            暂无搜索结果
            <slot name="back"></slot>
          </li>
          <li v-else>暂无数据</li>
        </ul>
      </div>
    </div>
    <div class="loading-panel">
      <mt-spinner v-show="props.pageLoading" type="fading-circle" :size="30"></mt-spinner>
      <div class="no-more"
           v-show="!props.pageLoading && !props.hasMore && props.tableBodyData.length!==0 && showNoMoreFlag">
        我也是有底线的...
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '@/utils/utils'

  export default {
    name: 'CustomTable',
    props: {
        expand: {
            type:Boolean,
            default: false
        },
      showNoMoreFlag: {
        type: Boolean,
        default: true
      },
      props: {
        type: Object,
      },
      businessType: {
        type: String,
        default: ''
      }
    },
    data: function () {
      return {
        tableHeadFixed: false,
        focusin: false
      }
    },
    mounted() {
      if (!this.props.disableScroll) {
        window.addEventListener('scroll', this.handleScroll)
      }
      let that = this;
      let eleInput = document.querySelector('.search-box input');
      if (eleInput) {
        eleInput.addEventListener('focusin', (event) => {
          that.focusin = true;
          setTimeout(() => {
            that.focusin = false;
          }, 1000)
        });
      }

    },
    destroyed() {
      if (!this.props.disableScroll) {
        window.removeEventListener('scroll', this.handleScroll)

      }
    },
    methods: {
      tableHeadFixedSet() {
        this.tableHeadFixed = false
        this.$nextTick(() => {
          setTimeout(() => {
            window.scrollTo(0, 1)
            setTimeout(() => {
              window.scrollTo(0, 0)
            }, 10)
          }, 50)
        })
      },
      // 表头固定
      handleScroll() {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop
        /*let offsetTop =
          utils.getElementToPageTop(document.getElementById("tableHead"));*/
        let offsetTop =
          utils.getElementToPageTop(this.$refs.tableHead) + 60
        /*if((document.body.offsetHeight - document.querySelectorAll('.infiniteScroll')[0].clientHeight) > 100 && this.props.searchType !== 1){
          return;
        }*/
        this.tableHeadFixed = scrollTop > (offsetTop / 2 - this.props.topFixed) && !this.focusin
      },
      headClick(item) {
        this.$emit('headClick', item)
      },
      rowClick(item, e, index) { // 如果在组件外部插槽中使用click函数，则这个函数可以废弃
        if (Array.prototype.indexOf.call(e.currentTarget.firstElementChild.classList, 'blue-li') !== -1) {
          this.$emit('rowClick', item,index,e)
        }
      },
      loadMore() {
        this.$emit('loadMore')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .address-overflow{
   display: inline-block;
   max-height: 70px;
   overflow-x: hidden;
   overflow-y: auto;
  }
</style>
