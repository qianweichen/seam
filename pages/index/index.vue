<template>
	<view class="content">
		<swiper class="swiper" indicator-dots autoplay circular>
			<swiper-item v-for="(item, index) in bannerList" :key="index"><image :src="imgUrl + item.img" mode="aspectFill"></image></swiper-item>
		</swiper>
		<swiper class="notice" vertical autoplay circular>
			<swiper-item v-for="(item, index) in tipList" :key="index">
				<view class="noticeItem flex">
					<image src="../../static/icon-gg.png" mode="widthFix"></image>
					<text>最新预约:{{ item.phone }}已预约服务</text>
				</view>
			</swiper-item>
		</swiper>
		<view class="form">
			<view class="iptBox flex">
				<image src="../../static/icon-ren.png" mode="widthFix"></image>
				<view class="line"></view>
				<input type="text" placeholder="请输入姓名" v-model="props.name" />
			</view>
			<view class="iptBox flex">
				<image src="../../static/icon-dh.png" mode="widthFix"></image>
				<view class="line"></view>
				<input type="number" placeholder="请输入电话" v-model="props.phone" />
			</view>
			<view class="iptBox flex" @click="chooseAdd">
				<image src="../../static/icon-dw.png" mode="widthFix"></image>
				<view class="line"></view>
				<input disabled type="text" placeholder="请在地图选择位置" v-model="props.address" />
			</view>
			<view v-if="isLogin" class="btn flex-center" @click="submit">立即预约</view>
			<button v-else open-type="getUserInfo" class="clear-btn" @getuserinfo="getUserInfo"><view class="btn flex-center">立即预约</view></button>
		</view>
		<view class="copy">©河南前途装饰工程有限公司</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			imgUrl: this.imgUrl,
			isLogin: false,
			bannerList: [],
			tipList: [],
			props: {
				name: '',
				phone: '',
				address: '',
				longitude: '',
				dimension: ''
			}
		};
	},
	onLoad() {
		if (this.getIsLogin()) {
			this.isLogin = true;
		}
		this.getBanner();
		this.getTip();
	},
	methods: {
		chooseAdd() {
			uni.chooseLocation({
				success: res => {
					console.log('位置:', res);
					this.props.address = res.address;
					this.props.longitude = res.longitude;
					this.props.dimension = res.latitude;
				}
			});
		},
		//轮播图
		getBanner() {
			uni.showLoading({
				title: '加载中'
			});
			this.request({
				url: '/login/banner',
				data: {
					token: uni.getStorageSync('token')
				},
				success: res => {
					console.log('轮播图:', res);
					this.bannerList = res.data.data;
					uni.hideLoading();
				}
			});
		},
		//跑马灯
		getTip() {
			uni.showLoading({
				title: '加载中'
			});
			this.request({
				url: '/login/horseRaceLamp',
				data: {
					token: uni.getStorageSync('token')
				},
				success: res => {
					console.log('跑马灯:', res);
					this.tipList = res.data.data;
					uni.hideLoading();
				}
			});
		},
		//预约
		submit() {
			if (!this.props.name) {
				uni.showToast({
					title: '请输入姓名',
					icon: 'none'
				});
				return;
			}
			if (!this.props.phone) {
				uni.showToast({
					title: '请输入电话',
					icon: 'none'
				});
				return;
			}
			if (!this.props.address) {
				uni.showToast({
					title: '请选择地址',
					icon: 'none'
				});
				return;
			}
			if (!this.checkPhone(this.props.phone)) {
				uni.showToast({
					title: '手机号格式有误',
					icon: 'none'
				});
				return;
			}
			this.props.token = uni.getStorageSync('token');
			uni.showLoading({
				title: '加载中'
			});
			this.request({
				url: '/User/createOrders',
				data: this.props,
				success: res => {
					console.log('预约:', res);
					uni.showToast({
						title: res.data.msg
					});
					this.props = {
						name: '',
						phone: '',
						address: '',
						longitude: '',
						dimension: ''
					};
					uni.hideLoading();
				}
			});
		},
		getUserInfo(e) {
			this.login(e.detail); //登陆
		}
	},
	onShareAppMessage(res) {
		var info = uni.getStorageSync('webInfo');
		return {
			title: info.title,
			path: '/pages/index/index',
			imageUrl: this.imgUrl + info.logo
		};
	}
};
</script>

<style lang="scss">
page {
	min-height: 100vh;
	box-sizing: border-box;
	background: url(../../static/logo.png) no-repeat;
	background-position: center 474rpx;
	background-size: 495rpx auto;
	background-attachment: fixed;
}
.swiper {
	width: 100%;
	height: 360rpx;
	image {
		width: 100%;
		height: 100%;
		display: block;
	}
}
.notice {
	background: rgba(0, 0, 0, 0.4);
	width: 100%;
	height: 80rpx;
	.noticeItem {
		padding: 0 30rpx;
		height: 100%;
		font-size: 30rpx;
		color: #fff;
		image {
			width: 43rpx;
			height: auto;
			margin-right: 19rpx;
		}
	}
}
.form {
	padding: 60rpx 30rpx;
	.iptBox {
		height: 100rpx;
		border: 2rpx solid rgba(170, 170, 170, 1);
		border-radius: 8rpx;
		margin-bottom: 20rpx;
		box-sizing: border-box;
		image {
			width: 50rpx;
			height: auto;
			margin: 0 26rpx;
		}
		.line {
			width: 2rpx;
			height: 50rpx;
			background-color: #cccccc;
		}
		input {
			width: 490rpx;
			padding: 0 30rpx;
			font-size: 28rpx;
		}
	}
	.btn {
		height: 100rpx;
		background: $themeColor;
		border-radius: 50rpx;
		color: #fff;
		margin-top: 60rpx;
	}
}
.copy {
	width: 100%;
	position: fixed;
	bottom: 36rpx;
	left: 0;
	text-align: center;
	font-size: 22rpx;
	color: #aaaaaa;
}
</style>
