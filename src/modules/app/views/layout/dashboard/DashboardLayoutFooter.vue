<template>
  <v-footer
    :inset="true"
    app
  >
    <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
  </v-footer>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component({})
  export default class DashboardLayoutFooter extends Vue {
  }
</script>

<style scoped></style>
