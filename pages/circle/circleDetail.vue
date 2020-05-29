<template>
	<view>
		<view class="item flex align-star">
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
			</view>
		</view>
		<view class="tip">
			专业美缝，欢迎咨询
		</view>
		<view class="dynamic">
			<view class="title">师傅动态</view>
			<view class="dynamic-item flex-between align-star" v-for="(item,index) in 5" :key="index">
				<image class="header circle" src="../../static/dizhuan.png" mode="aspectFill"></image>
				<view class="right">
					<view class="name">宋凯军</view>
					<view class="content">最近做的美缝案例,分享出来给大家看一下，又是忙碌的一天！</view>
					<view class="imgbox flex">
						<image src="../../static/dizhuan.png" mode="aspectFill"></image>
						<image src="../../static/dizhuan.png" mode="aspectFill"></image>
						<image src="../../static/dizhuan.png" mode="aspectFill"></image>
					</view>
					<view class="flex-between bottom">
						<view>2020/4/23</view>
						<view class="flex">
							<image class="good" src="../../static/good.png" mode="widthFix"></image>
							<view>0</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="fixedBtn flex">
			<view class="share flex-center">分享</view>
			<navigator class="send flex-center" url="./send" hover-class="none">
				<view>发布动态</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		methods: {
			
		}
	};
</script>

<style lang="scss">
	.item{
		padding: 50rpx 30rpx 40rpx 30rpx;
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
			width: 412rpx;
			padding-top: 19rpx;
		}
	}
	.tip{
		padding: 40rpx 30rpx;
		font-size: 26rpx;
		color: #666;
		border-bottom: 20rpx solid #eee;
	}
.dynamic{
	padding: 30rpx;
	.title{
		font-size: 30rpx;
		padding-bottom: 40rpx;
	}	
	.dynamic-item{
		padding-bottom: 50rpx;
		.header{
			width:70rpx;
			height:70rpx;
		}
		.right{
			width: 600rpx;
			.name{
				font-size: 30rpx;
				height:70rpx;
				line-height:70rpx;
			}
			.content{
				font-size: 26rpx;
				color: #666;
				padding: 16rpx 0;
			}
			.imgbox{
				flex-wrap: wrap;
				image{
					width:190rpx;
					height:190rpx;
					margin-right: 7rpx;
				}
				image:nth-child(3n){
					margin-right: 0;
				}
			}
			.bottom{
				padding-top: 20rpx;
				font-size: 24rpx;
				color: #666;
				image{
					width: 29rpx;
					height: auto;
					margin-right: 9rpx;
				}
			}
		}
	}
}
	.fixedBtn{
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
		.share{
			width: 200rpx;
			height: 100%;
			background-color: #333333;
		}
		.send{
			width: 490rpx;
			height: 100%;
			background-color: $themeColor;
		}
	}
</style>
