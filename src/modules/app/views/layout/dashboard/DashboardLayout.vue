<template>
<v-app wrap >
  <dashboard-layout-drawer></dashboard-layout-drawer>
  <dashboard-layout-toolbar ></dashboard-layout-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <the-loader></the-loader>
    <the-snackbar></the-snackbar>
  </v-app>
</template>

<script lang='ts'>
import {Component, Vue} from 'vue-property-decorator';
import DashboardLayoutDrawer from './DashboardLayoutDrawer.vue';
import DashboardLayoutToolbar from './DashboardLayoutToolbar.vue';
import TheSnackbar from '@/modules/app/components/TheSnackbar.vue';
import TheLoader from '@/modules/app/components/TheLoader.vue';

@Component({
  components: {
    DashboardLayoutDrawer,
    DashboardLayoutToolbar,
    TheSnackbar,
    TheLoader,
  },
})
export default class DashboardLayout extends Vue {}
</script>

<style scoped ></style>
