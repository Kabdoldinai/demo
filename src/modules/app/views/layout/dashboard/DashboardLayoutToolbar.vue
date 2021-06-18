<template>
  <v-app-bar
    app
    :clipped-left="drawer.clipped"
    height="56px"
  >
    <v-app-bar-nav-icon
      v-if="drawer.type !== 'permanent'"
      @click.stop="toggleDrawer"
    />
    <v-toolbar-title>{{ currentRouteName }}</v-toolbar-title>
    <v-spacer/>
    <v-btn icon>
      <v-icon
        color="primary"
        @click.prevent="logout()"
      >logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang='ts'>
import {Component, Vue} from 'vue-property-decorator';
import { namespace as appNamespace } from '@/modules/app/store';

@Component
export default class DashboardLayoutToolbar extends Vue {
  get drawer() {
    return this.$store.state.app.dashboard.drawer;
  }

  get routes() {
    return this.$store.state.app.dashboard.routes;
  }

  public toggleDrawer() {
    this.$store.commit(`${appNamespace}/toggleDashboardDrawer`);
  }

  public logout() {
    const role = this.$store.state.auth.jwtData.role;
    localStorage.clear();
    this.$store.commit('auth/clearJwtToken');
    if (role === 'admin') {
      this.$router.push('/admin');
    } else {
      this.$router.push('/auth/login');
    }
  }
  get currentRouteName() {
    return this.$route.meta.title;
  }
}
</script>

<style scoped lang='scss' >
  .v-app-bar.v-app-bar--fixed {
    z-index: 4;
  }
</style>
