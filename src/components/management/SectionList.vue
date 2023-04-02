<template>
    <div class="container">
        <h1 class="text-center mb-3">Clinic sections</h1>

        <div class="card bg-light text-center mb-4">
            <h3 class="mt-3">Add section</h3>
            <div class="card-body">
                <form  @submit.prevent="checkForm" id="sectionForm">
                    <div class="row mb-3">
                        <div class="col-md-12">
                            <div class="form-floating">
                                <input v-model="section.name" type="text" class="form-control" id="section" name="section" placeholder="Section"
                                    >
                                <label for="section" class="form-label">Section name</label>
                            </div>
                        </div>
                    </div>
                    <div v v-if="error" class="alert alert-danger mt-3" role="alert">
                            {{ this.error }}
                    </div>
                    <button type="submit" class="btn btn-primary" name="addSection">Add section</button>
                </form>
            </div>
        </div>


        <div class="table table-responsive">
            <table class="table text-center">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider" id="sectionsTable">
                    <tr v-for="section in sections" :key="section.id">
                        <th scope="row">{{ section.id }}</th>
                        <td>{{ section.name }}</td>
                        <td>
                            <button class="btn btn-danger" @click="deleteSection(section.id)">Delete</button>
                        </td>
                        <td>
                            <button class="btn btn-warning" @click="editSection(section.id)">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>    
        </div>
    </div>
</template>

<script>
import axios from '../../axios-auth.js';

export default {
    name: "SectionList",
    data() {
        return {
            error: '',
            section: {
                name: '',
            },
            sections: [],
        }
    },
    mounted() {
        this.getSections();
    },
    methods: {
        getSections() {
            axios.get('/sections')
                .then(response => {
                    this.sections = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        deleteSection(id) {
            axios.delete('/sections/' + id)
                .then(response => {
                    console.log(response);
                    this.getSections();
                })
                .catch(error => {
                    console.log(error);
                });
        },

        editSection(id) {
            this.$router.push('/management/sections/edit/' + id);
        },

        addSection() {
            axios.post('/sections', this.section)
                .then(response => {
                    console.log(response);
                    this.getSections();
                })
                .catch(error => {
                    console.log(error);
                });
        },

        checkForm() {
            if (this.section.name == '') {
                this.error = 'Please fill in the section name.';
                return false;
            }
            this.addSection();
            this.section.name = '';
            this.error = '';
        },
    },
}
</script>

<style lang="scss" scoped></style>