<template>
	<view class="content">
		<form @submit="formSubmit" @reset="formReset">
			<view class="form-item">
				<textarea value="" placeholder="请输入申请帮扶事由" name="difficulty_content"/>
			</view>
			<view class="middle-line"></view>
			<view class="form-item">
				<view class="list-item">
					<view class="item-text">附件</view>
					<view class="item-input">
						<view ref="input" class="input" style="color: #777;text-align: left;">当前已选 {{file_num}} 附件</view>
						<view @tap="uploadBtn">
							<view class="icon iconfont">请选择 &#xe61f;</view>
						</view>
					</view>
				</view>
				<view class="form-item">
					<view class="file-list" v-for="item in file_select">
						<view class="file-name">{{item.upload_source}}</view>
						<view class="file-del icon iconfont" @click="fileDel(item.upload_id)">&#xe60c;</view>
					</view>
				</view>
			</view>
			
			<button class="form-btn" formType="submit">提交</button>
		</form>
	</view>
</template>

<script>
	var  graceChecker = require("@/common/graceChecker.js");
	export default {
		data() {
			return {
				info:[],
				
				file_select:[],
				file_num:0,
			}
		},
		onReady() {
		}, 
		mounted() {
			// #ifdef H5
			var input = document.createElement('input')
			input.style.display = 'none'
			input.type = 'file'
			input.id = 'file';
			var _this = this;
			this.$refs.input.$el.appendChild(input);
			input.onchange = (event) => {
				var file = event.target.files[0];
				//上传方法
				_this.uploadAPI(file)
			}
			// #endif
		},
		onLoad() {
			var t=this;
			//获取类型
			t.urlRequest.urlRequest(t.func.workLogList,'',function(res){
				t.cate=res.data.worklog_list;
			})
		},
		methods: {
			fileDel:function(id){
				var t=this;
				for(var i=0;i<t.file_select.length;i++){
					if(id==t.file_select[i]['upload_id']){
						t.file_select.splice(i,1);
						t.file_num--;
					}
				}
			},
			uploadBtn() {
				var t=this;
				// #ifdef H5
					return document.getElementById("file").click();
				// #endif
				
				// #ifdef MP-WEIXIN
					wx.chooseMessageFile({
						count:1,
						type:'all',
						success:function(e){
							uni.uploadFile({
								url: t.func.openUploud, 
								filePath: e.tempFiles[0]['path'],
								name: 'file',
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								success: function (res) {
									var data=JSON.parse(res.data); //上传成功
									console.log(data);
									if(data.status==1){
										t.file_select.push(data);
										t.file_num++;
									}
								}
							});
						}
					})
				// #endif
			},
			uploadAPI(path){
				var t=this;
				uni.showLoading();
				var fData = new FormData();
				fData.append("file",path);
				var xhr = new XMLHttpRequest();
				xhr.open("POST",t.func.openUploud, true);
				xhr.onload = function(e) {
					var data=JSON.parse(e.currentTarget.response); //上传成功
					if(data.status==1){
						t.file_select.push(data);
						t.file_num++;
					}
					uni.hideLoading();
				};
				xhr.send(fData)
				
			},
			selectPeople:function(){
				var t=this;
				uni.navigateTo({
					url: "work-plan-people?&workplan_executor_man="+t.worklog_audit_man
				})
			},
			bindCateChange:function(e){
				var t=this;
				var index= e.target.value;
				t.selectCate=t.cate[index]['type_name'];
				t.cateIndex=index;
				t.cateIndexSelect=t.cate[index]['type_no'];
			},
			formSubmit:function(e){
				var t=this;
				var formdata=e.detail.value;
				//定义表单规则         
				var rule = [
					{name:"difficulty_content", checkType : "notnull", checkRule:"",  errorMsg:"请输入申请帮扶事由"},
				];
				//进行表单检查
				var checkRes = graceChecker.check(formdata, rule);
				if(!checkRes){
					uni.showToast({ title: graceChecker.error, icon: "none" });
					return;
				}
				
				formdata['communist_no']=t.globalData.userInfo.communist_no;
				
				var file_ids='';
				for(var i=0;i<t.file_select.length;i++){
					if(file_ids==''){
						file_ids=t.file_select[i]['upload_id'];
					}else{
						file_ids=file_ids+','+t.file_select[i]['upload_id'];
					}
				}
				formdata['help_img']=file_ids;
				
				t.submitContent(formdata)
			},
			submitContent:function(formdata){
				var t=this;
				t.urlRequest.urlRequest(t.func.setHelp,formdata,function(res){
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
	.item-input{flex: 4;height: 100upx;display: flex;}
	.item-input input{flex: 5;height: 100upx;font-size: 14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
	.item-input view{flex: 2;line-height: 100upx;text-align: right;color: red;}
	textarea{width: 96%;padding: 10upx;font-size: 14px;}
	.file-list{padding: 20upx 0;display: flex;width: 100%;color: #B3B3B3;}
	.file-name{flex: 4;overflow: hidden;}
	.file-del{flex: 1;text-align: center;}
</style>
