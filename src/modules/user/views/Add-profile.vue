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
                        <h3>Чтобы добавить профиль заполните все необходимые поля</h3>
                        <v-form ref="addProfileForm">
                            <v-text-field
                                v-model="profileAddForm.firstName"
                                :rules="rules.droneName"
                                label="Имя"
                                required
                            />
                            <v-text-field
                                v-model="profileAddForm.lastName"
                                label="Фамилия"
                                :rules="rules.emptyField"
                                required
                            />
                            <v-col
                                class="pl-0"
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
                                            v-model="profileAddForm.birthday"
                                            label="Дата рождения"
                                            prepend-icon="event"
                                            readonly
                                            v-on="on"
                                        />
                                    </template>
                                    <v-date-picker
                                        v-model="profileAddForm.birthday"
                                        @input="birthDatepicker = false"
                                        first-day-of-week="1"
                                        locale="RU-ru"/>
                                </v-menu>
                            </v-col>
                            <v-btn
                                class="mr-4 addDroneBtn"
                                @click.prevent="addProfile"
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
  import validator_rules from '@/modules/drone/views/validate';
  import {ProfileAddForm} from '@/modules/user/data/profileData';
  import {profileService} from '@/modules/user/service/profileService';

  @Component
  export default class AddProfile extends Vue {
    public rules = validator_rules;
    public loading: boolean = false;
    private profileAddForm: ProfileAddForm = {
      firstName: '',
      lastName: '',
      birthday: '',
      user: '',
    };



    public addProfile() {
      if ((this.$refs.addProfileForm as Vue & { validate: () => boolean }).validate()) {
        this.profileAddForm.user = this.currentUserUuid;
        profileService.addNewProfile(this.profileAddForm)
          .then(() => {
            this.$store.commit('app/showMessage', ['success', 'Профиль успешно добавлен']);
          })
          .catch((error) => {
            this.$store.commit('app/showMessage', ['error', error.response.data.message]);
          });
      }
    }

    get currentUserUuid() {
      return this.$store.state.auth.jwtData.uuid;
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
