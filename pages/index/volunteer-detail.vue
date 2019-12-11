<template>
	<view class="content">
		<view class="main-content">
			<view class="detail-title">{{detail.activity_title}}</view>
			<view class="detail-info">
				<view class="detail-info-item">活动发起人： {{detail.activity_organizer}}</view>
				<view class="detail-info-item">活动积分： {{detail.activity_integral}}</view>
				<view class="detail-info-item">活动状态： {{detail.status}}</view>
			</view>
			<view class="detail-line"></view>
			<view class="detail-other">
				<view>开始时间： {{detail.activity_starttime}}</view>
				<view>结束时间： {{detail.activity_endtime}}</view>
				<view>活动地点： {{detail.activity_address}}</view>
				<view>活动简介： {{detail.activity_description}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail:[],
				activity_id:'',
			}
		},
		onLoad(e) {
			var t=this;	
			t.activity_id=e.id;
			uni.showLoading();
			
			//列表
			t.urlRequest.urlRequest(t.func.getVolunteerDetail,{activity_id:t.activity_id,communist_no:t.globalData.userInfo.communist_no},function(res){
				var data=res.data.activity_info
				if(data.status==11){
					data.status="未审核";
				}else{
					data.status="已审核";
				}
				t.detail=data;
				uni.hideLoading();
			})
			
		},
		methods: {
			volunteerDetail:function(id){
				uni.navigateTo({
					url: '../index/volunteer-detail?id='+id
				})
			},
		}
	}
</script>

<style>
	.detail-title{font-size: 14px;font-weight: bold;color: #000000;width: 100%;text-align: center;line-height: 80upx;}
	.detail-info{width: 100%;display: flex;justify-content: space-between;font-size: 12px;color: #B3B3B3;}
	.detail-info-item{flex: 1;text-align: center;line-height: 50upx;}
	.detail-line{height: 10upx;border-bottom: 1px solid #e8e8e8;}
	.detail-content{padding: 20upx 0;}
	.detail-other view{line-height: 50upx;}
</style>
