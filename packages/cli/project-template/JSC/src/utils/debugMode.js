/**
 * 主要用途：用在生产环境的页面可以方便的唤出console控制台
 * 触发条件：两指在两秒内连续按十次屏幕
 * 触发技巧：可以用同一只手三指一起快速按十次比较容易触发
 */
import utils from './utils'
import { Confirm } from '../components/common/MessageBox'
let count = 0
let timeoutId
document.addEventListener('touchstart', event => {
    if (event.touches.length > 1) {
        if (++count >= 15) {
            count = 0  
            Confirm('是否需要刷新页面进入调试模式吗？')
               .then(() => {
                    utils.loadJs('//cdn.bootcss.com/eruda/2.3.3/eruda.min.js').then(() => {
                        eruda.init()
                        const con = eruda.get('console')
                        con.config.set('displayGetterVal', true)
                    })
                    let url = window.location.href;
                    let { erudadebug } = utils.getQueryString(url);
                    if(erudadebug == undefined){
                        url = `${url}&erudadebug=1`;
                        location.replace(url)
                    }
               })
               .catch(() => {
                    utils.loadJs('//cdn.bootcss.com/eruda/2.3.3/eruda.min.js').then(() => {
                        eruda.init()
                        const con = eruda.get('console')
                        con.config.set('displayGetterVal', true)
                    })
               })
        }
        if (typeof timeoutId === 'undefined') {
            timeoutId = setTimeout(() => {
                count = 0
                timeoutId = undefined
            }, 2000)
        }
   }
})
