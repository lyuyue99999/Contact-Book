import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ContactDetails from '../views/ContactDetails.vue'
import AddContact from '../views/AddContact.vue'
import EditContact from '../views/EditContact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/contacts/:id',
    name: 'ContactDetails',
    component: ContactDetails,
  },
  {
    path: '/add',
    name: 'AddContact',
    component: AddContact,
  },
  {
    path: '/edit/:id',
    name: 'EditContact',
    component: EditContact,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
