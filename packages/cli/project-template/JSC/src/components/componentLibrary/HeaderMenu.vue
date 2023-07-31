<template>
    <div id="HeaderMenu">
        <ul class="menu-content" ref="headerMenuScroll">
            <li v-for="(item,index) in list" :key="index"
                :class="{ active: currentType===item.type ,disable:item.state===1 }"
                @click="menuClick(item,$event)">
                {{ item[customShowLabel] }}
            </li>
        </ul>
    </div>
</template>

<script>
import '@/utils/smoothscroll'

export default {
    name: 'HeaderMenu',
    props: {
        list: { //列表
            type: Array,
            default: () => []
        },
        currentType: { //当前激活
            type: [String,Number],
            default: () => ''
        },
        customShowLabel: { // 自定义显示字段
            type: String,
            default: 'name'
        },
    },
    data() {
        return {}
    },
    computed: {},
    mounted() {
        setTimeout(() => {
            this.calcScroll();
        }, 200)
    },
    methods: {
        //切换menu
        menuClick(item, e) {
            if(item.state===1){
                return
            }
            this.$emit('click', item);
        },
        //计算滚动Active
        calcScroll(e) {
            this.$nextTick(() => {
                let totalClientWidth = document.body.clientWidth //视窗的宽度
                // let itemWidth = e.target.offsetWidth // 获取当前点击元素的宽度
                // let moveX = e.target.offsetLeft  // 当前事件对象相对移动的距离
                let activeEl = this.$refs.headerMenuScroll.getElementsByClassName("active")[0]
                let itemWidth = activeEl.offsetWidth // 获取active元素的宽度
                let moveX = activeEl.offsetLeft  //获取active元素相对移动的距离
                let scrollLeft = moveX - (totalClientWidth / 2) + (itemWidth / 2)  // 目标居中的距离 = (当前元素距离左边的相对距离 / 2)+ (视口距离 / 2)
                this.$refs.headerMenuScroll.scrollTo({
                    top: 0,
                    left: scrollLeft,
                    behavior: 'smooth'
                });
            })
        }
    },
    watch: {
        currentType(val){
            if (val){
                this.calcScroll();
            }
        }
    },
}
</script>

<style scoped lang="scss">
#HeaderMenu {
    height: 40px;

    .menu-content {
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        height: 40px;
        z-index: 9999;
        background: #ffffff;
        display: flex;
        overflow-x: auto;

        > li {
            flex: 1;
            text-align: center;
            line-height: 40px;
            font-size: 14px;
            font-weight: 500;
            color: #666666;
            padding: 0 20px;
            position: relative;
            flex-shrink: 0;
            white-space: nowrap;

            &::after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 100%;
                width: 0;
                height: 2px;
                background: #2482FC;
            }

            &.active {
                color: #2482FC;
                &::after {
                    width: 30px;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                    transition: 0.1s all linear;
                }
            }

            &.disable {
                color: #ccc;
                &:after {
                    width: 0;
                }
            }

        }
        li.active ~ li::after {
            left: -100%;
        }

    }

}
</style>
