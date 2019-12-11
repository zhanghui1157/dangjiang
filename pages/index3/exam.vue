<template>
	<view class="content">
		<view v-if="exam_list">
			<view class="test-list" v-for="item in exam_list" @click="examDetail(item.exam_id)">
				<view class="test-head">
					<view class="test-title">{{item.exam_title}}</view>
					<view class="test-status">已参加</view>
				</view>
				<view class="test-range">考试范围：中共共享集团直属部门支部委员会</view>
				<view class="test-info">
					<view class="test-point">积分：{{item.exam_integral}}</view>
					<view class="test-time">考试时长：{{item.exam_time}}分钟</view>
					<view class="test-end">截止日期：{{item.exam_date}}</view>
				</view>
				<view class="clear"></view>
			</view>
		</view>
		<view v-else class="no-data">
			<view class="no-data-icon icon iconfont">&#xe642;;</view>
			<view class="no-data-text">暂无数据</view>
		</view>
		<view class="footer"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				exam_list:[],
			}
		},
		onLoad() {
			
			var t=this;
			uni.showLoading();
			//考试列表
			var data={
				is_exam:2,
				communist_no:t.globalData.userInfo.communist_no,
			}
			t.urlRequest.urlRequest(t.func.examList,data,function(res){
				t.exam_list=res.data.exam_list;
				uni.hideLoading();
			})
			
		},
		methods: {
			startTest:function(id){
				uni.navigateTo({
					url: 'test-info?id='+id
				})
			},
			examDetail:function(id){
				uni.navigateTo({
					url: 'exam-detail?id='+id
				})
			}
		}
	}
</script>

<style>
	page{background:#f3f3f3;}
	.test-list{width: 94%;background: #fff;border-radius: 10upx;padding: 15upx;margin:20upx auto;}
	.test-head{display: flex;}
	.test-range,.test-point,.test-time,.test-end{font-size: 14px;line-height: 40upx;}
	.test-title{flex: 10;font-size: 14px;font-weight: bold;line-height: 50upx;}
	.test-status{flex: 2;height: 42upx;line-height: 42upx;text-align: center;background: #e93a30;color: #fff;}
	.test-info{width: 60%;float: left;}
	.test-btn{width:25%;float: right;border-radius: 25upx;height: 50upx;text-align: center;line-height: 50upx;background: rgb(255,58,65);color:#fff;margin-top: 40upx;}
</style>
