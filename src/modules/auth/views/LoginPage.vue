<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="#1c2633">
              <v-spacer></v-spacer>
              <v-toolbar-title class="toolbar-title">Вход в систему</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form @submit="login">
                <v-text-field
                  v-model="form.identifier"
                  label="Телефон или email"
                  name="login"
                  prepend-icon="person"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="form.password"
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
                         @click.prevent="login"
                  >Войти</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
                <v-card-actions>
                  <v-btn
                      class="btn-no-transform"
                      text
                      color="#1c2633"
                      @click.prevent="Register()"
                  >
                    Регистрация
                  </v-btn>
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
import { AuthForm } from '../service/authService';
import { Action } from 'vuex-class';
import { Success } from '@/modules/auth/store/actions';
const namespace: string = 'auth';

@Component
export default class LoginPage extends Vue {
  @Action('authRequest', { namespace }) public authRequest: any;

  public form: AuthForm = { identifier: '', password: '' } ;
  public showPassword: boolean = false;



  public Register() {
    this.$router.push('/auth/register');
  }

  private async login() {
    try {
      const success = await this.authRequest(this.form);
      if (success instanceof Success) {
        this.$store.commit('app/showMessage', ['success', 'Успешный вход в систему']);
        this.$router.push('/');
      }
    } catch (error) {
      // TODO: update ui with error
      alert('Неправильный логин или пароль.');
    }
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
