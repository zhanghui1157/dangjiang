<template>
	<view class="content">
		<view class="main-content" v-if="detail.material_vedio">
			<view class="video-play">
				<video class="video-list-content" :src="detail.material_vedio" @error="videoErrorCallback" enable-danmu danmu-btn controls></video>
			</view>
		</view>
		<view class="middle-line" v-if="detail.material_vedio"></view>
		<view class="main-content">
			<view class="video-title">
				<view class="video-title-text">{{detail.material_title}}</view>
				<view class="article-line">
					<image :src="img[0]" mode=""></image>
				</view>
				<view class="video-title-detail">
					<view class="video-title-author">发布人：{{detail.add_communist}}</view>
					<view class="video-title-time">{{detail.add_time}}</view>
				</view>
			</view>
		</view>
		<view class="middle-line"></view>
		<view class="main-content" v-if='detail.memo'>
			<view class="video-content">
				<view class="video-content-title">摘要：</view>
				<view class="video-content-detail">{{detail.memo}}</view>
			</view>
		</view>
		<view class="middle-line" v-if='detail.memo'></view>
		<view class="main-content" v-if="detail.material_content" style="padding: 10upx 0;">
			<rich-text :nodes="detail.material_content"></rich-text>
		</view>
		<view class="middle-line" v-if="detail.material_content"></view>
		<view class="main-content" >
			<view class="video-talk">
				<textarea placeholder="请输入您的学习笔记" v-model="content"></textarea>
				<view class="add-btn"  @click="setNotes()">保存</view>
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
				content:'',
			}
		},
		onLoad(e) {
			var t=this;	
			uni.showLoading();
			var material_id=e.id;
			t.img[0]=t.sta.sitestatic+'img/oa-bg.png';
			
			//获取详情
			t.urlRequest.urlRequest(t.func.getEdumaterialDetail,{material_id:material_id,communist_no:t.globalData.userInfo.communist_no},function(res){
				if(res.data.material_info.material_vedio){
					res.data.material_info.material_vedio=t.sta.siteupload+res.data.material_info.material_vedio
				}
				t.detail=res.data.material_info;
				uni.hideLoading();
				var richtext=  t.detail.material_content;
				if(richtext){
					const regex = new RegExp('<img', 'gi');
					richtext= richtext.replace(regex, `<img style="max-width: 100%;"`);
					t.detail.material_content=richtext;
					
				}
			})
		},
		methods: {
			setNotes:function(){
				var t=this;
				if(!t.content){
					uni.showToast({
						title: '学习笔记不能为空!',
						duration: 2000,
						icon:'none'
					});
					return false;
				}
				var data={
					communist_no:t.globalData.userInfo.communist_no,
					material_id:t.detail.material_id,//文章id或视频id
					notes_content:t.content,//笔记内容
					notes_type:1,//笔记类型
					notes_title:t.detail.material_title+"学习笔记",
				}
				t.urlRequest.urlRequest(t.func.setNotes,data,function(res){
					uni.showToast({
						title: res.data.msg,
						duration: 2000,
						icon:'none', 
						success:function(){
							setTimeout(function(){
								uni.navigateTo({
									url: "../index/study-info"
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
	page{background: #fff;}
	.video-play{height: 300upx;width: 100%;margin: 20upx 0;}
	.article-line{width: 100%; }
	.article-line image{width: 100%;height: 30upx;}
	video{width: 100%;height: 100%;}
	.video-title-text{width: 100%;line-height: 40upx;padding:20upx 0;font-weight: bold;font-size: 14px;color: #000000;text-align: center;}
	.video-title-detail{font-size: 12px;color: #B3B3B3;display: flex;justify-content: space-between;height: 60upx;line-height: 40upx;}
	.video-title-author{text-align:left;}
	.video-title-time{text-align:right;}
	.video-content{display: flex;}
	.video-content-title{line-height: 50upx;color: #A1A1A1;flex: 1;}
	.video-content-detail{line-height: 50upx;color: rgba(254, 192, 115, 1);flex:8;}
	.video-talk{width: 100%;margin: 10upx 0;}
	textarea{width: 100%;border: 1px solid #EAEAEA;border-radius: 10upx;padding: 5upx 2%;font-size: 12px;}
	.add-btn{height: 80upx;width: 100%;text-align: center;line-height: 80upx;background: #e93a30;color: #fff;font-size: 16px;border-radius:15upx;margin: 20upx auto;}
</style>
