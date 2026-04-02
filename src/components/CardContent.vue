<script setup lang="ts" name="CardContent">
import { ref } from 'vue';
import { data } from '../../tools/config.data';

// 识别不到全局的定义类型，只好写在这了
interface Project {
  title: string;
  description: string;
  highlights?: string[];
  stack?: string[];
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

function visibleHighlights(project: Project) {
  return (project.highlights || []).slice(0, 3);
}

function visibleStack(project: Project) {
  return (project.stack || []).slice(0, 6);
}
</script>

<template>
  <div class="project-grid-wrap">
    <div class="row">
      <div
        class="col-12 col-lg-6"
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
            <div class="project-card__header">
              <span class="project-card__tag">{{ projectTag(project) }}</span>
            </div>
            <h3 class="project-card__title">{{ project.title }}</h3>
            <p class="project-card__description" :title="project.description">
              {{ project.description }}
            </p>

            <section
              v-if="visibleHighlights(project).length"
              class="project-card__section"
            >
              <p class="project-card__section-title">项目亮点</p>
              <ul class="project-card__highlights">
                <li
                  v-for="(highlight, highlightIndex) in visibleHighlights(project)"
                  :key="`${index}-highlight-${highlightIndex}`"
                >
                  {{ highlight }}
                </li>
              </ul>
            </section>

            <section
              v-if="visibleStack(project).length"
              class="project-card__section"
            >
              <p class="project-card__section-title">技术栈</p>
              <div class="project-card__chips">
                <span
                  v-for="(item, stackIndex) in visibleStack(project)"
                  :key="`${index}-stack-${stackIndex}`"
                  class="project-card__chip"
                >
                  {{ item }}
                </span>
              </div>
            </section>

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
  display: flex;
  flex-direction: column;
  height: calc(100% - 1.75rem);
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
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.4rem 1.4rem 1.55rem;
}

.project-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  margin-bottom: 0.8rem;
  font-size: 1.22rem;
  line-height: 1.35;
}

.project-card__description {
  display: -webkit-box;
  min-height: 4.6em;
  margin-bottom: 1.05rem;
  overflow: hidden;
  color: rgba(var(--gray-dark), 0.8);
  font-size: 0.98rem;
  line-height: 1.6;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.project-card__section {
  margin-bottom: 1rem;
}

.project-card__section-title {
  margin-bottom: 0.55rem;
  color: #475569;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.project-card__highlights {
  margin: 0;
  padding: 0;
  list-style: none;
  color: rgba(var(--gray-dark), 0.82);
  font-size: 0.93rem;
  line-height: 1.65;
}

.project-card__highlights li {
  position: relative;
  padding-left: 1rem;
}

.project-card__highlights li::before {
  content: '•';
  position: absolute;
  left: 0;
  top: 0;
  color: #6366f1;
  font-weight: 700;
}

.project-card__highlights li + li {
  margin-top: 0.35rem;
}

.project-card__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.project-card__chip {
  display: inline-flex;
  align-items: center;
  padding: 0.38rem 0.7rem;
  border: 1px solid rgba(99, 102, 241, 0.16);
  border-radius: 999px;
  background: rgba(99, 102, 241, 0.06);
  color: #4338ca;
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1;
}

.project-card__actions {
  display: flex;
  margin-top: auto;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.project-card__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  padding: 0 1rem;
  line-height: 1;
  font-family: inherit;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
}

@media (max-width: 768px) {
  .project-card__body {
    padding: 1.2rem 1.15rem 1.35rem;
  }

  .project-card__description {
    min-height: auto;
  }
}
</style>
