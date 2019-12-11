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
		<view class="list-item" @click="zhuanti()">
			<view class="list-title">专题学习</view>
			<view class="list-content">思想上树立无产阶级世界观、人生观、价值观，树立全心全意为人民服务的信念，不惜牺牲一切，为实现共产主义而奋斗终生</view>
		</view>
		<view class="list-item" @click="studyInfo()">
			<view class="list-title">在线党校</view>
			<view class="list-content">建设及管理学习服务互动等功能与一体的信息平台建设及管理学习服务互动等功能与一体的信息平台</view>
		</view>
		<view class="list-item" @click="testCenter()">
			<view class="list-title">考试中心</view>
			<view class="list-content">理论学习中心组学习以政治学习为根本，以深入学习中国特色社会主义理论体系为首要任务，以深入学习贯彻习近平总书记....</view>
		</view>
		<view class="list-item" @click="study_log()">
			<view class="list-title">学习笔记</view>
			<view class="list-content">建设及管理学习服务互动等功能与一体的信息平台建设及管理学习服务互动等功能与一体的信息平台</view>
		</view>
		<view class="footer"></view>
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
			}
		},
		onLoad() {
			var t=this;
			//获取banner
			t.urlRequest.urlRequest(t.func.getBannerImg,{location_code:4},function(res){
				for (var i = 0; i < res.data.ad_list.length; i++) {
					t.turn.push(t.sta.sitebase+res.data.ad_list[i]);
				}
			})	
		},
		
		methods: {
			zhuanti:function(){
				uni.navigateTo({
					url: "../zhuanti/index"
				})
			},
			studyInfo:function(){
				uni.navigateTo({
					url: "../index/study-info"
				})
			},
			testCenter:function(){
				uni.navigateTo({
					url: "../index/test-center"
				})
			},
			study_log:function(){
				uni.navigateTo({
					url: "study-log"
				})
			},
		}
	}
</script>
<style>
	page{background:#f3f3f3;}
	.swiper{height: 350upx;width: 100%;}
	.swiper-item {display: block;height: 350upx;line-height: 350upx;text-align: center;border-radius: 15upx;}
	.swiper-item img{height: 100%;width: 100%;}
	.list-item{height: 400upx;width: 46%;background: #fff;border-radius: 10upx;margin: 20upx 2%;float: left;box-shadow: 3px 3px 4px rgba(26, 26, 26, 0.2);}
	.list-title{width: 100%;background: linear-gradient(left,red, #ff6600);height: 100upx;text-align: center;line-height: 100upx;font-size: 14px;color: #fff;font-weight: bold;border-radius: 10upx 10upx 0 0;}
	.list-content{width: 92%;margin:10upx auto;font-size: 14px;line-height: 50upx;}
	.footer{clear: both;height: 60upx;}
</style>
