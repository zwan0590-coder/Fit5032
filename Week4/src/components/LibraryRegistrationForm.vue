<template>
  <div class="page-wrapper">
    <div class="form-container">
      <h1 class="text-center mb-4">User Information Form</h1>

      <form @submit.prevent="submitForm">
        <!-- Username + Password -->
        <div class="row mb-3">
          <!-- Username -->
          <div class="col-12 col-md-6 mb-3 mb-md-0">
            <label for="username" class="form-label"> Username </label>

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

          <!-- Password -->
          <div class="col-12 col-md-6">
            <label for="password" class="form-label"> Password </label>

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
        </div>

        <!-- Australian + Gender -->
        <div class="row mb-3">
          <!-- Australian Resident -->
          <div class="col-12 col-md-6 mb-3 mb-md-0">
            <div class="form-check resident-check">
              <input
                id="isAustralian"
                v-model="formData.isAustralian"
                type="checkbox"
                class="form-check-input"
              />

              <label class="form-check-label" for="isAustralian"> Australian Resident? </label>
            </div>
          </div>

          <!-- Gender -->
          <div class="col-12 col-md-6">
            <label for="gender" class="form-label"> Gender </label>

            <select
              id="gender"
              v-model="formData.gender"
              class="form-select"
              :class="{ 'is-invalid': genderError }"
              @blur="validateGender"
            >
              <option value="">Please select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <div v-if="genderError" class="invalid-feedback">
              {{ genderError }}
            </div>
          </div>
        </div>

        <!-- Reason -->
        <div class="mb-3">
          <label for="reason" class="form-label"> Reason for joining </label>

          <textarea
            id="reason"
            v-model="formData.reason"
            rows="3"
            class="form-control"
            :class="{ 'is-invalid': reasonError }"
            @blur="validateReason"
          ></textarea>

          <div v-if="reasonError" class="invalid-feedback">
            {{ reasonError }}
          </div>
        </div>

        <!-- Buttons -->
        <div class="text-center">
          <button type="submit" class="btn btn-primary me-2">Submit</button>

          <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
        </div>
      </form>

      <!-- PrimeVue DataTable -->
      <div v-if="submittedUsers.length > 0" class="table-section">
        <h2 class="text-center mb-3">Submitted User Information</h2>

        <div class="table-wrapper">
          <DataTable :value="submittedUsers" stripedRows showGridlines>
            <Column field="username" header="Username" />

            <Column field="password" header="Password" />

            <Column field="isAustralian" header="Australian Resident">
              <template #body="slotProps">
                {{ slotProps.data.isAustralian ? 'Yes' : 'No' }}
              </template>
            </Column>

            <Column field="gender" header="Gender" />

            <Column field="reason" header="Reason" />
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  gender: '',
  reason: '',
})

const submittedUsers = ref([])

const usernameError = ref('')
const passwordError = ref('')
const genderError = ref('')
const reasonError = ref('')

/* Username validation */
const validateUsername = () => {
  if (formData.value.username.length < 3) {
    usernameError.value = 'Name must be at least 3 characters'
    return false
  }

  usernameError.value = ''
  return true
}

/* Password validation */
const validatePassword = () => {
  const password = formData.value.password

  if (password.length < 8) {
    passwordError.value = 'Password must be at least 8 characters long.'
    return false
  }

  if (!/[A-Z]/.test(password)) {
    passwordError.value = 'Password must contain at least one uppercase letter.'
    return false
  }

  if (!/[a-z]/.test(password)) {
    passwordError.value = 'Password must contain at least one lowercase letter.'
    return false
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    passwordError.value = 'Password must contain at least one special character.'
    return false
  }

  passwordError.value = ''
  return true
}

/* Gender validation */
const validateGender = () => {
  if (!formData.value.gender) {
    genderError.value = 'Please select a gender.'
    return false
  }

  genderError.value = ''
  return true
}

/* Reason validation */
const validateReason = () => {
  const reason = formData.value.reason.trim()

  if (reason.length < 10) {
    reasonError.value = 'Reason must be at least 10 characters.'
    return false
  }

  reasonError.value = ''
  return true
}

/* Submit */
const submitForm = () => {
  const usernameValid = validateUsername()
  const passwordValid = validatePassword()
  const genderValid = validateGender()
  const reasonValid = validateReason()

  if (!usernameValid || !passwordValid || !genderValid || !reasonValid) {
    return
  }

  submittedUsers.value.push({
    ...formData.value,
  })

  clearForm()
}

/* Clear */
const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    gender: '',
    reason: '',
  }

  usernameError.value = ''
  passwordError.value = ''
  genderError.value = ''
  reasonError.value = ''
}
</script>

<style scoped>
.page-wrapper {
  width: 100%;
  min-height: 100vh;
  padding: 48px 20px;
}

.form-container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}

h1,
h2 {
  color: #212529;
}

form {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.resident-check {
  margin-top: 38px;
}

.invalid-feedback {
  display: block;
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 4px;
}

.table-section {
  width: 100%;
  margin-top: 48px;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

:deep(.p-datatable) {
  width: 100%;
}

:deep(.p-datatable-table) {
  width: 100%;
  min-width: 850px;
}

@media (max-width: 767px) {
  .page-wrapper {
    padding: 24px 12px;
  }

  .resident-check {
    margin-top: 0;
  }
}
</style>
