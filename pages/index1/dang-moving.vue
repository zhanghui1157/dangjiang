<template>
	<view class="content">
		<view class="main-content">
			<view v-if="list">
				<view class="dang-list" v-for="item in list">
					<view class="dang-img">
						<image :src="item.communist_avatar" mode=""></image>
					</view>
					<view class="dang-info">
						<view class="dang-name">{{item.communist_name}}</view>
						<view class="dang-partno">{{item.new_party}}</view>
					</view>
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
				list:'',
			}
		},
		onLoad() {
			var t=this;	
			uni.showLoading();
			t.urlRequest.urlRequest(t.func.movingList,{party_no:t.globalData.userInfo.party_no},function(res){
				for (var i = 0; i < res.data.change_list.length; i++) {
					if(res.data.change_list[i]['communist_avatar']){
						res.data.change_list[i]['communist_avatar']=t.sta.sitebase+res.data.change_list[i]['communist_avatar'];
					}else{
						res.data.change_list[i]['communist_avatar']=t.sta.sitestatic+'img/oa_img_head.png';
					}
				}
				t.list=res.data.change_list
			})
			uni.hideLoading();
		},
		methods: {
			goDetail:function(id){
				uni.navigateTo({
					url: 'dang-log-detail?id='+id
				})
			},
		}
	}
</script>

<style>
	.dang-list{width: 100%;display: flex;border-bottom: 1px solid #f0eded;padding: 10upx 0;}
	.dang-img{flex: 1.5;height: 80upx;}
	.dang-img image{height: 100%;width: 80upx;margin: auto;border-radius: 50%;}
	.dang-info{flex: 8;}
	.dang-name{font-weight: bold;line-height: 40upx;}
	.dang-partno{color: #B3B3B3;line-height: 40upx;}
</style>
