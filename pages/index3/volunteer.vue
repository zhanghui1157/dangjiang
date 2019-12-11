<template>
	<view class="content">
		<!-- <view class="" v-if="!check">
			<view class="tip-info">
				<view class="tip-icon icon iconfont">&#xe609;</view>
				<view class="tip-text">请先申请成为志愿者！</view>
			</view>
		</view> -->
		<view class="section-item">
			<view class="check-case">
				<view :class="!check.apply_status?'check-status now-status':'check-status'">
					<view>提交</view>
				</view>
				<view class="check-step icon iconfont">&#xe63e;</view>
				<view :class="check.apply_status==1?'check-status now-status':'check-status'">
					<view>待处理</view>
				</view>
				<view class="check-step icon iconfont">&#xe63e;</view>
				<view class="check-status" :class="check.apply_status==2?'check-status now-status':'check-status'">
					<view>通过</view>
				</view>
				<view class="check-step icon iconfont"> </view>
				<view :class="check.apply_status==3?'check-status now-status':'check-status'">
					<view>驳回</view>
				</view>
			</view>
		</view>
		<view style="height: 10upx;"></view>
		<view class="section-item">
			<view class="user-info">
				<view class="user-head">
					<image :src="info.communist_avatar" mode=""></image>
				</view>
				<view class="user-detail">
					<view class="user-name">{{info.communist_name}}</view>
					<view class="user-party">{{info.party_no}}</view>
				</view>
			</view>
		</view>
		<view style="height: 10upx;"></view>
		<view class="section-item">
			<textarea name="" placeholder="请填写您的申请事由" v-model="content"></textarea>
		</view>
		<view class="form-btn" @click="sub()" v-if="!check">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:[],
				content:'',
				check:'',
			};
		},
		onLoad() {
			var t=this;
			t.urlRequest.urlRequest(t.func.getDangDetail,{communist_no:t.globalData.userInfo.communist_no},function(res){
				t.info=res.data.info;
				t.info['communist_avatar']=t.sta.siteupload+'/'+t.info['communist_avatar']
			})
			t.urlRequest.urlRequest(t.func.getApplyVolunteerDetail,{communist_no:t.globalData.userInfo.communist_no},function(res){
				if(res.data.apply_status){
					t.check=res.data;
					t.content=t.check.volunteer_reason
				}
			})
		},
		methods: {
			sub:function(){
				var t=this;
				if(!t.content){
					uni.showToast({
						title: '请填写申请事由!',
						duration: 2000,
						icon:'none'
					});
					return false;
				}
				var data={
					communist_no:t.globalData.userInfo.communist_no,
					volunteer_reason:t.content,
				}
				t.urlRequest.urlRequest(t.func.setVolunteer,data,function(res){
					uni.showToast({
						title: res.data.msg,
						duration: 2000,
						icon:'none', 
						success:function(){
							setTimeout(function(){
								uni.switchTab({
									url: "index"
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
	page{background: #f3f3f3;}
	
	.tip-info{padding: 30upx 0;width: 100%;color: #c1a47b;}
	.tip-icon{width: 100%;text-align: center;font-size: 38px;color: #c1a47b;}
	.tip-text{width: 100%;text-align: center;}
	.section-item{width: 100%;background: #fff;padding: 10upx 0;}
	.check-case{width: 96%;margin:auto;display: flex;padding: 20upx 0;}
	.check-case view{flex: 1;}
	.check-status{height: 100upx;width: 100upx;border-radius: 100%;background: #f3f3f3;margin: auto;text-align: center;line-height: 100upx;}
	.check-step{line-height: 100upx;text-align: center;}
	.now-status{background: red;color:#fff;}
	.user-info{width: 96%;margin:auto;display: flex;padding: 20upx 0;}
	.user-head{flex: 2;height: 150upx;}
	.user-head image{height: 100%;width:100%}
	.user-detail{flex: 8;padding: 0 10upx;}
	.user-detail view{line-height: 50upx;}
	.user-name{width: 100%;font-weight: bold;}
	textarea{height: 200upx;width: 94%;margin: auto;padding: 10upx;border-radius: 10upx;border:1px solid #e8e8e8;font-size: 14px;}
	.add-btn{height: 80upx;width: 94%;margin: auto;text-align: center;line-height: 80upx;background: #e93a30;color: #fff;font-size: 14px;border-radius:15upx;margin: 100upx auto;}
</style>
