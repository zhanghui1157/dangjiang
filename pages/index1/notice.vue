<template>
	<view class="content">
		<view class="search-content">
			<input class="search-text" placeholder="搜索" v-model="keywords" confirm-type="search" @confirm="search()"/>
		</view>
		<view v-if="list">
			<view class="list-item" v-for="item in list" >
				<view class="list-title" @click="goDetail(item.notice_id)">
					<view class="list-title-text">{{item.notice_title}}</view>
					<view class="list-title-time">{{item.add_time}}</view>
				</view>
				<view class="list-content" @click="goDetail(item.notice_id)">{{item.worklog_audit_content}}</view>
				<view class="list-bottom">
					<view class="list-checker">发布人: {{item.add_communist}}</view>
					<view class="list-type" v-if="item.is_read==true">状 态: 已读</view>
					<view class="list-status" v-else @click="readNotice(item.notice_id)" style="color: red;">未读</view>
				</view>
				
			</view>
		</view>
		<view v-else class="no-data">
			<view class="no-data-icon icon iconfont">&#xe642;;</view>
			<view class="no-data-text">暂无数据</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				keywords:'',
				type:'',
				
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
			readNotice:function(id){
				var t=this;
				t.urlRequest.urlRequest(t.func.getNoticeInfo,{notice_id:id,communist_no:t.globalData.userInfo.communist_no},function(res){
					if(res.data.status==1){
						uni.showToast({
							title: '标记已读成功!',
							duration: 2000,
							icon:'none',
							success:function(){
								setTimeout(function(){
									t.getList();
								},2000)
							}
						});
					}
				})
			},
			goDetail:function(id){
				uni.navigateTo({
					url: 'notice-detail?id='+id
				})
			},
			search:function(){
				uni.showLoading();
				var t=this;
				var data={
					communist_no:t.globalData.userInfo.communist_no,
					keywords:t.keywords,
					worklog_type:t.type,
				}
				t.urlRequest.urlRequest(t.func.getNoticeList,data,function(res){
					t.list=res.data.list;
					t.pagemax=res.data.count;
					uni.hideLoading();
				})
			},
			getList:function(){
				uni.showLoading();
				var t=this;
				var data={
					communist_no:t.globalData.userInfo.communist_no,
					keywords:t.keywords,
				}
				t.urlRequest.urlRequest(t.func.getNoticeList,data,function(res){
					t.pagemax=res.data.count;
					t.list=res.data.list;
					uni.hideLoading();
				})
			},
			initData(){
				uni.showLoading();
				const t = this;
				t.pagenow=0;
				var data={
					communist_no:t.globalData.userInfo.communist_no,
					keywords:t.keywords,
				}
				t.urlRequest.urlRequest(t.func.getNoticeList,data,function(res){
					t.pagemax=res.data.count;
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
					communist_no:t.globalData.userInfo.communist_no,
					keywords:t.keywords,
					page:t.pagenow,
				}
				t.urlRequest.urlRequest(t.func.getNoticeList,data,function(res){
					if(res.data.list){
						setTimeout(() => {
							t.haveData =true
						}, 100);
						
						t.list = t.list.concat(res.data.list);
						t.pagemax=res.data.count
					}
					uni.hideLoading();
				})
			},
		}
	}
</script>

<style>
	page{background: #f3f3f3;}
	.search-content{height: 100upx;width: 100%;background: #fff;padding: 20upx;}
	.search-text{width: 96%;height: 60upx;border-radius: 40upx;background: #f3f3f3;margin: auto;padding:0 20upx;font-size: 14px;}
	
	.list-item{width:96%;margin: 10upx auto;border-radius: 10upx;padding: 10upx;background: #fff;}
	.list-title{width: 100%;display: flex;}
	.list-title-text{flex: 4;padding: 10upx;}
	.list-title-time{flex: 1;font-size: 12px;color: red;border-radius: 10upx;height: 30upx;line-height: 30upx;margin-top: 10upx;text-align: center;overflow: hidden;}
	.list-content{width: 100%;line-height: 50upx;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
	.list-bottom{display: flex;}
	.list-checker{flex:4;line-height: 50upx;font-size: 12px;color:#B3B3B3;}
	.list-type{flex:1;line-height: 30upx;padding: 10upx;color:#B3B3B3;border-radius: 10upx;font-size: 12px;text-align: center;}
	.list-status{flex:1;border: 1px solid #e8e8e8;border-radius: 15upx;font-size: 12px;height: 40upx;text-align: center;line-height: 35upx;margin: auto;}
</style>