export const lineChartOptionNew = {
    color: ['#af81f9', '#4C84FF', '#d9d9d9', '#a2e756', '#2482FC', '#F35252', '#3BB950', '#E6A733', '#7A52E6', '#6D2763', '#56A0B0', '#838383'],
    tooltip: {
        trigger: 'axis',
        textStyle: {
            fontSize: 11,
        },
        formatter: (params) => {
            let tempTxt = params && params[0] ? params[0].name + '<br>' : ''
            for (let i = 0; i < params.length; i++) {
                tempTxt += params[i].marker + params[i].seriesName + '：&nbsp;&nbsp;' + params[i].data[i + 1] + (i == 3 ? '%' : '') + '<br>'
            }
            return tempTxt
        },
        extraCssText: 'z-index:99',
    },
    grid: {
        //距离上边框的距离（以下依次）
        top: '18%',
        left: '4%',
        right: '2%',
        bottom: '4%',
        containLabel: true,
    },
    legend: {
        top: '2%',
        right: '0',
        itemWidth: 12, //图例的宽度
        itemHeight: 1, //图例的高度
        textStyle: {
            fontSize: 11,
            color: '#999',
        },
    },
    dataset: {
        source: [],
    },
    xAxis: {
        type: 'category',
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
        // boundaryGap: false,
        axisLine: {
            show: false,
            lineStyle: {
                color: '#999999',
            }
        }
    },
    yAxis: [{
        type: 'value',
        min: 0,
        max: 1000,
        interval: 200,
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
    }, {
        type: 'value',
        name: '',
        min: 0,
        max: 100,
        interval: 20,
        position: 'right',
        alignTicks: true,
        axisLabel: {
            formatter: function (value) {
                return value < 100 ? value : value + '%';
            }
        },
        axisLine: {
            show: false,
            lineStyle: {
                color: '#999999',
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
    }],
    series: [{
        name: '',
        type: 'bar',
        barWidth: 12,
        itemStyle: {
            normal: {
                color: '#af81f9'
            }
        },
        label: {
            show: false,
            color: '#af81f9',
            position: 'top',
            formatter: function (params) {
                if (params.data >= 10000) {
                    return Math.round(params.data / 10000 * 100) / 100
                } else {
                    return params.data
                }
            },
        },
    }, {
        name: '',
        type: 'bar',
        barWidth: 12,
        itemStyle: {
            normal: {
                color: '#4C84FF'
            }
        },
        label: {
            show: false,
            color: '#4C84FF',
            position: 'top',
            formatter: function (params) {
                if (params.data >= 10000) {
                    return Math.round(params.data / 10000 * 100) / 100
                } else {
                    return params.data
                }
            },
        },
    }, {
        name: '',
        type: 'bar',
        barWidth: 12,
        itemStyle: {
            normal: {
                color: '#d9d9d9'
            }
        },
        label: {
            show: false,
            color: '#d9d9d9',
            position: 'top',
            formatter: function (params) {
                if (params.data >= 10000) {
                    return Math.round(params.data / 10000 * 100) / 100
                } else {
                    return params.data
                }
            },
        },
    }, {
        name: '',
        type: 'line',
        yAxisIndex: 1,
        // smooth: true,
        symbol: 'circle',
        itemStyle: {
            normal: {
                color: '#a2e756'
            }
        },
        label: {
            show: false,
            color: '#a2e756',
            position: 'top',
            formatter: function (params) {
                return params.data + '%'
            },
        },
    }]
};
