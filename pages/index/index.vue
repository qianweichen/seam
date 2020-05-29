<template>
	<view class="content">
		<swiper class="swiper" indicator-dots autoplay circular>
			<swiper-item>
				<image
					src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590728921828&di=3fb0e3849c22847e5ec601f79487c1f0&imgtype=0&src=http%3A%2F%2Fimglf3.nosdn.127.net%2Fimg%2FL0lHRjFqbkVQa2pIQXFwYWE2WUd6Q3A4dUN5aFJhZlBOaTd0b3VDVFlQNUNTeGpQUGpZbGF3PT0.jpg%3FimageView%26thumbnail%3D1680x0%26quality%3D96%26stripmeta%3D0%26type%3Djpg%257Cwatermark%26type%3D2%26text%3Dwqkg"
					mode="aspectFill"
				></image>
			</swiper-item>
		</swiper>
		<swiper class="notice" vertical autoplay circular>
			<swiper-item v-for="(item, index) in 3" :key="index">
				<view class="noticeItem flex">
					<image src="../../static/icon-gg.png" mode="widthFix"></image>
					<text>最新预约:138494****6已预约服务</text>
				</view>
			</swiper-item>
		</swiper>
		<view class="form">
			<view class="iptBox flex">
				<image src="../../static/icon-ren.png" mode="widthFix"></image>
				<view class="line"></view>
				<input type="text" placeholder="请输入姓名" />
			</view>
			<view class="iptBox flex">
				<image src="../../static/icon-dh.png" mode="widthFix"></image>
				<view class="line"></view>
				<input type="number" placeholder="请输入电话" />
			</view>
			<view class="iptBox flex" @click="openMap">
				<image src="../../static/icon-dw.png" mode="widthFix"></image>
				<view class="line"></view>
				<input disabled type="text" placeholder="请在地图选择位置" />
			</view>
			<view class="btn flex-center">立即预约</view>
		</view>
		<view class="copy">©河南前途装饰工程有限公司</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	onLoad() {},
	methods: {}
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
