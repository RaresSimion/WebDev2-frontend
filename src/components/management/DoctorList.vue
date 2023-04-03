<template>
    <div v-if="!store.isAdmin" class="container">
        <div class="alert alert-danger mt-3" role="alert">
            Unauthorized access, please login as an admin.
        </div>
    </div>
    <div v-else class="container">
        <h1 class="text-center mb-3">Doctors</h1>
        <div v-if="error" class="alert alert-danger mt-3" role="alert">
            <h5>{{ this.error }}</h5>
        </div>
        <button class="btn btn-primary mb-3" @click="this.$router.push('/management/doctors/create')">Add doctor</button>
        <div class="table table-responsive">
            <table class="table text-center">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Section</th>
                        <th scope="col">Email</th>
                        <th scope="col">Date of birth</th>
                        <th scope="col">Phone number</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider" id="doctorsTable">
                    <doctor-list-item v-for="doctor in doctors" :key="doctor.id" :doctor="doctor" v-on:error="handleError"
                        @update="getDoctors"></doctor-list-item>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from '../../axios-auth.js';
import DoctorListItem from './DoctorListItem.vue';
import { useUserSessionStore } from '../../stores/usersession';

export default {
    setup() {
        return {
            store: useUserSessionStore()
        };
    },
    name: "DoctorList",
    components: {
        DoctorListItem,
    },
    data() {
        return {
            error: '',
            doctors: [],
        };
    },
    mounted() {
        this.getDoctors();
    },
    methods: {
        handleError(error) {
            this.error = error;
        },
        getDoctors() {
            axios.get('/doctors')
                .then(response => {
                    this.doctors = response.data;
                })
                .catch(error => {
                    this.error = error.response.data.errorMessage;
                });
        },
    },
}
</script>

<style lang="scss" scoped></style>