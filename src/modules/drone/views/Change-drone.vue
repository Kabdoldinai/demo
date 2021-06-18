<template>
    <v-container fluid>
        <v-card
            class="mx-auto my-12"
            max-width="1500">
            <v-skeleton-loader
                ref="skeleton"
                type="image, image, image"
                class="mx-auto"
                :loading="loading"
            >
            <v-container fluid class="ml-4">
                <v-row>
                    <v-col sm="12" md="12" lg="7">
                        <h3>Изменить дрон</h3>
                        <v-form ref="updateDroneForm">
                            <v-text-field
                                v-model="droneUpdateData.name"
                                :rules="rules.droneName"
                                label="Наименование"
                                required
                            />
                            <v-autocomplete
                                v-model="droneUpdateData.model"
                                :rules="rules.droneModel"
                                :items="droneModels"
                                item-text="name"
                                item-value="uuid"
                                label="Модель вашего дрона"
                                no-data-text="Введите название модели"
                                clearable
                            />
                            <v-text-field
                                v-model="droneUpdateData.size"
                                label="Размеры"
                                :rules="rules.emptyField"
                                required
                            />
                            <v-text-field
                                v-model="droneUpdateData.batteryCapacity"
                                :rules="rules.emptyField"
                                label="Емкость аккумулятора"
                                required
                            />
                            <v-textarea
                                v-model="droneUpdateData.purpose"
                                :rules="rules.emptyField"
                                label="Цель использования"
                                :counter="500"
                                required
                            />
                            <v-autocomplete
                                v-if="droneProfiles.length > 0"
                                item-text="fullName"
                                item-value="uuid"
                                v-model="droneUpdateData.profile"
                                :items="droneProfiles"
                                label="Выберите профиль"
                                no-data-text="Введите название профиля"
                                clearable
                            />
                            <br>
                            <h4>Комплектация:</h4>
                            <v-row no-gutters style="position: relative">
                                <template v-for="(item, n) in droneOptions">
                                    <v-checkbox
                                        :rules="rules.option"
                                        :key="n"
                                        :id="n.toString()"
                                        :value="item.uuid"
                                        :label="item.name"
                                        class="pa-2"
                                        v-model="droneUpdateData.option"
                                        tile
                                        @change="droneUpdateData.option.length > 0 ? validateCheckbox = false : validateCheckbox = true "
                                    />
                                </template>
                                <div class="error_text" v-if="validateCheckbox">Выберите хотябы одну комплектацию</div>
                            </v-row>
                            <v-btn
                                class="mr-4 addDroneBtn"
                                @click.prevent="updateDrone()">
                                Сохранить
                            </v-btn>
                        </v-form>
                    </v-col>
                </v-row>
            </v-container>
            </v-skeleton-loader>
        </v-card>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {DroneForm, droneService} from '@/modules/drone/service/droneService';
    import {DroneOption} from '@/modules/drone/data/drone';
    import validator_rules from '@/modules/drone/views/validate';
    import {Action} from 'vuex-class';
    import {namespace} from '@/modules/drone/store';

    @Component
  export default class AddDrone extends Vue {
    @Action('getDroneOptionList', {namespace}) public getDroneOptionList: any;
    @Action('profileList', {namespace}) public profileList: any;

    public rules = validator_rules;
    public droneModels: string[] = [];
    public droneUuid: string = '';
    public droneOptions: DroneOption[] = [];
    public loading: boolean = true;
    public droneProfiles: string[] = [];
    public droneUpdateData: DroneForm = {
      name: '',
      model: '',
      size: '',
      batteryCapacity: null,
      purpose: '',
      option: [],
      user: '',
      profile: '',
    };

    public validateCheckbox: boolean = false;

    public updateDrone() {
      if ((this.$refs.updateDroneForm as Vue & { validate: () => boolean }).validate()) {
        if (this.droneUpdateData.option.length !== 0) {
          this.droneUpdateData.user = this.currentUserUuid;
          droneService.updateDrone(this.droneUpdateData, this.droneUuid)
            .then(() => {
              this.$store.commit('app/showMessage', ['success', 'Дрон успешно изменен']);
              this.loading = true;
              this.getDroneData();
            })
            .catch((error) => {
              this.$store.commit('app/showMessage', ['error', error.response.data.message]);
            });
        } else {
          this.validateCheckbox = true;
        }
      } else {
        this.validateCheckbox = true;
      }
    }

      public async fetchProfileList() {
        this.droneProfiles = [];
        try {
          const result = await this.profileList(this.currentUserUuid);
          this.droneProfiles = result.data.profiles;
        } catch (error) {
          this.$store.commit('app/showMessage', ['error', 'Профили не найдены']);
        }
      }

    public getModelList() {
      droneService.getModelList()
        .then((response: any) => {
          if (response.data.length > 0) {
            this.droneModels = response.data;
          }
        })
        .catch((error: any) => {
          this.$store.commit('app/showMessage', ['error', error.response.data.message]);
        });
    }

    public async getOptionList() {
      this.droneOptions = [];
      try {
        const result = await this.getDroneOptionList();
        this.droneOptions = result.data;
      } catch (error) {
        this.$store.commit('app/showMessage', ['error', error.response.data.message]);
      }
    }

    public getDroneData() {
      this.droneUuid = localStorage.getItem('droneUuid');
      droneService.selectDroneByUuid(this.droneUuid)
        .then((response) => {
          if (response.data) {
            const option = [];
            if (response.data.option.length > 0) {
              for (const item of response.data.option) {
                option.push(item.uuid);
              }
            }
            let profile = '';
            if (response.data.profile) {
              profile = response.data.profile.uuid;
            }
            this.loading = false;
            this.droneUpdateData = {
              name: response.data.name,
              model: response.data.model.uuid,
              size: response.data.size,
              batteryCapacity: response.data.batteryCapacity,
              purpose: response.data.purpose,
              option,
              user: response.data.user,
              profile,
            };
          }
        });
    }

    get currentUserUuid() {
      return this.$store.state.auth.jwtData.uuid;
    }


    private beforeMount() {
      this.getModelList();
      this.getOptionList();
      if (this.$route.params.droneUuid) {
        localStorage.setItem('droneUuid', this.$route.params.droneUuid);
      }
      this.getDroneData();
      this.fetchProfileList();

    }
  }

</script>


<style>
    .addDroneBtn {
        background-color: rgb(29, 37, 60)!important;
        color: #ffffff!important;
    }
    .error_text {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 12px;
        color: #ff5252;
        caret-color: #ff5252;
    }
</style>
