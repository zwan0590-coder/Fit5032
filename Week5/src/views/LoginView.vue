<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const errorMessage = ref('')

const router = useRouter()

const login = () => {
  if (username.value === 'admin' && password.value === 'password') {
    localStorage.setItem('isAuthenticated', 'true')
    errorMessage.value = ''
    router.push('/about')
  } else {
    errorMessage.value = 'Invalid username or password.'
  }
}
</script>

<template>
  <div class="login-container">
    <h1>Login</h1>

    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>

        <input id="username" v-model="username" type="text" class="form-control" />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>

        <input id="password" v-model="password" type="password" class="form-control" />
      </div>

      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>

      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 500px;
  margin: 40px auto;
}
</style>
