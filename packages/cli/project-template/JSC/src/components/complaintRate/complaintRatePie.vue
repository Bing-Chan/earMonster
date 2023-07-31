<template>
    <div id="complaintRatePie" class="yto-panel">
        <div class="chart-panel" :class="{'isHidden':!pieHasData}">
            <div :id="chartId" class="chart-canvas"></div>
            <div id="chartMemu" class="chart-memu" v-if="hasMemu">
                <ul>
                    <li :class="{'active':complaintRatePieType === 'all'}"
                        @click="handleEchartPieTabs('all')">全部
                    </li>
                    <li :class="{'active':complaintRatePieType === item.key}" :key="item.key" v-for="(item) in chartMemu"
                        @click="handleEchartPieTabs(item.key)">
                        {{item.name}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="chart-none-data" v-if="!pieHasData">暂无数据</div>
    </div>

</template>

<script>
    import {mapState, mapMutations} from 'vuex'

    import {
        queryComplaintByEchartPie,
    } from '@/api'
    // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts')
    //引入标题
    require("echarts/lib/component/legend")
    // 引入柱状图
    require('echarts/lib/chart/line')
    require('echarts/lib/chart/pie')
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    export default {
        name: "complaintRateLine",
        props: {
            chartId: {
                type: String,
                default: ''
            },
            orgType: {
                type: String,
                default: ''
            },
            orgCode: {
                type: String,
                default: ''
            },
            orgName: {
                type: String,
                default: ''
            },
            hasMemu:{ //是否显示按钮
                type: Boolean,
                default: true,
            }
        },
        data() {
            return {
                eChartPieOption: {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c} ({d}%)",
                        textStyle: {
                            fontSize: 11,
                        },
                        extraCssText: 'z-index:99',
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: []
                    },

                    color: ['#2482FC', '#F35252', '#E6A733', '#3BB950', '#7A52E6', '#6D2763', '#56A0B0', '#838383'],
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            radius: ['30%', '50%'],
                            startAngle: -120, //起始角度
                            // minAngle: 10,
                            // minShowLabelAngle: 10,
                            avoidLabelOverlap: true,
                            label: {
                                normal: {
                                    formatter: function (params) {
                                        let percents = Math.round(params.percent * 100) / 100;
                                        let s = percents.toString();
                                        let rs = s.indexOf('.');
                                        if (rs < 0) {
                                            rs = s.length;
                                            s += '.';
                                        }
                                        while (s.length <= rs + 2) {
                                            s += '0';
                                        }
                                        return params.name + '(' + s + '%)'
                                        
                                    },

                                    rich: {


                                        per: {
                                            padding: [2, 4],
                                            borderRadius: 2
                                        }
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true,
                                }
                            },
                            data: []
                        }
                    ]
                },
                myChartPie: null,
                chartMemu: [],
                pieHasData: true,
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
            //饼图tabs 切换
            handleEchartPieTabs(key) {
                if (this.pageLoading) {
                    return
                }
                this.setComplaintRatePieType(key);
                this.$emit('handleEchartPieTabs',key);
            },
            // 饼图数据
            getEchartPieData() {
                if (this.complaintHeaderTabType === 'appealRate') {
                    return
                }
                let params = {
                    queryDate: this.currentDate,  //查询时间 (日 2019-02-28, 月 201902, 年 2019)
                    queryType: this.activeType, //查询时间类型 (日 date,  月 month , 年 year, 自定义 custom)
                    startDate: this.customStartDay, //自定义时间查询 开始日期 2019-02-28
                    endDate: this.customEndDay,    //自定义时间查询  结束日期 2019-03-01
                    orgType: this.orgType,     		//查询机构 ( 省区 prov, 中心 center, 分公司 branch)
                    orgCode: this.orgCode,  		//查询机构代码（省区列表页面为当前用户所在组织机构code）
                    tabType: this.complaintRateTabType,
                };
                queryComplaintByEchartPie(params).then(res => {
                    this.pieHasData = res.data.result !== undefined && res.data.result.length !== 0;
                    this.$emit('dataStates',  'pieHasData', this.pieHasData);
                    this.eChartPieOption.series[0].data = res.data.result;
                    this.chartMemu = res.data.result;
                    this.$nextTick(() => {
                        this.myChartPie = echarts.init(document.getElementById(this.chartId));
                        this.myChartPie.clear()
                        this.myChartPie.setOption(this.eChartPieOption);
                        this.myChartPie.hideLoading()
                    });

                })
            },
        }
    }
</script>

<style scoped lang="scss">
    #complaintRatePie {
        .chart-panel {
            text-align: center;
            box-sizing: border-box;
            padding: 0 10px;

            .chart-canvas {
                display: inline-block;
                text-align: left;
                margin: 0 auto;
                width: 100%;
                height: 250px;

            }
            .chart-memu {

                padding-bottom: 20px;

                ul {
                    width: 100%;
                    overflow: auto;
                    white-space: nowrap;

                    li {

                        display: inline-block;
                        margin: 0 10px;
                        padding: 0 10px;
                        height: 30px;
                        line-height: 30px;
                        border-radius: 20px;
                        border: 1px solid rgba(210, 210, 210, 1);

                        &.active {
                            color: #fff;
                            background: rgba(36, 130, 252, 1);

                            border: 1px solid rgba(36, 130, 252, 1);
                        }
                    }


                }
            }

        }

    }
</style>
