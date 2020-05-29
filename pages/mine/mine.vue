<template>
	<view>
		<view class="bg"></view>
		<view class="infoBox flex-center">
			<view>
				<image
					class="circle"
					src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590735968292&di=8252314f7136508dd0bcad14f55a6c3f&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201810%2F28%2F20181028190837_scyfn.thumb.700_0.jpeg"
					mode="aspectFill"
				></image>
				<view>吴师傅</view>
			</view>
		</view>
		<view class="btnBox flex-between">
			<navigator url="../matchColor/matchColor" hover-class="none">
				<view class="btn flex-center">
					<view class="icon flex-center circle"><image src="../../static/icon-cl.png" mode="widthFix"></image></view>
					<view>配色估价</view>
				</view>
			</navigator>
			<navigator url="../enter/enter" hover-class="none">
				<view class="btn flex-center">
					<view class="icon flex-center circle"><image src="../../static/icon-rz.png" mode="widthFix"></image></view>
					<view>师傅入驻</view>
				</view>
			</navigator>
		</view>
		<view class="list">
			<navigator url="../circle/circleDetail" hover-class="none">
				<view class="item flex-between">
					<view class="flex">
						<image class="icon" src="../../static/icon-sy.png" mode="widthFix"></image>
						<view>师傅主页</view>
					</view>
					<image class="right" src="../../static/right-b.png" mode="widthFix"></image>
				</view>
			</navigator>
			<navigator url="../circle/circle" hover-class="none">
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
		return {};
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
