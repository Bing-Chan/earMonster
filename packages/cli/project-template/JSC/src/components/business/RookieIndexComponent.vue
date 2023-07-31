<template>
     <div v-if="cnData.length>0" class="yto-panel">
        <p class="yto-panel-head">菜鸟指数</p>
        <ul class="cn-count clear">
            <li :class="{'active':currentIndex === index}" :key="index" v-for="(item,index) in cnData"
                @click="clickCn(index,item)">
                <p>{{item.indexName}}</p>
                <p :class="{'up':item.upOrDown === '1'}">{{item.score}}</p>
                <p>排名 {{item.orderDisplay}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "RookieIndexComponents",
        props: {
            cnData: {
                type: Array,
                default: () => [],

            },
            currentIndex:Number,
        },
        data() {
            return {

            }
        },
        created(){
  
        },
        methods: {
            //切换tab
            clickCn(index,item) {
                this.$emit('handleClickIndex',index,item);
            },
        }
    }
</script>
