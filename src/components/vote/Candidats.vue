<template>
  <div>
    <v-list dense>
      <h1 class="text-center">Candidats</h1>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="candidat in candidats"
          @click="selectedCandidat(candidat)"
          class="border"
          :key="candidat.id"
        >
          <v-list-item-avatar>
            <v-img :src="candidat.photo"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title
              ><h2 class="text-break">
                {{ candidat.prenom + " " + candidat.nom }}
              </h2></v-list-item-title
            >
            <v-list-item-subtitle
              class="text-break"
              v-text="candidat.programme"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-btn
      class="float-end m-5 text-white"
      @click="voteForCandidat()"
      color="#000091"
      :disabled="selectCandidat.length == 0"
      >Je vote</v-btn
    >
    <v-dialog v-model="dialogConfirmVote" persistent max-width="500">
      <v-card>
        <v-toolbar class="lead">Que voulez-vous faire ?</v-toolbar>
        <v-card-text>
          <div class="text-dark text-break mt-3">
            <h3>
              Voulez-vous vraiment voter pour
              <strong
                >{{ selectCandidat.prenom }} {{ selectCandidat.nom }}</strong
              >
              ?
            </h3>
          </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-content-center">
          <v-btn
            class="text-dark bg-light"
            style="margin-right: 10px !important"
            @click="dialogConfirmVote = false"
            >NON</v-btn
          >
          <v-btn class="text-white" color="#000091" @click="confirmVote()"
            >OUI</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      candidats: [],
      selectCandidat: [],
      dialogConfirmVote: false,
    };
  },
  props: ["idElection"],
  mounted() {
    this.$store.dispatch("candidat/setCandidats", this.idElection).then(() => {
      var refreshIntervalId = setInterval(() => {
        if (this.$store.getters["candidat/dataLoadCandidat"]) {
          this.candidats = this.$store.getters["candidat/getCandidats"];
          clearInterval(refreshIntervalId);
        }
      }, 500);
    });
  },
  methods: {
    selectedCandidat(candidat) {
      this.selectCandidat = candidat;
    },
    voteForCandidat() {
      this.dialogConfirmVote = true;
    },
    confirmVote() {
      var arrayPayload = {
        idElection: this.idElection,
        idCandidat: this.selectCandidat.id,
      };
      this.$axios
        .post("vote/voteCandidatElection", arrayPayload)
        .then((response) => {
          if (response.data.messageError) {
            this.$swal(
              "Une erreur est survenue !",
              response.data.messageError,
              "error"
            );
            this.dialogConfirmVote = false;
            return;
          }
          if (response.data.messageVoteDouble) {
            this.$swal(
              "Impossible de voter deux fois !",
              response.data.messageVoteDouble,
              "error"
            );
            this.dialogConfirmVote = false;
            return;
          }
          this.$swal("A voter !", response.data.message, "success").then(() => {
            this.$router.push({ name: "Home" });
          });
          this.dialogConfirmVote = false;
        });
    },
  },
};
</script>

<style scoped>
.bg-p {
  background-color: #000091;
}
</style>