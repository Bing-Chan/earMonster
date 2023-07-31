<template>
    <div id="searchPanel">
        <div class="search-box">
            <i class="icon-search"></i>
            <input class="input-text" v-model.trim="keyword" :placeholder="word" type="search">
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
    import {mapState, mapMutations} from 'vuex'
    import {querySelectShareCenterOrg} from '@/api'
import utils from '@/utils/utils'

    export default {
        props: {
            // queryDate: {
            //     type: Date,
            //     default: ''
            // },
            orgType: {
                type: String,
                default: ''
            },
            orgCode: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                keyword: '',
                orgSelectList: [],
                showOrgSelectDialog: false,
                word:'',
                queryDate:'',
            }
        },
        computed: {
            ...mapState('common', ['currentDate', 'customStartDay', 'customEndDay', 'activeType', 'isNullData']),
            ...mapState('business', ['complaintHeaderTabType', 'complaintRateTabType', 'complaintRatePieType', 'complaintEChartLineName', 'complaintBranchDrillType','complaintChannelType']),
        },
        mounted() {
            window.addEventListener('touchstart', this.handlerSelectDialog)
            this.word = this.orgType==='EMP'?'输入运单号':'输入组织'
        },
        methods: {
            // 组织机构查询
            querySelectOrg(keyword) {
                if (!keyword) {
                    return this.showOrgSelectDialog = false;
                }
                let params = {
                    complaintType:this.complaintHeaderTabType,

                    orgCode: this.orgCode,         //是否进行权限管控 true or false
                    orgType: this.orgType,    //查询维度:  ‘region’ 省区 ‘center’ 中心 ‘branch’ 分公司，'orgCenter' 直营中心，'customCenter' 非直营中心
                    keyword: keyword,			//查询关键词 输入code 或者 name 进行模糊查询
                    queryDate: this.currentDate,  //查询时间 (日 2019-02-28, 月 201902, 年 2019)
                    queryType: this.activeType, //查询时间类型 (日 date,  月 month , 年 year, 自定义 custom)
                    startDate: this.customStartDay, //自定义时间查询 开始日期 2019-02-28
                    endDate: this.customEndDay,    //自定义时间查询  结束日期 2019-03-01
                };
                querySelectShareCenterOrg(params).then(res => {
                    this.orgSelectList = res.data;
                    // this.showOrgSelectDialog = res.data.orgSelectList.length !== 0;
                    this.showOrgSelectDialog = true;
                })
            },
            //选择组织(回传)
            handlerSelectOrgCode(item) {
                this.$emit('handlerSelectOrgCode', item);
                this.showOrgSelectDialog = false;
                this.keyword = '';
            },
            //隐藏组织弹窗
            handlerSelectDialog(event) {
                if (this.showOrgSelectDialog) {
                    if (!this.$refs.orgList.contains(event.target)) {
                        this.showOrgSelectDialog = false;
                        this.keyword = '';
                    }
                }
            },

        },
        watch: {
            keyword() {
                utils.throttle(() => {
                    this.querySelectOrg(this.keyword);
                }, 300);
            },
        },
        destroyed() {
            window.removeEventListener('touchstart', this.handlerSelectDialog)
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


