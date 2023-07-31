<template>
    <div id="RadioGroup">
        <div class="yto-panel" v-if="list.length!==0">
            <div class="memu-btn-group">
                <ul ref="groupMenu">
                    <li :class="{'active':item[customKey]===currentType}" :key="index"
                        v-for="(item,index) in list"
                        @click="clickMenu(item,$event)">
                        {{ item[customShowLabel] }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>


import '@/utils/smoothscroll'

export default {
    props: {
        list: { //按钮组
            type: Array,
            default: () => []
        },
        currentType: { //当前激活
            type: [String,Number],
            default: () => ''
        },
        customKey: { // 按钮组自定义激活字段
            type: String,
            default: 'key'
        },
        customShowLabel: { // 按钮组自定义显示字段
            type: String,
            default: 'name'
        },

    },
    data () {
        return {
        }
    },
    computed: {
    },
    created () {
    },

    mounted () {
        setTimeout(() => {
            if (this.list.length !== 0) {
                this.calcScroll()
            }
        }, 200)
    },
    methods: {
        //按钮点击
        clickMenu (item) {
            this.$emit('click', item)
        },
        //计算滚动
        calcScroll (e) {
            this.$nextTick(() => {
                let totalClientWidth = document.body.clientWidth //视窗的宽度
                // let itemWidth = e.target.offsetWidth // 获取当前点击元素的宽度
                // let moveX = e.target.offsetLeft  // 当前事件对象相对移动的距离
                let activeEl = this.$refs.groupMenu.getElementsByClassName('active')[0]
                let itemWidth = activeEl.offsetWidth // 获取active元素的宽度
                let moveX = activeEl.offsetLeft  //获取active元素相对移动的距离
                let scrollLeft = moveX - (totalClientWidth / 2) + (itemWidth / 2)  // 目标居中的距离 = (当前元素距离左边的相对距离 / 2)+ (视口距离 / 2)
                this.$refs.groupMenu.scrollTo({
                    top: 0,
                    left: scrollLeft,
                    behavior: 'smooth'
                })
            })
        }
    },
    watch: {
        currentType (val) {
            if (val) {
                this.calcScroll()
            }
        }
    }
}
</script>
<style lang="scss" scoped>
#RadioGroup {

}
</style>


