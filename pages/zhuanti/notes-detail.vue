<template>
	<view class="content">
		<view class="main-content">
			<view class="help-title">{{detail.notes_title}}</view>
			<view class="detail-info">
				<view class="help-time" style="text-align:left">{{detail.notes_type}}</view>
				<view class="help-time" style="text-align:right">{{detail.add_time}}</view>
			</view>
			<view class="detail-line"></view>
			<view class="help-content">
				<rich-text :nodes="detail.notes_content"></rich-text>
			</view>
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
			var notes_id=e.id;
			var data={
				communist_no:t.globalData.userInfo.communist_no,
				notes_id:notes_id,
			}
			//获取详情
			t.urlRequest.urlRequest(t.func.notesDetail,data,function(res){
				t.detail=res.data.notes_info;
				var richtext=  t.detail.notes_content;
				const regex = new RegExp('<img', 'gi');
				richtext= richtext.replace(regex, `<img style="max-width: 100%;"`);
				t.detail.notes_content=richtext;
			})
		},
		methods: {
			
		}
	}
</script>

<style>
	.help-title{font-size: 14px;font-weight: bold;text-align: center;line-height: 50upx;width: 100%;padding: 10upx 0;}
	.help-time{font-size: 12px;color: #B3B3B3;width: 100%;text-align:center;}
	.help-content{margin: 20upx 0;}
	.detail-info{width: 100%;display: flex;justify-content: space-between;}
	.detail-line{width: 100%;height: 1px;border-bottom:1px solid #e8e8e8;margin-top: 10upx;}
</style>
