import { defineStore } from "pinia";
import axios from '../axios-auth.js';

export const useUserSessionStore = defineStore("usersession", {
    state: () => ({
        token: "",
        first_name: "",
        user_id: "",
        user_type_id: "",
    }),

    getters: {
        isAuthenticated: (state) => {
            return state.token != "";
        },

        isAdmin: (state) => {
            return state.user_type_id == 1;
        },

        getFirstName: (state) => {
            return state.first_name;
        },

        getUserId: (state) => {
            return state.user_id;
        }
    },

    actions: {
        localLogin() {
            if (localStorage["token"] == null) {
                return;
            }
            this.token = localStorage["token"];
            this.first_name = localStorage["first_name"];
            this.user_id = localStorage["user_id"];
            this.user_type_id = localStorage["user_type_id"];
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
            console.log("Logged in automatically");
            console.log(localStorage["token"]);
        },

        login(email, password) {
            return new Promise((resolve, reject) => {
            axios.post('/users/login', {
                email: email,
                password: password
                }).then(response => 
                    {
                        this.token = response.data.jwt;
                        this.first_name = response.data.first_name;
                        this.user_id = response.data.user_id;
                        this.user_type_id = response.data.user_type_id;

                        localStorage["token"] = this.token;
                        localStorage["first_name"] = this.first_name;
                        localStorage["user_id"] = this.user_id;
                        localStorage["user_type_id"] = this.user_type_id;

                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
                        console.log(this.token)
                        resolve();
                }).catch(error => {
                console.log(error);
                reject(error.response.data.errorMessage);
            });
        });
    },
    logout(){
        this.token = "";
        this.first_name = "";
        this.user_id = "";
        this.user_type_id = "";
        localStorage.removeItem("token");
        localStorage.removeItem("first_name");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_type_id");
        axios.defaults.headers.common['Authorization'] = 'Bearer ';
    },
    }
});