<template>
	<view class="content">
		<form @submit="formSubmit" @reset="formReset">
			<view class="main-content">
				<view class="notes-input">
					<view class="notes-text">笔记类型</view>
					<view class="notes-input">
						<picker @change="bindCateChange" :range="cate" range-key="type_name">
							<input :value="selectCate" placeholder="请选择笔记类型" disabled/>
						</picker>
						<input type="text" value="" name="notes_type" :value="cateIndexSelect" style="display: none;"/>
					</view>
				</view>
				<view class="notes-input">
					<view class="notes-text">笔记标题</view>
					<view class="notes-input">
						<input type="text" name="notes_title" placeholder="请输入笔记标题"/>
					</view>
				</view>
				<view class="notes-textarea">
					<textarea name="notes_content" placeholder="请输入笔记内容"></textarea>
				</view>
			</view>
			<button class="form-btn" formType="submit">保存</button>
		</form>
	</view>
</template>

<script>
	var  graceChecker = require("@/common/graceChecker.js");
	export default { 
		data() {
			return {
				detail:[],
				cate:[],
				selectCate:'',
				cateIndex:'',
				cateIndexSelect:'',
			}
		},
		onLoad(e) {
			var t=this;
			t.urlRequest.urlRequest(t.func.getNotesList,'',function(res){
				t.cate=res.data.type_list;
			})
		},
		methods: {
			bindCateChange:function(e){
				var t=this;
				var index= e.target.value;
				t.selectCate=t.cate[index]['type_name'];
				t.cateIndex=index;
				t.cateIndexSelect=t.cate[index]['type_no'];
			},
			formSubmit:function(e){
				var t=this;
				var formdata=e.detail.value;console.log(formdata)
				//定义表单规则
				var rule = [
					{name:"notes_type", checkType : "notnull", checkRule:"",  errorMsg:"请选择笔记类型"},
					{name:"notes_title", checkType : "notnull", checkRule:"",  errorMsg:"请输入笔记标题"},
					{name:"notes_content", checkType : "notnull", checkRule:"",  errorMsg:"请输入笔记内容"}
				];
				//进行表单检查
				var checkRes = graceChecker.check(formdata, rule);
				if(!checkRes){
					uni.showToast({ title: graceChecker.error, icon: "none" });
					return;
				}
				
				formdata['communist_no']=t.globalData.userInfo.communist_no;
				
				t.submitContent(formdata)
			},
			submitContent:function(formdata){
				var t=this;
				t.urlRequest.urlRequest(t.func.setNotes,formdata,function(res){
					if(res.data.status==1){
						uni.showToast({
							title: '提交成功!',
							duration: 2000,
							icon:'none',
							success:function(){
								setTimeout(function(){
									uni.navigateTo({
										url: "../index2/study-log"
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
	.notes-input{width: 100%;display: flex;height: 100upx;border-bottom: 1px solid #e8e8e8;}
	.notes-text{flex: 3;text-align: center;line-height: 100upx;font-size: 14px;}
	.notes-input{flex: 9;}
	input{height: 100upx;font-size: 14px;width: 100%;line-height: 100upx;}
	textarea{width: 100%;padding: 10upx;margin:20upx auto;height: 200upx;border: 1px solid #e8e8e8;border-radius: 10upx;font-size: 14px;}
	.add-btn{height: 80upx;width: 100%;text-align: center;line-height: 80upx;background: #e93a30;color: #fff;font-size: 16px;border-radius:15upx;margin: 100upx auto;}
</style>
