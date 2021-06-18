<template>
    <v-container fluid>
        <v-card
            class="mx-auto my-12"
            max-width="1500">
            <v-skeleton-loader
                ref="skeleton"
                type="image, image"
                class="mx-auto"
                :loading="loading">
                <v-container fluid class="ml-4">
                    <v-row>
                        <v-col sm="12" md="12" lg="7">
                            <h3>Изменить профиль</h3>
                            <v-form ref="addProfileForm">
                                <v-text-field
                                    v-model="profileChangeData.firstName"
                                    :rules="rules.droneName"
                                    label="Имя"
                                    required/>
                                <v-text-field
                                    v-model="profileChangeData.lastName"
                                    label="Фамилия"
                                    :rules="rules.emptyField"
                                    required/>
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
                                        min-width="290px">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                v-model="profileChangeData.birthday"
                                                label="Дата рождения"
                                                prepend-icon="event"
                                                readonly
                                                v-on="on"/>
                                        </template>
                                        <v-date-picker
                                            v-model="profileChangeData.birthday"
                                            @input="birthDatepicker = false"
                                            first-day-of-week="1"
                                            locale="RU-ru"/>
                                    </v-menu>
                                </v-col>
                                <v-btn
                                    class="mr-4 addDroneBtn"
                                    @click.prevent="updateProfile">
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
  import {ProfileChangeData} from '@/modules/user/data/profileData';
  import {profileService} from '@/modules/user/service/profileService';

  @Component
  export default class ChangeProfile extends Vue {
    public rules = validator_rules;
    public loading: boolean = true;
    public profileUuid: string = '';
    public birthDatepicker: boolean = false;

    private profileChangeData: ProfileChangeData = {
      firstName: '',
      lastName: '',
      birthday: '',
      profileUuid: '',
      user: '',
    };

    public getProfileData() {
      this.profileUuid = localStorage.getItem('profileUuid');
      profileService.selectProfileByUuid(this.profileUuid)
        .then((response) => {
          this.loading = false;
          this.profileChangeData = {
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            birthday: response.data.birthday,
            profileUuid: response.data.profileUuid,
            user: response.data.user,
          };
        });
    }

    public updateProfile() {
      if ((this.$refs.addProfileForm as Vue & { validate: () => boolean }).validate()) {
        this.profileChangeData.profileUuid = this.profileUuid;
        profileService.updateProfile(this.profileChangeData.profileUuid, this.profileChangeData)
          .then(() => {
            this.$store.commit('app/showMessage', ['success', 'Профиль успешно изменен']);
            this.loading = true;
            this.getProfileData();
          })
          .catch((error) => {
            this.$store.commit('app/showMessage', ['error', error.response.data.message]);
          });
      }
    }


    private beforeMount() {
      if (this.$route.params.profileUuid) {
        localStorage.setItem('profileUuid', this.$route.params.profileUuid);
        console.log(this.$route.params.profileUuid)
      }
      this.getProfileData();
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
