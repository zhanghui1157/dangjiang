(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-volunteer-detail"],{"0d05":function(t,i,e){"use strict";var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"main-content"},[e("v-uni-view",{staticClass:"detail-title"},[t._v(t._s(t.detail.activity_title))]),e("v-uni-view",{staticClass:"detail-info"},[e("v-uni-view",{staticClass:"detail-info-item"},[t._v("活动发起人： "+t._s(t.detail.activity_organizer))]),e("v-uni-view",{staticClass:"detail-info-item"},[t._v("活动积分： "+t._s(t.detail.activity_integral))]),e("v-uni-view",{staticClass:"detail-info-item"},[t._v("活动状态： "+t._s(t.detail.status))])],1),e("v-uni-view",{staticClass:"detail-line"}),e("v-uni-view",{staticClass:"detail-other"},[e("v-uni-view",[t._v("开始时间： "+t._s(t.detail.activity_starttime))]),e("v-uni-view",[t._v("结束时间： "+t._s(t.detail.activity_endtime))]),e("v-uni-view",[t._v("活动地点： "+t._s(t.detail.activity_address))]),e("v-uni-view",[t._v("活动简介： "+t._s(t.detail.activity_description))])],1)],1)],1)},n=[];e.d(i,"a",function(){return a}),e.d(i,"b",function(){return n})},"753f":function(t,i,e){"use strict";e.r(i);var a=e("0d05"),n=e("f058");for(var s in n)"default"!==s&&function(t){e.d(i,t,function(){return n[t]})}(s);e("8f20");var l=e("2877"),o=Object(l["a"])(n["default"],a["a"],a["b"],!1,null,"39f3a105",null);i["default"]=o.exports},8678:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a={data:function(){return{detail:[],activity_id:""}},onLoad:function(t){var i=this;i.activity_id=t.id,uni.showLoading(),i.urlRequest.urlRequest(i.func.getVolunteerDetail,{activity_id:i.activity_id,communist_no:i.globalData.userInfo.communist_no},function(t){var e=t.data.activity_info;11==e.status?e.status="未审核":e.status="已审核",i.detail=e,uni.hideLoading()})},methods:{volunteerDetail:function(t){uni.navigateTo({url:"../index/volunteer-detail?id="+t})}}};i.default=a},"8b1f":function(t,i,e){var a=e("bffb");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=e("4f06").default;n("8bc9b6ea",a,!0,{sourceMap:!1,shadowMode:!1})},"8f20":function(t,i,e){"use strict";var a=e("8b1f"),n=e.n(a);n.a},bffb:function(t,i,e){i=t.exports=e("2350")(!1),i.push([t.i,".detail-title[data-v-39f3a105]{font-size:14px;font-weight:700;color:#000;width:100%;text-align:center;line-height:%?80?%}.detail-info[data-v-39f3a105]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;font-size:12px;color:#b3b3b3}.detail-info-item[data-v-39f3a105]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;text-align:center;line-height:%?50?%}.detail-line[data-v-39f3a105]{height:%?10?%;border-bottom:1px solid #e8e8e8}.detail-content[data-v-39f3a105]{padding:%?20?% 0}.detail-other uni-view[data-v-39f3a105]{line-height:%?50?%}",""])},f058:function(t,i,e){"use strict";e.r(i);var a=e("8678"),n=e.n(a);for(var s in a)"default"!==s&&function(t){e.d(i,t,function(){return a[t]})}(s);i["default"]=n.a}}]);