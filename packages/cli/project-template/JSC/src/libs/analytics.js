/**
 * Copyright(C) 2019, jscApp All rights reserved. 
 * Date: 2019/10/09
 */

let _czc = {};

let _envConfig = {
    uat: {
        VUE_APP_API: '10.130.11.148:8090/',
        type: 'uat'
    },

    dev: {
        //VUE_APP_API: '10.129.222.66:8769/',
        VUE_APP_API: '10.130.11.148:8090/',
        type: 'dev'
    },

    pro: {
        VUE_APP_API: 'jscapp.yto56.com.cn:8080/',
        type: 'pro'
    }
};

let _getEnv = () => {
    const host = window.location.host;

    if (location.search.indexOf('pro') >= 0) {
        return 'pro';
    }

    if (host.match(/^localhost/i)) {
        return 'dev';
    }

    if (host.match(/^10.130.36.205/i)) {
        return 'uat';
    }

    return 'pro';
};


let _config = _envConfig[_getEnv()];
window.envConfig = _config;
let _protocol = location.protocol;
const _baseURL = _protocol + '//' + _config.VUE_APP_API;


// 总请求函数
const _ajaxPromise = (option) => {
    return new Promise((resolve, reject) => {
        var resolve = resolve;
        var ajax = new XMLHttpRequest() || new ActivexObject("Microsoft,XMLHTTP");
        var token = localStorage.getItem('token');
        token = token.replace(/\"/g, "");
        ajax.open("post",_baseURL + option.url);
        ajax.setRequestHeader("Content-type","application/json;charset=utf-8");
        ajax.setRequestHeader("token",token);
        if (option.data) {
            ajax.send(JSON.stringify(option.data));
        }else{
            ajax.send();
        }     
        // 注册事件
        ajax.onreadystatechange = () => {
            var DONE = 4; // readyState 4 代表已向服务器发送请求
            var OK = 200; // status 200 代表服务器返回成功
            if(ajax.readyState === DONE){
                if(ajax.status === OK){
                    resolve(JSON.parse(ajax.responseText));
                } else{
                    reject(JSON.parse(ajax.responseText));
                }
            }
        }
    })
};
// 请求接口
const _Durl = 'api-base/base/';
let _request = (data) => {
    return _ajaxPromise({
        url: _Durl + 'monitor/insertMonitorDetail',
        data:data
    })
};

//url 页面url，channelName 渠道来源，menuName 菜单名称, title 页面标题，token 用户身份
_czc.push = (option) => {
    let _params = {
        'channelName':option.channelName,
        'url':window.location.href,
        'menuName':option.title,
        'userAgent':navigator.userAgent
    };
    try {
        _request(_params).then(res => {
            // console.log(res);
        })
    } catch (error) {
        console.log(error);
    }
   
};

//调用样例
//_czc.push({'type':'_trackClick','channelName':'jsc','title':'测试'});
window._czc_ = _czc;
