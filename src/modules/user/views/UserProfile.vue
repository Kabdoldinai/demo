<template>
    <div>
        <v-card
            class="mx-auto my-12"
            max-width="1500">
            <div class="header-square">
                <v-toolbar-title class="card-header font-weight-bold">
                    Изменить профиль
                </v-toolbar-title>
                <v-card-title class="white--text chooseGroupTxt">Выберите группу:</v-card-title>
            </div>

                <v-container fluid>
                    <v-skeleton-loader
                        ref="skeleton"
                        type="image, image, image"
                        class="mx-auto"
                        :loading="loading">
                    <v-container fluid>
                        <v-row>
                            <v-card
                                class="ml-4 mt-4"
                                max-width="150"
                                max-height="150"
                            >
                                <v-icon class="d-flex align-center individualIcon" color="black" @click='showCategoryBlock()'
                                >person</v-icon>
                                <v-card-text class="black--text mt-0">Физическое лицо</v-card-text>
                            </v-card>
                        </v-row>
                    </v-container>
                    <v-container class="mb-1" fluid v-show="!showCategory">
                        <v-row dense>
                            <v-card
                                class="ml-2"
                                width="150"
                                height="150"
                            >
                                <v-icon class=" d-flex align-center individualIcon" color="black" :disabled="isNotResident" @click='showBlock(true, false)'>home</v-icon>
                                <v-card-text class="black--text mt-0 d-flex justify-center">Резидент</v-card-text>
                            </v-card>
                            <v-card
                                class="ml-2"
                                width="150"
                                height="150"
                            >
                                <v-icon class="d-flex align-center touristIcon" color="black" :disabled="isNotTourist" @click='showBlock(false, true)'>photo_camera</v-icon>
                                <v-card-text class="black--text d-flex justify-center mt-1">Турист</v-card-text>
                            </v-card>
                        </v-row>
                    </v-container>
                    <v-form ref="addNewTouristForm" v-show="showTouristForm">
                        <v-container fluid class="residentTouristContainer">
                            <v-row>
                                <v-col
                                    cols="12"
                                    md="4"
                                >
                                    <v-text-field
                                        v-model="userData.lastName"
                                        label="Фамилия"
                                        required
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    md="4"
                                >
                                    <v-text-field
                                        v-model="userData.firstName"
                                        label="Имя"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="4"
                                >
                                    <v-autocomplete
                                        v-model="userData.city"
                                        :items="cities"
                                        label="Город"
                                        item-value="key"
                                        item-text="name"
                                    />
                                </v-col>

                                <v-col
                                    cols="12"
                                    md="4"
                                >
                                    <v-text-field
                                        v-model="userData.email"
                                        label="Email"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="4"
                                >
                                    <v-text-field
                                        v-model="userData.phoneNumber"
                                        label="Номер телефона"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="4"
                                >
                                    <v-menu
                                        v-model="touristBirthdayDatepicker"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                v-model="userData.birthday"
                                                label="Дата рождения"
                                                prepend-icon="event"
                                                readonly
                                                v-on="on"
                                            />
                                        </template>
                                        <v-date-picker
                                            v-model="userData.birthday"
                                            @input="touristBirthdayDatepicker = false"
                                            first-day-of-week="1"
                                            locale="RU-ru"/>
                                    </v-menu>
                                </v-col>

                                <v-col
                                    cols="12"
                                    md="4"
                                >
                                    <v-text-field
                                        v-model="userData.passportNumber"
                                        label="Номер паспорта"
                                        required
                                    ></v-text-field>
                                </v-col>


                                <v-col
                                    cols="12"
                                    md="4"
                                >
                                    <v-text-field
                                        v-model="userData.citizenship"
                                        label="ИИН"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-btn
                                    large
                                    class=" mr-3 saveResidentBtn"
                                    type="submit"
                                    @click.prevent="saveTouristData()">СОХРАНИТЬ
                                </v-btn>
                            </v-row>
                        </v-container>
                    </v-form>
                    <v-form ref="addNewResidentForm" v-show="showResidentForm">
                        <v-container fluid class="residentTouristContainer">
                            <v-row>
                                <v-col
                                    cols="12"
                                    md="4"
                                >
                                    <v-text-field
                                        v-model="userData.lastName"
                                        label="Фамилия"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="4"
                                >
                                    <v-text-field
                                        v-model="userData.firstName"
                                        label="Имя"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="4"
                                >
                                    <v-autocomplete
                                        v-model="userData.city"
                                        :items="cities"
                                        label="Город"
                                        item-value="key"
                                        item-text="name"
                                    />
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="4"
                                >
                                    <v-text-field
                                        v-model="userData.email"
                                        label="Email"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="4"
                                >
                                    <v-text-field
                                        v-model="userData.phoneNumber"
                                        label="Номер телефона"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="4"
                                >
                                    <v-menu
                                        v-model="birthDatepicker"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                v-model="userData.birthday"
                                                label="Дата рождения"
                                                prepend-icon="event"
                                                readonly
                                                v-on="on"
                                            />
                                        </template>
                                        <v-date-picker
                                            v-model="userData.birthday"
                                            @input="birthDatepicker = false"
                                            first-day-of-week="1"
                                            locale="RU-ru"/>
                                    </v-menu>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="4"
                                >
                                    <v-text-field
                                        v-model="userData.idenNumber"
                                        label="Номер удостоверения"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="4"
                                >
                                    <v-text-field
                                        v-model="userData.iin"
                                        label="ИИН"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="4"
                                >
                                    <v-menu
                                        v-model="dateOfIssuePicker"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                v-model="userData.dateOfIssue"
                                                label="Дата выдачи"
                                                prepend-icon="event"
                                                readonly
                                                v-on="on"
                                            />
                                        </template>
                                        <v-date-picker
                                            v-model="userData.dateOfIssue"
                                            @input="dateOfIssuePicker = false"
                                            first-day-of-week="1"
                                            locale="RU-ru"/>
                                    </v-menu>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="4"
                                >
                                    <v-menu
                                        v-model="expirationDatePicker"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                v-model="userData.expirationDate"
                                                label="Срок действия"
                                                prepend-icon="event"
                                                readonly
                                                v-on="on"
                                            />
                                        </template>
                                        <v-date-picker
                                            v-model="userData.expirationDate"
                                            @input="expirationDatePicker = false"
                                            first-day-of-week="1"
                                            locale="RU-ru"/>
                                    </v-menu>
                                </v-col>

                                <v-col
                                    cols="12"
                                    md="4"
                                >
                                    <v-text-field
                                        v-model="userData.issuedBy"
                                        label="Кем выдано"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-btn
                                    large
                                    class="mr-3 saveResidentBtn"
                                    type="submit"
                                    @click.prevent="saveResidentData()">СОХРАНИТЬ
                                </v-btn>
                            </v-row>
                        </v-container>
                    </v-form>
                    </v-skeleton-loader>
                </v-container>
        </v-card>
    </div>
</template>


<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {UserData} from '@/modules/user/data/userData';
  import {userService} from '@/modules/user/service/userService';
  import validator_rules from '@/validate.ts';
  import moment from 'moment';


  @Component
  export default class UserProfile extends Vue  {

    public isNotCategory: boolean = true;
    public isNotResident: boolean = false;
    public isNotTourist: boolean = false;
    public showCategory: boolean = true;
    public rules = validator_rules;
    public showResidentForm: boolean = false;
    public showTouristForm: boolean = false;
    public cities: string[] = [];
    public expirationDate: null;
    public dateOfIssue: null;
    public birthDatepicker: boolean = false;
    public touristBirthdayDatepicker: boolean = false;
    public dateOfIssuePicker: boolean = false;
    public expirationDatePicker: boolean = false;
    public loading: boolean = true;
    public userData: UserData = {
      uuid: '',
      lastName: '',
      firstName: '',
      city: '',
      email: '',
      password: '',
      phoneNumber: '',
      birthday: moment().format('DD.MM.YYYY'),
      idenNumber: '',
      iin: '',
      dateOfIssue: moment().format('DD.MM.YYYY'),
      expirationDate: moment().format('DD.MM.YYYY'),
      issuedBy: '',
      type: '',
      status: '',
      role: '',
      passportNumber: '',
      citizenship: '',
    };


    public fetchCities() {
      userService.fetchCities()
        .then((response: any) => {
          if (response.data.length > 0) {
            this.cities = response.data;
          }
        })
        .catch((error: any) => {
          this.$store.commit('app/showMessage', ['error', error.response.data.message]);
        });
    }

    public fetchUserData() {
      const jwtData = this.currentJWTdata;
      userService.fetchUserData(jwtData.uuid)
        .then((response: any) => {
          this.userData = {
            uuid: response.data.uuid,
            lastName: response.data.lastName,
            firstName: response.data.firstName,
            city: response.data.city,
            email: response.data.email,
            password: null,
            phoneNumber: response.data.phoneNumber,
            birthday: response.data.birthday,
            idenNumber: response.data.idenNumber,
            iin: response.data.iin,
            dateOfIssue: response.data.dateOfIssue,
            expirationDate: response.data.expirationDate,
            issuedBy: response.data.issuedBy,
            type: response.data.type,
            status: response.data.status,
            role: response.data.role,
            passportNumber: response.data.passportNumber,
            citizenship: response.data.citizenship,
          };
          this.loading = false;

          if (response.data.type) {
            this.showCategoryBlock();
            if (response.data.type === 'tourist') {
              this.isNotResident = true;
              this.showTouristForm = true;
            } else if (response.data.type === 'resident') {
              this.isNotTourist = true;
              this.showResidentForm = true;
            }
            this.isNotCategory = false;
          }

        })
        .catch((error: any) => {
          this.$store.commit('app/showMessage', ['error', error.response.data.message]);
        });
    }

    public saveResidentData() {
      if ((this.$refs.addNewResidentForm as Vue & { validate: () => boolean }).validate()) {
        const jwtData = this.currentJWTdata;
        if (this.isNotResident || this.isNotCategory) {
          userService.saveResidentData(this.userData, jwtData.uuid)
            .then(() => {
              this.$store.commit('app/showMessage', ['success', 'Резидент успешно добавлен']);
              this.$router.push('/drone');
            })
            .catch((error) => {
              this.$store.commit('app/showMessage', ['error', error.response.data.message]);
            });
        } else {
          userService.updateResidentData(this.userData, jwtData.uuid)
            .then(() => {
              this.$store.commit('app/showMessage', ['success', 'Резидент успешно изменен']);
            })
            .catch((error) => {
              this.$store.commit('app/showMessage', ['error', error.response.data.message]);
            });
        }
      }

    }

    public saveTouristData() {
      if ((this.$refs.addNewTouristForm as Vue & { validate: () => boolean }).validate()) {
        const jwtData = this.currentJWTdata;
        if (this.isNotTourist || this.isNotCategory) {
          userService.saveTouristData(this.userData, jwtData.uuid)
            .then(() => {
              this.$store.commit('app/showMessage', ['success', 'Турист успешно добавлен']);
              this.$router.push('/drone');
            })
            .catch((error) => {
              this.$store.commit('app/showMessage', ['error', error.response.data.message]);
            });
        } else {
          userService.updateTouristData(this.userData, jwtData.uuid)
            .then(() => {
              this.$store.commit('app/showMessage', ['success', 'Турист успешно изменен']);
            })
            .catch((error) => {
              this.$store.commit('app/showMessage', ['error', error.response.data.message]);
            });
        }
      }
    }

    private showCategoryBlock() {
      this.showCategory = !this.showCategory;
      this.showTouristForm = false;
      this.showResidentForm = false;
    }

    private showBlock(showResident: boolean, showTourist: boolean) {
      this.showResidentForm = !showTourist;
      this.showTouristForm = !showResident;
    }

    get currentJWTdata() {
      return this.$store.state.auth.jwtData;
    }

    private beforeMount() {
      this.fetchCities();
      this.fetchUserData();

    }
  }
</script>

<style>
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

    .individualIcon {
        padding: 0.5rem;
        font-size: 70px !important;
    }

    .touristIcon {
        margin-top: 0.9rem;
        font-size: 65px !important;
    }

    .chooseGroupTxt {
        margin-top: -60px;
        margin-left: 2rem;
        font-size: 1rem !important;
    }
    .residentTouristContainer {
        padding: 2rem;
    }
    .saveResidentBtn {
        background-color: rgb(29, 37, 60)!important;
        color: #ffffff!important;
        margin-top: 2rem;
        margin-left: 2rem;
    }
    .profileRgBtn {
        color: #ffffff!important;
        margin-top: 2rem;
    }
</style>
