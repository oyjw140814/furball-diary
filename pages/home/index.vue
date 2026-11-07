<template>
  <view class="page-shell">
    <uni-search-bar placeholder="搜索宠物品种/疾病" />

    <view class="section hero-section">
      <swiper
        class="banner surface"
        :indicator-dots="true"
        :autoplay="true"
        :interval="5000"
        :duration="300"
        circular
      >
        <swiper-item v-for="banner in banners" :key="banner.id">
          <view class="banner-slide">
            <image class="banner-image" :src="banner.image" mode="aspectFill" />
            <view class="banner-overlay" />
            <view class="banner-content">
              <view>
                <text class="banner-title">{{ banner.title }}</text>
                <text class="banner-copy">{{ banner.copy }}</text>
              </view>
              <text class="banner-badge">{{ banner.badge }}</text>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <view class="section progress-card surface">
      <view class="progress-head">
        <view>
          <text class="progress-title">今日任务</text>
          <text class="progress-copy">{{ dailyProgress.completed }}/{{ dailyProgress.total }} 已完成</text>
        </view>
        <text class="progress-percent">{{ dailyProgress.percent }}%</text>
      </view>
      <view class="progress-track">
        <view class="progress-bar" :style="{ width: dailyProgress.percent + '%' }" />
      </view>
      <view class="task-row">
        <view
          v-for="task in dailyProgress.tasks"
          :key="task.id"
          :class="['task-chip', { done: task.done }]"
        >
          {{ task.title }}
        </view>
      </view>
    </view>

    <view class="section">
      <view class="section-heading">
        <view class="title-wrap">
          <view class="title-mark" />
          <text class="section-title">我的宠物</text>
        </view>
        <text class="section-link" @click="goToProfile">查看全部</text>
      </view>
      <scroll-view scroll-x class="pet-scroll">
        <view class="pet-row">
          <view
            v-for="pet in petProfiles"
            :key="pet.id"
            class="pet-card surface pressable"
          >
            <image class="pet-image" :src="pet.image" mode="aspectFill" />
            <view class="pet-body">
              <text class="pet-name">{{ pet.name }}</text>
              <text class="pet-meta">{{ pet.breed }} · {{ pet.age }}</text>
              <view class="pet-footer">
                <text>{{ pet.weight }}</text>
                <text class="pet-status">{{ pet.status }}</text>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="section">
      <view class="title-wrap">
        <view class="title-mark" />
        <text class="section-title">快捷功能</text>
      </view>
      <uni-grid :column="4" :show-border="false" class="surface quick-grid">
        <uni-grid-item
          v-for="item in quickItems"
          :key="item.id"
          class="pressable"
          @click="onQuickItemClick(item.id)"
        >
          <view class="quick-item">
            <uni-icons :type="item.icon" :size="26" color="#FF7F50" />
            <text>{{ item.label }}</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </view>

    <view class="section dashboard-grid">
      <view class="surface health-card pressable" @click="onQuickItemClick('weight')">
        <text class="eyebrow">今日概览</text>
        <text class="health-value">4.8kg</text>
        <text class="health-copy">奶糖近 14 天 +0.1kg</text>
      </view>
      <view class="surface health-card green-card pressable" @click="onQuickItemClick('report')">
        <text class="eyebrow">健康分</text>
        <text class="health-value">92</text>
        <text class="health-copy">本周状态良好</text>
      </view>
    </view>

    <view class="section">
      <view class="title-wrap">
        <view class="title-mark" />
        <text class="section-title">今日提醒</text>
      </view>
      <view class="surface reminder-card">
        <view
          v-for="item in careReminders"
          :key="item.id"
          class="reminder-item pressable"
        >
          <view class="reminder-dot" />
          <view>
            <text class="reminder-title">{{ item.title }}</text>
            <text class="reminder-note">{{ item.note }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="section-heading">
        <view class="title-wrap">
          <view class="title-mark" />
          <text class="section-title">健康时间线</text>
        </view>
        <text class="section-link">今天</text>
      </view>
      <view class="surface timeline-card">
        <view v-for="item in homeTimeline" :key="item.id" class="timeline-row info-row">
          <text class="timeline-time">{{ item.time }}</text>
          <view class="timeline-main">
            <text>{{ item.title }}</text>
            <text class="pill">{{ item.type }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="section-heading">
        <view class="title-wrap">
          <view class="title-mark" />
          <text class="section-title">精选知识</text>
        </view>
        <text class="section-link" @click="onQuickItemClick('knowledge')">更多</text>
      </view>
      <view class="feature-list">
        <view
          v-for="article in featuredArticles"
          :key="article.id"
          class="feature-card surface pressable"
          @click="goToArticleDetail(article.id)"
        >
          <image class="feature-image" :src="article.image" mode="aspectFill" />
          <view class="feature-body">
            <text class="feature-title">{{ article.title }}</text>
            <text class="feature-summary">{{ article.summary }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="title-wrap">
        <view class="title-mark" />
        <text class="section-title">最新动态</text>
      </view>
      <uni-list :border="false" class="surface">
        <view
          v-for="record in recentRecords"
          :key="record.id"
          class="pressable list-pressable"
        >
          <uni-list-item
            :title="record.title"
            :note="record.date"
            clickable
            @click="goToRecordDetail(record.id)"
          />
        </view>
      </uni-list>
    </view>

    <app-tab-bar current="/pages/home/index" />
  </view>
</template>

<script>
import AppTabBar from '../../components/AppTabBar.vue'
import {
  careReminders,
  dailyProgress,
  featuredArticles,
  homeTimeline,
  petProfiles,
  recentRecords
} from '../../common/mock'

export default {
  components: { AppTabBar },
  data() {
    return {
      recentRecords,
      petProfiles,
      careReminders,
      dailyProgress,
      homeTimeline,
      featuredArticles,
      banners: [
        {
          id: 1,
          title: '春季护理提醒',
          copy: '换毛期多梳理，皮肤状态更轻松',
          badge: '护理',
          image: '/static/images/banner-cat.jpg'
        },
        {
          id: 2,
          title: '疫苗别漏记',
          copy: '把下一次接种日期提前记下来',
          badge: '健康',
          image: '/static/images/banner-dog.jpg'
        },
        {
          id: 3,
          title: '体重趋势',
          copy: '连续记录，变化一眼就能看见',
          badge: '记录',
          image: '/static/images/banner-ragdoll.jpg'
        }
      ],
      quickItems: [
        { id: 'weight', label: '体重曲线', icon: 'line' },
        { id: 'report', label: '健康报告', icon: 'paperplane' },
        { id: 'hospital', label: '医院查询', icon: 'location' },
        { id: 'knowledge', label: '知识库', icon: 'book' },
        { id: 'match', label: '品种匹配', icon: 'star' }
      ]
    }
  },
  methods: {
    onQuickItemClick(id) {
      const routes = {
        weight: '/pages/weight/index',
        report: '/pages/report/index',
        hospital: '/pages/hospital/index',
        knowledge: '/pages/knowledge/index',
        match: '/pages/match/index'
      }
      const url = routes[id]
      if (!url) return
      if (id === 'weight' || id === 'knowledge') {
        uni.switchTab({ url })
        return
      }
      uni.navigateTo({ url })
    },
    goToRecordDetail(id) {
      uni.navigateTo({ url: `/pages/record-detail/index?id=${id}` })
    },
    goToArticleDetail(id) {
      uni.navigateTo({ url: `/pages/article-detail/index?id=${id}` })
    },
    goToProfile() {
      uni.switchTab({ url: '/pages/profile/index' })
    }
  }
}
</script>

<style scoped lang="scss">
.page-shell {
  position: relative;
}

.page-shell::before {
  position: absolute;
  top: 54rpx;
  right: 2rpx;
  width: 126rpx;
  height: 126rpx;
  border: 2rpx solid rgba(255, 127, 80, 0.12);
  border-radius: 50%;
  content: '';
}

.page-shell::after {
  position: absolute;
  top: 144rpx;
  right: 92rpx;
  width: 22rpx;
  height: 22rpx;
  border: 2rpx solid rgba(76, 175, 80, 0.18);
  border-radius: 50%;
  content: '';
}

.hero-section {
  position: relative;
  z-index: 1;
}

.banner {
  position: relative;
  overflow: hidden;
  height: 260rpx;
  border: 2rpx solid rgba(255, 255, 255, 0.72);
  border-radius: 24rpx;
  box-shadow:
    0 14rpx 32rpx rgba(77, 42, 28, 0.12),
    0 0 0 6rpx rgba(255, 127, 80, 0.08);
}

.banner-slide {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  color: #ffffff;
}

.banner-image,
.banner-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.banner-overlay {
  background: linear-gradient(90deg, rgba(20, 20, 20, 0.58), rgba(20, 20, 20, 0.12));
}

.banner-content {
  position: relative;
  z-index: 1;
  display: flex;
  box-sizing: border-box;
  height: 100%;
  padding: 34rpx;
  align-items: flex-end;
  justify-content: space-between;
}

.banner-title,
.banner-copy {
  display: block;
}

.banner-title {
  margin-bottom: 10rpx;
  font-size: 34rpx;
  font-weight: 600;
}

.banner-copy {
  font-size: 24rpx;
}

.banner-badge {
  padding: 8rpx 16rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.45);
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.2);
  font-size: 22rpx;
}

.quick-grid {
  overflow: hidden;
  border: 1rpx solid rgba(255, 127, 80, 0.12);
  padding: 10rpx 0;
}

.quick-item {
  display: flex;
  min-height: 138rpx;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
  color: #464646;
  font-size: 24rpx;
}

.pet-scroll {
  white-space: nowrap;
}

.pet-row {
  display: inline-flex;
  gap: 18rpx;
  padding-right: 24rpx;
}

.pet-card {
  display: inline-flex;
  width: 300rpx;
  overflow: hidden;
  border: 1rpx solid rgba(255, 127, 80, 0.14);
  flex-direction: column;
}

.pet-image {
  width: 100%;
  height: 180rpx;
  border-bottom: 1rpx solid rgba(255, 127, 80, 0.1);
}

.pet-body {
  padding: 18rpx;
}

.pet-name,
.pet-meta {
  display: block;
}

.pet-name {
  margin-bottom: 6rpx;
  font-size: 28rpx;
  font-weight: 600;
}

.pet-meta {
  color: #8d8d8d;
  font-size: 22rpx;
}

.pet-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14rpx;
  font-size: 22rpx;
}

.pet-status {
  padding: 4rpx 10rpx;
  border: 1rpx solid rgba(76, 175, 80, 0.18);
  border-radius: 999rpx;
  background: rgba(76, 175, 80, 0.08);
  color: #4caf50;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18rpx;
}

.health-card {
  position: relative;
  overflow: hidden;
  border: 1rpx solid rgba(255, 127, 80, 0.14);
  padding: 24rpx;
}

.health-card::after {
  position: absolute;
  top: -24rpx;
  right: -16rpx;
  width: 92rpx;
  height: 92rpx;
  border: 1rpx solid rgba(255, 127, 80, 0.14);
  border-radius: 50%;
  content: '';
}

.green-card .health-value {
  color: #4caf50;
}

.green-card::after {
  border-color: rgba(76, 175, 80, 0.16);
}

.eyebrow,
.health-value,
.health-copy {
  display: block;
}

.eyebrow {
  color: #8d8d8d;
  font-size: 22rpx;
}

.health-value {
  margin: 10rpx 0 6rpx;
  color: #ff7f50;
  font-size: 40rpx;
  font-weight: 600;
}

.health-copy {
  font-size: 22rpx;
}

.progress-card {
  padding: 24rpx;
}

.progress-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.progress-title,
.progress-copy,
.progress-percent {
  display: block;
}

.progress-title {
  margin-bottom: 6rpx;
  font-size: 28rpx;
  font-weight: 600;
}

.progress-copy {
  color: #8d8d8d;
  font-size: 22rpx;
}

.progress-percent {
  color: #ff7f50;
  font-size: 34rpx;
  font-weight: 600;
}

.progress-track {
  height: 12rpx;
  margin-top: 22rpx;
  overflow: hidden;
  border-radius: 999rpx;
  background: #ffe7dd;
}

.progress-bar {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #ff7f50, #ffad8f);
}

.task-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-top: 18rpx;
}

.task-chip {
  padding: 8rpx 14rpx;
  border: 1rpx solid rgba(255, 127, 80, 0.16);
  border-radius: 999rpx;
  color: #8d8d8d;
  font-size: 22rpx;
}

.task-chip.done {
  border-color: rgba(76, 175, 80, 0.18);
  background: rgba(76, 175, 80, 0.08);
  color: #4caf50;
}

.reminder-card {
  overflow: hidden;
  border: 1rpx solid rgba(255, 127, 80, 0.14);
  padding: 8rpx 0;
}

.reminder-item {
  display: flex;
  align-items: center;
  gap: 18rpx;
  min-height: 92rpx;
  padding: 0 24rpx;
}

.reminder-item + .reminder-item {
  border-top: 1rpx dashed rgba(255, 127, 80, 0.16);
}

.reminder-dot {
  width: 14rpx;
  height: 14rpx;
  border: 4rpx solid rgba(255, 127, 80, 0.12);
  border-radius: 50%;
  background: #ff7f50;
}

.reminder-title,
.reminder-note {
  display: block;
}

.reminder-title {
  margin-bottom: 4rpx;
  font-size: 26rpx;
}

.reminder-note {
  color: #8d8d8d;
  font-size: 22rpx;
}

.feature-list {
  display: grid;
  gap: 18rpx;
}

.feature-card {
  display: flex;
  overflow: hidden;
  border: 1rpx solid rgba(255, 127, 80, 0.14);
}

.feature-image {
  width: 180rpx;
  height: 132rpx;
  flex: 0 0 auto;
  border-right: 1rpx solid rgba(255, 127, 80, 0.1);
}

.feature-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 18rpx;
}

.feature-title,
.feature-summary {
  display: block;
}

.feature-title {
  margin-bottom: 8rpx;
  font-size: 27rpx;
  font-weight: 600;
}

.feature-summary {
  color: #8d8d8d;
  font-size: 22rpx;
}

.timeline-card {
  overflow: hidden;
}

.timeline-row {
  display: flex;
  min-height: 88rpx;
  align-items: center;
  gap: 18rpx;
  padding: 0 24rpx;
}

.timeline-time {
  width: 78rpx;
  color: #8d8d8d;
  font-size: 22rpx;
}

.timeline-main {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
}

::v-deep .uni-list {
  overflow: hidden;
  border: 1rpx solid rgba(255, 127, 80, 0.14);
  border-radius: 16rpx;
}
</style>
