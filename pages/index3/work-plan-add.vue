<template>
	<view class="content">
		<form @submit="formSubmit" @reset="formReset">
			<view class="form-item">
				<view class="list-item">
					<view class="item-text">计划标题</view>
					<view class="item-input">
						<input type="text" name="workplan_title" placeholder="请输入工作计划标题" />
					</view>
				</view>
				<view class="list-item">
					<view class="item-text">执行人</view>
					<view class="item-input">
						<input type="text" :value="workplan_executor_man_txt" placeholder="请选择执行人" disabled @click="selectPeople()"/>
						<input type="text" :value="workplan_executor_man" name="workplan_executor_man" style="display: none;"/>
					</view>
				</view> 
				<view class="list-item">
					<view class="item-text" style="flex:2">开始日期</view>
					<view class="item-input" style="flex:2">
						<picker mode="date" :value="date1" :start="startDate" :end="endDate" @change="bindDateChange1">
							<input type="text" name="workplan_expectstart_time" :value="date1" placeholder="请选择开始时间" disabled/>
						</picker>
					</view>
					<view class="item-text" style="flex:2">具体时间</view>
					<view class="item-input" style="flex:2">
						<picker mode="time" :value="time1" @change="bindTimeChange1">
							<input name="time1" v-if="time1" :value="time1"  disabled/>
							<input name="time1" v-else placeholder="具体时间" disabled/>
						</picker>
					</view>
				</view>
				<view class="list-item">
					<view class="item-text" style="flex:2">结束日期</view>
					<view class="item-input" style="flex:2">
						<picker mode="date" :value="date2" :start="startDate" :end="endDate" @change="bindDateChange2">
							<input type="text" name="workplan_expectend_time" :value="date2" placeholder="请结束开始时间" disabled/>
						</picker>
					</view>
					<view class="item-text" style="flex:2">具体时间</view>
					<view class="item-input" style="flex:2">
						<picker mode="time" :value="time2" @change="bindTimeChange2">
							<input name="time2" v-if="time2" :value="time2"  disabled/>
							<input name="time2" v-else placeholder="具体时间" disabled/>
						</picker>
					</view>
				</view>
			</view>
			<view class="middle-line"></view>
			<view class="form-item">
				<textarea value="" placeholder="请输入工作计划内容" name="workplan_content"/>
			</view>
			<view class="middle-line"></view>
			<view class="form-item">
				<textarea value="" placeholder="备注" name="memo"/>
			</view>
			<button class="form-btn" formType="submit">提交</button>
		</form>
	</view>
</template>

<script>
	import onfire from '../../static/js/onfire.js';
	var  graceChecker = require("@/common/graceChecker.js");
	function getDate(type) {
		const date = new Date();
	
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
	export default {
		data() {
			return {
				info:[],
				date1: getDate({
					format: true
				}),
				date2: getDate({
					format: true
				}),
				startDate:getDate('start'),
				endDate:getDate('end'),
				workplan_executor_man:'',
				workplan_executor_man_txt:'',
				time1: '08:01',
				time2: '20:01',
			}
		},
		onReady() {
			const t=this;
			var eventObj = onfire.on('work_plan', function (data) {
				console.log(data)
				t.workplan_executor_man=data['communist_no']
				t.workplan_executor_man_txt=data['communist_name']
			});
		},
		onLoad() {
			var t=this;
		},
		methods: {
			bindTimeChange1: function(e) {
				this.time1 = e.target.value
			},
			bindTimeChange2: function(e) {
				this.time2 = e.target.value
			},
			bindDateChange1: function(e) {
				this.date1 = e.target.value
			}, 
			bindDateChange2: function(e) {
				this.date2 = e.target.value
			}, 
			selectPeople:function(){
				var t=this;
				uni.navigateTo({
					url: "work-plan-people?&workplan_executor_man="+t.workplan_executor_man
				})
			},
			bindCateChange:function(e){
				var t=this;
				var index= e.target.value;
				t.selectCate=t.cate[index]['template_name'];
				t.cateIndex=index;
				t.cateIndexSelect=t.cate[index]['template_no'];
			},
			formSubmit:function(e){
				var t=this;
				var formdata=e.detail.value;
				//定义表单规则         
				var rule = [
					{name:"workplan_title", checkType : "notnull", checkRule:"",  errorMsg:"请输入标题"},
					{name:"workplan_executor_man", checkType : "notnull", checkRule:"",  errorMsg:"请选择执行人"},
					{name:"workplan_expectstart_time", checkType : "notnull", checkRule:"",  errorMsg:"请选择开始时间"},
					{name:"workplan_expectend_time", checkType : "notnull", checkRule:"",  errorMsg:"请选择结束时间"},
					{name:"workplan_content", checkType : "notnull", checkRule:"",  errorMsg:"请输入工作计划内容"},
				];
				//进行表单检查
				var checkRes = graceChecker.check(formdata, rule);
				if(!checkRes){
					uni.showToast({ title: graceChecker.error, icon: "none" });
					return;
				}
				
				formdata['workplan_expectstart_time']=formdata['workplan_expectstart_time']+" "+formdata['time1']+":00";
				formdata['workplan_expectend_time']=formdata['workplan_expectend_time']+" "+formdata['time2']+":00";
				
				formdata['communist_no']=t.globalData.userInfo.communist_no;
				formdata['workplan_arranger_man']=t.globalData.userInfo.communist_no;
				console.log(formdata);
				t.submitContent(formdata)
			},
			submitContent:function(formdata){
				var t=this;
				t.urlRequest.urlRequest(t.func.setOaWorkplan,formdata,function(res){
					if(res.data.status==1){
						uni.showToast({
							title: '提交成功!',
							duration: 2000,
							icon:'none',
							success:function(){
								setTimeout(function(){
									uni.switchTab({
										url: "index"
									})
								},2000)
							}
						});
					}
				})
			}
		}
	}
</script>

<style>
	.form-item{width: 96%;margin: auto;}
	.list-item{width: 100%;display: flex;height: 100upx;border-bottom: 1px solid #e8e8e8;}
	.list-item:last-child{border: 0upx;}
	.item-text{flex: 1;height: 100upx;line-height: 100upx;color: #B3B3B3;}
	.item-input{flex: 4;height: 100upx;}
	.item-input input{height: 100upx;width: 100%;font-size: 14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
	textarea{width: 96%;padding: 10upx;font-size: 14px;}
</style>
