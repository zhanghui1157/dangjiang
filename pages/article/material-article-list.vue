<template>
	<view class="content">
		<view class="new-content">
			<view v-if="article">
				<view class="news-list" v-for="item in article" @click="articleDetail(item.material_id)">
					<view class="news-item-img">
						<image :src="item.material_thumb"></image>
					</view>
					<view class="line-img news-line">
						<image :src="img[0]"></image>
					</view>
					<view class="news-item-content">
						<view class="news-item-content-title">{{item.material_title}}</view>
						<view class="news-item-content-time">{{item.add_time}}</view>
					</view>
				</view>
			</view>
			<view v-else class="no-data">
				<view class="no-data-icon icon iconfont">&#xe642;;</view>
				<view class="no-data-text">暂无数据</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img:[],
				article:[],
				cat_id:'',
			}
		},
		onLoad(e) {
			var t=this;	
			if(e.cat_id){
				t.cat_id=e.cat_id;
			}
			t.img[0]=t.sta.sitestatic+'img/dl-icon.png';
			//获取新闻列表
			t.getArtList();
		},
		methods: {
			articleDetail:function(id){
				uni.navigateTo({
					url: '../article/edumaterial-detail?id='+id
				})
			},
			getArtList:function(){
				uni.showLoading();
				var t=this;
				var data={
					cat_id:t.cat_id
				}
				t.urlRequest.urlRequest(t.func.getEdumaterialList,{video_num:0,article_num:1000},function(res){
					console.log(res.data)
					for (var i = 0; i < res.data.article_list.length; i++) {
						res.data.article_list[i]['add_time']=res.data.article_list[i]['add_time'].substring(0,10)
						if(res.data.article_list[i]['material_thumb']!=null){
							res.data.article_list[i]['material_thumb']=t.sta.sitebase+res.data.article_list[i]['material_thumb'];
						}else{
							res.data.article_list[i]['material_thumb']='../../static/img/logo.jpg';
						}
						t.article.push(res.data.article_list[i]);
					}
					uni.hideLoading();
				})
			
			},
			
		}
	}
</script>

<style>
	.new-content{width: 96%;margin:auto;}
	.news-list{width: 100%;height: 220upx;display: flex;margin:10upx auto;align-items: center;}
	.news-item-img{flex: 4;height: 180upx;}
	.news-item-img image{width: 100%;height: 100%;border-radius: 10upx;}
	.line-img{height: 30upx;width: 10upx;float: left;}
	.line-img image{height: 100%;width: 100%;}
	.news-line{margin: 0 10upx;}
	.news-title-line{margin-top: 10upx;}
	.news-item-content{flex: 7;height: 180upx;}
	.new-content{width: 96%;margin:20upx auto;}
	.news-item-content-title{height: 130upx;width: 100%;font-size: 14px;color: #000000;overflow:hidden;text-overflow:ellipsis;line-height: 45upx;}
	.news-item-content-time{margin-top: 30upx;height: 30upx;display: flex;align-items: flex-end;color: #B3B3B3;}
</style>
