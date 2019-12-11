<template>
	<view class="content">
		<view class="search-content">
			<input class="search-text" placeholder="搜索" v-model="keywords" confirm-type="search" @confirm="search()"/>
		</view>
		<view v-if="list.length>0">
			<view class="log-list">
				<view class="uni-timeline" style="padding: 30upx 20upx;">
					<view class="uni-timeline-item" v-for="item in list">
						<view class="uni-timeline-item-keynode">{{item.add_time}}</view>
						<view class="uni-timeline-item-divider"></view>
						<view class="uni-timeline-item-content" @click="log_detail(item.notes_id)">
							<view>{{item.notes_title}}</view>
							<view class="log-type">[{{item.notes_type}}]</view>
						</view>
					</view>
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
				topic_id:'',
				pagemax:'',//总的数量
				pagenow:0,//当前的页数
				shownumber:10,//每页的分页条数
				keywords:'',
				
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
			log_detail:function(id){
				uni.navigateTo({
					url: '../zhuanti/notes-detail?id='+id
				})
			},
			search:function(){
				uni.showLoading();
				var t=this;
				var data={
					communist_no:t.globalData.userInfo.communist_no,
					keywords:t.keywords,
					pagesize:999,
					page:0,
				}
				t.urlRequest.urlRequest(t.func.eduNotesList,data,function(res){
					for (var i = 0; i < res.data.list.length; i++) {
						res.data.list[i]['add_time']=res.data.list[i]['add_time'].substring(0,10)
					}
					var data=res.data.list;
					t.list=data;
					uni.hideLoading();
				})
			},
			getList:function(){
				uni.showLoading();
				var t=this;
				var data={
					communist_no:t.globalData.userInfo.communist_no,
					keywords:t.keywords,
					page:t.pagenow,
				}
				t.urlRequest.urlRequest(t.func.eduNotesList,data,function(res){
					t.pagemax=res.data.count;
					if(res.data.list){
						for (var i = 0; i < res.data.list.length; i++) {
							res.data.list[i]['add_time']=res.data.list[i]['add_time'].substring(0,10)
							t.list.push(res.data.list[i]);
						}
					}
					
					uni.hideLoading();
				})
				
			},
			initData(){
				uni.showLoading();
				const t = this;
				var data={
					communist_no:t.globalData.userInfo.communist_no,
					keywords:t.keywords,
					page:t.pagenow,
				}
				t.urlRequest.urlRequest(t.func.eduNotesList,data,function(res){
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
					communist_no:t.globalData.userInfo.communist_no,
					keywords:t.keywords,
					page:t.pagenow,
				}
				t.urlRequest.urlRequest(t.func.eduNotesList,data,function(res){
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
	page{background:#f3f3f3;}
	.search-content{height: 100upx;width: 100%;background: #fff;padding: 20upx;}
	.search-text{width: 96%;height: 60upx;border-radius: 40upx;background: #f3f3f3;margin: auto;padding:0 20upx;font-size: 14px;}
	.log-type{font-size: 12px;color: #e93a30;font-weight: 100;}
	.uni-timeline {
		margin: 35upx 0;
		display: flex;
		flex-direction: column;
		position: relative;
	}
	.uni-timeline-item {
		display: flex;
		flex-direction: row;
		position: relative;
		padding-bottom: 20upx;
		box-sizing: border-box;
		overflow: hidden;
	}
	.uni-timeline-item .uni-timeline-item-keynode {
		width: 200upx;
		flex-shrink: 0;
		box-sizing: border-box;
		padding-right: 20upx;
		text-align: right;
		line-height: 105upx;
	}
	.uni-timeline-item .uni-timeline-item-divider {
		flex-shrink: 0;
		position: relative;
		width: 30upx;
		height: 30upx;
		top: 15upx;
		border-radius: 50%;
		background-color: #fec073;
	}
	.uni-timeline-item-divider::before,
	.uni-timeline-item-divider::after {
		position: absolute;
		left: 15upx;
		width: 1upx;
		height: 100vh;
		content: '';
		background: inherit;
	}
	.uni-timeline-item-divider::before {
		bottom: 100%;
	}
	.uni-timeline-item-divider::after {
		top: 100%;
	}
	.uni-timeline-last-item .uni-timeline-item-divider:after {
		display: none;
	}

	.uni-timeline-first-item .uni-timeline-item-divider:before {
		display: none;
	}

	.uni-timeline-item .uni-timeline-item-content {
		padding-left: 20upx;
	}

	.uni-timeline-last-item .bottom-border::after{
		display: none;
	}

	.uni-timeline-item-content .datetime{
		color: #CCCCCC;
	}

	/* 自定义节点颜色 */
	.uni-timeline-last-item .uni-timeline-item-divider{
		background-color: #fec073;
	}
</style>
