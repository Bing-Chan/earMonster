/*
 * @Author: dengjihua
 * @description: no des
 * @LastEditors: dengjihua
 * @LastEditTime: 2020-10-15 11:20:44
 * @Date: 2020-10-15 11:20:15
 */
import { optionalMenuConfig } from '../router/routerConfig'
import utils from './utils'


const getHost = function(){
    switch (utils.getEnv()) {
        case 'dev': return 'localhost:8080/'; break;
        case 'uat': return '10.130.36.205:8095/jscCrmApp/'; break;
        case 'pro': return 'jscapp.yto56.com.cn:8081/jscCrmApp/'; break;
        default: return ''; break;
    }
}

let jumpPageUrl = `#/OptionalFunction?accessToken=${utils.getStorage('token')}`;
let getJumpUrl = function(params){
    let host = getHost();
    let url = `http://${host}${jumpPageUrl}&userId=${params.userId}&moduleId=${params.path}`
    return url;
};


export default function (option) {
    let isShowCustomButtonBool = false;
    let jumpUrl = '';
    optionalMenuConfig.filter(item=>{
        if(option.to.path.includes(item.path)){
            isShowCustomButtonBool = true;
            jumpUrl = getJumpUrl({'path':item.path,'userId':option.uInfo.employeeId})
        }
    })
    return {
        url: jumpUrl,
        isShowCustomButtonBool:isShowCustomButtonBool
    }
    
}