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
		<view class="middle-line"></view>
		<view class="middle-section">
			<navigator class="list-item" url="../index/diff-help">
				<view class="item-img icon iconfont">&#xe698;</view>
				<view class="item-text">困难帮扶</view>
			</navigator>
			<navigator class="list-item" url="../index1/survey">
				<view class="item-img icon iconfont">&#xe660;</view>
				<view class="item-text">调查问卷</view>
			</navigator>
			<navigator class="list-item" url="../index/volunteer">
				<view class="item-img icon iconfont">&#xe72e;</view>
				<view class="item-text">志愿者</view>
			</navigator>
		</view>
		<view class="middle-line"></view>
		<view class="section-list">
			<view class="section-title">
				<view class="line-img">
					<image :src="img[0]"></image>
				</view>
				<view class="section-title-text">为您推荐</view>
			</view>
			<view class="active-content">
				<view v-if="list">
					<view class="active-list" v-for="item in list" @click="volunteerDetail(item.activity_id)">
						<view class="active-list-title">{{item.activity_title}}</view>
						<view class="active-list-time">{{item.add_time}}</view>
					</view>
				</view>
				<view v-else class="no-data" style="padding-bottom: 50upx;">
					<view class="no-data-icon icon iconfont" style="margin-top: 20upx!important;">&#xe642;;</view>
					<view class="no-data-text">暂无活动记录</view>
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
				list:[],
				img:[],
			}
		},
		onLoad() {
			var t=this;	
			uni.showLoading();
			t.img[0]=t.sta.sitestatic+'img/dl-icon.png';
			//获取banner
			t.urlRequest.urlRequest(t.func.getBannerImg,{location_code:8},function(res){
				for (var i = 0; i < res.data.ad_list.length; i++) {
					t.turn.push(t.sta.sitebase+res.data.ad_list[i]);
				}
			})
			
			t.urlRequest.urlRequest(t.func.getVolunteerList,{communist_no:t.globalData.userInfo.communist_no},function(res){
				t.list=res.data.activity_list
			})
			
			uni.hideLoading();
		},
		methods: {
			volunteerDetail:function(id){
				uni.navigateTo({
					url: '../index/volunteer-detail?id='+id
				})
			}
		}
	}
</script>

<style>
	.middle-section{width: 100%;display: flex;}
	.list-item{flex: 1;padding: 20upx;}
	.item-img{width: 100%;font-size: 30px;text-align: center;color: #f37781;}
	.item-text{width: 100%;text-align: center;line-height: 40upx;}
	
	.section-list{width: 96%;margin:10upx auto;border-radius: 10upx;background: #fff;}
	.section-title{height: 30upx;padding: 20upx 20upx 40upx 20upx;clear: both;}
	.line-img{height: 30upx;width: 10upx;float: left;}
	.line-img image{height: 100%;width: 100%;}
	.section-title-text{height: 30upx;float: left;margin-left: 20upx;font-size: 14px;font-weight: bold;line-height: 30upx;color: rgba(252, 152, 118, 1);}
	.section-content{width: 100%;display: flex;justify-content: space-around;padding: 20upx 0;}
	
	.active-content{width: 100%;padding: 20upx 0;}
	.active-list{width: 100%;margin: 10upx 0;border-bottom: 1px solid #e8e8e8;}
	.active-list:last-child{border:0px;}
	.active-list-title{width: 100%;line-height:50upx;font-weight: bold;}
	.active-list-time{width: 100%;text-align: right;color: #B3B3B3;font-size: 12px;padding-bottom:10upx;}
</style>
