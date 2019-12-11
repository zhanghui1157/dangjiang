<template>
	<view class="content">
		<view class="nav-list">
			<view class="nav-item" @click="navChange(0)">
				<view class="nav-text">调查问卷</view>
				<view class="nav-line" v-if="nav_0==true"></view>
			</view>
			<view class="nav-item" @click="navChange(1)">
				<view class="nav-text">问卷结果公示</view>
				<view class="nav-line" v-if="nav_1==true"></view>
			</view>
		</view>
		<view v-if="list">
			<view class="list-item" v-for="item in list" @click="goDetail(item.survey_id)">
				<view class="list-title">{{item.survey_title}}</view>
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
				status:0,
			}
		},
		onLoad(e) {
			var t=this;	
			t.getList();
		},
			
		methods: {
			goDetail:function(id){
				var t=this;
				uni.navigateTo({
					url: 'survey-detail?id='+id+'&status='+t.status
				})
			},
			getList:function(){
				uni.showLoading();
				var t=this;
				var data={
					communist_no:t.globalData.userInfo.communist_no,
					status:t.status,
				}
				t.urlRequest.urlRequest(t.func.getSurveyList,data,function(res){
					t.list=res.data.survey_list;
					uni.hideLoading();
				})
			},
			navChange:function(status){
				var t=this;
				t.list=[];
				if(status==0){
					t.nav_0=true;
					t.nav_1=false;
					t.status=0;
					t.getList();
				}else{
					t.nav_1=true;
					t.nav_0=false;
					t.status=1;
					t.getList();
				}
			}
		}
	}
</script>

<style>
	.nav-list{width: 100%;display: flex;height: 70upx;justify-content: space-between;border-bottom: 1px solid #e8e8e8;}
	.nav-item{flex: 1;}
	.nav-text{width: 100%;height: 60upx;text-align: center;line-height: 70upx;}
	.nav-line{width:40%;margin: auto;border-top: 1px solid #e93a30;}
	
	.list-item{width: 96%;margin:20upx auto;padding: 10upx 2%;background: #fff;border-bottom: 1px solid #e8e8e8;}
	.last-item:last-child{border-bottom: 0upx;}
	.list-title{font-size: 14px;width: 100%;line-height: 40upx;padding-bottom: 20upx;}
	.list-content{width: 100%;display: flex;}
	.list-detail{flex: 5;}
	.list-detail view{height: 40upx;line-height: 40upx;}
	.check-status{flex: 1;line-height: 80upx;}
	.list-status{width:100%;height: 80upx;}
	.status-content{height: 50upx;line-height: 45upx;padding: 0 15upx;border-radius: 25upx;text-align: center;float: right;margin: 20upx 0 20upx 20upx;border: 1px solid #ddd;}
	.list-now{color: rgba(254, 192, 115, 1);}
</style>
