<template>
  <view class="page-shell">
    <view class="picker-row surface pressable">
      <text>选择宠物</text>
      <picker :range="pets" :value="selectedPet" @change="selectedPet = Number($event.detail.value)">
        <view class="picker-value">{{ pets[selectedPet] }}</view>
      </picker>
    </view>

    <view class="section summary-grid">
      <view v-for="item in weightSummary" :key="item.id" class="surface summary-card">
        <text class="summary-label">{{ item.label }}</text>
        <text class="summary-value">{{ item.value }}</text>
      </view>
    </view>

    <view class="section goal-grid">
      <view v-for="item in weightGoals" :key="item.id" class="surface goal-card">
        <text class="goal-label">{{ item.title }}</text>
        <text class="goal-value">{{ item.value }}</text>
      </view>
    </view>

    <view class="section">
      <view class="title-wrap">
        <view class="title-mark" />
        <text class="section-title">体重趋势</text>
      </view>
      <u-chart type="line" :series="weightSeries" :x-axis="dateLabels" />
    </view>

    <view class="section">
      <view class="title-wrap">
        <view class="title-mark" />
        <text class="section-title">趋势提醒</text>
      </view>
      <view class="surface alert-card">
        <view v-for="item in weightAlerts" :key="item.id" class="alert-row">
          <text class="pill">{{ item.level }}</text>
          <view>
            <text class="alert-title">{{ item.title }}</text>
            <text class="alert-note">{{ item.note }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="title-wrap">
        <view class="title-mark" />
        <text class="section-title">健康观察</text>
      </view>
      <view class="surface check-card">
        <view v-for="item in healthChecks" :key="item.id" class="check-row info-row">
          <text>{{ item.title }}</text>
          <text class="pill">{{ item.status }}</text>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="title-wrap">
        <view class="title-mark" />
        <text class="section-title">历史记录</text>
      </view>
      <view class="surface">
        <view
          v-for="item in weightRecords"
          :key="item.id"
          class="pressable list-pressable"
        >
          <uni-list-item
            :title="item.date"
            :note="item.weight + 'kg'"
            clickable
            @click="goToRecordDetail(item.id)"
          />
        </view>
      </view>
    </view>

    <uni-fab
      ref="fab"
      class="weight-fab"
      horizontal="right"
      vertical="bottom"
      icon="plusempty"
      @fabClick="showAddWeightModal"
    />

    <uni-popup ref="weightPopup" type="center">
      <view class="modal surface">
        <text class="modal-title">添加体重记录</text>
        <input v-model="draftWeight" class="modal-input" type="digit" placeholder="请输入体重 kg" />
        <button class="primary-button pressable" @click="addWeight">保存记录</button>
      </view>
    </uni-popup>

    <app-tab-bar current="/pages/weight/index" />
  </view>
</template>

<script>
import AppTabBar from '../../components/AppTabBar.vue'
import UChart from '../../components/UChart.vue'
import {
  healthChecks,
  pets,
  weightAlerts,
  weightGoals,
  weightRecords,
  weightSummary
} from '../../common/mock'

export default {
  components: { AppTabBar, UChart },
  data() {
    return {
      pets,
      selectedPet: 0,
      weightRecords: [...weightRecords],
      weightSummary,
      healthChecks,
      weightGoals,
      weightAlerts,
      draftWeight: ''
    }
  },
  computed: {
    dateLabels() {
      return this.weightRecords.map(item => item.date.slice(5))
    },
    weightSeries() {
      return [
        {
          name: '体重',
          color: '#FF7F50',
          data: this.weightRecords.map(item => item.weight)
        }
      ]
    }
  },
  methods: {
    showAddWeightModal() {
      this.$refs.weightPopup.open()
    },
    addWeight() {
      const weight = Number(this.draftWeight)
      if (!weight) {
        uni.showToast({ title: '请输入有效体重', icon: 'none' })
        return
      }
      const today = new Date().toISOString().slice(0, 10)
      this.weightRecords.push({
        id: `w${Date.now()}`,
        date: today,
        weight
      })
      this.draftWeight = ''
      this.$refs.weightPopup.close()
      uni.showToast({ title: '已添加', icon: 'success' })
    },
    goToRecordDetail(id) {
      uni.navigateTo({ url: `/pages/record-detail/index?id=${id}` })
    }
  }
}
</script>

<style scoped lang="scss">
.picker-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28rpx;
}

.picker-value {
  padding: 8rpx 16rpx;
  border: 1rpx solid rgba(255, 127, 80, 0.16);
  border-radius: 999rpx;
  background: #fff6f2;
  color: #ff7f50;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16rpx;
}

.summary-card {
  padding: 20rpx 12rpx;
  text-align: center;
}

.summary-label,
.summary-value {
  display: block;
}

.summary-label {
  margin-bottom: 8rpx;
  color: #8d8d8d;
  font-size: 21rpx;
}

.summary-value {
  color: #ff7f50;
  font-size: 28rpx;
  font-weight: 600;
}

.check-card {
  overflow: hidden;
}

.check-row {
  display: flex;
  min-height: 84rpx;
  align-items: center;
  justify-content: space-between;
  padding: 0 24rpx;
}

.goal-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16rpx;
}

.goal-card {
  padding: 22rpx;
}

.goal-label,
.goal-value {
  display: block;
}

.goal-label {
  margin-bottom: 8rpx;
  color: #8d8d8d;
  font-size: 22rpx;
}

.goal-value {
  font-size: 28rpx;
  font-weight: 600;
}

.alert-card {
  padding: 22rpx;
}

.alert-row {
  display: flex;
  align-items: flex-start;
  gap: 16rpx;
}

.alert-title,
.alert-note {
  display: block;
}

.alert-title {
  margin-bottom: 6rpx;
  font-weight: 600;
}

.alert-note {
  color: #8d8d8d;
  font-size: 22rpx;
}

.modal {
  width: 560rpx;
  padding: 32rpx;
}

.modal-title {
  display: block;
  margin-bottom: 24rpx;
  font-size: 30rpx;
  font-weight: 600;
}

.modal-input {
  height: 84rpx;
  margin-bottom: 24rpx;
  padding: 0 20rpx;
  border: 1rpx solid #f1d7cf;
  border-radius: 12rpx;
  background: #fffaf8;
}

::v-deep .weight-fab .uni-fab__circle {
  transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
}

::v-deep .weight-fab .uni-fab__circle:active {
  transform: scale(1.05);
}
</style>
