const UA = window.navigator.userAgent

const isIpad = /(iPad).*OS\s([\d_]+)/.test(UA)
const isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(UA)
const isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(UA)
const isIos = isIpad || isIpod || isIphone
const isAndroid = /(Android);?[\s\/]+([\d.]+)?/.test(UA)
const isWechat = /micromessenger/i.test(UA)
const isQQ = /QQ\/([\d\.]+)/.test(UA)
const isQZone = /Qzone\//.test(UA)
const isQQMBrowser = /MQQBrowser/i.test(UA) && !isWechat && !isQQ
const isUCMBrowser = /UCBrowser/i.test(UA)
const isBAIDUMBrowser = /mobile.*baidu/i.test(UA)
const isChromeIPhone= (UA.indexOf("Mozilla") > -1)&&(UA.indexOf("AppleWebKit") > -1)&&(UA.indexOf("Safari") > -1)
const isIPhoneX =
    /iphone/gi.test(UA) &&
    window.devicePixelRatio &&
    window.devicePixelRatio === 3 &&
    window.screen.width === 375 &&
    window.screen.height === 812
const isIPhoneXSMax =
    /iphone/gi.test(UA) &&
    window.devicePixelRatio &&
    window.devicePixelRatio === 3 &&
    window.screen.width === 414 &&
    window.screen.height === 896
const isIPhoneXR =
    /iphone/gi.test(UA) &&
    window.devicePixelRatio &&
    window.devicePixelRatio === 2 &&
    window.screen.width === 414 &&
    window.screen.height === 896

export {
    isIpad,
    isIpod,
    isIphone,
    isIos,
    isAndroid,
    isWechat,
    isQQ,
    isQZone,
    isQQMBrowser,
    isUCMBrowser,
    isBAIDUMBrowser,
    isIPhoneX,
    isIPhoneXSMax,
    isIPhoneXR,
    isChromeIPhone
}
