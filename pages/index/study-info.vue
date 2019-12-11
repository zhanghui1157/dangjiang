<template>
	<view class="content">
		<view class="section-title">
			<view class="line-img">
				<image src="../../static/img/dl-icon.png"></image>
			</view>
			<view class="section-title-text">视频列表</view>
			<navigator hover-class="none" class="news-more" url="/pages/article/material-video-list">
				<view class="news-more-text icon iconfont">更多 &#xe63e</view>
			</navigator>
		</view>
		
		<view class="video-section" @click="articleDetail(video_one[0].material_id)" v-if="video_one">
			<view class="head-video">
				<image :src="video_one[0]['material_thumb']" mode=""></image>
			</view>
			<view class="head-video-text">
				<view class="head-video-title">{{video_one[0]['material_title']}}</view>
				<view class="head-video-time">{{video_one[0]['add_time']}}</view>
			</view>
		</view>
		<view class="video-content">
			<view class="video-list" @click="articleDetail(item.material_id)" v-if="video_list" v-for="item in video_list">
				<view class="video-list-content">
					<image :src="item.material_thumb" mode=""></image>
				</view>
				<view class="video-info-detail">
					<view class="video-detail icon iconfont" v-if="item.read_num">&#xe66a {{item.read_num}} 次</view>
					<view class="video-detail icon iconfont" v-if="item.video_duration" style="padding:15upx 20upx;">&#xe605; {{item.video_duration}} m</view>
				</view>
				
				<view class="head-video-text list-text">
					<view class="head-video-title video-list-title" style="font-weight:100">{{item.material_title}}</view>
					<view class="head-video-time" style="text-align:left">{{item.add_time}}</view>
				</view>
			</view>
		</view>
		<view class="clear"></view>
		<view class="section-title">
			<view class="line-img">
				<image src="../../static/img/dl-icon.png"></image>
			</view>
			<view class="section-title-text">文章列表</view>
			<navigator hover-class="none" class="news-more" url="/pages/article/material-article-list">
				<view class="news-more-text icon iconfont">更多 &#xe63e</view>
			</navigator>
		</view>
		<view class="article-first" v-if="article_one" @click="articleDetail(article_one[0].material_id)">
			<view class="first-img">
				<image :src="article_one[0].material_thumb"></image>
			</view>
			<view class="first-content">{{article_one[0].material_title}}</view>
		</view>
		<view class="article-list">
			<view class="list-item" v-if="article_list" v-for="item in article_list" @click="articleDetail(item.material_id)">
			 	<view class="list-img">
					<image :src="item.material_thumb" mode=""></image>
				</view>
				<view class="list-title">{{item.material_title}}</view>
				<view class="list-time">{{item.add_time}}</view>
			</view>
		</view>
		<view class="footer"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				video_one:[],
				video_list:[],
				article_one:[],
				article_list:[],
				img:[],
			}
		},
		onLoad() {
			var t=this;	
			uni.showLoading();
			t.img[0]=t.sta.sitestatic+'img/dl-icon.png';
			t.img[1]=t.sta.sitestatic+'img/edu_play.png';
			
			//获取新闻列表
			t.urlRequest.urlRequest(t.func.getEdumaterialList,{video_num:5,article_num:7},function(res){
				for (var i = 0; i < res.data.video_list.length; i++) {
					res.data.video_list[i]['add_time']=res.data.video_list[i]['add_time'].substring(0,10)
					if(res.data.video_list[i]['material_thumb']!=null){
						res.data.video_list[i]['material_thumb']=t.sta.sitebase+res.data.video_list[i]['material_thumb'];
					}else{
						res.data.video_list[i]['material_thumb']='../../static/img/logo.jpg';
					}
					if(i==0){
						t.video_one.push(res.data.video_list[i]);
					}else{
						t.video_list.push(res.data.video_list[i]);
					}
				}
				for (var i = 0; i < res.data.article_list.length; i++) {
					res.data.article_list[i]['add_time']=res.data.article_list[i]['add_time'].substring(0,10)
					if(res.data.article_list[i]['material_thumb']!=null){
						res.data.article_list[i]['material_thumb']=t.sta.sitebase+res.data.article_list[i]['material_thumb'];
					}else{
						res.data.article_list[i]['material_thumb']='../../static/img/logo.jpg';
					}
					if(i==0){
						t.article_one.push(res.data.article_list[i]);
					}else{
						t.article_list.push(res.data.article_list[i]);
					}
				}
				uni.hideLoading();
			})
			
		},
		methods: {
			articleDetail:function(id){
				uni.navigateTo({
					url: '../article/edumaterial-detail?id='+id
				})
			},
		}
	}
</script>

<style>
	page{background:#f3f3f3;}
	.section-title{height: 50upx;padding: 20upx 0 60upx 20upx;}
	.line-img{height: 30upx;width: 10upx;float: left;margin-top: 10upx;}
	.line-img image{height: 100%;width: 100%;}
	.section-title-text{height: 50upx;float: left;margin-left: 20upx;font-size: 14px;font-weight: bold;line-height: 50upx;color: rgba(252, 152, 118, 1);}
	.news-more{width:20%;float: right;display: flex;justify-content: flex-end;color: #B3B3B3;line-height: 50upx;padding-right: 20upx;}
	.news-more-text{font-size: 12px;}
	.video-section{width: 93%;background: #fff;border-radius: 10upx;padding: 15upx;margin:auto;}
	.head-video{width: 100%;border-radius: 10upx;height: 300upx;}
	.head-video image{width: 100%;height: 100%;border-radius: 10upx;}
	.video-content{width: 97%;margin:10upx auto;}
	.video-list{width: 46%;margin: 10upx 2%;float: left;background: #fff;border-radius: 10upx;}
	.video-list-content{width: 90%;height: 200upx;margin:10upx 5%;border-radius: 10upx;}
	.video-list-content image{width: 100%;height: 100%;border-radius: 10upx;}
	.head-video-title{line-height: 50upx;height: 50upx;width: 100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
	
	.head-video-time{width: 100%;text-align: right;color: #B3B3B3;font-size: 10px;}
	.list-text{width:90%;padding:0 5% 20upx 5%;clear:both;}
	.video-info-detail{width: 100%;display: flex;justify-content: space-between;}
	.video-detail{flex: 5;text-align: right;font-size: 10px;color: #B3B3B3;float: left;height: 10upx;line-height: 15upx;padding: 0 20upx 10upx 0;}
	.article-first{width: 94%;height: 250upx;border-radius: 10upx;display: flex;background: #fff;margin: auto;}
	.first-img{flex: 4;padding: 10upx;}
	.first-img image{height: 100%;width: 100%;border-radius: 10upx;}
	.first-content{flex: 5;font-size: 14px;line-height: 50upx;padding: 0 10upx;}
	.article-list{width: 96%;margin:20upx auto;}
	.list-item{width: 31.3%;height: 210upx;margin:10upx 1%;background: #fff;border-radius: 10upx;float: left;}
	.list-img{height: 120upx;width: 90%;margin:10upx auto;}
	.list-img image{height: 100%;width: 100%;border-radius: 10upx;}
	.list-title{width: 90%;margin: auto;font-size: 12px;text-align: center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
	.list-time{width: 90%;text-align: right;font-size: 12upx;color: #B3B3B3;line-height: 20upx;padding: 10upx 0;}
	.list-icon{width: 90%;text-align: right;line-height: 30upx;font-size: 12px;color: #B3B3B3}
</style>
