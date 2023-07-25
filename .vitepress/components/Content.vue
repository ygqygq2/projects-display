<script setup lang="ts" name="Content">
import {ref, onMounted} from 'vue';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


interface Project {
  title: string;
  thumbnail: string;
  frontend: string;
  backend: string;
}

const projects = ref<Project[]>([
  {
    title: 'Project 1',
    thumbnail: '/images/wenjuan-thumbnail.png',
    frontend: 'https://example.com/project1',
    backend: 'https://example.com/project1',
  },
]);

function goToProject(url: string): void {
  window.open(url, '_blank');
}

onMounted(() => {
  // Load more projects when scrolling
  window.addEventListener('scroll', loadMoreProjects);
});

function loadMoreProjects(): void {
  // Implement your logic to load more projects here
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3" v-for="project, index in projects" :key="index">
        <div class="card" @click="goToProject(project.frontend)">
          <img :src="project.thumbnail" alt="Project Thumbnail" class="img-fluid image">
          <div class="card-body">
            <button type="button" class="btn btn-secondary" @click="goToProject(project.backend)">后台</button>
            <h3 class="card-title">{{ project.title }}</h3>
            <p class="card-text">描述</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

.image {
  border-radius: 0.5rem;
}
</style>
