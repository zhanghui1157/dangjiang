(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index3-notice-people-list"],{"5d68":function(e,t,i){"use strict";i.r(t);var a=i("a287"),n=i("b0ac");for(var s in n)"default"!==s&&function(e){i.d(t,e,function(){return n[e]})}(s);i("720c");var l=i("2877"),o=Object(l["a"])(n["default"],a["a"],a["b"],!1,null,"1480019e",null);t["default"]=o.exports},"720c":function(e,t,i){"use strict";var a=i("ab26"),n=i.n(a);n.a},8335:function(e,t,i){t=e.exports=i("2350")(!1),t.push([e.i,".footer-item[data-v-1480019e]{width:100%;position:fixed;bottom:%?0?%;height:%?180?%;border-top:1px solid #e8e8e8}.select-btn[data-v-1480019e]{width:96%;height:%?80?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;background:#fff;margin:auto;padding:0 %?10?%}.select-txt[data-v-1480019e]{-webkit-box-flex:2;-webkit-flex:2;-ms-flex:2;flex:2;line-height:%?50?%;height:%?50?%;background:#f3f3f3;border-radius:%?25?%;margin-top:%?15?%;text-align:center}.select-num[data-v-1480019e]{-webkit-box-flex:7.5;-webkit-flex:7.5;-ms-flex:7.5;flex:7.5}.select-num uni-view[data-v-1480019e]{width:%?180?%;float:right;line-height:%?50?%;height:%?50?%;background:#f3f3f3;border-radius:%?25?%;margin-top:%?15?%;text-align:center}.sure-btn[data-v-1480019e]{width:100%;height:%?100?%;text-align:center;line-height:%?100?%;background:#ff3a41;border-radius:%?0?%;color:#fff;font-size:14px}.search-content[data-v-1480019e]{height:%?100?%;width:100%;background:#f3f3f3;padding:%?20?%}.search-text[data-v-1480019e]{width:96%;height:%?60?%;border-radius:%?40?%;background:#fff;margin:auto;padding:0 %?20?%;font-size:14px}.search-list[data-v-1480019e]{width:100%;height:%?100?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;border-bottom:1px solid #e8e8e8}.search-list-item[data-v-1480019e]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;text-align:center;line-height:%?100?%}.dang-list[data-v-1480019e]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;border-bottom:1px solid #f0eded;padding:%?10?% 0}.dang-list[data-v-1480019e]:last-child{border:%?0?%}.dang-img[data-v-1480019e]{-webkit-box-flex:1.5;-webkit-flex:1.5;-ms-flex:1.5;flex:1.5;height:%?80?%}.dang-img uni-image[data-v-1480019e]{height:100%;width:%?80?%;margin:auto;border-radius:50%}.dang-info[data-v-1480019e]{-webkit-box-flex:8;-webkit-flex:8;-ms-flex:8;flex:8}.dang-name[data-v-1480019e]{font-weight:700;line-height:%?40?%}.dang-partno[data-v-1480019e]{color:#b3b3b3;line-height:%?40?%}.dang-check[data-v-1480019e]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.check-border[data-v-1480019e]{height:%?50?%;width:%?50?%;border-radius:100%;border:1px solid #e8e8e8;margin-top:%?20?%}.check-true[data-v-1480019e]{height:%?30?%;width:%?30?%;border-radius:100%;background:#e93a30;margin:%?10?% 0 0 %?10?%}.check-false[data-v-1480019e]{height:%?30?%;width:%?30?%;border-radius:100%;background:#f3f3f3;margin:%?10?% 0 0 %?10?%}",""])},a287:function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"search-content"},[i("v-uni-input",{staticClass:"search-text",attrs:{placeholder:"搜索","confirm-type":"search"},on:{confirm:function(t){t=e.$handleEvent(t),e.search()}},model:{value:e.keywords,callback:function(t){e.keywords=t},expression:"keywords"}})],1),i("v-uni-view",{staticClass:"main-content"},[e.list?i("v-uni-view",e._l(e.list,function(t){return i("v-uni-view",{staticClass:"dang-list",on:{click:function(i){i=e.$handleEvent(i),e.checkboxChange(t.communist_no)}}},[i("v-uni-view",{staticClass:"dang-check"},[i("v-uni-view",{staticClass:"check-border"},[i("v-uni-view",{class:1==t.checked?"check-true":"check-false"})],1)],1),i("v-uni-view",{staticClass:"dang-img"},[i("v-uni-image",{attrs:{src:t.img,mode:""}})],1),i("v-uni-view",{staticClass:"dang-info"},[i("v-uni-view",{staticClass:"dang-name"},[e._v(e._s(t.communist_name))]),i("v-uni-view",{staticClass:"dang-partno"},[e._v(e._s(t.party_no))])],1)],1)}),1):i("v-uni-view",{staticClass:"no-data"},[i("v-uni-view",{staticClass:"no-data-icon icon iconfont"},[e._v(";")]),i("v-uni-view",{staticClass:"no-data-text"},[e._v("暂无数据")])],1)],1),i("v-uni-view",{staticClass:"footer"}),i("v-uni-view",{staticClass:"footer"}),i("v-uni-view",{staticClass:"footer-item"},[i("v-uni-view",{staticClass:"select-btn"},[i("v-uni-view",{staticClass:"dang-check"},[i("v-uni-view",{staticClass:"check-border"},[i("v-uni-view",{class:1==e.selectAll?"check-true":"check-false"})],1)],1),i("v-uni-view",{staticClass:"select-txt",on:{click:function(t){t=e.$handleEvent(t),e.selectAllPeople()}}},[e._v(e._s(1==e.selectAll?"取消全选":"全选"))]),i("v-uni-view",{staticClass:"select-num"},[i("v-uni-view",[e._v("已选中 "+e._s(e.selectNum)+" 人")])],1)],1),i("v-uni-view",{staticClass:"sure-btn",on:{click:function(t){t=e.$handleEvent(t),e.peopleCheck()}}},[e._v("确定")])],1)],1)},n=[];i.d(t,"a",function(){return a}),i.d(t,"b",function(){return n})},a46f:function(e,t,i){"use strict";var a=i("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i("28a5");var n=a(i("e836")),s={data:function(){return{img:[],list:[],pagemax:"",pagenow:0,shownumber:12,pagenumber:12,keywords:"",contentText:{contentdown:"查看更多",contentrefresh:"加载中",contentnomore:"没有更多"},status:"loading",shouLoading:!0,haveData:!1,selectPeople:[],key:"",content:"",selectAll:!1,selectNum:0}},onLoad:function(e){var t=this;t.content=e.people_list,t.img[0]=t.sta.sitestatic+"img/dl-icon.png",t.getDangList()},onUnload:function(){this.max=0,this.data=[],this.loadMoreText="加载更多",this.showLoadMore=!1},onReachBottom:function(){var e=this;this.shownumber>=this.pagemax||setTimeout(function(){e.setDate()},100)},onPullDownRefresh:function(){this.initData()},methods:{selectAllPeople:function(){var e=this;if(e.content=[],e.selectPeople=[],0==e.selectAll){e.selectAll=!0,e.selectNum=e.list.length;for(var t=0;t<e.list.length;t++)e.list[t]["checked"]=!0,e.selectPeople.push(e.list[t])}else{e.selectAll=!1,e.selectNum=0;for(t=0;t<e.list.length;t++)e.list[t]["checked"]=!1;e.selectPeople=[]}},peopleCheck:function(e){for(var t=this,i="",a="",s=0;s<t.selectPeople.length;s++)i=""==i?t.selectPeople[s].communist_name:i+","+t.selectPeople[s].communist_name,a=""==a?t.selectPeople[s].communist_no:a+","+t.selectPeople[s].communist_no;var l=[];l.push(a),l.push(i),l.push(t.selectPeople.length),n.default.fire("people_list",l),history.go(-1)},checkboxChange:function(e){for(var t=this,i=!1,a=0;a<t.list.length;a++)if(e==t.list[a]["communist_no"])if(t.list[a]["checked"]=1!=t.list[a]["checked"],t.selectPeople)for(var n=0;n<t.selectPeople.length;n++)e==t.selectPeople[n]["communist_no"]&&(t.selectPeople.splice(n,1),t.selectNum--,i=!0);else t.selectPeople=t.list[a],t.selectNum++;if(0==i)for(a=0;a<t.list.length;a++)e==t.list[a]["communist_no"]&&(t.selectPeople.push(t.list[a]),t.selectNum++)},search:function(){uni.showLoading();var e=this;e.selectAll=!1;var t={party_no:e.globalData.userInfo.party_no,keywords:e.keywords,pagesize:999,page:0};e.urlRequest.urlRequest(e.func.getDangList,t,function(t){var i=e.dealData(t);e.list=i,uni.hideLoading()})},getDangList:function(){uni.showLoading();var e=this,t={party_no:e.globalData.userInfo.party_no,pagesize:e.shownumber,page:e.pagenow};e.urlRequest.urlRequest(e.func.getDangList,t,function(t){var i=e.dealData(t);e.list=i;for(var a=0;a<e.list.length;a++)if(e.content)for(var n=e.content.split(","),s=0;s<n.length;s++)e.list[a]["communist_no"]==n[s]&&(e.list[a]["checked"]=!0,e.selectPeople.push(e.list[a]),e.selectNum++);uni.hideLoading()})},initData:function(){uni.showLoading();var e=this;e.shownumber=12,e.pagenow=0;var t={party_no:e.globalData.userInfo.party_no,pagesize:e.shownumber,page:e.pagenow};e.urlRequest.urlRequest(e.func.getDangList,t,function(t){var i=e.dealData(t);e.list=i;for(var a=0;a<e.list.length;a++)if(e.content)for(var n=e.content.split(","),s=0;s<n.length;s++)e.list[a]["communist_no"]==n[s]&&(e.list[a]["checked"]=!0,e.selectPeople.push(e.list[a]));uni.hideLoading(),uni.stopPullDownRefresh()})},setDate:function(){uni.showLoading(),this.shownumber=this.pagenow*this.pagenumber,this.pagenow++;var e=this,t={party_no:e.globalData.userInfo.party_no,page:e.pagenow,pagesize:e.pagenumber};e.urlRequest.urlRequest(e.func.getDangList,t,function(t){if(t.data.list){setTimeout(function(){e.haveData=!0},100);var i=e.dealData(t);if(e.selectAll=!1,e.list=e.list.concat(i),e.content){e.selectNum=0,e.selectPeople=[];for(var a=0;a<e.list.length;a++){e.list[a]["checked"]=!1;for(var n=e.content.split(","),s=0;s<n.length;s++)e.list[a]["communist_no"]==n[s]&&(e.list[a]["checked"]=!0,e.selectNum++,e.selectPeople.push(e.list[a]))}}}uni.hideLoading()})},dealData:function(e){var t=this;if(t.pagemax=e.data.count,e.data.list)for(var i=0;i<e.data.list.length;i++)if(e.data.list[i]["checked"]=!1,e.data.list[i]["communist_avatar"]?e.data.list[i]["img"]=t.sta.siteupload+e.data.list[i]["communist_avatar"]:e.data.list[i]["img"]=t.sta.sitestatic+"img/oa_img_head.png",t.content)for(var a=t.content.split(","),n=0;n<a.length;n++)e.data.list[i]["communist_no"]==a[n]&&(e.data.list[i]["checked"]=!0);return e.data.list}}};t.default=s},ab26:function(e,t,i){var a=i("8335");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("2b6f893e",a,!0,{sourceMap:!1,shadowMode:!1})},b0ac:function(e,t,i){"use strict";i.r(t);var a=i("a46f"),n=i.n(a);for(var s in a)"default"!==s&&function(e){i.d(t,e,function(){return a[e]})}(s);t["default"]=n.a}}]);