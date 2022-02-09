<template>
  <div>
      <h1 class="text-center p-5">Panel Administrateur</h1>
      <TableauCandidate></TableauCandidate>
  </div>
</template>

<script>
import TableauCandidate from "@/components/admin/TableauCandidate.vue";
export default {
    components: { TableauCandidate }
}
</script>

<style>

</style>