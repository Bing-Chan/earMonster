<template>
  <div class="target-detail-page" v-wechat-title="title">
        <div class="target-panel" v-for="(item,index) in indexInfo" :key="index" v-show="isLoadDataSuccess">
            <p class="item-title">{{item.indexName}}</p>
            <p class="item-info" v-for="(itemc,indexc) in item.indexInfoDetailList" :key="indexc">
                <span class="item">{{itemc.detailKey}}:</span>
                <span class="item-detail" v-html="itemc.nameTran"></span>
            </p>
        </div>
        <div class="target-panel" v-show="!isLoadDataSuccess">
            <p class="no-data">数据加载失败</p>
        </div>
  </div>
</template>

<script>
import {
    queryIndexInfoByCondition
} from '@/api'
export default {
    name: 'TargetDetailPage',
    data () {
        return {
            title:'指标说明',
            target:this.$route.query.target,
            isLoadDataSuccess:true,
            indexInfo:'',
        }
    },

    mounted(){
        this.getIndexInfo();
    },

    methods:{
        async getIndexInfo(){
            this.$loading.open();
            let params = {
               kpiCode:this.target
            };
            try {
                await queryIndexInfoByCondition(params).then(res => {
                    if(res.status === 0 ){
                        this.indexInfo = res.data.indexInfoList;
                        this.indexInfo.map(item=>{
                            item.indexInfoDetailList.map(itemm=>{
                                itemm.nameTran = itemm.detailValue.replace(/\n|\r/g,'<br>');
                            })
                        })
                    }else{
                        this.isLoadDataSuccess = false;
                        this.$toast("读取接口失败");
                    }
                    this.$loading.close();
                })
            }catch (err) {
                this.$loading.close();
                this.$toast("网络异常，请稍后重试");
            } 
        }
    }
}
</script>

