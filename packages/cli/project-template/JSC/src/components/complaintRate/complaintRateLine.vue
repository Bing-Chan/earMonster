<template>
    <div id="complaintRateLine" class="yto-panel">
        <p class="yto-panel-head">趋势图
          <span v-if="complaintHeaderTabType === 'complaintRate'" class="yto-panel-flright clearfix">
                <span :class="{'img-box active': lineTab ==='num'}" class="img-box line-dimension" @click="switchEchartsLine('num')">
                    投诉量
                </span>
                <span :class="{'img-box active': lineTab ==='rate'}" class="img-box line-dimension" @click="switchEchartsLine('rate')">
                  投诉率
                </span>
          </span>
            <span v-if="complaintHeaderTabType === 'appealRate'" class="yto-panel-flright clearfix">
                <span :class="{'img-box active': lineType ==='NUM'}" class="img-box line-dimension" @click="switchEchartsLine('NUM')">
                    投诉量
                </span>
                <span :class="{'img-box active': lineType ==='RATE'}" class="img-box line-dimension" @click="switchEchartsLine('RATE')">
                  投诉率
                </span>
          </span>
        </p>
        <div class="chart-panel" :class="{'isHidden':!lineHasData}">
            <div :id="chartId" class="chart-canvas"></div>
        </div>
        <div class="chart-none-data" v-if="!lineHasData">暂无数据</div>
    </div>

</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import utils from '@/utils/utils'
    import {
        queryComplaintByEchartLine,
        querComplaintAppealByEchartLine,
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
        },
        data() {
            return {
                eChartLineName: '总投诉率',
                eChartLineOption: {
                    color: ['#2482FC', '#F35252', '#E6A733', '#3BB950', '#7A52E6', '#6D2763', '#56A0B0', '#838383'],
                    tooltip: {
                        trigger: 'axis',
                        textStyle: {
                            fontSize: 11,
                        },
                        extraCssText: 'z-index:99',
                    },
                    grid: {
                        //距离上边框的距离（以下依次）
                        top: '18%',
                        left: '6%',
                        right: '6%',
                        bottom: '3%',
                        containLabel: true,
                    },
                    legend: {
                        data: [{name: '', icon: 'line'}, {name: '', icon: 'line'}],
                        right: '0',
                        y: '10px',
                        itemWidth: 12, //图例的宽度
                        itemHeight: 10, //图例的高度
                        textStyle: {
                            fontSize: 11,
                            color: '#999',
                        }
                    },
                    xAxis: [{
                        type: 'category',
                        data: [],
                        axisLabel: {
                            showMaxLabel: true,
                            rotate: "35",
                            textStyle: {
                                color: '#999999',
                                fontSize: 11,
                                fontWeight: 400
                            },
                            formatter: function (value, index) {
                                let dateFormat = /^(\d{4})-(\d{2})-(\d{2})$/;
                                if (dateFormat.test(value)) {
                                    //true，是yyyy-MM-dd格式
                                    let val = new Date(value)
                                    // let myyear = val.getFullYear();
                                    let mymonth = val.getMonth() + 1;
                                    let myweekday = val.getDate();

                                    if (mymonth < 10) {
                                        mymonth = "0" + mymonth;
                                    }
                                    if (myweekday < 10) {
                                        myweekday = "0" + myweekday;
                                    }
                                    return (mymonth + "-" + myweekday);
                                } else {
                                    //false,不是yyyy-MM-dd格式
                                    return value;
                                }

                            },
                        },
                        axisTick: {
                            show: false
                        },
                        boundaryGap: false,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#999999',
                            }
                        }
                    }],
                    yAxis: [
                        {
                        type: 'value',
                        // min: function (value) {
                        //     let m = Math.floor(value.min * 10) / 10;
                        //     return Math.floor(m * 0.9);
                        // },
                        // max: function (value) {
                        //     return Math.ceil(value.max * 10) / 10;
                        // },
                        axisLabel: {
                            show: true,
                            formatter: function (value, index) {
                                if (value >= 10000) {
                                    value = value / 10000 + "万";
                                }
                                return value;
                            },
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#f3f3f3',
                                width: 1,
                                type: 'solid'
                            }
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#999999',
                            },
                        },
                        offset: 10,
                    }
                    ],
                      series: [{
                        name: '所选时间',
                        type: 'line',
                        // smooth: true,
                        symbol: 'circle',
                        lineWidth: 3,
                        data: [],
                        },
                        {
                                name: '去年同期对比',
                                type: 'line',
                                // smooth: true,
                                symbol: 'circle',
                                lineWidth: 3,
                                data: [],
                            }
                      ]
                },
                myChartLine: null,
                lineHasData: true, //折线图是否有数据
                lineTab:'num',
                lineType:'NUM',
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

            switchEchartsLine(type) {
                if (this.complaintHeaderTabType === 'complaintRate') {
                    if(this.lineTab === type){
                        return
                    }else{
                        this.lineTab = type
                    }
                }
                if (this.complaintHeaderTabType === 'appealRate') {
                    if(this.lineType === type){
                        return
                    }else{
                        this.lineType = type
                    }
                }


              this.getEcharttLineData();
            },

            // 折线图数据
            getEcharttLineData() {
                let fetchMthodName;
                if (this.complaintHeaderTabType === 'complaintRate') {
                    fetchMthodName = queryComplaintByEchartLine
                }
                if (this.complaintHeaderTabType === 'appealRate') {
                    fetchMthodName = querComplaintAppealByEchartLine
                }
                let params = {
                    queryDate: this.currentDate,                    //查询时间 (日 2019-02-28, 月 201902, 年 2019)
                    queryType: this.activeType,                     //查询时间类型 (日 date,  月 month , 年 year, 自定义 custom)
                    startDate: this.customStartDay,                 //自定义时间查询 开始日期 2019-02-28
                    endDate: this.customEndDay,                     //自定义时间查询  结束日期 2019-03-01
                    orgType: this.orgType,     		                //查询机构 ( 省区 prov, 中心 center, 分公司 branch)
                    orgCode: this.orgCode,  		//查询机构代码（省区列表页面为当前用户所在组织机构code）
                    // userOrgType: 'HEAD'                          //当前用户所在组织机构类型 （总部 HEAD,管区MANAGE_AREA,省区REGION_MANAGE）
                    tabType: this.complaintRateTabType,
                };
                if(this.complaintHeaderTabType === 'complaintRate'){
                  params.lineTab = this.lineTab
                }
                if(this.complaintHeaderTabType === 'appealRate'){
                  params.lineType = this.lineType
                }
                fetchMthodName(params).then(res => {
                    this.eChartLineOption.xAxis[0].data = res.data.xdata;
                    this.lineHasData = res.data.ydata[0].length !== 0;

                    if (this.complaintHeaderTabType === 'complaintRate') {
                      this.eChartLineOption.legend.data[0].name =res.data.legend[0]
                      this.eChartLineOption.legend.data[1].name =res.data.legend[1]
                      this.eChartLineOption.series[0].name = res.data.legend[0];
                      this.eChartLineOption.series[1].name = res.data.legend[1];
                      this.eChartLineOption.series[0].data = utils.lineLabelPosition(res.data.ydata,'W')[0]
                      this.eChartLineOption.series[1].data = utils.lineLabelPosition(res.data.ydata,'W')[1];
                    }
                    if (this.complaintHeaderTabType === 'appealRate') {
                      this.eChartLineOption.legend.data[0].name =res.data.legend[0]
                      this.eChartLineOption.legend.data[1].name =res.data.legend[1]
                      this.eChartLineOption.series[0].name = res.data.legend[0];
                      this.eChartLineOption.series[1].name = res.data.legend[1];
                      this.eChartLineOption.series[0].data = utils.lineLabelPosition(res.data.ydata,'W')[0];
                      this.eChartLineOption.series[1].data =  utils.lineLabelPosition(res.data.ydata,'W')[1];
                    }

                    this.$emit('dataStates', 'lineHasData', this.lineHasData);
                    this.$nextTick(() => {
                        this.myChartLine = echarts.init(document.getElementById(this.chartId));
                        this.myChartLine.clear()
                        this.myChartLine.setOption(this.eChartLineOption);
                        this.myChartLine.hideLoading()
                    });

                })
            },
        }
    }
</script>

<style scoped lang="scss">
    #complaintRateLine {
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

        }
        .yto-panel-flright {
            float: right;
            height: 40px;
            margin-right: 10px;
            display: flex;
            align-items: center;

            .img-box {
                width: 60px;
                height: 25px;
                display: flex;
                align-items: center;
                background: #F5F5F5;
                border-radius: 5px;
                text-align: center;
                justify-content: center;
            }
            .line-dimension{
              font-size: 14px;
            }

            .img-box.active {
                background: #D4E7FE;
                color: #2482FC;
            }

        }

    }
</style>
