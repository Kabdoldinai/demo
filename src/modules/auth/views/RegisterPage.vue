<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar color="#1c2633">
                            <v-spacer></v-spacer>
                            <v-toolbar-title class="toolbar-title">Регистрация в системе</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-card-text>
                            <v-form ref="addNewUserForm">
                                <v-text-field
                                    v-model="userAddForm.firstName"
                                    :rules="rules.firstName"
                                    label="Имя"
                                    name="firstName"
                                    prepend-icon="person"
                                    type="text"
                                ></v-text-field>
                                <v-text-field
                                    v-model="userAddForm.lastName"
                                    :rules="rules.lastName"
                                    label="Фамилия"
                                    name="lastName"
                                    prepend-icon="person"
                                    type="text"
                                ></v-text-field>
                                <v-autocomplete
                                    v-model="userAddForm.city"
                                    :rules="rules.city"
                                    :items="cities"
                                    label="Город"
                                    item-value="key"
                                    item-text="name"
                                    prepend-icon="location_city"
                                    no-data-text="Введите название города"
                                    required
                                />
                                <v-text-field
                                    v-model="userAddForm.email"
                                    :rules="rules.email"
                                    label="Email"
                                    name=""
                                    prepend-icon="email"
                                    type="text"
                                ></v-text-field>
                                <v-text-field
                                    v-model="userAddForm.phoneNumber"
                                    :rules="rules.phone"
                                    label="Телефон"
                                    name=""
                                    prepend-icon="phone_iphone"
                                    type="text"
                                ></v-text-field>
                                <v-text-field
                                    v-model="userAddForm.password"
                                    :rules="rules.password"
                                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                                    @click:append="showPassword = !showPassword"
                                    id="password"
                                    label="Пароль"
                                    name="password"
                                    prepend-icon="lock"
                                    :type="showPassword ? 'text' : 'password'"
                                ></v-text-field>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn block type="submit"
                                           color="#1c2633"
                                           dark
                                           @click.prevent="createUser"
                                    >Регистрация</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                                <v-card-actions>
                                    <v-btn
                                        class="btn-no-transform"
                                        text
                                        color="#1c2633"
                                        @click.prevent="Login()"
                                    >
                                        Уже есть аккаунт? <b>Войдите</b>
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>


<script lang = 'ts'>
  import { Component, Vue } from 'vue-property-decorator';
  import { Action } from 'vuex-class';
  import authService, {UserAddForm } from '@/modules/auth/service/authService';
  import validator_rules from '@/validate.ts';
  const namespace: string = 'auth';

  @Component
  export default class RegisterPage extends Vue {
    @Action('authRequest', { namespace }) public authRequest: any;


    public cities: string[] = [];
    public rules = validator_rules;
    public showPassword: boolean = false;
    public userAddForm: UserAddForm = {
      firstName: '',
      lastName: '',
      city: '',
      email: '',
      password: '',
      phoneNumber: '',
      role: 'User',
    };




    public Login() {
      this.$router.push('/auth/login');
    }

    public fetchCities() {
      authService.fetchCities()
        .then((response: any) => {
          if (response.data.length > 0) {
            this.cities = response.data;
          }
        })
        .catch((error: any) => {
          this.$store.commit('app/showMessage', ['error', error.response.data.message]);
        });
    }



    public createUser() {
      if ((this.$refs.addNewUserForm as Vue & { validate: () => boolean }).validate()) {
        authService.createUser(this.userAddForm)
          .then(() => {
            alert('Вы успешно зарегистрированы! Вы будете перенаплены на страницу входа.');
            this.$router.push('/auth/login');
          })
          .catch((error) => {
            this.$store.commit('app/showMessage', ['error', error.response.data.message]);
          });
      }
    }

    private beforeMount() {
      this.fetchCities();
    }

  }
</script>

<style scoped>
    .toolbar-title {
        color: #ffffff;
    }
    .btn-no-transform{
        text-transform:none !important;
    }
</style>
