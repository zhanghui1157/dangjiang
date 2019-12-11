<template>
	<view class="content">
		<view class="section-list">
			<view class="section-title">
				<view class="line-img">
					<image :src="img[0]"></image>
				</view>
				<view class="section-title-text">党员信息</view>
			</view>
			<view class="section-content">
				<view class="list-title">
					<view>身份证</view>
					<view>电话</view>
					<view>邮箱</view>
					<view>毕业院校</view>
					<view>所学专业</view>
					<view>籍贯</view>
					<view>现住址</view>
				</view>
				<view class="list-content">
					<view>{{info.communist_idnumber}}</view>
					<view>{{info.communist_mobile}}</view>
					<view v-if="info.communist_email">{{info.communist_email}}</view>
					<view v-else>无</view>
					<view v-if="info.communist_school">{{info.communist_school}}</view>
					<view v-else>无</view>
					<view v-if="info.communist_specialty">{{info.communist_specialty}}</view>
					<view v-else>无</view>
					<view v-if="info.communist_paddress">{{info.communist_paddress}}</view>
					<view v-else>无</view>
					<view v-if="info.communist_address">{{info.communist_address}}</view>
					<view v-else>无</view>
				</view>
			</view>
		</view>
		<view class="section-list">
			<view class="section-title">
				<view class="line-img">
					<image :src="img[0]"></image>
				</view>
				<view class="section-title-text">党内信息</view>
			</view>
			<view class="section-content">
				<view class="list-title">
					<view>所属党组织</view>
					<view>党内职务</view>
					<view>入党时间</view>
				</view>
				<view class="list-content">
					<view>{{info.party_no}}</view>
					<view v-if="info.post_no">{{info.post_no}}</view>
					<view v-else>无</view>
					<view>{{info.communist_ccp_date}}</view>
				</view>
			</view>
		</view>
		<!-- <view class="section-list">
			<view class="section-title">
				<view class="line-img">
					<image :src="img[0]"></image>
				</view>
				<view class="section-title-text">党员发展历程</view>
			</view>
		</view> -->
		<button class="form-btn" @click="logout()">退出当前账号</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				info:[],
				img:[],
			}
		},
		onLoad() {
			var t=this;
			uni.showLoading();
			t.img[0]=t.sta.sitestatic+'img/dl-icon.png';
			//党组织详情
			t.urlRequest.urlRequest(t.func.getDangDetail,{communist_no:t.globalData.userInfo.communist_no},function(res){
				t.info=res.data.info;
				t.info['communist_avatar']=t.sta.siteroot+'/'+t.info['communist_avatar']
				uni.hideLoading();
			})
		},
		methods: {
			logout:function(){
				var t=this;
				uni.removeStorage({
				    key: 'user_info',
				    success: function (res) {
				        uni.showToast({
				        	title: '退出成功!',
				        	duration: 2000,
				        	icon:'none',
				        });
						setTimeout(function(){
							uni.navigateTo({
								url: "/pages/login/login"
							})
						},2000)
				    }
				});
			}
		}
	}
</script>
<style>
	.section-list{width: 96%;margin:10upx auto;border-radius: 10upx;background: #fff;}
	.section-title{height: 30upx;padding: 20upx;}
	.line-img{height: 30upx;width: 10upx;float: left;}
	.line-img image{height: 100%;width: 100%;}
	.section-title-text{height: 30upx;float: left;margin-left: 20upx;font-size: 14px;font-weight: bold;line-height: 30upx;color: rgba(252, 152, 118, 1);}
	.section-content{width:96%;display: flex;margin:20upx auto;}
	.list-title{flex: 2;}
	.list-title view{font-size: 14px;color: #000;line-height:60upx;}
	.list-content{flex: 6;}
	.list-content view{font-size: 14px;color: #AAA;line-height:60upx;}
</style>
