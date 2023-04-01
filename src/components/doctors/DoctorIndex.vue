<template>
    <div class="container">
        <h1 class="text-center mb-3">Our specialists</h1>

        <div class="form-floating">
            <select class="form-select" @change="filterDoctors" id="section" name="section" aria-label="Section">
                <option selected value="0">All sections</option>
                <option v-for="section in sections" :key="section.id" :value="section.id">{{ section.name }}</option>
            </select>
            <label for="section" class="form-label">Section</label>
        </div>
        <div class="row" id="doctorRow">
            <doctor-item v-for="doctor in doctors" :key="doctor.id" :doctor="doctor"></doctor-item>
        </div>
    </div>
</template>

<script>
import axios from '../../axios-auth.js';
import DoctorItem from './DoctorItem.vue';
export default {
    name: "DoctorIndex",
    components: {
        DoctorItem,
    },
    data() {
        return {
            doctors: [],
            sections: [],
        };
    },
    mounted() {
        this.getDoctors();
        this.getSections();
    },
    methods: {
        getDoctors() {
            axios.get('/doctors')
                .then(response => {
                    this.doctors = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        getSections() {
            axios.get('/sections')
                .then(response => {
                    this.sections = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        filterDoctors() {
            let sectionId = document.getElementById('section').value;
            if(sectionId == 0) {
                this.getDoctors();
                return;
            }
            axios.get('/doctors?section=' + sectionId)
                .then(response => {
                    this.doctors = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },

}
</script>

<style lang="scss" scoped></style>