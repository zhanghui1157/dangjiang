(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index3-add-help"],{"0260":function(e,t,i){"use strict";i.r(t);var r=i("9e43"),n=i.n(r);for(var a in r)"default"!==a&&function(e){i.d(t,e,function(){return r[e]})}(a);t["default"]=n.a},"2d5e":function(e,t,i){var r=i("45c5");"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var n=i("4f06").default;n("1ac5a9b5",r,!0,{sourceMap:!1,shadowMode:!1})},4554:function(e,t,i){"use strict";i.r(t);var r=i("d66f"),n=i("0260");for(var a in n)"default"!==a&&function(e){i.d(t,e,function(){return n[e]})}(a);i("939f");var s=i("2877"),l=Object(s["a"])(n["default"],r["a"],r["b"],!1,null,"cc6aa630",null);t["default"]=l.exports},"45c5":function(e,t,i){t=e.exports=i("2350")(!1),t.push([e.i,".form-item[data-v-cc6aa630]{width:96%;margin:auto}.list-item[data-v-cc6aa630]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:%?100?%;border-bottom:1px solid #e8e8e8}.list-item[data-v-cc6aa630]:last-child{border:%?0?%}.item-text[data-v-cc6aa630]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;height:%?100?%;line-height:%?100?%;color:#b3b3b3}.item-input[data-v-cc6aa630]{-webkit-box-flex:4;-webkit-flex:4;-ms-flex:4;flex:4;height:%?100?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.item-input uni-input[data-v-cc6aa630]{-webkit-box-flex:5;-webkit-flex:5;-ms-flex:5;flex:5;height:%?100?%;font-size:14px;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap}.item-input uni-view[data-v-cc6aa630]{-webkit-box-flex:2;-webkit-flex:2;-ms-flex:2;flex:2;line-height:%?100?%;text-align:right;color:red}uni-textarea[data-v-cc6aa630]{width:96%;padding:%?10?%;font-size:14px}.file-list[data-v-cc6aa630]{padding:%?20?% 0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:100%;color:#b3b3b3}.file-name[data-v-cc6aa630]{-webkit-box-flex:4;-webkit-flex:4;-ms-flex:4;flex:4;overflow:hidden}.file-del[data-v-cc6aa630]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;text-align:center}",""])},"939f":function(e,t,i){"use strict";var r=i("2d5e"),n=i.n(r);n.a},"9e43":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=i("e3fb"),n={data:function(){return{info:[],file_select:[],file_num:0}},onReady:function(){},mounted:function(){var e=document.createElement("input");e.style.display="none",e.type="file",e.id="file";var t=this;this.$refs.input.$el.appendChild(e),e.onchange=function(e){var i=e.target.files[0];t.uploadAPI(i)}},onLoad:function(){var e=this;e.urlRequest.urlRequest(e.func.workLogList,"",function(t){e.cate=t.data.worklog_list})},methods:{fileDel:function(e){for(var t=this,i=0;i<t.file_select.length;i++)e==t.file_select[i]["upload_id"]&&(t.file_select.splice(i,1),t.file_num--)},uploadBtn:function(){return document.getElementById("file").click()},uploadAPI:function(e){var t=this;uni.showLoading();var i=new FormData;i.append("file",e);var r=new XMLHttpRequest;r.open("POST",t.func.openUploud,!0),r.onload=function(e){var i=JSON.parse(e.currentTarget.response);1==i.status&&(t.file_select.push(i),t.file_num++),uni.hideLoading()},r.send(i)},selectPeople:function(){var e=this;uni.navigateTo({url:"work-plan-people?&workplan_executor_man="+e.worklog_audit_man})},bindCateChange:function(e){var t=this,i=e.target.value;t.selectCate=t.cate[i]["type_name"],t.cateIndex=i,t.cateIndexSelect=t.cate[i]["type_no"]},formSubmit:function(e){var t=this,i=e.detail.value,n=[{name:"difficulty_content",checkType:"notnull",checkRule:"",errorMsg:"请输入申请帮扶事由"}],a=r.check(i,n);if(a){i["communist_no"]=t.globalData.userInfo.communist_no;for(var s="",l=0;l<t.file_select.length;l++)s=""==s?t.file_select[l]["upload_id"]:s+","+t.file_select[l]["upload_id"];i["help_img"]=s,t.submitContent(i)}else uni.showToast({title:r.error,icon:"none"})},submitContent:function(e){var t=this;t.urlRequest.urlRequest(t.func.setHelp,e,function(e){1==e.data.status&&uni.showToast({title:"提交成功!",duration:2e3,icon:"none",success:function(){setTimeout(function(){uni.switchTab({url:"index"})},2e3)}})})}}};t.default=n},d66f:function(e,t,i){"use strict";var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"content"},[i("v-uni-form",{on:{submit:function(t){t=e.$handleEvent(t),e.formSubmit(t)},reset:function(t){t=e.$handleEvent(t),e.formReset(t)}}},[i("v-uni-view",{staticClass:"form-item"},[i("v-uni-textarea",{attrs:{value:"",placeholder:"请输入申请帮扶事由",name:"difficulty_content"}})],1),i("v-uni-view",{staticClass:"middle-line"}),i("v-uni-view",{staticClass:"form-item"},[i("v-uni-view",{staticClass:"list-item"},[i("v-uni-view",{staticClass:"item-text"},[e._v("附件")]),i("v-uni-view",{staticClass:"item-input"},[i("v-uni-view",{ref:"input",staticClass:"input",staticStyle:{color:"#777","text-align":"left"}},[e._v("当前已选 "+e._s(e.file_num)+" 附件")]),i("v-uni-view",{on:{click:function(t){t=e.$handleEvent(t),e.uploadBtn(t)}}},[i("v-uni-view",{staticClass:"icon iconfont"},[e._v("请选择 ")])],1)],1)],1),i("v-uni-view",{staticClass:"form-item"},e._l(e.file_select,function(t){return i("v-uni-view",{staticClass:"file-list"},[i("v-uni-view",{staticClass:"file-name"},[e._v(e._s(t.upload_source))]),i("v-uni-view",{staticClass:"file-del icon iconfont",on:{click:function(i){i=e.$handleEvent(i),e.fileDel(t.upload_id)}}},[e._v("")])],1)}),1)],1),i("v-uni-button",{staticClass:"form-btn",attrs:{formType:"submit"}},[e._v("提交")])],1)],1)},n=[];i.d(t,"a",function(){return r}),i.d(t,"b",function(){return n})},e3fb:function(e,t,i){"use strict";i("c5f6"),i("28a5"),i("3b2b"),i("7f7f"),e.exports={error:"",check:function(e,t){for(var i=0;i<t.length;i++){if(!t[i].checkType)return!0;if(!t[i].name)return!0;if(!t[i].errorMsg)return!0;if(!e[t[i].name])return this.error=t[i].errorMsg,!1;switch(t[i].checkType){case"string":var r=new RegExp("^.{"+t[i].checkRule+"}$");if(!r.test(e[t[i].name]))return this.error=t[i].errorMsg,!1;break;case"int":r=new RegExp("^(-[1-9]|[1-9])[0-9]{"+t[i].checkRule+"}$");if(!r.test(e[t[i].name]))return this.error=t[i].errorMsg,!1;break;case"between":if(!this.isNumber(e[t[i].name]))return this.error=t[i].errorMsg,!1;var n=t[i].checkRule.split(",");if(n[0]=Number(n[0]),n[1]=Number(n[1]),e[t[i].name]>n[1]||e[t[i].name]<n[0])return this.error=t[i].errorMsg,!1;break;case"betweenD":r=/^-?[1-9][0-9]?$/;if(!r.test(e[t[i].name]))return this.error=t[i].errorMsg,!1;n=t[i].checkRule.split(",");if(n[0]=Number(n[0]),n[1]=Number(n[1]),e[t[i].name]>n[1]||e[t[i].name]<n[0])return this.error=t[i].errorMsg,!1;break;case"betweenF":r=/^-?[0-9][0-9]?.+[0-9]+$/;if(!r.test(e[t[i].name]))return this.error=t[i].errorMsg,!1;n=t[i].checkRule.split(",");if(n[0]=Number(n[0]),n[1]=Number(n[1]),e[t[i].name]>n[1]||e[t[i].name]<n[0])return this.error=t[i].errorMsg,!1;break;case"same":if(e[t[i].name]!=t[i].checkRule)return this.error=t[i].errorMsg,!1;break;case"notsame":if(e[t[i].name]==t[i].checkRule)return this.error=t[i].errorMsg,!1;break;case"email":r=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;if(!r.test(e[t[i].name]))return this.error=t[i].errorMsg,!1;break;case"phoneno":r=/^1[0-9]{10,10}$/;if(!r.test(e[t[i].name]))return this.error=t[i].errorMsg,!1;break;case"zipcode":r=/^[0-9]{6}$/;if(!r.test(e[t[i].name]))return this.error=t[i].errorMsg,!1;break;case"reg":r=new RegExp(t[i].checkRule);if(!r.test(e[t[i].name]))return this.error=t[i].errorMsg,!1;break;case"in":if(-1==t[i].checkRule.indexOf(e[t[i].name]))return this.error=t[i].errorMsg,!1;break;case"notnull":if(null==e[t[i].name]||e[t[i].name].length<1)return this.error=t[i].errorMsg,!1;break}}return!0},isNumber:function(e){var t=/^-?[1-9][0-9]?.?[0-9]*$/;return t.test(e)}}}}]);