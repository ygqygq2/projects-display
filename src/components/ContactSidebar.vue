<template>
  <div
    class="contact-sidebar"
    :class="{ open: isHovered }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <button
      type="button"
      class="contact-sidebar__button"
    >
      <i class="bi bi-wechat contact-sidebar__icon"></i>
      <span>联系我</span>
    </button>
    <div class="contact-info" v-if="isHovered">
      <div class="contact-info__badge">项目合作 / 技术咨询</div>
      <strong class="contact-info__title">联系我</strong>
      <p class="contact-info__desc">欢迎聊项目合作、外包开发、方案评估。</p>

      <div class="contact-info__item">
        <span class="contact-info__item-label">微信</span>
        <span class="contact-info__value">ygqygq2</span>
      </div>

      <div class="contact-info__item">
        <span class="contact-info__item-label">邮箱</span>
        <span class="contact-info__value contact-info__value--small">ygqygq2@qq.com</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const isHovered = ref(false);
</script>
<style lang="scss" scoped>
.contact-sidebar {
  position: fixed;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
  font-family: 'Helvetica Neue', Helvetica, Arial, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;

  &__button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.78rem 1rem;
    border: 1px solid rgba(34, 197, 94, 0.18);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.96);
    box-shadow: 0 16px 36px rgba(15, 23, 42, 0.14);
    font-size: 0.9rem;
    font-weight: 700;
    color: rgba(15, 23, 42, 0.94);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      border-color 0.2s ease;

    &:hover {
      transform: translateX(4px);
      border-color: rgba(34, 197, 94, 0.3);
      box-shadow: 0 20px 42px rgba(15, 23, 42, 0.16);
    }
  }

  &__icon {
    color: #00bb29;
    font-size: 1.2rem;
  }
}

.contact-sidebar.open .contact-info {
  display: block;
}

.contact-info {
  display: none;
  position: absolute;
  left: calc(100% + 0.8rem);
  top: 50%;
  transform: translateY(-50%);
  min-width: 250px;
  padding: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.96));
  box-shadow: 0 24px 54px rgba(15, 23, 42, 0.16);
  font-size: 0.92rem;
  font-family: 'Helvetica Neue', Helvetica, Arial, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;

  &__badge {
    display: inline-flex;
    align-items: center;
    margin-bottom: 0.7rem;
    padding: 0.28rem 0.6rem;
    border-radius: 999px;
    background: rgba(34, 197, 94, 0.1);
    color: #15803d;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.04em;
  }

  &__title {
    display: block;
    margin-bottom: 0.28rem;
    color: rgba(15, 23, 42, 0.96);
    font-size: 1.28rem;
    font-weight: 800;
    line-height: 1.2;
  }

  &__desc {
    margin: 0 0 0.9rem;
    color: rgba(51, 65, 85, 0.88);
    font-size: 0.88rem;
    line-height: 1.6;
  }

  &__item + &__item {
    margin-top: 0.7rem;
  }

  &__item-label {
    display: block;
    margin-bottom: 0.35rem;
    color: rgba(71, 85, 105, 0.9);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.03em;
  }

  &__value {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    min-height: 50px;
    width: 100%;
    padding: 0.62rem 0.82rem;
    border: 1px solid rgba(148, 163, 184, 0.12);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.84);
    color: rgba(15, 23, 42, 0.96);
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: 0;
    line-height: 1.35;
    font-family: 'Helvetica Neue', Helvetica, Arial, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  }

  &__value--small {
    font-size: 0.96rem;
    word-break: break-all;
  }
}

@media (max-width: 900px) {
  .contact-sidebar {
    left: auto;
    right: 1rem;
    top: auto;
    bottom: 5.5rem;
    transform: none;
  }

  .contact-info {
    top: auto;
    bottom: calc(100% + 0.8rem);
    left: auto;
    right: 0;
    transform: none;
  }
}
</style>
