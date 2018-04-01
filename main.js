!function(e){var t={};function s(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},s.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=0)}({0:function(e,t,s){"use strict";s.r(t);var i;s(5);!function(e){e[e.INFO=0]="INFO",e[e.ERROR=1]="ERROR"}(i||(i={}));class r{log(e,t){t===i.ERROR?console.error(e):console.log(e)}}class n extends r{constructor(){super(),this._HTMLNode=document.querySelector(".log")}set HTMLNode(e){this._HTMLNode=e}get HTMLNode(){return this._HTMLNode}log(e,t){super.log(e,t),this._HTMLNode&&(this._HTMLNode.innerHTML+=`${e} <br>`)}}class a{constructor(e){this._value=e,this._observers=[]}next(e){this._value=e,this._notifyObservers(e)}getValue(){return this._value}registerObserver(e){this._observers.push(e)}removeObserver(e){this._observers.splice(this._observers.indexOf(e),1)}_notifyObservers(e){this._observers.forEach(t=>{t.update(e)})}}const o="STORE";class c extends n{constructor(){if(super(),c._state=new a({}),this.state$=c._state,c._instance)throw new Error("only one Store is Allowed")}static createStore({dispatcher:e,state:t,callbacks:s}){c._instance.log(`${o} WAS CREATED`,i.INFO),c.dispatcher=e;for(const e in s)this.dispatcher.register(e,s[e]);return c._state.next(t),this._instance}get state(){return c._state.getValue()}changeEvent(e){const t=Object.keys(e),s=t.length?`${o} CHANGE ${t} KEYS`:`${o} CHANGE EVENT FIRED WITH EMPTY PAYLOAD`;this.log(s,i.INFO),t.length&&c._state.next(Object.assign(this.state,e))}}c._instance=new c;const l="DISPATCHER";class h extends n{constructor(){if(h._instance)return h._instance;super(),this._callbacks=new Map}register(e,t){this._callbacks.has(e)||this._callbacks.set(e,[]),this._callbacks.get(e).push(t),this.log(`${l} REGISTER ${e} CALLBACK`,i.INFO)}dispatch(e){this._callbacks.has(e.type)?this._callbacks.get(e.type).forEach(t=>{this.log(`${l} DISPATCH ${e.type} CALLBACK`,i.INFO),t(e.payload)}):this.log(`${l} DISPATCH ERRORS ON TYPE ${e.type} CALLBACK`,i.ERROR)}unregister(e,t){if(this._callbacks.has(e)){t<this._callbacks.get(e).length&&t>=0&&(this._callbacks.get(e).splice(t,1),this.log(`${l} UNREGISTER ${e} CALLBACK with index ${t}`,i.INFO))}}}h._instance=new h;const d="INPUT_ON_KEY_UP",u="DATA_IN_SEND_PROCESS",_="DATA_WAS_SENT",E="ERROR_DATA",p="BUTTON_CLICK",b=e=>new Promise((t,s)=>{const i=setTimeout(()=>{t(e),clearTimeout(i)},800)}),g=new h,S=c.createStore({dispatcher:g,state:{log:"",logList:[],currentData:"",data:"Здесь появится ответ сервера",isSending:!1},callbacks:{[p]:()=>{g.dispatch({type:u})},[d]:e=>{S.changeEvent({currentData:e})},[u]:()=>{S.changeEvent({isSending:!0}),b(S.state.currentData).then(e=>{g.dispatch({type:_,payload:e||"YOU SEND EMPTY DATA"}),S.changeEvent({isSending:!1})}).catch(e=>{g.dispatch({type:E}),S.changeEvent({isSending:!1})})},[_]:e=>{S.changeEvent({data:e})}}}),v="VIEW";class N extends n{constructor(e,t){super(),this._node=e,this._observable=t,this._keys={},this._node=e,this._observable=t,this._observable.registerObserver(this)}_render(e){for(const t of this._node.childNodes){const s=t.dataset.bind;void 0!==s&&(void 0!==this._keys[s]&&e[s]===this._keys[s]||(this.log(`${v} RENDER 'inner text'`,i.INFO),t.innerText=e[s],this._keys[s]=e[s]));const r=t.dataset.disabled,n=t.tagName;void 0!==r&&(void 0!==this._keys[`${n}_${r}`]&&e[r]===this._keys[`${n}_${r}`]||(this.log(`${v} RENDER 'disabled props'`,i.INFO),t.disabled=e[r],this._keys[`${n}_${r}`]=e[r]))}}render(e){this._template=e(),this._node.innerHTML=this._template,this._render(this._observable.getValue())}update(e){this._render(e)}}new N(document.querySelector(".flux").querySelector(".view-stub__label"),S.state$).render(()=>'<div data-bind="data"></div>'),new N(document.querySelector(".flux").querySelector(".view-stub__input-block"),S.state$).render(()=>'<input class="view-stub__input" data-disabled="isSending"/><button class="view-stub__apply" data-disabled="isSending">Отправить на сервер</button>');class R extends n{constructor(){super(),this._state={},this.HTMLNode=document.querySelector(".mvp").querySelector(".log")}set state(e){this._state=Object.assign(this._state,e)}get state(){return this._state}}class T extends n{constructor(e){super(),this._view=e,this.HTMLNode=this._view.node.querySelector(".log"),this._model=new R,this.init()}set state(e){this._update(e)}get state(){return this._model.state}get view(){return this._view}get model(){return this._model}init(){}provide(e){this._model=new e}_update(e){this._model.state=e,this.log("PRESENTER UPDATE DATA MODEL",i.INFO)}}class y extends n{constructor(e){super(),this.node=e,this.HTMLNode=this.node.querySelector(".log"),this.log("VIEW WAS CREATED",i.INFO),this._presenter=new T(this)}provide(e,t){return this._presenter=new e(this),this._presenter.provide(t),this}get presenter(){return this._presenter}}class O extends T{init(){this.state={data:"Здесь появится ответ сервера",currentData:""},this.renderLabel(this.state)}click(){this.log("PRESENTER CLICK INVOKE",i.INFO),this.changeDisableState({isDisabled:!0}),this.model.sendToServer(this.view.node.querySelector("input").value).then(e=>{this.log("PRESENTER SAYS: SERVER RESPOND WITH SUCCESS",i.INFO),this.state={data:e||"YOU SEND EMPTY DATA"},this.changeDisableState({isDisabled:!1}),this.renderLabel(this.state)}).catch(e=>{this.changeDisableState({isDisabled:!1}),this.log("PRESENTER SAYS: SERVER RESPOND WITH ERROR",i.ERROR)})}keyup(){this.log("PRESENTER KEYUP INVOKE",i.INFO),this.state={currentData:this.view.node.querySelector("input").value}}renderLabel(e){e.data&&(this.view.node.querySelector(".view-stub__label").innerText=e.data,this.log("PRESENTER UPDATE VIEW",i.INFO))}changeDisableState({isDisabled:e}){this.view.node.querySelector(".view-stub__input").disabled=e,this.view.node.querySelector(".view-stub__apply").disabled=e}}class A extends R{sendToServer(e){return this.log("MODEL SEND DATA TO SERVER DATA: "+e,i.INFO),b(e)}}(()=>{const e=document.querySelector(".flux"),t=e.querySelector("input"),s=e.querySelector(".view-stub__apply"),i=new h;s.addEventListener("click",()=>{i.dispatch({type:p})}),t.addEventListener("keyup",function(){i.dispatch({type:d,payload:this.value})})})();(()=>{const e=new class extends y{click(){this.log("VIEW CLICK ON BUTTON",i.INFO),console.log(this.presenter),this.presenter.click()}keyup(){this.log("VIEW KEY UP ON INPUT",i.INFO),this.presenter.keyup()}}(document.querySelector(".mvp")).provide(O,A),t=e.node.querySelector(".view-stub__apply"),s=e.node.querySelector("input");t.addEventListener("click",()=>{e.click()}),s.addEventListener("keyup",()=>{e.keyup()})})()},5:function(e,t){}});
//# sourceMappingURL=main.js.map