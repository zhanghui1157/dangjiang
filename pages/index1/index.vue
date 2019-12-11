<template>
	<view class="content">
		<scroll-view scroll-y class="page">
			<view class="nav-list">
				<navigator hover-class="none" :url="item.name" class="nav-li" navigateTo :class="'bg-'+item.color" v-for="(item,index) in elements" :key="index">
					<view class="list-img">
						<image :src="base_url+item.imgurl" mode=""></image>
					</view>
					<view class="list-text">{{item.title}}</view>
				</navigator>
			</view>	
		</scroll-view>
	</view>
</template>
<script>
	export default {
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		    } 
		    return {
				title: '共享党建',
				path: '/pages/index/index'
		    }
		},
		data() {
			return {
				elements: [
					{
						title: '党员发展全纪实',
						name: '/pages/index1/dang-log',
						color: '',
						imgurl: 'img/bd_appstore3.png'
					},
					{
						title: '流动党支部',
						name: '/pages/index1/dang-moving',
						color: '',
						imgurl: 'img/bd_appstore5.png'
					},
					{
						title: '党费缴纳',
						name: '/pages/index1/fee',
						color: '',
						imgurl: 'img/bd_appstore9.png'
					},
					{
						title: '专题学习',
						name: '/pages/zhuanti/index',
						color: '',
						imgurl: 'img/bd_appstore11.png'
					},
					{
						title: '资料库',
						name: '/pages/index/study-info',
						color: '',
						imgurl: 'img/bd_appstore12.png'
					},
					{
						title: '社会责任',
						name: '/pages/index1/plat',
						color: '',
						imgurl: 'img/bd_appstore15.png'
					},
					{
						title: '调查问卷',
						name: '/pages/index1/survey',
						color: '',
						imgurl: 'img/bd_appstore19.png'
					},
					{
						title: '通知公告',
						name: '/pages/index1/notice',
						color: '',
						imgurl: 'img/bd_appstore22.png'
					},
					{
						title: '公文收发',
						name: '/pages/index/missive',
						color: '',
						imgurl: 'img/bd_appstore23.png'
					},
					{
						title: '支部工作计划',
						name: '/pages/index1/zhibu-work-plan',
						color: '',
						imgurl: 'img/bd_appstore24.png'
					},
					{
						title: '日报管理',
						name: '/pages/index1/report-list',
						color: '',
						imgurl: 'img/bd_appstore1.png'
					},
					{
						title: '党日活动计划汇总',
						name: '/pages/index1/active-plan',
						color: '',
						imgurl: 'img/bd_appstore6.png'
					},
					{
						title: '党委工作计划汇总',
						name: '/pages/index1/work-plan',
						color: '',
						imgurl: 'img/bd_appstore25.png'
					}
				],
				base_url:'',
			};
		},
		onLoad() {
			var t=this;
			t.base_url=t.sta.sitestatic;
		},
		onShow() {
			console.log("success")
		},
		methods: {
			fee:function(){
				uni.navigateTo({
					url: 'fee'
				})
			},
			work_plan:function(){
				uni.navigateTo({
					url: 'work-plan'
				})
			},
			zhibu_work_plan:function(){
				uni.navigateTo({
					url: 'zhibu-work-plan'
				})
			},
			studyInfo:function(){
				uni.navigateTo({
					url: "../index/study-info"
				})
			},
			sanHui:function(){
				uni.navigateTo({
					url: "../index/san-hui"
				})
			}
		}
	}
</script>
<style>
	page{background:#f3f3f3;} 	
	.item-list{width: 30%;height: 220upx;float:left;margin: 25upx 0 0 2%;border: 1upx solid #EAEAEA;border-radius: 10upx;background: #f3f3f3;}
	.list-img{height: 100upx;width: 100upx;margin:10upx auto;}
	.list-img image{height: 100%;width: 100%;}
	.list-text{width: 100%;text-align: center;}
	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 15px 15upx 0px;
		justify-content: space-between;
	}
	/* #ifdef MP-WEIXIN */
		.nav-li {
			padding: 30upx;
			border-radius: 12upx;
			width: 30%;
			margin: 0 1% 30upx;
			background-size: cover;
			background-position: center;
			position: relative;
			z-index: 1;
			background: #fff;
			
		}
	/* #endif */
	/* #ifdef H5 */
	    .nav-li {
	    	padding: 30upx;
	    	border-radius: 12upx;
	    	width: 30%;
	    	margin: 0 1% 30upx;
	    	background-size: cover;
	    	background-position: center;
	    	position: relative;
	    	z-index: 1;
	    	background: #fff;
	    }
	/* #endif */
	
	
	.nav-li::after {
		content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10upx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}
	
	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}
	
	.nav-title {
		font-size: 32upx;
		font-weight: 300;
	}
	
	.nav-title::first-letter {
		font-size: 40upx;
		margin-right: 4upx;
	}
	
	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}
	
	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40upx;
		height: 6upx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}
	
	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100upx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40upx;
		opacity: 0.3;
	}
	
	.nav-name::first-letter {
		font-weight: bold;
		font-size: 36upx;
		margin-right: 1px;
	}
	
	.nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}
	
	.text-light {
		font-weight: 300;
	}
	
	@keyframes show {
		0% {
			transform: translateY(-50px);
		}
	
		60% {
			transform: translateY(40upx);
		}
	
		100% {
			transform: translateY(0px);
		}
	}
	
	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}
	
		60% {
			transform: translateY(40upx);
		}
	
		100% {
			transform: translateY(0px);
		}
	}
</style>
