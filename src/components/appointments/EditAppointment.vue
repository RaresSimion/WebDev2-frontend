<template>
    <div class="container">
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <h1 class="text-center mb-4">Edit appointment</h1>
                    <div class="card bg-light">
                        <div class="card-body">
                            <form @submit.prevent="checkForm">

                                <div class="row mb-3">
                                    <h2 class="mb-3">Select a new date or time</h2>

                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input v-model="appointment.date" type="date" class="form-control" id="date"
                                                name="date" placeholder="Date">
                                            <label for="date" class="form-label">Appointment date</label>
                                        </div>
                                    </div>


                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input v-model="appointment.time" type="time" class="form-control" id="time"
                                                name="time" placeholder="Time">
                                            <label for="time" class="form-label">Appointment hour</label>
                                        </div>
                                    </div>

                                </div>

                                <div v-if="error" class="alert alert-danger mt-3" role="alert">
                                    {{ this.error }}
                                </div>
                                <div class="text-center">
                                    <button type="submit" class="btn btn-primary me-3" name="editAppointment">Confirm
                                        changes
                                    </button>
                                    <button @click="this.$router.push('/profile/appointments')"
                                        class="btn btn-warning">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from '../../axios-auth.js';
import { useUserSessionStore } from '../../stores/usersession';
export default {
    setup() {
        return {
            store: useUserSessionStore()
        };
    },
    name: "EditAppointment",
    props: {
        id: Number,
    },
    data() {
        return {
            appointment: {
                id: 0,
                user_id: 0,
                doctor_id: 0,
                date: "",
                time: "",
            },
            error: '',
        };
    },
    methods: {
        checkForm() {
            if (this.appointment.date == "") {
                this.error = "Please select a date";
                return;
            }
            if (this.appointment.time == "") {
                this.error = "Please select a time";
                return;
            }
            if (this.appointment.time < '09:00' || this.appointment.time > '16:00') {
                this.error = 'Please select a time between 09:00 and 16:00';
                return false;
            }
            this.error = "";
            this.updateAppointment();
        },
        updateAppointment() {
            axios.put('/appointments/' + this.id, this.appointment)
                .then(response => {
                    console.log(response);
                    this.$router.push('/profile/appointments');
                })
                .catch(error => {
                    this.error = error.response.data.errorMessage;
                });
        },
        getAppointment() {
            axios.get('/appointments/' + this.id)
                .then(response => {
                    this.appointment = response.data;
                    if (this.appointment.user_id != this.store.getUserId) {
                        this.$router.push('/profile/appointments');
                    }
                })
                .catch(error => {
                    this.error = error.response.data.errorMessage;
                });
        },

        disablePastDates() {
            let today = new Date();
            let tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            document.getElementById("date").min = tomorrow.toISOString().split("T")[0];
        },
    },
    mounted() {
        this.getAppointment();
        this.disablePastDates();
    },

}
</script>

<style lang="scss" scoped></style>