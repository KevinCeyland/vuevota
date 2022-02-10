<template>
  <div>
      <h1 class="text-center p-5">Panel Administrateur</h1>
      <TableauCandidate></TableauCandidate>
      <TableauElection></TableauElection>
  </div>
</template>

<script>
import TableauCandidate from "@/components/admin/TableauCandidate.vue";
import TableauElection from '@/components/admin/TableauElection.vue'
export default {
    components: { TableauCandidate, TableauElection }
}
</script>

<style>

</style>