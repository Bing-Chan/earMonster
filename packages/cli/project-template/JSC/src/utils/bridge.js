import { isAndroid, isIos,isChromeIPhone} from './device'


function setupWebViewJavascriptBridge (name, data, callback) {
    // 这里若是bridge存在则直接调用native方法并且return
    if (window.bridge) {
        window.bridge.callHandler(name, data)
        return
    }
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge)
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback)
    }
    window.WVJBCallbacks = [callback]
    let WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'https://__BRIDGE_LOADED__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(() => {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
}


/**
 * 调用原生拨打电话功能 callPhoneNum
 */
function callPhoneNum(phoneNum) {

    setupWebViewJavascriptBridge('callPhoneNum', {phoneNum}, function (bridge){
        if (!window.bridge) window.bridge = bridge;

        console.log('window.bridge', window.bridge);

        window.bridge.callHandler('callPhoneNum', {phoneNum})
    })
}

/**
 * 调用原生的方法跳转页面
 *
 * Android 机器在政策周报列表的时候 跳转到展示pdf页面的时候 无法给导航加上箭头  他们说是监听不到 故提供此方法  我们这边传入要跳转的路径就好了
 */
function androidNavHandler (url) {
    try {

        if (isAndroid) {

            setupWebViewJavascriptBridge('lookNewsDetails', {url}, function (bridge) {

                if (!window.bridge) window.bridge = bridge

                console.log('window.bridge', window.bridge);

                window.bridge.callHandler('lookShopDetails', {url})

            })

            return false

        }

    } catch (e) {

        console.log(e.message || e);

    }

    window.location = url;
}

/**
 * 网点管家遗失件 查看订单详情的跳转
 */
function goH5page(data) {

    setupWebViewJavascriptBridge('goH5page', data, function (bridge){
        if (!window.bridge) window.bridge = bridge;

        console.log('window.bridge', window.bridge);

        window.bridge.callHandler('goH5page', data)
    })
}

/**
 * 给 ios 上报 咨询页面当前选择的 tab 类型
 */
function changeTabAction(type = '1') {
    if (isIos) {

        setupWebViewJavascriptBridge('changeTabAction', {type}, function (bridge){
            if (!window.bridge) window.bridge = bridge;

            console.log('window.bridge', window.bridge);

            window.bridge.callHandler('changeTabAction', {type})
        })
    }
}

// function isShowQuestionMark (type = '1') {

//     if (isAndroid || isIos) {

//         try{
//             setupWebViewJavascriptBridge('isShow', {type}, function (bridge){
//                 if (!window.bridge) window.bridge = bridge;

//                 console.log('window.bridge', window.bridge);

//                 window.bridge.callHandler('isShow', {type})
//             })
//         } catch(e) {

//             console.log(e.message || e);
//         }
//     }

// }


function login() {
    try{
        if(isAndroid){
            if(window.nativeBridge != null && typeof(window.nativeBridge) != "undefined" ){
                window.nativeBridge.reLogin();
            }
        }
        if(isIos){
            if(window.webkit.messageHandlers.gotoLogin != null && typeof(window.webkit.messageHandlers.gotoLogin) != "undefined" ){
                window.webkit.messageHandlers.gotoLogin.postMessage(null)
            }
        }
    }catch(error){
        console.log('token失效，调用登录方法失败');
    }
}

// 是否关闭指标说明问号 true 显示  false隐藏
function isShowQuestionMark(type='1') {
    if(isAndroid || isIos){
        try{
            if(isAndroid){
                if(window.nativeBridge != null && typeof(window.nativeBridge) != "undefined" ){
                    window.nativeBridge.isShow(type);
                }
            }
            if(isIos){
                if(window.webkit.messageHandlers.isShow != null && typeof(window.webkit.messageHandlers.isShow) != "undefined" ){
                    window.webkit.messageHandlers.isShow.postMessage(type)
                }
            }
        }catch(error){
          if(!isChromeIPhone){
            console.log(error);
            console.log('调用问号显示隐藏方法失败');
          }
        }
    }
}

// 打开走件流程页面  hideType=complaint // 隐藏投诉信息   hideType=track // 隐藏走件信息
function openAppOrderProcess(orderNo='',hideType='',loadType='') {
    if(isAndroid || isIos){
        try{
            if(isAndroid){
                if(window.nativeBridge != null && typeof(window.nativeBridge) != "undefined" ){
                    if(loadType === 'all'){
                        window.nativeBridge.loadAnotherWebUrl(orderNo)
                    }else{
                        window.nativeBridge.loadWebUrlWithHideInfo(orderNo,hideType)
                    }

                }
            }
            if(isIos){
                if(window.webkit.messageHandlers.isShow != null && typeof(window.webkit.messageHandlers.isShow) != "undefined" ){
                    if(loadType === 'all'){
                        window.webkit.messageHandlers.loadAnotherWebUrl.postMessage(orderNo)
                    }else{
                        window.webkit.messageHandlers.loadWebUrlWithHideInfo.postMessage(orderNo+'&'+hideType)
                    }
                }
            }
        }catch(error){
          if(!isChromeIPhone){
            console.log(error);
            console.log('调用走件方法失败');
          }
        }
    }
}


const setupWebViewJavascriptBridge2 = callback => {
  var u = navigator.userAgent;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (!isiOS) {
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge);
    } else {
      document.addEventListener(
        "WebViewJavascriptBridgeReady",
        function () {
          callback(WebViewJavascriptBridge);
        },
        false
      );
    }
  } else {
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement("iframe");
    WVJBIframe.style.display = "none";
    WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__";
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
      document.documentElement.removeChild(WVJBIframe);
    }, 0);
  }
};


if (isAndroid) {
  setupWebViewJavascriptBridge2(function (bridge) {
    bridge.init();
  })
}


/**
 *播放海康摄像头拍摄视频
 * @param videoUrl : 视频链接
 */
function viewVideo(videoUrl='', startTime="", endTime="") {
  setupWebViewJavascriptBridge2(function (bridge) {
    if(!videoUrl || !startTime || !endTime){ // videoUrl, startTime, endTime三个参数必传，如果参数不完整，则不调用原生播放
      bridge.callHandler('viewVideo', null, function (res) {})
    }
    else{
      bridge.callHandler('viewVideo', {videoUrl, startTime, endTime}, function (res) {})
    }
  })
}

export {
    login,
    isShowQuestionMark,
    openAppOrderProcess,
    androidNavHandler,
    changeTabAction,
    goH5page,
    callPhoneNum,
    viewVideo
}
