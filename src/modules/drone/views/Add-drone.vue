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
                        <h3>Чтобы добавить дрон заполните все необходимые поля</h3>
                        <v-form ref="addDroneForm">
                            <v-text-field
                                v-model="droneForm.name"
                                :rules="rules.droneName"
                                label="Наименование"
                                required
                            />
                            <v-autocomplete
                                item-text="name"
                                item-value="uuid"
                                v-model="droneForm.model"
                                :rules="rules.droneModel"
                                :items="droneModels"
                                label="Модель вашего дрона"
                                no-data-text="Введите название модели"
                                clearable
                            />
                            <v-text-field
                                v-model="droneForm.size"
                                label="Размеры"
                                :rules="rules.emptyField"
                                required
                            />
                            <v-text-field
                                v-model="droneForm.batteryCapacity"
                                :rules="rules.emptyField"
                                label="Емкость аккумулятора"
                                required
                            />
                            <v-textarea
                                v-model="droneForm.purpose"
                                :rules="rules.emptyField"
                                label="Цель использования"
                                :counter="500"
                                required
                            />

                            <v-autocomplete
                                v-if="droneProfiles.length > 0"
                                item-text="fullName"
                                item-value="uuid"
                                v-model="droneForm.profile"
                                :items="droneProfiles"
                                label="Выберите профиль"
                                no-data-text="Введите название профиля"
                                clearable
                            />
                            <br>
                            <h4>Комплектация:</h4>
                            <v-row no-gutters style="position:relative;">
                                <template v-for="(item, n) in droneOptions">
                                    <v-checkbox
                                        :key="n"
                                        :id="n.toString()"
                                        :value="item.uuid"
                                        v-model="droneForm.option"
                                        :label="item.name"
                                        class="pa-2"
                                        @change="droneForm.option.length > 0 ? validateCheckbox = false : validateCheckbox = true "
                                        tile
                                    />
                                </template>
                                <div class="error_text" v-if="validateCheckbox">Выберите хотябы одну комплектацию</div>
                            </v-row>
                            <v-btn
                                class="mr-4 addDroneBtn"
                                @click.prevent="addDrone"
                            >
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
  import {DroneOption, Search} from '@/modules/drone/data/drone';
  import validator_rules from '@/modules/drone/views/validate';
  import {Action} from 'vuex-class';
  import {namespace} from '@/modules/drone/store';

  @Component
  export default class AddDrone extends Vue {
    @Action('profileList', {namespace}) public profileList: any;

    public rules = validator_rules;
    public droneModels: string[] = [];
    public droneProfiles: string[] = [];
    public profileUuid: string = '';
    public droneOptions: DroneOption[] = [];
    public validateCheckbox: boolean = false;
    public loading: boolean = true;

    private droneForm: DroneForm = {
      name: '',
      model: '',
      size: '',
      batteryCapacity: null,
      purpose: '',
      option: [],
      user: '',
      profile: '',
    };

    public goToMyDronePage() {
      this.$router.push('/drone');
    }


    public addDrone() {
      if ((this.$refs.addDroneForm as Vue & { validate: () => boolean }).validate()) {
        this.droneForm.user = this.currentUserUuid;
        if (this.droneForm.option.length !== 0) {
          droneService.addDrone(this.droneForm)
            .then(() => {
              this.$store.commit('app/showMessage', ['success', 'Дрон успешно добавлен']);
              this.goToMyDronePage();
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

    public getOptionList() {
      droneService.getOptionList()
        .then((response: any) => {
          if (response.data.length > 0) {
            this.loading = false;
            this.droneOptions = response.data;
          }
        })
        .catch((error: any) => {
          this.$store.commit('app/showMessage', ['error', error.response.data.message]);
        });
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

    get currentUserUuid() {
      return this.$store.state.auth.jwtData.uuid;
    }

    private beforeMount() {
      if (this.$route.params.profileUuid) {
        this.profileUuid = this.$route.params.profileUuid;
      }
      this.droneForm.profile = this.profileUuid;
      this.getModelList();
      this.getOptionList();
      this.fetchProfileList();
    }
  }

</script>


<style>
    .addDroneBtn {
        background-color: rgb(29, 37, 60) !important;
        color: #ffffff !important;
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
