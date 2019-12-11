<template>
	<view class="content">
		<view class="page-section swiper">
			<view class="page-section-spacing">
				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="item in turn">
						<view class="swiper-item uni-bg-red" ><img :src="item"></view>
					</swiper-item>
				</swiper>
			</view> 
		</view> 
		<view class="middle-btn">
			<view class="btn-item" @click="netDangjian()">
				<view class="item-img"><image :src="img[0]"></image></view>
				<view class="item-text">网上党支部</view>
			</view>
			<view class="btn-item" @click="diffHelp()">
				<view class="item-img"><image :src="img[1]"></image></view>
				<view class="item-text">困难帮扶</view>
			</view>
			<view class="btn-item" @click="volunteer()">
				<view class="item-img"><image :src="img[2]"></image></view>
				<view class="item-text">志愿服务</view>
			</view>
			<view class="btn-item" @click="forum()">
				<view class="item-img"><image :src="img[3]"></image></view>
				<view class="item-text">先锋论坛</view>
			</view>
		</view>
		<view class="middle-btn">
			<view class="btn-item" @click="testCenter()">
				<view class="item-img"><image :src="img[4]"></image></view>
				<view class="item-text">考试中心</view>
			</view>
			<view class="btn-item" @click="studyInfo()">
				<view class="item-img"><image :src="img[5]"></image></view>
				<view class="item-text">学习资料库</view>
			</view>
			<view class="btn-item" @click="sanHui()">
				<view class="item-img"><image :src="img[6]"></image></view>
				<view class="item-text">三会一课</view>
			</view>
			<view class="btn-item" @click="missive()">
				<view class="item-img"><image :src="img[7]"></image></view>
				<view class="item-text">公文收发</view>
			</view>
		</view>
		
		<view class="new-content">
			<view class="new-top">
				<view class="line-img news-title-line">
					<image src="../../static/img/dl-icon.png"></image>
				</view>
				<view class="news-title">新闻动态</view>
				<view class="news-more" @click="articleList()">
					<view class="news-more-text icon iconfont">更多 &#xe63e;</view>
				</view>
			</view>
			<view class="middle-line" style="height: 1px;border-bottom: 1px solid #f7f7f7;"></view>
			<view class="news-list" v-for="item in article" @click="articleDetail(item.article_id)">
				<view class="news-item-img">
					<image :src="item.article_thumb"></image>
				</view>
				<view class="line-img news-line">
					<image :src="img[8]"></image>
				</view>
				<view class="news-item-content">
					<view class="news-item-content-title">{{item.article_title}}</view>
					<view class="news-item-content-time">{{item.add_time}}</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
		    return {
		      title: '共享党建',
		      path: '/pages/index/index'
		    }
		},
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 4000,
				duration: 500,
				turn:[],
				img:[],
				article:[],
			}
		},
		onLoad() {
			var t=this;	
			uni.showLoading();
			t.img[0]=t.sta.sitestatic+'img/work.png';
			t.img[1]=t.sta.sitestatic+'img/integral.png';
			t.img[2]=t.sta.sitestatic+'img/party.png';
			t.img[3]=t.sta.sitestatic+'img/learning.png';
			t.img[4]=t.sta.sitestatic+'img/exam.png';
			t.img[5]=t.sta.sitestatic+'img/document.png';
			t.img[6]=t.sta.sitestatic+'img/three.png';
			t.img[7]=t.sta.sitestatic+'img/receive.png';
			t.img[8]=t.sta.sitestatic+'img/dl-icon.png';

			//获取banner
			t.urlRequest.urlRequest(t.func.getBannerImg,{location_code:3},function(res){
				for (var i = 0; i < res.data.ad_list.length; i++) {
					t.turn.push(t.sta.sitebase+res.data.ad_list[i]);
				}
			})
			
			//获取新闻列表
			t.urlRequest.urlRequest(t.func.getArtList,{cat_id:30},function(res){
				for (var i = 0; i < res.data.list.length; i++) {
					if(res.data.list[i]['article_thumb']!=null){
						res.data.list[i]['article_thumb']=t.sta.sitebase+res.data.list[i]['article_thumb'];
					}else{
						res.data.list[i]['article_thumb']='../../static/img/logo.jpg';
					}
					t.article.push(res.data.list[i]);
				}
			})
			uni.hideLoading();
		},
		onPullDownRefresh() {
			var t=this;
			t.turn=[];
			t.list=[];
			uni.showLoading();
			t.img[0]=t.sta.sitestatic+'img/work.png';
			t.img[1]=t.sta.sitestatic+'img/integral.png';
			t.img[2]=t.sta.sitestatic+'img/party.png';
			t.img[3]=t.sta.sitestatic+'img/learning.png';
			t.img[4]=t.sta.sitestatic+'img/exam.png';
			t.img[5]=t.sta.sitestatic+'img/document.png';
			t.img[6]=t.sta.sitestatic+'img/three.png';
			t.img[7]=t.sta.sitestatic+'img/receive.png';
			t.img[8]=t.sta.sitestatic+'img/dl-icon.png';
			
			//获取banner
			t.urlRequest.urlRequest(t.func.getBannerImg,{location_code:3},function(res){
				for (var i = 0; i < res.data.ad_list.length; i++) {
					t.turn.push(t.sta.sitebase+res.data.ad_list[i]);
				}
			})
			
			//获取新闻列表
			t.urlRequest.urlRequest(t.func.getArtList,{cat_id:30},function(res){
				for (var i = 0; i < res.data.list.length; i++) {
					if(res.data.list[i]['article_thumb']!=null){
						res.data.list[i]['article_thumb']=t.sta.sitebase+res.data.list[i]['article_thumb'];
					}else{
						res.data.list[i]['article_thumb']='../../static/img/logo.jpg';
					}
					t.article.push(res.data.list[i]);
				}
			})
			uni.hideLoading();
			uni.stopPullDownRefresh();
			uni.hideLoading();
			
		},	
		methods: {
			missive:function(){
				uni.navigateTo({
					url: '/pages/index/missive'
				})
			},
			forum:function(){
				uni.navigateTo({
					url: '/pages/index/forum'
				})
			},
			diffHelp:function(){
				uni.navigateTo({
					url: '/pages/index/diff-help'
				})
			},
			netDangjian:function(){
				uni.navigateTo({
					url: '/pages/index/net-dang'
				})
			},
			volunteer:function(){
				uni.navigateTo({
					url: '/pages/index/volunteer'
				})
			},
			testCenter:function(){
				uni.navigateTo({
					url: "/pages/index/test-center"
				})
			},
			studyInfo:function(){
				uni.navigateTo({
					url: "/pages/index/study-info"
				})
			},
			sanHui:function(){
				uni.navigateTo({
					url: "/pages/index/san-hui"
				})
			},
			articleDetail:function(id){
				uni.navigateTo({
					url: '../article/article_detail?id='+id
				})
			},
			articleList:function(){
				uni.navigateTo({
					url: '../article/article-list?cat_id=30'
				})
			},
			doDocument:function(){
				uni.navigateTo({
					url: "/pages/index/document"
				})
			}
		}
	}
</script>
<style>
	.news-list{width: 100%;height: 220upx;display: flex;margin:10upx auto;align-items: center;border-bottom: 1px solid #f7f7f7;}
	.news-item-img{flex: 4;height: 180upx;}
	.news-item-img image{width: 100%;height: 100%;border-radius: 10upx;}
	.line-img{height: 30upx;width: 10upx;float: left;}
	.line-img image{height: 100%;width: 100%;}
	.news-line{margin: 0 10upx;}
	.news-title-line{margin-top: 10upx;}
	.news-item-content{flex: 7;height: 180upx;}
	.new-content{width: 92%;margin:20upx auto;}
	.news-item-content-title{height: 130upx;width: 100%;font-size: 14px;color: #000000;overflow:hidden;text-overflow:ellipsis;line-height: 45upx;}
	.news-item-content-time{margin-top: 30upx;height: 30upx;display: flex;align-items: flex-end;color: #B3B3B3;}
	.new-top{width: 100%;height: 50upx;margin-bottom: 20upx;}
	
	.news-title{width: 50%;float: left;margin-left: 20upx;font-size: 14px;font-weight: bold;line-height: 50upx;color: rgba(254, 192, 115, 1);}
	.news-more{width:20%;float: right;display: flex;justify-content: flex-end;color: #B3B3B3;line-height: 50upx;}
	.news-more-text{font-size: 12px;}
	
	.middle-btn{width:96%;margin:auto;height: 180upx;display: flex;justify-content: space-between;align-items: center;}
	.btn-item{flex: 2;height:120;}
	.item-img{height: 100upx;width: 100upx;margin: auto;}
	.item-img image{width: 100%;height: 100%;}
	.item-text{width: 100%;text-align: center;}
</style>
