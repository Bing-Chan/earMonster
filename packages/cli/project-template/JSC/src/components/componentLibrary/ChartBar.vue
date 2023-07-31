<template>
    <div id="ChartBar">
        <div class="yto-panel">
            <p class="yto-panel-head" v-if="eChartBarTitle">
                <span class="title">{{eChartBarTitle}}</span>
            </p>
            <div class="chart-panel" :class="{'isHidden':!barHasData}">
                <div :id="eChartBarId" class="chart-canvas"></div>
                <div v-if="list.length!==0" class="chart-memu">
                    <ul ref="chartBarMenu">
                        <li :class="{'active':item.key===currentType}" :key="index"
                            v-for="(item,index) in list"
                            @click="clickMenu(item,$event)">
                            {{ item[customShowLabel] }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="chart-none-data" v-if="!barHasData">暂无数据</div>
        </div>
    </div>
</template>
<script>
// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
// 引入标题
require('echarts/lib/component/legend')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/dataZoom')

import '@/utils/smoothscroll'

export default {
    props: {
        eChartBarTitle: { //名称
            type: String,
            default: () => ''
        },
        barHasData: { //是否有数据
            type: Boolean,
            default: () => true
        },
        eChartBarOption: { //配置文件
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

    },
    data() {
        return {
            eChartBarId:this.$route.path.replace(/\//g, '') + 'ChartBar',
            myChartBar: null,
        }
    },
    computed: {
        watchOptionDate(){
            return this.eChartBarOption.series[0].data
        }
    },
    created() {
    },

    mounted() {
        setTimeout(() => {
            if (this.list.length !== 0) {
                this.calcScroll();
            }
        }, 200)
    },
    methods: {
        //按钮点击
        clickMenu(item) {
            this.$emit('click', item);
        },
        //计算滚动
        calcScroll(e) {
            this.$nextTick(() => {
                let totalClientWidth = document.body.clientWidth //视窗的宽度
                // let itemWidth = e.target.offsetWidth // 获取当前点击元素的宽度
                // let moveX = e.target.offsetLeft  // 当前事件对象相对移动的距离
                let activeEl = this.$refs.chartBarMenu.getElementsByClassName("active")[0]
                let itemWidth = activeEl.offsetWidth // 获取active元素的宽度
                let moveX = activeEl.offsetLeft  //获取active元素相对移动的距离
                let scrollLeft = moveX - (totalClientWidth / 2) + (itemWidth / 2)  // 目标居中的距离 = (当前元素距离左边的相对距离 / 2)+ (视口距离 / 2)
                this.$refs.chartBarMenu.scrollTo({
                    top: 0,
                    left: scrollLeft,
                    behavior: 'smooth'
                });
            })
        }
    },
    watch: {
        watchOptionDate(val) {
            this.$nextTick(() => {
                this.myChartBar = echarts.init(document.getElementById(this.eChartBarId))
                this.myChartBar.clear()
                this.myChartBar.setOption(this.eChartBarOption, true)
                this.myChartBar.hideLoading()
            })
        },
        currentType(val){
            if (val){
                this.calcScroll();
            }
        }
    }
}
</script>
<style lang="scss" scoped>
#ChartBar {

}
</style>


