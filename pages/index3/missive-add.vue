<template>
	<view class="content">
		<form @submit="formSubmit" @reset="formReset">
			<view class="form-item">
				<view class="list-item">
					<view class="item-text">发起人</view>
					<view class="item-input">
						<input type="text" :value="info.communist_name" placeholder="" disabled/>
					</view>
				</view>
				<view class="list-item">
					<view class="item-text">收件人</view>
					<view class="item-input">
						<input type="text" :value="missive_receiver_txt" placeholder="请选择收件人" disabled @click="selectPeople('missive_receiver',missive_receiver)"/>
						<input type="text" :value="missive_receiver" name="missive_receiver_no" style="display: none;"/>
					</view>
				</view>
				<view class="list-item">
					<view class="item-text">抄送</view>
					<view class="item-input">
						<input type="text" :value="missive_cc_txt" placeholder="请选择抄送人" disabled @click="selectPeople('missive_cc',missive_cc)"/>
						<input type="text" :value="missive_cc" name='missive_cc' placeholder="请选择抄送人" style="display: none;">
					</view>
				</view>
				<view class="list-item">
					<view class="item-text">标题</view>
					<view class="item-input">
						<input type="text" name="missive_title" value="" placeholder="请填写公文标题"/>
					</view>
				</view>
				<view class="list-item" style="border: none;">
					<view class="item-text">审批模板</view>
					<view class="item-input">
						<picker @change="bindCateChange" :range="cate" range-key="template_name">
							<input :value="selectCate" placeholder="请选择审批模板" disabled/>
						</picker>
						<input :value="cateIndexSelect" name="template_no" style="display: none;"/>
					</view>
				</view>
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
			<view class="middle-line"></view>
			<view class="form-item">
				<textarea value="" placeholder="编辑你的公文内容" name="missive_content"/>
			</view>
			<button class="form-btn" formType="submit">提交</button>
		</form>
	</view>
</template>

<script>
	import onfire from '../../static/js/onfire.js';
	var  graceChecker = require("@/common/graceChecker.js");
	export default {
		data() {
			return {
				info:[],
				cate:[],
				selectCate:'',
				cateIndex:'',
				cateIndexSelect:'',
				missive_receiver:'',
				missive_receiver_txt:'',
				missive_cc:'',
				missive_cc_txt:'',
				file_select:[],
				file_num:0,
			}
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
		onReady() {
			const t=this;
			var eventObj = onfire.on('missive_receiver', function (data) {
				t.missive_receiver=data[0]
				t.missive_receiver_txt=data[1]
			});
			var eventObj = onfire.on('missive_cc', function (data) {
				t.missive_cc=data[0]
				t.missive_cc_txt=data[1]
			});
		},
		onLoad() {
			var t=this;
			t.urlRequest.urlRequest(t.func.getDangDetail,{communist_no:t.globalData.userInfo.communist_no},function(res){
				t.info=res.data.info;
			})
			
			t.urlRequest.urlRequest(t.func.getTemplateList,'',function(res){
				t.cate=res.data.template_list;
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
				xhr.open("POST",t.func.openUploud , true);
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
			selectPeople:function(key,content){
				uni.navigateTo({
					url: "people-list?key="+key+'&content='+content,
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
					{name:"missive_receiver_no", checkType : "notnull", checkRule:"",  errorMsg:"请选择收件人"},
					{name:"missive_title", checkType : "notnull", checkRule:"",  errorMsg:"请输入标题"},
					{name:"template_no", checkType : "notnull", checkRule:"",  errorMsg:"请选择模板"},
					{name:"missive_content", checkType : "notnull", checkRule:"",  errorMsg:"请输入内容"},
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
				formdata['missive_attach']=file_ids;
				t.submitContent(formdata)
			},
			submitContent:function(formdata){
				var t=this;
				t.urlRequest.urlRequest(t.func.setOamissive,formdata,function(res){
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
	.item-text{flex: 2;height: 100upx;line-height: 100upx;color: #B3B3B3;}
	.item-input{flex: 8;height: 100upx;display: flex;}
	.item-input input{flex: 5;height: 100upx;font-size: 14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
	.item-input view{flex: 2;line-height: 100upx;text-align: right;color: red;}
	textarea{width: 96%;padding: 10upx;font-size: 14px;}
	.file-list{padding: 20upx 0;display: flex;width: 100%;color: #B3B3B3;}
	.file-name{flex: 4;overflow: hidden;}
	.file-del{flex: 1;text-align: center;}
</style>
