<template>
	<view class="content">
		<view class="top-section">
			<view class="intergral-info">
				<view class="intergral-text">积分 </view>
				<view class="intergral-num">{{info.integral}}</view>
			</view>
			<view class="intergral-order">
				<view>党支部排名：{{info.party_ranking}}</view>
				<view>系统排名：{{info.ranking}}</view>
			</view>
		</view>
		<view class="intergral-data">
			<view class="intergral-title">
				<view>所参加活动</view>
				<view>时间</view>
				<view>所获得积分</view>
			</view>
			<view class="intergral-list">
				<view class="list-item" v-for="item in info.log_list">
					<view>{{item.log_name}}</view>
					<view>{{item.add_time}}</view>
					<view style="color:#ff6600">+{{item.change_integral}}</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:[],
			}
		},
		onLoad() {
			var t=this;
			uni.showLoading();
			//党组织详情
			t.urlRequest.urlRequest(t.func.getIntegralInfo,{communist_no:t.globalData.userInfo.communist_no},function(res){
				t.info=res.data.integral_info;
				uni.hideLoading();
			})
		},
		methods: {
			
		}
	}
</script>

<style>
	.top-section{width: 100;height: 380upx;background: linear-gradient(top, #ff6600,#ffcc99);margin-top: 2upx;z-index: 0;}
	.intergral-info{display: flex;height: 150upx;box-shadow: 0px 0px 2px #D9D9D9;color: #fff;}
	.intergral-text{flex: 5;text-align:right;line-height: 180upx;}
	.intergral-num{flex: 7;text-align:left;line-height: 160upx;font-size: 30px;font-weight: bold;}
	.intergral-order{display: flex;justify-content: center;}
	.intergral-order view{flex: 1;text-align: center;color: #fff;line-height: 100upx;}
	.intergral-data{width: 100%;border-radius: 90% 90% 0 0;margin-top: -120upx;z-index: 1;background: #fff;}
	.intergral-title{height: 120upx;width: 100%;display: flex;line-height: 170upx;border-bottom: 1px solid #e8e8e8;}
	.intergral-title view{flex: 1;text-align: center;}
	.intergral-list{width: 100%;}
	.list-item{width: 100%;display: flex;border-bottom: 1px solid #e8e8e8;}
	.list-item:last-child{border: 0px;}
	.intergral-list view{flex: 1;text-align: center;line-height: 60upx;color: #B3B3B3;font-size: 12px;}
</style>
