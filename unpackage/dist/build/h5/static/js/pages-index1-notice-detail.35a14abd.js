(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index1-notice-detail"],{"0bdc":function(e,t,i){var a=i("8f74");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("76262ea4",a,!0,{sourceMap:!1,shadowMode:!1})},"0c88":function(e,t,i){"use strict";var a=i("0bdc"),n=i.n(a);n.a},"186f":function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"report-head"},[i("v-uni-view",{staticClass:"report-left"},[i("v-uni-view",{staticClass:"report-title"},[e._v(e._s(e.detail.notice_title))]),i("v-uni-view",{staticClass:"report-checker"},[e._v("发布人:"+e._s(e.detail.add_communist))]),i("v-uni-view",{staticClass:"report-checker"},[e._v("发布时间:"+e._s(e.detail.add_time))])],1)],1),i("v-uni-view",{staticClass:"middle-line"}),e.detail.file?i("v-uni-view",{staticClass:"form-item"},[i("v-uni-view",{staticClass:"file-title"},[e._v("附件")]),e._l(e.detail.file,function(t){return i("v-uni-view",{staticClass:"file-list"},[i("v-uni-view",{staticClass:"file-name"},[e._v(e._s(t.upload_source))]),i("v-uni-view",{staticClass:"file-size"},[e._v(e._s(t.upload_size))]),i("v-uni-view",{staticClass:"file-del icon iconfont",on:{click:function(i){i=e.$handleEvent(i),e.download(t.upload_path)}}},[e._v("")])],1)})],2):e._e(),i("v-uni-view",{staticClass:"middle-line"}),i("v-uni-view",{staticClass:"report-content"},[i("v-uni-rich-text",{attrs:{nodes:e.detail.notice_content}})],1)],1)},n=[];i.d(t,"a",function(){return a}),i.d(t,"b",function(){return n})},7957:function(e,t,i){"use strict";i.r(t);var a=i("8ef8"),n=i.n(a);for(var l in a)"default"!==l&&function(e){i.d(t,e,function(){return a[e]})}(l);t["default"]=n.a},"8be1":function(e,t,i){"use strict";i.r(t);var a=i("186f"),n=i("7957");for(var l in n)"default"!==l&&function(e){i.d(t,e,function(){return n[e]})}(l);i("0c88");var o=i("2877"),f=Object(o["a"])(n["default"],a["a"],a["b"],!1,null,"5f3b90fa",null);t["default"]=f.exports},"8ef8":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{detail:[]}},onLoad:function(e){var t=this;uni.showLoading(),t.urlRequest.urlRequest(t.func.getNoticeInfo,{notice_id:e.id,communist_no:t.globalData.userInfo.communist_no},function(e){if(t.detail=e.data.notice_info,t.detail.file)for(var i=0;i<t.detail.file.length;i++)t.detail.file[i]["upload_path"]=t.sta.siteroot+"/uploads/"+t.detail.file[i]["upload_path"]}),uni.hideLoading()},methods:{download:function(e){uni.downloadFile({url:e,success:function(e){var t=e.tempFilePath;200===e.statusCode&&(uni.openDocument({filePath:t,success:function(e){console.log("打开文档成功"),console.log(e)}}),uni.saveFile({tempFilePath:t,success:function(e){var t=e.savedFilePath;console.log(t),uni.showToast({title:"下载成功",content:t,duration:500}),uni.getSavedFileList({success:function(e){console.log(e.fileList)}})}}))}})},activeDetail:function(e){uni.navigateTo({url:"../index1/active-detail?id="+e})}}};t.default=a},"8f74":function(e,t,i){t=e.exports=i("2350")(!1),t.push([e.i,".report-head[data-v-5f3b90fa]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.report-left[data-v-5f3b90fa]{-webkit-box-flex:5;-webkit-flex:5;-ms-flex:5;flex:5;padding:%?20?%;line-height:%?50?%}.report-title[data-v-5f3b90fa]{font-weight:700}.report-checker[data-v-5f3b90fa]{font-size:12px;color:#b3b3b3}.report-right[data-v-5f3b90fa]{-webkit-box-flex:1.5;-webkit-flex:1.5;-ms-flex:1.5;flex:1.5;padding:%?20?%;font-size:12px;color:red}.report-time[data-v-5f3b90fa]{width:100%;text-align:center;line-height:%?50?%}.report-type[data-v-5f3b90fa]{padding:%?10?%;text-align:center;line-height:%?20?%;background:red;border-radius:%?10?%;color:#fff}.report-content[data-v-5f3b90fa]{padding:%?20?%}.form-item[data-v-5f3b90fa]{width:96%;margin:auto}.file-title[data-v-5f3b90fa]{line-height:%?50?%;font-weight:700}.file-list[data-v-5f3b90fa]{padding:%?20?% 0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:100%;color:#b3b3b3;border-bottom:1px solid #e8e8e8}.file-list[data-v-5f3b90fa]:last-child{border:%?0?%}.file-name[data-v-5f3b90fa]{-webkit-box-flex:4;-webkit-flex:4;-ms-flex:4;flex:4;overflow:hidden}.file-size[data-v-5f3b90fa]{-webkit-box-flex:2;-webkit-flex:2;-ms-flex:2;flex:2;overflow:hidden;text-align:center}.file-del[data-v-5f3b90fa]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;text-align:center;text-align:center}",""])}}]);