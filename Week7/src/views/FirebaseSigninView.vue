<template>
  <div class="login-wrapper">
    <div class="login-card">
      <h1 class="mb-4">Firebase Login</h1>

      <div class="mb-3">
        <label for="firebaseEmail" class="form-label">Email</label>
        <input
          id="firebaseEmail"
          v-model="email"
          type="email"
          class="form-control"
          placeholder="Enter your email"
        />
      </div>

      <div class="mb-3">
        <label for="firebasePassword" class="form-label">Password</label>
        <input
          id="firebasePassword"
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Enter your password"
        />
      </div>

      <div class="d-flex gap-2">
        <button type="button" class="btn btn-primary" @click="signin">Login</button>

        <button v-if="currentUser" type="button" class="btn btn-outline-secondary" @click="logout">
          Logout
        </button>
      </div>

      <div v-if="statusMessage" class="alert alert-info mt-4 mb-0">
        {{ statusMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'

const email = ref('')
const password = ref('')
const currentUser = ref(null)
const currentRole = ref('')
const statusMessage = ref('')

const auth = getAuth()

onAuthStateChanged(auth, (user) => {
  currentUser.value = user
})

const getUserRole = (userEmail) => {
  if (userEmail === 'test5032admin@example.com') {
    return 'Admin'
  }

  return 'User'
}

const signin = () => {
  statusMessage.value = ''

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      currentUser.value = userCredential.user
      currentRole.value = getUserRole(userCredential.user.email)

      localStorage.setItem('firebaseRole', currentRole.value)

      console.log('Firebase Sign in Successful!')
      console.log('Current role:', currentRole.value)
      console.log(auth.currentUser)

      statusMessage.value = `Signed in as ${currentRole.value}`
    })
    .catch((error) => {
      console.log(error.code)
      statusMessage.value = error.code
    })
}

const logout = () => {
  signOut(auth)
    .then(() => {
      localStorage.removeItem('firebaseRole')

      currentUser.value = null
      currentRole.value = ''

      console.log('Firebase Logout Successful!')
      console.log(auth.currentUser)

      statusMessage.value = 'Logged out'
    })
    .catch((error) => {
      console.log(error.code)
      statusMessage.value = error.code
    })
}
</script>

<style scoped>
.login-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 55px;
}

.login-card {
  width: 100%;
  max-width: 600px;
}

.login-card h1 {
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

.btn-primary,
.btn-outline-secondary {
  padding: 10px 20px;
}
</style>
