<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="users"
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
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.nom"
                        :rules="requiredRules"
                        label="Nom"
                        solo
                        prepend-inner-icon="mdi-account"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.prenom"
                        :rules="requiredRules"
                        label="Prénom"
                        solo
                        prepend-inner-icon="mdi-account"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.email"
                        :rules="emailRules"
                         label="Email"
                        solo
                        prepend-inner-icon="mdi-at"
                      ></v-text-field>
                    </v-col>
                     <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.carte_identite"
                        :rules="requiredRules"
                        label="Carte d'identité"
                        solo
                        prepend-inner-icon="mdi-card-account-details"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.rue"
                        :rules="requiredRules"
                        label="Rue"
                        solo
                        prepend-inner-icon="mdi-map-marker"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.ville"
                        :rules="requiredRules"
                        label="Ville"
                        solo
                        prepend-inner-icon="mdi-map-marker"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.codePostal"
                        :rules="requiredRules"
                        label="Code postal"
                        solo
                        prepend-inner-icon="mdi-map-marker"
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
                  <h3>
                    Êtes vous sûr de vouloir supprimer cette utilisateur ?
                  </h3>
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
        <v-btn color="primary"> Réinitialiser </v-btn>
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
      { text: "Nom", value: "nom" },
      { text: "Prénom", value: "prenom" },
      { text: "Email", value: "email" },
      { text: "Carte d'identité", value: "carte_identite" },
      { text: "Role", value: "role" },
      { text: "Rue", value: "rue" },
      { text: "Ville", value: "ville" },
      { text: "Code Postal", value: "codePostal" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    requiredRules: [(v) => !!v || "Le champ est obligatoire"],
    numberRules: [
      (v) => !!v || "Le champ est obligatoire",
      (v) => !isNaN(v) || "Ce n'est pas un nombre",
    ],
    emailRules: [
      (v) => !!v || "Le champ doit être rempli",
      (v) => /.+@.+\..+/.test(v) || "L'adresse email est invalide",
    ],
    numberRulesWithoutRequired: [(v) => !isNaN(v) || "Ce n'est pas un nombre"],
    menu: false,
    editedIndex: -1,
    editedItem: {
      nom: "",
      prenom: "",
      carte_identite: "",
      role: "",
      rue: "",
      ville: "",
      codePostal: "",
    },
    defaultItem: {
      nom: "",
      prenom: "",
      carte_identite: "",
      role: "",
      rue: "",
      ville: "",
      codePostal: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nouvelle utilisateur"
        : "Editer l'utilisateur";
    },
    users() {
      return this.$store.getters["users/getUsers"];
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
    if (this.$store.getters["users/getUsers"].length == 0) {
      this.$store.dispatch("users/setUsers");
    }
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store
        .dispatch("users/removeUser", this.editedItem.id)
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
          .dispatch("users/editUser", this.editedItem)
          .then((response) => {
            this.$swal("Bravo !", response.data.message, "success");
          });
      } else {
        this.$store
          .dispatch("users/addUser", this.editedItem)
          .then((response) => {
            this.$swal("Bravo !", response.data.message, "success");
          });
      }
      this.close();
    },
  },
};
</script>