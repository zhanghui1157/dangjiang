<template>
	<view class="content">
		<view class="main-content">
			<view class="detail-title">{{detail.meeting_name}}</view>
			<view class="detail-line"></view>
			<view class="detail-other">
				<view class="detail-other-list">
					<view class="detail-other-title"> 主 持 人 ：</view>
					<view class="detail-other-content">{{detail.host_name}}</view>
				</view>
				<view class="detail-other-list">
					<view class="detail-other-title">会议类型：</view>
					<view class="detail-other-content">{{detail.meeting_type_name}}</view>
				</view>
				<view class="detail-other-list">
					<view class="detail-other-title">会议积分：</view>
					<view class="detail-other-content">{{detail.meeting_integral}}</view>
				</view>
				<view class="detail-other-list">
					<view class="detail-other-title">开始时间：</view>
					<view class="detail-other-content">{{detail.meeting_start_time}}</view>
				</view>
				<view class="detail-other-list">
					<view class="detail-other-title">结束时间：</view>
					<view class="detail-other-content">{{detail.meeting_end_time}}</view>
				</view>
				<view class="detail-other-list">
					<view class="detail-other-title">会议地点：</view>
					<view class="detail-other-content">{{detail.meeting_addr}}</view>
				</view>
				<view class="detail-other-list">
					<view class="detail-other-title">会议简介：</view>
					<view class="detail-other-content">{{detail.memo}}</view>
				</view>
			</view>
		</view>
		<view class="footer"></view>
		<view class="form-btn" @click="meetingSign()" v-if="detail.is_sign!=1 && detail.status==21">签到</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail:[],
				meeting_no:'',
				longitude:'',
				latitude:'',
				sign:false,
			}
		},
		onLoad(e) {
			var t=this;	
			t.meeting_no=e.id;
			
			//获取详情
			t.urlRequest.urlRequest(t.func.meetingSign,{meeting_no:t.meeting_no,communist_no:t.globalData.userInfo.communist_no},function(res){
				t.detail=res.data.meeting_info;
			})
			
			//获取当前的地理位置
			uni.getLocation({
			    type: 'wgs84',
			    success: function (res) {
			        t.longitude=res.longitude;
			        t.latitude=res.latitude;
			    },
				fail() {
				}
			});
		},
		methods: {
			meetingSign:function(){
				var t=this;
				var data={
					"communist_no":t.globalData.userInfo.communist_no,//党员编号
					"meeting_no": t.meeting_no,//会议编号
					"att_address":t.longitude+','+t.latitude//经纬度
				}
				t.urlRequest.urlRequest(t.func.setMeetingSign,data,function(res){
					uni.showToast({
						title: res.data.msg,
						duration: 2000,
						icon:'none', 
						success:function(){
							setTimeout(function(){
								uni.navigateTo({
									url: "../index/san-hui"
								})
							},2000)
						}
					});
				})
			}
		}
	}
</script>

<style>
	.detail-title{font-size: 14px;font-weight: bold;color: #000000;width: 100%;text-align: center;line-height: 80upx;}
	.detail-info{width: 100%;display: flex;justify-content: space-between;font-size: 12px;color: #B3B3B3;}
	.detail-info-item{flex: 1;text-align: center;line-height: 50upx;}
	.detail-line{height: 10upx;border-bottom: 1px solid #e8e8e8;}
	.detail-content{padding: 20upx 0;}
	.detail-other view{line-height: 50upx;margin-top: 10upx;}
	.detail-other-list{display: flex;}
	.detail-other-title{flex: 1.4;}
	.detail-other-content{flex: 4.5;}
</style>

