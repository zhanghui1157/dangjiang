(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index1-zhibu-work-plan"],{7253:function(t,i,e){i=t.exports=e("2350")(!1),i.push([t.i,".search-content[data-v-5cd63991]{height:%?100?%;width:100%;background:#f3f3f3;padding:%?20?%}.search-text[data-v-5cd63991]{width:96%;height:%?60?%;border-radius:%?40?%;background:#fff;margin:auto;padding:0 %?20?%;font-size:14px}.nav-list[data-v-5cd63991]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:%?70?%;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;border-bottom:1px solid #e8e8e8}.nav-item[data-v-5cd63991]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.nav-text[data-v-5cd63991]{width:100%;height:%?60?%;text-align:center;line-height:%?70?%}.nav-line[data-v-5cd63991]{width:40%;margin:auto;border-top:1px solid #e93a30}.list-item[data-v-5cd63991]{width:96%;margin:%?20?% auto;padding:%?10?% 2%;background:#fff;border-bottom:1px solid #e8e8e8}.last-item[data-v-5cd63991]:last-child{border-bottom:0}.list-title[data-v-5cd63991]{font-size:14px;font-weight:700;width:100%;line-height:%?40?%;padding-bottom:%?20?%}.list-content[data-v-5cd63991]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.list-detail[data-v-5cd63991]{-webkit-box-flex:5;-webkit-flex:5;-ms-flex:5;flex:5}.list-detail uni-view[data-v-5cd63991]{height:%?40?%;line-height:%?40?%}.check-status[data-v-5cd63991]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;line-height:%?80?%}.list-status[data-v-5cd63991]{width:100%;height:%?80?%}.status-content[data-v-5cd63991]{height:%?40?%;line-height:%?35?%;padding:0 %?15?%;border-radius:%?15?%;text-align:center;float:right;margin:%?20?% 0 %?20?% %?20?%;border:1px solid #ddd}.list-now[data-v-5cd63991]{color:#fec073}",""])},"97f8":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a={data:function(){return{list:[],keywords:"",nav_0:!0,nav_1:!1,type:2}},onLoad:function(t){var i=this;i.getOamissiveList()},methods:{planDetail:function(t){uni.navigateTo({url:"zhibu-work-plan-detail?id="+t})},search:function(){uni.showLoading();var t=this,i={communist_no:t.globalData.userInfo.communist_no,keywords:t.keywords,type:t.type};t.urlRequest.urlRequest(t.func.oaWorkPlanList,i,function(i){t.list=i.data.workplan_list,uni.hideLoading()})},getOamissiveList:function(){uni.showLoading();var t=this,i={communist_no:t.globalData.userInfo.communist_no,keywords:t.keywords,type:t.type};t.urlRequest.urlRequest(t.func.oaWorkPlanList,i,function(i){t.list=i.data.workplan_list,uni.hideLoading()})},navChange:function(t){var i=this;0==t?(i.nav_0=!0,i.nav_1=!1,i.type=2,i.getOamissiveList()):(i.nav_1=!0,i.nav_0=!1,i.type=1,i.getOamissiveList())}}};i.default=a},"98bf":function(t,i,e){"use strict";e.r(i);var a=e("97f8"),n=e.n(a);for(var s in a)"default"!==s&&function(t){e.d(i,t,function(){return a[t]})}(s);i["default"]=n.a},b0e5:function(t,i,e){var a=e("7253");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=e("4f06").default;n("0921d15a",a,!0,{sourceMap:!1,shadowMode:!1})},c472:function(t,i,e){"use strict";var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"search-content"},[e("v-uni-input",{staticClass:"search-text",attrs:{placeholder:"搜索","confirm-type":"search"},on:{confirm:function(i){i=t.$handleEvent(i),t.search()}},model:{value:t.keywords,callback:function(i){t.keywords=i},expression:"keywords"}})],1),e("v-uni-view",{staticClass:"nav-list"},[e("v-uni-view",{staticClass:"nav-item",on:{click:function(i){i=t.$handleEvent(i),t.navChange(0)}}},[e("v-uni-view",{staticClass:"nav-text"},[t._v("我的工作计划")]),1==t.nav_0?e("v-uni-view",{staticClass:"nav-line"}):t._e()],1),e("v-uni-view",{staticClass:"nav-item",on:{click:function(i){i=t.$handleEvent(i),t.navChange(1)}}},[e("v-uni-view",{staticClass:"nav-text"},[t._v("我安排的工作")]),1==t.nav_1?e("v-uni-view",{staticClass:"nav-line"}):t._e()],1)],1),t.list?e("v-uni-view",[2==t.type?e("v-uni-view",t._l(t.list,function(i){return e("v-uni-view",{staticClass:"list-item",on:{click:function(e){e=t.$handleEvent(e),t.planDetail(i.workplan_id)}}},[e("v-uni-view",{staticClass:"list-title"},[t._v(t._s(i.workplan_title))]),e("v-uni-view",{staticClass:"list-content"},[e("v-uni-view",{staticClass:"list-detail"},[e("v-uni-view",{staticClass:"list-time"},[t._v("执行时间："+t._s(i.workplan_expectstart_time)+"~"+t._s(i.workplan_expectend_time))]),e("v-uni-view",{staticClass:"list-checker"},[t._v("执行人："+t._s(i.workplan_executor_man))])],1)],1)],1)}),1):e("v-uni-view",t._l(t.list,function(i){return e("v-uni-view",{staticClass:"list-item",on:{click:function(e){e=t.$handleEvent(e),t.planDetail(i.workplan_id)}}},[e("v-uni-view",{staticClass:"list-title"},[t._v(t._s(i.workplan_title))]),e("v-uni-view",{staticClass:"list-content"},[e("v-uni-view",{staticClass:"list-detail"},[e("v-uni-view",{staticClass:"list-time"},[t._v("执行时间："+t._s(i.workplan_expectstart_time)+" ~ "+t._s(i.workplan_expectend_time))]),e("v-uni-view",{staticClass:"list-checker"},[t._v("审核人："+t._s(i.workplan_executor_man))])],1),e("v-uni-view",{staticClass:"check-status"},[t._v(t._s(i.status_txt))])],1)],1)}),1)],1):e("v-uni-view",{staticClass:"no-data"},[e("v-uni-view",{staticClass:"no-data-icon icon iconfont"},[t._v(";")]),e("v-uni-view",{staticClass:"no-data-text"},[t._v("暂无数据")])],1)],1)},n=[];e.d(i,"a",function(){return a}),e.d(i,"b",function(){return n})},cc3c:function(t,i,e){"use strict";e.r(i);var a=e("c472"),n=e("98bf");for(var s in n)"default"!==s&&function(t){e.d(i,t,function(){return n[t]})}(s);e("d4ce");var l=e("2877"),o=Object(l["a"])(n["default"],a["a"],a["b"],!1,null,"5cd63991",null);i["default"]=o.exports},d4ce:function(t,i,e){"use strict";var a=e("b0e5"),n=e.n(a);n.a}}]);