<template>
<V-layout column class="align-center">
    <h1> Страница не найдена</h1>
    <h2> Error 404 </h2>
    <router-link to='/'> Главная страница </router-link>
  </v-layout>
</template>

<script lang = 'ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NotFound extends Vue {}
</script>

<style scoped></style>
