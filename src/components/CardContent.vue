<script setup lang="ts" name="CardContent">
import { ref } from 'vue';
import { data } from '../../tools/config.data';

// 识别不到全局的定义类型，只好写在这了
interface Project {
  title: string;
  description: string;
  thumbnail: string;
  frontend: string | null;
  backend: string | null;
}

const projects = ref<Project[]>(data);

function goToProject(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer');
}

function correctedThumbnail(thumbnail: string) {
  if (thumbnail.startsWith('http')) {
    return thumbnail;
  }

  return thumbnail.replace('/public', '');
}

function projectTag(project: Project) {
  if (project.title.includes('vscode 扩展')) {
    return 'VS Code Extension';
  }

  if (project.title.toLowerCase().includes('easy-check')) {
    return 'Desktop App';
  }

  return 'Project';
}

function primaryActionLabel(url: string) {
  if (url.includes('github.com')) {
    return '查看仓库';
  }

  if (url.includes('marketplace.visualstudio.com')) {
    return '查看扩展';
  }

  return '查看详情';
}
</script>

<template>
  <div class="project-grid-wrap">
    <div class="row">
      <div
        class="col-12 col-md-6 col-xl-4"
        v-for="(project, index) in projects"
        :key="index"
      >
        <article class="project-card">
          <div class="project-card__image-wrap">
            <img
              :src="correctedThumbnail(project.thumbnail)"
              :alt="project.title"
              class="project-card__image"
            />
          </div>

          <div class="project-card__body">
            <span class="project-card__tag">{{ projectTag(project) }}</span>
            <h3 class="project-card__title">{{ project.title }}</h3>
            <p class="project-card__description" :title="project.description">
              {{ project.description }}
            </p>

            <div class="project-card__actions">
              <button
                v-if="project.frontend"
                type="button"
                class="btn btn-primary btn-sm project-card__button"
                @click="goToProject(project.frontend)"
              >
                {{ primaryActionLabel(project.frontend) }}
              </button>
              <button
                v-if="project.backend"
                type="button"
                class="btn btn-outline-secondary btn-sm project-card__button"
                @click="goToProject(project.backend)"
              >
                后台入口
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project-grid-wrap {
  width: 100%;
}

.project-card {
  height: calc(100% - 1.6rem);
  margin-bottom: 1.6rem;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.08);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(79, 70, 229, 0.22);
    box-shadow: 0 22px 60px rgba(79, 70, 229, 0.12);
  }
}

.project-card__image-wrap {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: linear-gradient(135deg, #eef2ff, #f8fafc);
}

.project-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
}

.project-card__body {
  padding: 1.25rem 1.25rem 1.4rem;
}

.project-card__tag {
  display: inline-flex;
  margin-bottom: 0.8rem;
  padding: 0.32rem 0.68rem;
  border-radius: 999px;
  background: rgba(99, 102, 241, 0.1);
  color: #4338ca;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.project-card__title {
  margin-bottom: 0.7rem;
  font-size: 1.15rem;
  line-height: 1.35;
}

.project-card__description {
  display: -webkit-box;
  min-height: 3.4em;
  margin-bottom: 1rem;
  overflow: hidden;
  color: rgba(var(--gray-dark), 0.8);
  font-size: 0.96rem;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.project-card__actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.project-card__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.3rem;
  padding: 0.5rem 0.85rem;
  line-height: 1.1;
  font-family: inherit;
  vertical-align: middle;
}
</style>
