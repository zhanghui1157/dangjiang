<template>
	<view class="content">
		<view class="list-item" v-for="item in list" @click="volunteerDetail(item.activity_id)">
			<view class="list-title">{{item.activity_title}}</view>
			<view class="list-img">
				<image :src="item.activity_thumb" mode=""></image>
			</view>
			<view class="list-time">{{item.add_time}}</view>
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
		onLoad() {
			var t=this;	
			uni.showLoading();
			
			//列表
			t.urlRequest.urlRequest(t.func.getVolunteerList,{communist_no:t.globalData.userInfo.communist_no},function(res){
				for (var i = 0; i < res.data.activity_list.length; i++) {
					if(res.data.activity_list[i]['activity_thumb']!=null){
						res.data.activity_list[i]['activity_thumb']=t.sta.sitebase+res.data.activity_list[i]['activity_thumb'];
					}else{
						res.data.activity_list[i]['activity_thumb']=t.sta.sitestatic+'img/life_volunteer.jpg';
					}
					t.list.push(res.data.activity_list[i]);
				}
				uni.hideLoading();
			})
			
		},
		methods: {
			volunteerDetail:function(id){
				uni.navigateTo({
					url: '../index/volunteer-detail?id='+id
				})
			},
		}
	}
</script>

<style>
	page{background: #f0f0f0;}
	.list-item{width: 48%;float: left;margin: 20upx 1% 0 1%;border-radius: 10upx;background: #fff;padding:10upx;}
	.list-title{width:96%;line-height: 50upx;margin: auto;font-weight: bold;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
	.list-img{height: 240upx;width: 96%;margin: auto;margin-top: 10upx;}
	.list-img image{width: 100%;height: 100%;border-radius: 10upx;}
	.list-time{width: 96%;text-align: right;font-size: 12px;color: #B3B3B3;margin: 10upx auto;}
</style>
