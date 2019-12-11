<template>
	<view class="content">
		<view class="user-section">
			<view class="user-bg"></view>
			<view class="user-img">
				<image v-if="info.communist_avatar" :src="info.communist_avatar" mode=""></image>
			</view>
			<view class="user-name">{{info.communist_name}}</view>
			<view class="user-depart">
				<view class="user-depar-detail">{{info.party_no}}</view>
			</view>
			<view class="user-content">
				<view class="user-list">
					<navigator hover-class="none" class="user-list-item" url="/pages/index3/detail">
						<view class="user-list-item-icon icon iconfont">&#xe62d;</view>
						<view class="user-list-item-text">我的信息</view>
					</navigator>
					<navigator hover-class="none" class="user-list-item" url="/pages/index3/integral">
						<view class="user-list-item-icon icon iconfont">&#xe62b;</view>
						<view class="user-list-item-text">我的积分</view>
					</navigator>
					<navigator hover-class="none" class="user-list-item" url="/pages/index3/exam">
						<view class="user-list-item-icon icon iconfont">&#xe660;</view>
						<view class="user-list-item-text">我的考试</view>
					</navigator>
					<navigator hover-class="none" class="user-list-item" url="/pages/index3/meeting">
						<view class="user-list-item-icon icon iconfont">&#xe651;</view>
						<view class="user-list-item-text">我的会议</view>
					</navigator>
				</view>
			</view>
		</view>	
		<view class="section-list">
			<navigator hover-class="none" class="list-item" url="/pages/index3/add-notes">
				<view class="list-icon icon iconfont">&#xe683;</view>
				<view class="list-text">新建笔记</view>
				<view class="list-to-icon icon iconfont">&#xe63e;</view>
			</navigator>
			<navigator hover-class="none" class="list-item" url="/pages/index3/volunteer">
				<view class="list-icon icon iconfont">&#xe72e;</view>
				<view class="list-text">申请志愿者</view>
				<view class="list-to-icon icon iconfont">&#xe63e;</view>
			</navigator>
			<navigator hover-class="none" class="list-item" url="/pages/index3/missive-add">
				<view class="list-icon icon iconfont">&#xe60e;</view>
				<view class="list-text">发起公文</view>
				<view class="list-to-icon icon iconfont">&#xe63e;</view>
			</navigator>
			<navigator hover-class="none" class="list-item" url="/pages/index3/work-plan-add">
				<view class="list-icon icon iconfont">&#xe643;</view>
				<view class="list-text">新增工作计划</view>
				<view class="list-to-icon icon iconfont">&#xe63e;</view>
			</navigator>
			<navigator hover-class="none" class="list-item" url="/pages/index3/day-report">
				<view class="list-icon icon iconfont">&#xe603;</view>
				<view class="list-text">新建日报</view>
				<view class="list-to-icon icon iconfont">&#xe63e;</view>
			</navigator>
			<navigator hover-class="none" class="list-item" url="/pages/index3/notice-add">
				<view class="list-icon icon iconfont">&#xe678;</view>
				<view class="list-text">新建公告</view>
				<view class="list-to-icon icon iconfont">&#xe63e;</view>
			</navigator>
			<navigator hover-class="none" class="list-item" url="/pages/index3/add-help">
				<view class="list-icon icon iconfont">&#xe698;</view>
				<view class="list-text">申请帮扶</view>
				<view class="list-to-icon icon iconfont">&#xe63e;</view>
			</navigator>
		</view>
	</view>
</template>
<script>
	export default {
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
		    return {
		      title: '共享党建',
		      path: '/pages/index/index'
		    }
		},
		data() {
			return {
				info:[],
				img:[],
			}
		},
		onShow(){
			var t=this;
			t.img[0]=t.sta.sitestatic+'img/dl-icon.png';
			//党组织详情
			t.urlRequest.urlRequest(t.func.getDangDetail,{communist_no:t.globalData.userInfo.communist_no},function(res){
				t.info=res.data.info;
				if(t.info['communist_avatar']){
					t.info['communist_avatar']=t.sta.siteupload+'/'+t.info['communist_avatar']
				}
				
			})
		},
		onLoad(e) {
			
			var t=this;
			t.img[0]=t.sta.sitestatic+'img/dl-icon.png';
			//党组织详情
			t.urlRequest.urlRequest(t.func.getDangDetail,{communist_no:t.globalData.userInfo.communist_no},function(res){
				t.info=res.data.info;
				if(t.info['communist_avatar']){
					t.info['communist_avatar']=t.sta.siteupload+'/'+t.info['communist_avatar']
				}
				
			})
		},
		
		onPullDownRefresh() {
			var t=this;
			t.urlRequest.urlRequest(t.func.getDangDetail,{communist_no:t.globalData.userInfo.communist_no},function(res){
				t.info=res.data.info;
				t.info['communist_avatar']=t.sta.siteupload+'/'+t.info['communist_avatar']
				uni.hideLoading();
				uni.stopPullDownRefresh();
			})
			
		},	
		methods: {
			
		}
	}
</script>
<style>
	page{background: #fff;}
	.user-section{width:100%;height:590upx;}
	.user-bg{width:100%;height:510upx;background:#e93a30;}
	.user-img{width:26%;height:250upx;position:absolute;top:40upx;left:37%;}
	.user-img image{height:250upx;width:100%;border-radius:20upx}
	.user-name{width:100%;color:#fff;text-align:center;line-height:50upx;position:absolute;top:300upx;font-size:16px;font-weight:bold}
	.user-depart{width:100%;position:absolute;top:360upx;}
	.user-depar-detail{width:auto;margin:auto;padding:10upx 10upx;/* background: linear-gradient(top, #ff6600,#ff9933); */text-align: center;color: #fff;font-weight: bold;}
	.user-content{width:100%;position:absolute;top:440upx;}
	.user-list{width:85%;margin:auto;border-radius:10upx;display:flex;background:#fff;border:1px solid #e8e8e8;box-shadow: 1px 4px 6px rgba(26, 26, 26, 0.2);}
	.user-list-item{flex:1;text-align:center;padding:20upx 0;}
	.user-list-item-icon{font-size: 28px;padding-bottom:10upx}
	
	.list-item{height: 100upx;display: flex;justify-content: space-between;line-height: 100upx;border-bottom: 1px solid #e8e8e8;}
	.list-item:last-child{border-bottom: 0upx;}
	.list-icon{flex: 1.5;font-size: 28px;}
	.list-text{flex: 10;}
	.list-to-iconicon{flex: 1;text-align: right;}
	
	.user-info{width: 100%;background: #f3f3f3;display: flex;padding: 20upx 10upx;}
	
	.user-title{flex: 3;padding: 30upx 0upx 0 10upx;}
	.user-title view{font-weight: bold;line-height: 60upx;color: #5A5A5A;font-size: 14px;}

	.section-list{width: 92%;margin:10upx auto;border-radius: 10upx;background: #fff;}
	.section-title{height: 30upx;padding: 20upx;}
	.line-img{height: 30upx;width: 10upx;float: left;}
	.line-img image{height: 100%;width: 100%;}
	.section-title-text{height: 30upx;float: left;margin-left: 20upx;font-size: 16px;font-weight: bold;line-height: 30upx;color: rgba(252, 152, 118, 1);}
	.section-content{width:96%;display: flex;margin: auto;}
	.list-title{flex: 3;}
	.list-title view{font-weight: bold;font-size: 16px;color: #000;line-height:60upx;}
	.list-content{flex: 6;}
	.list-content view{font-size: 14px;color: #AAA;line-height:60upx;}
</style>
