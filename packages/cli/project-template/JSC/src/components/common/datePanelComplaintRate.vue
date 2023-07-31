<template>
    <div class="yto-date-panel" :class="{'hide-buttons': hideButtons}">
        <div class="fixed" :class="{'fixed-none': hasHeaderTab}" :style="{top: topFixed + 'px'}">
            <p v-if="activeType !== 'custom'" class="default-date" @click="$emit('select')">
                {{currentDate | dateFormat(activeType)}}
            </p>
            <p v-if="activeType === 'custom' && !customDateType" class="custom-date" @click="$emit('select')">
                <span class="start">{{customStartDay | dateFormat('date')}}</span>
                <span class="gap">-</span>
                <span class="end">{{customEndDay | dateFormat('date')}}</span>
            </p>
            <p v-if="activeType === 'custom' && customDateType==='customMonth'" class="custom-date"
               @click="$emit('select')">
                <span class="start">{{customStartDay | dateFormat('month')}}</span>
                <span class="gap">-</span>
                <span class="end">{{customEndDay | dateFormat('month')}}</span>
            </p>
            <div class="date-type">
                <div class="buttons">
                    <yto-button v-for="(item, i) in buttons" :key="i" size="small"
                                :type="activeType === item ? 'primary' : 'default'" :class="'col-' + buttons.length"
                                @click="changeType(item)">{{textMap[item]}}
                    </yto-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapMutations} from 'vuex'
    import {getDataTime} from '@/api'

    export default {
        props: {
            topFixed: {
                type: Number,
                default: 0
            },
            buttons: {
                type: Array,
                default: () => ['date', 'month', 'year', 'custom']
            },
            customDateType: {
                type: String,
                default: ''
            },
            hasHeaderTab: { // 是否含有顶部浮动TABS
                type: Boolean,
                default: false
            },
            hideButtons: { // 是否隐藏按钮
                type: Boolean,
                default: false
            },
            tableType: {
                type: String,
                default: ''
            },
            queryFlag: {  //回话接待率单独传的参数
                type: String,
                default: ''
            },
            switchBtnTime: { // 切换时间控件按钮是否切换时间
                type: Boolean,
                default: true
            },
            orgCode: { //有的表需要，有的表不需要，按需要传这个参数
                type: String,
                default: ''
            },
            pageType: {
                type: String,
                default: ''
            },
            customstartDate: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                textMap: {
                    'date': '日',
                    'month': '月',
                    'year': '年',
                    'custom': '自定义',
                    'realtime': '实时'
                },
                selectedDate: new Date(Date.now() - 1000 * 3600 * 24),
                startDate: null,
                endDate: null
            }
        },
        computed: mapState('common', ['currentDate', 'customStartDay', 'customEndDay', 'activeType', 'timeFlag']),
        created() {
            if (this.timeFlag && this.tableType) {
                this.getTime(this.buttons[0])
            } else {
                this.switchType(this.buttons[0])
            }

        },
        methods: {
            ...mapMutations('common', ['switchType', 'setCurrentDate', 'setActiveType', 'setIsNullData', 'setCustomStartDay', 'setCustomEndDay', 'setSwitchBtnType']),
            // 折线图表数据
            getTime(sumType) {
                this.flag = false;
                let sum;
                switch (sumType) {
                    case 'date':
                        sum = 'D';
                        break;
                    case 'month':
                        sum = 'M';
                        break;
                    case 'year':
                        sum = 'Y';
                        break;
                    case 'custom':
                        sum = 'D';
                        break;
                }
                this.setActiveType(sumType)
                let params = {
                    tableType: this.tableType, //查询机构代码（省区列表页面为当前用户所在组织机构code）
                    sumType: sum, //查询时间 (日 2019-02-28, 月 201902, 年 2019)
                };
                if (this.orgCode) {
                    params.orgCode = this.orgCode;
                }
                if (this.queryFlag) {
                    params.queryFlag = this.queryFlag;
                }
                if (this.tableType) {
                    getDataTime(params).then(res => {
                        if (res && res.data && res.data.date && res.data.date !== '') {
                            this.setIsNullData(false)
                            if (sumType === 'custom') {
                                // this.setCustomStartDay(new Date(+new Date(res.data.date) - 16000 * 3600 * 24))
                                if (this.pageType == 'orderTrack') {
                                    this.setCustomStartDay(new Date(+new Date(res.data.date) - 2000 * 3600 * 24));
                                    //this.setCustomStartDay(new Date(+new Date('2019-12-12')));
                                    this.setCustomEndDay(this.selectedDate)


                                } else {
                                    this.setCustomStartDay(new Date(+new Date(res.data.date) - 14000 * 3600 * 24));
                                    this.setCustomEndDay(new Date(res.data.date))
                                }


                            } else {
                                this.setCurrentDate(new Date(res.data.date))
                            }
                        } else {
                            this.setIsNullData(true)
                        }
                    })
                }
            },
            changeType(type) {
                if (type === this.activeType) return
                if (this.switchBtnTime && this.tableType) {
                    this.getTime(type)
                } else if (!this.switchBtnTime) {
                    this.setSwitchBtnType(type)
                } else {
                    this.switchType(type)
                }
                this.$emit('', type);
            }

        },
        watch: {
            tableType(val) {
                this.getTime(this.activeType)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .yto-date-panel {
        background-color: rgba(255, 255, 255, 0);
        height: 80px;

        .fixed {
            position: fixed;
            width: 100%;
            left: 0;
            top: 0;
            height: 80px;
            z-index: 999;
            background: #F5F5F5;
        }

        .fixed-none {
            top: 40px !important;
        }

        p {
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            /*color: #999999;*/
            color: #0066cc !important;
            padding-right: 15px;
            text-align: right;
        }

        .gap {
            margin: 0 5px;
        }

        &.hide-buttons {
            height: 40px;
            overflow: hidden;

            .fixed {
                height: 40px;
                overflow: hidden;
            }

            .date-type {
                display: none
            }
        }
    }
</style>
