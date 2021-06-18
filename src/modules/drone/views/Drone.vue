<template>
    <div>
        <v-card
            class="mx-auto my-12"
            max-width="1500">
            <div class="header-square">
                <v-toolbar-title class="card-header font-weight-bold">
                    Мои дроны
                </v-toolbar-title>
            </div>
            <v-row>
                <v-col
                    class="d-flex"
                    cols="12"
                    sm="7"
                    md="5"
                    lg="3">
                    <v-btn
                        small
                        class="mb-2 mr-1 addDroneBtn"
                        type="submit"
                        @click.prevent="goToAddDrone()">Добавить дрон
                    </v-btn>
                </v-col>
            </v-row>
            <v-container fluid>
                <v-skeleton-loader
                    ref="skeleton"
                    type="table-row"
                    class="mx-auto"
                    :loading="loading"
                >
                    <v-row>
                        <v-col cols="12"
                               sm="12"
                               md="4"
                               lg="4"
                               v-for="(item, key) in droneList"
                        >
                            <v-card
                                color="rgb(249 249 249)"
                                style="border: 1px solid #dadada;"
                            >
                                <v-card-title
                                    style="color: #1c1f23; font-weight: bold"
                                    class="headline"
                                >{{item.name}}
                                </v-card-title>
                                <v-card-subtitle style="color: #1c1f23; font-weight: bold" class="pb-0">{{item.model.name}}</v-card-subtitle>
                                <v-card-subtitle style="color: #1c1f23"
                                    class="pt-0" v-if="item.profile !== ''">Профиль: {{item.profile}}</v-card-subtitle>
                                <v-card-subtitle class="pt-0" v-if="item.profile === ''"><br></v-card-subtitle>
                                <v-card-actions class="d-flex justify-end">
                                    <router-link style="color: #1c1f23; text-decoration: none" class="mr-2" small text
                                       :to="{ name: 'change-drone', params: { droneUuid: item.uuid }}">
                                        <v-icon color="#1c1f23">edit</v-icon> Изменить
                                    </router-link>
                                    <a style="color: #1c1f23" small text @click.prevent="openDeleteDroneDialog(item.uuid)">
                                        <v-icon color="red">delete</v-icon> Удалить
                                    </a>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-skeleton-loader>
            </v-container>
        </v-card>

        <v-dialog
            v-model="deleteDroneDialog"
            persistent max-width="400px"
        >
            <v-card>
                <v-list-item>
                    <v-list-item-content>
                        <v-card-title>
                            Удаление дрона
                        </v-card-title>
                        <v-card-text style="line-height: 20px">
                            Вы уверены, что хотите удалить дрон?
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="default darken-1" text @click="closeDeleteDroneDialog">Нет</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteDrone">Да</v-btn>
                        </v-card-actions>
                    </v-list-item-content>
                </v-list-item>
            </v-card>
        </v-dialog>

    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {droneService} from '@/modules/drone/service/droneService';
  import validator_rules from '@/modules/drone/views/validate';
  import {DroneList, Model} from '@/modules/drone/data/drone';

  @Component
  export default class Drone extends Vue {
    public rules = validator_rules;
    public droneList: DroneList[] = [];
    public deleteDroneDialog: boolean = false;
    public droneUuid: string = '';
    public loading: boolean = true;

    public goToAddDrone() {
      this.$router.push('/add-drone');
    }

    public async getDroneList() {
      droneService.getDroneList(this.currentUserUuid)
        .then((response: any) => {
          this.loading = false;
          if (response.data.length > 0) {
            for (const item of response.data) {
              let profile = '';
              if (item.profile) {
                profile = item.profile.fullName;
              }
              const droneDataRow: DroneList = {
                uuid: item.uuid,
                name: item.name,
                model: item.model,
                size: item.size,
                batteryCapacity: item.batteryCapacity,
                purpose: item.purpose,
                option: item.option,
                user: item.user,
                profile,
              };
              this.droneList.push(droneDataRow);
            }
          }
        })
        .catch((error) => {
          this.$store.commit('app/showMessage', ['error', 'Дрон не найден']);
        });
      this.loading = false;
    }

    public openDeleteDroneDialog(uuid: string) {
      this.droneUuid = uuid;
      this.deleteDroneDialog = true;
    }

    public deleteDrone() {
      droneService.deleteDrone(this.droneUuid)
        .then(() => {
          this.getDroneList();
          this.$store.commit('app/showMessage', ['success', 'Дрон успешно удален']);
          this.droneUuid = '';
        })
        .catch((error: any) => {
          this.$store.commit('app/showMessage', ['error', error.response.data.message]);
        });
      this.deleteDroneDialog = false;
    }

    public closeDeleteDroneDialog() {
      this.deleteDroneDialog = false;
    }

    get currentUserUuid() {
      return this.$store.state.auth.jwtData.uuid;
    }

    private beforeMount() {
      this.getDroneList();
    }

  }
</script>

<style scoped>
    .card-header {
        margin-top: 0.8rem;
        padding: 3rem;
        color: #ffffff;
        font-size: 2rem;
    }
    .header-square {
        overflow: hidden;
        height: 180px;
        border-radius: 3px;
        background: linear-gradient(60deg, #1c1f23, #283d5f) !important;
    }

    .addDroneBtn {
        background-color: rgb(29, 37, 60) !important;
        color: #ffffff !important;
        margin-top: 2rem;
        margin-left: 1rem;
    }
</style>
