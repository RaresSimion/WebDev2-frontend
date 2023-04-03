import { defineStore } from "pinia";
import axios from '../axios-auth.js';

export const useUserSessionStore = defineStore("usersession", {
    state: () => ({
        token: "",
        first_name: "",
        user_id: "",
        role: "",
    }),

    getters: {
        isAuthenticated: (state) => {
            return state.token != "";
        },

        isAdmin: (state) => {
            return state.role == "Admin";
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
            this.role = localStorage["role"];
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
            console.log("Logged in automatically");
            console.log(localStorage["token"]);
        },

        login(email, password) {
            return new Promise((resolve, reject) => {
                axios.post('/users/login', {
                    email: email,
                    password: password
                }).then(response => {
                    this.token = response.data.jwt;
                    this.first_name = response.data.first_name;
                    this.user_id = response.data.user_id;
                    this.role = response.data.role;

                    localStorage["token"] = this.token;
                    localStorage["first_name"] = this.first_name;
                    localStorage["user_id"] = this.user_id;
                    localStorage["role"] = this.role;

                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
                    console.log(this.token)
                    resolve();
                }).catch(error => {
                    console.log(error);
                    reject(error.response.data.errorMessage);
                });
            });
        },
        logout() {
            this.token = "";
            this.first_name = "";
            this.user_id = "";
            this.role = "";
            localStorage.removeItem("token");
            localStorage.removeItem("first_name");
            localStorage.removeItem("user_id");
            localStorage.removeItem("role");
            axios.defaults.headers.common['Authorization'] = 'Bearer ';
        },

        register(user) {
            return new Promise((resolve, reject) => {
                axios.post('/users/register', user).then(response => {
                    this.login(user.email, user.password);
                    resolve();
                }).catch(error => {
                    console.log(error);
                    reject(error.response.data.errorMessage);
                });
            });
        }
    }
});