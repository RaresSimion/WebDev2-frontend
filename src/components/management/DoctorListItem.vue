<template>
    <tr>
        <th scope="row">{{ doctor.id }}</th>
        <td>{{ doctor.name }}</td>
        <td>{{ doctor.section.name }}</td>
        <td>{{ doctor.email }}</td>
        <td>{{ doctor.date_of_birth }}</td>
        <td>{{ doctor.phone_number }}</td>
        <td><button class="btn btn-danger" type="button" @click="deleteDoctor(doctor.id)">Delete</button></td>
        <td><button class="btn btn-warning" type="button" @click="editDoctor(doctor.id)" >Edit</button></td>
    </tr>
</template>

<script>
    import axios from "../../axios-auth.js";
    export default {
        name: "DoctorListItem",
        props: {
            doctor: Object,
        },
        methods: {
            deleteDoctor(id) {
                axios.delete("/doctors/" + id)
                    .then(response => {
                        console.log(response);
                        this.$emit("update");
                    })
                    .catch(error => {
                        let errorMessage = error.response.data.errorMessage;
                        this.$emit("error", errorMessage);
                    });
            },

            editDoctor(id) {
                this.$router.push("/management/doctors/edit/" + id);
            },
        },
        
    }
</script>

<style lang="scss" scoped>

</style>