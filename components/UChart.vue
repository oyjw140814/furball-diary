<template>
  <view class="chart surface">
    <view class="chart-area">
      <view
        v-for="(point, index) in normalizedPoints"
        :key="index"
        class="chart-point"
        :style="{ left: point.left + '%', bottom: point.bottom + '%' }"
      />
      <view
        v-for="(segment, index) in segments"
        :key="'segment-' + index"
        class="chart-line"
        :style="segment"
      />
    </view>
    <view class="chart-axis">
      <text v-for="label in xAxis" :key="label">{{ label }}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'UChart',
  props: {
    type: {
      type: String,
      default: 'line'
    },
    series: {
      type: Array,
      default: () => []
    },
    xAxis: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    values() {
      return this.series[0] ? this.series[0].data : []
    },
    normalizedPoints() {
      const values = this.values
      if (!values.length) return []
      const min = Math.min(...values)
      const max = Math.max(...values)
      const range = max - min || 1
      return values.map((value, index) => ({
        left: values.length === 1 ? 50 : (index / (values.length - 1)) * 100,
        bottom: 14 + ((value - min) / range) * 72
      }))
    },
    segments() {
      return this.normalizedPoints.slice(0, -1).map((point, index) => {
        const next = this.normalizedPoints[index + 1]
        const deltaX = next.left - point.left
        const deltaY = next.bottom - point.bottom
        const width = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)
        return {
          left: point.left + '%',
          bottom: point.bottom + '%',
          width: width + '%',
          transform: `rotate(${-angle}deg)`
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.chart {
  padding: 28rpx 24rpx 20rpx;
}

.chart-area {
  position: relative;
  height: 260rpx;
  border-bottom: 1rpx solid #f1e5df;
  background:
    linear-gradient(to bottom, rgba(255, 127, 80, 0.08) 1rpx, transparent 1rpx) 0 0 / 100% 25%;
}

.chart-line {
  position: absolute;
  height: 4rpx;
  background: #ff7f50;
  transform-origin: left center;
}

.chart-point {
  position: absolute;
  z-index: 2;
  width: 18rpx;
  height: 18rpx;
  margin-left: -9rpx;
  margin-bottom: -9rpx;
  border: 4rpx solid #ffffff;
  border-radius: 50%;
  background: #4caf50;
  box-shadow: 0 4rpx 12rpx rgba(76, 175, 80, 0.28);
}

.chart-axis {
  display: flex;
  justify-content: space-between;
  margin-top: 14rpx;
  color: #8d8d8d;
  font-size: 22rpx;
}
</style>
