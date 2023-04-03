<template>
    <div class="container">
        <h1 class="text-center mb-3">My appointments</h1>

        <div v-if="error" class="alert alert-danger mt-3 text-center" role="alert">
            <h3>{{ this.error }}</h3>
            <button v-if="error=='No appointments booked yet.'" type="button" @click="this.$router.push('/appointment/create')" class="btn btn-primary">Book now!</button>
        </div>
        <div v-else class="row" id="appointmentRow">
            <appointment-list-item v-for="appointment in appointments" :key="appointment.id"
                :appointment="appointment" @update="getAppointments"></appointment-list-item>
        </div>
    </div>
</template>

<script>
import axios from '../../axios-auth.js';
import AppointmentListItem from './AppointmentListItem.vue';
import { useUserSessionStore } from '../../stores/usersession';
export default {
    setup() {
        return {
            store: useUserSessionStore()
        };
    },
    name: "AppointmentList",
    components: {
        AppointmentListItem,
    },
    data() {
        return {
            user_id: this.store.getUserId,
            error: '',
            appointments: [],
        };
    },

    mounted() {
        this.getAppointments();
    },

    methods: {
        getAppointments() {
            axios.get('/appointments/user/' + this.user_id)
                .then(response => {
                    this.appointments = response.data;
                })
                .catch(error => {
                    this.error = error.response.data.errorMessage;
                });
        },
    },
}
</script>

<style lang="scss" scoped></style>