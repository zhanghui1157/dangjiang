<template>
	<view class="content">
		<view class="content-info">
			<view class="log-detail">
				<view class="log-img">
					<image :src="detail.communist_avatar" mode=""></image>
				</view>
				<view class="log-info">
					<view class="log-name">{{detail.communist_name}}</view>
					<view class="log-info-detial">
						<view class="log-info-left">
							<view>出生日期</view>
							<view>身份证号</view>
						</view>
						<view class="log-info-right">
							<view v-if="detail.communist_birthday">{{detail.communist_birthday}}</view>
							<view v-else>未录入</view>
							<view>{{detail.communist_idnumber}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="content-info">
			<view class="log-title">党员发展历程</view>
			<view class="log-list" v-if="list">
				<view class="uni-timeline" style="padding: 30upx 20upx;">
					<view class="uni-timeline-item" v-for="item in list">
						<view class="uni-timeline-item-keynode">{{item.add_time}}</view>
						<view class="uni-timeline-item-divider"></view>
						<view class="uni-timeline-item-content">
							<view>{{item.log_content}}</view>
						</view>
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
				img:[],
				detail:[],
				list:[],
			}
		},
		onLoad(e) {
			var t=this;	
			uni.showLoading();
			t.img[0]=t.sta.sitestatic+'img/dl-icon.png';
			//获取党员头像列表
			t.urlRequest.urlRequest(t.func.developInfo,{communist_no:e.id},function(res){
				t.detail=res.data.communist_info;
				if(t.detail['communist_avatar']){
					t.detail['communist_avatar']=t.sta.siteupload+t.detail['communist_avatar'];
				}else{
					t.detail['communist_avatar']=t.sta.sitestatic+'img/oa_img_head.png';
				}
				t.list=res.data.communist_info.log_list;
				for (var i = 0; i < t.list.length; i++) {
					t.list[i]['add_time']=t.list[i]['add_time'].substring(0,10)
				}
			})
			
			uni.hideLoading();
		},
		methods: {
			
		}
	}
</script>

<style>
	page{background: #f3f3f3;}
	.content-info{width: 96%;margin: 20upx auto;padding: 20upx;background: #fff;border-radius: 10upx;}
	.log-detail{width: 100%;display: flex;}
	.log-img{flex: 1;height: 220upx;padding-right: 20upx;}
	.log-img image{height: 100%;width: 100%;}
	.log-info{flex: 3;}
	.log-name{font-weight: bold;line-height:70upx;font-size: 14px;}
	.log-info-detial{width: 100%;display: flex;color: #B3B3B3;line-height:70upx}
	.log-info-left{flex: 1.5;}
	.log-info-right{flex: 3;}
	.log-title{width: 100%;padding: 20upx 0;text-align: center;font-weight: bold;}
	.uni-timeline {
		margin: 35upx 0;
		display: flex;
		flex-direction: column;
		position: relative;
	}
	.uni-timeline-item {
		display: flex;
		flex-direction: row;
		position: relative;
		padding-bottom: 20upx;
		box-sizing: border-box;
		overflow: hidden;
	}
	.uni-timeline-item .uni-timeline-item-keynode {
		width: 200upx;
		flex-shrink: 0;
		box-sizing: border-box;
		padding-right: 20upx;
		text-align: right;
		line-height: 105upx;
	}
	.uni-timeline-item .uni-timeline-item-divider {
		flex-shrink: 0;
		position: relative;
		width: 30upx;
		height: 30upx;
		top: 15upx;
		border-radius: 50%;
		background-color: #fec073;
	}
	.uni-timeline-item-divider::before,
	.uni-timeline-item-divider::after {
		position: absolute;
		left: 15upx;
		width: 1upx;
		height: 100vh;
		content: '';
		background: inherit;
	}
	.uni-timeline-item-divider::before {
		bottom: 100%;
	}
	.uni-timeline-item-divider::after {
		top: 100%;
	}
	.uni-timeline-last-item .uni-timeline-item-divider:after {
		display: none;
	}
	
	.uni-timeline-first-item .uni-timeline-item-divider:before {
		display: none;
	}
	
	.uni-timeline-item .uni-timeline-item-content {
		padding-left: 20upx;
	}
	
	.uni-timeline-last-item .bottom-border::after{
		display: none;
	}
	
	.uni-timeline-item-content .datetime{
		color: #CCCCCC;
	}
	
	/* 自定义节点颜色 */
	.uni-timeline-last-item .uni-timeline-item-divider{
		background-color: #fec073;
	}
</style>
