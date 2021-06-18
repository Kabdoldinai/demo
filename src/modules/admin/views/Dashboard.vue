<template>
  <v-card
      class="mx-auto my-5"
      max-width="1600">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-btn
              large
              type="submit"
              class="mr-5 fetchbtn"
              @click.prevent="fetchAmount()">Обновить
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="d-flex flex-wrap">
        <v-col xs="12" sm="6" md="4" lg="4" xl="3">
          <v-skeleton-loader
              ref="skeleton"
              type="image"
              class="mx-auto h-100"
              :loading="loadingUserAmount"
          >
            <v-card>
              <v-card-text>
                <div class="row">
                  <div class="col">
                    <h3 class="text-uppercase text--primary">Количество пользователей</h3>
                    <br>
                    <h2 class="mt-4 count">{{userAmount}}</h2>
                  </div>
                  <div class="col-auto">
                    <div class="icon-shape bg-gradient-info">
                      <v-icon color="white">people</v-icon>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-skeleton-loader>
        </v-col>
        <v-col xs="12" sm="6" md="4" lg="4" xl="3">
          <v-skeleton-loader
              ref="skeleton"
              type="image"
              class="mx-auto h-100"
              :loading="loadingDroneAmount"
          >
            <v-card>
              <v-card-text>
                <div class="row">
                  <div class="col">
                    <h3 class="text-uppercase text--primary">Количество дронов</h3>
                    <br>
                    <h2 class="mt-4 count" style="color:green;">{{droneAmount}}</h2>
                  </div>
                  <div class="col-auto">
                    <div class="icon-shape bg-gradient-green">
                      <v-icon color="white">control_camera</v-icon>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-skeleton-loader>
        </v-col>
        <v-col xs="12" sm="6" md="4" lg="4" xl="3">
          <v-skeleton-loader
              ref="skeleton"
              type="image"
              class="mx-auto h-100"
              :loading="loadingDroneModelAmount"
          >
            <v-card>
              <v-card-text>
                <div class="row">
                  <div class="col">
                    <h3 class="text-uppercase text--primary">Количество моделей дрона</h3>
                    <br>
                    <h2 class="mt-4 count" style="color: #ec4e4e">{{droneModelAmount}}</h2>
                  </div>
                  <div class="col-auto">
                    <div class="icon-shape bg-gradient-red">
                      <v-icon color="white">workspaces</v-icon>
                    </div>
                  </div>
                </div>
                <div class="mt-3 mb-0 text-sm">
                  <router-link :to="{name: 'drone-model'}" class="link">Перейти</router-link>
                </div>
              </v-card-text>
            </v-card>
          </v-skeleton-loader>
        </v-col>
        <v-col xs="12" sm="6" md="4" lg="4" xl="3">
          <v-skeleton-loader
              ref="skeleton"
              type="image"
              class="mx-auto h-100"
              :loading="loadingDroneOptionAmount"
          >
            <v-card>
              <v-card-text>
                <div class="row">
                  <div class="col">
                    <h3 class="text-uppercase text--primary">Количество комплектаций дрона</h3>
                    <h2 class="mt-4 count" style="color: #858585">{{droneOptionAmount}}</h2>
                  </div>
                  <div class="col-auto">
                    <div class="icon-shape bg-gradient-dark">
                      <v-icon color="white">toc</v-icon>
                    </div>
                  </div>
                </div>
                <div class="mt-3 mb-0 text-sm">
                  <router-link :to="{name: 'drone-option'}" class="link">Перейти</router-link>
                </div>
              </v-card-text>
            </v-card>
          </v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
  </v-card>

</template>
<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Action} from 'vuex-class';
  import {namespace} from '@/modules/admin/store';

  @Component
  export default class Main extends Vue {
    @Action('getUserAmount', {namespace}) public getUserAmount: any;
    @Action('getDroneAmount', {namespace}) public getDroneAmount: any;
    @Action('getDroneModelAmount', {namespace}) public getDroneModelAmount: any;
    @Action('getDroneOptionAmount', {namespace}) public getDroneOptionAmount: any;

    public userAmount: number = 0;
    public droneAmount: number = 0;
    public droneModelAmount: number = 0;
    public droneOptionAmount: number = 0;
    public loadingUserAmount: boolean = true;
    public loadingDroneAmount: boolean = true;
    public loadingDroneModelAmount: boolean = true;
    public loadingDroneOptionAmount: boolean = true;

    public async fetchUserAmount() {
      this.loadingUserAmount = true;
      this.userAmount = 0;
      try {
        const result = await this.getUserAmount();
        this.userAmount = result.data.userAmount;
        this.loadingUserAmount = false;
      } catch (error) {
        this.$store.commit('app/showMessage', ['error', 'Произошла ошибка при получении количества пользователей']);
        this.loadingUserAmount = false;
      }
    }

    public async fetchDroneAmount() {
      this.loadingDroneAmount = true;
      this.droneAmount = 0;
      try {
        const result = await this.getDroneAmount();
        this.droneAmount = result.data.droneAmount;
        this.loadingDroneAmount = false;
      } catch (error) {
        this.$store.commit('app/showMessage', ['error', 'Произошла ошибка при получении комплектации']);
        this.loadingDroneAmount = false;
      }
    }

    public async fetchDroneModelAmount() {
      this.loadingDroneModelAmount = true;
      this.droneModelAmount = 0;
      try {
        const result = await this.getDroneModelAmount();
        this.droneModelAmount = result.data.droneModelAmount;
        this.loadingDroneModelAmount = false;
      } catch (error) {
        this.$store.commit('app/showMessage', ['error', 'Произошла ошибка при получении количества моделей']);
        this.loadingDroneModelAmount = false;
      }
    }

    public async fetchDroneOptionAmount() {
      this.loadingDroneOptionAmount = true;
      this.droneOptionAmount = 0;
      try {
        const result = await this.getDroneOptionAmount();
        this.droneOptionAmount = result.data.droneOptionAmount;
        this.loadingDroneOptionAmount = false;
      } catch (error) {
        this.$store.commit('app/showMessage', ['error', 'Произошла ошибка при получении количества моделей']);
        this.loadingDroneOptionAmount = false;
      }
    }

    public fetchAmount() {
      this.fetchUserAmount();
      this.fetchDroneAmount();
      this.fetchDroneModelAmount();
      this.fetchDroneOptionAmount();
    }

    private mounted() {
      this.fetchAmount();
    }
  }

</script>
<style scoped>
  h2 {
    font-size: 2.5rem;
    text-decoration: none;
    color: #1976d2;
  }
  .icon-shape {
    padding: 12px;
    text-align: center;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    border-radius: 50%;
  }
  a {
    text-decoration: none;
  }
  .h-100 {
    height: 100%;
  }
  .v-card.v-sheet.theme--light {
    height: 100%;
  }
  .bg-gradient-dark {
    background: linear-gradient(87deg, #adadad,#858585)!important;
  }
  .bg-gradient-red {
    background: linear-gradient(87deg,#f5365c,#f56036)!important;
  }
  .bg-gradient-green {
    background: linear-gradient(87deg,#2dce89,#2dcecc)!important;
  }
  .bg-gradient-info {
    background: linear-gradient(87deg,#11cdef,#1171ef)!important;
  }
  .fetchbtn {
    background-color: rgb(29, 37, 60)!important;
    color: #ffffff!important;
  }
</style>
