<template>
  <div>
    <div class="pb-5">
      <div class="container">
        <v-alert class="mt-5" dark>
          <h1>
            <v-icon style="font-size: 60px">mdi-monitor-dashboard</v-icon>
            Tableau de bord
          </h1>
        </v-alert>
        <v-row class="p-2">
          <v-col class="d-flex justify-content-center">
            <v-card class="text-center border border-dark" color="#11ba2d">
              <v-footer padless>
                <v-card class="flex" flat tile color="#11ba68">
                  <v-card-title class="teal">
                    <v-icon class="text-white" style="font-size: 60px"
                      >mdi-table</v-icon
                    >
                    <strong class="subheading text-white"
                      >Gestion des candidats</strong
                    >
                  </v-card-title>
                </v-card>
              </v-footer>
              <v-card-text>
                <v-sheet color="rgba(0, 0, 0, .12)">
                  <TableauCandidate></TableauCandidate>
                </v-sheet>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="d-flex justify-content-center">
            <div>
              <v-card
                class="text-center border border-dark"
                color="#1190ba"
              >
                <v-footer padless>
                  <v-card class="flex p-1" flat tile color="#11acba">
                    <v-card-title class="teal">
                      <v-icon class="text-white mr-5" style="font-size: 60px"
                        >mdi-table</v-icon
                      >

                      <strong class="subheading text-white"
                        >Gestion des éléctions</strong
                      >
                    </v-card-title>
                  </v-card>
                </v-footer>
                <v-card-text>
                  <v-sheet color="rgba(0, 0, 0, .12)">
                    <TableauElection></TableauElection>
                  </v-sheet>
                </v-card-text>
              </v-card>
              <div class="mt-3">
                <v-card
                  class="text-center border border-dark"
                  color="#5211ba"
                  dark
                >
                  <v-footer padless>
                    <v-card class="flex p-1" flat tile color="#6b3a99">
                      <v-card-title class="teal">
                        <v-icon class="text-white mr-5" style="font-size: 60px"
                          >mdi-table</v-icon
                        >

                        <strong class="subheading text-white"
                          >Attributions d'une elections à un candidat</strong
                        >
                      </v-card-title>
                    </v-card>
                  </v-footer>
                  <v-card-text>
                    <v-sheet color="rgba(0, 0, 0, .12)">
                      <Charts></Charts>
                    </v-sheet>
                  </v-card-text>

                  <v-card-text>
                    <div class="text-h4 text-white fw-bold">
                    
                    </div>
                  </v-card-text>
                </v-card>
              </div>
            </div>
          </v-col>
          <v-col cols="6"> </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import TableauCandidate from "@/components/admin/TableauCandidate.vue";
import TableauElection from "@/components/admin/TableauElection.vue";
export default {
  components: { TableauCandidate, TableauElection },
};
</script>

<style>
</style>