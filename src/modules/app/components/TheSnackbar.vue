<template>
  <v-snackbar
    v-model="snackbar"
    :color="color"
    top
    right
    :timeout="2000"
  >
    {{ text }}
  </v-snackbar>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class TheSnackbar extends Vue {
  get snackbar() {
    return this.$store.state.app.snackbar.shown;
  }

  set snackbar(position) {
    this.$store.commit('app/setSnackbarStatus', position);
  }

  get text() {
    return this.$store.state.app.snackbar.text;
  }

  get color() {
    return this.$store.state.app.snackbar.color;
  }
}
</script>

<style scoped></style>
