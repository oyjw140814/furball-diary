<template>
  <view class="page-shell">
    <image class="cover surface" :src="article.image" mode="aspectFill" />
    <view class="surface article">
      <text class="article-title">{{ article.title }}</text>
      <text class="muted">{{ article.summary }}</text>
      <view class="tag-row">
        <text v-for="tag in article.tags" :key="tag" class="pill">{{ tag }}</text>
      </view>
      <text class="article-body">
        保持稳定节奏、观察日常变化、遇到持续异常及时咨询医生，是大多数养宠问题里最有用的三件事。
      </text>
    </view>

    <view class="section surface checklist">
      <text class="checklist-title">快速清单</text>
      <text class="checklist-item">1. 先观察持续时间</text>
      <text class="checklist-item">2. 记录食欲和精神变化</text>
      <text class="checklist-item">3. 有异常及时就医</text>
    </view>

    <view class="section">
      <view class="title-wrap">
        <view class="title-mark" />
        <text class="section-title">相关阅读</text>
      </view>
      <view class="surface related-card">
        <view class="related-row info-row">
          <text>如何判断宠物是否脱水</text>
          <text class="section-link">查看</text>
        </view>
        <view class="related-row info-row">
          <text>哪些情况需要当天就医</text>
          <text class="section-link">查看</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { articles } from '../../common/mock'

export default {
  data() {
    return {
      article: articles[0]
    }
  },
  onLoad(query) {
    this.article = articles.find(item => item.id === query.id) || articles[0]
  }
}
</script>

<style scoped lang="scss">
.cover {
  width: 100%;
  height: 280rpx;
  margin-bottom: 24rpx;
}

.article {
  padding: 30rpx;
}

.article-title {
  display: block;
  margin-bottom: 12rpx;
  font-size: 34rpx;
  font-weight: 600;
}

.article-body {
  display: block;
  margin-top: 24rpx;
  line-height: 1.8;
}

.tag-row {
  display: flex;
  gap: 10rpx;
  margin-top: 18rpx;
}

.checklist {
  padding: 24rpx;
}

.checklist-title,
.checklist-item {
  display: block;
}

.checklist-title {
  margin-bottom: 16rpx;
  font-size: 28rpx;
  font-weight: 600;
}

.checklist-item + .checklist-item {
  margin-top: 10rpx;
}

.related-card {
  overflow: hidden;
}

.related-row {
  display: flex;
  min-height: 88rpx;
  align-items: center;
  justify-content: space-between;
  padding: 0 24rpx;
}
</style>
