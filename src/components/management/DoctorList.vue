<template>
    <div class="container">
        <h1 class="text-center mb-3">Doctors</h1>
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
                    <doctor-list-item v-for="doctor in doctors" :key="doctor.id" :doctor="doctor"
                        @update="getDoctors"></doctor-list-item>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from '../../axios-auth.js';
import DoctorListItem from './DoctorListItem.vue';

export default {
    name: "DoctorList",
    components: {
        DoctorListItem,
    },
    data() {
        return {
            doctors: [],
        };
    },
    mounted() {
        this.getDoctors();
    },
    methods: {
        getDoctors() {
            axios.get('/doctors')
                .then(response => {
                    this.doctors = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },
}
</script>

<style lang="scss" scoped></style>