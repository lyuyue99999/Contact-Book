<template>
  <div class="container mt-4" v-if="contact">
    <h2 class="mb-4">Edit Contact</h2>
    <form @submit.prevent="handleUpdate">
      <input v-model="contact.firstName" class="form-control mb-3" placeholder="First Name" required />
      <input v-model="contact.lastName" class="form-control mb-3" placeholder="Last Name" required />
      <input v-model="contact.email" class="form-control mb-3" placeholder="Email" required type="email" />
      <button type="submit" class="btn btn-warning">Save Changes</button>
    </form>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const contact = ref(null)

onMounted(() => {
  const id = parseInt(route.params.id)
  const stored = localStorage.getItem('contacts')
  if (stored) {
    const contacts = JSON.parse(stored)
    const found = contacts.find(c => c.id === id)
    if (found) {
      contact.value = { ...found }
    }
  }
})

function handleUpdate() {
  const stored = localStorage.getItem('contacts')
  let contacts = stored ? JSON.parse(stored) : []

  const index = contacts.findIndex(c => c.id === contact.value.id)
  if (index !== -1) {
    contacts[index] = contact.value
    localStorage.setItem('contacts', JSON.stringify(contacts))
    router.push(`/contacts/${contact.value.id}`)
  }
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
