<template>
    <transition name="fade">
        <section class="t-toast" v-show="visible">
            <div class="t-toast__content" v-text="message" :style="styles"></div>
        </section>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
        }
    },

    props: {
        message: {
            type: String,
        },
        styles: {
            type: [Object, Array],
        },
        duration: {
            type: Number,
            default: 1500
        },
    },

    watch: {
        visible(newVisible) {
            if (!newVisible) {
                return
            }

            clearTimeout(this.timeoutId)
            this.timeoutId = setTimeout(() => {
                this.visible = false
            }, this.duration)
        }
    }
}
</script>

<style>
.t-toast {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1008;
    display: flex;
    align-items: center;
    justify-content: center;
}

.t-toast__content {
    box-sizing: border-box;
    line-height: 24px;
    border-radius: 5px;
    background: rgba(0, 0, 0, .7);
    max-width: 300px;
    padding: 10px 20px;
    color: #fff;
    text-align: center;
    word-break: break-all;
    font-size: 14px;
    pointer-events: auto;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s
}

.fade-enter,
.fade-leave-active {
    opacity: 0
}
</style>
