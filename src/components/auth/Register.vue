<template>
  <div>
    <v-card class="px-4">
      <v-card-text>
        <v-form ref="registerForm" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="editedItem.nom"
                :rules="requiredRules"
                autocomplete="on"
                label="Nom de famille"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="editedItem.prenom"
                :rules="requiredRules"
                autocomplete="on"
                label="Prénom"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.email"
                autocomplete="on"
                :rules="emailRules"
                label="Adresse e-mail"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.requiredRules, rules.minRules]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Mot de passe"
                hint="Le mot de passe doit faire au minimum 6 caractères"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                block
                v-model="verify"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.requiredRules, passwordMatch]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Confirmer le mot de passe"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.carte_identite"
                autocomplete="on"
                :rules="requiredRules"
                label="Numéro de votre carte d'identité"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="editedItem.rue"
                autocomplete="on"
                :rules="requiredRules"
                label="Rue"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="editedItem.codePostal"
                autocomplete="on"
                :rules="emailRules"
                label="Code Postal"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.ville"
                autocomplete="on"
                :rules="requiredRules"
                label="Ville"
                required
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>

            <v-col class="d-flex ml-auto" cols="12">
              <v-btn
                x-large
                block
                :disabled="!valid"
                class="bg-primary text-white"
                @click="validate"
                >S'inscrire</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  computed: {
    passwordMatch() {
      return () =>
        this.editedItem.password === this.verify ||
        "Les mot de passes ne sont pas les mêmes";
    },
  },
  data() {
    return {
      dialog: true,
      valid: true,
      recaptchaVerified: false,
      pleaseTickRecaptchaMessage: "",
      editedItem: [],
      role: "",
      cssCardCreateur: "",
      cssCardBoomer: "",
      verify: "",
      requiredRules: [(v) => !!v || "Le champ est obligatoire"],
      numberRules: [
        (v) => !!v || "Le champ est obligatoire",
        (v) => !isNaN(v) || "Ce n'est pas un nombre",
      ],
      emailRules: [
        (v) => !!v || "Le champ doit être rempli",
        (v) => /.+@.+\..+/.test(v) || "L'adresse email est invalide",
      ],
      minRules: [
        (v) =>
          (v && v.length >= 6) ||
          "Le mot de passe doit faire au minimum 6 caractères",
      ],
      numberRulesNoObligatory: [(v) => !isNaN(v) || "Ce n'est pas un nombre"],
      rules: {
        requiredRules: (v) => !!v || "Le champ est obligatoire",
        minRules: (v) =>
          (v && v.length >= 6) ||
          "Le mot de passe doit faire au minimum 6 caractères",
      },
      show1: false,
    };
  },
  methods: {
    ...mapActions({
      register: "auth/register",
    }),
    checkAllInputsFill() {
      if (
        this.editedItem.nom != null &&
        this.editedItem.prenom != null &&
        this.editedItem.email != null &&
        this.editedItem.password != null &&
        this.editedItem.carte_identite != null &&
        this.editedItem.rue != null &&
        this.editedItem.ville != null &&
        this.editedItem.codePostal != null
      ) {
        return true;
      } else {
        return false;
      }
    },
    validate() {
      if (this.checkAllInputsFill()) {
        let formData = new FormData();

        formData.append("nom", this.editedItem.nom);
        formData.append("prenom", this.editedItem.prenom);
        formData.append("email", this.editedItem.email);
        formData.append("carte_identite", this.editedItem.carte_identite);
        formData.append("password", this.editedItem.password);
        formData.append("rue", this.editedItem.rue);
        formData.append("ville", this.editedItem.ville);
        formData.append("codePostal", this.editedItem.codePostal);
        
        this.register(formData).then((response) => {
          if (response) {
            this.$swal("Oups !!", response, "error");
          }
          this.$swal(
            "Votre compte a bien été créer !",
            "Merci pour votre inscription !",
            "success"
          ).then(() => {
            this.$router.push({ name: "Home" });
          });
        });
      } else {
        this.$swal(
          "Attention !",
          "Vous devez remplir et cocher tous les champs et cases pour vous enregistrer !",
          "warning"
        );
      }
    },
  },
};
</script>

<style scoped>
.card-clickable {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.card-clickable:hover {
  cursor: pointer;
}
</style>