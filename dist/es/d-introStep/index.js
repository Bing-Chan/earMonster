import{defineComponent as P,reactive as O,watch as B,watchEffect as _,computed as C,onBeforeMount as D,onMounted as A,toRefs as F,pushScopeId as z,popScopeId as j,createElementVNode as o,openBlock as w,createBlock as q,Transition as N,withCtx as T,createElementBlock as b,normalizeStyle as u,toDisplayString as I,createCommentVNode as y,renderSlot as v}from"vue";const W={show:{type:Boolean,required:!0},config:{type:Object,required:!0}};var M=Object.defineProperty,R=Object.defineProperties,V=Object.getOwnPropertyDescriptors,E=Object.getOwnPropertySymbols,G=Object.prototype.hasOwnProperty,H=Object.prototype.propertyIsEnumerable,$=(t,i,n)=>i in t?M(t,i,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[i]=n,J=(t,i)=>{for(var n in i||(i={}))G.call(i,n)&&$(t,n,i[n]);if(E)for(var n of E(i))H.call(i,n)&&$(t,n,i[n]);return t},K=(t,i)=>R(t,V(i)),m=(t,i,n)=>new Promise((f,c)=>{var h=a=>{try{d(n.next(a))}catch(x){c(x)}},r=a=>{try{d(n.throw(a))}catch(x){c(x)}},d=a=>a.done?f(a.value):Promise.resolve(a.value).then(h,r);d((n=n.apply(t,i)).next())}),g=P({name:"GaIntroStep",props:W,emits:["update:show"],setup(t,{emit:i}){const n=O({config:t.config,show:t.show,originalBox:{left:250,top:250,width:200,height:100},tipBoxPosition:"bottom",currentIndex:0}),f=()=>m(this,null,function*(){let e=!0;if(n.config.tips[n.currentIndex]&&n.config.tips[n.currentIndex].onPrev&&(e=yield n.config.tips[n.currentIndex].onPrev()),!e)throw new Error("onPrev \u9700\u8981 Promise.resolve(true) \u624D\u53EF\u4EE5\u7EE7\u7EED\u5F80\u4E0B\u8D70");c(n.currentIndex-1)}),c=e=>m(this,null,function*(){try{debugger;e===void 0&&(e=n.currentIndex),n.show&&(document.body.style.overflow="hidden");let s=n.config.tips[e].el,l=document.querySelector(s);if(!l)throw new Error("\u6CA1\u6709\u627E\u5230\u76F8\u5E94\u7684\u5143\u7D20");let p=l.getBoundingClientRect();n.originalBox={left:p.left,top:p.top,width:p.width,height:p.height},n.tipBoxPosition=n.config.tips[e].tipPosition,n.currentIndex=e}catch(s){throw new Error(s.message)}}),h=()=>m(this,null,function*(){debugger;let e=!0;if(n.config.tips[n.currentIndex]&&n.config.tips[n.currentIndex].onNext&&(e=yield n.config.tips[n.currentIndex].onNext()),!e)throw new Error("onNext \u9700\u8981 Promise.resolve(true) \u624D\u53EF\u4EE5\u7EE7\u7EED\u5F80\u4E0B\u8D70");c(n.currentIndex+1)}),r=()=>{debugger;i("update:show",!1)},d=()=>{debugger;const{tips:e}=n.config;let s=null;if(e&&Array.isArray(e))if(e.length>0){n.currentIndex=0;try{let l=document.querySelector(e[0].el);s=setInterval(()=>{l=document.querySelector(e[0].el),l&&(c(0),clearInterval(s))},0)}catch(l){throw new Error(l.message)}}else throw new Error("tips\u6570\u7EC4\u4E0D\u80FD\u4E3A\u7A7A");else throw new Error("config\u4E2D\u7684tips\u4E0D\u5B58\u5728\u6216\u8005\u4E0D\u662F\u6570\u7EC4")};B(()=>n.config,()=>{n.currentIndex=0}),B(()=>n.show,e=>{e?c():document.body.style.overflow="auto"}),_(()=>{n.show=t.show});const a=C(()=>{if(n.tipBoxPosition==="right")return{left:`${n.originalBox.left+n.originalBox.width}px`,top:`${n.originalBox.top}px`};if(n.tipBoxPosition==="left")return{right:`${window.innerWidth-n.originalBox.left}px`,top:`${n.originalBox.top}px`};if(n.tipBoxPosition==="top")return{left:`${n.originalBox.left}px`,bottom:`${window.innerHeight-n.originalBox.top}px`};if(n.tipBoxPosition==="bottom")return{left:`${n.originalBox.left>window.innerWidth-300?window.innerWidth-300:n.originalBox.left}px`,top:`${n.originalBox.top+n.originalBox.height}px`}});D(()=>{d()});const x=(e,s)=>{let l=null,p=!0;return(...S)=>{if(!p)return;p=!1;let k=S;l&&clearTimeout(l),l=setTimeout(()=>{p=!0,e.apply(this,k)},s||1e3)}};return A(()=>{window.onresize=x(()=>{n.show&&c()},0)}),K(J({},F(n)),{init:d,prev:f,next:h,done:r,tipBoxStyle:a,setBoxInfo:c})}});const L=t=>(z("data-v-5033ea2c"),t=t(),j(),t),Q={key:0,id:"intro_box"},U=L(()=>o("div",{class:"round round-flicker"},null,-1)),X=[U],Y={class:"tip-content"},Z={class:"action"};function tt(t,i,n,f,c,h){return w(),q(N,{name:"custom-classes-transition","enter-active-class":"animate__animated animate__fadeIn animate__faster","leave-active-class":"animate__animated animate__fadeOut animate__faster"},{default:T(()=>[t.show?(w(),b("div",Q,[o("div",{class:"top",style:u({height:`${t.originalBox.top}px`,backgroundColor:`rgba(0, 0, 0, ${t.config.backgroundOpacity?t.config.backgroundOpacity:.9})`})},null,4),o("div",{class:"content",style:u({height:`${t.originalBox.height}px`})},[o("div",{class:"left",style:u({top:`${t.originalBox.top}px`,width:`${t.originalBox.left}px`,height:`${t.originalBox.height}px`,backgroundColor:`rgba(0, 0, 0, ${t.config.backgroundOpacity?t.config.backgroundOpacity:.9})`})},null,4),o("div",{class:"original-box",style:u({top:`${t.originalBox.top}px`,left:`${t.originalBox.left}px`,width:`${t.originalBox.width}px`,height:`${t.originalBox.height}px`})},X,4),o("div",{class:"tip-box",style:u(t.tipBoxStyle)},[o("div",Y,[t.config.tips[t.currentIndex].title?(w(),b("div",{key:0,class:"title",style:u({textAlign:t.config.titleStyle&&t.config.titleStyle.textAlign?t.config.titleStyle.textAlign:"center",fontSize:t.config.titleStyle&&t.config.titleStyle.fontSize?t.config.titleStyle.fontSize:"19px"})},I(t.config.tips[t.currentIndex].title),5)):y("v-if",!0),o("div",{class:"content",style:u({textAlign:t.config.contentStyle&&t.config.contentStyle.textAlign?t.config.contentStyle.textAlign:"center",fontSize:t.config.contentStyle&&t.config.contentStyle.fontSize?t.config.contentStyle.fontSize:"15px"})},I(t.config.tips[t.currentIndex].content),5),o("div",Z,[t.currentIndex!==0?v(t.$slots,"prev",{key:0,index:t.currentIndex,tipItem:t.config.tips[t.currentIndex]},()=>[o("div",{class:"item prev",onClick:i[0]||(i[0]=(...r)=>t.prev&&t.prev(...r))},"\u4E0A\u4E00\u6B65")]):y("v-if",!0),t.currentIndex!==t.config.tips.length-1?v(t.$slots,"next",{key:1,index:t.currentIndex,tipItem:t.config.tips[t.currentIndex]},()=>[o("div",{class:"item next",onClick:i[1]||(i[1]=(...r)=>t.next&&t.next(...r))},"\u4E0B\u4E00\u6B65")]):y("v-if",!0),t.currentIndex===t.config.tips.length-1?v(t.$slots,"done",{key:2,index:t.currentIndex,tipItem:t.config.tips[t.currentIndex]},()=>[o("div",{class:"item done",onClick:i[2]||(i[2]=(...r)=>t.done&&t.done(...r))},"\u5B8C\u6210")]):v(t.$slots,"skip",{key:3,index:t.currentIndex,tipItem:t.config.tips[t.currentIndex]},()=>[o("div",{class:"item skip",onClick:i[3]||(i[3]=(...r)=>t.done&&t.done(...r))},"\u8DF3\u8FC7")])])])],4),o("div",{class:"right",style:u({top:`${t.originalBox.top}px`,left:`${t.originalBox.left+t.originalBox.width}px`,width:`calc(100% - ${t.originalBox.left+t.originalBox.width}px)`,height:`${t.originalBox.height}px`,backgroundColor:`rgba(0, 0, 0, ${t.config.backgroundOpacity?t.config.backgroundOpacity:.9})`}),ref:"tip_box"},null,4)],4),o("div",{class:"bottom",style:u({height:`calc(100% - ${t.originalBox.top}px - ${t.originalBox.height}px)`,backgroundColor:`rgba(0, 0, 0, ${t.config.backgroundOpacity?t.config.backgroundOpacity:.9})`})},null,4)])):y("v-if",!0)]),_:3})}g.render=tt,g.__scopeId="data-v-5033ea2c",g.__file="packages/components/introStep/introStep.vue",g.install=t=>{t.component(g.name,g)};export{g as default};
