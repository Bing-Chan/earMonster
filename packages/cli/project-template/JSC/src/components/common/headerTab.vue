<template>
    <div id="header-tab">
        <ul class="tab-content">
            <template v-if="authority">
            <li v-for="(item,index) in tabContent" :key="index" v-show="item.show===1"
                @key="index"
                :class="{ active: headerTabType===item.type }"
                @click="changeTab(item)">
                {{ item.name }}
            </li>
            </template>
            <template v-else>
                <li v-for="(item,index) in tabContent" :key="index"
                    @key="index"
                    :class="{ active: headerTabType===item.type }"
                    @click="changeTab(item)">
                    {{ item.name }}
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "header-Tab",
        props: {
            tabContent: {
                type: Array,
                default: () => [],

            },
            headerTabType: {
                type: String,
                default: '',
            },
            authority: { // tabs权限控制
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
            }
        },
        methods: {
            //切换tab
            changeTab(item) {
                this.$emit('headerTabType',item.type);
                this.$emit('handleTabsLink',item);
            },
        }
    }
</script>

<style scoped lang="scss">
    #header-tab {
        $theme-color: #2482FC;
        height: 40px;
        .tab-content {
            position: fixed;
            width: 100%;
            left:0;
            top: 0;
            height: 40px;
            z-index: 999;
            background: #ffffff;
            display: flex;
            >li {
                flex: 1;
                text-align: center;
                line-height: 40px;
                font-size:14px;
                font-weight:500;
                color: #666666;
            }
            .active {
                color: #2482FC;
                width: 100%;
                position: relative;
            }
            .active:after{
                content: '';
                width:20px;
                height: 2px;
                background: #2482FC;
                display: block;
                position: absolute;
                bottom: 0;
                left: 50%;
                margin-left: -10px;
            }
        }

    }
</style>
