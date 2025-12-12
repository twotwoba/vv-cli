import{A as e,B as t,C as n,D as r,E as i,G as a,H as o,J as s,M as c,N as l,O as u,Q as d,R as f,S as p,T as m,U as h,V as g,W as _,X as v,Z as y,_ as b,a as x,b as S,c as C,g as w,h as T,i as E,j as D,k as O,m as k,o as A,p as j,q as M,s as N,v as P,w as F,x as I,y as L,z as R}from"./index-47sT6Ag4.js";function z(e,t){if(e===void 0)return!1;if(t){let{context:{ids:n}}=t;return n.has(e)}return u(e)!==null}function ee(){let e=y(!1);return a(()=>{e.value=!0}),v(e)}const B=typeof document<`u`&&typeof window<`u`;function V(e){return e.replace(/#|\(|\)|,|\s|\./g,`_`)}function H(e,...t){if(Array.isArray(e))e.forEach(e=>H(e,...t));else return e(...t)}function U(e){return e.some(e=>g(e)?!(e.type===D||e.type===c&&!U(e.children)):!0)?e:null}function W(e,t){return t(e&&U(e())||null)}function te(e){return!(e&&U(e()))}function G(e,n,i,a){i||T(`useThemeClass`,`cssVarsRef is not passed`);let o=t(k,null),c=o?.mergedThemeHashRef,l=o?.styleMountTarget,u=y(``),d=w(),f,p=`__${e}`,m=()=>{let e=p,t=n?n.value:void 0,o=c?.value;o&&(e+=`-${o}`),t&&(e+=`-${t}`);let{themeOverrides:s,builtinThemeOverrides:m}=a;s&&(e+=`-${r(JSON.stringify(s))}`),m&&(e+=`-${r(JSON.stringify(m))}`),u.value=e,f=()=>{let t=i.value,n=``;for(let e in t)n+=`${e}: ${t[e]};`;I(`.${e}`,n).mount({id:e,ssr:d,parent:l}),f=void 0}};return s(()=>{m()}),{themeClass:u,onRender:()=>{f?.()}}}const K=b(`n-form-item`);function ne(e,{defaultSize:n=`medium`,mergedSize:r,mergedDisabled:i}={}){let a=t(K,null);M(K,null);let o=l(r?()=>r(a):()=>{let{size:t}=e;if(t)return t;if(a){let{mergedSize:e}=a;if(e.value!==void 0)return e.value}return n}),s=l(i?()=>i(a):()=>{let{disabled:t}=e;return t===void 0?a?a.disabled.value:!1:t}),c=l(()=>{let{status:t}=e;return t||a?.mergedValidationStatus.value});return _(()=>{a&&a.restoreValidation()}),{mergedSizeRef:o,mergedDisabledRef:s,mergedStatusRef:c,nTriggerFormBlur(){a&&a.handleContentBlur()},nTriggerFormChange(){a&&a.handleContentChange()},nTriggerFormFocus(){a&&a.handleContentFocus()},nTriggerFormInput(){a&&a.handleContentInput()}}}function re(e,n,r){if(!n)return;let i=w(),a=l(()=>{let{value:t}=n;if(!t)return;let r=t[e];if(r)return r}),o=t(k,null),c=()=>{s(()=>{let{value:t}=r,n=`${t}${e}Rtl`;if(z(n,i))return;let{value:s}=a;s&&s.style.mount({id:n,head:!0,anchorMetaName:C,props:{bPrefix:t?`.${t}-`:void 0},ssr:i,parent:o?.styleMountTarget})})};return i?c():h(c),a}function q(e,n,r){if(!n)return;let i=w(),a=t(k,null),o=()=>{let t=r.value;n.mount({id:t===void 0?e:t+e,head:!0,anchorMetaName:C,props:{bPrefix:t?`.${t}-`:void 0},ssr:i,parent:a?.styleMountTarget}),a?.preflightStyleDisabled||A.mount({id:`n-global`,head:!0,anchorMetaName:C,ssr:i,parent:a?.styleMountTarget})};i?o():h(o)}var J=f({name:`BaseIconSwitchTransition`,setup(e,{slots:t}){let n=ee();return()=>R(O,{name:`icon-switch-transition`,appear:n.value},t)}}),{cubicBezierEaseInOut:ie}=N;function Y({originalTransform:e=``,left:t=0,top:n=0,transition:r=`all .3s ${ie} !important`}={}){return[I(`&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to`,{transform:`${e} scale(0.75)`,left:t,top:n,opacity:0}),I(`&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from`,{transform:`scale(1) ${e}`,left:t,top:n,opacity:1}),I(`&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active`,{transformOrigin:`center`,position:`absolute`,left:t,top:n,transition:r})]}var ae=f({name:`FadeInExpandTransition`,props:{appear:Boolean,group:Boolean,mode:String,onLeave:Function,onAfterLeave:Function,onAfterEnter:Function,width:Boolean,reverse:Boolean},setup(t,{slots:n}){function r(e){t.width?e.style.maxWidth=`${e.offsetWidth}px`:e.style.maxHeight=`${e.offsetHeight}px`,e.offsetWidth}function i(e){t.width?e.style.maxWidth=`0`:e.style.maxHeight=`0`,e.offsetWidth;let{onLeave:n}=t;n&&n()}function a(e){t.width?e.style.maxWidth=``:e.style.maxHeight=``;let{onAfterLeave:n}=t;n&&n()}function o(e){if(e.style.transition=`none`,t.width){let t=e.offsetWidth;e.style.maxWidth=`0`,e.offsetWidth,e.style.transition=``,e.style.maxWidth=`${t}px`}else if(t.reverse)e.style.maxHeight=`${e.offsetHeight}px`,e.offsetHeight,e.style.transition=``,e.style.maxHeight=`0`;else{let t=e.offsetHeight;e.style.maxHeight=`0`,e.offsetWidth,e.style.transition=``,e.style.maxHeight=`${t}px`}e.offsetWidth}function s(e){var n;t.width?e.style.maxWidth=``:t.reverse||(e.style.maxHeight=``),(n=t.onAfterEnter)==null||n.call(t)}return()=>{let{group:c,width:l,appear:u,mode:d}=t,f=c?e:O,p={name:l?`fade-in-width-expand-transition`:`fade-in-height-expand-transition`,appear:u,onEnter:o,onAfterEnter:s,onBeforeLeave:r,onLeave:i,onAfterLeave:a};return c||(p.mode=d),R(f,p,n)}}}),oe=I([I(`@keyframes rotator`,`
 0% {
 -webkit-transform: rotate(0deg);
 transform: rotate(0deg);
 }
 100% {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }`),p(`base-loading`,`
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `,[n(`transition-wrapper`,`
 position: absolute;
 width: 100%;
 height: 100%;
 `,[Y()]),n(`placeholder`,`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[Y({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),n(`container`,`
 animation: rotator 3s linear infinite both;
 `,[n(`icon`,`
 height: 1em;
 width: 1em;
 `)])])]),X=`1.6s`,se={strokeWidth:{type:Number,default:28},stroke:{type:String,default:void 0}},ce=f({name:`BaseLoading`,props:Object.assign({clsPrefix:{type:String,required:!0},show:{type:Boolean,default:!0},scale:{type:Number,default:1},radius:{type:Number,default:100}},se),setup(e){q(`-base-loading`,oe,d(e,`clsPrefix`))},render(){let{clsPrefix:e,radius:t,strokeWidth:n,stroke:r,scale:i}=this,a=t/i;return R(`div`,{class:`${e}-base-loading`,role:`img`,"aria-label":`loading`},R(J,null,{default:()=>this.show?R(`div`,{key:`icon`,class:`${e}-base-loading__transition-wrapper`},R(`div`,{class:`${e}-base-loading__container`},R(`svg`,{class:`${e}-base-loading__icon`,viewBox:`0 0 ${2*a} ${2*a}`,xmlns:`http://www.w3.org/2000/svg`,style:{color:r}},R(`g`,null,R(`animateTransform`,{attributeName:`transform`,type:`rotate`,values:`0 ${a} ${a};270 ${a} ${a}`,begin:`0s`,dur:X,fill:`freeze`,repeatCount:`indefinite`}),R(`circle`,{class:`${e}-base-loading__icon`,fill:`none`,stroke:`currentColor`,"stroke-width":n,"stroke-linecap":`round`,cx:a,cy:a,r:t-n/2,"stroke-dasharray":5.67*t,"stroke-dashoffset":18.48*t},R(`animateTransform`,{attributeName:`transform`,type:`rotate`,values:`0 ${a} ${a};135 ${a} ${a};450 ${a} ${a}`,begin:`0s`,dur:X,fill:`freeze`,repeatCount:`indefinite`}),R(`animate`,{attributeName:`stroke-dashoffset`,values:`${5.67*t};${1.42*t};${5.67*t}`,begin:`0s`,dur:X,fill:`freeze`,repeatCount:`indefinite`})))))):R(`div`,{key:`placeholder`,class:`${e}-base-loading__placeholder`},this.$slots)}))}}),{cubicBezierEaseInOut:Z}=N;function le({duration:e=`.2s`,delay:t=`.1s`}={}){return[I(`&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to`,{opacity:1}),I(`&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from`,`
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `),I(`&.fade-in-width-expand-transition-leave-active`,`
 overflow: hidden;
 transition:
 opacity ${e} ${Z},
 max-width ${e} ${Z} ${t},
 margin-left ${e} ${Z} ${t},
 margin-right ${e} ${Z} ${t};
 `),I(`&.fade-in-width-expand-transition-enter-active`,`
 overflow: hidden;
 transition:
 opacity ${e} ${Z} ${t},
 max-width ${e} ${Z},
 margin-left ${e} ${Z},
 margin-right ${e} ${Z};
 `)]}var ue=p(`base-wave`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`),de=f({name:`BaseWave`,props:{clsPrefix:{type:String,required:!0}},setup(e){q(`-base-wave`,ue,d(e,`clsPrefix`));let t=y(null),n=y(!1),r=null;return _(()=>{r!==null&&window.clearTimeout(r)}),{active:n,selfRef:t,play(){r!==null&&(window.clearTimeout(r),n.value=!1,r=null),o(()=>{var e;(e=t.value)==null||e.offsetHeight,n.value=!0,r=window.setTimeout(()=>{n.value=!1,r=null},1e3)})}}},render(){let{clsPrefix:e}=this;return R(`div`,{ref:`selfRef`,"aria-hidden":!0,class:[`${e}-base-wave`,this.active&&`${e}-base-wave--active`]})}});const fe=B&&`chrome`in window;B&&navigator.userAgent.includes(`Firefox`);const pe=B&&navigator.userAgent.includes(`Safari`)&&!fe;function Q(e){return S(e,[255,255,255,.16])}function $(e){return S(e,[0,0,0,.12])}const me=b(`n-button-group`);var he=I([p(`button`,`
 margin: 0;
 font-weight: var(--n-font-weight);
 line-height: 1;
 font-family: inherit;
 padding: var(--n-padding);
 height: var(--n-height);
 font-size: var(--n-font-size);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 width: var(--n-width);
 white-space: nowrap;
 outline: none;
 position: relative;
 z-index: auto;
 border: none;
 display: inline-flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 align-items: center;
 justify-content: center;
 user-select: none;
 -webkit-user-select: none;
 text-align: center;
 cursor: pointer;
 text-decoration: none;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[F(`color`,[n(`border`,{borderColor:`var(--n-border-color)`}),F(`disabled`,[n(`border`,{borderColor:`var(--n-border-color-disabled)`})]),m(`disabled`,[I(`&:focus`,[n(`state-border`,{borderColor:`var(--n-border-color-focus)`})]),I(`&:hover`,[n(`state-border`,{borderColor:`var(--n-border-color-hover)`})]),I(`&:active`,[n(`state-border`,{borderColor:`var(--n-border-color-pressed)`})]),F(`pressed`,[n(`state-border`,{borderColor:`var(--n-border-color-pressed)`})])])]),F(`disabled`,{backgroundColor:`var(--n-color-disabled)`,color:`var(--n-text-color-disabled)`},[n(`border`,{border:`var(--n-border-disabled)`})]),m(`disabled`,[I(`&:focus`,{backgroundColor:`var(--n-color-focus)`,color:`var(--n-text-color-focus)`},[n(`state-border`,{border:`var(--n-border-focus)`})]),I(`&:hover`,{backgroundColor:`var(--n-color-hover)`,color:`var(--n-text-color-hover)`},[n(`state-border`,{border:`var(--n-border-hover)`})]),I(`&:active`,{backgroundColor:`var(--n-color-pressed)`,color:`var(--n-text-color-pressed)`},[n(`state-border`,{border:`var(--n-border-pressed)`})]),F(`pressed`,{backgroundColor:`var(--n-color-pressed)`,color:`var(--n-text-color-pressed)`},[n(`state-border`,{border:`var(--n-border-pressed)`})])]),F(`loading`,`cursor: wait;`),p(`base-wave`,`
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `,[F(`active`,{zIndex:1,animationName:`button-wave-spread, button-wave-opacity`})]),B&&`MozBoxSizing`in document.createElement(`div`).style?I(`&::moz-focus-inner`,{border:0}):null,n(`border, state-border`,`
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `),n(`border`,{border:`var(--n-border)`}),n(`state-border`,{border:`var(--n-border)`,borderColor:`#0000`,zIndex:1}),n(`icon`,`
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `,[p(`icon-slot`,`
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `,[Y({top:`50%`,originalTransform:`translateY(-50%)`})]),le()]),n(`content`,`
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `,[I(`~`,[n(`icon`,{margin:`var(--n-icon-margin)`,marginRight:0})])]),F(`block`,`
 display: flex;
 width: 100%;
 `),F(`dashed`,[n(`border, state-border`,{borderStyle:`dashed !important`})]),F(`disabled`,{cursor:`not-allowed`,opacity:`var(--n-opacity-disabled)`})]),I(`@keyframes button-wave-spread`,{from:{boxShadow:`0 0 0.5px 0 var(--n-ripple-color)`},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`}}),I(`@keyframes button-wave-opacity`,{from:{opacity:`var(--n-wave-opacity)`},to:{opacity:0}})]),ge=f({name:`Button`,props:Object.assign(Object.assign({},x.props),{color:String,textColor:String,text:Boolean,block:Boolean,loading:Boolean,disabled:Boolean,circle:Boolean,size:String,ghost:Boolean,round:Boolean,secondary:Boolean,tertiary:Boolean,quaternary:Boolean,strong:Boolean,focusable:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},tag:{type:String,default:`button`},type:{type:String,default:`default`},dashed:Boolean,renderIcon:Function,iconPlacement:{type:String,default:`left`},attrType:{type:String,default:`button`},bordered:{type:Boolean,default:!0},onClick:[Function,Array],nativeFocusBehavior:{type:Boolean,default:!pe}}),slots:Object,setup(e){let n=y(null),r=y(null),a=y(!1),o=P(()=>!e.quaternary&&!e.tertiary&&!e.secondary&&!e.text&&(!e.color||e.ghost||e.dashed)&&e.bordered),s=t(me,{}),{mergedSizeRef:c}=ne({},{defaultSize:`medium`,mergedSize:t=>{let{size:n}=e;if(n)return n;let{size:r}=s;if(r)return r;let{mergedSize:i}=t||{};return i?i.value:`medium`}}),u=l(()=>e.focusable&&!e.disabled),d=t=>{var r;u.value||t.preventDefault(),!e.nativeFocusBehavior&&(t.preventDefault(),!e.disabled&&u.value&&((r=n.value)==null||r.focus({preventScroll:!0})))},f=t=>{var n;if(!e.disabled&&!e.loading){let{onClick:i}=e;i&&H(i,t),e.text||(n=r.value)==null||n.play()}},p=t=>{switch(t.key){case`Enter`:if(!e.keyboard)return;a.value=!1}},m=t=>{switch(t.key){case`Enter`:if(!e.keyboard||e.loading){t.preventDefault();return}a.value=!0}},h=()=>{a.value=!1},{inlineThemeDisabled:g,mergedClsPrefixRef:_,mergedRtlRef:v}=j(e),b=x(`Button`,`-button`,he,E,e,_),S=re(`Button`,v,_),C=l(()=>{let{common:{cubicBezierEaseInOut:t,cubicBezierEaseOut:n},self:r}=b.value,{rippleDuration:a,opacityDisabled:o,fontWeight:s,fontWeightStrong:l}=r,u=c.value,{dashed:d,type:f,ghost:p,text:m,color:h,round:g,circle:_,textColor:v,secondary:y,tertiary:x,quaternary:S,strong:C}=e,w={"--n-font-weight":C?l:s},T={"--n-color":`initial`,"--n-color-hover":`initial`,"--n-color-pressed":`initial`,"--n-color-focus":`initial`,"--n-color-disabled":`initial`,"--n-ripple-color":`initial`,"--n-text-color":`initial`,"--n-text-color-hover":`initial`,"--n-text-color-pressed":`initial`,"--n-text-color-focus":`initial`,"--n-text-color-disabled":`initial`},E=f===`tertiary`,D=f===`default`,O=E?`default`:f;if(m){let e=v||h,t=e||r[i(`textColorText`,O)];T={"--n-color":`#0000`,"--n-color-hover":`#0000`,"--n-color-pressed":`#0000`,"--n-color-focus":`#0000`,"--n-color-disabled":`#0000`,"--n-ripple-color":`#0000`,"--n-text-color":t,"--n-text-color-hover":e?Q(e):r[i(`textColorTextHover`,O)],"--n-text-color-pressed":e?$(e):r[i(`textColorTextPressed`,O)],"--n-text-color-focus":e?Q(e):r[i(`textColorTextHover`,O)],"--n-text-color-disabled":e||r[i(`textColorTextDisabled`,O)]}}else if(p||d){let e=v||h;T={"--n-color":`#0000`,"--n-color-hover":`#0000`,"--n-color-pressed":`#0000`,"--n-color-focus":`#0000`,"--n-color-disabled":`#0000`,"--n-ripple-color":h||r[i(`rippleColor`,O)],"--n-text-color":e||r[i(`textColorGhost`,O)],"--n-text-color-hover":e?Q(e):r[i(`textColorGhostHover`,O)],"--n-text-color-pressed":e?$(e):r[i(`textColorGhostPressed`,O)],"--n-text-color-focus":e?Q(e):r[i(`textColorGhostHover`,O)],"--n-text-color-disabled":e||r[i(`textColorGhostDisabled`,O)]}}else if(y){let e=D?r.textColor:E?r.textColorTertiary:r[i(`color`,O)],t=h||e,n=f!==`default`&&f!==`tertiary`;T={"--n-color":n?L(t,{alpha:Number(r.colorOpacitySecondary)}):r.colorSecondary,"--n-color-hover":n?L(t,{alpha:Number(r.colorOpacitySecondaryHover)}):r.colorSecondaryHover,"--n-color-pressed":n?L(t,{alpha:Number(r.colorOpacitySecondaryPressed)}):r.colorSecondaryPressed,"--n-color-focus":n?L(t,{alpha:Number(r.colorOpacitySecondaryHover)}):r.colorSecondaryHover,"--n-color-disabled":r.colorSecondary,"--n-ripple-color":`#0000`,"--n-text-color":t,"--n-text-color-hover":t,"--n-text-color-pressed":t,"--n-text-color-focus":t,"--n-text-color-disabled":t}}else if(x||S){let e=D?r.textColor:E?r.textColorTertiary:r[i(`color`,O)],t=h||e;x?(T[`--n-color`]=r.colorTertiary,T[`--n-color-hover`]=r.colorTertiaryHover,T[`--n-color-pressed`]=r.colorTertiaryPressed,T[`--n-color-focus`]=r.colorSecondaryHover,T[`--n-color-disabled`]=r.colorTertiary):(T[`--n-color`]=r.colorQuaternary,T[`--n-color-hover`]=r.colorQuaternaryHover,T[`--n-color-pressed`]=r.colorQuaternaryPressed,T[`--n-color-focus`]=r.colorQuaternaryHover,T[`--n-color-disabled`]=r.colorQuaternary),T[`--n-ripple-color`]=`#0000`,T[`--n-text-color`]=t,T[`--n-text-color-hover`]=t,T[`--n-text-color-pressed`]=t,T[`--n-text-color-focus`]=t,T[`--n-text-color-disabled`]=t}else T={"--n-color":h||r[i(`color`,O)],"--n-color-hover":h?Q(h):r[i(`colorHover`,O)],"--n-color-pressed":h?$(h):r[i(`colorPressed`,O)],"--n-color-focus":h?Q(h):r[i(`colorFocus`,O)],"--n-color-disabled":h||r[i(`colorDisabled`,O)],"--n-ripple-color":h||r[i(`rippleColor`,O)],"--n-text-color":v||(h?r.textColorPrimary:E?r.textColorTertiary:r[i(`textColor`,O)]),"--n-text-color-hover":v||(h?r.textColorHoverPrimary:r[i(`textColorHover`,O)]),"--n-text-color-pressed":v||(h?r.textColorPressedPrimary:r[i(`textColorPressed`,O)]),"--n-text-color-focus":v||(h?r.textColorFocusPrimary:r[i(`textColorFocus`,O)]),"--n-text-color-disabled":v||(h?r.textColorDisabledPrimary:r[i(`textColorDisabled`,O)])};let k={"--n-border":`initial`,"--n-border-hover":`initial`,"--n-border-pressed":`initial`,"--n-border-focus":`initial`,"--n-border-disabled":`initial`};k=m?{"--n-border":`none`,"--n-border-hover":`none`,"--n-border-pressed":`none`,"--n-border-focus":`none`,"--n-border-disabled":`none`}:{"--n-border":r[i(`border`,O)],"--n-border-hover":r[i(`borderHover`,O)],"--n-border-pressed":r[i(`borderPressed`,O)],"--n-border-focus":r[i(`borderFocus`,O)],"--n-border-disabled":r[i(`borderDisabled`,O)]};let{[i(`height`,u)]:A,[i(`fontSize`,u)]:j,[i(`padding`,u)]:M,[i(`paddingRound`,u)]:N,[i(`iconSize`,u)]:P,[i(`borderRadius`,u)]:F,[i(`iconMargin`,u)]:I,waveOpacity:R}=r,z={"--n-width":_&&!m?A:`initial`,"--n-height":m?`initial`:A,"--n-font-size":j,"--n-padding":_||m?`initial`:g?N:M,"--n-icon-size":P,"--n-icon-margin":I,"--n-border-radius":m?`initial`:_||g?A:F};return Object.assign(Object.assign(Object.assign(Object.assign({"--n-bezier":t,"--n-bezier-ease-out":n,"--n-ripple-duration":a,"--n-opacity-disabled":o,"--n-wave-opacity":R},w),T),k),z)}),w=g?G(`button`,l(()=>{let t=``,{dashed:n,type:r,ghost:i,text:a,color:o,round:s,circle:l,textColor:u,secondary:d,tertiary:f,quaternary:p,strong:m}=e;n&&(t+=`a`),i&&(t+=`b`),a&&(t+=`c`),s&&(t+=`d`),l&&(t+=`e`),d&&(t+=`f`),f&&(t+=`g`),p&&(t+=`h`),m&&(t+=`i`),o&&(t+=`j${V(o)}`),u&&(t+=`k${V(u)}`);let{value:h}=c;return t+=`l${h[0]}`,t+=`m${r[0]}`,t}),C,e):void 0;return{selfElRef:n,waveElRef:r,mergedClsPrefix:_,mergedFocusable:u,mergedSize:c,showBorder:o,enterPressed:a,rtlEnabled:S,handleMousedown:d,handleKeydown:m,handleBlur:h,handleKeyup:p,handleClick:f,customColorCssVars:l(()=>{let{color:t}=e;if(!t)return null;let n=Q(t);return{"--n-border-color":t,"--n-border-color-hover":n,"--n-border-color-pressed":$(t),"--n-border-color-focus":n,"--n-border-color-disabled":t}}),cssVars:g?void 0:C,themeClass:w?.themeClass,onRender:w?.onRender}},render(){let{mergedClsPrefix:e,tag:t,onRender:n}=this;n?.();let r=W(this.$slots.default,t=>t&&R(`span`,{class:`${e}-button__content`},t));return R(t,{ref:`selfElRef`,class:[this.themeClass,`${e}-button`,`${e}-button--${this.type}-type`,`${e}-button--${this.mergedSize}-type`,this.rtlEnabled&&`${e}-button--rtl`,this.disabled&&`${e}-button--disabled`,this.block&&`${e}-button--block`,this.enterPressed&&`${e}-button--pressed`,!this.text&&this.dashed&&`${e}-button--dashed`,this.color&&`${e}-button--color`,this.secondary&&`${e}-button--secondary`,this.loading&&`${e}-button--loading`,this.ghost&&`${e}-button--ghost`],tabindex:this.mergedFocusable?0:-1,type:this.attrType,style:this.cssVars,disabled:this.disabled,onClick:this.handleClick,onBlur:this.handleBlur,onMousedown:this.handleMousedown,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},this.iconPlacement===`right`&&r,R(ae,{width:!0},{default:()=>W(this.$slots.icon,t=>(this.loading||this.renderIcon||t)&&R(`span`,{class:`${e}-button__icon`,style:{margin:te(this.$slots.default)?`0`:``}},R(J,null,{default:()=>this.loading?R(ce,{clsPrefix:e,key:`loading`,class:`${e}-icon-slot`,strokeWidth:20}):R(`div`,{key:`icon`,class:`${e}-icon-slot`,role:`none`},this.renderIcon?this.renderIcon():t)})))}),this.iconPlacement===`left`&&r,this.text?null:R(de,{ref:`waveElRef`,clsPrefix:e}),this.showBorder?R(`div`,{"aria-hidden":!0,class:`${e}-button__border`,style:this.customColorCssVars}):null,this.showBorder?R(`div`,{"aria-hidden":!0,class:`${e}-button__state-border`,style:this.customColorCssVars}):null)}});export{q as n,G as r,ge as t};