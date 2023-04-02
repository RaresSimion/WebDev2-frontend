<template>
  <section>
    
    <div class="container">
      <div class="row">
        <div v v-if="error" class="alert alert-danger" role="alert">
          {{ this.error }}
        </div>
        <div class="col-md-6">
          <form>
            <div class="mb-3">
              <label for="inputEmail" class="form-label">Email</label>
              <input id="inputEmail" v-model="email" type="email" class="form-control" />
            </div>
            <div class="mb-3">
              <label for="inputPassword" class="form-label">Password</label>
              <input type="password" v-model="password" class="form-control" id="inputPassword" />
            </div>
            <button type='button' @click="login" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </section>
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
    login()
    {
      this.store.login(this.email, this.password).then(() => {
        this.$router.push("/");
      }).catch((error) => {
        this.error = error;
      });
    }
  }
};
</script>

<style>

</style>