<template>
	<view class="content">
		<view class="main-content">
			<view class="addr-list" @click="goUrl(1)">
				<view class="addr-detial">
					<view class="addr-point">·</view>
					<view class="addr-detail-text">http://www.fgdjw.gov.cn</view>
				</view>
				<view class="addr-info">中国非公企业党建网站</view>
			</view>
			<view class="addr-list" @click="goUrl(2)">
				<view class="addr-detial">
					<view class="addr-point">·</view>
					<view class="addr-detail-text">http://dj.yinchuan.gov.cn</view>
				</view>
				<view class="addr-info">银川党建网站</view>
			</view>
			<view class="addr-list" @click="goUrl(3)">
				<view class="addr-detial">
					<view class="addr-point">·</view>
					<view class="addr-detail-text">http://www.12371.cn</view>
				</view>
				<view class="addr-info">共产党员网站</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {	
			
		},
		methods: {
			goUrl(num){
				var url=''; 
				if(num==1){
					url='web-page1'
				}else if(num==2){
					url='web-page2'
				}else{
					url='web-page3'
				}
				console.log(url)
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>
<style>
	.addr-list{width: 90%;padding: 10upx 2%;border-radius: 10upx;box-shadow:0px 8px 8px 1px #bbb;margin:50upx auto;}
	.addr-detial{width: 100%;}
	.addr-point{font-size: 50upx;color: #e93a30;float: left;font-weight: bold;line-height: 30upx;}
	.addr-detail-text{font-size: 12px;color: #B3B3B3;float: left;margin-left: 10upx;line-height: 40upx;}
	.addr-info{width: 100%;font-size: 14px;font-weight: bold;line-height: 50upx;clear: both;}

</style>
