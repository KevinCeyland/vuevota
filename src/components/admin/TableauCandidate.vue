<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="candidats"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:item.photo="{ item }">
        <v-img width="50" :src="item.photo"></v-img>
      </template>
      <template v-slot:item.programme="{ item }">
        {{ strMimified(item.programme) }}
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
                Créer un nouveau candidat
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
                      <h4 class="text-center">Photo du candidat</h4>
                      <div class="d-flex justify-content-center">
                        <v-img
                          width="180"
                          style="cursor: pointer"
                          @click="triggerInputFile()"
                          :src="inputFileSelect"
                        ></v-img>
                        <input
                          type="file"
                          id="couverture-tuto"
                          ref="input1"
                          style="display: none; cursor: pointer"
                          accept="file_extension|image/*|media_type"
                          @change="changePreview($event)"
                        />
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        prepend-inner-icon="mdi-account"
                        solo
                        :rules="requiredRules"
                        v-model="editedItem.nom"
                        label="Nom"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        prepend-inner-icon="mdi-account"
                        solo
                        :rules="requiredRules"
                        v-model="editedItem.prenom"
                        label="Prénom"
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
                        width="350"
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.date_naissance"
                            label="Date de naissance"
                            :rules="requiredRules"
                            prepend-inner-icon="mdi-calendar"
                            solo
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.date_naissance"
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
                              $refs.menu.save(editedItem.date_naissance),
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
                    <v-col cols="12">
                      <v-textarea
                        v-model="editedItem.programme"
                        label="Programme"
                        prepend-inner-icon="mdi-clipboard-text"
                        solo
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        item-text="libelle"
                        prepend-inner-icon="mdi-chevron-triple-up"
                        solo
                        item-value="id"
                        :rules="requiredRules"
                        v-model="editedItem.partie_politique_id"
                        :items="partie_politique"
                        label="Partie politique"
                      ></v-select>
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
                  <h3>Êtes vous sûr de vouloir supprimer ce candidat ?</h3>
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
    inputFileSelect: require("/src/assets/placeholder.jpg"),
    headers: [
      { text: "Photo", value: "photo" },
      { text: "Nom", value: "nom" },
      { text: "Prenom", value: "prenom" },
      { text: "Date Naissance", value: "date_naissance" },
      { text: "Programme", value: "programme" },
      { text: "Partie Politique", value: "partie_politique" },
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
      photo: "",
      nom: "",
      prenom: "",
      changePhoto: "",
      programme: "",
      date_naissance: "",
      partie_politique: "",
    },
    defaultItem: {
      photo: "",
      changePhoto: "",
      nom: "",
      prenom: "",
      programme: "",
      date_naissance: "",
      partie_politique: "",
    },
    partie_politique: [],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nouveau candidat"
        : "Editer le candidat";
    },
    candidats() {
      return this.$store.getters["candidat/getCandidatsAll"];
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
    this.initTable();
  },

  methods: {
    initTable() {
      if (this.$store.getters["candidat/getCandidatsAll"].length == 0) {
        this.$store.dispatch("candidat/setAllCandidats").then(() => {
          var refreshIntervalId = setInterval(() => {
            if (this.$store.getters["candidat/dataLoadCandidatAll"]) {
              this.partie_politique =
                this.$store.getters["candidat/getPartiePolitiques"];
              clearInterval(refreshIntervalId);
            }
          }, 500);
        });
      } else {
        var refreshIntervalId2 = setInterval(() => {
          if (this.$store.getters["candidat/dataLoadCandidatAll"]) {
            this.partie_politique =
              this.$store.getters["candidat/getPartiePolitiques"];
            clearInterval(refreshIntervalId2);
          }
        }, 500);
      }
    },
    editItem(item) {
      this.editedIndex = this.candidats.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.inputFileSelect = this.editedItem.photo;
    },

    deleteItem(item) {
      this.editedIndex = this.candidats.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store
        .dispatch("candidat/removeCandidat", this.editedItem.id)
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
        this.inputFileSelect = require("/src/assets/placeholder.jpg");
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
      let formData = new FormData();

      formData.append("nom", this.editedItem.nom);
      formData.append("prenom", this.editedItem.prenom);
      formData.append("date_naissance", this.editedItem.date_naissance);
      formData.append("programme", this.editedItem.programme);
      formData.append("photo", this.editedItem.photo);
      formData.append(
        "partie_politique_id",
        this.editedItem.partie_politique_id
      );
      formData.append("changePhoto", this.editedItem.changePhoto);

      if (this.editedIndex > -1) {
        var payloadUpdate = {
          id: this.editedItem.id,
          nom: this.editedItem.nom,
          prenom: this.editedItem.prenom,
          date_naissance: this.editedItem.date_naissance,
          programme: this.editedItem.programme,
          photo: this.editedItem.photo,
          partie_politique_id: this.editedItem.partie_politique_id,
          changePhoto: this.editedItem.changePhoto,
        };
        console.log(payloadUpdate);
        this.$store
          .dispatch("candidat/editCandidat", payloadUpdate)
          .then((response) => {
            this.$swal("Bravo !", response.data.message, "success");
          });
      } else {
        this.$store
          .dispatch("candidat/addCandidat", formData)
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
    strMimified(value) {
      if (value.length > 30) {
        return value.substring(0, 30) + "..";
      } else {
        return value;
      }
    },
  },
};
</script>