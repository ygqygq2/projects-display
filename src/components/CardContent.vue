<script setup lang="ts" name="CardContent">
import {ref, onMounted} from 'vue';
import {data} from '../../tools/config.data';

// 识别不到全局的定义类型，只好写在这了
interface Project {
  title: string;
  description: string;
  thumbnail: string;
  frontend: string;
  backend: string;
}

const projects = ref<Project[]>(data)

function goToProject(url: string): void {
  console.log("🚀 ~ file: CardContent.vue:17 ~ goToProject ~ url:", url);
  window.open(url, '_blank');
}

onMounted(() => {
  // Load more projects when scrolling
  window.addEventListener('scroll', loadMoreProjects);
});

function loadMoreProjects(): void {
  // Implement your logic to load more projects here
}

function correctedThumbnail(thumbnail: string) {
  return thumbnail.replace('/public', '');
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3" v-for="project, index in projects" :key="index">
        <div class="card bg-secondary-subtle">
          <img :src="correctedThumbnail(project.thumbnail)" alt="Project Thumbnail" class="img-fluid rounded">
          <div class="card-body">
            <button v-if="project.frontend" type="button" class="btn btn-sm btn-info text-pink-600"
              @click="goToProject(project.frontend)">前台</button>
            <button v-if="project.backend" type="button" class="btn btn-sm btn-secondary text-green-600"
              @click="goToProject(project.backend)">后台</button>
            <h5 class="card-title text-center align-middle text-success">{{ project.title }}</h5>
            <p class="card-text text-sm text-truncate" :title="project.description">{{ project.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-body>button {
  margin-right: 10px;
}

.card-title {
  line-height: 1.2;
  margin: 10px 0;
}
</style>
