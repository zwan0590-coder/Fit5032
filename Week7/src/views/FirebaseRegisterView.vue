<template>
  <div class="register-wrapper">
    <div class="register-card">
      <h1 class="mb-4">Create an Account</h1>

      <div class="mb-3">
        <label for="registerEmail" class="form-label">Email</label>
        <input
          id="registerEmail"
          v-model="email"
          type="email"
          class="form-control"
          placeholder="Enter your email"
        />
      </div>

      <div class="mb-3">
        <label for="registerPassword" class="form-label">Password</label>
        <input
          id="registerPassword"
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Enter your password"
        />
      </div>

      <button type="button" class="btn btn-primary" @click="register">Register</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')

const router = useRouter()
const auth = getAuth()

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log('Firebase Register Successful!')
      router.push('/FireLogin')
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script>

<style scoped>
.register-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 55px;
}

.register-card {
  width: 100%;
  max-width: 600px;
}

.register-card h1 {
  font-size: 2.2rem;
  font-weight: 600;
  color: #2f4050;
}

.form-label {
  font-size: 1rem;
  color: #34495e;
}

.form-control {
  min-height: 46px;
}

.btn-primary {
  padding: 10px 20px;
}
</style>
