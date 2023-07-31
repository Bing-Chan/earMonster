<template>
    <div id="showDate">
        <div :class="{'fixed':isFixed,'fixed-tab':hasHeaderTab}">
            <div class="date-panel">
                <template v-if="$slots.slotTitle">
                <p class="slot-title">
                    <slot name="slotTitle"></slot>
                </p>
                </template>
                <template v-if="$slots.slotDate">
                    <p class="slot-date" @click="$emit('select')">
                        <slot name="slotDate"></slot>
                    </p>
                </template>
                <template v-else>
                    <p v-if="activeType !== 'custom'"
                       class="default-date"
                       @click="$emit('select')">
                        {{currentDate | dateFormat(activeType)}}
                    </p>

                    <p v-else class="custom-date" @click="$emit('select')">
                        <span class="start">{{customStartDay | dateFormat('date')}}</span>
                        <span class="gap">-</span>
                        <span class="end">{{customEndDay | dateFormat('date')}}</span>
                    </p>
                </template>
            </div>
        </div>
    </div>
</template>
<script>

    import {mapState, mapMutations} from 'vuex'

    export default {
        props: {
            hasHeaderTab: { //是否含有顶部菜单
                type: Boolean,
                default: false
            },
            isFixed: { //是否浮动
                type: Boolean,
                default: false
            },
        },
        data() {
            return {}
        },
        computed: mapState('common', ['currentDate', 'customStartDay', 'customEndDay', 'activeType',]),
        mounted() {
        },
        methods: {
            ...mapMutations('common', ['setCurrentDate', 'setActiveType', 'setIsNullData', 'setCustomStartDay', 'setCustomEndDay']),

        },

    }
</script>
<style lang="scss" scoped>
    #showDate {
        height: 40px;
        line-height: 40px;
        .fixed {
            position: fixed;
            width: 100%;
            left: 0;
            top: 0;
            z-index: 999;
            background: #F5F5F5;
            height: 40px;
            &.fixed-tab {
                top: 40px;
            }
        }

        .date-panel {


            P {
                font-size: 14px;
                color: #999999;
                padding-right: 15px;
                text-align: right;

                &.slot-title {
                    float: left;
                    display: inline;
                    padding-left: 15px;
                }
            }
        }
    }
</style>


