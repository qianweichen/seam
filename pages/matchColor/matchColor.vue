<template>
	<view>
		<view class="top">
			<view class="tab flex">
				<view :class="{ active: tabIndex == 0 }" class="flex-center" @click="changeTab(0)">配色</view>
				<view :class="{ active: tabIndex == 1 }" class="flex-center" @click="changeTab(1)">估价</view>
			</view>
			<view class="btn flex-center" v-if="tabIndex == 0">
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
				<image class="bg" src="" mode="aspectFill"></image>
				<view class="picBox flex-between">
					<image :class="'tile' + seamIndex" v-for="(item, index) in 9" :key="index" src="../../static/dizhuan.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="colorNav flex">
				<view class="item active">
					<image class="circle" src="../../static/dizhuan.png" mode="aspectFill"></image>
					<view>瓷白</view>
				</view>
				<view class="item">
					<image class="circle" src="../../static/dizhuan.png" mode="aspectFill"></image>
					<view>瓷白</view>
				</view>
				<view class="item">
					<image class="circle" src="../../static/dizhuan.png" mode="aspectFill"></image>
					<view>瓷白</view>
				</view>
			</view>
			<view class="proList flex">
				<view class="title">产品系列</view>
				<view class="list flex">
					<view class="item active">彩砂</view>
					<view class="item">彩砂</view>
					<view class="item">彩砂</view>
					<view class="item">彩砂</view>
				</view>
			</view>
		</view>
		<!-- 估价 -->
		<view class="price" v-else>
			<view class="infoBox">
				<view class="title">瓷砖信息</view>
				<view class="row flex-between">
					<view>
						<view class="title2">瓷砖铺贴表面积(㎡) </view>
						<view class="iptBox flex-between">
							<input type="text" value="" />
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
						<view class="title2">瓷砖规格(毫米)</view>
						<view class="iptBox flex-between">
							<input type="text" value="" />
							<view class="fc-6">mm</view>
						</view>
					</view>
					<view class="flex-center">
						<view style="padding-top: 36rpx;">×</view>
					</view>
					<view>
						<view class="title2">瓷砖缝隙宽度(毫米)</view>
						<view class="iptBox flex-between">
							<input type="text" value="" />
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
						<view class="iptBox flex-between">
							<input type="text" value="" />
							<view class="fc-6">m</view>
						</view>
					</view>
					<view>
						<view class="title2">单价(元/米)</view>
						<view class="iptBox flex-between">
							<input disabled type="text" value="1" />
							<view class="fc-6">元/米</view>
						</view>
					</view>
				</view>
				<view class="row flex-between">
					<view style="width: 100%;">
						<view class="title2">美缝报价</view>
						<view class="iptBox iptBox-l flex-between">
							<input type="text" value="0" />
						</view>
					</view>
				</view>
			</view>
			<view class="btnBox">
				<view class="btn flex-center">重置</view>
				<view class="btn active flex-center">计算</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabIndex: 1,
			seamIndex: 0,
			windowWidth: 0
		};
	},
	methods: {
		changeTab(index) {
			this.tabIndex = index;
		},
		changeSeam(index) {
			this.seamIndex = index;
		}
	},
	onLoad() {
		uni.getSystemInfo({
			success: res => {
				this.windowWidth = res.windowWidth;
			}
		});
	}
};
</script>

<style lang="scss">
@import './matchColor.scss';
</style>
