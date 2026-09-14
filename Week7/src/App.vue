<script setup>
import Header from './components/Header.vue'
</script>

<template>
  <div class="main-container">
    <Header />

    <main class="main-box">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.main-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.main-box {
  width: 100%;
}
</style>
