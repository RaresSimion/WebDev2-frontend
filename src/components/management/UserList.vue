<template>
    <div class="container">
        <h1 class="text-center mb-3">Users</h1>

        <div class="table table-responsive">
            <table class="table text-center">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First name</th>
                        <th scope="col">Last name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone number</th>
                        <th scope="col">Date of birth</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Email</th>
                        <th scope="col">User type</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Promote</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider" id="usersTable">
                    <user-list-item v-for="user in users" :key="user.id" :user="user" @update="getUsers"></user-list-item>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import axios from '../../axios-auth.js';
import UserListItem from './UserListItem.vue';
export default {
    name: "UserList",
    components: {
        UserListItem,
    },
    data() {
        return {
            users: [],
        };
    },
    mounted() {
        this.getUsers();
    },
    methods: {
        getUsers() {
            axios.get('/users')
                .then(response => {
                    this.users = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },
}
</script>

<style lang="scss" scoped></style>