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
		<view v-if="exam_list">
			<view class="test-list" v-for="item in exam_list">
				<view class="test-title">{{item.exam_title}}</view>
				<view class="test-info">
					<view class="test-point">积分：{{item.exam_integral}}</view>
					<view class="test-time">考试时长：{{item.exam_time}}分钟</view>
					<view class="test-end">截止日期：{{item.exam_date}}</view>
				</view>
				<view class="test-btn" @click="startTest(item.exam_id)">开始考试</view>
				<view class="clear"></view>
			</view>
		</view>
		<view v-else class="no-data">
			<view class="no-data-icon icon iconfont">&#xe642;;</view>
			<view class="no-data-text">暂无数据</view>
		</view>
		<view class="footer"></view>
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
				exam_list:[],
			}
		},
		onLoad() {
			uni.showLoading();
			var t=this;
			//获取banner
			t.urlRequest.urlRequest(t.func.getBannerImg,{location_code:4},function(res){
				for (var i = 0; i < res.data.ad_list.length; i++) {
					t.turn.push(t.sta.sitebase+res.data.ad_list[i]);
				}
			})
			
			//考试列表
			var data={
				is_exam:1,
				communist_no:t.globalData.userInfo.communist_no,
			}
			t.urlRequest.urlRequest(t.func.examList,data,function(res){
				t.exam_list=res.data.exam_list;
			})
			uni.hideLoading();
		},
		methods: {
			startTest:function(id){
				uni.navigateTo({
					url: 'test-info?id='+id
				})
			}
		}
	}
</script>

<style>
	page{background:#f3f3f3;}
	.section-list{width: 96%;margin: auto;border-radius: 10upx;background: #fff;}
	.line-img{height: 30upx;width: 10upx;float: left;}
	.line-img image{height: 100%;width: 100%;}
	.section-title-text{width: 50%;float: left;margin-left: 20upx;font-size: 14px;font-weight: bold;line-height: 50upx;color: rgba(254, 192, 115, 1);}
	.head-img{width: 100%;}
	.head-img image{width: 100%;height: 350upx;}
	.test-list{width: 94%;background: #fff;border-radius: 10upx;padding: 15upx;margin:20upx auto;}
	.test-range,.test-point,.test-time,.test-end{font-size: 14px;line-height: 40upx;}
	.test-title{width: 100%;font-size: 14px;font-weight: bold;line-height: 50upx;}
	.test-info{width: 60%;float: left;}
	.test-btn{width:25%;float: right;border-radius: 25upx;height: 50upx;text-align: center;line-height: 50upx;background: rgb(255,58,65);color:#fff;margin-top: 40upx;}
</style>
