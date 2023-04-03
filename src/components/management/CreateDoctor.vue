<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 col-sm-12 col-lg-6 mx-auto">
                <h1 class="text-center mb-4">Add a doctor</h1>
                <div class="card bg-light">
                    <div class="card-body">
                        <form @submit.prevent="checkForm">
                            <div class="row mb-3">
                                <h2 class="mb-3">Name & email</h2>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input v-model="doctor.name"   type="text" class="form-control" id="name"
                                            name="name" placeholder="John">
                                        <label for="name" class="form-label">Name</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input v-model="doctor.email"   type="email" class="form-control" id="email"
                                            name="email" placeholder="Email">
                                        <label for="email" class="form-label">Email</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <h2 class="mb-3">Section</h2>
                                <div class="col-md">
                                    <div class="form-floating">
                                        <select v-model="doctor.section_id"   class="form-select" id="section"
                                            name="section" aria-label="Section">
                                            <option v-for="section in sections" :key="section.id" :value="section.id">{{
                                                section.name }}</option>
                                        </select>
                                        <label for="section" class="form-label">Section</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <h2 class="mb-3">Other Information</h2>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input v-model="doctor.phone_number"   type="text" class="form-control"
                                            id="phoneNumber" name="phoneNumber" placeholder="Phone number">
                                        <label for="phoneNumber" class="form-label">Phone number</label>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input v-model="doctor.date_of_birth"   type="date" class="form-control"
                                            id="birthDate" name="dateOfBirth" placeholder="birthDate">
                                        <label for="birthDate" class="form-label">Birth Date</label>
                                    </div>
                                </div>



                            </div>


                            <button type="submit" class="btn btn-primary" name="addDoctor"
                                >Confirm</button>
                            <button type="button" class="btn btn-warning"
                                @click="this.$router.push('/management/doctors')">Cancel</button>

                            <label class="m-2 text-danger"></label>
                        </form>
                        <div v v-if="error" class="alert alert-danger mt-3" role="alert">
                            {{ this.error }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../axios-auth.js';
export default {
    name: "CreateDoctor",
    data() {
        return {
            error: '',
            doctor: {
                name: '',
                email: '',
                section_id: 0,
                phone_number: '',
                date_of_birth: '',
            },
            sections: [],
        }
    },
    mounted() {
        axios.get('/sections?sort=name')
            .then(response => {
                this.sections = response.data;
                console.log(this.sections);
            })
            .catch(error => {
                console.log(error);
            });
    },
    methods: {
        addDoctor() {
            axios.post('/doctors', this.doctor)
                .then(response => {
                    console.log(response);
                    this.$router.push('/management/doctors');
                })
                .catch(error => {
                    this.error=error.response.data.errorMessage;
                });
        },

        checkForm() {
            if (this.doctor.name == '') {
                this.error = 'Name is required';
                return false;
            }
            if (this.doctor.email == '') {
                this.error = 'Email is required';
                return false;
            }
            if (this.doctor.section_id == 0) {
                this.error = 'Section is required';
                return false;
            }
            if (this.doctor.phone_number == '') {
                this.error = 'Phone number is required';
                return false;
            }
            if (this.doctor.date_of_birth == '') {
                this.error = 'Date of birth is required';
                return false;
            }
            this.addDoctor();
        }
    }


}
</script>

<style lang="scss" scoped></style>