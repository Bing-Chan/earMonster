<template>
    <transition name="message-box">
        <div v-show="visible" class="message-box" @touchmove.prevent>
            <div class="message-box-popup message-box-popup-in">
                <div class="message-box-popup-inner">
                    <div class="message-box-popup-title" v-if="title">{{title}}</div>
                    <div class="message-box-popup-text">{{message}}</div>
                </div>
                <div class="message-box-popup-buttons" v-if="type === 'alert'">
                    <span class="message-box-popup-button message-box-popup-button-bold" @click="success" v-if="buttonHtml" v-html="buttonHtml"></span>
                    <span class="message-box-popup-button message-box-popup-button-bold" @click="success" v-else v-text="buttonText"></span>
                </div>
                <div class="message-box-popup-buttons" v-if="type === 'confirm'">
                    <span class="message-box-popup-button message-box-popup-button-cancel" @click="cancel" v-if="cancelHtml" v-html="cancelHtml"></span>
                    <span class="message-box-popup-button message-box-popup-button-cancel" @click="cancel" v-else v-text="cancelText"></span>
                    <span class="message-box-popup-button message-box-popup-button-confirm" @click="confirm" v-if="confirmHtml" v-html="confirmHtml"></span>
                    <span class="message-box-popup-button message-box-popup-button-confirm" @click="confirm" v-else v-text="confirmText"></span>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    data() {
        return {
            type: 'alert',
            visible: false,
            title: '提示',
            message: '',
            // confirm 组件
            cancelText: '取消',
            cancelHtml: '',
            confirmText: '确定',
            confirmHtml: '',
            // alert 组件
            buttonText: '知道了',
            buttonHtml: '',
        }
    },
    methods: {
        confirm() {
            this.visible = false
        },
        cancel() {
            this.visible = false
        },
        success() {
            this.visible = false
        },
    },
}
</script>
<style>
.message-box {
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1001;
    font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', STHeiti, 'Microsoft Yahei', Tahoma,
        Simsun, sans-serif;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}
.message-box-popup {
    position: fixed;
    z-index: 1002;
    top: 50%;
    left: 50%;
    overflow: hidden;
    width: 270px;
    transform: translate3d(-50%, -50%, 0) scale(1.185);
    text-align: center;
    color: #000;
    border-radius: 13px;
}
.message-box-popup.message-box-popup-in {
    display: block;
    transform: translate3d(-50%, -50%, 0) scale(1);
    opacity: 1;
}
.message-box-popup.message-box-popup-out {
    transform: translate3d(-50%, -50%, 0) scale(1);
    opacity: 0;
}
.message-box-popup-inner {
    position: relative;
    padding: 15px;
    border-radius: 13px 13px 0 0;
    background: rgba(255, 255, 255, 0.95);
}
.message-box-popup-inner:after {
    position: absolute;
    top: auto;
    right: auto;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 1px;
    content: '';
    transform: scaleY(0.5);
    transform-origin: 50% 100%;
    background-color: rgba(0, 0, 0, 0.2);
}
.message-box-popup-title {
    font-size: 18px;
    font-weight: 500;
    text-align: center;
}
.message-box-popup-title + .message-box-popup-text {
    font-family: inherit;
    font-size: 14px;
    margin: 5px 0 0;
}
.message-box-popup-buttons {
    position: relative;
    display: flex;
    height: 44px;
    justify-content: center;
}
.message-box-popup-button {
    font-size: 17px;
    line-height: 44px;
    position: relative;
    display: block;
    overflow: hidden;
    box-sizing: border-box;
    width: 100%;
    height: 44px;
    padding: 0 5px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #007aff;
    background: rgba(255, 255, 255, 0.95);
    letter-spacing: 0.5px;
    cursor: pointer;
}
.message-box-popup-button:after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: auto;
    left: auto;
    display: block;
    width: 1px;
    height: 100%;
    content: '';
    transform: scaleX(0.5);
    transform-origin: 100% 50%;
    background-color: rgba(0, 0, 0, 0.2);
}
.message-box-popup-button:first-child {
    border-radius: 0 0 0 13px;
}
.message-box-popup-button:first-child:last-child {
    border-radius: 0 0 13px 13px;
}
.message-box-popup-button:last-child {
    border-radius: 0 0 13px 0;
}
.message-box-popup-button-bold {
    font-weight: 600;
}
.message-box-popup-button:last-child:after {
    display: none;
}
.message-box-popup-button:active {
    background-color: #eaeaeb;
}

.message-box-enter {
    opacity: 0;
}
.message-box-enter .message-box-popup {
    transform: translate3d(-50%, -50%, 0) scale(1.185);
}
.message-box-enter-active,
.message-box-leave-active {
    transition: all 0.4s;
}
.message-box-enter-active .message-box-popup,
.message-box-leave-active .message-box-popup {
    transition: all 0.4s;
}
.message-box-leave-active {
    opacity: 0;
}
</style>
