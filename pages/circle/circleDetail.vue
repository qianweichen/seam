<template>
	<view style="padding-bottom: 200rpx;">
		<view v-if="myCircle">
			<view class="item flex align-star">
				<image class="header circle" :src="userInfo.header_img" mode="aspectFill"></image>
				<view class="info">
					<view class="flex-between">
						<view class="flex">
							<view class="name">{{ userInfo.name }}</view>
							<view class="tag flex-center">{{ userInfo.duration }}年经验</view>
						</view>
						<!-- <view class="flex position">
							<image src="../../static/icon-dw.png" mode="widthFix"></image>
							<view>1.04km</view>
						</view> -->
					</view>
					<view class="address">{{ userInfo.address }}</view>
				</view>
			</view>
			<view class="tip">{{ userInfo.brief }}</view>
		</view>
		<view class="dynamic">
			<!-- <view class="title">师傅动态</view> -->
			<view class="dynamic-item flex-between align-star" v-for="(item, index) in list" :key="index">
				<image class="header circle" :src="item.uid.header_img" mode="aspectFill"></image>
				<view class="right">
					<view class="name">{{ item.uid.name }}</view>
					<view class="content">{{ item.content }}</view>
					<view class="imgbox flex">
						<image v-for="(items, indexs) in item.img" :key="indexs" :src="items" mode="aspectFill" @click="browseImg(item.img, indexs)"></image>
					</view>
					<view class="flex-between bottom">
						<view>{{ item.add_time }}</view>
						<view class="flex">
							<image class="good" :src="'../../static/good' + (item.is_fabulous == 0 ? '' : 'A') + '.png'" mode="widthFix" @click="like(item.id, index)"></image>
							<view>{{ item.fabulous_num }}</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="list.length==0" style="padding-top: 200rpx; text-align: center; font-size: 28rpx; color: #888;">
				暂无数据
			</view>
		</view>
		<view class="fixedBtn flex" v-if="myCircle">
			<button open-type="share" class="clear-btn share flex-center">
				分享
			</button>
			<navigator class="send flex-center" url="./send" hover-class="none"><view>发布动态</view></navigator>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			myCircle: '',
			id: '',
			page: 1,
			list: [],
			userInfo: ''
		};
	},
	methods: {
		getUserInfo() {
			this.request({
				url: '/User/userInfo',
				data: {
					token: uni.getStorageSync('token'),
					id: this.id
				},
				success: res => {
					console.log('用户个人信息:', res);
					this.userInfo = res.data.data;
				}
			});
		},
		getDynaic(isFirstPage) {
			if (isFirstPage) {
				this.page = 1;
				this.list = [];
			}
			uni.showLoading({
				title: '加载中'
			});
			this.request({
				url: '/User/dynamicList',
				data: {
					token: uni.getStorageSync('token'),
					uid: this.id,
					type: this.myCircle ? 2 : 1, //1为所有人 2位个人
					page: this.page
				},
				success: res => {
					console.log('动态:', res);
					for (var i = 0; i < res.data.data.length; i++) {
						res.data.data[i].add_time = new Date(res.data.data[i].add_time * 1000).Format('yyyy-MM-dd hh:mm:ss');
					}
					this.page++;
					this.list = this.list.concat(res.data.data);
					uni.hideLoading();
				}
			});
		},
		like(id, index) {
			uni.showLoading({
				title: '加载中'
			});
			this.request({
				url: '/User/fabulous',
				data: {
					token: uni.getStorageSync('token'),
					id
				},
				success: res => {
					console.log('点赞:', res);
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					});
					if (res.data.msg == '点赞成功!') {
						this.list[index].is_fabulous = 1;
						this.list[index].fabulous_num++;
					} else {
						this.list[index].is_fabulous = 0;
						this.list[index].fabulous_num--;
					}
				}
			});
		},
		browseImg(urls, current) {
			// console.log(urls, current);
			uni.previewImage({
				urls,
				current
				// longPressActions: {
				// 	itemList: ['发送给朋友', '保存图片', '收藏'],
				// 	success: function(data) {
				// 		console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				// 	},
				// 	fail: function(err) {
				// 		console.log(err.errMsg);
				// 	}
				// }
			});
		}
	},
	onLoad(options) {
		if (options.id == 'all') {
			this.myCircle = false;
			uni.setNavigationBarTitle({
				title: '师傅圈'
			});
		} else {
			this.id = options.id;
			this.myCircle = true;
			uni.setNavigationBarTitle({
				title: '我的主页'
			});
		}

		this.getUserInfo();
	},
	onShow() {
		this.getDynaic(true);
	},
	onReachBottom() {
		this.getDynaic();
	},
	onShareAppMessage(res) {
		// 系统菜单分享
		if (res.from === 'menu') {
			var info = uni.getStorageSync('webInfo');
			return {
				title: info.title,
				path: '/pages/index/index',
				imageUrl: this.imgUrl + info.logo
			};
		}
		// 页面内分享按钮
		if (res.from === 'button') {
			return {
				title: this.userInfo.name + '的主页',
				path: '/pages/circle/circleDetail?id=' + this.userInfo.id,
				imageUrl: this.userInfo.header_img
			};
		}
	}
};
</script>

<style lang="scss">
.item {
	padding: 50rpx 30rpx 40rpx 30rpx;
	border-bottom: 2rpx solid #e5e5e5;
	.header {
		width: 100rpx;
		height: 100rpx;
	}
	.info {
		width: 568rpx;
		padding-left: 21rpx;
		font-size: 26rpx;
		color: #666;
	}
	.name {
		font-size: 36rpx;
		font-weight: bold;
	}
	.tag {
		width: 102rpx;
		height: 38rpx;
		background: $themeColor;
		border-radius: 8rpx;
		font-size: 24rpx;
		color: #fff;
		margin-left: 10rpx;
	}
	.position {
		font-size: 24rpx;
		color: #bbb;
		image {
			width: 25rpx;
			height: auto;
		}
	}
	.address {
		width: 412rpx;
		padding-top: 19rpx;
	}
}
.tip {
	padding: 40rpx 30rpx;
	font-size: 26rpx;
	color: #666;
	border-bottom: 20rpx solid #eee;
}
.dynamic {
	padding: 30rpx;
	.title {
		font-size: 30rpx;
		padding-bottom: 40rpx;
	}
	.dynamic-item {
		padding-bottom: 50rpx;
		.header {
			width: 70rpx;
			height: 70rpx;
		}
		.right {
			width: 600rpx;
			.name {
				font-size: 30rpx;
				height: 70rpx;
				line-height: 70rpx;
			}
			.content {
				font-size: 26rpx;
				color: #666;
				padding: 16rpx 0;
			}
			.imgbox {
				flex-wrap: wrap;
				image {
					width: 190rpx;
					height: 190rpx;
					margin-right: 7rpx;
				}
				image:nth-child(3n) {
					margin-right: 0;
				}
			}
			.bottom {
				padding-top: 20rpx;
				font-size: 24rpx;
				color: #666;
				image {
					width: 29rpx;
					height: auto;
					margin-right: 9rpx;
				}
			}
		}
	}
}
.fixedBtn {
	position: fixed;
	bottom: 30rpx;
	left: calc(50% - 345rpx);
	width: 690rpx;
	height: 100rpx;
	border-radius: 50rpx;
	overflow: hidden;
	color: #fff;
	font-size: 30rpx;
	font-weight: bold;
	.share {
		width: 200rpx;
		height: 100%;
		background-color: #333333;
		border-radius: 0;
	}
	.send {
		width: 490rpx;
		height: 100%;
		background-color: $themeColor;
	}
}
</style>
