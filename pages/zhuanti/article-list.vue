<template>
	<view class="content">
		<view class="main-content">
			<view v-if="list">
				<view class="video-content">
					<view class="video-list" @click="articleDetail(item.material_id)" v-for="item in list">
						<view class="video-list-content">
							<image :src="item.material_thumb" mode=""></image>
						</view>
						<view class="head-video-text list-text">
							<view class="head-video-title video-list-title">{{item.material_title}}</view>
							<view class="head-video-time" style="text-align:left">{{item.add_time}}</view>
						</view>
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
				list:[],
				topic_id:'',
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
			if(e.id){
				t.topic_id=e.id;
			}
			//获取新闻列表
			t.getList();
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
			notesDetail:function(id){
				uni.navigateTo({
					url: '../zhuanti/notes-detail?id='+id
				})
			},
			getList:function(){
				uni.showLoading();
				var t=this;
				var data={
					topic_id:t.topic_id,
					page:t.pagenow,
				}
				t.urlRequest.urlRequest(t.func.getArticleList,data,function(res){
					t.pagemax=res.data.count;
					
					for (var i = 0; i < res.data.list.length; i++) {
						if(res.data.list[i]['material_thumb']!=null){
							res.data.list[i]['material_thumb']=t.sta.sitebase+res.data.list[i]['material_thumb'];
						}else{
							res.data.list[i]['material_thumb']='../../static/img/logo.jpg';
						}
						res.data.list[i]['add_time']=res.data.list[i]['add_time'].substring(0,10)
						t.list.push(res.data.list[i]);
					}
					uni.hideLoading();
				})
				
			},
			initData(){
				uni.showLoading();
				const t = this;
				var data={
					topic_id:t.topic_id
				}
				t.urlRequest.urlRequest(t.func.getArticleList,data,function(res){
					t.pagemax=res.data.count;
					for (var i = 0; i < res.data.list.length; i++) {
						if(res.data.list[i]['material_thumb']!=null){
							res.data.list[i]['material_thumb']=t.sta.sitebase+res.data.list[i]['material_thumb'];
						}else{
							res.data.list[i]['material_thumb']='../../static/img/logo.jpg';
						}
						res.data.list[i]['add_time']=res.data.list[i]['add_time'].substring(0,10)
					}
					t.list=res.data.list;
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
					topic_id:t.topic_id,
					page:t.pagenow,
				}
				t.urlRequest.urlRequest(t.func.getArticleList,data,function(res){
					if(res.data.list){
						setTimeout(() => {
							t.haveData =true
						}, 100);
						for (var i = 0; i < res.data.list.length; i++) {
							if(res.data.list[i]['material_thumb']!=null){
								res.data.list[i]['material_thumb']=t.sta.sitebase+res.data.list[i]['material_thumb'];
							}else{
								res.data.list[i]['material_thumb']='../../static/img/logo.jpg';
							}
							res.data.list[i]['add_time']=res.data.list[i]['add_time'].substring(0,10)
						}
						t.list = t.list.concat(res.data.list);
						t.pagemax=res.data.count
					}
					uni.hideLoading();
				})
			}
		}
	}
</script>

<style>
	page{background: #f3f3f3;}
	.video-content{width: 100%;margin:10upx auto;}
	.video-list{width: 48%;margin: 10upx 1%;float: left;background: #fff;border-radius: 10upx;}
	.video-list-content{width: 90%;height: 180upx;margin:10upx 5%;border-radius: 10upx;}
	.video-list-content image{width: 100%;height: 100%;border-radius: 10upx;}
	.head-video-title{font-weight: bold;line-height: 50upx;height: 50upx;width: 100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
	.head-video-time{width: 100%;text-align: right;color: #B3B3B3;font-size: 10px;}
	.list-text{width:90%;padding:0 5% 20upx 5%;clear:both;}
	.video-info-detail{width: 100%;display: flex;justify-content: space-between;}
	.video-detail{flex: 5;text-align: center;font-size: 12px;color: #B3B3B3;float: left;height: 10upx;line-height: 15upx;}
</style>
