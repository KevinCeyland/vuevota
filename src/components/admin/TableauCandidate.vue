<template>
  <div>
    <h2>Gestion des candidats</h2>
    <v-data-table
      :headers="headers"
      :items="candidats"
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
                        <img
                          width="180"
                          style="cursor: pointer"
                          height="150"
                          @click="triggerInputFile()"
                          :src="inputFileSelect"
                        />
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
                        v-model="editedItem.nom"
                        label="Nom"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
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
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.date_naissance"
                            label="Date de naissance"
                            prepend-icon="mdi-calendar"
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
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.partie_politique"
                        label="Partie politique"
                      ></v-text-field>
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
    candidats: [],
    menu: false,
    editedIndex: -1,
    editedItem: {
      photo: "",
      nom: "",
      prenom: "",
      programme: "",
      date_naissance: "",
      partie_politique: "",
    },
    defaultItem: {
      photo: "",
      nom: "",
      prenom: "",
      programme: "",
      date_naissance: "",
      partie_politique: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nouveau candidat"
        : "Editer le candidat";
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
    if (this.$store.getters["candidat/getCandidatsAll"].length == 0) {
      this.$store.dispatch("candidat/setAllCandidats").then(() => {
        var refreshIntervalId = setInterval(() => {
          if (this.$store.getters["candidat/dataLoadCandidatAll"]) {
            this.candidats = this.$store.getters["candidat/getCandidatsAll"];
            clearInterval(refreshIntervalId);
          }
        }, 500);
      });
    } else {
      var refreshIntervalId2 = setInterval(() => {
        if (this.$store.getters["candidat/dataLoadCandidatAll"]) {
          this.candidats = this.$store.getters["candidat/getCandidatsAll"];
          clearInterval(refreshIntervalId2);
        }
      }, 500);
    }
  },

  methods: {
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
      this.candidats.splice(this.editedIndex, 1);
      this.closeDelete();
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
        Object.assign(this.candidats[this.editedIndex], this.editedItem);
      } else {
        this.candidats.push(this.editedItem);
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
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.inputFileSelect = reader.result;
      };
    },
  },
};
</script>