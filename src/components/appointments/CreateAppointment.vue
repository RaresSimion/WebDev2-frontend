<template>
    <div class="container">
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div id="liveAlertPlaceholder"></div>
                    <h1 class="text-center mb-4">Appointment</h1>
                    <div v-if="success" class="alert alert-success mt-3" role="alert">
                        {{ this.success }}
                    </div>
                    <div class="card bg-light">
                        <div class="card-body">
                            <div v-if="!this.store.isAuthenticated" class="alert alert-danger mt-3" role="alert">
                                <h3 class="text-center">You must be logged in to book an appointment.</h3>
                            </div>

                            <form v-else @submit.prevent="checkForm">


                                <div class="row mb-3">
                                    <h2 class="mb-3">Fill in the form to book your appointment</h2>

                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <select @change="updateDoctors" class="form-select" id="section" name="section"
                                                aria-label="Section">
                                                <option selected value="0">All sections</option>
                                                <option v-for="section in sections" :key="section.id" :value="section.id">{{
                                                    section.name }}</option>
                                            </select>
                                            <label for="section" class="form-label">Section</label>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <select v-model="appointment.doctor_id" class="form-select" id="doctor"
                                                name="doctor" aria-label="Doctor">
                                                <option selected v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">Dr. {{
                                                    doctor.name }}</option>
                                            </select>
                                            <label for="section" class="form-label">Doctors</label>
                                        </div>
                                    </div>

                                </div>

                                <div class="row mb-3">

                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input v-model="appointment.date" type="date" class="form-control" id="date"
                                                name="date" placeholder="Date">

                                            <label for="date" class="form-label">Appointment date</label>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input v-model="appointment.time" type="time"
                                                class="form-control" id="time" name="time" placeholder="Time">
                                            <label for="time" class="form-label">Appointment hour</label>
                                        </div>
                                    </div>

                                </div>


                                <div v-if="error" class="alert alert-danger mt-3" role="alert">
                                    {{ this.error }}
                                </div>
                                <button type="submit" class="btn btn-primary" name="confirmAppointment">Confirm</button>
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
    name: "CreateAppointment",
    data() {
        return {
            success: '',
            error: '',
            sections: [],
            doctors: [],
            appointment: {
                user_id: this.store.getUserId,
                date: '',
                time: '09:00',
                doctor_id: '',
            }
        }
    },
    methods: {
        getSections() {
            axios.get('/sections?sort=name')
                .then(response => {
                    this.sections = response.data;
                })
                .catch(error => {
                    this.error = error.response.data.message;
                });
        },
        getDoctors() {
            axios.get('/doctors')
                .then(response => {
                    this.doctors = response.data;
                })
                .catch(error => {
                    this.error = error.response.data.message;
                });
        },

        updateDoctors() {
            let sectionValue = document.getElementById('section').value;
            if (sectionValue == 0) {
                this.getDoctors();
                return;
            }
            axios.get('/doctors?section=' + document.getElementById('section').value)
                .then(response => {
                    this.doctors = response.data;
                })
                .catch(error => {
                    this.error = error.response.data.message;
                });
        },

        createAppointment() {
            axios.post('/appointments', this.appointment)
                .then(response => {
                    console.log(response);
                    this.success = 'Appointment created successfully!';
                    this.error = '';
                })
                .catch(error => {
                    this.error = error.response.data.errorMessage;
                });
        },

        checkForm() {
            if (this.appointment.doctor_id == '') {
                this.error = 'Please select a doctor';
                return false;
            }
            if (this.appointment.date == '') {
                this.error = 'Please select a date';
                return false;
            }
            if (this.appointment.time == '') {
                this.error = 'Please select a time';
                return false;
            }
            if (this.appointment.time < '09:00' || this.appointment.time > '16:00') {
                this.error = 'Please select a time between 09:00 and 16:00';
                return false;
            }
            this.createAppointment();
        },

        disablePastDates() {
            let today = new Date();
            let tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            document.getElementById("date").min = tomorrow.toISOString().split("T")[0];
        },
    },
    mounted() {
        this.getSections();
        this.getDoctors();
        this.disablePastDates();
    },
}
</script>

<style lang="scss" scoped></style>