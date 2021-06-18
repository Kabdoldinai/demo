<template>
  <v-app wrap>
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BlankLayout extends Vue {}
</script>

<style scoped>

</style>
