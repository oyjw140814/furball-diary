<template>
  <view class="page-shell">
    <view class="surface hospital-card">
      <text class="hospital-title">{{ hospital.name }}</text>
      <text class="detail-line">{{ hospital.address }}</text>
      <text class="detail-line">{{ hospital.phone }}</text>
      <text class="detail-line">{{ hospital.distance }}km</text>
    </view>

    <view class="section hospital-grid">
      <view class="surface detail-box">
        <text class="detail-label">营业时间</text>
        <text class="detail-value">{{ hospital.hours }}</text>
      </view>
      <view class="surface detail-box">
        <text class="detail-label">排队情况</text>
        <text class="detail-value">{{ hospital.queue }}</text>
      </view>
    </view>

    <view class="section">
      <view class="title-wrap">
        <view class="title-mark" />
        <text class="section-title">擅长项目</text>
      </view>
      <view class="tag-row">
        <text v-for="item in hospital.specialties" :key="item" class="pill">{{ item }}</text>
      </view>
    </view>

    <view class="section surface doctor-card">
      <text class="doctor-title">接诊医生</text>
      <view class="doctor-row">
        <view>
          <text class="doctor-name">陈医生</text>
          <text class="muted">小动物内科 · 8 年经验</text>
        </view>
        <text class="pill">可预约</text>
      </view>
    </view>

    <button class="primary-button pressable section" @click="consult">立即咨询</button>
  </view>
</template>

<script>
import { hospitals } from '../../common/mock'

export default {
  data() {
    return {
      hospital: hospitals[0]
    }
  },
  onLoad(query) {
    this.hospital = hospitals.find(item => item.id === query.id) || hospitals[0]
  },
  methods: {
    consult() {
      uni.showToast({ title: '已为你接入在线咨询', icon: 'none' })
    }
  }
}
</script>

<style scoped lang="scss">
.hospital-card {
  padding: 30rpx;
}

.hospital-title {
  display: block;
  margin-bottom: 18rpx;
  font-size: 34rpx;
  font-weight: 600;
}

.detail-line {
  display: block;
  margin-bottom: 12rpx;
}

.hospital-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16rpx;
}

.detail-box {
  padding: 22rpx;
}

.detail-label,
.detail-value {
  display: block;
}

.detail-label {
  margin-bottom: 8rpx;
  color: #8d8d8d;
  font-size: 22rpx;
}

.detail-value {
  font-size: 27rpx;
  font-weight: 600;
}

.tag-row {
  display: flex;
  gap: 10rpx;
}

.doctor-card {
  padding: 24rpx;
}

.doctor-title {
  display: block;
  margin-bottom: 18rpx;
  font-size: 28rpx;
  font-weight: 600;
}

.doctor-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.doctor-name {
  display: block;
  margin-bottom: 6rpx;
}
</style>
