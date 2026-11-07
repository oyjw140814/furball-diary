<template>
  <view class="page-shell">
    <view class="surface filter-card">
      <view class="filter-heading">
        <text class="filter-title">导出设置</text>
        <text class="pill">PDF</text>
      </view>
      <uni-date-picker v-model="dateRange" type="daterange" />
      <picker :range="pets" :value="selectedPet" @change="selectedPet = Number($event.detail.value)">
        <view class="picker-value">{{ pets[selectedPet] }}</view>
      </picker>
    </view>

    <button class="primary-button pressable section" @click="generatePDF">生成 PDF 报告</button>

    <view class="section metric-grid">
      <view v-for="item in reportMetrics" :key="item.id" class="surface metric-card">
        <text class="metric-value">{{ item.value }}</text>
        <text class="metric-label">{{ item.label }}</text>
      </view>
    </view>

    <view class="section">
      <view class="title-wrap">
        <view class="title-mark" />
        <text class="section-title">报告内容</text>
      </view>
      <view class="surface section-card">
        <view v-for="item in reportSections" :key="item.id" class="section-row info-row">
          <text>{{ item.title }}</text>
          <switch :checked="item.checked" color="#FF7F50" />
        </view>
      </view>
    </view>

    <view class="section">
      <view class="title-wrap">
        <view class="title-mark" />
        <text class="section-title">历史导出</text>
      </view>
      <view class="surface">
        <view
          v-for="pdf in pdfList"
          :key="pdf.id"
          class="pressable list-pressable"
        >
          <uni-list-item
            :title="pdf.name"
            :note="pdf.date"
            clickable
            @click="previewPDF(pdf.url)"
          />
        </view>
      </view>
    </view>

    <uni-popup ref="pdfPopup" type="center">
      <view class="preview surface">
        <text class="modal-title">PDF 预览</text>
        <text class="muted">{{ previewUrl }}</text>
        <button class="primary-button pressable" @click="$refs.pdfPopup.close()">关闭</button>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { pets, pdfList, reportMetrics, reportSections } from '../../common/mock'

export default {
  data() {
    return {
      pets,
      selectedPet: 0,
      dateRange: [],
      pdfList: [...pdfList],
      reportMetrics,
      reportSections,
      previewUrl: ''
    }
  },
  methods: {
    generatePDF() {
      const today = new Date().toISOString().slice(0, 10)
      this.pdfList.unshift({
        id: `p${Date.now()}`,
        name: `${this.pets[this.selectedPet]}_${today}_健康报告.pdf`,
        date: today,
        url: `/static/reports/${today}.pdf`
      })
      uni.showToast({ title: '报告已生成', icon: 'success' })
    },
    previewPDF(url) {
      this.previewUrl = url
      this.$refs.pdfPopup.open()
    }
  }
}
</script>

<style scoped lang="scss">
.filter-card {
  display: grid;
  gap: 20rpx;
  padding: 24rpx;
}

.filter-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filter-title {
  font-size: 28rpx;
  font-weight: 600;
}

.picker-value {
  min-height: 72rpx;
  line-height: 72rpx;
  padding: 0 20rpx;
  border-radius: 12rpx;
  background: #fffaf8;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16rpx;
}

.metric-card {
  padding: 22rpx 10rpx;
  text-align: center;
}

.metric-value,
.metric-label {
  display: block;
}

.metric-value {
  margin-bottom: 8rpx;
  color: #ff7f50;
  font-size: 30rpx;
  font-weight: 600;
}

.metric-label {
  color: #8d8d8d;
  font-size: 22rpx;
}

.section-card {
  overflow: hidden;
}

.section-row {
  display: flex;
  min-height: 88rpx;
  align-items: center;
  justify-content: space-between;
  padding: 0 24rpx;
}

.preview {
  width: 560rpx;
  padding: 32rpx;
}

.modal-title {
  display: block;
  margin-bottom: 18rpx;
  font-size: 30rpx;
  font-weight: 600;
}

.preview .muted {
  display: block;
  margin-bottom: 24rpx;
}
</style>
