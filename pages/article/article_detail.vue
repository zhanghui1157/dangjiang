<template>
	<view class="content">
		<view class="article-head">
			<view class="article-title">{{detail.article_title}}</view>
			<view class="article-line">
				<image :src="img[0]" mode=""></image>
			</view>
			<view class="article-info">
				<view class="article-author">发布人：{{detail.add_communist}}</view>
				<view class="article-time">{{detail.add_time}}</view>
			</view>
		</view>
		<view class="middle-line"></view>
		<view class="article-digest" v-if="detail.article_description">
			<view class="digest-info">摘要：</view>
			<view class="digest-content">{{detail.article_description}}</view>
		</view>
		<view class="middle-line" v-if="detail.article_description"></view>
		<view class="article-content">
			<rich-text :nodes="detail.article_content"></rich-text>
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
			uni.showLoading();
			var article_id=e.id;
			t.img[0]=t.sta.sitestatic+'img/oa-bg.png';
			
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
	.article-head{width: 100%;}
	.article-title{width: 94%;margin:10upx auto;line-height: 50upx;font-size: 16px;font-weight: bold;color: #000000;text-align: center;}
	.article-line{width: 100%; }
	.article-line image{width: 100%;height: 30upx;}
	.article-info{width: 94%;margin: auto;display: flex;justify-content: space-between;}
	.article-info view{width: 50%;text-align: center;font-size: 12px;color: #B3B3B3;line-height:60upx;}
	.article-digest{width: 94%;margin:20upx auto;display: flex;}
	.digest-info{flex: 1.5;}
	.digest-content{flex: 8;}
	.article-content{width: 94%;margin:20upx auto}
</style>
