<template>
	<view class="content">
		<view class="new-content">
			<view v-if="article">
				<view class="news-list" v-for="item in article" @click="articleDetail(item.article_id)">
					<view class="news-item-img">
						<image :src="item.article_thumb"></image>
					</view>
					<view class="line-img news-line">
						<image :src="img[0]"></image>
					</view>
					<view class="news-item-content">
						<view class="news-item-content-title">{{item.article_title}}</view>
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
				pagemax:'',//总的数量
				pagenow:0,//当前的页数
				shownumber:10,//每页的分页条数
				
				contentText: {
					contentdown: "查看更多",
					contentrefresh: "加载中",
					contentnomore: "没有更多"
				},
				status:'loading',
				shouLoading:true,
				haveData:false,
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
		onUnload() {
			this.max = 0,
			this.data = [],
			this.loadMoreText = "加载更多",
			this.showLoadMore = false;
		},
		onReachBottom() {
			if (this.shownumber >= this.pagemax) {
				return;
			}
			setTimeout(() => {
				this.setDate();
			}, 100);
		},
		onPullDownRefresh() {
			this.initData();
		},	
		methods: {
			articleDetail:function(id){
				uni.navigateTo({
					url: '../article/article_detail?id='+id
				})
			},
			getArtList:function(){
				uni.showLoading();
				var t=this;
				var data={
					cat_id:t.cat_id
				}
				t.urlRequest.urlRequest(t.func.getArtList,data,function(res){
					t.pagemax=res.data.count;
					for (var i = 0; i < res.data.list.length; i++) {
						if(res.data.list[i]['article_thumb']!=null){
							res.data.list[i]['article_thumb']=t.sta.sitebase+res.data.list[i]['article_thumb'];
						}else{
							res.data.list[i]['article_thumb']='../../static/img/logo.jpg';
						}
						t.article.push(res.data.list[i]);
					}
					uni.hideLoading();
				})
			
			},
			initData(){
				uni.showLoading();
				const t = this;
				var data={
					cat_id:t.cat_id
				}
				t.urlRequest.urlRequest(t.func.getArtList,data,function(res){
					t.pagemax=res.data.count;
					for (var i = 0; i < res.data.list.length; i++) {
						if(res.data.list[i]['article_thumb']!=null){
							res.data.list[i]['article_thumb']=t.sta.sitebase+res.data.list[i]['article_thumb'];
						}else{
							res.data.list[i]['article_thumb']='../../static/img/logo.jpg';
						}
					}
					t.article=res.data.list;
					uni.hideLoading();
					uni.stopPullDownRefresh();
				})
			},
			setDate() {
				uni.showLoading();
				this.shownumber=this.pagenow*10;
				this.pagenow++;
				var t=this;
				
				var data={
					cat_id:t.cat_id,
					page:t.pagenow,
				}
				t.urlRequest.urlRequest(t.func.getArtList,data,function(res){
					if(res.data.list){
						setTimeout(() => {
							t.haveData =true
						}, 100);
						for (var i = 0; i < res.data.list.length; i++) {
							if(res.data.list[i]['article_thumb']!=null){
								res.data.list[i]['article_thumb']=t.sta.sitebase+res.data.list[i]['article_thumb'];
							}else{
								res.data.list[i]['article_thumb']='../../static/img/logo.jpg';
							}
						}
						t.article = t.article.concat(res.data.list);
						t.pagemax=res.data.count
					}
					uni.hideLoading();
				})
			},
			togglePopup(type) {
				this.type = type;
			},
		}
	}
</script>

<style>
	.new-content{width: 96%;margin:auto;}
	.news-list{width: 96%;height: 220upx;display: flex;margin:10upx auto;align-items: center;border-bottom: 1px solid #f7f7f7;}
	.news-list:last-child{border: 0;}
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
