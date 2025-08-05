<template>
  <div class="container mt-4" v-if="contact">
    <h2>{{ contact.firstName }} {{ contact.lastName }}</h2>
    <p><strong>Email:</strong> {{ contact.email }}</p>

    <RouterLink :to="`/edit/${contact.id}`">
      <button class="btn btn-warning me-2">Edit</button>
    </RouterLink>

    <button class="btn btn-danger me-2" @click="handleDelete">Delete</button>

    <RouterLink to="/">
      <button class="btn btn-secondary">← Back to Contact List</button>
    </RouterLink>
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
    const allContacts = JSON.parse(stored)
    contact.value = allContacts.find(c => c.id === id)
  }
})

function handleDelete() {
  if (confirm('Are you sure you want to delete this contact?')) {
    const stored = localStorage.getItem('contacts')
    if (stored) {
      let contacts = JSON.parse(stored)
      contacts = contacts.filter(c => c.id !== contact.value.id)
      localStorage.setItem('contacts', JSON.stringify(contacts))
      router.push('/')
    }
  }
}
</script>
