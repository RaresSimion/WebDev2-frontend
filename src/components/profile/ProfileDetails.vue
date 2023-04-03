<template>
    <div class="container">
        <div v-if="error" class="alert alert-danger mt-3" role="alert">
            {{ this.error }}
        </div>
        <div v-else class="row">
            <div class="col-md-6 col-sm-12 mx-auto">
                <div class="card mb-3">
                    <div class="card-body">

                        <h1 class="card-title text-center mb-5">Your details</h1>
                        <div class="row mb-5">
                            <div class="col-md-6 text-center">
                                <h3>First Name</h3>
                                <p class="card-text fs-4">{{ user.first_name }}</p>
                            </div>

                            <div class="col-md-6 text-center">
                                <h3>Last Name</h3>
                                <p class="card-text fs-4">{{ user.last_name }}</p>
                            </div>
                        </div>

                        <div class="row mb-5">
                            <div class="col-md-12 text-center">
                                <h3>Address</h3>
                                <p class="card-text fs-4"> {{ user.address }} </p>
                            </div>
                        </div>

                        <div class="row mb-5">
                            <div class="col-md-6 text-center">
                                <h3>Date of birth</h3>
                                <p class="card-text fs-4"> {{ user.date_of_birth }}</p>
                            </div>

                            <div class="col-md-6 text-center">
                                <h3>Gender</h3>
                                <p class="card-text fs-4"> {{ user.gender }}</p>
                            </div>
                        </div>

                        <div class="row mb-5">
                            <div class="col-md-6 text-center">
                                <h3>Phone number</h3>
                                <p class="card-text fs-4"> {{ user.phone_number }}</p>
                            </div>

                            <div class="col-md-6 text-center">
                                <h3>Email</h3>
                                <p class="card-text fs-4"> {{ user.email }}</p>
                            </div>
                        </div>


                        <a href="/profile/edit" class="btn btn-primary">Edit your information</a>
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
    name: "ProfileDetails",
    data() {
        return {
            error: "",
            user_id: this.store.getUserId,
            user: {
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
        axios.get('/users/' + this.user_id)
            .then(response => {
                this.user = response.data;
            })
            .catch(error => {
                this.error = error.response.data.errorMessage;
            })
    }
}
</script>

<style lang="scss" scoped></style>