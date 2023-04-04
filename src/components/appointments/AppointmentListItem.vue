<template>
    <div class="col-lg-6 col-xs-12 col-md-4 my-lg-2 p-2">
        <div class="card mb-3 bg-info">
            <div class="card-body">
                <h2 class="card-title text-center mb-3">{{ appointment.doctor.section.name }} appointment</h2>
                <p class="card-text fs-4 mb-3">Doctor: {{ appointment.doctor.name }}</p>
                <p class="card-text fs-4 mb-3">Date: {{ formatDate(appointment.date) }}</p>
                <p class="card-text fs-4 mb-3">Time: {{ appointment.time }}</p>
                <button class="btn btn-danger float-end" type="button" @click="deleteAppointment(appointment.id)">Delete</button>
                <button  class="btn btn-warning float-start" type="submit" @click="editAppointment(appointment.id)">Edit</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../axios-auth.js';
export default {
    name: 'AppointmentListItem',
    props: {
        appointment: Object,
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();
            let daySuffix = 'th';
            if (day === 1 || day === 21 || day === 31) {
                daySuffix = 'st';
            } else if (day === 2 || day === 22) {
                daySuffix = 'nd';
            } else if (day === 3 || day === 23) {
                daySuffix = 'rd';
            }
            return `${day}${daySuffix} of ${month}, ${year}`;
        },

        editAppointment(id){
            this.$router.push('/profile/appointments/edit/' + id);
        },

        deleteAppointment(id) {
            axios.delete('/appointments/' + id)
                .then(response => {
                    console.log(response);
                    this.$emit("update");
                })
                .catch(error => {
                    console.log(error);
                });
        },


    },

}
</script>

<style lang="scss" scoped></style>