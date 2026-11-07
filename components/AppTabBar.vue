<template>
  <view class="tabbar">
    <view
      v-for="item in tabs"
      :key="item.path"
      class="tabbar-item pressable"
      @click="switchTab(item.path)"
    >
      <uni-icons
        :type="item.icon"
        :size="24"
        :color="current === item.path ? selectedColor : color"
      />
      <text :class="['tabbar-label', { active: current === item.path }]">{{ item.label }}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'AppTabBar',
  props: {
    current: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      color: '#999999',
      selectedColor: '#FF7F50',
      tabs: [
        { label: '首页', icon: 'home', path: '/pages/home/index' },
        { label: '体重曲线', icon: 'line', path: '/pages/weight/index' },
        { label: '知识库', icon: 'book', path: '/pages/knowledge/index' },
        { label: '我的', icon: 'person', path: '/pages/profile/index' }
      ]
    }
  },
  methods: {
    switchTab(path) {
      if (path === this.current) return
      uni.switchTab({ url: path })
    }
  }
}
</script>

<style scoped lang="scss">
.tabbar {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  display: flex;
  height: 108rpx;
  padding-bottom: env(safe-area-inset-bottom);
  background: #ffffff;
  border-top: 1rpx solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 -10rpx 30rpx rgba(30, 30, 30, 0.06);
}

.tabbar-item {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rpx;
}

.tabbar-label {
  color: #999999;
  font-size: 22rpx;
}

.tabbar-label.active {
  color: #ff7f50;
}
</style>
