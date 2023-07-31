<template>
    <div id="TableList">
        <div class="yto-panel">
            <!-- 副标题插槽 -->
            <template v-if="$slots.subhead">
                <p class="slot-subhead">
                    <slot name="subhead"></slot>
                </p>
            </template>
            <!--END-->
            <p class="yto-panel-head" v-if="tableTitle">{{ tableTitle }}
                <!-- 总条数插槽 -->
                <template v-if="$slots.totalNumber">
                    <span class="total-number">
                        <slot name="totalNumber"></slot>
                    </span>
                </template>
                <!--END-->
                <!-- 搜索插槽 -->
                <template v-if="$slots.searchPanel">
                    <slot name="searchPanel"></slot>
                </template>
                <!--END-->
            </p>
            <div class="list-custom" id="tableHead" ref="tableHead">
                <ul class="list-head" ref="listHead"
                    :class="{ 'tableFixed': tableHeadFixed}"
                    :style="{'--tableFixed-top': tableFixedTop}">
                    <li v-show="item.show"
                        v-for="(item, index) in tableHead"
                        :key="index"
                        @click="handleSort(item)"
                        :class="columnCssHead(item.label,item)">
                        <span v-html="formatColumnHead(item.label,item)"></span>
                        <i v-show="item.sortable" class="icon-sort-default"
                           :class="{'icon-sort-desc':  sortColumn === item.prop && sortType === 'DESC', 'icon-sort-asc': sortColumn === item.prop && sortType === 'ASC' }">
                        </i>
                    </li>
                </ul>
                <ul class="list-head-space" v-if="tableHeadFixed" :style="{'--list-head-space-height': listHeadHeight}">
                    <li></li>
                </ul>
                <div class="infiniteScroll"
                     v-infinite-scroll="loadMore"
                     infinite-scroll-distance="10">
                    <ul class="list-body"
                        v-for="(item, index) in tableData"
                        :key="index"
                        @click="rowClick(item,index)">
                        <template v-for="(sub,i) in tableHead">
                            <li v-if="sub.show" :key="i" :class="columnCss(sub.prop,item)">
                                <span v-html="formatColumn(sub.prop,item[sub.prop],item)"></span>
                            </li>
                        </template>
                    </ul>
                </div>
                <ul v-show="tableData.length === 0 && !pageLoading" class="list-foot">
                    <li v-if="searchType === 1">
                        暂无搜索结果
                        <span class="refresh-btn" @click="initialTableList">返回</span>
                    </li>
                    <li v-else>暂无数据</li>
                </ul>
            </div>
        </div>
        <div class="loading-panel" v-if="baseText">
            <mt-spinner v-show="paging && hasMore" type="fading-circle" :size="30"></mt-spinner>
            <div class="no-more" v-show="tableNoMore">
                {{ baseText }}
            </div>
        </div>

    </div>
</template>
<script>
import utils from '@/utils/utils'
import '@/utils/smoothscroll'

export default {
    props: {
        tableTitle: { //标题
            type: String,
            default: () => '明细数据'
        },
        tableHead: {  //表头数据
            type: Array,
            default: () => []
        },
        tableData: { //列表数据
            type: Array,
            default: () => []
        },
        sortColumn: { //默认列排序
            type: String,
            default: () => ''
        },
        sortType: { //排序方式
            type: String,
            default: () => ''
        },
        pageLoading: { //接口是否加载完成
            type: Boolean,
            default: () => false
        },
        searchType: { //是否为搜索结果
            type: Number,
            default: () => 0
        },
        hasMore: { //是否有下一页
            type: Boolean,
            default: () => false
        },
        paging: { //是否有分页
            type: Boolean,
            default: () => true
        },
        formatColumnHead: { //表头格式化列（列值显示方式）
            type: Function,
            default: (label, item) => {
                return label
            }
        },
        columnCssHead: { //表头格式化列（列值样式）
            type: Function,
            default: (label, item) => {
                return ''
            }
        },
        formatColumn: { //格式化列（列值显示方式）
            type: Function,
            default: (prop, val, row, fixed) => {
                return val
            }
        },
        columnCss: { //格式化列（列值样式）
            type: Function,
            default: (prop, row) => {
                return ''
            }
        },
        rowClick: { //点击列
            type: Function,
            default: () => Function
        },
        loadMore: { //上拉加载
            type: Function,
            default: () => Function
        },
        initialTableList: { //重置表格数据
            type: Function,
            default: () => Function
        },
        baseText: { //底部文字描述
            type: [String, Boolean],
            default: () => '我也是有底线的...'
        },
        stickyHead: { //是否浮动表头
            type: Boolean,
            default: () => true
        },

    },
    data () {
        return {
            tableHeadFixed: false, // 是否浮动
            headerMenuHeight: 0,  //父组件顶部悬浮菜单高度
            datePanelHeight: 0, //父组件日期控件高度
            topFixed: 0,    //与顶部距离
            listHeadHeight: '40px', //表头默认高度
            tableFixedTop: '0', //与顶部距离px

        }
    },
    computed: {
        tableNoMore () {
            return (this.paging && !this.hasMore && this.tableData.length !== 0)
        },
    },
    mounted () {
        window.addEventListener('scroll', this.handleScroll)
    },

    methods: {
        handleScroll () { // 固定表头
            this.$nextTick(() => {
                if (this.stickyHead) {
                    this.tableHeadFixed = this.$refs.tableHead.getBoundingClientRect().top < this.topFixed
                }
            })

        },
        handleSort (item) { //排序
            if (this.tableHeadFixed) {
                this.$nextTick(() => {
                    window.scrollTo({
                        top: this.getElementTop(this.$refs.tableHead) - this.topFixed,
                        left: 0,
                        behavior: 'smooth',

                    })
                })

            }
            this.$emit('handleSort', item)
        },
        getElementTop (el) { // 获取元素与顶部距离
            let actualTop = el.offsetTop
            let current = el.offsetParent
            while (current !== null) {
                actualTop += current.offsetTop
                current = current.offsetParent
            }
            return actualTop
        }
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll)
    },
    watch: {
        tableData (val) {
            this.$nextTick(() => {
                if (this.$parent.$refs.headerMenu) {
                    this.headerMenuHeight = this.$parent.$refs.headerMenu.$el.offsetHeight
                }
                if (this.$parent.$refs.datePanel) {
                    this.datePanelHeight = this.$parent.$refs.datePanel.$el.offsetHeight
                }
                this.topFixed = this.headerMenuHeight + this.datePanelHeight
                this.listHeadHeight = this.$refs.listHead.offsetHeight + 'px'
                this.tableFixedTop = this.topFixed + 'px'
            })
        },
    },

}
</script>
<style lang="scss" scoped>
#TableList {
    .tableFixed {
        top: var(--tableFixed-top, 0);

    }

    .list-head-space {
        height: var(--list-head-space-height, 40px)
    }

    .slot-subhead {
        padding-left: 16px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px dashed #E9E9E9;
    }
}
</style>


