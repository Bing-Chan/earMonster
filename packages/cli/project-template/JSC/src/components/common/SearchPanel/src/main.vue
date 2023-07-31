<!--
 * @Author: dengjihua
 * @description: no des
 * @LastEditors: dengjihua
 * @LastEditTime: 2021-02-02 17:14:47
 * @Date: 2021-01-21 10:47:23
-->
<template>
  <div class="yto-search-panel">
    <div class="search-panel-box">
      <i class="search-panel-icon" @click="searchHandler"></i>
      <input
        type="text"
        v-model.trim="keyword"
        class="search-panel-val"
        @blur="blurHandler"
        @focus="focusHandler"
        :placeholder="placeholder"
      />
      <i
        class="search-panel-delete"
        v-show="keyword"
        @click="clearKeyWordHandler"
      ></i>
    </div>
    <div class="search-org-res" v-show="showSearchRes" ref="res">
      <ul v-if="tableList.length > 0" class="search-org-box">
        <li
          class="search-org-list"
          v-for="(item, index) in tableList"
          :key="index"
          @click="selectItemHandler(item)"
        >
          <slot name="list" :item="item">{{ item.name }}</slot>
        </li>
      </ul>
      <div v-else-if="loading" class="none-data">
        <i class="search-panel-loading"></i>
      </div>
      <div v-else class="none-data">暂无搜索结果</div>
    </div>
  </div>
</template>
<script>
/**
 * 该组件默认是搜索组织机构的 如果需要特定的接口或者特定的自定义搜索可以传入 组装好的搜索参数
 */
import { querySelectOrgByCondition } from "@/api";
import utils from "@/utils/utils";
export default {
  name: "yto-search-panel",
  props: {
    /**
     * 是否需要权限控制
     */
    authority: {
      type: String,
      default: "false",
    },
    /**
     * 查询维度:
     *
     * ‘region’ 省区 ‘center’ 中心 ‘branch’ 分公司，'orgCenter' 直营中心，'customCenter' 非直营中心
     */
    dimension: String,
    /**
     * 当前页面组织结构代码，如果是首页，为userOrgCode, 如果是下钻后的页面，则为下钻的 组织机构代码  ******这个一般根据具体业务进行定义*****
     */
    orgCode: String,
    orgLevel: String,
    placeholder: {
      type: String,
      default: "输入组织",
    },
    /**
     * 初始化时候的搜索字段  这个是为了业务端保存了搜索信息  需要在这边展示的时候需要的
     */
    initValue: String,
    /**
     * 自定义搜索时候所需要的参数
     */
    customName: String,
    getParams: Function,
    /**
     * 接口API方法
     * 需要在调用页面赋具体业务明细列表接口
     */
    queryListAPI: Function,
    /**
     * 漏称重 中心层级 type 切换
     */
    inOutSearchType: Array,
    /**
     * 如果在 一个页面搜索调用的接口不同 可以额外传入该值作为区分
     *
     * 1、车辆监控 tab切换时候 对应的判断
     */
    customNameTab: String,
  },
  created() {
    if (this.initValue) {
      this.initValueFlag = true;
      this.keyword = this.initValue.trim();
    }
  },
  data() {
    return {
      // 搜索的关键词
      keyword: "",
      selectItem: {},
      // 搜索的数据结果 列表
      tableList: [],
      // 是否显示搜索结果
      showSearchRes: false,
      loading: false,
    };
  },
  watch: {
    /**
     * 关键字变化之后 就开始搜索
     */
    keyword() {
      utils.throttle(this.searchHandler, 300);
    },
    initValue(v) {
      if (v === this.keyword) return;
      this.keyword = v;
    },
  },
  mounted() {
    window.addEventListener("touchstart", this.handlerSelectDialog, false);
    this.$once("hook:destroyed", function () {
      window.removeEventListener("touchstart", this.handlerSelectDialog, false);
    });
  },
  methods: {
    getCustomFunctionParam() {
      /**
       * 如果这个名字存在  则根本不同的名字 对应的业务场景有所不同
       */
      return this.queryListAPI({
        ...this.getParams(),
        keyWord: this.keyword, //查询关键字
        pageNo: 1,
        limit: 10,
      });
    },
    /**
     * 处理结果 因为自定义的格式可能有所不同因此需要单独处理
     */
    resultHandler({ status, data }) {},
    /**
     * 搜索结果
     */
    async searchHandler() {
      /**
       * 初始化的时候 不请求数据  initValueFlag
       *
       * 用户可以手动点击搜索按钮 触发搜索
       */
      if (this.initValueFlag) return (this.initValueFlag = false);
      /**
       * 如果不存在 或者手动清除完毕之后 则不做处理 并且隐藏 展示列表的框框
       */
      if (!this.keyword) return (this.showSearchRes = false);

      this.showSearchRes = true;
      this.loading = true;

      this.tableList = [];
      /**
       * 是否是自定义请求参数
       */
      try {
        const { status, data } = await this.getCustomFunctionParam();
        /**
         * 拿到结果之后 因为自定义的格式可能有所不同因此需要单独处理
         */
        if (status === 0) {
          let tbody;
          tbody = data.tbody;
          if (tbody.length > 0) {
            this.tableList = tbody.map((item) => ({
              ...item,
              name: item.emplid ? item.name : item.orgName,
              code: item.emplid ? item.emplid : item.orgCode,
            }));
          }
        }
      } catch (e) {}

      this.loading = false;
    },
    /**
     * 选中某一个搜索结果 处理：1、告诉业务选中的结果 2、把当前的keyword设置为选中的名称 3、隐藏结果列表
     */
    selectItemHandler(item) {
      this.$emit("select", item);
      this.keyword = item.name;
      this.showSearchRes = false;
      // 这个设置是为了防止请求的
      this.initValueFlag = true;
    },
    /**
     * 清除当前展示的信息
     */
    clearKeyWordHandler() {
      this.keyword = "";
      this.$emit("select", {});
    },
    /**
     * 获取请求的参数  如果有特别判断 可在此判断 增加或者减少
     */
    getSearchParams() {
      return {
        authority: this.authority,
        dimension: this.dimension ? this.dimension : this.orgLevel,
        keyword: this.keyword,
        currentOrgCode: this.orgCode,
      };
    },
    /**
     * 隐藏组织弹窗  情况：处理之后没有点击的情况
     */
    handlerSelectDialog(event) {
      if (this.showSearchRes) {
        const isContain = this.$refs["res"].contains(event.target);
        /**
         * 1、当list存在的情况下 点击的不是列表
         *
         * 2、点击的列表是没有数据的
         */
        if (
          !isContain ||
          (isContain && event.target.className.indexOf("none-data") !== -1)
        ) {
          this.keyword = "";
          this.showSearchRes = false;

          /**
           * 这个时候是否要清空原来的搜索条件
           */
        }
      }
    },
    focusHandler(e) {
      setTimeout(function () {
        e.target.scrollIntoViewIfNeeded && e.target.scrollIntoViewIfNeeded();
      }, 200);
    },
    blurHandler() {
      if (this.initValue) {
        this.keyword = this.initValue;
        this.initValueFlag = true;
      }
    },
  },
};
</script>
