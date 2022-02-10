<template>
  <div>
    <v-container fluid>
      <h1 class="text-center pb-5 pt-3">Je choisis l'éléction</h1>
      <v-row dense>
        <v-col v-for="election in elections" :key="election.id" :cols="6">
          <v-card>
            <v-card-title
              class="text-break"
              style="font-size: 25px"
              v-text="election.libelle"
            ></v-card-title>
            <v-card-actions>
              <v-container>
                <v-row dense>
                  <v-btn
                    color="#000091"
                    class="text-white mb-3"
                    block
                    @click="goToCandidat(election)"
                    >Voter</v-btn
                  >
                  <v-btn block  class="text-dark" @click="goToResultat(election)"
                    >Voir les <br> résultats</v-btn
                  >
                </v-row>
              </v-container>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      elections: [],
    };
  },
  mounted() {
    if (this.$store.getters["elections/getElections"].length == 0) {
      this.$store.dispatch("elections/setElections").then(() => {
        var refreshIntervalId = setInterval(() => {
          if (this.$store.getters["elections/dataLoad"]) {
            this.elections = this.$store.getters["elections/getElections"];
            clearInterval(refreshIntervalId);
          }
        }, 500);
      });
    } else {
      var refreshIntervalId2 = setInterval(() => {
        if (this.$store.getters["elections/dataLoad"]) {
          this.elections = this.$store.getters["elections/getElections"];
          clearInterval(refreshIntervalId2);
        }
      }, 500);
    }
  },
  methods: {
    goToCandidat(election) {
      this.$router.push({
        name: "Candidats",
        params: { idElection: election.id },
      });
    },
    goToResultat(election) {
      this.$router.push({
        name: "Resultats",
        params: { idElection: election.id },
      });
    },
  },
};
</script>

<style>
</style>