<template>
  <view class="page-shell">
    <view class="surface breed-card">
      <text class="breed-title">{{ breedName }}</text>
      <text class="breed-copy">查看相关疾病、喂养建议和护理重点。</text>
    </view>

    <view class="section care-grid">
      <view v-for="item in careTips" :key="item.title" class="surface tip-card">
        <text class="tip-title">{{ item.title }}</text>
        <text class="tip-copy">{{ item.copy }}</text>
      </view>
    </view>

    <view class="section surface">
      <view v-for="item in relatedTopics" :key="item" class="topic-row info-row">
        <text>{{ item }}</text>
        <text class="section-link">查看</text>
      </view>
    </view>

    <view class="section subtle-panel feeding-panel">
      <text class="panel-title">今日建议</text>
      <text class="panel-copy">成年宠物建议保持固定喂食时间，避免因零食过多影响正餐。</text>
    </view>
  </view>
</template>

<script>
import { categories } from '../../common/mock'

export default {
  data() {
    return {
      breedName: '猫咪',
      careTips: [
        { title: '喂养', copy: '少量多餐，稳定换粮。' },
        { title: '护理', copy: '定期梳毛，留意皮肤。' }
      ],
      relatedTopics: ['常见疾病', '日常护理', '疫苗时间表']
    }
  },
  onLoad(query) {
    const category = categories.find(item => item.id === query.id)
    this.breedName = category ? category.name : '猫咪'
  }
}
</script>

<style scoped lang="scss">
.breed-card {
  padding: 30rpx;
}

.breed-title {
  display: block;
  margin-bottom: 14rpx;
  font-size: 34rpx;
  font-weight: 600;
}

.breed-copy {
  color: #6f6f6f;
}

.care-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16rpx;
}

.tip-card {
  padding: 24rpx;
}

.tip-title,
.tip-copy {
  display: block;
}

.tip-title {
  margin-bottom: 10rpx;
  color: #ff7f50;
  font-size: 28rpx;
  font-weight: 600;
}

.tip-copy {
  color: #6f6f6f;
  line-height: 1.7;
}

.topic-row {
  display: flex;
  min-height: 86rpx;
  align-items: center;
  justify-content: space-between;
  padding: 0 24rpx;
}

.feeding-panel {
  padding: 24rpx;
}

.panel-title,
.panel-copy {
  display: block;
}

.panel-title {
  margin-bottom: 10rpx;
  font-weight: 600;
}

.panel-copy {
  color: #6f6f6f;
  line-height: 1.8;
}
</style>
