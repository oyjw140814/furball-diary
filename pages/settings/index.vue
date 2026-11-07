<template>
  <view class="page-shell">
    <view class="surface settings-card">
      <text class="settings-title">{{ title }}</text>
      <text class="muted">根据你的习惯自定义功能表现。</text>
    </view>

    <view class="section surface">
      <view v-for="item in options" :key="item.label" class="option-row info-row">
        <view>
          <text class="option-label">{{ item.label }}</text>
          <text class="muted option-copy">{{ item.copy }}</text>
        </view>
        <switch :checked="item.enabled" color="#FF7F50" />
      </view>
    </view>

    <view class="section subtle-panel note-panel">
      <text class="note-title">说明</text>
      <text class="muted">这些设置会在当前设备和已同步设备之间保持一致。</text>
    </view>
  </view>
</template>

<script>
const titleMap = {
  notifications: '消息提醒',
  privacy: '隐私设置'
}

export default {
  data() {
    return {
      title: '设置详情',
      options: []
    }
  },
  onLoad(query) {
    this.title = titleMap[query.id] || '设置详情'
    this.options =
      query.id === 'privacy'
        ? [
            { label: '公开昵称', copy: '允许家庭成员看到昵称', enabled: true },
            { label: '导出脱敏', copy: '隐藏手机号等信息', enabled: true }
          ]
        : [
            { label: '喂食提醒', copy: '到点推送通知', enabled: true },
            { label: '体重提醒', copy: '每周提醒记录', enabled: false }
          ]
  }
}
</script>

<style scoped lang="scss">
.settings-card {
  padding: 30rpx;
}

.settings-title {
  display: block;
  margin-bottom: 12rpx;
  font-size: 34rpx;
  font-weight: 600;
}

.option-row {
  display: flex;
  min-height: 96rpx;
  align-items: center;
  justify-content: space-between;
  padding: 0 24rpx;
}

.option-label,
.option-copy {
  display: block;
}

.option-label {
  margin-bottom: 4rpx;
}

.note-panel {
  padding: 24rpx;
}

.note-title {
  display: block;
  margin-bottom: 8rpx;
  font-weight: 600;
}
</style>
