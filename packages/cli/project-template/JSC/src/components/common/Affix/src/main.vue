<!--
 * @Author: dengjihua
 * @description: no des
 * @LastEditors: dengjihua
 * @LastEditTime: 2020-07-29 19:22:54
 * @Date: 2020-07-10 13:41:52
--> 
<template>
    <div v-bind="$attrs" ref="affix" :style="fixed ? affixStyle : {}">
        <div :class="fixed ? 'yto-affix' : ''" :style="fixed ? cstyle : {}" ref="slotBox">
            <slot />
        </div>
    </div>
</template>
<script>
let count = 0;
export default {
    name: 'yto-affix',
    props: {
        offsetTop: {
            type: Number,
            default () {
                return 0
            }
        },
        target: String | Object | Function
    },
    data() {
        return {
            fixed: false,
            cstyle: {position: 'fixed'},
            affixStyle: {}
        }
    },
    mounted() {
        this.$nextTick(() => {
            const slots = this.$slots.default;
            if (!slots) return false;
            // if (slots.length > 1) throw new Error('只能接受一个子节点');
            const el = slots[0].elm;
            if (el) this.initHandler();
        })
    },
    methods: {
        /**
         * 获取滚动元素的信息  默认为window
         */
        getScorllObj ($affix) {

            const top = $affix.getBoundingClientRect().top;

            let doc;

            if (!this.target) {

                doc = window.document.documentElement;

                return {
                    $scrollEl: window,
                    doc,
                    distance: top + doc.scrollTop
                }

            }

            let $scrollEl;

            if (typeof this.target === 'string') {

                $scrollEl = doc = document.getElementById(this.target);

            } else {

                $scrollEl = doc = this.target();

            }

            if ($scrollEl.nodeType !== 1) throw new Error('滚动元素不是dom节点');

            // const distance = this.$refs['affix'].offsetTop - $scrollEl.offsetTop;

            const distance = top + $scrollEl.scrollTop;

            return {$scrollEl, doc, distance}

        },
        /**
         * 监听滚动
         */
        initHandler () {
            const $slotBox = this.$refs['slotBox'],
                $affix = this.$refs['affix'],
                {$scrollEl, doc, distance} = this.getScorllObj($affix), 
                
                scrollHandler = ( ()=> {

                    let oldFixed;

                    return () => {

                        const affixWidth = $affix.offsetWidth, {offsetWidth, offsetHeight} = $slotBox, top = $affix.getBoundingClientRect().top;

                        // const scrollTop = doc.scrollTop;
                        
                        this.fixed = top <= this.offsetTop;

                        if (this.fixed) {

                            const top = (this.target ? this.offsetTop + $scrollEl.getBoundingClientRect().top : this.offsetTop) + 'px'

                            this.cstyle = {...this.cstyle, top, width: offsetWidth + 'px'};

                            this.affixStyle = {...this.affixStyle, width: affixWidth + 'px', height: offsetHeight + 'px'}
                            
                        }

                        if (oldFixed !== this.fixed || oldFixed === undefined) {

                            oldFixed = this.fixed;
                            
                            this.$emit('change', this.fixed);
                        }

                    }

                })();
                
            if (distance === 0 && this.offsetTop === 0) {

                scrollHandler();

                return false
            };
            count++;
            $scrollEl.addEventListener('scroll', scrollHandler, false);
            this.$once("hook:destroyed", function () {
                $scrollEl.removeEventListener('scroll', scrollHandler, false);
            })
        }

    }

}
</script>