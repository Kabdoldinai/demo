<template>
  <v-overlay
    v-model="loader"
    z-index=10
    opacity="0.4"
  >
    <v-progress-circular
      :size="50"
      :width="7"
      color="white"
      indeterminate
    ></v-progress-circular>
  </v-overlay>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class TheLoader extends Vue {
  get loader() {
    return this.$store.state.loader;
  }

  set loader(payload) {
    this.$store.commit('loader', payload);
  }
}
</script>

<style scoped></style>
