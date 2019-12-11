<template>
	<view class="content">
		<view class="head-title"></view>
		<view class="item-list">
			<view class="item-txt">计划标题</view>
			<view class="item-num"><rich-text :nodes="detail.tracking_name"></rich-text></view>
		</view>
		<view class="item-list">
			<view class="item-txt">责任单位</view>
			<view class="item-num"><rich-text :nodes="detail.plan_unit"></rich-text></view>
		</view>
		<view class="item-list">
			<view class="item-txt">计划内容</view>
			<view class="item-num"><rich-text :nodes="detail.tracking_content"></rich-text></view>
		</view>
		<view class="item-list">
			<view class="item-txt">完成状况</view>
			<view class="item-num"><rich-text :nodes="detail.tracking_completion"></rich-text></view>
		</view>
		<view class="item-list">
			<view class="item-txt">判定</view>
			<view class="item-num"><rich-text :nodes="detail.tracking_decide"></rich-text></view>
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
			t.urlRequest.urlRequest(t.func.workPlanDetail,{plan_id:e.id},function(res){
				t.detail=res.data.status_list[0];
			})
			uni.hideLoading();
		},
		methods: {
			
		}
	}
</script>
<style>
	.head-title{width: 90%;padding: 50upx;line-height: 30upx;text-align: center;color: red;font-weight: bold;}
	.item-list{width: 90%;margin: auto;border-top: 1px dashed red;display: flex;}
	.item-list:last-child{border-bottom: 1px dashed red;}
	.item-txt{flex: 1;line-height: 40upx;text-align: center;border-left: 1px dashed red;border-right:  1px dashed red;padding:20upx;}
	.item-num{flex: 2;line-height: 40upx;text-align: center;border-right: 1px dashed red;padding:20upx;}
</style>
