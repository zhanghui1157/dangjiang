(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index3-work-plan-add"],{"08cc":function(e,t,n){var r=n("ed6e");"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var a=n("4f06").default;a("32bfa314",r,!0,{sourceMap:!1,shadowMode:!1})},"0ba4":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"content"},[n("v-uni-form",{on:{submit:function(t){t=e.$handleEvent(t),e.formSubmit(t)},reset:function(t){t=e.$handleEvent(t),e.formReset(t)}}},[n("v-uni-view",{staticClass:"form-item"},[n("v-uni-view",{staticClass:"list-item"},[n("v-uni-view",{staticClass:"item-text"},[e._v("计划标题")]),n("v-uni-view",{staticClass:"item-input"},[n("v-uni-input",{attrs:{type:"text",name:"workplan_title",placeholder:"请输入工作计划标题"}})],1)],1),n("v-uni-view",{staticClass:"list-item"},[n("v-uni-view",{staticClass:"item-text"},[e._v("执行人")]),n("v-uni-view",{staticClass:"item-input"},[n("v-uni-input",{attrs:{type:"text",value:e.workplan_executor_man_txt,placeholder:"请选择执行人",disabled:""},on:{click:function(t){t=e.$handleEvent(t),e.selectPeople()}}}),n("v-uni-input",{staticStyle:{display:"none"},attrs:{type:"text",value:e.workplan_executor_man,name:"workplan_executor_man"}})],1)],1),n("v-uni-view",{staticClass:"list-item"},[n("v-uni-view",{staticClass:"item-text"},[e._v("开始时间")]),n("v-uni-view",{staticClass:"item-input"},[n("v-uni-picker",{attrs:{mode:"date",value:e.date1,start:e.startDate,end:e.endDate},on:{change:function(t){t=e.$handleEvent(t),e.bindDateChange1(t)}}},[n("v-uni-input",{attrs:{type:"text",name:"workplan_expectstart_time",value:e.date1,placeholder:"请选择开始时间",disabled:""}})],1)],1)],1),n("v-uni-view",{staticClass:"list-item"},[n("v-uni-view",{staticClass:"item-text"},[e._v("结束时间")]),n("v-uni-view",{staticClass:"item-input"},[n("v-uni-picker",{attrs:{mode:"date",value:e.date2,start:e.startDate,end:e.endDate},on:{change:function(t){t=e.$handleEvent(t),e.bindDateChange2(t)}}},[n("v-uni-input",{attrs:{type:"text",name:"workplan_expectend_time",value:e.date2,placeholder:"请结束开始时间",disabled:""}})],1)],1)],1)],1),n("v-uni-view",{staticClass:"middle-line"}),n("v-uni-view",{staticClass:"form-item"},[n("v-uni-textarea",{attrs:{value:"",placeholder:"请输入工作计划内容",name:"workplan_content"}})],1),n("v-uni-view",{staticClass:"middle-line"}),n("v-uni-view",{staticClass:"form-item"},[n("v-uni-textarea",{attrs:{value:"",placeholder:"备注",name:"memo"}})],1),n("v-uni-button",{staticClass:"form-btn",attrs:{formType:"submit"}},[e._v("提交")])],1)],1)},a=[];n.d(t,"a",function(){return r}),n.d(t,"b",function(){return a})},7542:function(e,t,n){"use strict";var r=n("08cc"),a=n.n(r);a.a},"79fc":function(e,t,n){"use strict";var r=n("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n("e836")),i=n("e3fb");function s(e){var t=new Date,n=t.getFullYear(),r=t.getMonth()+1,a=t.getDate();return"start"===e?n-=60:"end"===e&&(n+=2),r=r>9?r:"0"+r,a=a>9?a:"0"+a,"".concat(n,"-").concat(r,"-").concat(a)}var o={data:function(){return{info:[],date1:s({format:!0}),date2:s({format:!0}),startDate:s("start"),endDate:s("end"),workplan_executor_man:"",workplan_executor_man_txt:""}},onReady:function(){var e=this;a.default.on("work_plan",function(t){console.log(t),e.workplan_executor_man=t["communist_no"],e.workplan_executor_man_txt=t["communist_name"]})},onLoad:function(){},methods:{bindDateChange1:function(e){this.date1=e.target.value},bindDateChange2:function(e){this.date2=e.target.value},selectPeople:function(){var e=this;uni.navigateTo({url:"work-plan-people?&workplan_executor_man="+e.workplan_executor_man})},bindCateChange:function(e){var t=this,n=e.target.value;t.selectCate=t.cate[n]["template_name"],t.cateIndex=n,t.cateIndexSelect=t.cate[n]["template_no"]},formSubmit:function(e){var t=this,n=e.detail.value,r=[{name:"workplan_title",checkType:"notnull",checkRule:"",errorMsg:"请输入标题"},{name:"workplan_executor_man",checkType:"notnull",checkRule:"",errorMsg:"请选择执行人"},{name:"workplan_expectstart_time",checkType:"notnull",checkRule:"",errorMsg:"请选择开始时间"},{name:"workplan_expectend_time",checkType:"notnull",checkRule:"",errorMsg:"请选择结束时间"},{name:"workplan_content",checkType:"notnull",checkRule:"",errorMsg:"请输入工作计划内容"}],a=i.check(n,r);a?(n["communist_no"]=t.globalData.userInfo.communist_no,n["workplan_arranger_man"]=t.globalData.userInfo.communist_no,t.submitContent(n)):uni.showToast({title:i.error,icon:"none"})},submitContent:function(e){var t=this;t.urlRequest.urlRequest(t.func.setOaWorkplan,e,function(e){1==e.data.status&&uni.showToast({title:"提交成功!",duration:2e3,icon:"none",success:function(){setTimeout(function(){uni.switchTab({url:"index"})},2e3)}})})}}};t.default=o},b4b7:function(e,t,n){"use strict";n.r(t);var r=n("0ba4"),a=n("c8c6");for(var i in a)"default"!==i&&function(e){n.d(t,e,function(){return a[e]})}(i);n("7542");var s=n("2877"),o=Object(s["a"])(a["default"],r["a"],r["b"],!1,null,"1be639f4",null);t["default"]=o.exports},c8c6:function(e,t,n){"use strict";n.r(t);var r=n("79fc"),a=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,function(){return r[e]})}(i);t["default"]=a.a},e3fb:function(e,t,n){"use strict";n("c5f6"),n("28a5"),n("3b2b"),n("7f7f"),e.exports={error:"",check:function(e,t){for(var n=0;n<t.length;n++){if(!t[n].checkType)return!0;if(!t[n].name)return!0;if(!t[n].errorMsg)return!0;if(!e[t[n].name])return this.error=t[n].errorMsg,!1;switch(t[n].checkType){case"string":var r=new RegExp("^.{"+t[n].checkRule+"}$");if(!r.test(e[t[n].name]))return this.error=t[n].errorMsg,!1;break;case"int":r=new RegExp("^(-[1-9]|[1-9])[0-9]{"+t[n].checkRule+"}$");if(!r.test(e[t[n].name]))return this.error=t[n].errorMsg,!1;break;case"between":if(!this.isNumber(e[t[n].name]))return this.error=t[n].errorMsg,!1;var a=t[n].checkRule.split(",");if(a[0]=Number(a[0]),a[1]=Number(a[1]),e[t[n].name]>a[1]||e[t[n].name]<a[0])return this.error=t[n].errorMsg,!1;break;case"betweenD":r=/^-?[1-9][0-9]?$/;if(!r.test(e[t[n].name]))return this.error=t[n].errorMsg,!1;a=t[n].checkRule.split(",");if(a[0]=Number(a[0]),a[1]=Number(a[1]),e[t[n].name]>a[1]||e[t[n].name]<a[0])return this.error=t[n].errorMsg,!1;break;case"betweenF":r=/^-?[0-9][0-9]?.+[0-9]+$/;if(!r.test(e[t[n].name]))return this.error=t[n].errorMsg,!1;a=t[n].checkRule.split(",");if(a[0]=Number(a[0]),a[1]=Number(a[1]),e[t[n].name]>a[1]||e[t[n].name]<a[0])return this.error=t[n].errorMsg,!1;break;case"same":if(e[t[n].name]!=t[n].checkRule)return this.error=t[n].errorMsg,!1;break;case"notsame":if(e[t[n].name]==t[n].checkRule)return this.error=t[n].errorMsg,!1;break;case"email":r=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;if(!r.test(e[t[n].name]))return this.error=t[n].errorMsg,!1;break;case"phoneno":r=/^1[0-9]{10,10}$/;if(!r.test(e[t[n].name]))return this.error=t[n].errorMsg,!1;break;case"zipcode":r=/^[0-9]{6}$/;if(!r.test(e[t[n].name]))return this.error=t[n].errorMsg,!1;break;case"reg":r=new RegExp(t[n].checkRule);if(!r.test(e[t[n].name]))return this.error=t[n].errorMsg,!1;break;case"in":if(-1==t[n].checkRule.indexOf(e[t[n].name]))return this.error=t[n].errorMsg,!1;break;case"notnull":if(null==e[t[n].name]||e[t[n].name].length<1)return this.error=t[n].errorMsg,!1;break}}return!0},isNumber:function(e){var t=/^-?[1-9][0-9]?.?[0-9]*$/;return t.test(e)}}},ed6e:function(e,t,n){t=e.exports=n("2350")(!1),t.push([e.i,".form-item[data-v-1be639f4]{width:96%;margin:auto}.list-item[data-v-1be639f4]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:%?100?%;border-bottom:1px solid #e8e8e8}.list-item[data-v-1be639f4]:last-child{border:%?0?%}.item-text[data-v-1be639f4]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;height:%?100?%;line-height:%?100?%;color:#b3b3b3}.item-input[data-v-1be639f4]{-webkit-box-flex:4;-webkit-flex:4;-ms-flex:4;flex:4;height:%?100?%}.item-input uni-input[data-v-1be639f4]{height:%?100?%;width:100%;font-size:14px;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap}uni-textarea[data-v-1be639f4]{width:96%;padding:%?10?%;font-size:14px}",""])}}]);