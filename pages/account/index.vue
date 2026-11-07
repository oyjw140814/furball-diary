<template>
  <view class="page-shell">
    <view class="surface settings-card">
      <text class="settings-title">账号同步</text>
      <text class="muted">当前账号已开启云端同步。</text>
    </view>

    <view class="section surface sync-card">
      <view class="sync-row info-row">
        <text>自动同步</text>
        <switch checked color="#FF7F50" />
      </view>
      <view class="sync-row info-row">
        <text>仅 Wi-Fi 上传照片</text>
        <switch checked color="#FF7F50" />
      </view>
    </view>

    <view class="section">
      <view class="title-wrap">
        <view class="title-mark" />
        <text class="section-title">最近设备</text>
      </view>
      <view class="surface">
        <view v-for="item in devices" :key="item.id" class="device-row info-row">
          <text>{{ item.name }}</text>
          <text class="muted">{{ item.lastSync }}</text>
        </view>
      </view>
    </view>

    <button class="primary-button pressable section" @click="syncNow">立即同步</button>
  </view>
</template>

<script>
import { accountDevices } from '../../common/mock'

export default {
  data() {
    return {
      devices: accountDevices
    }
  },
  methods: {
    syncNow() {
      uni.showToast({ title: '同步完成', icon: 'success' })
    }
  }
}
</script>

<style scoped lang="scss">
.settings-card {
  padding: 30rpx;
}

.settings-title {
  display: block;
  margin-bottom: 12rpx;
  font-size: 34rpx;
  font-weight: 600;
}

.sync-card {
  overflow: hidden;
}

.sync-row,
.device-row {
  display: flex;
  min-height: 88rpx;
  align-items: center;
  justify-content: space-between;
  padding: 0 24rpx;
}
</style>
