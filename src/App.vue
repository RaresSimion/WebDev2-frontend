<template>
  <Navigation />
  <router-view />
  <Footer />
</template>

<script>
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';
import { useUserSessionStore } from './stores/usersession';
export default {
  setup() {
    return {
      store: useUserSessionStore()
    }
  },
  mounted() {
    this.store.localLogin();
  },
  name: "App",
  components: {
    Navigation, Footer
  }
};
</script>

<style>
</style>
