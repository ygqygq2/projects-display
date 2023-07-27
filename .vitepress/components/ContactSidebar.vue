html
<template>
  <div class="contact-sidebar" :class="{open: isHovered}">
    <button type="button" class="btn btn-outline-primary" @mouseover="isHovered = true" @mouseout="isHovered = false">
      <i class="bi bi-wechat contact-sidebar__icon"></i>
    </button>
    <div class="contact-info" v-if="isHovered">
      添加微信
      ygqygq2
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
const isHovered = ref(false);
</script>
<style lang="scss" scoped>
.contact-sidebar {
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;

  .btn {
    background-color: #fffcfc;
  }

  &__icon {
    color: #00bb29;
  }
}

.contact-sidebar.open .contact-info {
  display: block;
}

.contact-info {
  display: none;
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px;
  font-size: 12px;
}
</style>
