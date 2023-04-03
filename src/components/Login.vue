<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-sm-12 mx-auto">
        <h1 class="text-center mb-4">Login</h1>
        <div class="card bg-light">
          <div class="card-body">
            <form @submit.prevent="checkForm">
              <div class="row mb-5">
                <div class="col-md-12">
                  <h2 class="mb-3">Email</h2>
                  <div class="form-floating">
                    <input type="email" class="form-control" id="email" name="email" placeholder="Email" v-model="email">
                    <label for="email" class="form-label">Email</label>
                  </div>
                </div>
              </div>

              <div class="row mb-5">
                <h2 class="mb-3">Password</h2>
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="password" class="form-control" id="password" name="password" placeholder="Password"
                      v-model="password">
                    <label for="password" class="form-label">Password</label>
                  </div>
                </div>
              </div>

              <div v-if="error" class="alert alert-danger mt-3" role="alert">
                {{ this.error }}
              </div>
              <button type="submit" class="btn btn-primary fs-4 mb-3" name="login">Login</button>
              <a href="/register" class="fs-5 float-end mb-3">Don't have an account? Register now!</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from "../axios-auth.js";
import { useUserSessionStore } from "../stores/usersession";

export default {
  setup() {
    return {
      store: useUserSessionStore()
    };
  },
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    login() {
      this.store.login(this.email, this.password).then(() => {
        this.$router.push("/");
      }).catch((error) => {
        this.error = error;
      });
    },

    checkForm() {
      if (this.email == "") {
        this.error = "Please enter an email";
        return false;
      }
      else if (this.password == "") {
        this.error = "Please enter a password";
        return false;
      }

      this.login();
    },

    checkIfLoggedIn() {
      if (this.store.isAuthenticated) {
        this.$router.push("/");
      }
    }
  },
  mounted() {
    this.checkIfLoggedIn();
  }
};
</script>

<style></style>