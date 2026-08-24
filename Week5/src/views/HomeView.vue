<script setup>
import { ref, computed } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: '',
  suburb: 'Clayton',
})

const submittedUsers = ref([])

const usernameError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const genderError = ref('')
const reasonError = ref('')

const friendMessage = computed(() => {
  if (formData.value.reason.toLowerCase().includes('friend')) {
    return 'Great to have a friend.'
  }
  return ''
})

const validateUsername = () => {
  if (!formData.value.username) {
    usernameError.value = 'Username is required.'
  } else if (formData.value.username.length < 3) {
    usernameError.value = 'Username must be at least 3 characters.'
  } else {
    usernameError.value = ''
  }
}

const validatePassword = () => {
  if (!formData.value.password) {
    passwordError.value = 'Password is required.'
  } else if (formData.value.password.length < 8) {
    passwordError.value = 'Password must be at least 8 characters.'
  } else {
    passwordError.value = ''
  }
}

const validateConfirmPassword = () => {
  if (!formData.value.confirmPassword) {
    confirmPasswordError.value = 'Please confirm your password.'
  } else if (formData.value.confirmPassword !== formData.value.password) {
    confirmPasswordError.value = 'Passwords do not match.'
  } else {
    confirmPasswordError.value = ''
  }
}

const validateGender = () => {
  if (!formData.value.gender) {
    genderError.value = 'Please select a gender.'
  } else {
    genderError.value = ''
  }
}

const validateReason = () => {
  if (!formData.value.reason) {
    reasonError.value = 'Please provide a reason for joining.'
  } else {
    reasonError.value = ''
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: '',
    suburb: 'Clayton',
  }

  usernameError.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''
  genderError.value = ''
  reasonError.value = ''
}

const submitForm = () => {
  validateUsername()
  validatePassword()
  validateConfirmPassword()
  validateGender()
  validateReason()

  if (
    !usernameError.value &&
    !passwordError.value &&
    !confirmPasswordError.value &&
    !genderError.value &&
    !reasonError.value
  ) {
    submittedUsers.value.push({
      username: formData.value.username,
      password: formData.value.password,
      isAustralian: formData.value.isAustralian ? 'Yes' : 'No',
      gender: formData.value.gender,
      reason: formData.value.reason,
      suburb: formData.value.suburb,
    })

    clearForm()
  }
}
</script>

<template>
  <div class="form-container">
    <div class="text-center mb-4">
      <h1>🗄️ W5. Library Registration Form</h1>
      <p>Let's build some more advanced features into our form.</p>
    </div>

    <form @submit.prevent="submitForm">
      <div class="row mb-3">
        <!-- Username -->
        <div class="col-12 col-md-6">
          <label for="username" class="form-label">Username</label>

          <input
            id="username"
            v-model="formData.username"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': usernameError }"
            @blur="validateUsername"
          />

          <div v-if="usernameError" class="invalid-feedback">
            {{ usernameError }}
          </div>
        </div>

        <!-- Gender -->
        <div class="col-12 col-md-6">
          <label for="gender" class="form-label">Gender</label>

          <select
            id="gender"
            v-model="formData.gender"
            class="form-select"
            :class="{ 'is-invalid': genderError }"
            @blur="validateGender"
          >
            <option value="">Please select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <div v-if="genderError" class="invalid-feedback">
            {{ genderError }}
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <!-- Password -->
        <div class="col-12 col-md-6">
          <label for="password" class="form-label">Password</label>

          <input
            id="password"
            v-model="formData.password"
            type="password"
            class="form-control"
            :class="{ 'is-invalid': passwordError }"
            @blur="validatePassword"
          />

          <div v-if="passwordError" class="invalid-feedback">
            {{ passwordError }}
          </div>
        </div>

        <!-- Confirm Password -->
        <div class="col-12 col-md-6">
          <label for="confirmPassword" class="form-label"> Confirm password </label>

          <input
            id="confirmPassword"
            v-model="formData.confirmPassword"
            type="password"
            class="form-control"
            :class="{ 'is-invalid': confirmPasswordError }"
            @blur="validateConfirmPassword"
          />

          <div v-if="confirmPasswordError" class="invalid-feedback">
            {{ confirmPasswordError }}
          </div>
        </div>
      </div>

      <!-- Australian Resident -->
      <div class="mb-3 form-check">
        <input
          id="isAustralian"
          v-model="formData.isAustralian"
          type="checkbox"
          class="form-check-input"
        />

        <label for="isAustralian" class="form-check-label"> Australian Resident? </label>
      </div>

      <!-- Reason -->
      <div class="mb-3">
        <label for="reason" class="form-label">Reason for joining</label>

        <textarea
          id="reason"
          v-model="formData.reason"
          class="form-control"
          :class="{ 'is-invalid': reasonError }"
          rows="3"
          @blur="validateReason"
        ></textarea>

        <div v-if="reasonError" class="invalid-feedback">
          {{ reasonError }}
        </div>

        <div v-if="friendMessage" class="text-success mt-1">
          {{ friendMessage }}
        </div>
      </div>

      <!-- Suburb -->
      <div class="mb-3">
        <label for="suburb" class="form-label">Suburb</label>

        <input id="suburb" v-model="formData.suburb" type="text" class="form-control" />
      </div>

      <!-- Buttons -->
      <div class="text-center">
        <button type="submit" class="btn btn-primary me-2">Submit</button>

        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
      </div>
    </form>

    <!-- PrimeVue DataTable -->
    <div class="table-section mt-5">
      <h2 class="mb-3">This is a Primevue Datatable.</h2>

      <DataTable :value="submittedUsers" stripedRows>
        <Column field="username" header="Username" />
        <Column field="password" header="Password" />
        <Column field="isAustralian" header="Australian Resident" />
        <Column field="gender" header="Gender" />
        <Column field="reason" header="Reason" />
        <Column field="suburb" header="Suburb" />
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  width: 100%;
}

h1 {
  font-weight: 600;
}

p {
  margin-bottom: 0;
}

.table-section {
  width: 100%;
}

@media (max-width: 767px) {
  .col-12 {
    margin-bottom: 15px;
  }
}
</style>
