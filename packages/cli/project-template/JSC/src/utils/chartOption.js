import utils from '@/utils/utils'
let baseOption = {
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
        left: '8%',
        right: '8%',
        bottom: '3%',
        containLabel: true
    },
    legend: {
        // 图例形状 默认折线图为line 柱状图为 roundRect
        data: [{name: '', icon: 'roundRect'}, {name: '', icon: 'line'}, {name: '', icon: 'line'}],
        right: '5%',
        y: '10px',
        itemWidth: 16, //图例的宽度
        itemHeight: 10, //图例的高度
        textStyle: {
            fontSize: 11,
            color: '#999',
        }
    },
    // 默认为空
    series: [],
    // x轴默认为一个
    xAxis: [{
        type: 'category',
        data: [],
        axisLabel: {
            showMaxLabel: true,
            // interval: 0,
            rotate: '35',
            textStyle: {
                color: '#999999',
                fontSize: 11,
                fontWeight: 400
            },
            formatter: function (value, index) {
                let dateFormat = /^(\d{4})-(\d{2})-(\d{2})$/
                if (dateFormat.test(value)) {
                    //true，是yyyy-MM-dd格式
                    let val = new Date(value)
                    // let myyear = val.getFullYear();
                    let mymonth = val.getMonth() + 1
                    let myweekday = val.getDate()

                    if (mymonth < 10) {
                        mymonth = '0' + mymonth
                    }
                    if (myweekday < 10) {
                        myweekday = '0' + myweekday
                    }
                    return (mymonth + '-' + myweekday)
                } else {
                    //false,不是yyyy-MM-dd格式
                    return value
                }

            },
        },
        axisPointer: {
            type: 'shadow'
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
    // y轴默认一个
    yAxis: [
        {
            type: 'value',
            // min: function(value) {
            //     return Math.floor(value.min * 10) / 10;
            // },
            // max: function(value) {
            //     return Math.ceil(value.max * 10) / 10;
            // },
            axisLabel: {
                show: true,
                formatter: function (value, index) {
                    let val = value, percents
                    if (val >= 10000 || val <= -10000) {
                        percents = Math.round(val / 10000 * 100) / 100
                        return percents + '万'
                    } else {
                        return val
                    }
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
            offset: 8,
        }
    ],

}
/**
 * 必传参数 legend ydata xdata
 */
const getChartOption = function (options = {}) {
    let {
        legend,
        ydata,
        xdata,
        // 对应 显示的类型 目前主要为 line bar  默认全是line
        chartTypes,
        tooltip = {},
        yAxis = {},
        // 柱状图配置相关
        barConfig = {},
        /**
         * 当个数大于7的时候 有效
         * 
         * scale  是否 可以缩放
         * 
         * startValue 开始的位置
         * 
         * endValue 结束的位置
         */
        startValue,
        endValue,
        scale
    } = options;
    /**
     * 当 legend  和 xdata不合法的时候 则返回基础配置
     */
    if (!legend || !Array.isArray(legend) || legend.length === 0 || !xdata || !Array.isArray(xdata) || xdata.length === 0) return baseOption;

    baseOption.xAxis[0].data = xdata
    /**
     * 判断是否有数据
     */
    if (ydata && Array.isArray(ydata) && ydata.length > 0) {

        let legendData = [], 
        seriesData = [], 
        ydata2 = utils.publicChartLineLabel(ydata, 'W'),
        len = xdata.length;
        
        chartTypes = chartTypes || Array.from({length: legend.length}).fill('line');

        legend.forEach((name, index) => {
            // 设置legend
            legendData.push({name, icon: chartTypes[index]})
            // 设置 seriesData 配置
            let param;
            /**
             * 柱状图时候 配置为单独的 可以通过传入 barConfig 覆盖相同key的配置  data不建议修改
             */
            if (chartTypes[index] === 'bar') {
                param = {
                    name,
                    type: "bar",
                    barWidth: "12",
                    itemStyle: {
                        normal: {
                            color: '#6699FF'
                        }
                    },
                    data: ydata2[index].map(item => item.value),
                    label: {
                        show: false,
                        color: "#6699FF",
                        position: 'top',
                        formatter: function (params) {
                            if (params.data >= 10000) {
                                return Math.round(params.data / 10000 * 100) / 100
                            } else {
                                return params.data
                            }
                        },
                    },
                    ...barConfig
                }
            } else {
                /**
                 * 折线图 为常规配置
                 */
                param =  {
                    name,
                    type: chartTypes[index],
                    symbol: 'circle',
                    data: ydata2[index],
                    label: {
                        show: true,
                        textStyle: {
                            textBorderColor: '#fff',
                            textBorderWidth: 2,
                        },
                    },
                };
            }
            seriesData.push(param)
        })

        /**
         * 浮层显示 是否需要格式化 如果需要可以配置一个 formatter方法里面写入符合echart的逻辑
         */
        if (tooltip.formatter && typeof tooltip.formatter === 'function')  {

            baseOption.tooltip['formatter'] = formatter(type)
        }

        baseOption.legend.data = legendData

        baseOption.series = seriesData

        baseOption.yAxis[0] = {...baseOption.yAxis[0], yAxis}
        
        /**
         * 统一处理  当长度大于7的时候 展示可滑动样式
         */
        if (len > 7) {
        
            baseOption.grid['bottom'] = '10px';
            
            if(typeof startValue !== 'number' || typeof endValue !== 'number') {
                startValue = len - 6
                endValue = len
            }
    
            baseOption['dataZoom'] = [{
                type: 'slider',
                show: true,
                height: 30,
                bottom: 10,
                borderColor: 'transparent',
                backgroundColor: 'transparent',
                handleSize: 0,
                handleStyle: {
                    borderColor: 'transparent',
                    shadowColor: 'transparent'
                },
                startValue,
                endValue,
                zoomLock: false,
                // showDetail: false,
                labelFormatter: function () {return ''},
                dataBackground: {
                    lineStyle: {opacity: 0},
                    areaStyle: {opacity: 0}
                },
                fillerColor: 'rgba(167,183,204,0.2)'
                // showDataShadow: 'none'
            }]
    
            if (scale) baseOption['dataZoom'][1] = {
                type: 'inside',
                moveOnMouseMove: false,
                moveOnMouseWheel: false
            };
        }

        return baseOption;
        
    }

    baseOption.legend.data = legend

    return baseOption;
}


export default getChartOption
