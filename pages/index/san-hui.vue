<template>
	<view class="content">
		<view class="page-section swiper">
			<view class="page-section-spacing">
				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="item in turn">
						<view class="swiper-item uni-bg-red" ><img :src="item"></view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="meeting-list" v-for="item in meeting_list" >
			<view v-if="item.status==21" @click="signIn(item.meeting_no)">
				<view class="meeting-title">{{item.meeting_name}}</view>
				<view class="meeting-content">
					<view class="meeting-detail">
						<view class="meeting-intro meeting-text">
							<view class="left-title">会议时间：</view>
							<view class="right-content">{{item.meeting_start_time}}</view>
						</view>
						<view class="meeting-intro meeting-text">
							<view class="left-title">会议地点：</view>
							<view class="right-content">{{item.meeting_addr}}</view>
						</view>
					</view>
					<view class="status-img" v-if="item.status==21">
						<image src="../../static/img/now.png" mode=""></image>
					</view>
					<view class="status-img" v-else-if="item.status==11">
						<image src="../../static/img/begin.png" mode=""></image>
					</view>
					<view class="status-img" v-else-if="item.status==23">
						<image src="../../static/img/end.png" mode=""></image>
					</view>
				</view>
				<view class="meeting-content">
					<view class="meeting-detail">
						<view class="meeting-intro meeting-text">
							<view class="left-title">会议简介：</view>
							<view class="right-content">{{item.memo}}</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else>
				<view class="meeting-title">{{item.meeting_name}}</view>
				<view class="meeting-content">
					<view class="meeting-detail">
						<view class="meeting-intro meeting-text">
							<view class="left-title">会议时间：</view>
							<view class="right-content">{{item.meeting_start_time}}</view>
						</view>
						<view class="meeting-intro meeting-text">
							<view class="left-title">会议地点：</view>
							<view class="right-content">{{item.meeting_addr}}</view>
						</view>
					</view>
					<view class="status-img" v-if="item.status==21">
						<image src="../../static/img/now.png" mode=""></image>
					</view>
					<view class="status-img" v-else-if="item.status==11">
						<image src="../../static/img/begin.png" mode=""></image>
					</view>
					<view class="status-img" v-else-if="item.status==23">
						<image src="../../static/img/end.png" mode=""></image>
					</view>
				</view>
				<view class="meeting-content">
					<view class="meeting-detail">
						<view class="meeting-intro meeting-text">
							<view class="left-title">会议简介：</view>
							<view class="right-content">{{item.memo}}</view>
						</view>
					</view>
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
				indicatorDots: true,
				autoplay: true,
				interval: 4000,
				duration: 500,
				turn:[],
				
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
			//获取banner
			t.urlRequest.urlRequest(t.func.getBannerImg,{location_code:5},function(res){
				for (var i = 0; i < res.data.ad_list.length; i++) {
					t.turn.push(t.sta.sitebase+res.data.ad_list[i]);
				}
			})
			
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
			signIn:function(id){
				uni.navigateTo({
					url: 'meeting-detail?id='+id
				})
			},
			getMeetingList:function(){
				uni.showLoading();
				var t=this;
				t.urlRequest.urlRequest(t.func.getMeetingList,{communist_no:t.globalData.userInfo.communist_no},function(res){
					t.meeting_list=res.data.meeting_list;
					t.pagemax=res.data.count;
					uni.hideLoading();
				})
			},
			initData(){
				uni.showLoading();
				const t = this;
				var data={
					cat_id:t.cat_id
				}
				t.urlRequest.urlRequest(t.func.getMeetingList,{communist_no:t.globalData.userInfo.communist_no},function(res){
					t.meeting_list=res.data.meeting_list;
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
					page:t.pagenow,
				}
				t.urlRequest.urlRequest(t.func.getMeetingList,data,function(res){
					if(res.data.meeting_list){
						setTimeout(() => {
							t.haveData =true
						}, 100);
						
						t.meeting_list = t.meeting_list.concat(res.data.meeting_list);
						t.pagemax=res.data.count
					}
					uni.hideLoading();
				})
			},
		}
	}
</script>

<style>
	.swiper{height: 350upx;width: 100%;}
	.swiper-item {display: block;height: 350upx;line-height: 350upx;text-align: center;border-radius: 15upx;}
	.swiper-item img{height: 100%;width: 100%;}
	.meeting-list{width: 90%;margin:20upx auto;border: 1px solid #EAEAEA;border-radius: 10upx; padding: 10upx 2%;position: relative;}
	.meeting-title{font-size: 14px;font-weight: bold;line-height: 60upx;}
	.meeting-text{line-height: 40upx;font-size: 14px;display: flex;}
	.meeting-content{display: flex;}
	.meeting-detail{flex: 5;}
	.meeting-status{flex: 1;line-height: 80upx;}
	.meeting-now{color: rgba(254, 192, 115, 1);}
	.meeting-sign{height: 80upx;}
	.meeting-sign-text{clear:both;width:20%;float: right;text-align: center;height: 50upx;line-height: 50upx;border: 1px solid #EAEAEA;border-radius: 20upx;margin-top:10upx;}
	.left-title{flex: 1.5;}
	.right-content{flex: 5;}
	.status-img{position: absolute;right:4%;top:6%}
	.status-img image{width: 100upx;height: 100upx;}
</style>
