<template>
	<view class="content">
		<view class="search-content">
			<input class="search-text" placeholder="搜索" v-model="keywords" confirm-type="search" @confirm="search()"/>
		</view>
		<view class="nav-list">
			<view class="nav-item" @click="navChange(0)">
				<view class="nav-text">我的工作计划</view>
				<view class="nav-line" v-if="nav_0==true"></view>
			</view>
			<view class="nav-item" @click="navChange(1)">
				<view class="nav-text">我安排的工作</view>
				<view class="nav-line" v-if="nav_1==true"></view>
			</view>
		</view>
		<view v-if="list">
			<view v-if="type==2">
				<view class="list-item" v-for="item in list" @click='planDetail(item.workplan_id)'>
					<view class="list-title">{{item.workplan_title}}</view>
					<view class="list-content">
						<view class="list-detail">
							<view class="list-time">执行时间：{{item.workplan_expectstart_time}}~{{item.workplan_expectend_time}}</view>
							<view class="list-checker">审核人：{{item.workplan_arranger_man}}</view>
						</view>
					</view>
					<!-- <view class="list-status" v-if="item.status==11">
						<view class="status-content" @click="changeStatus(item.workplan_id,21)">审核</view>
					</view> -->
					<!-- <view class="list-status" v-else>
						<view class="status-content" style="border: 0upx;">{{item.status_txt}}</view>
					</view> -->
					<!-- <view class="list-status" v-else-if="item.status==21">
						<view class="status-content">进度汇报</view>
						<view class="status-content">工作完成</view>
						<view class="status-content">申请延迟</view>
						<view class="status-content">终止任务</view>
					</view>
					<view class="list-status" v-else-if="item.status==31">
						<view class="status-content">查看工作历程</view>
					</view> -->
				</view>
			</view>
			<view v-else>
				<view class="list-item" v-for="item in list" @click='planDetail(item.workplan_id)'>
					<view class="list-title">{{item.workplan_title}}</view>
					<view class="list-content">
						<view class="list-detail">
							<view class="list-time">执行时间：{{item.workplan_expectstart_time}} ~ {{item.workplan_expectend_time}}</view>
							<view class="list-checker">执行人：{{item.workplan_executor_man}}</view>
						</view>
						<view class="check-status" >{{item.status_txt}}</view>
					</view>
					<!-- <view class="list-status" v-if="item.status==11">
						<view class="status-content">修改</view>
						<view class="status-content">删除</view>
					</view>
					<view class="list-status" v-else>
						<view class="status-content">查看工作历程</view>
					</view> -->
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
				nav_0:true,
				nav_1:false,
				type:2,
			}
		},
		onLoad(e) {
			var t=this;	
			t.getOamissiveList();
		},
		methods: {
			planDetail:function(id){
				uni.navigateTo({
					url: 'zhibu-work-plan-detail?id='+id
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
				t.urlRequest.urlRequest(t.func.oaWorkPlanList,data,function(res){
					t.list=res.data.workplan_list;
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
				t.urlRequest.urlRequest(t.func.oaWorkPlanList,data,function(res){
					t.list=res.data.workplan_list;
					uni.hideLoading();
				})
			},
			navChange:function(type){
				var t=this;
				if(type==0){
					t.nav_0=true;
					t.nav_1=false;
					t.type=2;
					t.getOamissiveList();
				}else{
					t.nav_1=true;
					t.nav_0=false;
					t.type=1;
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
	
	.list-item{width: 96%;margin:20upx auto;padding: 10upx 2%;background: #fff;border-bottom: 1px solid #e8e8e8;}
	.last-item:last-child{border-bottom: 0;}
	.list-title{font-size: 14px;font-weight: bold;width: 100%;line-height: 40upx;padding-bottom: 20upx;}
	.list-content{width: 100%;display: flex;}
	.list-detail{flex: 5;}
	.list-detail view{height: 40upx;line-height: 40upx;}
	.check-status{flex: 1;line-height: 80upx;}
	.list-status{width:100%;height: 80upx;}
	.status-content{height: 40upx;line-height: 35upx;padding: 0 15upx;border-radius: 15upx;text-align: center;float: right;margin: 20upx 0 20upx 20upx;border: 1px solid #ddd;}
	.list-now{color: rgba(254, 192, 115, 1);}
</style>
