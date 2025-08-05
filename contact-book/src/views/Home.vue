import { RouterLink } from 'vue-router'

<template>
  <div class="container mt-4">
    <h1 class="mb-4">Contact Book</h1>

    <RouterLink to="/add">
      <button class="btn btn-primary mb-3">Add Contact</button>
    </RouterLink>

    <input
      v-model="searchQuery"
      class="form-control mb-3"
      placeholder="Search by name..."
    />

    <ul class="list-group">
      <li
        class="list-group-item"
        v-for="contact in filteredContacts"
        :key="contact.id"
      >
        <RouterLink :to="`/contacts/${contact.id}`">
          {{ contact.firstName }} {{ contact.lastName }} - {{ contact.email }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'

const contacts = ref([])
const searchQuery = ref('')

onMounted(() => {
  const stored = localStorage.getItem('contacts')
  if (stored) {
    contacts.value = JSON.parse(stored)
  }
})

const filteredContacts = computed(() => {
  return contacts.value
    .filter(contact => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase()
      return fullName.includes(searchQuery.value.toLowerCase())
    })
    .sort((a, b) => a.lastName.localeCompare(b.lastName))
})


</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
}
input {
  padding: 8px;
  width: 100%;
  margin-bottom: 1rem;
}
</style>

