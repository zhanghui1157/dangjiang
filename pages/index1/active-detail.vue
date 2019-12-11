<template>
	<view class="content">
		<view class="head-title">{{detail.party_name}}</view>
		<view class="item-list">
			<view class="item-txt">三会一课</view>
			<view class="item-num">{{detail.meeting_grade}}</view>
		</view>
		<view class="item-list">
			<view class="item-txt">党费缴纳</view>
			<view class="item-num">{{detail.dues_grade}}</view>
		</view>
		<view class="item-list">
			<view class="item-txt">宣传文稿</view>
			<view class="item-num">{{detail.meeting_grade}}</view>
		</view>
		<view class="item-list">
			<view class="item-txt">工作计划</view>
			<view class="item-num">{{detail.workable_grade}}</view>
		</view>
		<view class="item-list">
			<view class="item-txt">思想动态反应</view>
			<view class="item-num">{{detail.condition_grade}}</view>
		</view>
		<view class="item-list">
			<view class="item-txt">遵纪守法情况</view>
			<view class="item-num">{{detail.condition_grade}}</view>
		</view>
		<view class="item-list">
			<view class="item-txt">支部计划落实</view>
			<view class="item-num">{{detail.partyday_grade}}</view>
		</view>
		<view class="item-list">
			<view class="item-txt">积极分子培训</view>
			<view class="item-num">{{detail.cultivate_grade}}</view>
		</view>
		<view class="item-list">
			<view class="item-txt">创新活动</view>
			<view class="item-num">{{detail.activity_grade}}</view>
		</view>
		<view class="item-list">
			<view class="item-txt">总分</view>
			<view class="item-num">{{detail.total_grade}}</view>
		</view>
		<view class="item-list">
			<view class="item-txt">平均分</view>
			<view class="item-num">{{detail.average_grade}}</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail:[],
			}
		},
		onLoad(e) {
			var t=this;	
			uni.showLoading();
			t.urlRequest.urlRequest(t.func.getActivityInfo,{partyday_log_id:e.id},function(res){
				t.detail=res.data.status_list
			})
			uni.hideLoading();
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
	.head-title{width: 90%;padding: 50upx;line-height: 30upx;text-align: center;color: red;font-weight: bold;}
	.item-list{width: 90%;margin: auto;border-top: 1px dashed red;display: flex;}
	.item-list:last-child{border-bottom: 1px dashed red;}
	.item-txt{flex: 3;line-height: 40upx;text-align: center;border-left: 1px dashed red;border-right:  1px dashed red;padding:20upx;}
	.item-num{flex: 2;line-height: 40upx;text-align: center;border-right: 1px dashed red;padding:20upx;}
</style>
