<template>
	<view>
		<view class="bg"></view>
		<view class="infoBox flex-center">
			<view>
				<image class="circle" :src="userInfo.header_img" mode="aspectFill"></image>
				<view>{{ userInfo.name }}</view>
			</view>
		</view>
		<view class="btnBox flex-between">
			<navigator url="../matchColor/matchColor" hover-class="none">
				<view class="btn flex-center">
					<view class="icon flex-center circle"><image src="../../static/icon-cl.png" mode="widthFix"></image></view>
					<view>配色估价</view>
				</view>
			</navigator>
			<view class="btn flex-center" @click="goEnter">
				<view class="icon flex-center circle"><image src="../../static/icon-rz.png" mode="widthFix"></image></view>
				<view>师傅入驻</view>
			</view>
		</view>
		<view class="list">
			<navigator :url="'../circle/circleDetail?id='+userInfo.id" hover-class="none" v-if="applyStatus == 3">
				<view class="item flex-between">
					<view class="flex">
						<image class="icon" src="../../static/icon-sy.png" mode="widthFix"></image>
						<view>我的主页</view>
					</view>
					<image class="right" src="../../static/right-b.png" mode="widthFix"></image>
				</view>
			</navigator>
			<!-- <navigator url="../circle/circle" hover-class="none"> -->
			<navigator url="../circle/circleDetail?id=all" hover-class="none">
				<view class="item flex-between">
					<view class="flex">
						<image class="icon" src="../../static/icon-q.png" mode="widthFix"></image>
						<view>师傅圈</view>
					</view>
					<image class="right" src="../../static/right-b.png" mode="widthFix"></image>
				</view>
			</navigator>
		</view>
		<view class="list-line"></view>
		<view class="list">
			<button open-type="feedback" class="noClassBtn">
				<view class="item flex-between">
					<view class="flex">
						<image class="icon" src="../../static/icon-fk.png" mode="widthFix"></image>
						<view>意见反馈</view>
					</view>
					<image class="right" src="../../static/right-b.png" mode="widthFix"></image>
				</view>
			</button>
			<button open-type="contact" class="noClassBtn">
				<view class="item flex-between">
					<view class="flex">
						<image class="icon" src="../../static/icon-kf.png" mode="widthFix"></image>
						<view>微信客服</view>
					</view>
					<image class="right" src="../../static/right-b.png" mode="widthFix"></image>
				</view>
			</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: '',
			applyStatus: '' //1 未申请 2待审核 3 已通过 4已拒绝
		};
	},
	methods: {
		goEnter(){
			if(this.applyStatus==1){
				uni.navigateTo({
					url:'../enter/enter'
				});
			}else if(this.applyStatus==2){
				uni.showToast({
					title:'正在审核中，请耐心等待',
					icon:'none'
				});
			}else if(this.applyStatus==3){
				uni.showToast({
					title:'已入驻成功',
					icon:'none'
				});
			}else if(this.applyStatus==4){
				uni.showToast({
					title:'入驻申请被拒绝，如有疑问请联系客服',
					icon:'none'
				});
			}
		},
		getApplyStatus() {
			this.request({
				url: '/User/applyStatus',
				data: {
					token: uni.getStorageSync('token')
				},
				success: res => {
					console.log('审核状态:', res);
					this.applyStatus = res.data.data; //1 未申请 2待审核 3 已通过 4已拒绝
				}
			});
		}
	},
	onLoad() {
		this.userInfo = uni.getStorageSync('userInfo');
	},
	onShow() {
		this.getApplyStatus();
	}
};
</script>

<style lang="scss">
.bg {
	width: 110%;
	height: 230rpx;
	background-color: $themeColor;
	border-radius: 0 0 50% 50%;
	position: fixed;
	left: -5%;
	top: 0;
	z-index: -1;
}
.infoBox {
	padding-top: 100rpx;
	font-size: 36rpx;
	font-weight: bold;
	text-align: center;
	image {
		width: 212rpx;
		height: 214rpx;
		border: 2rpx solid #fff;
		margin-bottom: 20rpx;
	}
}
.btnBox {
	padding: 0 30rpx;
	padding-top: 80rpx;
	padding-bottom: 20rpx;
	.btn {
		width: 336rpx;
		height: 140rpx;
		background: rgba(241, 241, 241, 1);
		border-radius: 8rpx;
		.icon {
			width: 92rpx;
			height: 92rpx;
			background: $themeColor;
			font-size: 30rpx;
			margin-right: 25rpx;
			image {
				width: 60rpx;
				height: auto;
			}
		}
	}
}
.list-line {
	height: 10rpx;
	background: rgba(242, 242, 242, 1);
}
.list {
	padding: 0 30rpx;
	.item {
		padding: 30rpx 0;
		font-size: 24rpx;
		.icon {
			width: 40rpx;
			height: auto;
			margin-right: 20rpx;
		}
		.right {
			width: 30rpx;
			height: auto;
		}
	}
}
</style>
