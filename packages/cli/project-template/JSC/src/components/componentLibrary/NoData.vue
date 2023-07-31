<template>
    <div id="NoData" v-if="isShow">
        <div class="page-none-data" :style="{'--page-none-data-top': toTop}">
            <div v-html="content"></div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            isShow: { //是否显示
                type: Boolean,
                default: () => false
            },
            content: {  //内容
                type: String,
                default: () => '当前日期下数据还未产出，您可以修改统计时间，先查看之前的数据'
            },
            toTop: {  //遮罩与顶部的距离
                type: String,
                default: () => '80px'
            },
        },
        data() {
            return {}
        },
        computed: {},
        mounted() {
        },
        methods: {
            //禁用滚动条
            disableScroll(val) {
                if (val) {
                    window.scroll(0, 0)
                    document.body.parentNode.style.overflow = 'hidden';
                } else {
                    document.body.parentNode.style.overflow = 'auto';
                }
            }
        },
        watch: {
            isShow(val) {
                this.disableScroll(val)
            }
        },
        destroyed() {
            document.body.parentNode.style.overflow = 'auto';
        },
    }
</script>
<style lang="scss" scoped>
    #NoData {
        .page-none-data {
            position: fixed;
            box-sizing: border-box;
            left: 0;
            top: var(--page-none-data-top, 80px);
            width: 100%;
            height: 100%;
            z-index: 66;
            text-align: center;
            padding: 180px 30px;
            background-color: #F5F5F5;
        }
    }
</style>


