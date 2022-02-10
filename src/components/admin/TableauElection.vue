<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="elections"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:item.photo="{ item }">
        <v-img width="50" :src="item.photo"></v-img>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="#000091"
                class="mb-2 text-white"
                v-bind="attrs"
                v-on="on"
              >
                Créer une nouvelle election
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.libelle"
                        :rules="requiredRules"
                        label="Nom"
                        solo
                        prepend-inner-icon="mdi-format-title"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-dialog
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="editedItem.date_naissance"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.dateElection"
                            label="Date de l'éléction"
                            prepend-inner-icon="mdi-calendar"
                            solo
                            :rules="requiredRules"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.dateElection"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false">
                            Retour
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="
                              $refs.menu.save(editedItem.dateElection),
                                (changeDate = Math.floor(
                                  Math.random() * 10424240
                                ))
                            "
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="close"> Retour </v-btn>
                <v-btn class="text-white" color="#000091" @click="save">
                  Enregistrer
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" persistent max-width="290">
            <v-card>
              <v-toolbar class="lead">Que voulez-vous faire ?</v-toolbar>
              <v-card-text>
                <div class="text-dark text-center mt-3">
                  <h3>Êtes vous sûr de vouloir supprimer ce election ?</h3>
                </div>
              </v-card-text>
              <v-card-actions class="d-flex justify-content-center">
                <v-btn
                  class="text-dark bg-light"
                  style="margin-right: 10px !important"
                  @click="closeDelete"
                  >NON</v-btn
                >
                <v-btn
                  class="text-white"
                  color="#000091"
                  @click="deleteItemConfirm()"
                  >OUI</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-2 text-primary" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon class="mr-2 text-danger" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Libelle", value: "libelle" },
      { text: "Date de l'éléction", value: "dateElection" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    requiredRules: [(v) => !!v || "Le champ est obligatoire"],
    numberRules: [
      (v) => !!v || "Le champ est obligatoire",
      (v) => !isNaN(v) || "Ce n'est pas un nombre",
    ],
    numberRulesWithoutRequired: [(v) => !isNaN(v) || "Ce n'est pas un nombre"],
    menu: false,
    editedIndex: -1,
    editedItem: {
      libelle: "",
      dateElection: "",
    },
    defaultItem: {
      libelle: "",
      dateElection: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nouvelle éléction"
        : "Editer l'éléction";
    },
    elections() {
      return this.$store.getters["elections/getElections"];
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  mounted() {
    if (this.$store.getters["elections/getElections"].length == 0) {
      this.$store.dispatch("elections/setElections");
    }
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.elections.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.elections.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store
        .dispatch("elections/removeElection", this.editedItem.id)
        .then((response) => {
          this.$swal("Bravo !", response.data.message, "success");
          this.closeDelete();
        });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        this.$store
          .dispatch("elections/editElection", this.editedItem)
          .then((response) => {
            this.$swal("Bravo !", response.data.message, "success");
          });
      } else {
        this.$store
          .dispatch("elections/addElection", this.editedItem)
          .then((response) => {
            this.$swal("Bravo !", response.data.message, "success");
          });
      }
      this.close();
    },

    triggerInputFile() {
      this.$refs.input1.click();
    },
    changePreview(event) {
      var reader = new FileReader();
      var image = event.target.files[0];
      this.editedItem.photo = event.target.files[0];
      this.editedItem.changePhoto = true;
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.inputFileSelect = reader.result;
      };
    },
  },
};
</script>