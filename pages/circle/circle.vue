<template>
	<view>
		<view class="item flex align-star"  v-for="(item,index) in 9" :key="index" @click="toDetail">
			<image class="header circle" src="../../static/dizhuan.png" mode="aspectFill"></image>
			<view class="info">
				<view class="flex-between">
					<view class="flex">
						<view class="name">张帅博</view>
						<view class="tag flex-center">5年经验</view>
					</view>
					<view class="flex position">
						<image src="../../static/icon-dw.png" mode="widthFix"></image>
						<view>1.04km</view>
					</view>
				</view>
				<view class="address">广东省深圳市南山区前海大道嘉苑小 区12栋20楼</view>
				<view>工作多年认真负责，技术一流</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		toDetail(){
			uni.navigateTo({
				url:'./circleDetail'
			})
		}
	}
};
</script>

<style lang="scss">
	.item{
		padding: 50rpx 30rpx 70rpx 30rpx;
		border-bottom: 2rpx solid #E5E5E5;
		.header{
			width:100rpx;
			height:100rpx;
		}
		.info{
			width: 568rpx;
			padding-left: 21rpx;
			font-size: 26rpx;
			color: #666;
		}
		.name{
			font-size: 36rpx;
			font-weight: bold;
		}
		.tag{
			width:102rpx;
			height:38rpx;
			background:$themeColor;
			border-radius:8rpx;
			font-size: 24rpx;
			color: #fff;
			margin-left: 10rpx;
		}
		.position{
			font-size: 24rpx;
			color: #bbb;
			image{
				width: 25rpx;
				height: auto;
			}
		}
		.address{
			padding-top: 19rpx;
			padding-bottom: 28rpx;
		}
	}
</style>
