<template>
	<view class="content">
		<view class="main-content">
			<view class="fee-title">党费缴纳简介</view>
			<view class="fee-intro">我志愿加入中国共产党，拥护党的纲领，遵守党的规章履行党员的义务，执行党的决定，严守党的纪律保守党的秘密，对党忠诚积极工作，为共产主义奋斗终生</view>
			<view class="fee-money">
				<view class="money-detial">{{money}} </view>
				<view class="money-text"> 元</view>
			</view>
			<view class="fee-month">本月应缴纳金额</view>
			<view v-if="type=='MP-WEIXIN'">
				<view v-if="userInfo==true">
					<button class="fee-btn" open-type="getUserInfo" @getuserinfo="getUserInfo" >微信认证</button>
					<view style='width:100%;text-align:center;color:#A1A1A1;padding:30upx'>请先点击上面的按钮获取微信身份后再缴费</view>
				</view>
				<view v-else>
					<button class="fee-btn" @click="payFee()" v-if="addClick==true">缴费</button>
					<button class="fee-btn" v-else>缴费</button>
				</view>
			</view>
			<view v-if="type=='H5'">
				<view class="fee-btn" @click="togglePopup('center')">缴费</view>
			</view>
			<view class="fee-info">备注：党费在线缴纳，缴纳明细只显示登录用户每月所在支部的缴费信息</view>
		</view>
		<uni-popup :show="type === 'center'" mode="fixed" @hidePopup="togglePopup('')" >
			<view class="select-title">选择缴费方式</view>
			<scroll-view :scroll-y="true" >
				<view class="select-list-item" style="border-bottom: 1px solid #e8e8e8;" @click="doPay(1)">
					<view class="item-list">
						<view class="fee-img">
							<image src="../../static/img/grid-2.png" mode=""></image>
						</view>
						<view class="fee-txt">
							<view class="fee-des">微信缴费</view>
							<view class="fee-desc">只支持非微信浏览器</view>
						</view>
					</view>
				</view>
				<view class="select-list-item" style="border-bottom: 1px solid #e8e8e8;" @click="doPay(2)">
					<view class="item-list">
						<view class="fee-img">
							<image src="../../static/img/grid-2.png" mode=""></image>
						</view>
						<view class="fee-txt">
							<view class="fee-des">微信缴费</view>
							<view class="fee-desc" v-if="dues_info.openid==1">只支持微信浏览器</view>
							<view class="fee-desc" v-if="dues_info.openid==0">微信浏览器支付请点击此项先授权</view>
						</view>
					</view>
					
				</view>
				<view class="select-list-item" @click="doPay(3)">
					<view class="item-list">
						<view class="fee-img">
							<image src="../../static/img/grid-8.png" mode=""></image>
						</view>
						<view class="fee-txt">
							<view class="fee-des">支付宝缴费</view>
							<view class="fee-desc">只支持微信以外的浏览器中支付</view>
						</view>
					</view>
					
				</view>
			</scroll-view>
		</uni-popup>
	</view>
</template>

<script>
	/* #ifdef H5 */
		var wx = require('@/common/jweixin-module');
	/* #endif */
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import md5 from '../../static/js/md5.js';
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				user_info:[],
				type: '',
				money:'0.0',
				dues_info:[],
				signStr:'',
				timestamp:'',
				userInfo:false,
				type:'',
				addClick:true,
				openid:'',
			}
		},
		onLoad() {
			var t=this;
			uni.showLoading();
			t.urlRequest.urlRequest(t.func.getFeeDetail,{communist_no:t.globalData.userInfo.communist_no},function(res){
				if(res.data.status==0){
					uni.showToast({
						title: '暂无缴费信息',
						duration: 2000,
						icon:'none',
						success:function(){
							uni.hideLoading();
							setTimeout(function(){
								uni.switchTab({
									url: "index"
								})
							},2000)
						}
					});
				}else{
					if(res.data.dues_info.status==2){
						uni.hideLoading();
						uni.showToast({
							title: '本月费用已缴',
							duration: 2000,
							icon:'none',
							success:function(){
								setTimeout(function(){
									uni.switchTab({
										url: "index"
									})
								},2000)
							}
						});
					}else{
						t.money=res.data.dues_info.dues_amount;
						t.dues_info=res.data.dues_info
						uni.hideLoading();
						
						/* #ifdef MP-WEIXIN */
							t.type='MP-WEIXIN';
						/* #endif */
						/* #ifdef H5 */
							t.type='H5';
						/* #endif */
					}
				}
				
			})
			//判断当前用户是否登录
			uni.getStorage({
				key: 'user_openid',
				success: (res) => {
					console.log(res)
					if(res.data1=''){
						t.openid=res.data
					}else{
						t.userInfo=true;
					}
				},
				fail:()=>{
					t.userInfo=true;
				}
			})
		},
		methods: {
			payFee:function(){
				uni.showLoading();
				var t=this;
				
				var data={
					communist_no:t.globalData.userInfo.communist_no,
					money:t.money,
					dues_id:t.dues_info.dues_id,
					openid:t.openid
				}
				t.urlRequest.urlRequest('http://wx.kocelcloud.com/dj-h5/mini/WeiMiniPay/doalipay',data,function(res){
					let paymentData = res.data;
					var timeStamp=String(paymentData.timestamp);
					var nonceStr=paymentData.noncestr;
					var pkg='prepay_id='+paymentData.prepayid;
					
					var signStr = 'appId=' + t.globalData.appid + '&nonceStr=' + nonceStr + '&package=' + pkg + '&signType=MD5' + '&timeStamp=' + timeStamp + "&key=" + t.globalData.mch_idSecret;
					
					var paySign = md5(signStr).toUpperCase();//此处用到hexMD5插件
					uni.requestPayment({
						timeStamp: timeStamp,
						nonceStr: nonceStr,
						package: pkg,
						signType: 'MD5',
						paySign: paySign,
						success: (res) => {
							uni.showToast({
								title: "付款成功!",
								duration: 2000,
								icon:'none',
								success:function(){
									setTimeout(function(){
										uni.switchTab({
											url: 'index',
										})
									},2000)
								}
							})
							
							uni.hideLoading({
								success:function(){
									t.addClick=true;
								}
							});
						},
						fail: (res) => {
							uni.showModal({
								content: "支付失败",
								showCancel: false
							})
							uni.hideLoading({
								success:function(){
									t.addClick=true;
								}
							});
						},
						complete: () => {
							t.loading = false;
						}
					})
				})
			},
			getUserInfo:function(){
				var t=this;
				uni.login({
					success: (res) => {
						t.urlRequest.urlRequest('http://wx.kocelcloud.com/dj-h5/mini/WeixinMember/getOpenid',{code:res.code},function(member){
						// t.urlRequest.urlRequest(t.func.getOpenid,{code:res.code},function(member){
							t.openid=member.data;
							if(member.data){
								uni.setStorage({
									key: 'user_openid',
									data:member.data,
									success: (user) => {
										uni.showToast({
											title: '登录成功',
											duration: 2000,
											icon:'none',
										});
										t.userInfo=false;
									},
									fail: () => {
										uni.showToast({
											title: '登录失败,退出重试',
											duration: 2000,
											icon:'none',
										});
									}
								})
							}
							
						})
						
					}
				});
			},
			togglePopup(type) {
				this.type = type
			},
			doPay:function(type){
				var t=this;
				t.togglePopup();
				uni.showLoading();
				var data={
					communist_no:t.globalData.userInfo.communist_no,
					money:t.money,
					dues_id:t.dues_info.dues_id
				}
				//type为1表示微信支付
				if(type==1){
					window.location.href=t.func.WeiPay+'?communist_no='+data.communist_no+'&money='+data.money+'&dues_id='+data.dues_id
					uni.hideLoading();
				}else if(type==2){
					if(t.dues_info.openid==0){
						uni.getStorage({
							key: 'user_info',
							success: function (res) {
								window.location.href=t.func.WeiUserIndex+'?communist_no='+res.data.communist_no
							},
						});
					}else{
						t.urlRequest.urlRequest(t.func.WeiUserPay,data,function(res){
							uni.hideLoading();
							let [appId, timestamp,mch_idSecret, nonceStr, signature,pkg] = [res['data']['jsapi']['appId'], res['data']['jsapi']['timestamp'],res['data']['jsapi']['mch_idSecret'], res['data']['jsapi']['nonceStr'], res['data']['jsapi']['signature'],
							        'prepay_id='+res['data']['order']['prepayid']
							    ];
								
								var signStr = 'appId=' + appId + '&nonceStr=' + nonceStr + '&package=' + pkg + '&signType=MD5' + '&timeStamp=' + timestamp + "&key=" + mch_idSecret;
								
								var paySign = md5(signStr).toUpperCase();//此处用到hexMD5插件
								
							    wx.config({
							        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							        appId, // 必填，公众号的唯一标识
							        timestamp, // 必填，生成签名的时间戳
							        nonceStr, // 必填，生成签名的随机串
							        signature, // 必填，签名，见附录1
							        jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
							    });
							    wx.ready(function() {
							        wx.chooseWXPay({
							            timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
							            nonceStr, // 支付签名随机串，不长于 32 位
							            'package': pkg, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
							            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
							            paySign, // 支付签名
							            success(res) {
							                uni.showToast({
							                	title: '支付成功',
							                	duration: 2000,
							                	icon:'none',
							                	success:function(){
													setTimeout(function(){
														uni.switchTab({
															url: "index"
														})
													},2000)
												}
							                });
							            },
							            fail(res) {
							                uni.showToast({
							                	title: '支付失败',
							                	duration: 2000,
							                	icon:'none',
							                	success:function(){
							                		setTimeout(function(){
							                			uni.switchTab({
							                				url: "index"
							                			})
							                		},2000)
							                	}
							                });
							            }
							        });
							    });
							 
							    wx.error(function(res) {
							        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
							        /*alert("config信息验证失败");*/
							    });
						})
					}
				}else{
					window.location.href=t.func.AliPay+'?communist_no='+data.communist_no+'&money='+data.money+'&dues_id='+data.dues_id
					uni.hideLoading();
				}
				
				
			}
		}
	}
</script>

<style>
	.fee-title{width: 100%;height: 80upx;line-height: 80upx;text-align: center;margin-top: 50upx;font-size: 16px;}
	.fee-intro{color: #A1A1A1;margin-bottom: 30upx;}
	.fee-money{width:100%;display: flex;margin: 20upx auto;color: #e93a30;}
	.money-detial{flex: 4;text-align: right;font-size: 24px;font-weight: bold;}
	.money-text{flex: 3;text-align: left;padding-left: 5upx;line-height: 30upx;margin-top: 20upx;}
	.fee-month{width: 100%;text-align: center;color: #A1A1A1;}
	.fee-btn{height: 80upx;width: 100%;text-align: center;line-height: 80upx;background: #e93a30;color: #fff;font-size: 16px;border-radius:15upx;margin:0upx auto;margin-top: 100upx;}
	.fee-info{color: #A1A1A1;line-height: 40upx;margin-top: 20upx;}
	.select-title{padding-bottom: 30upx;}
	.select-list-item{width: 98%;margin: auto;}
	.item-list{display: flex;}
	.fee-img{flex: 1.5;height: 80upx;}
	.fee-img image{height: 50upx;width: 50upx;margin:0 auto;margin-top: 30upx;}
	.fee-txt{flex: 8;height: 120upx;text-align: left;}
	.fee-des{height: 70upx;line-height: 80upx;}
	.fee-desc{text-align: left;font-size: 10px;padding-bottom:10upx;color: #e93a30;}
</style>
