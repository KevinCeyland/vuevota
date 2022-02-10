<template>
  <div>
    <div v-if="dataCharts.length == 0">
      <h1 class="text-center m-5">Ce vote n'a pas encore de vote en cours</h1>
    </div>
    <div v-else>
      <highcharts
        :options="optionsCharts"
        ref="highcharts"
        id="highchartsComponent"
        constructorType="chart"
      ></highcharts>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Highcharts from "highcharts";
import { Chart } from "highcharts-vue";
export default {
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      dataCharts: [],
      optionsCharts: {
        chart: {
          type: "column",
        },
        title: {
          text: "Résultat des votes",
        },
        xAxis: {
          type: "datetime",
        },
        yAxis: {
          title: {
            text: "Nombre de vote",
          },
        },
        legend: {
          enabled: true,
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: "{point.y:.1f}%",
            },
          },
        },
        series: [],
      },
    };
  },
  props: ["idElection"],
  beforeMount() {
    this.$store.dispatch("resultats/setResultats", this.idElection);
    var refreshIntervalId = setInterval(() => {
      if (this.$store.getters["resultats/dataLoad"]) {
        this.dataCharts = this.$store.getters["resultats/getResultats"];
        this.initCharts();
        clearInterval(refreshIntervalId);
      }
    }, 1000);
  },
  methods: {
    initCharts() {
      console.log(this.dataCharts);
      this.optionsCharts.series = this.dataCharts;
    },
  },
};
</script>

<style>
</style>