<template>
	<view>
		<view class="top">
			<view class="tab flex">
				<view :class="{ active: tabIndex == 0 }" class="flex-center" @click="changeTab(0)">配色</view>
				<view :class="{ active: tabIndex == 1 }" class="flex-center" @click="changeTab(1)">估价</view>
			</view>
			<view class="btn flex-center" v-if="tabIndex == 0" @click="chooseImg">
				<image src="../../static/icon-pz.png" mode="widthFix"></image>
				<view>自定义拍照瓷砖</view>
			</view>
		</view>
		<!-- 配色 -->
		<view class="ccolor" v-if="tabIndex == 0">
			<view class="ccolor-top">
				<view class="title">请选择缝隙宽度</view>
				<view class="chooseBox flex-between">
					<view :class="{ active: seamIndex == 0 }" class="item" @click="changeSeam(0)">
						<view class="type flex-center">细缝</view>
						<view>1-2mm宽</view>
					</view>
					<view :class="{ active: seamIndex == 1 }" class="item" @click="changeSeam(1)">
						<view class="type flex-center">中缝</view>
						<view>2-3mm宽</view>
					</view>
					<view :class="{ active: seamIndex == 2 }" class="item" @click="changeSeam(2)">
						<view class="type flex-center">宽缝</view>
						<view>3-5mm宽</view>
					</view>
				</view>
			</view>
			<view class="colorBox" :style="'width:' + windowWidth + 'px;' + 'height:' + windowWidth + 'px;'">
				<image class="bg" :src="imgBg" mode="aspectFill"></image>
				<view class="picBox flex-between"><image :class="'tile' + seamIndex" v-for="(item, index) in 9" :key="index" src="../../static/dizhuan.png" mode="aspectFill"></image></view>
			</view>
			<view class="colorNav flex">
				<view class="item" :class="{ active: item.active }" v-for="(item, index) in twoLevList" :key="index" @click="clickTwoLev(index)">
					<image class="circle" :src="item.img" mode="aspectFill"></image>
					<view>{{ item.name }}</view>
				</view>
			</view>
			<view class="proList flex">
				<view class="title">产品系列</view>
				<view class="list flex">
					<view class="item" :class="{ active: item.active }" v-for="(item, index) in oneLevList" :key="index" @click="getTwoLev(item.id, index)">{{ item.name }}</view>
				</view>
			</view>
		</view>
		<!-- 估价 -->
		<view class="price" v-else>
			<view class="infoBox">
				<view class="title">瓷砖信息</view>
				<view class="row flex-between">
					<view>
						<view class="title2">瓷砖铺贴表面积(㎡)</view>
						<view class="iptBox flex-between">
							<input type="number" v-model="props.s" />
							<view class="fc-6">㎡</view>
						</view>
					</view>
					<view>
						<view class="title2">瓷砖缝隙宽度(毫米)</view>
						<view class="iptBox flex-between">
							<input disabled type="text" value="1" />
							<view class="fc-6">mm</view>
						</view>
					</view>
				</view>
				<view class="row flex-between">
					<view>
						<view class="title2">瓷砖规格长度(毫米)</view>
						<view class="iptBox flex-between">
							<input type="number" v-model="props.h" />
							<view class="fc-6">mm</view>
						</view>
					</view>
					<view class="flex-center"><view style="padding-top: 36rpx;">×</view></view>
					<view>
						<view class="title2">瓷砖缝隙宽度(毫米)</view>
						<view class="iptBox flex-between">
							<input type="number" v-model="props.w" />
							<view class="fc-6">mm</view>
						</view>
					</view>
				</view>
			</view>
			<view class="infoBox">
				<view class="title">获取价格</view>
				<view class="row flex-between">
					<view>
						<view class="title2">美缝总米(m)</view>
						<view class="iptBox iptBox-l flex-between">
							<input type="number" disabled v-model="props.l" />
							<view class="fc-6">m</view>
						</view>
					</view>
					<view>
						<view class="title2">单价(元/米)</view>
						<view class="iptBox flex-between">
							<input type="number" v-model="props.price" />
							<view class="fc-6">元/米</view>
						</view>
					</view>
				</view>
				<view class="row flex-between">
					<view style="width: 100%;">
						<view class="title2">美缝报价</view>
						<view class="iptBox iptBox-l flex-between"><input type="text" v-model="props.sum" /></view>
					</view>
				</view>
			</view>
			<view class="btnBox">
				<view class="btn flex-center" @click="clear">重置</view>
				<view class="btn active flex-center" @click="count">计算</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			imgUrl: this.imgUrl,
			tabIndex: 0,
			seamIndex: 0,
			windowWidth: 0,
			oneLevList: [],
			twoLevList: [],
			imgBg: '',
			props: {
				s: '',
				w: '',
				h: '',
				l: '',
				price: '',
				sum: ''
			}
		};
	},
	methods: {
		clear() {
			this.props = {
				s: '',
				w: '',
				h: '',
				l: '',
				price: '',
				sum: ''
			};
		},
		count() {
			if (!this.props.s || !this.props.h || !this.props.w || !this.props.price) {
				uni.showToast({
					title: '请输入完整数据',
					icon: 'none'
				});
				return;
			}
			// (C+K)*[S/(C*K)]
			//长度为C,瓷砖的宽度为K,面积为s
			var s = this.props.s,
				c = this.props.h,
				k = this.props.w;
			this.props.l = ((c + k) * (s / (c * k))).toFixed(0);
			this.props.sum = this.props.l * this.props.price;
		},
		chooseImg() {
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: res => {
					this.imgBg = res.tempFilePaths[0];
				}
			});
		},
		clickTwoLev(index) {
			for (var i = 0; i < this.twoLevList.length; i++) {
				this.twoLevList[i].active = false;
			}
			this.twoLevList[index].active = true;
			this.twoLevList.splice(index, 1, this.twoLevList[index]);
			this.imgBg = this.twoLevList[index].img;
		},
		changeTab(index) {
			this.tabIndex = index;
		},
		changeSeam(index) {
			this.seamIndex = index;
		},
		getTwoLev(pid, index) {
			for (var i = 0; i < this.oneLevList.length; i++) {
				this.oneLevList[i].active = false;
			}
			this.oneLevList[index].active = true;
			uni.showLoading({
				title: '加载中'
			});
			this.request({
				url: '/login/shopSpecs',
				data: {
					token: uni.getStorageSync('token'),
					pid
				},
				success: res => {
					console.log('类型2:', res);
					for (var i = 0; i < res.data.data.length; i++) {
						res.data.data[i].img = this.imgUrl + res.data.data[i].img;
					}
					this.twoLevList = res.data.data;
					this.clickTwoLev(0);
					uni.hideLoading();
				}
			});
		},
		getShopSpecs(pid) {
			uni.showLoading({
				title: '加载中'
			});
			this.request({
				url: '/login/shopSpecs',
				data: {
					token: uni.getStorageSync('token'),
					pid
				},
				success: res => {
					console.log('类型:', res);
					this.oneLevList = res.data.data;
					uni.hideLoading();
					this.getTwoLev(res.data.data[0].id, 0);
				}
			});
		}
	},
	onLoad() {
		uni.getSystemInfo({
			success: res => {
				this.windowWidth = res.windowWidth;
			}
		});

		this.getShopSpecs(0);
	}
};
</script>

<style lang="scss">
@import './matchColor.scss';
</style>
