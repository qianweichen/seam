<template>
	<view class="content">
		<view class="item flex-between" @click="upLoadPic(1)">
			<view>头像</view>
			<image class="circle" :src="props.header_img" mode="aspectFill" style="background-color: #666;"></image>
		</view>
		<view class="item flex-between">
			<view>姓名</view>
			<input type="text" v-model="props.name" placeholder="请输入姓名" placeholder-class="fc-c" />
		</view>
		<view class="item flex-between">
			<view>电话</view>
			<input type="number" v-model="props.phone" placeholder="请输入电话号码" placeholder-class="fc-c" />
		</view>
		<view class="item flex-between">
			<view>身份证号码</view>
			<input type="text" v-model="props.sfz_num" placeholder="请输入身份证号码" placeholder-class="fc-c" />
		</view>
		<view class="item flex-between">
			<view>地址</view>
			<input type="text" v-model="props.address" placeholder="请输入地址" placeholder-class="fc-c" />
		</view>
		<view class="item flex-between">
			<view>工作时长（年）</view>
			<input type="number" v-model="props.duration" placeholder="请输入工作年限" placeholder-class="fc-c" />
		</view>
		<view class="item flex-between">
			<view>我的简介</view>
			<input type="text" v-model="props.brief" placeholder="请输入个人简介" placeholder-class="fc-c" />
		</view>
		<view class="upimg">
			<view class="title">请上传身份证正反面照片</view>
			<view class="flex-between">
				<view @click="upLoadPic(2)">
					<image :src="props.card_z || '../../static/img.png'" mode="aspectFill"></image>
					<view>身份证正面（照片）</view>
				</view>
				<view @click="upLoadPic(3)">
					<image :src="props.card_f || '../../static/img.png'" mode="aspectFill"></image>
					<view>身份证反面（国徽）</view>
				</view>
			</view>
		</view>
		<view class="btn flex-center" @click="submit">提交入驻申请</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			props: {
				header_img: '',
				name: '',
				phone: '',
				sfz_num: '',
				card_z: '',
				card_f: '',
				address: '',
				duration: '',
				brief: ''
			}
		};
	},
	methods: {
		submit() {
			if (!this.props.name) {
				uni.showToast({
					title: '请输入姓名',
					icon: 'none'
				});
				return;
			}
			if (!this.props.phone) {
				uni.showToast({
					title: '请输入电话',
					icon: 'none'
				});
				return;
			}
			if (!this.checkPhone(this.props.phone)) {
				uni.showToast({
					title: '手机号格式有误',
					icon: 'none'
				});
				return;
			}
			if (!this.props.sfz_num) {
				uni.showToast({
					title: '请输入身份证号',
					icon: 'none'
				});
				return;
			}
			if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(this.props.sfz_num)) {
				uni.showToast({
					title: '身份证号格式错误',
					icon: 'none'
				});
				return;
			}
			if (!this.props.card_z || !this.props.card_f) {
				uni.showToast({
					title: '请上传身份证正反面照片',
					icon: 'none'
				});
				return;
			}
			if (!this.props.address) {
				uni.showToast({
					title: '请输入地址',
					icon: 'none'
				});
				return;
			}
			if (!this.props.duration) {
				uni.showToast({
					title: '请输入工作年限',
					icon: 'none'
				});
				return;
			}
			if (!this.props.brief) {
				uni.showToast({
					title: '请输入个人简介',
					icon: 'none'
				});
				return;
			}
			this.props.token = uni.getStorageSync('token');
			uni.showLoading({
				title: '加载中'
			});
			this.request({
				url: '/User/masterSettled',
				data: this.props,
				success: res => {
					console.log('入驻:', res);
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					});
				}
			});
		},
		upLoadPic(type) {
			//1：头像 2：正面 3：反面
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: res => {
					this.props.token = uni.getStorageSync('token');
					this.uploadFile({
						filePath: res.tempFilePaths[0],
						formData: this.props,
						success: res => {
							var res = JSON.parse(res.data);
							if (type == 1) {
								this.props.header_img = this.imgUrl + res.data;
							} else if (type == 2) {
								this.props.card_z = this.imgUrl + res.data;
							} else if (type == 3) {
								this.props.card_f = this.imgUrl + res.data;
							}
						}
					});
				}
			});
		}
	},
	onLoad() {
		this.props.header_img = uni.getStorageSync('userInfo').header_img;
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
		border-bottom: 2rpx solid #e5e5e5;
		image {
			width: 80rpx;
			height: 80rpx;
		}
		input {
			text-align: right;
		}
	}
	.upimg {
		font-size: 26rpx;
		text-align: center;
		.title {
			padding: 30rpx 0;
			text-align: left;
		}
		image {
			width: 330rpx;
			height: 200rpx;
			background: rgba(241, 241, 241, 1);
			border-radius: 12rpx;
			margin-bottom: 22rpx;
		}
	}
	.btn {
		height: 100rpx;
		background: $themeColor;
		border-radius: 50rpx;
		font-size: 30rpx;
		color: #fff;
		margin: 52rpx 0;
	}
}
</style>
