<template>
	<view class="content">
		<view class="report-head">
			<view class="report-left">
				<view class="report-title">{{detail.notice_title}}</view>
				<view class="report-checker">发布人:{{detail.add_communist}}</view>
				<view class="report-checker">发布时间:{{detail.add_time}}</view>
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
		<view class="report-content">
			<rich-text :nodes="detail.notice_content"></rich-text>
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
			t.urlRequest.urlRequest(t.func.getNoticeInfo,{notice_id:e.id,communist_no:t.globalData.userInfo.communist_no},function(res){
				t.detail=res.data.notice_info
				if(t.detail.file){
					for(var i=0;i<t.detail.file.length;i++){
						t.detail.file[i]['upload_path']=t.sta.siteroot+'/uploads/'+t.detail.file[i]['upload_path'];
					}
				}
			})
			uni.hideLoading();
		},
		methods: {
			download(index) {
				var _this = this
				uni.downloadFile({
					url: index, 
					success: (res) => {
						var path = res.tempFilePath
						if (res.statusCode === 200) {
							// preview
							uni.openDocument({
								filePath: path,
								success: function(res) {
									console.log('打开文档成功');
									console.log(res);
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
											console.log(res.fileList);
										}
									});
								}
							});
						}
					}
				});
			},
			activeDetail:function(id){
				uni.navigateTo({
					url: '../index1/active-detail?id='+id
				})
			},
		}
	}
</script>

<style>
	.report-head{width: 100%;display: flex;}
	.report-left{flex: 5;padding: 20upx;line-height: 50upx;}
	.report-title{font-weight: bold;}
	.report-checker{font-size: 12px;color: #B3B3B3;}
	.report-right{flex: 1.5;padding: 20upx;font-size: 12px;color: red;}
	.report-time{width: 100%;text-align: center;line-height: 50upx;}
	.report-type{padding: 10upx;text-align: center;line-height: 20upx;background: red;border-radius: 10upx;color: #fff;}
	.report-content{padding: 20upx;}
	
	.form-item{width: 96%;margin: auto;}
	.file-title{line-height: 50upx;font-weight: bold;}
	.file-list{padding: 20upx 0;display: flex;width: 100%;color: #B3B3B3;border-bottom: 1px solid #e8e8e8;}
	.file-list:last-child{border: 0upx;}
	.file-name{flex: 4;overflow: hidden;}
	.file-size{flex: 2;overflow: hidden;text-align:center;}
	.file-del{flex: 1;text-align: center;text-align:center;}
</style>
