(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-login"],{"17f3":function(e,r,t){"use strict";t.r(r);var n=t("2e00"),i=t.n(n);for(var a in n)"default"!==a&&function(e){t.d(r,e,function(){return n[e]})}(a);r["default"]=i.a},"2e00":function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n=t("e3fb"),i={data:function(){return{idcard:""}},methods:{doLogin:function(){var e=this;if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(e.idcard))return uni.showToast({title:"身份证号码错误",duration:2e3,icon:"none"}),!1;e.submitContent()},formSubmit:function(e){var r=this,t=e.detail.value,i=[{name:"idnumber",checkType:"notnull",checkRule:"",errorMsg:"身份证号码不能为空"}],a=n.check(t,i);a?r.submitContent(t):uni.showToast({title:n.error,icon:"none"})},submitContent:function(e){var r=this;r.urlRequest.urlRequest(r.func.userLogin,e,function(e){1==e.data.status?uni.showToast({title:e.data.msg,duration:2e3,icon:"none",success:function(){var t={idcard:r.idcard,party_no:e.data.party_no,communist_no:e.data.communist_no};uni.setStorage({key:"user_info",data:t,success:function(e){uni.getStorage({key:"user_info",success:function(e){r.globalData.userInfo=e.data,setTimeout(function(){uni.switchTab({url:"/pages/index/index"})},2e3)}})},fail:function(){uni.showToast({title:"本地存储失败！",duration:2e3,icon:"none"})}})}}):uni.showToast({title:e.data.msg,duration:2e3,icon:"none"})})}}};r.default=i},ab40:function(e,r,t){"use strict";var n=t("e623"),i=t.n(n);i.a},c60e:function(e,r,t){r=e.exports=t("2350")(!1),r.push([e.i,".idcard[data-v-18e47be6]{width:100%;margin:%?30?% 0}uni-input[data-v-18e47be6]{height:%?80?%;line-height:%?80?%;font-size:14px;border-bottom:%?1?% solid #f0eded}.login-btn[data-v-18e47be6]{width:100%;background:#e93a30;color:#fff;height:%?80?%;line-height:%?80?%;text-align:center;border-radius:%?10?%;margin-top:%?80?%}",""])},d0f3:function(e,r,t){"use strict";var n=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("v-uni-view",[t("v-uni-view",{staticClass:"content"},[t("v-uni-view",{staticClass:"main-content"},[t("v-uni-form",{on:{submit:function(r){r=e.$handleEvent(r),e.formSubmit(r)},reset:function(r){r=e.$handleEvent(r),e.formReset(r)}}},[t("v-uni-view",{staticClass:"idcard"},[t("v-uni-input",{attrs:{name:"idnumber",placeholder:"请输入身份证号码"}})],1),t("v-uni-button",{staticClass:"login-btn",attrs:{formType:"submit"}},[e._v("登录")])],1)],1)],1)],1)},i=[];t.d(r,"a",function(){return n}),t.d(r,"b",function(){return i})},d1b5:function(e,r,t){"use strict";t.r(r);var n=t("d0f3"),i=t("17f3");for(var a in i)"default"!==a&&function(e){t.d(r,e,function(){return i[e]})}(a);t("ab40");var o=t("2877"),s=Object(o["a"])(i["default"],n["a"],n["b"],!1,null,"18e47be6",null);r["default"]=s.exports},e3fb:function(e,r,t){"use strict";t("c5f6"),t("28a5"),t("3b2b"),t("7f7f"),e.exports={error:"",check:function(e,r){for(var t=0;t<r.length;t++){if(!r[t].checkType)return!0;if(!r[t].name)return!0;if(!r[t].errorMsg)return!0;if(!e[r[t].name])return this.error=r[t].errorMsg,!1;switch(r[t].checkType){case"string":var n=new RegExp("^.{"+r[t].checkRule+"}$");if(!n.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"int":n=new RegExp("^(-[1-9]|[1-9])[0-9]{"+r[t].checkRule+"}$");if(!n.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"between":if(!this.isNumber(e[r[t].name]))return this.error=r[t].errorMsg,!1;var i=r[t].checkRule.split(",");if(i[0]=Number(i[0]),i[1]=Number(i[1]),e[r[t].name]>i[1]||e[r[t].name]<i[0])return this.error=r[t].errorMsg,!1;break;case"betweenD":n=/^-?[1-9][0-9]?$/;if(!n.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;i=r[t].checkRule.split(",");if(i[0]=Number(i[0]),i[1]=Number(i[1]),e[r[t].name]>i[1]||e[r[t].name]<i[0])return this.error=r[t].errorMsg,!1;break;case"betweenF":n=/^-?[0-9][0-9]?.+[0-9]+$/;if(!n.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;i=r[t].checkRule.split(",");if(i[0]=Number(i[0]),i[1]=Number(i[1]),e[r[t].name]>i[1]||e[r[t].name]<i[0])return this.error=r[t].errorMsg,!1;break;case"same":if(e[r[t].name]!=r[t].checkRule)return this.error=r[t].errorMsg,!1;break;case"notsame":if(e[r[t].name]==r[t].checkRule)return this.error=r[t].errorMsg,!1;break;case"email":n=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;if(!n.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"phoneno":n=/^1[0-9]{10,10}$/;if(!n.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"zipcode":n=/^[0-9]{6}$/;if(!n.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"reg":n=new RegExp(r[t].checkRule);if(!n.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"in":if(-1==r[t].checkRule.indexOf(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"notnull":if(null==e[r[t].name]||e[r[t].name].length<1)return this.error=r[t].errorMsg,!1;break}}return!0},isNumber:function(e){var r=/^-?[1-9][0-9]?.?[0-9]*$/;return r.test(e)}}},e623:function(e,r,t){var n=t("c60e");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var i=t("4f06").default;i("13369e9e",n,!0,{sourceMap:!1,shadowMode:!1})}}]);