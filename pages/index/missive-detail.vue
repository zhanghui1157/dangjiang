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
						<input type="text" :value="detail.missive_receiver" disabled />
					</view>
				</view>
				<view class="list-item">
					<view class="item-text">抄送</view>
					<view class="item-input">
						<input type="text" :value="detail.missive_cc" disabled />
					</view>
				</view>
				<view class="list-item">
					<view class="item-text">标题</view>
					<view class="item-input">
						<input type="text" name="" :value="detail.missive_title" disabled/>
					</view>
				</view>
			</view>
			
			<view class="middle-line"></view>
			<view class="form-item" v-if="detail.file">
				<view class="file-title">附件</view>
				<view class="file-list" v-for="item in detail.file">
					<view class="file-name">{{item.upload_source}}</view>
					<view class="file-size">{{item.upload_size}}</view>
					<view class="file-del icon iconfont" @click="download(item.upload_path)">&#xe645;</view>
				</view>
			</view>
			
			<view class="middle-line"></view>
			<view class="form-item" style="padding: 10upx 0;">
				<rich-text :nodes="detail.missive_content"></rich-text>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:[],
				detail:[],
			}
		},
		onLoad(e) {
			var t=this;
			t.urlRequest.urlRequest(t.func.getDangDetail,{communist_no:t.globalData.userInfo.communist_no},function(res){
				t.info=res.data.info;
			})
			
			t.urlRequest.urlRequest(t.func.getOamissiveDetail,{missive_no:e.missive_no},function(res){
				t.detail=res.data;
				if(t.detail.file){
					for(var i=0;i<t.detail.file.length;i++){
						t.detail.file[i]['upload_path']=t.sta.siteroot+'/uploads/'+t.detail.file[i]['upload_path'];
					}
				}
			})
		},
		methods: {
			download(index) {
				var _this = this
				uni.downloadFile({
					url: index, //仅为示例，并非真实的资源
					success: (res) => {
						var path = res.tempFilePath
						console.log(path);
						if (res.statusCode === 200) {
							// preview
							uni.openDocument({
								filePath: path,
								success: function(res) {
									console.log('打开文档成功');
								}
							});
							//文件保存
							uni.saveFile({
								tempFilePath: path,
								success: function(res) {
									var savedFilePath = res.savedFilePath;
									console.log(savedFilePath)
									uni.showToast({
										title: '下载成功',
										content: savedFilePath,
										duration: 500
									});
									uni.getSavedFileList({
										success: function(res) {
										}
									});
								}
							});
						}
					}
				});
			},
		}
	}
</script>

<style>
	.list-item{width: 100%;display: flex;height: 100upx;border-bottom: 1px solid #e8e8e8;}
	.list-item:last-child{border: 0upx;}
	.item-text{flex: 2;height: 100upx;line-height: 100upx;color: #B3B3B3;}
	.item-input{flex: 8;height: 100upx;}
	.item-input input{height: 100upx;width: 100%;font-size: 14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
	.form-item{width: 94%;margin: auto;}
	.file-title{line-height: 50upx;font-weight: bold;}
	.file-list{padding: 20upx 0;display: flex;width: 100%;color: #B3B3B3;border-bottom: 1px solid #e8e8e8;}
	.file-list:last-child{border: 0upx;}
	.file-name{flex: 4;overflow: hidden;}
	.file-size{flex: 2;overflow: hidden;text-align:center;}
	.file-del{flex: 1;text-align: center;text-align:center;}
</style>
