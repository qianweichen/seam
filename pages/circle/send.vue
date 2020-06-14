<template>
	<view>
		<view class="content">
			<textarea value="" placeholder="请输入文字" placeholder-class="fc-9" maxlength="140" v-model="props.content" />
			<view style="text-align: right;">0/140</view>
		</view>
		<sunui-upimg @change="getImageInfo1" ref="upimg1" :upload_count="6" :url="uploadUrl"></sunui-upimg>
		<view class="content"><view class="btn flex-center" @click="submit">立即发布动态</view></view>
	</view>
</template>

<script>
import sunUiUpimg from '@/components/sunui-upimg/sunui-upimg.vue';
export default {
	components: {
		sunUiUpimg: sunUiUpimg
	},
	data() {
		return {
			uploadUrl: this.uploadUrl,
			props: {
				content: '',
				longitude: '',
				dimension: '',
				img:''
			}
		};
	},
	methods: {
		submit() {
			if (!this.props.content) {
				uni.showToast({
					title: '请输入内容',
					icon: 'none'
				});
				return;
			}
			uni.showLoading({
				title: '加载中'
			});
			this.props.token = uni.getStorageSync('token');
			this.request({
				url: '/User/dynamicAdd',
				data: this.props,
				success: res => {
					console.log('发布:', res);
					uni.showToast({
						title:res.data.msg,
					});
					setTimeout(()=>{
						uni.navigateBack();
					},1500);
				}
			});
		},
		getImageInfo1(e) {
			console.log('图片返回1：', e);
			for (var i = 0; i < e.length; i++) {
				e[i] = this.imgUrl + e[i];
			}
			this.props.img = e.join(',');
		}
	},
	onLoad() {
		uni.getLocation({
			type: 'wgs84',
			success: res => {
				this.props.longitude = res.longitude;
				this.props.dimension = res.latitude;
			}
		});
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
