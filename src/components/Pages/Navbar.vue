<template>
  <div data-app>
    <v-app-bar color="deep-purple accent-4" dark prominent>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        {{ this.currentRouteName }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="navigate('Connexion')" color="#7B0D1E" fab>
        <v-icon>mdi-power</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary app>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title @click="navigate('Accueil')"
              >Accueil
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="navigate('Inscription')"
              >Inscription
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="navigate('EnSavoirPlus')">
              En savoir plus ...
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
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
    navigate(to) {
      if (to == this.currentRouteName) {
        this.drawer = false;
      } else {
        this.$router.push({ name: to });
      }
    },
  },
};
</script>

<style>
</style>