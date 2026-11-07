<script>
export default {
  onShow() { uni.hideTabBar({ animation: false }) },
  onLaunch() {
    console.log('毛球日记启动')
  }
}
</script>

<style lang="scss">
/* H5 uses the original AppTabBar component. */
uni-tabbar { display: none !important; }

@import './uni.scss';

page {
  background: #fffaf8;
  color: #2f2f2f;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.page-shell {
  min-height: 100vh;
  box-sizing: border-box;
  padding: 24rpx 24rpx 132rpx;
}

.section {
  margin-top: 24rpx;
}

.surface {
  background: #ffffff;
  border: 1rpx solid rgba(255, 127, 80, 0.12);
  border-radius: 16rpx;
  box-shadow: 0 8rpx 24rpx rgba(255, 127, 80, 0.08);
}

.pressable {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.pressable:active {
  transform: scale(0.95);
  box-shadow: 0 4rpx 12rpx rgba(255, 127, 80, 0.18);
}

.list-pressable {
  overflow: hidden;
  border-radius: 16rpx;
}

.section-title {
  display: block;
  margin-bottom: 16rpx;
  color: #2f2f2f;
  font-size: 30rpx;
  font-weight: 600;
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16rpx;
}

.title-wrap {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.title-mark {
  width: 10rpx;
  height: 32rpx;
  border-radius: 999rpx;
  background: linear-gradient(180deg, #ff7f50, #ffad8f);
}

.title-wrap .section-title {
  margin-bottom: 0;
}

.section-link {
  padding: 6rpx 14rpx;
  border: 1rpx solid rgba(255, 127, 80, 0.18);
  border-radius: 999rpx;
  background: #fff6f2;
  color: #ff7f50;
  font-size: 24rpx;
}

.pill {
  display: inline-flex;
  align-items: center;
  padding: 6rpx 14rpx;
  border: 1rpx solid rgba(76, 175, 80, 0.16);
  border-radius: 999rpx;
  background: rgba(76, 175, 80, 0.08);
  color: #4caf50;
  font-size: 22rpx;
}

.subtle-panel {
  border: 1rpx dashed rgba(255, 127, 80, 0.18);
  border-radius: 16rpx;
  background: #fffaf8;
}

.info-row + .info-row {
  border-top: 1rpx dashed rgba(255, 127, 80, 0.16);
}

.muted {
  color: #8d8d8d;
}

.primary-button {
  background: #ff7f50 !important;
  border-color: #ff7f50 !important;
  color: #ffffff !important;
  border-radius: 16rpx;
  box-shadow: 0 10rpx 24rpx rgba(255, 127, 80, 0.18);
}
</style>
