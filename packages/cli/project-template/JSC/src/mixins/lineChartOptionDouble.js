export const lineChartOptionDouble = {
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
      top: '2%',
      right: '0',
      y: '0px',
      itemWidth: 12, //图例的宽度
      itemHeight: 0, //图例的高度
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
    yAxis: [{
        type: 'value',
        axisLabel: {
            show: true,
            // formatter: function (value, index) {
            //     if (value >= 10000) {
            //         value = value / 10000 + "万";
            //     }
            //     return value;
            // },
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
    }],
    series: [{
        name: '所选时间',
        type: 'line',
        // smooth: true,
        symbol: 'circle',
        data: [],
    },
    {
        name: '',
        type: 'line',
        // smooth: true,
        symbol: 'circle',
        data: [],
    }]
};
