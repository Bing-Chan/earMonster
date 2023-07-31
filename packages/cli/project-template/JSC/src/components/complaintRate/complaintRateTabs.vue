<template>
    <div id="complaintRateTabs" class="yto-panel">
        <ul class="business-item" v-show="complaintHeaderTabType==='complaintRate'">
            <li :class="{'active':complaintRateTabType === item.type}" :key="index"
                v-for="(item,index) in complaintRateTabs"
                @click="handleHeadTabs(item)">
                <p class="item-text">{{item.name}}</p>
                <p class="item-num">{{item.num |formatTenThousand}}</p>
                <p class="item-subhead">{{item.subhead}}</p>
                <p class="item-rate">{{item.rate }}</p>
                <p class="item-unit">{{item.subUnit }}</p>
            </li>
        </ul>
        <ul class="business-item" v-show="complaintHeaderTabType==='appealRate'">
            <li :class="{'active':complaintRateTabType === item.type}" :key="index"
                v-for="(item,index) in appealRateTabs"
                @click="handleHeadTabs(item)">
                <p class="item-text">{{item.name}}</p>
                <p class="item-num">{{item.num |formatTenThousand}}</p>
                <p class="item-subhead">{{item.subhead}}</p>
                <p class="item-rate">{{item.rate }}</p>
                <p class="item-unit">{{item.subUnit }}</p>

            </li>
        </ul>
    </div>

</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import utils from '@/utils/utils'
    import {
        queryComplaintTabData,
        queryComplaintAppealByTabData,
    } from '@/api'

    export default {
        name: "complaintRateTabs",
        props: {
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
                tabType: 'all',
                complaintRateTabs: [
                    {
                        type: 'all',
                        name: '总投诉量',
                        num: '0',                //总投诉量
                        unit: '',
                        subhead: '总投诉率',
                        rate: '0',               // 总投诉率
                        subUnit: '（‱）',
                    },
                    {
                        type: 'normal',
                        name: '普通投诉量',
                        num: '0',              //普通投诉量
                        unit: '',
                        subhead: '普通投诉率',
                        rate: '0',            //普通投诉率
                        subUnit: '（‱）',
                    },
                    {
                        type: 'cainiao',
                        name: '菜鸟投诉量',
                        num: '0',             //菜鸟投诉量
                        unit: '',
                        subhead: '菜鸟投诉率',
                        rate: '0',            // 菜鸟投诉率
                        subUnit: '（‱）',
                    },
                    {
                        type: 'upgrade',
                        name: '升级投诉量',
                        num: '0',           //升级投诉量
                        unit: '',
                        subhead: '升级投诉率',
                        rate: '0',  //升级投诉率
                        subUnit: '（百万分之）',
                    },
                    {
                        type: 'pdd',
                        name: 'PDD投诉量',
                        num: '0',           //拼多多投诉量
                        unit: '',
                        subhead: 'PDD投诉率',
                        rate: '0',  //拼多多投诉率
                        subUnit: '（‱）',
                    }
                ],
                appealRateTabs: [
                    {
                        type: 'total',
                        name: '总二次投诉量',
                        num: '0',
                        unit: '',
                        subhead: '总二次投诉率',
                        rate: '0',
                        subUnit: '（%）',
                    },
                    {
                        type: 'normal',
                        name: '普通二次投诉量',
                        num: '0',
                        unit: '',
                        subhead: '普通二次投诉率',
                        rate: '0',
                        subUnit: '（%）',
                    },
                    {
                        type: 'cainiao',
                        name: '菜鸟二次投诉量',
                        num: '0',
                        unit: '',
                        subhead: '菜鸟二次投诉率',
                        rate: '0',
                        subUnit: '（%）',
                    },
                    {
                        type: 'pdd',
                        name: 'PDD二次投诉量',
                        num: '0',
                        unit: '',
                        subhead: 'PDD二次投诉率',
                        rate: '0',
                        subUnit: '（%）',
                    },
                ],
                tabsHasData: true,  //Tabs 是否有数据
            }
        },
        computed: {
            ...mapState('common', ['currentDate', 'customStartDay', 'customEndDay', 'activeType', 'isNullData']),
            ...mapState('business', ['complaintHeaderTabType', 'complaintRateTabType', 'complaintRatePieType', 'complaintEChartLineName']),

        },
        mounted() {


        },
        methods: {
            ...mapMutations('common', ['setCurrentDate', 'setCustomStartDay', 'setCustomEndDay', 'setActiveType', 'setIsTimeFlag']),
            ...mapMutations('business', ['setComplaintHeaderTabType', 'setComplaintRateTabType', 'setComplaintRatePieType', 'setComplaintEChartLineName']),

            //顶部 tabs 切换
            handleHeadTabs(item) {
                if (this.pageLoading) {
                    return
                }
                if (this.complaintRateTabType === item.type) return;
                // this.tabType = item.type;
                this.getTabsList();
                this.setComplaintRateTabType(item.type);
                if (this.complaintHeaderTabType === 'appealRate') {
                    this.setComplaintEChartLineName(item.subhead);
                }
                this.$emit('handleHeadTabs', item);
            },
            //Tabs数据
            getTabsList() {
                let fetchMthodName;
                if (this.complaintHeaderTabType === 'complaintRate') {
                    fetchMthodName = queryComplaintTabData
                }
                if (this.complaintHeaderTabType === 'appealRate') {
                    fetchMthodName = queryComplaintAppealByTabData
                }
                let params = {
                    queryType: this.activeType, //查询时间类型 (日 date,  月 month , 年 year, 自定义 custom)
                    startDate: this.customStartDay, //自定义时间查询 开始日期 2019-02-28
                    endDate: this.customEndDay,    //自定义时间查询  结束日期 2019-03-01
                    queryDate: this.currentDate,               //天查询
                    orgCode: this.orgCode,  		//查询机构代码（省区列表页面为当前用户所在组织机构code）
                };
                fetchMthodName(params).then(res => {
                    if (this.complaintHeaderTabType === 'complaintRate') {
                        this.complaintRateTabs[0].num = res.data[0].allNum   //总投诉量
                        this.complaintRateTabs[0].rate = res.data[0].allRate    // 总投诉率
                        this.complaintRateTabs[1].num = res.data[0].normalNum    //普通投诉量
                        this.complaintRateTabs[1].rate = res.data[0].normalRate     //普通投诉率
                        this.complaintRateTabs[2].num = res.data[0].taobaoNum   //菜鸟投诉量
                        this.complaintRateTabs[2].rate = res.data[0].taobaoRate    // 菜鸟投诉率
                        this.complaintRateTabs[3].num = res.data[0].upgradeNum    //升级投诉量
                        this.complaintRateTabs[3].rate = res.data[0].upgradeRate    //升级投诉率
                        this.complaintRateTabs[4].num = res.data[0].pddNum   //拼多多投诉量
                        this.complaintRateTabs[4].rate = res.data[0].pddRate   //拼多多投诉率
                    }
                    if (this.complaintHeaderTabType === 'appealRate') {
                        this.appealRateTabs[0].num = res.data[0].totalNum   //总二次投诉量
                        this.appealRateTabs[0].rate = res.data[0].totalRate    // 总二次投诉率
                        this.appealRateTabs[1].num = res.data[0].normalNum    //普通二次投诉量
                        this.appealRateTabs[1].rate = res.data[0].normalRate     //普通二次投诉率
                        this.appealRateTabs[2].num = res.data[0].cainiaoNum   //菜鸟二次投诉量
                        this.appealRateTabs[2].rate = res.data[0].cainiaoRate    // 菜鸟二次投诉率
                        this.appealRateTabs[3].num = res.data[0].pddNum   //拼多多二次投诉量
                        this.appealRateTabs[3].rate = res.data[0].pddRate   //拼多多二次投诉率

                    }

                    this.tabsHasData = res.data[0].allNum !== '0' && res.data[0].totalNum !== '0';
                    this.$emit('dataStates', 'tabsHasData', this.tabsHasData);
                })
            },
        },
        filters: {
            //  格式化万
            formatTenThousand(val) {
                return utils.formatTenThousand(val)
            },
        },
    }
</script>

<style scoped lang="scss">
    #complaintRateTabs {
        .business-item {
            display: flex;
            margin-bottom: 10px;
            align-items: center;
            justify-content: center;


            li {
                flex: 1;

                height: 146px;
                text-align: center;
                color: #333333;

                &.active {
                    background: #D4E7FE;
                }


                .item-text {
                    padding-top: 13px;
                    font-size: 12px;
                    font-weight: 500;
                    color: rgba(51, 51, 51, 1);
                }

                .item-num {

                    font-size: 16px;
                    height: 32px;
                    line-height: 32px;
                    font-weight: 500;
                    color: rgba(243, 82, 82, 1);
                }

                .item-subhead {
                    margin-top: 8px;
                    font-size: 12px;
                    font-weight: 500;
                    color: rgba(51, 51, 51, 1);
                }

                .item-rate {

                    font-size: 16px;
                    height: 32px;
                    line-height: 32px;
                    font-weight: 500;
                    color: rgba(243, 82, 82, 1);
                }

                .item-unit {

                    font-size: 10px;

                    font-weight: 400;
                    color: rgba(153, 153, 153, 1);
                }
            }

            li:nth-child(2) {
                border-left: 1px solid #E9E9E9;

                .item-num, .item-rate {

                    color: #3BB950;
                }
            }

            li:nth-child(3) {
                border-left: 1px solid #E9E9E9;
                border-right: 1px solid #E9E9E9;
            }

            li:nth-child(4) {
                border-right: 1px solid #E9E9E9;

                .item-num, .item-rate {

                    color: #3BB950;
                }
            }
        }

    }
</style>
