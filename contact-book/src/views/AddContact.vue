<template>
  <div class="container mt-4">
    <h2 class="mb-4">Add New Contact</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="firstName" class="form-control mb-3" placeholder="First Name" required />
      <input v-model="lastName" class="form-control mb-3" placeholder="Last Name" required />
      <input v-model="email" class="form-control mb-3" placeholder="Email" required type="email" />
      <button type="submit" class="btn btn-success">Save</button>
    </form>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const firstName = ref('')
const lastName = ref('')
const email = ref('')

const router = useRouter()

function handleSubmit() {
  const stored = localStorage.getItem('contacts')
  const contacts = stored ? JSON.parse(stored) : []

  const newContact = {
    id: Date.now(),
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
  }

  contacts.push(newContact)
  localStorage.setItem('contacts', JSON.stringify(contacts))

  router.push(`/contacts/${newContact.id}`)
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
}
input {
  display: block;
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
}
button {
  padding: 0.5rem 1rem;
}
</style>
