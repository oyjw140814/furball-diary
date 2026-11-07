<template>
  <view class="page-shell">
    <view class="surface detail-card">
      <text class="detail-title">{{ record.title }}</text>
      <text class="muted">{{ record.date }}</text>
      <text class="detail-body">{{ record.detail }}</text>
    </view>

    <view class="section detail-grid">
      <view class="surface metric-card">
        <text class="metric-value">已完成</text>
        <text class="metric-label">记录状态</text>
      </view>
      <view class="surface metric-card">
        <text class="metric-value">一般</text>
        <text class="metric-label">优先级</text>
      </view>
    </view>

    <view class="section">
      <view class="title-wrap">
        <view class="title-mark" />
        <text class="section-title">备注</text>
      </view>
      <view class="surface note-card">
        <text>下次可继续补充食欲、精神和照片，方便形成更完整的健康轨迹。</text>
      </view>
    </view>

    <view class="section action-row">
      <button class="secondary-button pressable" @click="showActionToast('已打开照片选择')">添加照片</button>
      <button class="primary-button pressable" @click="showActionToast('已进入备注编辑')">追加备注</button>
    </view>
  </view>
</template>

<script>
import { recentRecords, weightRecords } from '../../common/mock'

export default {
  data() {
    return {
      record: {
        title: '记录详情',
        date: '',
        detail: ''
      }
    }
  },
  onLoad(query) {
    const recent = recentRecords.find(item => item.id === query.id)
    const weight = weightRecords.find(item => item.id === query.id)
    if (recent) {
      this.record = recent
      return
    }
    if (weight) {
      this.record = {
        title: '体重记录',
        date: weight.date,
        detail: `本次记录体重为 ${weight.weight}kg。`
      }
    }
  },
  methods: {
    showActionToast(title) {
      uni.showToast({ title, icon: 'none' })
    }
  }
}
</script>

<style scoped lang="scss">
.detail-card {
  padding: 30rpx;
}

.detail-title {
  display: block;
  margin-bottom: 10rpx;
  font-size: 34rpx;
  font-weight: 600;
}

.detail-body {
  display: block;
  margin-top: 24rpx;
  line-height: 1.8;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16rpx;
}

.metric-card {
  padding: 22rpx;
  text-align: center;
}

.metric-value,
.metric-label {
  display: block;
}

.metric-value {
  margin-bottom: 8rpx;
  color: #ff7f50;
  font-size: 28rpx;
  font-weight: 600;
}

.metric-label {
  color: #8d8d8d;
  font-size: 22rpx;
}

.note-card {
  padding: 24rpx;
  line-height: 1.8;
}

.action-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16rpx;
}

.secondary-button {
  border: 1rpx solid rgba(255, 127, 80, 0.18);
  border-radius: 16rpx;
  background: #ffffff;
  color: #ff7f50;
}
</style>
