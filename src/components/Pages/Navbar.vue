<template>
  <div v-resize="onResize">
    <v-toolbar height="100px">
      <span class="hidden-sm-and-up">
        <v-app-bar-nav-icon
          v-if="showMobileNav"
          dark
          @click="drawer = true"
        ></v-app-bar-nav-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <div><v-img width="100" src="/img/marianne.png"></v-img></div>
        </router-link>
      </v-toolbar-title>
      <router-link to="/" tag="span" style="cursor: pointer">
        <h1 style="font-family: Spectral">Vota</h1>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!showMobileNav" class="hidden-xs-only">
        <template v-for="item in menuItems">
          <v-btn
            text
            v-if="item.auth == isAuth"
            :key="item.title"
            :to="item.path"
          >
            <v-icon left>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </template>
        <v-btn text v-if="isAuth" @click="openModalConfirmSignout()">
          <v-icon left>mdi-logout</v-icon>
          Deconnexion
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      v-if="showMobileNav"
      absolute
      temporary
    >
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            :to="item.path"
          >
            <v-list-item-icon>
              <v-icon left>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title> {{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
     <v-dialog v-model="dialogSignout" persistent max-width="290">
      <v-card>
        <v-toolbar class="lead">Que voulez-vous faire ?</v-toolbar>
        <v-card-text>
          <div class="text-dark text-center mt-3">
            <h3>Se déconecter de votre compte ?</h3>
          </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-content-center">
          <v-btn
            class="text-dark bg-light"
            style="margin-right: 10px !important"
            @click="dialogSignout = false"
            >NON</v-btn
          >
          <v-btn class="text-white bg-primary" @click="confirmSignout()"
            >OUI</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data: () => ({
    drawer: false,
    group: null,
    isAuth: false,
    dialogSignout: false,
    user: [],
    showMobileNav: false,
    menuItems: [
      {
        title: "Voter en ligne",
        path: "/je-vote-en-ligne",
        icon: "mdi-vote",
        auth: true,
      },
      {
        title: "Inscription/Connexion",
        path: "/authentification",
        icon: "mdi-account-circle",
        auth: false,
      },
      {
        title: "Profil",
        path: "/profil",
        icon: "mdi-account-circle",
        auth: true,
      },
    ],
    windowSize: {
      x: 0,
      y: 0,
    },
  }),
  mounted() {
    var refreshIntervalId = setInterval(() => {
      if (this.$store.getters["auth/dataLoad"]) {
        this.user = this.$store.getters["auth/user"];
        this.isAuth = this.$store.getters["auth/authenticated"];
        clearInterval(refreshIntervalId);
      }
    }, 500);
  },
  // Watch te permet de regarder les changements sur ta variable group ci-dessous, si la valeur de la variable
  // group change peu importe la valeur, la variable drawer va passer a false,
  // En gros le watch permet d'éffectuer des actions sur des éléments en regardant si une variable change de valeur ou est modifié ou autre.
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    // computed te permet de créer une variable met avec des données
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  // Methods permet de ranger toutes tes méthodes (fonctions) que tu vas créer et utilisé dans ton component.
  methods: {
    onResize() {
      if (window.innerWidth < 800) {
        this.showMobileNav = true;
      } else {
        this.showMobileNav = false;
      }
    },
    navigate(to) {
      if (to == this.currentRouteName) {
        this.drawer = false;
      } else {
        this.$router.push({ name: to });
      }
    },
    openModalConfirmSignout() {
      this.dialogSignout = true;
    },
    confirmSignout() {
      this.$store.dispatch("auth/logout");
      this.dialogSignout = false;
      this.$router.push({ name: "Authentification" });
    },
  },
};
</script>

<style>
</style>