<template>
    <div class="container">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-sm-12 mx-auto">
                    <h1 class="text-center mb-4">Edit your profile</h1>
                    <div class="card bg-light">
                        <div class="card-body">
                            <form @submit.prevent="checkForm">
                                <div class="row mb-3">
                                    <h2 class="mb-3">Name</h2>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input v-model="user.first_name" type="text" class="form-control" id="firstName"
                                                name="firstName" placeholder="John">
                                            <label for="firstName" class="form-label">First Name</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input v-model="user.last_name" type="text" class="form-control" id="lastName"
                                                name="lastName" placeholder="Doe">
                                            <label for="lastName" class="form-label">Last Name</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <h2 class="mb-3">Address</h2>
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <textarea v-model="user.address" name="address" id="address"
                                                class="form-control" placeholder="Address"></textarea>
                                            <label for="address" class="form-label">City, street name and post
                                                code</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <h2 class="mb-3">Other Information</h2>
                                    <div class="col-md-4">
                                        <div class="form-floating">
                                            <input v-model="user.phone_number" type="text" class="form-control"
                                                id="phoneNumber" name="phoneNumber" placeholder="Phone number">
                                            <label for="phoneNumber" class="form-label">Phone number</label>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-floating">
                                            <input v-model="user.date_of_birth" type="date" class="form-control"
                                                id="birthDate" name="dateOfBirth" placeholder="birthDate">
                                            <label for="birthDate" class="form-label">Birth Date</label>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-floating">
                                            <select v-model="user.gender" class="form-select" id="gender" name="gender"
                                                aria-label="Gender">
                                                <option value="Male">Male
                                                </option>
                                                <option value="Female">Female</option>

                                            </select>
                                            <label for="gender" class="form-label">Gender</label>
                                        </div>
                                    </div>
                                </div>



                                <h2 class="mb-3">Email</h2>
                                <div class="row mb-3">
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <input v-model="user.email" type="email" class="form-control" id="email"
                                                name="email" placeholder="Email">
                                            <label for="email" class="form-label">Email</label>
                                        </div>
                                    </div>
                                </div>

                                <div v v-if="error" class="alert alert-danger mt-3" role="alert">
                                    {{ this.error }}
                                </div>
                                <button type="submit" class="btn btn-primary me-2" name="edit">Confirm changes</button>
                                <button @click="this.$router.push('/profile')" class="btn btn-warning">Cancel</button>
                                <button type="button" @click="deleteUser(user.id)" class="btn btn-danger float-end" name="delete">Delete
                                    profile</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useUserSessionStore } from '../../stores/usersession';
import axios from '../../axios-auth.js';
export default {
    setup() {
        return {
            store: useUserSessionStore()
        }
    },
    name: "EditProfile",
    data() {
        return {
            error: "",
            user_id: this.store.getUserId,
            user: {
                id: 0,
                first_name: "",
                last_name: "",
                address: "",
                date_of_birth: "",
                gender: "",
                phone_number: "",
                email: ""
            }
        }
    },
    mounted() {
        this.getUser();
        this.disableFutureDates();
    },

    methods: {
        getUser() {
            axios.get('/users/' + this.user_id)
                .then(response => {
                    this.user = response.data;
                })
                .catch(error => {
                    this.error = error.response.data.errorMessage;
                })
        },

        updateUser() {
            axios.put('/users/' + this.user.id, this.user)
                .then(response => {
                    console.log(response);
                    localStorage['first_name'] = this.user.first_name;
                    this.$router.push('/profile');
                })
                .catch(error => {
                    this.error = error.response.data.errorMessage;
                })
        },

        checkForm() {
            if (this.user.first_name == "") {
                this.error = "First name is required";
                return false;
            }
            if (this.user.last_name == "") {
                this.error = "Last name is required";
                return false;
            }
            if (this.user.address == "") {
                this.error = "Address is required";
                return false;
            }
            if (this.user.date_of_birth == "") {
                this.error = "Date of birth is required";
                return false;
            }
            if (this.user.gender == "") {
                this.error = "Gender is required";
                return false;
            }
            if (this.user.phone_number == "") {
                this.error = "Phone number is required";
                return false;
            }
            if (this.user.email == "") {
                this.error = "Email is required";
                return false;
            }
            this.updateUser();
        },

        deleteUser(id){
            axios.delete('/users/' + id)
                .then(response => {
                    console.log(response);
                    this.store.logout();
                    this.$router.push('/login');
                })
                .catch(error => {
                    this.error = error.response.data.errorMessage;
                })
        },

        disableFutureDates() {
            document.getElementById("birthDate").max = new Date().toISOString().split("T")[0];
        }
    },
}
</script>

<style lang="scss" scoped></style>