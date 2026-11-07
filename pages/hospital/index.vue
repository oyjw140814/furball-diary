<template>
  <view class="page-shell">
    <uni-search-bar
      v-model="query"
      placeholder="搜索医院名称或位置"
      @confirm="searchHospitals"
    />

    <view class="section filter-row">
      <text
        v-for="item in filters"
        :key="item"
        :class="['filter-chip', { active: activeFilter === item }]"
        @click="activeFilter = item"
      >
        {{ item }}
      </text>
    </view>

    <view class="section surface map-card">
      <map
        class="map"
        :latitude="31.2304"
        :longitude="121.4737"
        :markers="hospitalMarkers"
        @markertap="handleMarkerTap"
      />
      <view
        v-if="selectedHospital"
        class="hospital-popover surface pressable"
        @click="goToHospitalDetail(selectedHospital.id)"
      >
        <text class="popover-title">{{ selectedHospital.name }}</text>
        <text class="muted">{{ selectedHospital.address }}</text>
      </view>
    </view>

    <view v-if="nearestHospital" class="section nearest-card surface pressable" @click="goToHospitalDetail(nearestHospital.id)">
      <view>
        <text class="nearest-kicker">离你最近</text>
        <text class="nearest-name">{{ nearestHospital.name }}</text>
      </view>
      <view class="nearest-meta">
        <text>{{ nearestHospital.distance }}km</text>
        <text class="pill">{{ nearestHospital.queue }}</text>
      </view>
    </view>

    <view class="section clinic-card surface">
      <view class="section-heading">
        <view class="title-wrap">
          <view class="title-mark" />
          <text class="section-title">AI 初步问诊</text>
        </view>
        <text class="section-link">参考</text>
      </view>
      <textarea
        v-model="clinicInput"
        class="clinic-input"
        placeholder="描述症状：例如不吃饭、打喷嚏、精神不佳"
      />
      <button class="primary-button pressable" @click="generateAdvice">获取建议</button>
      <view v-if="clinicAdvice" class="clinic-answer subtle-panel">
        <text>{{ clinicAdvice }}</text>
      </view>
      <view class="example-row">
        <text
          v-for="item in clinicExamples"
          :key="item.id"
          class="example-chip"
          @click="useExample(item)"
        >
          {{ item.symptom }}
        </text>
      </view>
    </view>

    <view class="section">
      <view class="title-wrap">
        <view class="title-mark" />
        <text class="section-title">便捷服务</text>
      </view>
      <view class="service-grid">
        <view v-for="item in services" :key="item.id" class="service-card surface pressable">
          <text class="service-name">{{ item.name }}</text>
          <text class="service-note">{{ item.note }}</text>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="title-wrap">
        <view class="title-mark" />
        <text class="section-title">医院列表</text>
      </view>
      <view class="surface">
        <view
          v-for="hospital in filteredHospitals"
          :key="hospital.id"
          class="pressable list-pressable"
        >
          <uni-list-item
            :title="hospital.name"
            :note="hospital.distance + 'km'"
            clickable
            @click="goToHospitalDetail(hospital.id)"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { clinicExamples, hospitalServices, hospitals } from '../../common/mock'

export default {
  data() {
    return {
      query: '',
      searchedQuery: '',
      hospitals,
      services: hospitalServices,
      clinicExamples,
      clinicInput: '',
      clinicAdvice: '',
      selectedHospital: null,
      filters: ['全部', '急诊', '疫苗', '皮肤'],
      activeFilter: '全部'
    }
  },
  computed: {
    filteredHospitals() {
      return this.hospitals.filter(item => {
        const matchQuery = !this.searchedQuery || `${item.name}${item.address}`.includes(this.searchedQuery)
        const matchFilter = this.activeFilter === '全部' || item.specialties.includes(this.activeFilter)
        return matchQuery && matchFilter
      })
    },
    nearestHospital() {
      return this.filteredHospitals[0]
    },
    hospitalMarkers() {
      return this.filteredHospitals.map((hospital, index) => ({
        id: index,
        latitude: hospital.latitude,
        longitude: hospital.longitude,
        title: hospital.name,
        iconPath: '/static/images/hospital-marker.png',
        width: 28,
        height: 28,
        callout: {
          content: hospital.name,
          display: 'BYCLICK'
        }
      }))
    }
  },
  methods: {
    searchHospitals() {
      this.searchedQuery = this.query.trim()
    },
    handleMarkerTap(event) {
      const hospital = this.filteredHospitals[event.detail.markerId]
      this.selectedHospital = hospital
    },
    goToHospitalDetail(id) {
      uni.navigateTo({ url: `/pages/hospital-detail/index?id=${id}` })
    },
    useExample(item) {
      this.clinicInput = item.symptom
      this.clinicAdvice = item.advice
    },
    generateAdvice() {
      const input = this.clinicInput.trim()
      if (!input) {
        uni.showToast({ title: '请先描述症状', icon: 'none' })
        return
      }
      const urgentWords = ['吐', '血', '抽搐', '呼吸', '昏迷', '腹泻', '高烧']
      if (urgentWords.some(word => input.includes(word))) {
        this.clinicAdvice = '包含潜在急症关键词，建议尽快联系线下宠物医院，优先评估体温、呼吸和脱水状态。'
        return
      }
      this.clinicAdvice = '建议记录症状发生时间、进食饮水、精神状态和排泄变化；若持续超过 24 小时或加重，请线下就医。'
    }
  }
}
</script>

<style scoped lang="scss">
.map-card {
  position: relative;
  overflow: hidden;
}

.filter-row {
  display: flex;
  gap: 12rpx;
}

.filter-chip {
  padding: 10rpx 18rpx;
  border: 1rpx solid rgba(255, 127, 80, 0.18);
  border-radius: 999rpx;
  background: #ffffff;
  color: #8d8d8d;
  font-size: 23rpx;
}

.filter-chip.active {
  border-color: #ff7f50;
  background: #fff6f2;
  color: #ff7f50;
}

.map {
  width: 100%;
  height: 360rpx;
}

.hospital-popover {
  position: absolute;
  right: 20rpx;
  bottom: 20rpx;
  left: 20rpx;
  padding: 18rpx 20rpx;
}

.popover-title {
  display: block;
  margin-bottom: 4rpx;
  font-weight: 600;
}

.nearest-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22rpx 24rpx;
}

.nearest-kicker,
.nearest-name {
  display: block;
}

.nearest-kicker {
  margin-bottom: 6rpx;
  color: #8d8d8d;
  font-size: 22rpx;
}

.nearest-name {
  font-size: 28rpx;
  font-weight: 600;
}

.nearest-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8rpx;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16rpx;
}

.service-card {
  padding: 20rpx 12rpx;
  text-align: center;
}

.service-name,
.service-note {
  display: block;
}

.service-name {
  margin-bottom: 8rpx;
  font-size: 24rpx;
  font-weight: 600;
}

.service-note {
  color: #8d8d8d;
  font-size: 20rpx;
}

.clinic-card {
  padding: 24rpx;
}

.clinic-input {
  box-sizing: border-box;
  width: 100%;
  min-height: 150rpx;
  margin-bottom: 16rpx;
  padding: 18rpx;
  border: 1rpx solid rgba(255, 127, 80, 0.18);
  border-radius: 16rpx;
  background: #fffaf8;
}

.clinic-answer {
  margin-top: 16rpx;
  padding: 20rpx;
  line-height: 1.7;
}

.example-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-top: 16rpx;
}

.example-chip {
  padding: 8rpx 14rpx;
  border: 1rpx solid rgba(255, 127, 80, 0.16);
  border-radius: 999rpx;
  color: #ff7f50;
  font-size: 22rpx;
}
</style>
