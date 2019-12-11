<template>
	<view class="content">
		<view class="nav-list">
			<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
				<view v-for="(tab,index) in tabBars" class="uni-tab-item"  :data-current="index" @click="ontabtap(index,tab.status,tab.type)">
					<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
				</view>
			</scroll-view>
		</view>
		<view v-if="list">
			<view class="list-item" v-for="item in list" @click="goDetail(item.communist_no)">
				<view class="list-img">
					<image :src="item.communist_avatar" mode=""></image>
				</view>
				<view class="list-info">
					<view class="list-name">{{item.communist_name}}</view>
					<view class="list-identity">{{item.status_name}}</view>
				</view>
				<view class="list-detail icon iconfont">详情 &#xe63e;</view>
			</view>
		</view>
		<view v-else class="no-data">
			<view class="no-data-icon icon iconfont">&#xe642;;</view>
			<view class="no-data-text">暂无数据</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:'',
				scrollInto: "",
				tabIndex: 0,
				tabBars: [
					{
						name: '正式党员',
						status:21 ,
					},
					{
						name: '入党申请书',
						status:11 ,
					}, {
						name: '入党积极分子',
						status:13 ,
					}, {
						name: '党员发展对象',
						status:15 ,
					}, {
						name: '预备党员',
						status:17 ,
					}, {
						name: '考察未通过',
						status: 18,
					}
				],
			}
		},
		onLoad() {
			var t=this;	
			uni.showLoading();
			t.getDangList(t.tabBars[0]['status']);
			uni.hideLoading();
		},
		methods: {
			ontabtap(index,status,type) {
				var t=this;
				t.tabIndex = index;
			    t.getDangList(status,type);
			},
			getDangList:function(status,type){
				var t=this;
				uni.showLoading();
				var data={
					party_no:t.globalData.userInfo.party_no,
					status:status
				}
				t.urlRequest.urlRequest(t.func.developList,data,function(res){
					if(res.data.communist_list){
						for (var i = 0; i < res.data.communist_list.length; i++) {
							if(res.data.communist_list[i]['communist_avatar']){
								res.data.communist_list[i]['communist_avatar']=t.sta.siteupload+res.data.communist_list[i]['communist_avatar'];
							}else{
								res.data.communist_list[i]['communist_avatar']=t.sta.sitestatic+'img/oa_img_head.png';
							}
						}
						t.list=res.data.communist_list
					}else{
						t.list='';
					}
				})
				uni.hideLoading();
			},
			goDetail:function(id){
				uni.navigateTo({
					url: 'dang-log-detail?id='+id
				})
			},
		}
	}
</script>

<style>
	page{background: #f3f3f3;}
	.list-item{width: 94%;margin: 20upx auto;padding: 20upx 2%;border-radius: 10upx;display: flex;background: #fff;}
	.list-img{flex: 1.4;padding-right: 20upx;}
	.list-img image{height: 100%;width: 100%;}
	.list-info{flex: 6;}
	.list-name{width: 100%;line-height: 60upx;font-weight: bold;}
	.list-identity{width: 100%;color: red;line-height: 60upx;}
	.list-detail{flex: 1.5;color: #B3B3B3;line-height: 100upx;font-size: 12px;text-align: right;}
	
	.nav-list{width: 100%;background: #fff;}
	.scroll-h {
	    width: 750upx;
	    height: 80upx;
	    flex-direction: row;
	    /* #ifndef APP-PLUS */
	    white-space: nowrap;
	    /* #endif */
	    /* flex-wrap: nowrap; */
	    /* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
	}
	
	.line-h {
	    height: 1upx;
	    background-color: #cccccc;
	}
	
	.uni-tab-item {
	    /* #ifndef APP-PLUS */
	    display: inline-block;
	    /* #endif */
	    flex-wrap: nowrap;
	    padding-left: 34upx;
	    padding-right: 34upx;
	}
	
	.uni-tab-item-title {
	    color: #555;
	    font-size: 30upx;
	    height: 80upx;
	    line-height: 80upx;
	    flex-wrap: nowrap;
	    /* #ifndef APP-PLUS */
	    white-space: nowrap;
	    /* #endif */
	}
	
	.uni-tab-item-title-active {
	    color: #007AFF;
	}
	
	.swiper-box {
	    flex: 1;
	}
	
	.swiper-item {
	    flex: 1;
	    flex-direction: row;
	}
	
	.scroll-v {
	    flex: 1;
	    /* #ifndef MP-ALIPAY */
	    flex-direction: column;
	    /* #endif */
	    width: 750upx;
	}
	
	.update-tips {
	    position: absolute;
	    left: 0;
	    top: 41px;
	    right: 0;
	    padding-top: 5px;
	    padding-bottom: 5px;
	    background-color: #FDDD9B;
	    align-items: center;
	    justify-content: center;
	    text-align: center;
	}
	
	.update-tips-text {
	    font-size: 14px;
	    color: #ffffff;
	}
</style>
