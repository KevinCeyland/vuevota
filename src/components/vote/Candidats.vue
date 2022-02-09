<template>
  <div>
    <v-list dense>
      <h1 class="text-center">Candidats</h1>
      <v-list-item-group v-model="selectCandidat" color="primary">
        <v-list-item v-for="candidat in candidats" class="border" :key="candidat.id">
          <v-list-item-avatar>
            <v-img :src="candidat.photo"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title><h2 class="text-break">{{candidat.prenom + ' ' + candidat.nom}}</h2></v-list-item-title>
            <v-list-item-subtitle class="text-break" v-text="candidat.programme"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      candidats: [],
      selectCandidat: null,
    };
  },
  props: ['idElection'],
  mounted() {
    if (this.$store.getters["candidat/getCandidats"].length == 0) {
      this.$store.dispatch("candidat/setCandidats", this.idElection).then(() => {
        var refreshIntervalId = setInterval(() => {
          if (this.$store.getters["candidat/dataLoad"]) {
            this.candidats = this.$store.getters["candidat/getCandidats"];
            clearInterval(refreshIntervalId);
          }
        }, 500);
      });
    } else {
      var refreshIntervalId2 = setInterval(() => {
        if (this.$store.getters["candidat/dataLoad"]) {
          this.candidats = this.$store.getters["candidat/getCandidats"];
          clearInterval(refreshIntervalId2);
        }
      }, 500);
    }
  },
};
</script>

<style>
</style>