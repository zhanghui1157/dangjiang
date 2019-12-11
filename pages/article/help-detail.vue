<template>
	<view class="content">
		<view class="main-content">
			<view class="help-title">{{detail.article_title}}</view>
			<view class="help-time">{{detail.add_time}}</view>
			<view class="help-content">
				<rich-text :nodes="detail.article_content"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail:[],
			}
		},
		onLoad(e) {
			var t=this;	
			var article_id=e.id;
			uni.showLoading();
			//获取详情
			t.urlRequest.urlRequest(t.func.getArtDetail,{article_id:article_id},function(res){
				t.detail=res.data.article_info;
				var richtext=  t.detail.article_content;
				const regex = new RegExp('<img', 'gi');
				richtext= richtext.replace(regex, `<img style="max-width: 100%;"`);
				t.detail.article_content=richtext;
				uni.hideLoading();
			})
		},
		methods: {
			
		}
	}
</script>

<style>
	.help-title{font-size: 14px;font-weight: bold;text-align: center;line-height: 50upx;width: 100%;padding: 10upx 0;}
	.help-time{font-size: 12px;color: #B3B3B3;width: 100%;text-align: right;}
	.help-content{margin: 20upx 0;}
</style>
