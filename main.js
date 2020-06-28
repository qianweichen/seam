import Vue from 'vue'
import App from './App'

Vue.prototype.apiUrl = 'https://mf.xjie.vip/api';
Vue.prototype.uploadUrl = 'https://mf.xjie.vip/admin/webinfo/upload';
Vue.prototype.imgUrl = 'https://mf.xjie.vip';

//登陆
Vue.prototype.login = function(userInfo,callBack) {
	// console.log(userInfo);
	if(!userInfo.rawData){
		return;
	}
	uni.showLoading({
		title: '加载中'
	});
	uni.login({
		provider: 'weixin',
		success: res => {
			console.log('code:', res.code);
			var query = {
				code:res.code,
				signature: userInfo.signature,
				encryptedData: userInfo.encryptedData,
				iv: userInfo.iv,
				rawData: userInfo.rawData
			}
			this.request({
				url: '/Login/dologin',
				data: {
					...query
				},
				success: res => {
					console.log("登陆:", res);
					uni.setStorageSync('openid', res.data.data.openID);
					uni.setStorageSync('token', res.data.data.token);
			
					this.request({
						url: '/User/userInfo',
						data: {
							token: uni.getStorageSync('token'),
						},
						success: res => {
							console.log("用户个人信息:", res);
							uni.setStorageSync('userInfo', res.data.data);
							uni.hideLoading();
							if(callBack){
								callBack();
							}
						},
					});
				},
			});
		}
	});
}
//获取是否登陆
Vue.prototype.getIsLogin = function() {
	var userInfo = uni.getStorageSync('userInfo');
	if (userInfo) {
		return true;
	}
	return false;
}
//request
Vue.prototype.request = function(obj) {
	uni.request({
		url: this.apiUrl + (obj.url || ''),
		data: obj.data || {},
		method: obj.method || 'POST',
		header: obj.header || {
			"Content-Type": "application/json"
		},
		success: (res) => {
			if (res.data.code == 0) {
				uni.showToast({
					title: res.data.msg,
					icon: 'none'
				});
				return;
			}
			typeof obj.success == "function" && obj.success(res);
		},
		fail: (res) => {
			console.log('request错误：', res);
		}
	})
}
//uploadFile
Vue.prototype.uploadFile = function(obj) {
	uni.uploadFile({
		url: this.uploadUrl,
		filePath: obj.filePath || '',
		name: obj.name || 'files',
		formData: obj.formData || {},
		success: function(res) {
			typeof obj.success == "function" && obj.success(res);
		},
		fail: function() {
			console.log('uploadFile错误：', res);
		}
	})
}
Vue.prototype.checkPhone = function(phone) {
	if (/^1[3456789]\d{9}$/.test(phone)) {
		return true;
	}
	return false;
};
Date.prototype.Format = function(fmt) { // author: meizz
	var o = {
		"M+": this.getMonth() + 1, // 月份
		"d+": this.getDate(), // 日
		"h+": this.getHours(), // 小时
		"m+": this.getMinutes(), // 分
		"s+": this.getSeconds(), // 秒
		"q+": Math.floor((this.getMonth() + 3) / 3), // 季度
		"S": this.getMilliseconds() // 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[
			k]).substr(("" + o[k]).length)));
	return fmt;
}


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
