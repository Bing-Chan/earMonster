<!--
 * @Author: dengjihua
 * @description: no des
 * @LastEditors: dengjihua
 * @LastEditTime: 2020-07-29 14:26:12
 * @Date: 2020-07-10 13:41:52
--> 
<template>
    <div class="list-custom">
        <div style="display: none;" :key="tableHeadKey" v-if="tableHead.length > 0"><slot></slot></div>
        <template v-if="tableHead.length > 0">
            <yto-affix :offsetTop="fixedTop" v-if="fixed">
                <table-head :store="store"></table-head>
            </yto-affix>
            <table-head v-else :store="store"></table-head>
            <table-body :store="store"></table-body>
        </template>
    </div>
</template>
<script>
import TableStore from './store'
import TableHead from './head.js'
import TableBody from './body.js'
let tableId = 1;
export default {
    name: 'yto-table',
    provide () {
        return {table: this}
    },
    props: {
        defaultSort: {
            type: Object,
            default () {
                return {}
            }
        },
        // 是否无限滚动
        infiniteScroll: Boolean,
        /**
         * 页码相关数据 total总条目数  totalPage 总页 pageSize 每页显示的数量 pageNum 当前页码
         * 
         * "total":34,"totalPage":2,"pageSize":20,"pageNum":2
         */
        page: {
            type: Object,
            default () {
                return {}
            }
        },
        // 距离底部多少时候触发 loadMore
        distance: {
            type: Number,
            default () {
                return 100
            }
        },
        tableHead: Array,
        tableData: Array,
        // 数据是否在加载中
        pageLoading: Boolean,
        headerCellClassName: String,
        cellClassName: String,
        // 表头是否定位
        fixed: {
            type: Boolean,
            default: true
        },
        fixedTop: Number
    },
    data() {
        return {
            tableHeadKey: Date.now()
        }
    },
    computed: {
        tableId () {
            return 'tableId-' + (tableId++)
        },
        showLoadingSpinner () {
            if (!this.infiniteScroll) return false;
            
            if (!this.page.total) return false;

            if (this.page.pageNum < this.page.totalPage) return true;

            return false

        }
    },
    watch: {
        tableHead (v, ov) {
            // if (v.length === 0) return false;
            // this.store.updateColumn();
            // this.tableHeadKey = Date.now()
        }
    },
    created() {
        this.store = new TableStore(this.tableId);
    },
    methods: {
        
    },
    mounted() {
        
    },
    components: {
        TableHead,
        TableBody
    }
}
</script>