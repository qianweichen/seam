<template>
	<view class="content">
		<view v-if="isLogin">
			<view class="tabBox flex-between">
				<view class="tab" :class="{ active: tabIndex == 0 }" @click="changeTab(0)">未处理</view>
				<view class="tab" :class="{ active: tabIndex == 1 }" @click="changeTab(1)">已指派</view>
				<view class="tab" :class="{ active: tabIndex == 2 }" @click="changeTab(2)">已完成</view>
				<view class="tab" :class="{ active: tabIndex == 3 }" @click="changeTab(3)">已取消</view>
			</view>
			<view class="list">
				<view class="item" v-for="(item, index) in ordersList" :key="index">
					<view class="top flex-between">
						<view>订单编号：{{ item.order_on }}</view>
						<view class="fc-9">{{ item.add_time }}</view>
					</view>
					<view class="cont flex">
						<image src="../../static/order.png" mode="aspectFill"></image>
						<view>
							<view class="flex-between">
								<view>姓名: {{ item.name }}</view>
								<view class="state" v-if="item.status == 1">待处理订单</view>
								<view class="state" v-if="item.status == 2">已指派订单</view>
								<view class="state" v-if="item.status == 3">已完成订单</view>
								<view class="state" v-if="item.status == 4">已取消订单</view>
							</view>
							<view>电话: {{ item.phone }}</view>
							<view>地址: {{ item.address }}</view>
						</view>
					</view>
					<view class="btnBox flex">
						<view class="flex-center" v-if="item.status == 1" @click="clearOrder(item.id)">取消订单</view>
						<view class="wc flex-center" v-if="item.status == 2" @click="doneOrder(item.id)">完成订单</view>
						<!-- <view class="flex-center" v-if="item.status==3||item.status==4">删除订单</view> -->
						<view class="yqx flex-center" v-if="item.status == 4">订单已取消</view>
					</view>
				</view>
				<view v-if="ordersList.length == 0" style="text-align: center; padding-top: 200rpx; color: #999; font-size: 24rpx;">暂无订单</view>
			</view>
		</view>
		<view v-else>
			<button open-type="getUserInfo" class="clear-btn" @getuserinfo="getUserInfo">
				请先授权登录，点我登陆
			</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabIndex: 0,
			page: 1,
			ordersList: [],
			hasNextPage: true,
			isLogin: false
		};
	},
	methods: {
		changeTab(index) {
			this.tabIndex = index;
			this.getOrder(true);
		},
		doneOrder(id) {
			uni.showLoading({
				title: '加载中'
			});
			this.request({
				url: '/User/ordersOk',
				data: {
					token: uni.getStorageSync('token'),
					id
				},
				success: res => {
					console.log('完成订单:', res);
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					});
					setTimeout(() => {
						this.getOrder(true);
					}, 1500);
					uni.hideLoading();
				}
			});
		},
		clearOrder(id) {
			uni.showLoading({
				title: '加载中'
			});
			this.request({
				url: '/User/ordersDel',
				data: {
					token: uni.getStorageSync('token'),
					id
				},
				success: res => {
					console.log('取消订单:', res);
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					});
					setTimeout(() => {
						this.getOrder(true);
					}, 1500);
					uni.hideLoading();
				}
			});
		},
		getOrder(isFirstPage) {
			if (isFirstPage) {
				this.page = 1;
				this.hasNextPage = true;
				this.ordersList = [];
			}
			uni.showLoading({
				title: '加载中'
			});
			this.request({
				url: '/User/ordersList',
				data: {
					token: uni.getStorageSync('token'),
					status: this.tabIndex + 1,
					page: this.page
				},
				success: res => {
					console.log('订单列表:', res);
					this.page++;
					for (var i = 0; i < res.data.data.data.length; i++) {
						res.data.data.data[i].add_time = new Date(res.data.data.data[i].add_time * 1000).Format('yyyy-MM-dd hh:mm:ss');
					}
					this.ordersList = this.ordersList.concat(res.data.data.data);
					if (res.data.data.last_page <= res.data.data.current_page) {
						this.hasNextPage = false;
					}
					uni.hideLoading();
				}
			});
		},
		getUserInfo(e) {
			this.login(e.detail,()=>{
				this.getOrder(true);
				this.isLogin = true;
			}); //登陆
		}
	},
	onShow() {
		if (this.getIsLogin()) {
			this.isLogin = true;
			this.getOrder(true);
		}
	},
	onReachBottom() {
		if (this.hasNextPage) {
			this.getOrder();
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
.content {
	.clear-btn{
		padding-top: 400rpx;
		color: $themeColor;
	}
	padding: 30rpx;
	.tabBox {
		.tab {
			text-align: center;
			width: 172rpx;
			padding: 24rpx 0;
		}
		.active {
			color: $themeColor;
			border-bottom: 2rpx solid $themeColor;
		}
	}
	.list {
		.item {
			padding: 40rpx 0;
			.top {
				font-size: 22rpx;
				padding-bottom: 30rpx;
			}
			.cont {
				> image {
					width: 140rpx;
					height: 140rpx;
					border-radius: 8rpx;
				}
				> view {
					width: 520rpx;
					padding-left: 30rpx;
					font-size: 26rpx;
					.state {
						font-size: 22rpx;
						color: #f51313;
					}
					> view {
						padding-bottom: 10rpx;
					}
				}
			}
			.btnBox {
				padding-top: 20rpx;
				justify-content: flex-end;
				view {
					width: 144rpx;
					height: 50rpx;
					border-radius: 26rpx;
					border: 2rpx solid $themeColor;
					font-size: 22rpx;
					margin-left: 20rpx;
				}
				.yqx {
					color: #ccc;
					border-color: #ccc;
				}
				.wc {
					background-color: $themeColor;
					color: #fff;
				}
			}
		}
	}
}
</style>
