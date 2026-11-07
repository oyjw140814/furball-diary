<template>
  <view class="page-shell">
    <uni-search-bar
      v-model="query"
      placeholder="搜索疾病或喂养指南"
      @confirm="searchArticles"
    />

    <view class="section article-hero surface pressable" @click="goToArticleDetail(featured.id)">
      <image class="article-hero-image" :src="featured.image" mode="aspectFill" />
      <view class="article-hero-overlay" />
      <view class="article-hero-body">
        <text class="hero-kicker">今日推荐</text>
        <text class="hero-title">{{ featured.title }}</text>
      </view>
    </view>

    <view class="section">
      <view class="title-wrap">
        <view class="title-mark" />
        <text class="section-title">分类入口</text>
      </view>
      <uni-grid :column="3" :show-border="false" class="surface category-grid">
        <uni-grid-item
          v-for="category in categories"
          :key="category.id"
          class="pressable"
          @click="goToBreedDetail(category.id)"
        >
          <view class="category-item">{{ category.name }}</view>
        </uni-grid-item>
      </uni-grid>
    </view>

    <view class="section">
      <view class="title-wrap">
        <view class="title-mark" />
        <text class="section-title">专题合集</text>
      </view>
      <scroll-view scroll-x class="collection-scroll">
        <view class="collection-row">
          <view v-for="item in collections" :key="item.id" class="collection-card surface pressable">
            <text class="collection-title">{{ item.title }}</text>
            <text class="collection-count">{{ item.count }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="section">
      <view class="section-heading">
        <view class="title-wrap">
          <view class="title-mark" />
          <text class="section-title">宠语词典</text>
        </view>
        <text class="section-link">{{ filteredDictionary.length }} 条</text>
      </view>
      <input
        v-model="dictionaryQuery"
        class="dictionary-input"
        placeholder="搜索动作：咕噜 / 慢眨眼 / 抖羽"
      />
      <view class="dictionary-grid">
        <view
          v-for="item in filteredDictionary"
          :key="item.id"
          class="dict-card surface pressable"
        >
          <text class="dict-word">{{ item.word }}</text>
          <text class="dict-desc">{{ item.desc }}</text>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="title-wrap">
        <view class="title-mark" />
        <text class="section-title">行为解读库</text>
      </view>
      <view class="behavior-list">
        <view
          v-for="item in behaviorLibrary"
          :key="item.id"
          class="behavior-card surface pressable"
        >
          <text class="behavior-title">{{ item.title }}</text>
          <text class="behavior-detail">{{ item.detail }}</text>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="title-wrap">
        <view class="title-mark" />
        <text class="section-title">最新文章</text>
      </view>
      <view class="article-list">
        <view
          v-for="article in filteredArticles"
          :key="article.id"
          class="article-card surface pressable"
          @click="goToArticleDetail(article.id)"
        >
          <image class="article-image" :src="article.image" mode="aspectFill" />
          <view class="article-body">
            <text class="article-title">{{ article.title }}</text>
            <text class="article-summary">{{ article.summary }}</text>
            <view class="tag-row">
              <text v-for="tag in article.tags" :key="tag" class="pill">{{ tag }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <app-tab-bar current="/pages/knowledge/index" />
  </view>
</template>

<script>
import AppTabBar from '../../components/AppTabBar.vue'
import {
  articles,
  behaviorLibrary,
  categories,
  collections,
  languageDictionary
} from '../../common/mock'

export default {
  components: { AppTabBar },
  data() {
    return {
      query: '',
      categories,
      articles,
      collections,
      languageDictionary,
      behaviorLibrary,
      dictionaryQuery: '',
      featured: articles[0],
      searchedQuery: ''
    }
  },
  computed: {
    filteredArticles() {
      if (!this.searchedQuery) return this.articles
      return this.articles.filter(article =>
        `${article.title}${article.summary}`.includes(this.searchedQuery)
      )
    },
    filteredDictionary() {
      const query = this.dictionaryQuery.trim()
      if (!query) return this.languageDictionary.slice(0, 4)
      return this.languageDictionary.filter(item => `${item.word}${item.desc}`.includes(query))
    }
  },
  methods: {
    searchArticles() {
      this.searchedQuery = this.query.trim()
    },
    goToBreedDetail(id) {
      uni.navigateTo({ url: `/pages/breed-detail/index?id=${id}` })
    },
    goToArticleDetail(id) {
      uni.navigateTo({ url: `/pages/article-detail/index?id=${id}` })
    }
  }
}
</script>

<style scoped lang="scss">
.category-grid {
  overflow: hidden;
  padding: 8rpx 0;
}

.category-item {
  display: flex;
  min-height: 112rpx;
  align-items: center;
  justify-content: center;
  font-size: 26rpx;
}

.article-hero {
  position: relative;
  overflow: hidden;
  height: 240rpx;
}

.article-hero-image,
.article-hero-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.article-hero-overlay {
  background: linear-gradient(90deg, rgba(25, 25, 25, 0.58), rgba(25, 25, 25, 0.12));
}

.article-hero-body {
  position: relative;
  z-index: 1;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;
  padding: 26rpx;
  color: #ffffff;
}

.hero-kicker {
  margin-bottom: 8rpx;
  font-size: 22rpx;
}

.hero-title {
  font-size: 32rpx;
  font-weight: 600;
}

.article-list {
  display: grid;
  gap: 18rpx;
}

.article-card {
  display: flex;
  overflow: hidden;
}

.article-image {
  width: 180rpx;
  height: 160rpx;
  flex: 0 0 auto;
}

.article-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 18rpx;
}

.article-title,
.article-summary {
  display: block;
}

.article-title {
  margin-bottom: 8rpx;
  font-size: 27rpx;
  font-weight: 600;
}

.article-summary {
  margin-bottom: 12rpx;
  color: #8d8d8d;
  font-size: 22rpx;
}

.tag-row {
  display: flex;
  gap: 10rpx;
}

.collection-scroll {
  white-space: nowrap;
}

.collection-row {
  display: inline-flex;
  gap: 16rpx;
  padding-right: 24rpx;
}

.collection-card {
  width: 230rpx;
  padding: 22rpx;
}

.collection-title,
.collection-count {
  display: block;
}

.collection-title {
  margin-bottom: 16rpx;
  font-size: 26rpx;
  font-weight: 600;
  white-space: normal;
}

.collection-count {
  color: #8d8d8d;
  font-size: 22rpx;
}

.dictionary-input {
  box-sizing: border-box;
  width: 100%;
  height: 78rpx;
  margin-bottom: 16rpx;
  padding: 0 22rpx;
  border: 1rpx solid rgba(255, 127, 80, 0.18);
  border-radius: 16rpx;
  background: #ffffff;
}

.dictionary-grid,
.behavior-list {
  display: grid;
  gap: 16rpx;
}

.dict-card,
.behavior-card {
  padding: 22rpx;
}

.dict-word,
.dict-desc,
.behavior-title,
.behavior-detail {
  display: block;
}

.dict-word,
.behavior-title {
  margin-bottom: 8rpx;
  font-size: 27rpx;
  font-weight: 600;
}

.dict-desc,
.behavior-detail {
  color: #6f6f6f;
  line-height: 1.7;
}
</style>
