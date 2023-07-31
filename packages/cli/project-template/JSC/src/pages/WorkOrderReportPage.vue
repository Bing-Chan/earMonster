<template>
     <div>
        
     </div>
</template>
<script>
import utils from '@/utils/utils'
import { queryEmpByUser,queryLoginUserToken } from '@/api'
export default {
    name:'WorkorderReportPage',
    data(){
       return {
         YuanJieToken:'',
         userInfo:{}
       }
    },

    mounted(){
      this.userinfo = utils.getSessionStorageNew('userInfo');
      this.queryData();
    },

    methods:{
      async queryData(){
        this.$loading.open();
        let YuanJieTokeninfo = await queryLoginUserToken({userGroup:{"id": 96959} });
        if(YuanJieTokeninfo.status === 0){
          this.YuanJieToken = YuanJieTokeninfo.data.token;
        }else{
          this.$toast("读取接口失败");
        }
        this.$loading.close();
        this.createRedirectUrl();//生成跳转页面
      },

      /**
       * realUserOrgName:总公司
       * realUserOrgCode:用户所属组织机构代码
       * serOrgProvName:省份
       * userName:用户名
       */
      createRedirectUrl(){
        let {realUserOrgName, userOrgProvName, realUserOrgCode, userName, employeeMobile, employeeId} = this.userinfo.data;
        let RedirectUrl = `http://yj.yto.net.cn:8010/issue/index.html?token=${this.YuanJieToken}&appName=2&employeeeCode=${employeeId}&orgCode=${realUserOrgCode}&orgName=${realUserOrgName}&phone=${employeeMobile}&province=${userOrgProvName}&userName=${userName}&typeNeed=1&typeIssue=2`
        window.location.replace(RedirectUrl);
        //window.location.href = baseUrl + RedirectUrl;
      }
    },
}
</script>