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
      <strong class="contact-info__label">添加微信</strong>
      <span class="contact-info__value">ygqygq2</span>
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

  &__button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.72rem 0.95rem;
    border: 1px solid rgba(34, 197, 94, 0.2);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.92);
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
    font-size: 0.9rem;
    font-weight: 700;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateX(4px);
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
  min-width: 176px;
  padding: 0.8rem 0.95rem;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.12);
  font-size: 0.85rem;

  &__label,
  &__value {
    display: block;
  }

  &__label {
    margin-bottom: 0.45rem;
    color: rgba(15, 23, 42, 0.92);
    font-size: 0.98rem;
    font-weight: 700;
  }

  &__value {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    min-height: 48px;
    width: 100%;
    padding: 0.5rem 0.75rem;
    border-radius: 10px;
    background: rgba(15, 23, 42, 0.05);
    color: rgba(15, 23, 42, 0.96);
    font-size: 1.15rem;
    font-weight: 800;
    letter-spacing: 0.01em;
    line-height: 1.2;
    font-family: Arial, 'Liberation Sans', 'Helvetica Neue', Helvetica, 'Segoe UI', sans-serif;
    font-feature-settings: 'liga' 0;
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
