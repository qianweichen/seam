<template>
	<view>
		<view class="content">
			<textarea value="" placeholder="请输入文字" placeholder-class="fc-9" maxlength="140" />
			<view style="text-align: right;">0/140</view>
		</view>
		<sunui-upimg @change="getImageInfo1" :upload_auto="true" ref="upimg1" :upload_count="2"></sunui-upimg>
		<view class="content"><view class="btn flex-center">立即发布动态</view></view>
	</view>
</template>

<script>
import sunUiUpimg from '@/components/sunui-upimg/sunui-upimg.vue';
export default {
	components: {
		sunUiUpimg: sunUiUpimg
	},
	data() {
		return {};
	},
	methods: {
		getImageInfo1(e) {
			console.log('图片返回1：', e);
		}
	}
};
</script>

<style lang="scss">
.content {
	font-size: 26rpx;
	padding: 40rpx 30rpx;
	textarea {
		width: 100%;
		height: 200rpx;
	}
	.btn {
		height: 100rpx;
		background: $themeColor;
		border-radius: 50rpx;
		font-size: 30rpx;
		color: #fff;
		margin-top: 90rpx;
	}
}
</style>
