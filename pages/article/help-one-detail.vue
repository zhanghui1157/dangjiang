<template>
	<view class="content">
		<view class="help-title">
			<view class="help-list">
				<view class="help-img">
					<image :src="img[0]" mode=""></image>
				</view>
				<view class="help-people">{{detail.communist_no}}</view>
				<view class="help-source">帮扶人</view>
			</view>
			<view class="help-arrow">
				<view class="help-img">
					<image :src="img[1]" mode=""></image>
				</view>
			</view>
			<view class="help-list">
				<view class="help-img">
					<image :src="img[0]" mode=""></image>
				</view>
				<view class="help-people">{{detail.help_name}}</view>
				<view class="help-source">被帮扶人</view>
			</view>
		</view>
		<view class="help-line"></view>
		<view class="help-info">
			<view class="help-head">{{detail.help_title}}</view>
			<view class="help-time">{{detail.add_time}}</view>
			<view class="help-content">
				<rich-text :nodes="detail.help_content"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img:[],
				detail:[],
			}
		},
		onLoad(e) {
			var t=this;	
			var help_id=e.id;
			uni.showLoading();
			t.img[0]=t.sta.sitestatic+'img/hr_bfpeople.png';
			t.img[1]=t.sta.sitestatic+'img/hr_lianjie.png';
			t.urlRequest.urlRequest(t.func.getHelpOneDetail,{help_id:help_id},function(res){
				t.detail=res.data.help_info;
				uni.hideLoading();
			})
			
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
			}
		}
	}
</script>

<style>
	.help-title{width: 80%;padding: 10upx 0;margin:20upx auto;display: flex;justify-content: space-between;}
	.help-list{flex: 4;}
	.help-arrow{flex: 3;}
	.help-img{height: 80upx;width: 80upx;margin: auto;}
	.help-img image{height: 100%;width: 100%;}
	.help-people{width: 100%;text-align: center;line-height:50upx;}
	.help-source{width: 100%;text-align: center;color: #e93a30;line-height:40upx;}
	.help-line{width: 100%;border-bottom: 1px solid #e8e8e8;}
	.help-info{width: 94%;margin: 30upx auto;}
	.help-head{font-size: 14px;font-weight: bold;text-align: center;line-height: 50upx;}
	.help-time{font-size: 12px;color: #B3B3B3;width: 100%;text-align: right;line-height: 50upx;}
</style>
