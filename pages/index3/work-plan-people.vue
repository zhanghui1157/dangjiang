<template>
	<view class="content">
		<view class="search-content">
			<input class="search-text" placeholder="搜索" v-model="keywords" confirm-type="search" @confirm="search()"/>
		</view>
		<view class="main-content">
			<view v-if="list">
				<view class="dang-list" v-for="item in list" @click="checkboxChange(item.communist_no)">
					<view class="dang-check">
						<view class="check-border">
							<view :class="item.checked==true?'check-true':'check-false'"></view>
						</view>
					</view>
					<view class="dang-img">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="dang-info">
						<view class="dang-name">{{item.communist_name}}</view>
						<view class="dang-partno">{{item.party_no}}</view>
					</view>
				</view>
			</view>
			<view v-else class="no-data">
				<view class="no-data-icon icon iconfont">&#xe642;;</view>
				<view class="no-data-text">暂无数据</view>
			</view>
		</view>
		<view class="footer"></view>
		<view class="form-btn" @click="peopleCheck()">确定</view>
	</view>
</template>

<script>
	import onfire from '../../static/js/onfire.js';
	export default {
		data() {
			return {
				img:[],
				list:[],
				pagemax:'',//总的数量
				pagenow:0,//当前的页数
				shownumber:12,//当前页面的条数
				pagenumber:12,//每页的分页条数
				keywords:'',
				
				contentText: {
					contentdown: "查看更多",
					contentrefresh: "加载中",
					contentnomore: "没有更多"
				},
				status:'loading',
				shouLoading:true,
				haveData:false,
				
				selectPeople:[],
				workplan_executor_man:'',
			}
		},
		onLoad(e) {
			var t=this;	
			t.workplan_executor_man=e.workplan_executor_man;
			t.getDangList();
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
			peopleCheck:function(index){
				var t=this;
				onfire.fire('work_plan', t.selectPeople);
				history.go(-1);
			},
			checkboxChange: function (communist_no) {
				var t=this;
				var is_have=false;
				for(var i=0;i<t.list.length;i++){
					t.list[i]['checked']=false;
					if(communist_no==t.list[i]['communist_no']){
						t.list[i]['checked']=true;
						t.selectPeople=t.list[i];
					}
				}
			},
			search:function(){
				uni.showLoading();
				var t=this;
				var data={
					party_no:t.globalData.userInfo.party_no,
					keywords:t.keywords,
					pagesize:999,
					page:0,
				}
				t.urlRequest.urlRequest(t.func.getDangList,data,function(res){
					var data=t.dealData(res);
					t.list=data;
					if(t.workplan_executor_man){
						for (var i = 0; i < t.list.length; i++) {
							if(t.list[i]['communist_no']==t.workplan_executor_man){
								t.list[i]['checked']=true;
								t.selectPeople=t.list[i]
							}
						}
					}
					uni.hideLoading();
				})
			},
			getDangList:function(){
				uni.showLoading();
				var t=this;
				var data={
					party_no:t.globalData.userInfo.party_no,
					pagesize:t.shownumber,
					page:t.pagenow,
				}
				t.urlRequest.urlRequest(t.func.getDangList,data,function(res){
					var data=t.dealData(res);
					t.list=data;
					if(t.workplan_executor_man){
						for (var i = 0; i < t.list.length; i++) {
							if(t.list[i]['communist_no']==t.workplan_executor_man){
								t.list[i]['checked']=true;
								t.selectPeople=t.list[i]
							}
						}
					}
					
					uni.hideLoading();
				})
				
			},
			initData(){
				uni.showLoading();
				const t = this;
				t.shownumber=12;
				t.pagenow=0;
				var data={
					party_no:t.globalData.userInfo.party_no,
					pagesize:t.shownumber,
					page:t.pagenow,
				}
				t.urlRequest.urlRequest(t.func.getDangList,data,function(res){
					var data=t.dealData(res);
					t.list=data;
					if(t.workplan_executor_man){
						for (var i = 0; i < t.list.length; i++) {
							if(t.list[i]['communist_no']==t.workplan_executor_man){
								t.list[i]['checked']=true;
								t.selectPeople=t.list[i]
							}
						}
					}
					uni.hideLoading();
					uni.stopPullDownRefresh();
				})
			},
			setDate() {
				uni.showLoading();
				this.shownumber=this.pagenow*this.pagenumber;
				this.pagenow++;
				var t=this;
				
				var data={
					party_no:t.globalData.userInfo.party_no,
					page:t.pagenow,
					pagesize:t.pagenumber
				}
				t.urlRequest.urlRequest(t.func.getDangList,data,function(res){
					if(res.data.list){
						setTimeout(() => {
							t.haveData =true
						}, 100);
						var data=t.dealData(res);
						t.list = t.list.concat(data);
						if(t.workplan_executor_man){
							if(t.workplan_executor_man){
								for (var i = 0; i < t.list.length; i++) {
									if(t.list[i]['communist_no']==t.workplan_executor_man){
										t.list[i]['checked']=true;
										t.selectPeople=t.list[i]
									}
								}
							}
						}
					}
					
					uni.hideLoading();
				})
				
			},
			dealData:function(res){
				var t=this;
				t.pagemax=res.data.count
				if(res.data.list){
					for (var i = 0; i < res.data.list.length; i++) {
						res.data.list[i]['checked']=false;
						if(res.data.list[i]['communist_avatar']){
							res.data.list[i]['img']=t.sta.siteupload+res.data.list[i]['communist_avatar'];
						}else{
							res.data.list[i]['img']=t.sta.sitestatic+'img/oa_img_head.png';
						}
						if(t.content){
							var arr=t.content.split(',');
							for(var j=0;j<arr.length;j++){
								if(res.data.list[i]['communist_no']==arr[j]){
									res.data.list[i]['checked']=true;
								}
							}
						}
					}
					
				}
				return res.data.list
			}
		}
	}
</script>

<style>
	.search-content{height: 100upx;width: 100%;background: #f3f3f3;padding: 20upx;}
	.search-text{width: 96%;height: 60upx;border-radius: 40upx;background: #fff;margin: auto;padding:0 20upx;font-size: 14px;}
	
	.search-list{width: 100%;height: 100upx;display: flex;border-bottom: 1px solid #e8e8e8;}
	.search-list-item{flex: 1;text-align: center;line-height: 100upx;}
	
	.dang-list{width: 100%;display: flex;border-bottom: 1px solid #f0eded;padding: 10upx 0;}
	.dang-img{flex: 1.5;height: 80upx;}
	.dang-img image{height: 100%;width: 80upx;margin: auto;border-radius: 50%;}
	.dang-info{flex: 8;}
	.dang-name{font-weight: bold;line-height: 40upx;}
	.dang-partno{color: #B3B3B3;line-height: 40upx;}
	.dang-check{flex: 1;}
	.check-border{height: 50upx;width: 50upx;border-radius: 100%;border: 1px solid #e8e8e8;margin-top: 20upx;}
	.check-true{height: 30upx;width: 30upx;border-radius: 100%;background: #e93a30;margin: 10upx 0 0 10upx;}
	.check-false{height: 30upx;width: 30upx;border-radius: 100%;background: #f3f3f3;margin: 10upx 0 0 10upx;}
</style>
