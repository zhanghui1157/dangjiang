<template>
	<view class="content">
		<view class="nav-list">
			<view class="nav-item" @click="navChange(2001)">
				<view class="nav-text">支部大会</view>
				<view class="nav-line" v-if="nav_type==2001 || nav_type==true"></view>
			</view>
			<view class="nav-item" @click="navChange(2002)">
				<view class="nav-text">支委会议</view>
				<view class="nav-line" v-if="nav_type==2002 || nav_type==true"></view>
			</view>
			<view class="nav-item" @click="navChange(2003)">
				<view class="nav-text">党小组会</view>
				<view class="nav-line" v-if="nav_type==2003"></view>
			</view>
			<view class="nav-item" @click="navChange(2004)">
				<view class="nav-text">党课</view>
				<view class="nav-line" v-if="nav_type==2004"></view>
			</view>
			<view class="nav-item" @click="navChange(2005)">
				<view class="nav-text">其他</view>
				<view class="nav-line" v-if="nav_type==2005"></view>
			</view>
		</view>
		<view class="meeting-content">
			<view class="meeting-list" v-for="item in meeting_list" @click="goDetail(item.meeting_no)">
				<view class="meeting-top">
					<view class="meeting-img">
						<image src="../../static/img/pic-list-attrmeeting.png" mode=""></image>
					</view>
					<view class="meeting-info">
						<view class="meeting-title">{{item.meeting_name}}</view>
						<view class="meeting-content">部门: {{item.party_name}}</view>
						<view class="meeting-content">主持人: {{item.host_name}}</view>
						<view class="meeting-time">会议时间: {{item.meeting_start_time}}</view>
						<view class="meeting-addr">会议地址: {{item.meeting_addr}}</view>
					</view>
				</view>
				<!-- <view class="meeting-memo">{{item.memo}}</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keywords:'',
				nav_type:2001,
				sta:2,
				
				meeting_list:[],
				pagemax:'',//总的数量
				pagenow:0,//当前的页数
				shownumber:6,//每页的分页条数
				
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
		onLoad() {
			var t=this;
			
			// 获取列表
			t.getMeetingList();
			
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
			goDetail:function(id){
				uni.navigateTo({
					url: '../index/meeting-detail?id='+id+"&sign=true"
				})
			},
			navChange:function(nav_type){
				var t=this;
				t.nav_type=nav_type;
				t.getMeetingList();
			},
			getMeetingList:function(){
				uni.showLoading();
				var t=this;
				var data={
					communist_no:t.globalData.userInfo.communist_no,
					keywords:t.keywords,
					meeting_type:t.nav_type,
					status:t.sta,
				}
				t.urlRequest.urlRequest(t.func.getMeetingList,data,function(res){
					t.meeting_list=res.data.list;
					t.pagemax=res.data.count;
					uni.hideLoading();
				})
			},
			initData(){
				uni.showLoading();
				const t = this;
				var data={
					communist_no:t.globalData.userInfo.communist_no,
					keywords:t.keywords,
					meeting_type:t.nav_type,
					status:t.sta,
				}
				t.urlRequest.urlRequest(t.func.getMeetingList,{party_no:t.globalData.userInfo.party_no},function(res){
					t.meeting_list=res.data.list;
					uni.hideLoading();
					uni.stopPullDownRefresh();
				})
			},
			setDate() {
				uni.showLoading();
				this.shownumber=this.pagenow*6;
				this.pagenow++;
				var t=this;
				
				var data={
					communist_no:t.globalData.userInfo.communist_no,
					keywords:t.keywords,
					meeting_type:t.nav_type,
					status:t.sta,
					page:t.pagenow,
				}
				t.urlRequest.urlRequest(t.func.getMeetingList,data,function(res){
					if(res.data.list){
						setTimeout(() => {
							t.haveData =true
						}, 100);
						
						t.meeting_list = t.meeting_list.concat(res.data.list);
						t.pagemax=res.data.count
					}
					uni.hideLoading();
				})
			},
		}
	}
</script>

<style>
	.nav-list{width: 100%;display: flex;height: 70upx;justify-content: space-between;border-bottom: 1px solid #e8e8e8;}
	.nav-item{flex: 1;}
	.nav-text{width: 100%;height: 60upx;text-align: center;line-height: 70upx;}
	.nav-line{width:40%;margin: auto;border-top: 1px solid #e93a30;}
	.meeting-list{width: 100%;padding: 20upx 2%;border-bottom: 1px solid #e8e8e8;}
	.meeting-top{display: flex;}
	.meeting-img{flex: 1;height: 180upx;}
	.meeting-img image{height: 100%;width: 100%;}
	.meeting-info{flex: 2;padding-left: 20upx;}
	.meeting-title{font-weight: bold;color: #000;line-height: 30upx;padding-bottom: 10upx;}
	.meeting-time{color: red;font-size: 12px;line-height:40upx;}
	.meeting-addr{font-size: 12px;line-height:40upx;}
	.meeting-content{width:100%;font-size: 12px;line-height:40upx;/* overflow:hidden;text-overflow:ellipsis;white-space:nowrap; */}
	.meeting-memo{width:100%;font-size: 12px;line-height:40upx;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
</style>
