<template>
    <div id="datePanelForOrderTracking" class="yto-date-panel">
        <div class="fixed" :class="{'fixed-none': hasHeaderTab}">
            <div class="fixed-content">
                <p v-if="activeType !== 'custom'"
                   class="default-date"
                   @click="$emit('select')">
                    <slot name="orderTime"></slot>
                    {{currentDate | dateFormat(activeType)}}
                </p>
                <p v-if="activeType === 'custom'" class="custom-date" @click="$emit('select')">
                    <slot name="orderTime"></slot>
                    <template v-if="formatDate(customStartDay) === formatDate(customEndDay)">
                        <span class="start">{{customStartDay | dateFormat('date')}}</span>
                    </template>
                    <template v-else>
                        <span class="start">{{customStartDay | dateFormat('date')}}</span>
                        <span class="gap">-</span>
                        <span class="end">{{customEndDay | dateFormat('date')}}</span>
                    </template>
                </p>
                <p>
                    <slot name="updateTime"></slot>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapMutations} from 'vuex'
    import {getDataTime} from '@/api'
    import utils from '@/utils/utils'

    export default {
        props: {
            buttons: {
                type: Array,
                default: () => ['date', 'month', 'year', 'custom']
            },
            customDateType: {
                type: String,
                default: ''
            },
            hasHeaderTab: {
                type: Boolean,
                default: false
            },
            tableType: {
                type: String,
                default: ''
            },
            switchBtnTime: { // 切换时间控件按钮是否切换时间
                type: Boolean,
                default: true
            },
            orgCode: {   //有的表需要，有的表不需要，按需要传这个参数
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
                    'custom': '自定义'
                },
                selectedDate: new Date(Date.now() - 1000 * 3600 * 24),
                startDate: null,
                endDate: null,
            }
        },
        computed: mapState('common', ['currentDate', 'customStartDay', 'customEndDay', 'activeType', 'timeFlag']),
        created() {
            if (this.timeFlag && this.tableType) {
                this.getTime(this.buttons[0])
            } else {
                this.switchType([this.buttons[0], 'OrderTracking'])
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
                    tableType: this.tableType,  		//查询机构代码（省区列表页面为当前用户所在组织机构code）
                    sumType: sum,                       //查询时间 (日 2019-02-28, 月 201902, 年 2019)
                };
                if (this.orgCode) {
                    params.orgCode = this.orgCode;
                }
                if (this.tableType) {
                    getDataTime(params).then(res => {
                        if (res && res.data && res.data.date && res.data.date !== '') {
                            this.setIsNullData(false)
                            if (sumType === 'custom') {
                                // this.setCustomStartDay(new Date(+new Date(res.data.date) - 16000 * 3600 * 24))
                                this.setCustomStartDay(new Date(+new Date(res.data.date) - 14000 * 3600 * 24));
                                this.setCustomEndDay(new Date(res.data.date))

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
                    this.switchType([type, 'OrderTracking'])
                }
                this.$emit('switchDateBtn', type);
            },
            formatDate(date) {
                return utils.formatDate(date, 'yyyy-MM-dd')
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
    #datePanelForOrderTracking.yto-date-panel {
        background-color: rgba(255, 255, 255, 0);
        height: 60px;

        .fixed {
            position: fixed;
            width: 100%;
            left: 0;
            top: 0;
            height: 60px;
            z-index: 999;
            background: #F5F5F5;

            .fixed-content {
                padding-top: 10px;

                p {
                    font-size: 14px;
                    color: #999999;
                    text-align: left;
                    padding-left: 15px;

                    &:nth-child(2) {
                        display: inline-block;
                    }
                }

                .gap {
                    margin: 0 3px;
                }
            }
        }

        .fixed-none {
            top: 80px !important;
        }


    }
</style>


