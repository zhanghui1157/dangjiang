<template>
	<view>
		<view class="content">
			<view class="main-content">
				<form @submit="formSubmit" @reset="formReset">
					<view class="idcard">
						<input name="idnumber" placeholder="请输入身份证号码"/>
					</view>
					<button class="login-btn" formType="submit">登录</button>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	var  graceChecker = require("@/common/graceChecker.js");
	export default {
		data() {
			return {
				idcard:'',
			}
		},
		methods: {
			doLogin:function(){
				var t=this;
				if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(t.idcard))){
					uni.showToast({
						title: '身份证号码错误',
						duration: 2000,
						icon:'none'
					});
					return false;
				}
				t.submitContent()
			},
			formSubmit:function(e){
				var t=this;
				var formdata=e.detail.value;
				//定义表单规则         
				var rule = [
					{name:"idnumber", checkType : "notnull", checkRule:"",  errorMsg:"身份证号码不能为空"},
				];
				//进行表单检查
				var checkRes = graceChecker.check(formdata, rule);
				if(!checkRes){
					uni.showToast({ title: graceChecker.error, icon: "none" });
					return;
				}
				
				t.submitContent(formdata)
			},
			submitContent:function(formdata){
				var t=this;
				t.urlRequest.urlRequest(t.func.userLogin,formdata,function(login_res){
					if(login_res.data.status==1){
						uni.showToast({
							title: login_res.data.msg,
							duration: 2000,
							icon:'none',
							success:function(){
								var data={
									idcard:t.idcard,
									party_no:login_res.data.party_no,
									communist_no:login_res.data.communist_no,
								}
								uni.setStorage({
									key: 'user_info',
									data:data,
									success: (res) => {
										uni.getStorage({
											key: 'user_info',
											success: function (res) {
												t.globalData.userInfo=res.data;
												setTimeout(function(){
													uni.switchTab({
														url: "/pages/index/index"
													})
												},2000)
											}
										});
									},
									fail: () => {
										uni.showToast({
											title: '本地存储失败！',
											duration: 2000,
											icon:'none',
										});
									}
								})
								
							}
						});
					}else{
						uni.showToast({
							title: login_res.data.msg,
							duration: 2000,
							icon:'none',
						});
					}
				})
			}
		}
	}
</script>

<style>
	.idcard{width: 100%;margin:30upx 0;}
	input{height: 80upx;line-height: 80upx;font-size: 14px;border-bottom: 1upx solid #f0eded;}
	.login-btn{width: 100%;background: #e93a30;color: #fff;height: 80upx;line-height: 80upx;text-align: center;border-radius: 10upx;margin-top: 80upx;}
</style>
