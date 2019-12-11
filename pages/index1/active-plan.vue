<template>
	<view class="content">
		<view class="list-item head-title">
			<view class="item1">组织名称</view>
			<view class='item2'>总分</view>
			<view class='item3'>平均分</view>
		</view>
		<view v-if="list">
			<view class="list-item" v-for="item in list" @click="activeDetail(item.partyday_log_id)">
				<view class="item1">{{item.party_name}}</view>
				<view class='item2'>{{item.total_grade}}</view>
				<view class='item3'>{{item.average_grade}}</view>
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
			}
		},
		onLoad() {
			var t=this;	
			uni.showLoading();
			t.urlRequest.urlRequest(t.func.getActivityList,'',function(res){
				t.list=res.data.status_list
				uni.hideLoading();
			})
			
		},
		methods: {
			activeDetail:function(id){
				uni.navigateTo({
					url: '../index1/active-detail?id='+id
				})
			},
		}
	}
</script>
<style>
	.list-item{width: 100%;padding: 20upx 10upx;line-height: 40upx;display: flex;border-bottom: 1px solid #e8e8e8;}
	.head-title{color: red;font-weight: bold;text-align: center;}
	.item1{flex: 6;border-right: 1px solid #e8e8e8;}
	.item2{flex: 1;text-align:center;border-right: 1px solid #e8e8e8;}
	.item3{flex: 1;text-align:center}
</style>
