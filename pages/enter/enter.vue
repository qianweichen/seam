<template>
	<view class="content">
		<view class="item flex-between">
			<view>头像</view>
			<image class="circle" src="../../static/dizhuan.png" mode="aspectFill"></image>
		</view>
		<view class="item flex-between">
			<view>姓名</view>
			<input type="text" value="" placeholder="请输入姓名" placeholder-class="fc-c"/>
		</view>
		<view class="item flex-between">
			<view>电话</view>
			<input type="text" value="" placeholder="请输入电话号码"  placeholder-class="fc-c"/>
		</view>
		<view class="item flex-between">
			<view>身份证号码</view>
			<input type="text" value="" placeholder="请输入身份证号码"  placeholder-class="fc-c"/>
		</view>
		<view class="item flex-between">
			<view>地址</view>
			<input type="text" value="" placeholder="请输入地址"  placeholder-class="fc-c"/>
		</view>
		<view class="item flex-between">
			<view>工作时长</view>
			<input type="text" value="" placeholder="请输入工作年限"  placeholder-class="fc-c"/>
		</view>
		<view class="item flex-between">
			<view>我的简介</view>
			<input type="text" value="" placeholder="请输入个人简介"  placeholder-class="fc-c"/>
		</view>
		<view class="upimg">
			<view class="title">请上传身份证正反面照片</view>
			<view class="flex-between">
				<view>
					<image src="../../static/img.png" mode="aspectFill"></image>
					<view>身份证正面</view>
				</view>
				<view>
					<image src="../../static/img.png" mode="aspectFill"></image>
					<view>身份证反面</view>
				</view>
			</view>
		</view>
		<view class="btn flex-center">提交入驻申请</view>
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
.content {
	padding: 0 30rpx;
	.item {
		font-size: 26rpx;
		color: #666666;
		padding: 30rpx 0;
		border-bottom: 2rpx solid #E5E5E5;
		image{
			width:80rpx;
			height:80rpx;
		}
		input{
			text-align: right;
		}
	}
	.upimg{
		font-size: 26rpx;
		text-align: center;
		.title{
			padding: 30rpx 0;
			text-align: left;
		}
		image{
			width:330rpx;
			height:200rpx;
			background:rgba(241,241,241,1);
			border-radius:12rpx;
			margin-bottom: 22rpx;
		}
	}
	.btn{
		height:100rpx;
		background:$themeColor;
		border-radius:50rpx;
		font-size:30rpx;
		color: #fff;
		margin: 52rpx 0;
	}
}
</style>
