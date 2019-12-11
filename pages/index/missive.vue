<template>
	<view class="content">
		<view class="search-content">
			<input class="search-text" placeholder="搜索" v-model="keywords" confirm-type="search" @confirm="search()"/>
		</view>
		<view class="nav-list">
			<view class="nav-item" @click="navChange(0)">
				<view class="nav-text">公文收件箱</view>
				<view class="nav-line" v-if="nav_0==true"></view>
			</view>
			<view class="nav-item" @click="navChange(1)">
				<view class="nav-text">我发起的公文</view>
				<view class="nav-line" v-if="nav_1==true"></view>
			</view>
		</view>
		<view class="main-content">
			<view v-if="list">
				<view class="item-list" v-for="item in list" @click="missiveDetail(item.missive_no)">
					<view class="list-title">{{item.missive_title}}</view>
					<view class="list-party">{{item.missive_corporation}}</view>
					<view class="list-party">收件人：{{item.missive_receiver}}</view>
					<view class="list-party" v-if="item.missive_cc">抄  送：{{item.missive_cc}}</view>
					<view class="list-time">{{item.missive_communist}} {{item.add_time}}</view>
				</view>
			</view>
			<view class="no-data" v-else>
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
				keywords:'',
				nav_0:true,
				nav_1:false,
				type:1,
			}
		},
		onLoad(e) {
			var t=this;	
			t.getOamissiveList();
		},
			
		methods: {
			missiveDetail:function(missive_no){
				uni.navigateTo({
					url: 'missive-detail?missive_no='+missive_no
				})
			},
			search:function(){
				uni.showLoading();
				var t=this;
				var data={
					communist_no:t.globalData.userInfo.communist_no,
					keywords:t.keywords,
					type:t.type,
				}
				t.urlRequest.urlRequest(t.func.getOamissiveList,data,function(res){
					t.list=res.data.missive_list;
					uni.hideLoading();
				})
			},
			getOamissiveList:function(){
				uni.showLoading();
				var t=this;
				var data={
					communist_no:t.globalData.userInfo.communist_no,
					keywords:t.keywords,
					type:t.type,
				}
				t.urlRequest.urlRequest(t.func.getOamissiveList,data,function(res){
					t.list=res.data.missive_list;
					uni.hideLoading();
				})
			},
			navChange:function(type){
				var t=this;
				if(type==0){
					t.nav_0=true;
					t.nav_1=false;
					t.type=1;
					t.getOamissiveList();
				}else{
					t.nav_1=true;
					t.nav_0=false;
					t.type=2;
					t.getOamissiveList();
				}
			}
		}
	}
</script>

<style>
	.search-content{height: 100upx;width: 100%;background: #f3f3f3;padding: 20upx;}
	.search-text{width: 96%;height: 60upx;border-radius: 40upx;background: #fff;margin: auto;padding:0 20upx;font-size: 14px;}
	.nav-list{width: 100%;display: flex;height: 70upx;justify-content: space-between;border-bottom: 1px solid #e8e8e8;}
	.nav-item{flex: 1;}
	.nav-text{width: 100%;height: 60upx;text-align: center;line-height: 70upx;}
	.nav-line{width:40%;margin: auto;border-top: 1px solid #e93a30;}
	.item-list{width: 100%;border-bottom: 1px solid #e8e8e8;padding: 10upx 0;line-height: 50upx;}
	.item-list:last-child{border-bottom:0upx;}
	.list-title{height: 50;font-weight: 500;color: #000;}
	.list-time{width: 100%;text-align: right;font-size: 12px;color: #B3B3B3;}
</style>
