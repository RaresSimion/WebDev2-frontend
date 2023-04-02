<template>
    <tr>
        <th scope="row">{{ user.id }}</th>
        <td>{{ user.first_name }}</td>
        <td>{{ user.last_name }}</td>
        <td>{{ user.address }}</td>
        <td>{{ user.phone_number }}</td>
        <td>{{ user.date_of_birth }}</td>
        <td>{{ user.gender }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.user_type.name }}</td>
        <td><button class="btn btn-danger" type="button" @click="deleteUser(user.id)">Delete</button></td>
        <td>
            <button v-if="user.user_type_id == 2" class="btn btn-success" type="button" @click="promoteUser(user.id)">Promote</button>
            <p v-else>Already admin</p>
        </td>
    </tr>
</template>

<script>
import axios from "../../axios-auth.js";
export default {
    name: "UserListItem",
    props: {
        user: Object,
    },
    methods: {
        deleteUser(id) {
            axios.delete("/users/" + id)
                .then(response => {
                    console.log(response);
                    this.$emit("update");
                })
                .catch(error => {
                    console.log(error);
                });
        },

        promoteUser(id) {
            axios.put("/users/promote/" + id)
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

<style ></style>