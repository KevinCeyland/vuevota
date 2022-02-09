<template>
  <v-app>
    <navbar></navbar>
    <v-main>
      <router-view/>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Navbar from "@/components/Pages/Navbar.vue";
import Footer from "@/components/Pages/Footer.vue";

export default {
  name: "App",

  components: {
    Navbar,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>
