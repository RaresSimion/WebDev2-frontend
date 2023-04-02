<template>
    <div class="container">
        <div class="card bg-light text-center mb-4">
            <h3 class="mt-3">Edit section</h3>
            <div class="card-body">
                <form @submit.prevent="checkForm">
                    <div class="row mb-3">
                        <div class="col-md-12">
                            <div class="form-floating">
                                <input v-model="this.section.name" type="text" class="form-control" id="section"
                                    name="section" placeholder="Section">
                                <label for="section" class="form-label">Section name</label>
                            </div>
                        </div>
                    </div>

                    <div v v-if="error" class="alert alert-danger mt-3" role="alert">
                        {{ this.error }}
                    </div>
                    <button type="submit" class="btn btn-primary" name="editSection">Confirm changes</button>
                    <button type="button" @click="this.$router.push('/management/sections')"
                        class="btn btn-warning">Cancel</button>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../axios-auth.js';
export default {
    name: "EditSection",
    props: {
        id: Number
    },
    data() {
        return {
            error: '',
            section: {
                id: 0,
                name: '',
            },
        }
    },
    methods: {
        editSection() {
            axios.put('/sections/' + this.section.id, this.section)
                .then(response => {
                    console.log(response);
                    this.$router.push('/management/sections');
                })
                .catch(error => {
                    this.error = error.response.data.errorMessage;
                });
        },

        getSection() {
            axios.get('/sections/' + this.id)
                .then(response => {
                    this.section = response.data;
                })
                .catch(error => {
                    this.error=error.response.data.errorMessage;
                });
        },

        checkForm(){
            if(this.section.name.length < 3){
                this.error = "Section name must be at least 3 characters long";
                return false;
            }
            this.editSection();
        }
    },

    mounted() {
        this.getSection();
    }
}
</script>

<style lang="scss" scoped></style>