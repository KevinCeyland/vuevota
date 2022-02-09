<template>
  <div>
    <v-dialog
      v-model="dialog"
      persistent
      hide-overlay
      max-width="600px"
      min-width="360px"
    >
      <div>
        <v-tabs
          v-model="tab"
          show-arrows
          background-color="#dadada"
          icons-and-text
          grow
        >
          <v-tabs-slider color="darken-4"></v-tabs-slider>
          <v-tab v-for="i in tabs" :key="i.name">
            <v-icon large>{{ i.icon }}</v-icon>
            <div class="caption py-1">{{ i.name }}</div>
          </v-tab>
          <v-tab-item>
            <login></login>
          </v-tab-item>
          <v-tab-item>
            <register></register>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
export default {
  components: { Register, Login },
  methods: {},
  mounted() {
    this.dialog = true;
  },
  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [
      { name: "Connexion", icon: "mdi-account" },
      { name: "Inscription", icon: "mdi-account-outline" },
    ],
  }),
};
</script>

<style scoped>

</style>