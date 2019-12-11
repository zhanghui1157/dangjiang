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
		
		<view class="new-content">
			<view class="new-top">
				<view class="line-img news-title-line">
					<image :src="img[0]"></image>
				</view>
				<view class="news-title">扶贫活动动态</view>
				<view class="news-more" @click="helpList(17)">
					<view class="news-more-text icon iconfont">更多 &#xe63e</view>
				</view>
			</view>
			<view class="news-list" v-for="item in article" @click="helpDetail(item.article_id)">
				<view class="news-item-img">
					<image :src="item.article_thumb" style="border-radius: 0;"></image>
				</view>
				
				<view class="news-item-content">
					<view class="news-item-content-title" style="height: 130upx;">{{item.article_title}}</view>
					<view class="news-item-content-time">{{item.add_time}}</view>
				</view>
			</view>
			
		</view>
		<view class="new-content">
			<view class="new-top">
				<view class="line-img news-title-line">
					<image :src="img[0]"></image>
				</view>
				<view class="news-title">帮扶一对一</view>
				<view class="news-more" @click="helpOneList()">
					<view class="news-more-text icon iconfont">更多 &#xe63e</view>
				</view>
			</view>
			<view class="clear"></view>
			<view class="news-list" v-for="item in help_list" @click="helpOneDetail(item.help_id)">
				<view class="news-item-img" v-if="item.help_img">
					<image :src="item.help_img"></image>
				</view>
				
				<view class="news-item-content">
					<view class="news-item-content-title help-title">{{item.help_title}}</view>
					<view class="news-item-content-time help-time">{{item.add_time}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 4000,
				duration: 500,
				turn:[],
				img:[],
				article:[],
				help_list:[],
			}
		},
		onLoad() {
			var t=this;	
			uni.showLoading();
			t.img[0]=t.sta.sitestatic+'img/dl-icon.png';
			
			//获取banner
			t.urlRequest.urlRequest(t.func.getBannerImg,{location_code:6},function(res){
				for (var i = 0; i < res.data.ad_list.length; i++) {
					if(res.data.ad_list[i]){
						t.turn.push(t.sta.sitebase+res.data.ad_list[i]);
					}
				}
			})
			
			t.urlRequest.urlRequest(t.func.getHelpList,'',function(res){
				for (var i = 0; i < res.data.help_list.length; i++) {
					
					if(res.data.help_list[i]['help_img']!=null){
						console.log(res.data.help_list[i]['help_img'])
						res.data.help_list[i]['help_img']=t.sta.sitebase+res.data.help_list[i]['help_img'];
					}else{
						res.data.help_list[i]['help_img']='../../static/img/logo.jpg';
					}
					t.help_list.push(res.data.help_list[i]);
				}
				
			})
			t.urlRequest.urlRequest(t.func.getArtList,{cat_id:17},function(res){
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
		methods: {
			helpDetail:function(id){
				uni.navigateTo({
					url: '../article/help-detail?id='+id
				})
			},
			helpOneDetail:function(id){
				uni.navigateTo({
					url: '../article/help-one-detail?id='+id
				})
			},
			helpList:function(id){
				uni.navigateTo({
					url: '../article/help-list?cat_id='+id
				})
			},
			helpOneList:function(){
				uni.navigateTo({
					url: '../article/help-one-list'
				})
			}
		}
	}
</script>

<style>
	.swiper{height: 350upx;width: 100%;}
	.swiper-item {
		display: block;
		height: 350upx;
		line-height: 350upx;
		text-align: center;
		border-radius: 15upx;
	}
	.swiper-item img{height: 100%;width: 100%;}
	
	.news-list{width: 96%;display: flex;margin:10upx auto;align-items: center;border-bottom: 1px solid #f7f7f7;padding: 10upx 0;}
	.news-list:last-child{border:0px;}
	.news-item-img{flex: 4;height: 180upx;}
	.news-item-img image{width: 100%;height: 100%;border-radius: 10upx;}
	.line-img{height: 30upx;width: 10upx;float: left;}
	.line-img image{height: 100%;width: 100%;}
	.news-line{margin: 0 10upx;}
	.news-title-line{margin-top: 10upx;}
	.news-item-content{flex: 7;height: 180upx;padding-left:10upx;}
	.new-content{width: 96%;margin:20upx auto;}
	.news-item-content-title{width: 100%;font-size: 14px;color: #000000;overflow:hidden;text-overflow:ellipsis;line-height: 30upx;}
	.news-item-content-time{margin-top: 20upx;height: 30upx;text-align: right;width: 100%;color: #B3B3B3;font-size: 12px;}
	.new-top{width: 100%;height: 50upx;margin-bottom: 20upx;}
	.news-title{width: 50%;float: left;margin-left: 20upx;font-size: 14px;font-weight: bold;line-height: 50upx;color: rgba(254, 192, 115, 1);}
	.news-more{width:20%;float: right;display: flex;justify-content: flex-end;color: #B3B3B3;line-height: 50upx;}
	.news-more-text{font-size: 12px;}
	.help-title{max-height: 80upx;}
	.help-content{width: 98%;font-size: 12px;color: #B3B3B3;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height: 30upx;margin-top: 10upx;}
</style>
