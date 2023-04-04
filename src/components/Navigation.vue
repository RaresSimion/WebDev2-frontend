<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-primary mb-4 sticky-top">
    <div class="container">
        <a class="navbar-brand" href="/" style="color: white">Miracle Clinic</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                    <a class="nav-link" href="/" style="color: white">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" style="color: white" href="/doctors">Our Specialists</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/appointment/create" style="color: white">Book an appointment!</a>
                </li>
                <li class="nav-item" v-if="!this.store.isAuthenticated">
                    <a class="nav-link" style="color: white" href="/login">Login</a>
                </li>
                <li class="nav-item" v-if="!this.store.isAuthenticated">
                    <a class="nav-link" style="color: white" href="/register">Register</a>
                </li>
                <li class="nav-item dropdown" v-if="this.store.isAdmin">
                    <a style="color: white" class="nav-link dropdown-toggle" href="#" role="button"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        Management
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="/management/users">Users</a></li>
                        <li><a class="dropdown-item" href="/management/doctors">Doctors</a></li>
                        <li><a class="dropdown-item" href="/management/sections">Clinic sections</a></li>
                    </ul>
                </li>

                <li v-if="this.store.isAuthenticated" class="nav-item dropdown">
                    <a style="color: white" class="nav-link dropdown-toggle" href="#" role="button"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        My Profile
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="/profile">My Details</a></li>
                        <li><a class="dropdown-item" href="/profile/appointments">My Appointments</a></li>
                    </ul>
                </li>

                <li v-if="this.store.isAuthenticated" class="nav-item">
                    <a style="color: white" class="nav-link" href="/home" @click="this.store.logout">Logout</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
</template>

<script >
import { useUserSessionStore } from '../stores/usersession';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default {
  setup() {
    return {
      store: useUserSessionStore()
    }
  },
  name: "Navigation",

};
</script>

<style>
</style>