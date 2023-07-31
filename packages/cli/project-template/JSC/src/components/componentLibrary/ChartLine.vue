<template>
    <div id="ChartLine">
        <div class="yto-panel">
            <p class="yto-panel-head" v-if="eChartLineTitle">
                <span class="title" :class="{'length':list.length!==0}">{{ eChartLineTitle }}</span>
                <span class="chart-title-tabs" v-if="list.length!==0">
					<span class="item" :class="{'active': item.type ===currentType}"
                          v-for="(item,index) in list"
                          @click="clickMenu(item,$event)">{{ item[customShowLabel] }}</span>
				</span>
            </p>
            <div class="chart-panel" :class="{'isHidden':!lineHasData}">
                <div :id="eChartLineId" class="chart-canvas"></div>
            </div>
            <div class="chart-none-data" v-if="!lineHasData">暂无数据</div>
        </div>
    </div>
</template>
<script>
// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/line')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/bar')
// 引入标题
require('echarts/lib/component/legend')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/dataZoom')

export default {
    props: {
        eChartLineTitle: { //名称
            type: String,
            default: () => '折线图'
        },
        lineHasData: { //是否有数据
            type: Boolean,
            default: () => true
        },
        eChartLineOption: { //配置文件
            type: Object,
            default: () => {
            }
        },
        list: { //按钮组
            type: Array,
            default: () => []
        },
        currentType: { //当前激活
            type: [String,Number],
            default: () => ''
        },
        customShowLabel: { // 按钮组自定义显示字段
            type: String,
            default: 'name'
        },
        isZoom: { //是否支持滚动条和缩放(默认超过7条自动支持)
            type: Boolean,
            default: () => true
        },
        startAndEnd: { //滚动条默认位置
            type: Array,
            default: () => [] // [0,6]
        }

    },
    data () {
        return {
            eChartLineId: this.$route.path.replace(/\//g, '') + 'ChartLine',
            myChartLine: null,
            dataZoom: [
                {
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
                    startValue: 0,
                    endValue: 6,
                    zoomLock: false,
                    labelFormatter: function () {
                        return ''
                    },
                    dataBackground: {
                        lineStyle: {
                            opacity: 0
                        },
                        areaStyle: {
                            opacity: 0
                        }
                    },
                    fillerColor: 'rgba(167,183,204,0.2)'

                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 0,
                    end: 10,
                    xAxisIndex: [0]
                }
            ],
        }
    },
    computed: {
        watchOptionDate () {
            return {
                xData: this.eChartLineOption.xAxis[0].data,
                yData: this.eChartLineOption.series
            }
        }
    },
    created () {
    },
    mounted () {
    },
    methods: {
        //按钮点击
        clickMenu (item) {
            this.$emit('click', item)
        },
    },
    watch: {
        watchOptionDate (val) {
            this.$nextTick(() => {
                this.myChartLine = echarts.init(document.getElementById(this.eChartLineId))
                this.myChartLine.clear()
                let eChartLineOption = this.eChartLineOption
                let dataLength = eChartLineOption.xAxis[0].data.length
                eChartLineOption.dataZoom = []
                if (this.isZoom && dataLength > 7) {
                    eChartLineOption.dataZoom = this.dataZoom
                    if (this.startAndEnd.length !== 0) {
                        eChartLineOption.dataZoom[0].startValue = this.startAndEnd[0]
                        eChartLineOption.dataZoom[0].endValue = this.startAndEnd[1]
                    } else {
                        eChartLineOption.dataZoom[0].startValue = dataLength - 7
                        eChartLineOption.dataZoom[0].endValue = dataLength - 1
                    }
                }
                this.myChartLine.setOption(eChartLineOption, true)
                this.myChartLine.hideLoading()
            })
        },
    }
}
</script>
<style lang="scss" scoped>
#ChartLine {

}
</style>


