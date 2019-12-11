<template>
	<view class="content">
		<view class="main-content">
			<view class="zhuanti-img">
				<image :src="zhuanti_img" mode=""></image>
			</view>
			<view class="section-title" v-if="video_head.material_id">
				<view class="line-img">
					<image :src="img[0]"></image>
				</view>
				<view class="section-title-text">专题视频</view>
				<view class="news-more" @click="videoList()">
					<view class="news-more-text icon iconfont">更多 &#xe63e</view>
				</view>
				
			</view>
			<view class="video-head" v-if="video_head.material_id"  @click="articleDetail(video_head.material_id)">
				<view class="video-head-img">
					<image :src="video_head.material_thumb" mode=""></image>
				</view>
				<view class="video-head-title">{{video_head.material_title}}</view>
				<view class="video-head-time">{{video_head.add_time}}</view>
			</view>
			<view class="video-content" >
				<view class="video-list" @click="articleDetail(item.material_id)" v-if="video_list" v-for="item in video_list">
					<view class="video-list-content">
						<image :src="item.material_thumb" mode=""></image>
					</view>
					<view class="video-info-detail">
						<view class="video-detail icon iconfont" v-if="item.read_num">&#xe66a {{item.read_num}} 次</view>
						<view class="video-detail icon iconfont" v-if="item.video_duration">&#xe605; {{item.video_duration}} m</view>
					</view>
					
					<view class="head-video-text list-text">
						<view class="head-video-title video-list-title">{{item.material_title}}</view>
						<view class="head-video-time" style="text-align:left">{{item.add_time}}</view>
					</view>
				</view>
			</view>
			<view class="section-title" v-if="article_head.material_id">
				<view class="line-img">
					<image :src="img[0]"></image>
				</view>
				<view class="section-title-text">专题课件</view>
				<view class="news-more" @click="articleList">
					<view class="news-more-text icon iconfont">更多 &#xe63e</view>
				</view>
			</view>
			<view class="video-head" v-if="article_head.material_id" @click="articleDetail(article_head.material_id)">
				<view class="video-head-img">
					<image :src="article_head.material_thumb" mode=""></image>
				</view>
				<view class="video-head-title">{{article_head.material_title}}</view>
				<view class="video-head-time">{{article_head.add_time}}</view>
			</view>
			<view class="video-content">
				<view class="video-list" @click="articleDetail(item.material_id)" v-if="article_list" v-for="item in video_list">
					<view class="video-list-content">
						<image :src="item.material_thumb" mode=""></image>
					</view>
					<view class="head-video-text list-text">
						<view class="head-video-title video-list-title">{{item.material_title}}</view>
						<view class="head-video-time" style="text-align:left">{{item.add_time}}</view>
					</view>
				</view>
			</view>
			<view class="section-title" v-if="notes_list!=''">
				<view class="line-img">
					<image :src="img[0]"></image>
				</view>
				<view class="section-title-text">学习实况</view>
				<view class="news-more" @click="notesList(topic_id)">
					<view class="news-more-text icon iconfont">更多 &#xe63e</view>
				</view>
			</view>
			<view class="notes-list" v-if="notes_list!=''">
				<view class="notes-list-item" v-for="item in notes_list" @click="notesDetail(item.notes_id)">
					<view class="notes-title">{{item.notes_title}}</view>
					<view class="notes-time">{{item.add_time}}</view>
				</view>
			</view>
		</view> 
		<view class="footer"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img:[],
				zhuanti_img:'',
				topic_id:'',
				video_list:[],
				video_head:[],
				article_list:[],
				article_head:[],
				notes_list:[],
			}
		},
		onLoad(e) {
			uni.showLoading();
			
			var t=this;
			t.img[0]=t.sta.sitestatic+'img/dl-icon.png';
			t.topic_id=e.id;
			t.urlRequest.urlRequest(t.func.zhuantiImg,{topic_id:t.topic_id},function(res){
				t.zhuanti_img=t.sta.sitebase+res.data.topic_list['topic_img'];
				uni.hideLoading();
			})
			var data={
				topic_id:t.topic_id,
				communist_no:t.globalData.userInfo.communist_no,//当前登录人编号
				video_num:5,//视频数量
				article_num:7,//文章数量
				notes_num:6,//学习课件数量
			}
			
			t.urlRequest.urlRequest(t.func.zhuantiContent,data,function(res){
				var video_list=res.data.video_list;
				var notes_list=res.data.notes_list;
				var article_list=res.data.article_list;
				for(var i=0;i<video_list.length;i++){
					video_list[i]['add_time']=video_list[i]['add_time'].substring(0,10)
					if(video_list[i]['material_thumb']!=null){
						video_list[i]['material_thumb']=t.sta.sitebase+video_list[i]['material_thumb'];
					}else{
						video_list[i]['material_thumb']='../../static/img/logo.jpg';
					}
					if(i==0){
						t.video_head=video_list[i];
					}else{
						t.video_list.push(video_list[i])
					}
				}
				
				for(var i=0;i<article_list.length;i++){
					article_list[i]['add_time']=article_list[i]['add_time'].substring(0,10)
					if(article_list[i]['material_thumb']!=null){
						article_list[i]['material_thumb']=t.sta.sitebase+article_list[i]['material_thumb'];
					}else{
						article_list[i]['material_thumb']='../../static/img/logo.jpg';
					}
					if(i==0){
						t.article_head=article_list[i];
					}else{
						t.article_list.push(article_list[i])
					}
				}
				for(var i=0;i<notes_list.length;i++){
					notes_list[i]['add_time']=notes_list[i]['add_time'].substring(0,10)
				}
				t.notes_list=notes_list;
				uni.hideLoading();
			})
			
		},
		methods: {
			articleDetail:function(id){
				uni.navigateTo({
					url: '../article/edumaterial-detail?id='+id
				})
			},
			notesDetail:function(id){
				uni.navigateTo({
					url: '../zhuanti/notes-detail?id='+id
				})
			},
			notesList:function(){
				var t=this;
				uni.navigateTo({
					url: '../zhuanti/notes-list?id='+t.topic_id
				})
			},
			articleList:function(){
				var t=this;
				uni.navigateTo({
					url: '../zhuanti/article-list?id='+t.topic_id
				})
			},
			videoList:function(){
				var t=this;
				uni.navigateTo({
					url: '../zhuanti/video-list?id='+t.topic_id
				})
			}
		}
	}
</script>

<style>
	page{background: #f3f3f3;}
	.zhuanti-img{width: 100%;height: 350upx;margin: 20upx 0;}
	.zhuanti-img image{height: 100%;width: 100%;border-radius: 10upx;}
	.section-title{height: 50upx;padding: 20upx 20upx 60upx 20upx;clear: both;}
	.line-img{height: 30upx;width: 10upx;float: left;margin-top: 10upx;}
	.line-img image{height: 100%;width: 100%;}
	.section-title-text{height: 50upx;float: left;margin-left: 20upx;font-size: 16px;font-weight: bold;line-height: 50upx;color: rgba(252, 152, 118, 1);}
	.news-more{width:20%;float: right;display: flex;justify-content: flex-end;color: #B3B3B3;line-height: 50upx;}
	.news-more-text{font-size: 12px;}
	.video-head{width: 98%;padding: 10upx;margin: auto;background: #fff;border-radius: 10upx;}
	.video-head-img{height: 200upx;width: 100%;border-radius: 10upx;}
	.video-head-img image{height: 100%;width: 100%;border-radius: 10upx;}
	.video-head-title{width: 100%;line-height: 50upx;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top: 10upx;}
	.video-head-time{font-size: 12px;width: 100%;text-align: right;line-height: 40upx;color:#B3B3B3;}
	
	.video-content{width: 100%;margin:10upx auto;}
	.video-list{width: 48%;margin: 10upx 1%;float: left;background: #fff;border-radius: 10upx;}
	.video-list-content{width: 90%;height: 180upx;margin:10upx 5%;border-radius: 10upx;}
	.video-list-content image{width: 100%;height: 100%;border-radius: 10upx;}
	.head-video-title{line-height: 50upx;height: 50upx;width: 100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
	.head-video-time{width: 100%;text-align: right;color: #B3B3B3;font-size: 10px;}
	.list-text{width:90%;padding:0 5% 20upx 5%;clear:both;}
	.video-info-detail{width: 100%;display: flex;justify-content: space-between;padding: 10upx 0;}
	.video-detail{flex: 5;text-align: right;font-size: 12px;color: #B3B3B3;float: left;height: 10upx;line-height: 15upx;padding:0 20upx 10upx 0;}
	.notes-list{width: 100%;background: #fff;border-radius: 10upx;}
	.notes-list-item{width: 96%;margin: auto;border-bottom: 1px solid #e8e8e8;}
	.notes-list-item:last-child{border: 0px;}
	.notes-title{line-height: 40upx;padding: 20upx 0;}
	.notes-time{font-size: 12px;width: 100%;text-align: right;line-height: 30upx;color:#B3B3B3;}
</style>
