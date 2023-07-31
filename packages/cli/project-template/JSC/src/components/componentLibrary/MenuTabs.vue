<template>
    <div id="MenuTabs">
        <div class="yto-panel">
            <div class="tabs-center">
                    <span :class="{'active':currentType === item.type}" :key="index"
                          v-for="(item,index) in list"
                          @click="click(item)"> {{ item[customShowLabel] }}
                    </span>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
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

        },
        methods: {
            //按钮点击
            click(item) {
                this.$emit('click', item);
            },
        }
    }
</script>
<style lang="scss" scoped>
    #MenuTabs {

    }
</style>


