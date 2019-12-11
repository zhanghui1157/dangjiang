function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function (n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function urlRequest(url,data,callback){
	var showdata=true;
	if(data){
		var time=setTimeout(()=>{},100);//定时器是为了解决先调用ajax在执行for循环的问题
		for (var i in data) {
			//判断如果需要党支部或者党员的登录信息，则跳到登录页面
			if((i=='communist_no' && data[i]==undefined) || (i=='party_no' && data[i]==undefined) || (i=='add_communist' && data[i]==undefined)){
				uni.getStorage({
					key: 'user_info',
					success: function (res) {
						
						if(i=='communist_no' && data[i]==undefined){
							data[i]=res.data.communist_no
						}
						if(i=='party_no' && data[i]==undefined){
							data[i]=res.data.party_no
						}
						if(i=='add_communist' && data[i]==undefined){
							data[i]=res.data.communist_no
						}
					},
					fail() {
						uni.showToast({
							title: '请先登录!',
							duration: 2000,
							icon:'none',
							success:function(){
								setTimeout(function() {
									uni.navigateTo({
										url: "/pages/login/login"
									})
								}, 2000);
							}
						})
						showdata=false
					}
				});
			}
			clearTimeout(time)
			time=setTimeout(()=>{
				uni.request({
					url: url,
					async:false,
					method: 'POST',
					data:data,
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						callback(res);
					}
				})
			},100)
			if(showdata==false){
				break;
			}
			
		}
		
	}else{
		uni.request({
			url: url,
			method: 'POST',
			data:data,
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: (res) => {
				callback(res);
			}
		})
	}
		
	
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function (milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function (dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDay()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

module.exports = {
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	urlRequest:urlRequest,
}
