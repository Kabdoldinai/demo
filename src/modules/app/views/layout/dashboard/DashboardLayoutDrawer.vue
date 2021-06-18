<template>
    <v-navigation-drawer
        v-model="drawer.model"
        :permanent="drawer.type === 'permanent'"
        :temporary="drawer.type === 'temporary'"
        :clipped="drawer.clipped"
        :floating="drawer.floating"
        :mini-variant="drawer.mini"
        color="#202733"
        dark
        :fixed="true"
        app
    >
        <v-list class="pa-1">
            <v-list-item>
                <v-list-item-content class="text-center">
                    <v-list-item-title>{{ email }}</v-list-item-title>
                    <v-list-item-title><router-link style="color: #ffffff" :to="{name: 'account'}">настройки аккаунта</router-link></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-list class="pt-0" dense>
            <v-divider/>
            <v-list-item
                v-for="route in routes"
                v-if="check(route.name)"
                :key="route.title"
                :to="{name: route.name}"
                exact
                color="white"
            >
                <v-list-item-action>
                    <v-icon>{{ route.icon }}</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title>{{ route.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-list class="pt-0" dense>
            <v-divider/>
            <v-list-item
                v-for="route in routes.mainRoutes"
                v-if="check(route.name)"
                :key="route.title"
                :to="{name: route.name}"
                exact
                color="white"
            >
                <v-list-item-action>
                    <v-icon>{{ route.icon }}</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title>{{ route.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Getter} from 'vuex-class';

  const authNamespace: string = 'auth';

  @Component
  export default class DashboardLayoutDrawer extends Vue {
    @Getter('email', {namespace: authNamespace}) public email!: string;

    get routes() {
      if (this.role === 'admin') {
        return this.$store.state.app.dashboard.adminRoutes;
      } else if (this.role === 'user') {
        return this.$store.state.app.dashboard.managerRoutes;
      }
    }

    get role() {
      return this.$store.state.auth.jwtData.role;
    }

    public check(name: string) {
      if (
        (
          name === 'drone' || name === 'user' || name === 'profile'
        )
      ) {
        return true;
      }
      if (this.role === 'admin') {
        return name === 'drone-option' || name === 'drone-model' || name === 'dashboard';
      }
    }

    get drawer() {
      return this.$store.state.app.dashboard.drawer;
    }

    set drawer(status) {
      this.$store.commit('app/setDashboardDrawer', status);
    }

  }
</script>

<style scoped>
    .break-spaces {
        white-space: pre-wrap;
    }
</style>
