(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index3-people-list"],{"1c1a":function(t,e,a){"use strict";var i=a("d101"),n=a.n(i);n.a},3695:function(t,e,a){"use strict";a.r(e);var i=a("ce05"),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);e["default"]=n.a},"404b":function(t,e,a){e=t.exports=a("2350")(!1),e.push([t.i,".search-content[data-v-391198b0]{height:%?100?%;width:100%;background:#f3f3f3;padding:%?20?%}.search-text[data-v-391198b0]{width:96%;height:%?60?%;border-radius:%?40?%;background:#fff;margin:auto;padding:0 %?20?%;font-size:14px}.search-list[data-v-391198b0]{width:100%;height:%?100?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;border-bottom:1px solid #e8e8e8}.search-list-item[data-v-391198b0]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;text-align:center;line-height:%?100?%}.dang-list[data-v-391198b0]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;border-bottom:1px solid #f0eded;padding:%?10?% 0}.dang-img[data-v-391198b0]{-webkit-box-flex:1.5;-webkit-flex:1.5;-ms-flex:1.5;flex:1.5;height:%?80?%}.dang-img uni-image[data-v-391198b0]{height:100%;width:%?80?%;margin:auto;border-radius:50%}.dang-info[data-v-391198b0]{-webkit-box-flex:8;-webkit-flex:8;-ms-flex:8;flex:8}.dang-name[data-v-391198b0]{font-weight:700;line-height:%?40?%}.dang-partno[data-v-391198b0]{color:#b3b3b3;line-height:%?40?%}.dang-check[data-v-391198b0]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.check-border[data-v-391198b0]{height:%?50?%;width:%?50?%;border-radius:100%;border:1px solid #e8e8e8;margin-top:%?20?%}.check-true[data-v-391198b0]{height:%?30?%;width:%?30?%;border-radius:100%;background:#e93a30;margin:%?8?% 0 0 %?8?%}.check-false[data-v-391198b0]{height:%?30?%;width:%?30?%;border-radius:100%;background:#f3f3f3;margin:%?8?% 0 0 %?8?%}",""])},4170:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"content"},[a("v-uni-view",{staticClass:"search-content"},[a("v-uni-input",{staticClass:"search-text",attrs:{placeholder:"搜索","confirm-type":"search"},on:{confirm:function(e){e=t.$handleEvent(e),t.search()}},model:{value:t.keywords,callback:function(e){t.keywords=e},expression:"keywords"}})],1),a("v-uni-view",{staticClass:"main-content"},[t.list?a("v-uni-view",t._l(t.list,function(e){return a("v-uni-view",{staticClass:"dang-list",on:{click:function(a){a=t.$handleEvent(a),t.checkboxChange(e.communist_no)}}},[a("v-uni-view",{staticClass:"dang-check"},[a("v-uni-view",{staticClass:"check-border"},[a("v-uni-view",{class:1==e.checked?"check-true":"check-false"})],1)],1),a("v-uni-view",{staticClass:"dang-img"},[a("v-uni-image",{attrs:{src:e.img,mode:""}})],1),a("v-uni-view",{staticClass:"dang-info"},[a("v-uni-view",{staticClass:"dang-name"},[t._v(t._s(e.communist_name))]),a("v-uni-view",{staticClass:"dang-partno"},[t._v(t._s(e.party_no))])],1)],1)}),1):a("v-uni-view",{staticClass:"no-data"},[a("v-uni-view",{staticClass:"no-data-icon icon iconfont"},[t._v(";")]),a("v-uni-view",{staticClass:"no-data-text"},[t._v("暂无数据")])],1)],1),a("v-uni-view",{staticClass:"footer"}),a("v-uni-view",{staticClass:"form-btn",on:{click:function(e){e=t.$handleEvent(e),t.peopleCheck()}}},[t._v("确定")])],1)},n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},"4f0b":function(t,e,a){"use strict";a.r(e);var i=a("4170"),n=a("3695");for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);a("1c1a");var o=a("2877"),l=Object(o["a"])(n["default"],i["a"],i["b"],!1,null,"391198b0",null);e["default"]=l.exports},ce05:function(t,e,a){"use strict";var i=a("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("28a5");var n=i(a("e836")),s={data:function(){return{img:[],list:[],pagemax:"",pagenow:0,shownumber:12,pagenumber:12,keywords:"",contentText:{contentdown:"查看更多",contentrefresh:"加载中",contentnomore:"没有更多"},status:"loading",shouLoading:!0,haveData:!1,selectPeople:[],key:"",content:""}},onLoad:function(t){var e=this;e.content=t.content,e.key=t.key,e.img[0]=e.sta.sitestatic+"img/dl-icon.png",e.getDangList()},onUnload:function(){this.max=0,this.data=[],this.loadMoreText="加载更多",this.showLoadMore=!1},onReachBottom:function(){var t=this;this.shownumber>=this.pagemax||setTimeout(function(){t.setDate()},100)},onPullDownRefresh:function(){this.initData()},methods:{peopleCheck:function(t){for(var e=this,a="",i="",s=0;s<e.selectPeople.length;s++)a=""==a?e.selectPeople[s].communist_name:a+","+e.selectPeople[s].communist_name,i=""==i?e.selectPeople[s].communist_no:i+","+e.selectPeople[s].communist_no;var o=[];o.push(i),o.push(a),n.default.fire(e.key,o),history.go(-1)},checkboxChange:function(t){for(var e=this,a=!1,i=0;i<e.list.length;i++)if(t==e.list[i]["communist_no"])if(e.list[i]["checked"]=1!=e.list[i]["checked"],e.selectPeople)for(var n=0;n<e.selectPeople.length;n++)t==e.selectPeople[n]["communist_no"]&&(e.selectPeople.splice(n,1),a=!0);else e.selectPeople=e.list[i];if(0==a)for(i=0;i<e.list.length;i++)t==e.list[i]["communist_no"]&&e.selectPeople.push(e.list[i])},search:function(){uni.showLoading();var t=this,e={party_no:t.globalData.userInfo.party_no,keywords:t.keywords,pagesize:999,page:0};t.urlRequest.urlRequest(t.func.getDangList,e,function(e){var a=t.dealData(e);t.list=a,uni.hideLoading()})},getDangList:function(){uni.showLoading();var t=this,e={party_no:t.globalData.userInfo.party_no,pagesize:t.shownumber,page:t.pagenow};t.urlRequest.urlRequest(t.func.getDangList,e,function(e){var a=t.dealData(e);t.list=a;for(var i=0;i<t.list.length;i++)if(t.content)for(var n=t.content.split(","),s=0;s<n.length;s++)t.list[i]["communist_no"]==n[s]&&(t.list[i]["checked"]=!0,t.selectPeople.push(t.list[i]));uni.hideLoading()})},initData:function(){uni.showLoading();var t=this;t.shownumber=12,t.pagenow=0;var e={party_no:t.globalData.userInfo.party_no,pagesize:t.shownumber,page:t.pagenow};t.urlRequest.urlRequest(t.func.getDangList,e,function(e){var a=t.dealData(e);t.list=a;for(var i=0;i<t.list.length;i++)if(t.content)for(var n=t.content.split(","),s=0;s<n.length;s++)t.list[i]["communist_no"]==n[s]&&(t.list[i]["checked"]=!0,t.selectPeople.push(t.list[i]));uni.hideLoading(),uni.stopPullDownRefresh()})},setDate:function(){uni.showLoading(),this.shownumber=this.pagenow*this.pagenumber,this.pagenow++;var t=this,e={party_no:t.globalData.userInfo.party_no,page:t.pagenow,pagesize:t.pagenumber};t.urlRequest.urlRequest(t.func.getDangList,e,function(e){if(e.data.list){setTimeout(function(){t.haveData=!0},100);var a=t.dealData(e);if(t.list=t.list.concat(a),t.content){t.selectPeople=[];for(var i=0;i<t.list.length;i++)for(var n=t.content.split(","),s=0;s<n.length;s++)t.list[i]["communist_no"]==n[s]&&(t.list[i]["checked"]=!0,t.selectPeople.push(t.list[i]))}}uni.hideLoading()})},dealData:function(t){var e=this;if(e.pagemax=t.data.count,t.data.list)for(var a=0;a<t.data.list.length;a++)if(t.data.list[a]["checked"]=!1,t.data.list[a]["communist_avatar"]?t.data.list[a]["img"]=e.sta.siteupload+t.data.list[a]["communist_avatar"]:t.data.list[a]["img"]=e.sta.sitestatic+"img/oa_img_head.png",e.content)for(var i=e.content.split(","),n=0;n<i.length;n++)t.data.list[a]["communist_no"]==i[n]&&(t.data.list[a]["checked"]=!0);return t.data.list}}};e.default=s},d101:function(t,e,a){var i=a("404b");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("784fe69e",i,!0,{sourceMap:!1,shadowMode:!1})}}]);