<template>
	<view class="content">
		<view class="section-list" v-if="detail.momo">
			<view class="section-title">
				<view class="line-img">
					<image :src="img[4]"></image>
				</view>
				<view class="section-title-text">党委简介</view>
			</view>
			<view class="section-content" style="width: 90%;margin: auto;padding: 10upx 2%;">{{detail.momo}}</view>
		</view>
		<view class="section-list">
			<view class="section-title">
				<view class="line-img">
					<image :src="img[4]"></image>
				</view>
				<view class="section-title-text">党建数据</view>
			</view>
			<view class="section-content">
				<view class="dang-list-item" style="background: #a1e040;">
					<view class="dang-list-item-icon"><image :src="img[0]"></image></view>
					<view class="dang-list-item-text">党员 {{detail.number}} 人</view>
				</view>
				<view class="dang-list-item" style="background: #41beff;">
					<view class="dang-list-item-icon"><image :src="img[1]"></image></view>
					<view class="dang-list-item-text">组织 {{detail.party_number}} 个</view>
				</view>
				<view class="dang-list-item" style="background: #ff8b6a;">
					<view class="dang-list-item-icon"><image :src="img[2]"></image></view>
					<view class="dang-list-item-text">积分 {{detail.point}} 分</view>
				</view>
				<view class="dang-list-item" style="background: #ffc818;">
					<view class="dang-list-item-icon"><image :src="img[3]"></image></view>
					<view class="dang-list-item-text">党费 {{detail.dues_amount}} 元</view>
				</view>
			</view>
		</view>
		<view class="section-list">
			<view class="section-title">
				<view class="line-img">
					<image :src="img[4]"></image>
				</view>
				<view class="section-title-text">谁是党员</view>
				<view class="news-more" @click="dangList()">
					<view class="news-more-text icon iconfont">更多 &#xe63e</view>
				</view>
			</view>
			<view class="people-content">
				<view class="people-list" v-for="item in img_list"><image :src="item.communist_avatar"></image><view>{{item.communist_name}}</view></view>
			</view>
			<view class="clear"></view>
		</view>
		<view class="section-list">
			<view class="section-title">
				<view class="line-img">
					<image :src="img[4]"></image>
				</view>
				<view class="section-title-text">党组织活动</view>
			</view>
			<view class="active-content">
				<view v-if="meeting_list">
					<view class="active-list" v-for="item in meeting_list">
						<view class="active-list-title">{{item.meeting_name}}</view>
						<view class="active-list-time">{{item.add_time}}</view>
					</view>
				</view>
				<view v-else class="no-data" style="padding-bottom: 50upx;">
					<view class="no-data-icon icon iconfont" style="margin-top: 20upx!important;">&#xe642;;</view>
					<view class="no-data-text">暂无活动记录</view>
				</view>
			</view>
		</view>
		<view class="footer"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img:[],
				img_list:[],
				meeting_list:[],
				detail:[],
			}
		},
		onLoad() {
			var t=this;	
			uni.showLoading();
			t.img[0]=t.sta.sitestatic+'img/hr_matrix_people.jpg';
			t.img[1]=t.sta.sitestatic+'img/hr_matrix_organization.jpg';
			t.img[2]=t.sta.sitestatic+'img/hr_matrix_integral.jpg';
			t.img[3]=t.sta.sitestatic+'img/hr_matrix_cost.jpg';
			t.img[4]=t.sta.sitestatic+'img/dl-icon.png';
			//获取党员头像列表
			t.urlRequest.urlRequest(t.func.getDangList,{status:0,pagesize:8,party_no:t.globalData.userInfo.party_no},function(res){
				for (var i = 0; i < res.data.list.length; i++) {
					if(res.data.list[i]['communist_avatar']){
						res.data.list[i]['communist_avatar']=t.sta.siteupload+'/'+res.data.list[i]['communist_avatar'];
					}else{
						res.data.list[i]['communist_avatar']=t.sta.sitestatic+'img/oa_img_head.png';
					}
					t.img_list.push(res.data.list[i]);
				}
			})
			
			//党组织活动
			t.urlRequest.urlRequest(t.func.getMeetingList,{pagesize:9999,party_no:t.globalData.userInfo.party_no},function(res){
				for (var i = 0; i < res.data.list.length; i++) {
					res.data.list[i]['add_time']=res.data.list[i]['add_time'].substring(0,10)
				}
				t.meeting_list=res.data.list;
			})
			
			//党组织详情
			t.urlRequest.urlRequest(t.func.getDanginfo,{party_no:t.globalData.userInfo.party_no},function(res){
				t.detail=res.data;
			})
			uni.hideLoading();
		},
		methods: {
			dangList:function(){
				uni.navigateTo({
					url: '../dang/index'
				})
			},
		}
	}
</script>

<style>
	page{background:#f3f3f3;}
	.section-list{width: 96%;margin:10upx auto;border-radius: 10upx;background: #fff;}
	.section-title{height: 30upx;padding: 20upx 20upx 40upx 20upx;clear: both;}
	.line-img{height: 30upx;width: 10upx;float: left;}
	.line-img image{height: 100%;width: 100%;}
	.momo-content{clear: both;}
	.section-title-text{height: 30upx;float: left;margin-left: 20upx;font-size: 14px;font-weight: bold;line-height: 30upx;color: rgba(252, 152, 118, 1);}
	.section-content{width: 100%;display: flex;justify-content: space-around;padding: 20upx 0;}
	.people-content{width: 90%;margin: auto;margin-bottom: 20upx;}
	.active-content{width: 90%;margin: 20upx 0;margin: auto;}
	.dang-list-item{width: 22%;height: 150upx;border-radius: 10upx;}
	.dang-list-item-icon{height: 80upx;width: 50%;margin:auto;margin-top: 10upx;}
	.dang-list-item-icon image{height: 100%;width: 100%;}
	.dang-list-item-text{width: 100%;line-height: 30upx;text-align: center;color: #fff;font-weight: bold;}
	.news-more{width:20%;float: right;display: flex;justify-content: flex-end;color: #B3B3B3;line-height: 30upx;}
	.news-more-text{font-size: 12px;}
	.people-list{width: 20%;height: 200upx;float: left;margin: 20upx 0;margin-left: 4%;}
	.people-list image{width: 100%;height: 80%;}
	.people-list view{width: 100%;text-align: center;}
	.active-list{width: 100%;margin: 10upx 0;border-bottom: 1px solid #e8e8e8;}
	.active-list:last-child{border:0px;}
	.active-list-title{width: 100%;line-height:50upx}
	.active-list-time{width: 100%;text-align: right;line-height:40upx;color: #B3B3B3;font-size: 12px;padding: 5upx 0;}
</style>
