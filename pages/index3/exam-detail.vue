<template>
	<view class="content">
		<view class="main-content">
			<view class="test-top">
				<view class="test-info">
					<view>考试名称：{{info.exam_title}}</view>
					<view>考试人员：{{info.communist_name}}</view>
					<view>考试时间：{{info.exam_date}}</view>
					<view>考试时长：{{info.exam_time}}分钟</view>
				</view>
				<view class="test-score">
					<view class="test-score-text">得分/总分</view>
					<view class="test-score-num">{{branch.log_score}}/{{info.exam_point}}</view>
				</view>
			</view>
			<view class="question-list" v-for="(item,index) in list">
				<view class="question-title">{{index+1}}.{{item.questions_title}}（{{item.questions_type}}）</view>
				<view class="question-answer">
					<label class="radio" v-for="(val,key) in item.questions_item">
						<view class="question-answer-list">
							<view class="answer-list-text">{{val}}</view>
						</view>
					</label>
					<view class="answer-decs">我选择的答案是：【{{item.my_questions_item}}】；正确答案是【{{item.questions_answer}}】</view>
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				info:[],
				branch:[],
			}
		},
		onLoad(e) {
			var t=this;
			uni.showLoading();
			var data={
				communist_no:t.globalData.userInfo.communist_no,
				exam_id:e.id,
			}
			t.urlRequest.urlRequest(t.func.examDetail,data,function(res){
				t.list=res.data.exam_list.questions_list
				t.info=res.data.exam_list.exam
				t.branch=res.data.exam_list.branch
				uni.hideLoading();
			})
		},
		methods: {
			
		}
	}
</script>

<style>
	page{background:#f3f3f3;}
	.test-top{width: 100%;display: flex;border-radius: 10upx;background: #fff;margin: 10upx auto;}
	.test-info{flex: 6;padding: 20upx;}
	.test-info view{line-height: 50upx;}
	.test-score{flex:3;height: 100%;background: #e93a30;border-radius: 0 10upx 0 0;height: 200upx;color: #fff;}
	.test-score-text{margin-top: 50upx;text-align: center;width:100%;font-weight:bold;line-height:50upx}
	.test-score-num{text-align: center;width:100%;font-weight:bold;line-height:50upx}
	
	.question-list{width: 100%;margin:20upx auto;background: #fff;border-radius: 10upx;padding: 15upx 2%;}
	.question-title{line-height: 50upx;font-size: 14px;font-weight: bold;}
	.question-answer{width: 100%;}
	.question-answer-list{min-height: 60upx;line-height: 60upx;margin: 20upx 10upx;padding: 0 20upx;border-radius: 10upx;display: flex;}
	.answer-list-check{flex: 1;}
	.answer-list-text{flex: 10;}
	.answer-decs{color: red;}
</style>
