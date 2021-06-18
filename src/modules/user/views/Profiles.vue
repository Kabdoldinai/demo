<template>
    <v-card
        class="mx-auto my-12"
        max-width="1500">
        <div class="header-square">
            <v-toolbar-title class="card-header font-weight-bold">
                Мои профили
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
                    @click.prevent="goToAddProfile()">Добавить профиль
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
                           v-for="(item, key) in profileList"
                    >
                        <v-card
                            color="rgb(249 249 249)"
                            style="border: 1px solid #dadada;"
                        >
                            <v-card-title
                                class="headline"
                            >{{item.name}}
                            </v-card-title>
                            <v-card-subtitle class="pb-0" style="color: #1c1f23; font-weight: bold">{{item.fullName}}</v-card-subtitle>
                            <router-link style="color: #1c1f23; text-decoration: none; font-size: 0.8rem" class="ml-3" small text :to="{ name: 'change-profile', params: { profileUuid: item.uuid }}">
                                <v-icon color="#233045" style="font-size: 1.2rem">edit</v-icon> Изменить
                            </router-link>
                            <v-card-subtitle class="pt-0"><br></v-card-subtitle>
                            <v-card-actions class="d-flex justify-end">
                                <router-link style="color: #1c1f23; text-decoration: none" class="mr-2" small text :to="{ name: 'add-drone', params: {profileUuid: item.uuid}}">
                                    <v-icon color="#233045">add_box</v-icon> Добавить дрон
                                </router-link>
                                <a style="color: #1c1f23" small text @click.prevent="openRemoveProfileDialog(item.fullName, item.uuid)">
                                    <v-icon color="red">delete</v-icon> Удалить
                                </a>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-skeleton-loader>
            <v-dialog
                v-model="deleteProfileDialog"
                persistent max-width="400px"
            >
                <v-card>
                    <v-list-item>
                        <v-list-item-content>
                            <v-card-title>
                                Удалить модель
                            </v-card-title>
                            <v-card-text style="line-height: 20px">
                                Вы уверены, что хотите удалить профиль <b style="color: #1E88E5;">{{
                                this.profileName }}</b>?
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer/>
                                <v-btn color="default darken-1" text @click="closeDeleteProfileDialog">Нет
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="deleteProfile()">Да</v-btn>
                            </v-card-actions>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-dialog>

        </v-container>
    </v-card>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {ProfileData, ProfilesList, Search} from '@/modules/user/data/profileData';
  import {namespace} from '@/modules/user/store';
  import {Action} from 'vuex-class';
  import validator_rules from '@/modules/admin/views/validate';
  import {profileService} from '@/modules/user/service/profileService';

  @Component
  export default class ProfileList extends Vue {
    @Action('getUserProfileList', {namespace}) public getUserProfileList: any;

    public rules = validator_rules;
    public loading: boolean = true;
    public profileList: ProfilesList[] = [];
    public profileName: string = '';
    public profileUuid: string = '';
    public fullName: string = '';
    public deleteProfileDialog: boolean = false;

    public goToAddProfile() {
      this.$router.push('/add-profile');
    }

    public async fetchProfileList() {
      this.profileList = [];
      this.loading = true;
      const search: Search = {
        fullName: this.fullName,
        user: this.currentUserUuid,
      };
      try {
        const result = await this.getUserProfileList(search);
        this.profileList = result.data.profiles;
        this.loading = false;
      } catch (error) {
        this.$store.commit('app/showMessage', ['error', 'Профиль не найден']);
        this.loading = false;
      }
    }

    public openRemoveProfileDialog(name: string, uuid: string) {
      this.deleteProfileDialog = true;
      this.profileName = name;
      this.profileUuid = uuid;
    }

    public closeDeleteProfileDialog() {
      this.deleteProfileDialog = false;
    }

    public deleteProfile() {
      profileService.deleteProfile(this.profileUuid)
        .then(() => {
          this.$store.commit('app/showMessage', ['success', 'Профиль успешно удален']);
          this.fetchProfileList();
        })
        .catch((error: any) => {
          this.$store.commit('app/showMessage', ['error', error.response.data.message]);
        });
      this.deleteProfileDialog = false;
    }


    get currentUserUuid() {
      return this.$store.state.auth.jwtData.uuid;
    }

    private beforeMount() {
      this.fetchProfileList();
    }
  }
</script>

<style>
    .updateBtn {
        background-color: rgb(29, 37, 60) !important;
        color: #ffffff !important;
    }
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