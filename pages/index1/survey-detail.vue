<template>
	<view class="content">
		<view class="test-list">
			<view class="test-title">{{exam.survey_title}}</view>
			<view class="test-range">问卷范围：{{exam.party_name}}</view>
			<view class="clear"></view>
		</view>
		
		<view v-if="survey_info">
			<view class="question-list" v-for="(item,index) in survey_info">
				<view class="question-title">{{index+1}}.{{item.questions_title}}（{{item.questions_type}}）</view>
				<view class="question-answer">
					<view v-if="item.questions_type=='多选'">
						<view v-for="(val,key) in item.questions_item" >
							<view class="question-answer-list" @click="answerClick(item.questions_id,key,'checkbox',index)">
								<view class="answer-list-check">
									<view v-if="val.checked==true" class='answer-check-true'></view>
									<view v-else class='answer-check-false'></view>
								</view>
								<view class="answer-list-text">{{val.text}}</view>
							</view>
						</view>
					</view>
					<view v-else>
						<radio-group>
							<label class="radio" v-for="(val,key) in item.questions_item" @click="answerClick(item.questions_id,key,'radio')">
								<view class="question-answer-list">
									<radio class="answer-list-check" style="transform:scale(0.7)" color="#e93a30"/>
									<view class="answer-list-text">{{val}}</view>
								</view>
							</label>
						</radio-group>
					</view>
					<view style="color:red">
						{{item.desc}}
					</view>
				</view>
			</view>
			<view class="footer"></view>
			<view class="form-btn" @click="subAnswer()" v-if="status==0">提交</view>
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
				survey_info:[],
				exam:'',
				selectKey:[],
				survey_id:'',
				status:'',
				is_have:'',
			}
		},
		onLoad(e) {
			uni.showLoading();
			var t=this;
			t.survey_id=e.id;
			t.status=e.status;
			var data={
				survey_id:t.survey_id,
				status:t.status,
				communist_no:t.globalData.userInfo.communist_no,
			}
			t.urlRequest.urlRequest(t.func.getSurveyInfo,data,function(res){
				t.is_have=res.data.is_have;
				if(t.is_have==true && t.status==0){
					uni.showToast({
						title: "您已提交过问卷",
						duration: 2000,
						icon:'none', 
						success:function(){
							setTimeout(function(){
								uni.navigateTo({
									url: "../index1/survey"
								})
							},2000)
						}
					});
				}else{
					t.survey_info=res.data.survey_info.questions_list;
					if(t.status==1){
						for (var i = 0; i < t.survey_info.length; i++) {
							var question=t.survey_info[i]['item']
							var desc='';
							var count=0;
							var content='';
							if(question){
								for (var j=0;j<question.length;j++) {
									count=(count)*1+(question[j]['count'])*1;
									content+=question[j]['count']+'人选'+question[j]['answer_item']+' ';
								}
								desc='本选项总计有效票数'+count+'票，其中'+content;
							}
							t.survey_info[i]['desc']=desc;
						}
					}
					
					t.exam=res.data.survey_info.survey_info;
				}
				
				uni.hideLoading();
			})
			
		},
		methods: {
			answerClick:function(questions_id,key,type,index){	
				var t=this;
				var select='';
				var nowSelect=[];
				if(key==0){
					select="A";
				}else if(key==1){
					select="B";
				}else if(key==2){
					select="C";
				}else if(key==3){
					select="D";
				}else if(key==4){
					select="E";
				}else if(key==5){
					select="F";
				}else if(key==6){
					select="G";
				}else if(key==7){
					select="H";
				}						
				if(t.selectKey.length<=0){
					if(type=='checkbox'){
						t.survey_info[index]['questions_item'][key]['checked']=t.survey_info[index]['questions_item'][key]['checked']==true?false:true;
					}
					nowSelect={questions_id:questions_id,select:select};
					t.selectKey.push(nowSelect);
				}else{
					var list=t.selectKey;
					var is_have=false;
					if(type=='radio'){
						// 单选
						for(var i=0;i<list.length;i++){
							if(list[i]['questions_id']==questions_id){
								list[i]={questions_id:questions_id,select:select};
								is_have=true;
							}
						}
						if(is_have==false){
							nowSelect={questions_id:questions_id,select:select};
							t.selectKey.push(nowSelect);
						}
					}else{
						//多选
						t.survey_info[index]['questions_item'][key]['checked']=t.survey_info[index]['questions_item'][key]['checked']==true?false:true;
						for(var i=0;i<list.length;i++){
							//如果题目已经选择
							if(list[i]['questions_id']==questions_id){
								if(list[i]['select'].length<=0){
									list.splice(i,1);
									// 判断当前是否已选答案，当无答案时
									
									nowSelect={questions_id:questions_id,select:select};
									t.selectKey.push(nowSelect);
									is_have=true;
								}else{
									//当有答案时判断所选答案是否存在
									var arr=list[i]['select'].split(',');
									for(var j=0;j<arr.length;j++){
										if(arr[j]==select){
											// 如果选项已经存在则删除
											arr.splice(j,1);
											is_have=true;
											select=arr.join(',');
											//判断删除后是否有数据，没有的话删除数组
											if(select==''){
												list.splice(i,1);
											}else{
												nowSelect={questions_id:questions_id,select:select};
												list[i]=nowSelect;
											}
											
										}
									}
									if(is_have==false){
										arr.push(select);
										select=arr.join(',');
										nowSelect={questions_id:questions_id,select:select};
										list[i]=nowSelect;
										is_have=true;
									}
								}
							}
						}

						if(is_have==false){
							nowSelect={questions_id:questions_id,select:select};
							list.push(nowSelect);
							is_have=true;
						}
						
					}
				}
			},
			subAnswer:function(e){
				var t=this;
				if(t.survey_info.length!=t.selectKey.length){
					uni.showModal({
						title: '提示',
						content: '您还有未选择的题目，确定提交吗？',
						success: function (res) {
							if (res.confirm) {
								t.submitContent()
							} else if (res.cancel) {
								console.log('取消');
							}
						}
					});
				}else{
					t.submitContent()
				}
				
			},
			submitContent:function(){
				var t=this;
				var arr='';
				var list=t.selectKey;
				uni.showLoading();
				for(var i=0;i<list.length;i++){
					list[i]=JSON.stringify(list[i])
				}
				
				var data={
					survey_id:t.survey_id,
					communist_no:t.globalData.userInfo.communist_no,
					answer_list:list.join('|',list)
				}
				t.urlRequest.urlRequest(t.func.setSurvey,data,function(res){
					if(res.data.status==1){
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon:'none', 
							success:function(){
								setTimeout(function(){
									uni.navigateTo({
										url: "../index1/survey"
									})
								},2000)
							}
						});
					}else{
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon:'none', 
						});
					}
					
					uni.hideLoading();
				})
			}
		}
	}
</script>

<style>
	page{background:#f3f3f3;}
	.test-list{width: 94%;border-radius: 10upx;padding: 15upx 3%;margin:auto;background: #fff;margin-top: 20upx;}
	.test-title{width: 100%;font-size: 14px;font-weight: bold;line-height: 50upx;}
	.test-range,.test-point,.test-time,.test-end{font-size: 14px;line-height: 40upx;}
	.test-info{width: 60%;float: left;}
	.question-list{width: 94%;margin:20upx auto;background: #fff;border-radius: 10upx;padding: 15upx 25upx;}
	.question-title{line-height: 50upx;font-size: 14px;font-weight: bold;}
	.question-answer{width: 100%;}
	.question-answer-list{min-height: 70upx;line-height:40upx;border: 1px solid #e8e8e8;margin: 20upx 10upx;padding: 10upx 20upx;border-radius: 10upx;display: flex;}
	.answer-list-check{flex: 1;}
	.answer-check-true{height:34upx;width: 34upx;margin:8upx auto;background: #e93a30;text-align: center;line-height: 34upx;color: #fff;border-radius:17upx;}
	.answer-check-false{height:34upx;width: 34upx;margin:8upx auto;border: 1px solid #e8e8e8;border-radius:17upx;}
	.answer-list-text{flex: 10;padding-left: 10upx;padding-top: 6upx;}
</style>
