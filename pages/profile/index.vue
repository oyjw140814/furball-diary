<template>
  <view class="page-shell">
    <view class="profile-card surface">
      <image class="avatar" :src="user.avatar" mode="aspectFill" />
      <view>
        <text class="user-name">{{ user.name }}</text>
        <text class="muted">已绑定 {{ user.petCount }} 只宠物</text>
      </view>
    </view>

    <view class="section stat-grid">
      <view v-for="item in petStats" :key="item.id" class="surface stat-card">
        <text class="stat-value">{{ item.value }}</text>
        <text class="stat-label">{{ item.label }}</text>
      </view>
    </view>

    <view class="section">
      <view class="title-wrap">
        <view class="title-mark" />
        <text class="section-title">我的服务</text>
      </view>
      <view class="surface">
        <view
          v-for="item in settingsList"
          :key="item.id"
          class="pressable list-pressable"
        >
          <uni-list-item
            :title="item.name"
            clickable
            @click="goToSetting(item.id)"
          />
        </view>
      </view>
    </view>

    <view class="section">
      <view class="title-wrap">
        <view class="title-mark" />
        <text class="section-title">家庭协作</text>
      </view>
      <view class="surface member-card">
        <view v-for="item in members" :key="item.id" class="member-row info-row">
          <text>{{ item.name }}</text>
          <text class="pill">{{ item.role }}</text>
        </view>
      </view>
    </view>

    <button class="logout-button pressable section" @click="confirmLogout">退出登录</button>

    <uni-popup ref="logoutPopup" type="dialog">
      <uni-popup-dialog
        mode="base"
        title="确认退出"
        content="退出后需要重新登录。"
        @confirm="logout"
      />
    </uni-popup>

    <app-tab-bar current="/pages/profile/index" />
  </view>
</template>

<script>
import AppTabBar from '../../components/AppTabBar.vue'
import { householdMembers, petStats } from '../../common/mock'

export default {
  components: { AppTabBar },
  data() {
    return {
      user: {
        name: '小橘家长',
        petCount: 3,
        avatar: '/static/images/profile-avatar.jpg'
      },
      petStats,
      members: householdMembers,
      settingsList: [
        { id: 'account', name: '账号同步' },
        { id: 'exports', name: '导出历史' },
        { id: 'notifications', name: '消息提醒' },
        { id: 'privacy', name: '隐私设置' }
      ]
    }
  },
  methods: {
    goToSetting(id) {
      if (id === 'account') {
        uni.navigateTo({ url: '/pages/account/index' })
        return
      }
      if (id === 'exports') {
        uni.navigateTo({ url: '/pages/report/index' })
        return
      }
      uni.navigateTo({ url: `/pages/settings/index?id=${id}` })
    },
    confirmLogout() {
      this.$refs.logoutPopup.open()
    },
    logout() {
      this.$refs.logoutPopup.close()
      uni.showToast({ title: '已退出登录', icon: 'none' })
    }
  }
}
</script>

<style scoped lang="scss">
.profile-card {
  display: flex;
  align-items: center;
  gap: 22rpx;
  padding: 28rpx;
}

.avatar {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
}

.user-name {
  display: block;
  margin-bottom: 6rpx;
  font-size: 32rpx;
  font-weight: 600;
}

.logout-button {
  color: #ffffff;
  background: #ef5350;
  border-radius: 16rpx;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16rpx;
}

.stat-card {
  padding: 20rpx 10rpx;
  text-align: center;
}

.stat-value,
.stat-label {
  display: block;
}

.stat-value {
  margin-bottom: 8rpx;
  color: #ff7f50;
  font-size: 28rpx;
  font-weight: 600;
}

.stat-label {
  color: #8d8d8d;
  font-size: 21rpx;
}

.member-card {
  overflow: hidden;
}

.member-row {
  display: flex;
  min-height: 88rpx;
  align-items: center;
  justify-content: space-between;
  padding: 0 24rpx;
}
</style>
