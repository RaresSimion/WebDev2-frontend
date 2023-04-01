<template>
    <div class="col-lg-6 col-xs-12 col-md-6 col-sm-6 mt-4 p-3 align-items-stretch" id="{{doctor.id}}">
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img class="img-thumbnail" :src="doctorImageURL"/>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title fs-3">{{ doctor.name }}</h5>
                        <p class="card-text fs-4 mb-5">{{ doctor.section.name }}</p>
                        <p class="card-text fs-5">
                            {{ doctor.email }}
                            <br>
                            {{ doctor.phone_number }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "../../axios-auth.js"

export default {
    name: "DoctorItem",
    data() {
        return {
            doctorImageURL: "doctor" + this.doctor.id + ".jpg",
        
        };
    },
    props: {
        doctor: Object,
    },
    methods: {
        getDoctorImageURL() {
            return this.doctor_id;
        },
    },
}
</script>

<style scoped>
img {
    width: 250px;
    height: 250px;
}
</style>