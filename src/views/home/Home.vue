<template>
  <div>
    <v-container>
      <div class="d-flex justify-content-center p-5">
        <vue-typed-js
          :loop="true"
          :typeSpeed="50"
          :strings="[
            'Vous voulez voter en ligne ?',
            'Pour une éléctions présidentiel ?',
            'Pour une éléction départemental ?',
            'Pour une éléction régionnal ?',
            'Pour une éléction communale ?',
          ]"
        >
          <h1 class="typing"></h1>
        </vue-typed-js>
      </div>

      <hr class="featurette-divider" />

      <div class="row featurette">
        <div class="col-md-7">
          <h2 class="featurette-heading">
            Toutes les elections disponible aux votes en ligne !
          </h2>
          <p class="lead">
            Vous pouvez choisir n'importe quel elections aux quel votre carte
            electorale est compatible !
          </p>
        </div>
        <div class="col-md-5">
          <v-img width="400" height="350" src="/img/vote-online.png"></v-img>
        </div>
      </div>

      <hr class="featurette-divider" />

      <div class="row featurette">
        <div class="col-md-7 order-md-2">
          <h2 class="featurette-heading">
            De façon simple et sécurisé ! <br />
            <span class="text-muted">En quelques clics !</span>
          </h2>
          <p class="lead">
            Choisissez l'éléction à laquel vous voulez voté, puis choisissez
            parmis les candidats qui se présente.
          </p>
        </div>
        <div class="col-md-5 order-md-1">
          <v-img width="400" height="350" src="/img/vote-clic.jpg"></v-img>
        </div>
      </div>

      <hr class="featurette-divider" />

      <div class="row featurette">
        <div class="col-md-7">
          <h2 class="featurette-heading">Sur tous vos appareils !</h2>
          <p class="lead">
            Vous pouvez voter aussi bien depuis votre téléphone, tablette et
            ordinateur !
          </p>
        </div>
        <div class="col-md-5">
          <v-img
            width="400"
            height="350"
            src="/img/vote-responsive.jpg"
          ></v-img>
        </div>
      </div>
    </v-container>

    <!-- /END THE FEATURETTES -->
  </div>
</template>

<script>
import { VueTypedJs } from "vue-typed-js";
export default {
  components: {
    VueTypedJs,
  },
  data() {
    return {
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    };
  },
};
</script>

<style>
</style>