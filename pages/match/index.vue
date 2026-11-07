<template>
  <view class="page-shell">
    <view class="surface hero-card">
      <text class="hero-kicker">Pet Match</text>
      <text class="hero-title">品种匹配测试</text>
      <text class="hero-copy">用生活空间、活动偏好和护理意愿生成更合适的宠物品种建议。</text>
    </view>

    <view class="section form-card surface">
      <view
        v-for="question in questions"
        :key="question.id"
        class="question-row info-row"
      >
        <text class="question-label">{{ question.label }}</text>
        <picker
          :range="question.options"
          range-key="label"
          :value="answers[question.id]"
          @change="onPick(question.id, $event)"
        >
          <view class="picker-pill">
            {{ question.options[answers[question.id]].label }}
          </view>
        </picker>
      </view>
    </view>

    <button class="primary-button pressable section" @click="generateMatches">生成推荐</button>

    <view class="section">
      <view class="section-heading">
        <view class="title-wrap">
          <view class="title-mark" />
          <text class="section-title">推荐结果</text>
        </view>
        <text class="section-link">{{ results.length }} 个</text>
      </view>
      <view class="result-list">
        <view
          v-for="pet in results"
          :key="pet.id"
          class="surface result-card pressable"
        >
          <view class="result-head">
            <view>
              <text class="result-name">{{ pet.name }}</text>
              <text class="muted">{{ pet.type }} · 匹配度 {{ pet.score }} 分</text>
            </view>
            <text class="pill">{{ pet.newbie ? '新手友好' : '进阶' }}</text>
          </view>
          <text class="result-copy">{{ pet.trait }}</text>
          <text class="result-care">护理建议：{{ pet.care }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { breedCandidates, matchQuestions } from '../../common/mock'

export default {
  data() {
    return {
      questions: matchQuestions,
      candidates: breedCandidates,
      answers: {
        space: 1,
        activity: 1,
        fur: 0,
        social: 1
      },
      results: []
    }
  },
  onLoad() {
    this.generateMatches()
  },
  methods: {
    onPick(id, event) {
      this.answers[id] = Number(event.detail.value)
    },
    scorePet(pet) {
      return this.questions.reduce((score, question) => {
        const selected = question.options[this.answers[question.id]].value
        return score + (pet[question.id] === selected ? 3 : 0)
      }, pet.newbie ? 1 : 0)
    },
    generateMatches() {
      this.results = this.candidates
        .map(pet => ({ ...pet, score: this.scorePet(pet) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 4)
      uni.showToast({ title: '已生成推荐', icon: 'success' })
    }
  }
}
</script>

<style scoped lang="scss">
.hero-card {
  padding: 30rpx;
  background:
    radial-gradient(circle at right top, rgba(76, 175, 80, 0.16), transparent 42%),
    #ffffff;
}

.hero-kicker,
.hero-title,
.hero-copy {
  display: block;
}

.hero-kicker {
  margin-bottom: 8rpx;
  color: #ff7f50;
  font-size: 22rpx;
}

.hero-title {
  margin-bottom: 10rpx;
  font-size: 36rpx;
  font-weight: 600;
}

.hero-copy {
  color: #6f6f6f;
  line-height: 1.7;
}

.form-card {
  overflow: hidden;
}

.question-row {
  display: flex;
  min-height: 96rpx;
  align-items: center;
  justify-content: space-between;
  padding: 0 24rpx;
}

.question-label {
  font-weight: 600;
}

.picker-pill {
  min-width: 180rpx;
  padding: 10rpx 16rpx;
  border: 1rpx solid rgba(255, 127, 80, 0.18);
  border-radius: 999rpx;
  background: #fff6f2;
  color: #ff7f50;
  text-align: center;
}

.result-list {
  display: grid;
  gap: 18rpx;
}

.result-card {
  padding: 24rpx;
}

.result-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16rpx;
}

.result-name {
  display: block;
  margin-bottom: 6rpx;
  font-size: 30rpx;
  font-weight: 600;
}

.result-copy,
.result-care {
  display: block;
  margin-top: 16rpx;
  line-height: 1.7;
}

.result-care {
  color: #8d8d8d;
  font-size: 23rpx;
}
</style>
