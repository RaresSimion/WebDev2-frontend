import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue';
import ProductList from '../components/products/ProductList.vue';
import CreateProduct from '../components/products/CreateProduct.vue';
import EditProduct from '../components/products/EditProduct.vue';
import Login from '../components/Login.vue';
import DoctorIndex from '../components/doctors/DoctorIndex.vue';
import UserList from '../components/management/UserList.vue';
import DoctorList from '../components/management/DoctorList.vue';
import CreateDoctor from '../components/management/CreateDoctor.vue';
import EditDoctor from '../components/management/EditDoctor.vue';
import SectionList from '../components/management/SectionList.vue';
import EditSection from '../components/management/EditSection.vue';
import ProfileDetails from '../components/profile/ProfileDetails.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/home', component: Home },
    { path: '/doctors', component: DoctorIndex },
    { path: '/login', component: Login },
    { path: '/createproduct', component: CreateProduct },
    { path: '/editproduct/:id', component: EditProduct, props: true  },
    { path: '/management/users', component: UserList },
    { path: '/management/doctors', component: DoctorList},
    { path: '/management/doctors/create', component: CreateDoctor},
    { path: '/management/doctors/edit/:id', component: EditDoctor, props: true  },
    { path: '/management/sections', component: SectionList},
    { path: '/management/sections/edit/:id', component: EditSection, props: true},
    { path: '/profile', component: ProfileDetails}
  ]
})

export default router
