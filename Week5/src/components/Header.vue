<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isAuthenticated = computed(() => {
  route.fullPath
  return localStorage.getItem('isAuthenticated') === 'true'
})

const logout = () => {
  localStorage.removeItem('isAuthenticated')
  router.push('/login')
}
</script>

<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3 border-bottom">
      <ul class="nav nav-pills">
        <!-- Home always visible -->
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active"> Home (Week 5) </router-link>
        </li>

        <!-- Logged in -->
        <template v-if="isAuthenticated">
          <li class="nav-item">
            <router-link to="/about" class="nav-link" active-class="active"> About </router-link>
          </li>

          <li class="nav-item">
            <button type="button" class="nav-link logout-button" @click="logout">Logout</button>
          </li>
        </template>

        <!-- Not logged in -->
        <template v-else>
          <li class="nav-item">
            <router-link to="/login" class="nav-link" active-class="active"> Login </router-link>
          </li>
        </template>
      </ul>
    </header>
  </div>
</template>

<style scoped>
.logout-button {
  border: none;
  background: transparent;
}
</style>
