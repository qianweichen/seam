<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page{
		border-top: 1rpx solid #f5f5f5;
		color: #333;
	}
	.circle{
		border-radius: 50%;
	}
	.fc-9{
		color: #999;
	}
	.fc-6{
		color: #666;
	}
	.fc-c{
		color: #ccc;
	}
	.noClassBtn{
		padding: 0;
		margin: 0;
		background: #fff;
		color: inherit;
		font-size: inherit;
		line-height: initial;
	}
	.noClassBtn::after {
	  border: none;
	}
	/* 布局 */
	.flex {
		display: flex;
		align-items: center;
	}
	
	.flex-between {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.flex-center {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.flex-around {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	
	.align-star {
		align-items: flex-start;
	}
	
	.flex-column-between {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
