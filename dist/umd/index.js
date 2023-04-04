(function(g,n){typeof exports=="object"&&typeof module!="undefined"?n(exports,require("vue"),require("vue-demi")):typeof define=="function"&&define.amd?define(["exports","vue","vue-demi"],n):(g=typeof globalThis!="undefined"?globalThis:g||self,n(g.galaxyUI={},g.Vue,g.vueDemi))})(this,function(g,n,v){"use strict";const W=["default","primary","success","warning","info","danger","text",""],U={type:{type:String,values:W,default:"default"},disabled:{type:Boolean,default:!1},round:Boolean,color:String},J={click:e=>e instanceof MouseEvent},C=typeof window!="undefined";function H(e){var o;const t=v.unref(e);return(o=t==null?void 0:t.$el)!=null?o:t}const K=C?window:void 0;C&&window.document,C&&window.navigator,C&&window.location;const N=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},P="__vueuse_ssr_handlers__";N[P]=N[P]||{},N[P];function q(e,o,{window:t=K}={}){const c=v.ref(""),l=v.computed(()=>{var r;return H(o)||((r=t==null?void 0:t.document)==null?void 0:r.documentElement)});return v.watch([l,()=>v.unref(e)],([r,i])=>{r&&t&&(c.value=t.getComputedStyle(r).getPropertyValue(i))},{immediate:!0}),v.watch(c,r=>{var i;((i=l.value)==null?void 0:i.style)&&l.value.style.setProperty(v.unref(e),r)}),c}var D,F;C&&(window==null?void 0:window.navigator)&&((D=window==null?void 0:window.navigator)==null?void 0:D.platform)&&/iP(ad|hone|od)/.test((F=window==null?void 0:window.navigator)==null?void 0:F.platform);var Q=Object.defineProperty,G=Object.getOwnPropertySymbols,Z=Object.prototype.hasOwnProperty,ee=Object.prototype.propertyIsEnumerable,j=(e,o,t)=>o in e?Q(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t,te=(e,o)=>{for(var t in o||(o={}))Z.call(o,t)&&j(e,t,o[t]);if(G)for(var t of G(o))ee.call(o,t)&&j(e,t,o[t]);return e};te({text:""},{top:0,left:0,bottom:0,right:0,height:0,width:0});function ne(e){let o=e.trim().replace("#","");return/^[0-9a-fA-F]{3}$/.test(o)&&(o=o[0].repeat(2)+o[1].repeat(2)+o[2].repeat(2)),/^[0-9a-fA-F]{6}$/.test(o)?{red:parseInt(o.slice(0,2),16),green:parseInt(o.slice(2,4),16),blue:parseInt(o.slice(4,6),16)}:{red:255,green:255,blue:255}}function T(e,o=.2){let{red:t,green:c,blue:l}=ne(e);if(o>0)t*=1-o,c*=1-o,l*=1-o;else{const r=Math.abs(o);t+=(255-t)*Math.abs(o),c+=(255-c)*r,l+=(255-l)*r}return`rgb(${Math.round(t)}, ${Math.round(c)}, ${Math.round(l)})`}function I(e,o=.2){return T(e,-o)}function oe(e,o=.2){return T(e,o)}var k=n.defineComponent({name:"GaButton",props:U,emits:J,setup(e,{emit:o}){const t=r=>{o("click",r)},c=n.computed(()=>{debugger;const r=e.type||"default",i=["ga-button",r?"ga-button--"+r:"",{"is-disabled":e.disabled,"is-round":e.round}];return console.log(i,"classArr"),i}),l=n.computed(()=>{let r={};const i=q(`--d-color-${e.type}`),d=e.color||i.value;if(d){const u=oe(d,.1),y=I(d);if(r={"--d-button-bg-color":d,"--d-button-border-color":d,"--d-button-hover-bg-color":y,"--d-button-hover-border-color":y,"--d-button-active-bg-color":u,"--d-button-active-border-color":u},e.disabled){const a=I(d,.5);r["--d-button-disabled-bg-color"]=a,r["--d-button-disabled-border-color"]=a}}return r});return{handleClick:t,className:c,style:l}}});const ie=["autofocus"];function re(e,o,t,c,l,r){return n.openBlock(),n.createElementBlock("button",{class:n.normalizeClass(e.className),value:111,style:n.normalizeStyle(e.style),onClick:o[0]||(o[0]=(...i)=>e.handleClick&&e.handleClick(...i)),autofocus:e.autofocus},[n.renderSlot(e.$slots,"default")],14,ie)}k.render=re,k.__file="packages/components/button/button.vue",k.install=e=>{e.component(k.name,k)};const le=["default","primary","success","warning","info","danger","text",""],ae={type:{type:String,values:le,default:"default"},disabled:{type:Boolean,default:!1},underline:{type:Boolean,default:!0},href:{type:String,default:""}},ce={click:e=>e instanceof MouseEvent};var B=n.defineComponent({name:"GaLink",props:ae,emits:ce,setup(e,{emit:o}){const t=e.type||"default",c=n.computed(()=>["ga-link",t?"d-link--"+t:"",{"is-disabled":e.disabled,"is-underline":!e.disabled&&e.underline}]),l=n.computed(()=>{let i={};const d=q(`--d-color-${e.type}`).value;if(d&&(i={"--d-link-hover-text-color":I(d)},e.disabled)){const u=I(d,.5);i["--d-link-disabled-text-color"]=u}return i});function r(i){e.disabled||o("click",i)}return{className:c,handleClick:r,style:l}}});const de=["href"],se={class:"d-link-inner"};function ue(e,o,t,c,l,r){return n.openBlock(),n.createElementBlock("a",{class:n.normalizeClass(e.className),href:e.disabled||!e.href?void 0:e.href,style:n.normalizeStyle(e.style),onClick:o[0]||(o[0]=(...i)=>e.handleClick&&e.handleClick(...i))},[n.createElementVNode("span",se,[n.renderSlot(e.$slots,"default")])],14,de)}B.render=ue,B.__file="packages/components/link/link.vue",B.install=e=>{e.component(B.name,B)};const pe={show:{type:Boolean,required:!0},config:{type:Object,required:!0}};var fe=Object.defineProperty,ge=Object.defineProperties,me=Object.getOwnPropertyDescriptors,M=Object.getOwnPropertySymbols,he=Object.prototype.hasOwnProperty,ye=Object.prototype.propertyIsEnumerable,R=(e,o,t)=>o in e?fe(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t,xe=(e,o)=>{for(var t in o||(o={}))he.call(o,t)&&R(e,t,o[t]);if(M)for(var t of M(o))ye.call(o,t)&&R(e,t,o[t]);return e},we=(e,o)=>ge(e,me(o)),A=(e,o,t)=>new Promise((c,l)=>{var r=u=>{try{d(t.next(u))}catch(y){l(y)}},i=u=>{try{d(t.throw(u))}catch(y){l(y)}},d=u=>u.done?c(u.value):Promise.resolve(u.value).then(r,i);d((t=t.apply(e,o)).next())}),E=n.defineComponent({name:"GaIntroStep",props:pe,emits:["update:show"],setup(e,{emit:o}){const t=n.reactive({config:e.config,show:e.show,originalBox:{left:250,top:250,width:200,height:100},tipBoxPosition:"bottom",currentIndex:0}),c=()=>A(this,null,function*(){let a=!0;if(t.config.tips[t.currentIndex]&&t.config.tips[t.currentIndex].onPrev&&(a=yield t.config.tips[t.currentIndex].onPrev()),!a)throw new Error("onPrev \u9700\u8981 Promise.resolve(true) \u624D\u53EF\u4EE5\u7EE7\u7EED\u5F80\u4E0B\u8D70");l(t.currentIndex-1)}),l=a=>A(this,null,function*(){try{debugger;a===void 0&&(a=t.currentIndex),t.show&&(document.body.style.overflow="hidden");let h=t.config.tips[a].el,f=document.querySelector(h);if(!f)throw new Error("\u6CA1\u6709\u627E\u5230\u76F8\u5E94\u7684\u5143\u7D20");let s=f.getBoundingClientRect();t.originalBox={left:s.left,top:s.top,width:s.width,height:s.height},t.tipBoxPosition=t.config.tips[a].tipPosition,t.currentIndex=a}catch(h){throw new Error(h.message)}}),r=()=>A(this,null,function*(){debugger;let a=!0;if(t.config.tips[t.currentIndex]&&t.config.tips[t.currentIndex].onNext&&(a=yield t.config.tips[t.currentIndex].onNext()),!a)throw new Error("onNext \u9700\u8981 Promise.resolve(true) \u624D\u53EF\u4EE5\u7EE7\u7EED\u5F80\u4E0B\u8D70");l(t.currentIndex+1)}),i=()=>{debugger;o("update:show",!1)},d=()=>{debugger;const{tips:a}=t.config;let h=null;if(a&&Array.isArray(a))if(a.length>0){t.currentIndex=0;try{let f=document.querySelector(a[0].el);h=setInterval(()=>{f=document.querySelector(a[0].el),f&&(l(0),clearInterval(h))},0)}catch(f){throw new Error(f.message)}}else throw new Error("tips\u6570\u7EC4\u4E0D\u80FD\u4E3A\u7A7A");else throw new Error("config\u4E2D\u7684tips\u4E0D\u5B58\u5728\u6216\u8005\u4E0D\u662F\u6570\u7EC4")};n.watch(()=>t.config,()=>{t.currentIndex=0}),n.watch(()=>t.show,a=>{a?l():document.body.style.overflow="auto"}),n.watchEffect(()=>{t.show=e.show});const u=n.computed(()=>{if(t.tipBoxPosition==="right")return{left:`${t.originalBox.left+t.originalBox.width}px`,top:`${t.originalBox.top}px`};if(t.tipBoxPosition==="left")return{right:`${window.innerWidth-t.originalBox.left}px`,top:`${t.originalBox.top}px`};if(t.tipBoxPosition==="top")return{left:`${t.originalBox.left}px`,bottom:`${window.innerHeight-t.originalBox.top}px`};if(t.tipBoxPosition==="bottom")return{left:`${t.originalBox.left>window.innerWidth-300?window.innerWidth-300:t.originalBox.left}px`,top:`${t.originalBox.top+t.originalBox.height}px`}});n.onBeforeMount(()=>{d()});const y=(a,h)=>{let f=null,s=!0;return(...p)=>{if(!s)return;s=!1;let x=p;f&&clearTimeout(f),f=setTimeout(()=>{s=!0,a.apply(this,x)},h||1e3)}};return n.onMounted(()=>{window.onresize=y(()=>{t.show&&l()},0)}),we(xe({},n.toRefs(t)),{init:d,prev:c,next:r,done:i,tipBoxStyle:u,setBoxInfo:l})}});const be=e=>(n.pushScopeId("data-v-5033ea2c"),e=e(),n.popScopeId(),e),Ee={key:0,id:"intro_box"},ve=be(()=>n.createElementVNode("div",{class:"round round-flicker"},null,-1)),ke=[ve],Be={class:"tip-content"},Se={class:"action"};function $e(e,o,t,c,l,r){return n.openBlock(),n.createBlock(n.Transition,{name:"custom-classes-transition","enter-active-class":"animate__animated animate__fadeIn animate__faster","leave-active-class":"animate__animated animate__fadeOut animate__faster"},{default:n.withCtx(()=>[e.show?(n.openBlock(),n.createElementBlock("div",Ee,[n.createElementVNode("div",{class:"top",style:n.normalizeStyle({height:`${e.originalBox.top}px`,backgroundColor:`rgba(0, 0, 0, ${e.config.backgroundOpacity?e.config.backgroundOpacity:.9})`})},null,4),n.createElementVNode("div",{class:"content",style:n.normalizeStyle({height:`${e.originalBox.height}px`})},[n.createElementVNode("div",{class:"left",style:n.normalizeStyle({top:`${e.originalBox.top}px`,width:`${e.originalBox.left}px`,height:`${e.originalBox.height}px`,backgroundColor:`rgba(0, 0, 0, ${e.config.backgroundOpacity?e.config.backgroundOpacity:.9})`})},null,4),n.createElementVNode("div",{class:"original-box",style:n.normalizeStyle({top:`${e.originalBox.top}px`,left:`${e.originalBox.left}px`,width:`${e.originalBox.width}px`,height:`${e.originalBox.height}px`})},ke,4),n.createElementVNode("div",{class:"tip-box",style:n.normalizeStyle(e.tipBoxStyle)},[n.createElementVNode("div",Be,[e.config.tips[e.currentIndex].title?(n.openBlock(),n.createElementBlock("div",{key:0,class:"title",style:n.normalizeStyle({textAlign:e.config.titleStyle&&e.config.titleStyle.textAlign?e.config.titleStyle.textAlign:"center",fontSize:e.config.titleStyle&&e.config.titleStyle.fontSize?e.config.titleStyle.fontSize:"19px"})},n.toDisplayString(e.config.tips[e.currentIndex].title),5)):n.createCommentVNode("v-if",!0),n.createElementVNode("div",{class:"content",style:n.normalizeStyle({textAlign:e.config.contentStyle&&e.config.contentStyle.textAlign?e.config.contentStyle.textAlign:"center",fontSize:e.config.contentStyle&&e.config.contentStyle.fontSize?e.config.contentStyle.fontSize:"15px"})},n.toDisplayString(e.config.tips[e.currentIndex].content),5),n.createElementVNode("div",Se,[e.currentIndex!==0?n.renderSlot(e.$slots,"prev",{key:0,index:e.currentIndex,tipItem:e.config.tips[e.currentIndex]},()=>[n.createElementVNode("div",{class:"item prev",onClick:o[0]||(o[0]=(...i)=>e.prev&&e.prev(...i))},"\u4E0A\u4E00\u6B65")]):n.createCommentVNode("v-if",!0),e.currentIndex!==e.config.tips.length-1?n.renderSlot(e.$slots,"next",{key:1,index:e.currentIndex,tipItem:e.config.tips[e.currentIndex]},()=>[n.createElementVNode("div",{class:"item next",onClick:o[1]||(o[1]=(...i)=>e.next&&e.next(...i))},"\u4E0B\u4E00\u6B65")]):n.createCommentVNode("v-if",!0),e.currentIndex===e.config.tips.length-1?n.renderSlot(e.$slots,"done",{key:2,index:e.currentIndex,tipItem:e.config.tips[e.currentIndex]},()=>[n.createElementVNode("div",{class:"item done",onClick:o[2]||(o[2]=(...i)=>e.done&&e.done(...i))},"\u5B8C\u6210")]):n.renderSlot(e.$slots,"skip",{key:3,index:e.currentIndex,tipItem:e.config.tips[e.currentIndex]},()=>[n.createElementVNode("div",{class:"item skip",onClick:o[3]||(o[3]=(...i)=>e.done&&e.done(...i))},"\u8DF3\u8FC7")])])])],4),n.createElementVNode("div",{class:"right",style:n.normalizeStyle({top:`${e.originalBox.top}px`,left:`${e.originalBox.left+e.originalBox.width}px`,width:`calc(100% - ${e.originalBox.left+e.originalBox.width}px)`,height:`${e.originalBox.height}px`,backgroundColor:`rgba(0, 0, 0, ${e.config.backgroundOpacity?e.config.backgroundOpacity:.9})`}),ref:"tip_box"},null,4)],4),n.createElementVNode("div",{class:"bottom",style:n.normalizeStyle({height:`calc(100% - ${e.originalBox.top}px - ${e.originalBox.height}px)`,backgroundColor:`rgba(0, 0, 0, ${e.config.backgroundOpacity?e.config.backgroundOpacity:.9})`})},null,4)])):n.createCommentVNode("v-if",!0)]),_:3})}E.render=$e,E.__scopeId="data-v-5033ea2c",E.__file="packages/components/introStep/introStep.vue",E.install=e=>{e.component(E.name,E)};var S=n.defineComponent({name:"GAInput",setup(){return{}}});const _e={type:"text",class:"ele-input"};function Ce(e,o,t,c,l,r){return n.openBlock(),n.createElementBlock("input",_e)}S.render=Ce,S.__file="packages/components/input/input.vue",S.install=e=>{e.component(S.name,S)};const Ie={class:"esign-wrapper"},Ne=["width","height"],Pe={className:"sign-btnWrap"};var _=n.defineComponent({__name:"sign",props:{width:{type:Number,required:!1,default:400},height:{type:Number,required:!1,default:200},lineWidth:{type:Number,required:!1,default:4},strokeColor:{type:String,required:!1,default:"green"},lineCap:{type:String,required:!1,default:"round"},lineJoin:{type:String,required:!1,default:"round"},bgColor:{type:String,required:!1,default:"transparent"},showBtn:{type:Boolean,required:!1,default:!0},onSave:{type:Function,required:!1},onClear:{type:Function,required:!1},onDrawEnd:{type:Function,required:!1}},setup(e){const o=e,{width:t,height:c,lineWidth:l,strokeColor:r,lineCap:i,lineJoin:d,bgColor:u,showBtn:y,onSave:a,onClear:h,onDrawEnd:f}=o,s=n.ref(null),p=n.ref(null),x=n.ref({offsetX:0,offsetY:0,endX:0,endY:0}),$=/Mobile|Android|iPhone/i.test(navigator.userAgent),Ve=()=>{s.value&&(s.value.getContext("2d").clearRect(0,0,t,c),h&&h(s.value))},ze=()=>{s.value.toBlob(m=>{const w=Date.now().toString(),b=document.createElement("a");b.download=`${w}.png`,b.href=URL.createObjectURL(m),b.click(),b.remove(),a&&a(m)})},L=m=>{const{pageX:w,pageY:b}=$?m.changedTouches[0]:m,O=s.value,{x:V,y:z}=O.getBoundingClientRect();x.value.endX=w,x.value.endY=b,p.value.lineTo(w-V,b-z),p.value.stroke()},X=m=>{const{offsetX:w,offsetY:b,pageX:O,pageY:V}=$?m.changedTouches[0]:m,z=s.value,{x:je,y:Te}=z.getBoundingClientRect();x.value.offsetX=w,x.value.offsetY=b,x.value.endX=O,x.value.endY=V,p.value.beginPath(),p.value.lineWidth=l,p.value.strokeStyle=r,p.value.lineCap=i,p.value.lineJoin=d,p.value.moveTo(x.value.endX-je,x.value.endY-Te),window.addEventListener($?"touchmove":"mousemove",L)},Y=()=>{console.log(p.value),p.value.closePath(),window.removeEventListener("mousemove",L),f&&f(s.current)},qe=()=>{const m=s.value;m.width=t,m.height=c;const w=m.getContext("2d");p.value=w,p.value.fillStyle=u,p.value.fillRect(0,0,t,c)},De=()=>{window.addEventListener($?"touchstart":"mousedown",X),window.addEventListener($?"touchend":"mouseup",Y)},Fe=()=>{window.removeEventListener($?"touchstart":"mousedown",X),window.removeEventListener($?"touchend":"mouseup",Y)},Ge=()=>{qe(),De()};return n.onMounted(()=>{Ge()}),n.onUnmounted(()=>{Fe()}),(m,w)=>(n.openBlock(),n.createElementBlock("div",Ie,[n.createElementVNode("canvas",{ref_key:"canvasRef",ref:s,width:n.unref(t),height:n.unref(c),style:{border:"1px solid #ccc"}},null,8,Ne),n.withDirectives(n.createElementVNode("div",Pe,[n.createElementVNode("span",{onClick:Ve,className:"sign-btn"},"\u6E05\u9664"),n.createElementVNode("span",{onClick:ze,className:"sign-btn primary"},"\u4FDD\u5B58")],512),[[n.vShow,n.unref(y)]])]))}});_.__scopeId="data-v-0772085a",_.__file="packages/components/sign/sign.vue",_.install=e=>{e.component("GaSign",_)};const Ae={GAButton:k,GALink:B,GAIntroStep:E,GAInpput:S,GASign:_};var Oe={version(){return"1.0.2-rc.2"},install(e){Object.values(Ae).forEach(o=>{e.use(o)})}};g.GAButton=k,g.GAInpput=S,g.GAIntroStep=E,g.GALink=B,g.GASign=_,g.default=Oe,Object.defineProperty(g,"__esModule",{value:!0})});
