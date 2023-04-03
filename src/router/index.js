import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import DoctorIndex from '../components/doctors/DoctorIndex.vue';
import UserList from '../components/management/UserList.vue';
import DoctorList from '../components/management/DoctorList.vue';
import CreateDoctor from '../components/management/CreateDoctor.vue';
import EditDoctor from '../components/management/EditDoctor.vue';
import SectionList from '../components/management/SectionList.vue';
import EditSection from '../components/management/EditSection.vue';
import ProfileDetails from '../components/profile/ProfileDetails.vue';
import EditProfile from '../components/profile/EditProfile.vue';
import CreateAppointment from '../components/appointments/CreateAppointment.vue';
import AppointmentList from '../components/appointments/AppointmentList.vue';
import EditAppointment from '../components/appointments/EditAppointment.vue';
import Default from '../components/Default.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/home', component: Home },
    { path: '/doctors', component: DoctorIndex },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/management/users', component: UserList },
    { path: '/management/doctors', component: DoctorList},
    { path: '/management/doctors/create', component: CreateDoctor},
    { path: '/management/doctors/edit/:id', component: EditDoctor, props: true},
    { path: '/management/sections', component: SectionList},
    { path: '/management/sections/edit/:id', component: EditSection, props: true},
    { path: '/profile', component: ProfileDetails},
    { path: '/profile/edit', component: EditProfile},
    { path: '/appointment/create', component: CreateAppointment},
    { path: '/profile/appointments', component: AppointmentList},
    { path: '/profile/appointments/edit/:id', component: EditAppointment, props: true},
    { path: '/:notFound(.*)', component: Default}
  ]
})

export default router
