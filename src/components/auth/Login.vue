<template>
  <v-card class="elevation-12">
    <v-card-text>
      <v-form v-model="valid">
        <v-text-field
          prepend-icon="mdi-account"
          name="login"
          autocomplete="on"
          v-model="form.email"
          label="Adresse e-mail"
          type="text"
          :rules="emailRules"
          :error-messages="msgError"
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-lock"
          v-model="form.password"
          autocomplete="on"
          name="password"
          :rules="requiredRules"
          label="Mot de passe"
          type="password"
          :error-messages="msgError"
        ></v-text-field>
      </v-form>

      <v-checkbox
        v-model="rememberMe"
        label="Se souvenir de moi ?"
      ></v-checkbox>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="bg-primary text-white" block @click="submit()"
        >Connexion</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      emailRules: [
        (v) => !!v || "Le champ doit être remplis",
        (v) => /.+@.+\..+/.test(v) || "L'adresse email est invalide",
      ],
      requiredRules: [(v) => !!v || "Le champ est obligatoire"],
      error: false,
      msgError: "",
      validation: "",
      valid: true,
      rememberMe: false,
    };
  },
  mounted() {
    this.form.email = localStorage.getItem("emailVota");
    this.rememberMe = localStorage.getItem("rememberMeVota");
  },
  computed: {
    email() {
      return this.form.email;
    },
    password() {
      return this.form.password;
    },
  },
  watch: {
    rememberMe(val) {
      if (val) {
        localStorage.setItem("emailVota", this.form.email);
        localStorage.setItem("rememberMeVota", this.rememberMe);
      } else {
        localStorage.removeItem("emailVota", this.form.email);
        localStorage.removeItem("rememberMeVota", this.rememberMe);
      }
    },
  },
  methods: {
    ...mapActions({
      login: "auth/login",
    }),
    submit() {
      this.login(this.form).then((response) => {
        if (response) {
          if (response.data.messageError) {
            this.$swal("Oups !", response.data.messageError, "error").then(
              () => {
                this.error = true;
                this.msgError = response.data.messageError;
                this.validation = "is-invalid";
              }
            );
          } else if (response.data.code == 498) {
            this.error = true;
            this.msgError = response.data.messageError;
            this.validation = "is-invalid";
          }
          this.$router.push({ name: "Home" });
        }
        this.$router.push({ name: "Home" });
      });
    },
  },
};
</script>
