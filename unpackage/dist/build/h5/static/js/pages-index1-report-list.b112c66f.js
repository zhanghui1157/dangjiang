(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index1-report-list"],{"043f":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"search-content"},[i("v-uni-input",{staticClass:"search-text",attrs:{placeholder:"搜索","confirm-type":"search"},on:{confirm:function(e){e=t.$handleEvent(e),t.search()}},model:{value:t.keywords,callback:function(e){t.keywords=e},expression:"keywords"}})],1),t.list?i("v-uni-view",t._l(t.list,function(e){return i("v-uni-view",{staticClass:"list-item",on:{click:function(i){i=t.$handleEvent(i),t.goDetail(e.worklog_id)}}},[i("v-uni-view",{staticClass:"list-title"},[i("v-uni-view",{staticClass:"list-title-text"},[t._v(t._s(e.worklog_title))]),i("v-uni-view",{staticClass:"list-title-time"},[t._v(t._s(e.worklog_date))])],1),i("v-uni-view",{staticClass:"list-content"},[t._v(t._s(e.worklog_audit_content))]),i("v-uni-view",{staticClass:"list-bottom"},[i("v-uni-view",{staticClass:"list-checker"},[t._v("审核人: "+t._s(e.worklog_audit_man))]),i("v-uni-view",{staticClass:"list-type"},[t._v("类型："+t._s(e.worklog_type))])],1)],1)}),1):i("v-uni-view",{staticClass:"no-data"},[i("v-uni-view",{staticClass:"no-data-icon icon iconfont"},[t._v(";")]),i("v-uni-view",{staticClass:"no-data-text"},[t._v("暂无数据")])],1)],1)},o=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return o})},"41bb":function(t,e,i){var a=i("d5f1");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=i("4f06").default;o("321c3026",a,!0,{sourceMap:!1,shadowMode:!1})},"5d67":function(t,e,i){"use strict";var a=i("41bb"),o=i.n(a);o.a},"9e01":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{list:[],keywords:"",type:"",pagemax:"",pagenow:0,shownumber:10,contentText:{contentdown:"查看更多",contentrefresh:"加载中",contentnomore:"没有更多"},status:"loading",shouLoading:!0,haveData:!1}},onLoad:function(t){var e=this;e.getList()},onUnload:function(){this.max=0,this.data=[],this.loadMoreText="加载更多",this.showLoadMore=!1},onReachBottom:function(){var t=this;this.shownumber>=this.pagemax||setTimeout(function(){t.setDate()},100)},onPullDownRefresh:function(){this.initData()},methods:{goDetail:function(t){uni.navigateTo({url:"report-detail?id="+t})},search:function(){uni.showLoading();var t=this,e={communist_no:t.globalData.userInfo.communist_no,keywords:t.keywords,worklog_type:t.type};t.urlRequest.urlRequest(t.func.getWorkLogList,e,function(e){t.list=e.data.list,t.pagemax=e.data.count,uni.hideLoading()})},getList:function(){uni.showLoading();var t=this,e={communist_no:t.globalData.userInfo.communist_no,keywords:t.keywords,worklog_type:t.type};t.urlRequest.urlRequest(t.func.getWorkLogList,e,function(e){t.pagemax=e.data.count,t.list=e.data.list,uni.hideLoading()})},initData:function(){uni.showLoading();var t=this;t.pagenow=0;var e={communist_no:t.globalData.userInfo.communist_no,keywords:t.keywords,worklog_type:t.type};t.urlRequest.urlRequest(t.func.getWorkLogList,e,function(e){t.pagemax=e.data.count,t.list=e.data.list,uni.hideLoading(),uni.stopPullDownRefresh()})},setDate:function(){uni.showLoading(),this.shownumber=10*this.pagenow,this.pagenow++;var t=this,e={communist_no:t.globalData.userInfo.communist_no,keywords:t.keywords,worklog_type:t.type,page:t.pagenow};t.urlRequest.urlRequest(t.func.getWorkLogList,e,function(e){e.data.list&&(setTimeout(function(){t.haveData=!0},100),t.list=t.list.concat(e.data.list),t.pagemax=e.data.count),uni.hideLoading()})}}};e.default=a},a454:function(t,e,i){"use strict";i.r(e);var a=i("9e01"),o=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);e["default"]=o.a},b61d:function(t,e,i){"use strict";i.r(e);var a=i("043f"),o=i("a454");for(var n in o)"default"!==n&&function(t){i.d(e,t,function(){return o[t]})}(n);i("5d67");var s=i("2877"),l=Object(s["a"])(o["default"],a["a"],a["b"],!1,null,"6ea0cf09",null);e["default"]=l.exports},d5f1:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,"uni-page-body[data-v-6ea0cf09]{background:#f3f3f3}.search-content[data-v-6ea0cf09]{height:%?100?%;width:100%;background:#fff;padding:%?20?%}.search-text[data-v-6ea0cf09]{width:96%;height:%?60?%;border-radius:%?40?%;background:#f3f3f3;margin:auto;padding:0 %?20?%;font-size:14px}.list-item[data-v-6ea0cf09]{width:96%;margin:%?10?% auto;border-radius:%?10?%;padding:%?10?%;background:#fff}.list-title[data-v-6ea0cf09]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.list-title-text[data-v-6ea0cf09]{-webkit-box-flex:4;-webkit-flex:4;-ms-flex:4;flex:4;padding:%?10?% 0;font-weight:700}.list-title-time[data-v-6ea0cf09]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;font-size:12px;color:red;height:%?30?%;line-height:%?30?%;margin-top:%?10?%;text-align:center;overflow:hidden}.list-content[data-v-6ea0cf09]{width:100%;line-height:%?50?%;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap}.list-bottom[data-v-6ea0cf09]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.list-checker[data-v-6ea0cf09]{-webkit-box-flex:4;-webkit-flex:4;-ms-flex:4;flex:4;line-height:%?50?%;font-size:12px;color:#b3b3b3}.list-type[data-v-6ea0cf09]{-webkit-box-flex:2;-webkit-flex:2;-ms-flex:2;flex:2;line-height:%?30?%;padding:%?10?%;color:#b3b3b3;border-radius:%?10?%;font-size:12px;text-align:right}body.?%PAGE?%[data-v-6ea0cf09]{background:#f3f3f3}",""])}}]);