<script>
	export default {
		onLaunch: function() { 
		},  
		onShow: function() {  
		},  
		onHide: function() {  
		}  
	}
</script>

<style>
	
	/*每个页面公共css */
	@import "static/css/main.css";
	@import "common/font/iconfont.css"; 
	page{background: #fff;color: #000000;font-family: "微软雅黑";}
	
	/* #ifdef H5 */
		/* 隐藏顶部导航条 */
	    uni-page-head
	    {
	        display: none;
	    }
	/* #endif */
	
	*{margin: 0;padding: 0;}
	.content{
		font-family: MicrosoftYaHei;
		font-size: 14px;
		color: rgb(81, 81, 81);
	}
	.main-content{
		width: 94%;
		margin: auto;
	}
	.middle-line{height: 10upx;width: 100%;background:#e7e7e7;clear: both;}
	.clear{clear: both;}
	.line{width: 100%;border-bottom: 1upx solid #ebe9e9;}

	
	
	rich-text{line-height: 50upx;}
	.footer{height: 120upx;clear: both;} 
		
	/* 无数据时的样式 */
	.no-data-icon{margin-top: 100upx;font-size: 50px;width: 100%;text-align: center;color:#9b9b9b;}
	.no-data-text{font-size: 14px;width: 100%;text-align: center;line-height: 50upx;color:#9b9b9b;}
	
	/* 按钮样式 */
	.form-btn{width: 94%;height: 80upx;margin: 80upx auto;}
	.form-btn button{height: 80upx;text-align: center;line-height: 80upx;border-radius: 15upx;color: #fff;background: #e93a30;border: none;}
	
	/* 页面顶部轮播图样式 */
	.swiper{height: 350upx;width: 100%;}
	.swiper-item {
		display: block;
		height: 350upx;
		line-height: 350upx;
		text-align: center;
		border-radius: 15upx;
	}
	.swiper-item img{height: 100%;width: 100%;}
	.form-btn{width: 100%;height: 80upx;text-align: center;line-height: 80upx;background: rgb(255,58,65);color:#fff;font-size: 16px;position: fixed;bottom: -80upx;border-radius: 0upx;}
</style>
