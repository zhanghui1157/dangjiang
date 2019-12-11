<template>
	<view class="content">
		<view class="main-content">
			<view v-if="list">
				<view class="list-item" v-for="item in list" @click="zhuangtiList(item.topic_id)">
					<view class="item-img">
						<image :src="item.img_url" mode=""></image>
					</view>
					<view class="item-title">{{item.topic_title}}</view>
				</view>
			</view>
			<view v-else class="no-data">
				<view class="no-data-icon icon iconfont">&#xe642;;</view>
				<view class="no-data-text">暂无数据</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
			}
		},
		onLoad(e) {
			uni.showLoading();
			var t=this;
			t.urlRequest.urlRequest(t.func.zhuantiList,'',function(res){
				var data=res.data.data;
				for (var i = 0; i < data.length; i++) {
					if(data[i]['img_url']!=null){
						data[i]['img_url']=t.sta.sitebase+data[i]['img_url'];
					}else{
						data[i]['img_url']='../../static/img/logo.jpg';
					}
					t.list.push(data[i]);
				}
				uni.hideLoading();
			})
		},
		methods: {
			zhuangtiList:function(id){
				uni.navigateTo({
					url: '../zhuanti/zhuanti-list?id='+id
				})
			}
		}
	}
</script>

<style>
	page{background: #f3f3f3;}
	.list-item{width: 95%;padding: 10upx;margin:20upx auto;background: #fff;border-radius: 10upx;}
	.item-img{width: 100%;height: 280upx;}
	.item-img image{height: 100%;width: 100%;border-radius: 10upx;}
	.item-title{width: 100%;height: 60upx;line-height: 60upx;}
</style>
