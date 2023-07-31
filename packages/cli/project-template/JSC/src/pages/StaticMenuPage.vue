<template>
    <div id="staticMenuPage" v-wechat-title="decodeURIComponent(titleTra)">
        <div class="mui-content">
            <div class="yto-business-head">
                <span>{{decodeURIComponent(titleTra)}}</span>
            </div>
            <div id="theme" class="nav-tab-content active">
                <ul id="theme_box" class="theme-box">
                    <li class="theme-item" v-for="(item,index) in menuList" :key = "index" @click="goMenu(item)">
                        <div class="box">
                            <img :src="item.imageLocation" />
                            <span :class="{'num-tip':parseInt(item.submenuNum)>0}">{{item.submenuNum}}</span>
                        </div>
                        <span>{{item.menuName}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import { isShowQuestionMark }  from '@/utils/bridge'
    import util from '@/utils/utils'
import {
    queryGetMenuNameByCode,
    queryMenuTreeByCondition
} from '@/api'

const titleMath = {
    'JSCYDD_YDD_ML_YW_KFGL':'客服管理',
    'JSCYDD_YDD_ML_YW_ZXGL':'中心管理',
    'JSCYDD_YDD_ML_YW_YYGL':'营运管理',
    'JSCYDD_YDD_ML_FW_FWZL':'服务质量',
    'JSCYDD_YDD_ML_YW_WLGL':'网络管理',
    'JSCYDD_YDD_ML_SC_CNGG':'菜鸟裹裹',
    'JSCYDD_YDD_ML_YW_ZDGL':'终端管理',
    'JSCYDD_YDD_ML_JKYJ_YSTF':'疑似逃费',
    'JSCYDD_YDD_ML_YW_HBDGL':'环保袋管理',
    'JSCYDD_YDD_ML_YW_JLZS':'经理助手',
    'JSCYDD_YDD_ML_YW_CODGL':'COD管理',
    'JSCYDD_YDD_ML_YW_YZDGL':'圆准达管理',
    'JSCYDD_YDD_ML_YW_CGGL':'采购管理',
    'JSCYDD_YDD_ML_SC_SCGL':'市场管理',
    'JSCYDD_YDD_ML_SCGL_CSGL':'测试管理',
}

export default {
    name: 'staticMenuPage',
    data() {
        return {
            //title: titleMath[this.$route.query.target],
            title: '',
            target: this.$route.query.target,
            accessToken:this.$route.query.accessToken,
            userOrgCode:this.$route.query.userOrgCode,
            userOrgType:this.$route.query.userOrgType,
            userOrgName:this.$route.query.userOrgName,
            userName:this.$route.query.userName,
            empNo:this.$route.query.empNo,
            menuList:[],
            countRefresh:0,
        }
    },

    computed:{
        titleTra:function(){
            return this.title;
        }
    },

    mounted() {
        this.getMenuInfoName();
        this.getMenuInfo()
        this.setIsTimeFlag(true)
        //车辆监控：待卸车 CarRealTime 退出页面重进时恢复初始状态
        this.setClassType('realTime');
        // 重量异常：退出页面重新进入是恢复tab初始状态
        this.setChooseType('big');
        //车辆监控：退出页面重进时恢复初始状态 //中心tab  待卸车辆tab
        this.setCarRealTimeLinkType('center') 
        this.setCarRealTimeTabType('unload')
        util.removeSessionStorageNew('carRealTimeTabType');
    },

    methods: {
        ...mapMutations('business',
            ['setClassType',,'setCarRealTimeLinkType','setCarRealTimeTabType' ] // // 车辆监控待卸车辆，班次时间选择， 实时 realTime, 早班 early, 中班 mid
        ),
        ...mapMutations('common', ['setIsTimeFlag']),
        ...mapMutations('suspectedEscapeFeeZlyc',['setChooseType']),

        getMenuInfoName(){
            //this.$loading.open();
            let params = {
                menuCode:this.target
            };
            try {
                queryGetMenuNameByCode(params).then(res => {
                    if(res.status === 0){
                        this.title = res.data.menuName;
                        document.title = this.title;
                    }else{
                        this.$toast("读取接口失败");
                    }
                    //this.$loading.close();
                })
            }catch (err) {
                this.$loading.close();
                this.$toast("网络异常，请稍后重试");
            }
        },

        getMenuInfo(){
            //this.$loading.open();
            let params = {
                parentMenuId:this.target
            };
            try {
                queryMenuTreeByCondition(params).then(res => {
                    if(res.status === 0){
                        this.menuList = res.data.menuList;
                    }else{
                        this.$toast("读取接口失败");
                    }
                    //this.$loading.close();
                })
            }catch (err) {
                this.$loading.close();
                this.$toast("网络异常，请稍后重试");
            }
        },

        goMenu(item){
            let params = "&accessToken="+this.accessToken+"&userOrgCode="+this.userOrgCode+"&userOrgType="+this.userOrgType+"&userOrgName="+this.userOrgName+"&userName="+this.userName+"&empNo="+this.empNo+"&menuCode="+ this.$getMenuCode(item.menuId);
            window.location.href = item.location+params;
        },
    }
}
</script>
<style lang="scss" scoped>
        #staticMenuPage {
            margin: 0;
            padding: 0;
            height: 100%;
            font-size: 14px;
            font-family: 'PingFangSC';
            background-color: #F5F5F5;
        }

        div, p, ul, li, span {
            margin: 0;
            padding: 0;
        }

        ul, li {
            list-style: none;
        }

        /*  顶部选项卡样式 */
        .mui-content {
            background-color: #FFFFFF;
        }
        .yto-business-head
        {
            padding: 10Px;
            border-bottom: 1px solid #f2f2f2;
        }
        .yto-business-head:before {
            content: ' ';
            width: 2px;
            height: 15px;
            margin-right: 6px;
            background-color: #006FFD;
            box-sizing: border-box;
            border-width: 1px;
            border-style: solid;
            border-color: #006FFD;
            border-radius: 1px;
        }
        .theme-box {
            margin: 0;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
        }

        .theme-item {
            display: block;
            width: 25%;
            height: 65px;
            box-sizing: border-box;
            text-align: center;
            background-color: #fff;
            padding:0 10px;
            margin-top: 15px;

        }

        // .theme-item img {
        //     width: 30px;
        //     height: 30px;
        //     display: block;
        //     margin: auto;
        // }
        .box {
            position: relative;
            
            img {
                width: 30px;
                height: 30px;
                display: block;
                margin: auto;
            }
            .num-tip {
                position: absolute;
                top: -10px;
                left: 50%;
                width: 16px;
                background-color: #F35252;
                border-radius: 8px;
                height: 16px;
                font-size: 11px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #FFFFFF;
                line-height: 16px;
            }

        }
        .theme-item span {
            color: #333333;
            font-size: 14px;
            display: block;
            margin-top: 5px;
        }

        body:before {
            background-color: #FFFFFF;
            content: ' ';
            margin-bottom: 10px;
            position: fixed;
            z-index: -1;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-size: cover;
        }

</style>
