<template>
	<view class="content">
		<view class="main-content">
			<view v-if="list">
				<view class="notes-list">
					<view class="notes-list-item" v-for="item in list" @click="notesDetail(item.notes_id)">
						<view class="notes-title">{{item.notes_title}}</view>
						<view class="notes-time">{{item.add_time}}</view>
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
		// onUnload() {
		// 	this.max = 0,
		// 	this.data = [],
		// 	this.loadMoreText = "加载更多",
		// 	this.showLoadMore = false;
		// },
		// onReachBottom() {
		// 	if (this.shownumber >= this.pagemax) {
		// 		return;
		// 	}
		// 	setTimeout(() => {
		// 		this.setDate();
		// 	}, 100);
		// },
		// onPullDownRefresh() {
		// 	this.initData();
		// },	
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
					communist_no:t.globalData.userInfo.communist_no,//当前登录人编号
					video_num:0,//视频数量
					article_num:0,//文章数量
					notes_num:1000,//学习课件数量
				}
				t.urlRequest.urlRequest(t.func.zhuantiContent,data,function(res){
					t.pagemax=res.data.count;
					if(res.data.notes_list){
						for (var i = 0; i < res.data.notes_list.length; i++) {
							res.data.notes_list[i]['add_time']=res.data.notes_list[i]['add_time'].substring(0,10)
							t.list.push(res.data.notes_list[i]);
						}
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
				t.urlRequest.urlRequest(t.func.getNotesList,data,function(res){
					t.pagemax=res.data.count;
					for (var i = 0; i < res.data.list.length; i++) {
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
				t.urlRequest.urlRequest(t.func.getNotesList,data,function(res){
					if(res.data.list){
						setTimeout(() => {
							t.haveData =true
						}, 100);
						for (var i = 0; i < res.data.list.length; i++) {
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
	.notes-list{width: 100%;background: #fff;border-radius: 10upx;}
	.notes-list-item{width: 96%;margin: auto;border-bottom: 1px solid #e8e8e8;}
	.notes-list-item:last-child{border: 0px;}
	.notes-title{line-height: 40upx;padding: 25upx 0;}
	.notes-time{font-size: 12px;width: 100%;text-align: right;line-height: 35upx;color:#B3B3B3;}
</style>
