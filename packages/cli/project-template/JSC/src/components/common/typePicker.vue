<template>
    <mt-popup v-model="visible" :closeOnClickModal="closeOnClickModal" position="bottom" class="date-picker"
              @touchmove.native.stop.prevent>
        <mt-picker
                :slots="slots"
                value-key="name"
                @change="onChange"
                :visible-item-count="visibleItemCount"
                class="mint-datetime-picker"
                ref="typePicker"
                show-toolbar
                rotate-effect>
            <div class="buttons">
                <span class="picker-cancel" @click="close">{{cancelText}}</span>
                <span class="picker-confirm" @click="confirm">{{confirmText}}</span>
            </div>
            <p class="normal">{{currentValue[0].name}}</p>

        </mt-picker>
    </mt-popup>
</template>
<script>
    import {Popup, Picker} from 'mint-ui'

    export default {
        name: 'mt-datetime-picker',
        props: {
            cancelText: {
                type: String,
                default: '取消'
            },
            confirmText: {
                type: String,
                default: '完成'
            },
            visibleItemCount: {
                type: Number,
                default: 7
            },
            closeOnClickModal: {
                type: Boolean,
                default: true
            },
            slots: {
                type: Array,
                default: []
            },
            value: null
        },
        data() {
            return {
                visible: false,
                currentValue: this.$props.slots[0].values,

            };
        },
        methods: {
            open() {
                this.visible = true;
            },
            close() {
                this.visible = false;

            },

            onChange(picker) {
                this.currentValue = picker.values
            },
            confirm() {
                this.visible = false
                this.$emit('confirm', this.currentValue)
            }
        },
        watch: {},

        components: {
            'mt-popup': Popup,
            'mt-picker': Picker
        }
    }
</script>
<style lang="scss">
    .date-picker {
        width: 100%;

        .picker-toolbar {
            height: auto;

            .buttons {
                position: relative !important;
                padding: 0 15px;
                height: 40px;
                line-height: 40px;
                text-align: right !important;
                font-size: 16px;

                .picker-cancel {
                    float: left !important;
                    color: #999999;
                }

                .picker-confirm {
                    color: #2482FC;;
                }

                .custom-error {
                    font-size: 12px;
                    color: #F35252;
                    position: absolute;
                    top: 0;
                    left: 80px;
                    right: 0;
                    bottom: 0;
                    margin: auto;
                    text-align: center;
                    padding-right: 80px;
                    box-sizing: border-box;
                }
            }

            p {
                height: 30px;
                line-height: 30px;
                text-align: center;
                margin: 0 25px 10px;
            }

            .normal {
                border-bottom: 1px solid #2482FC !important;
                color: #2482FC;;
            }

            .custom {
                display: flex;

                .start, .end {
                    position: relative;
                    flex: 1;
                    border-bottom: 1px solid #D2D2D2;
                }

                .gap {
                    display: inline-block;
                    margin: 0 10px;
                }

                .active {
                    border-color: #2482FC;;
                    color: #2482FC;;
                }

                .error {
                    border-color: #F35252;
                    color: #F35252;
                }
            }
        }

        .picker-slot {
            font-size: 15px;
        }
    }
</style>
<style lang="scss">
    .picker-item.picker-selected {
        color: #2482FC !important;
    }
</style>
