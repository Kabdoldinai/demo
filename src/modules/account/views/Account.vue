<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-card
        class="mx-auto my-12"
        max-width="1500">
      <div class="header-square">
        <v-toolbar-title class="card-header font-weight-bold">
          Данные аккаунта
        </v-toolbar-title>
      </div>
        <v-container fluid>
            <v-row>
                <v-col sm="4" md="4" lg="4">
                    <v-simple-table>
                        <template v-slot:default>
                            <tbody>
                            <tr>
                                <td>Email</td>
                                <td>{{ email }}</td>
                            </tr>
                            <tr>
                                <td>Телефон</td>
                                <td>{{ phone }}</td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
                <v-col sm="4" md="4" lg="4" class="ml-12">

                    <v-form
                        ref="changePasswordForm"
                        v-model="valid"
                    >
                        <v-text-field
                            v-model="currentPassword"
                            lazy-validation="true"
                            :rules="currentPasswordRules"
                            label="Текущий пароль"
                            type="password"
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="newPassword"
                            :rules="newPasswordRules"
                            label="Новый пароль"
                            type="password"
                            required
                        ></v-text-field>

                        <v-btn
                            :disabled="!valid"
                            class="mr-4 changePasswordBtn"
                            @click="changePassword"
                        >
                            Сменить пароль
                        </v-btn>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {accountService, ChangePasswordData} from '../service/accountService';

  @Component
  export default class Account extends Vue {

    public currentPassword: string = '';
    public newPassword: string = '';
    public valid: boolean = false;
    public currentPasswordRules = [
      (v: any) => !!v || 'Пароль не может быть пустым',
    ];

    public newPasswordRules = [
      (v: any) => (v && v.length >= 6) || 'Длина пароля как минимум 6 символов',
    ];

    public changePassword() {
      const data: ChangePasswordData = {
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
      };
      accountService.changePassword(data)
        .then((response: any) => {
          this.$store.commit('app/showMessage', ['success', 'Пароль успешно сменен']);
        })
        .catch((error: any) => {
          this.$store.commit('app/showMessage', ['error', error.response.data.message]);
        })
        .finally(() => {
          this.currentPassword = '';
          this.newPassword = '';
        });
    }

    get email() {
      return this.$store.state.auth.jwtData.email;
    }

    get phone() {
      return this.$store.state.auth.jwtData.phone_number;
    }

  }
</script>

<style scoped>
  .header-square {
    overflow: hidden;
    height: 180px;
    border-radius: 3px;
    background: linear-gradient(60deg, #1c1f23, #283d5f) !important;
  }
  .card-header {
    margin-top: 0.8rem;
    padding: 3rem;
    color: #ffffff;
    font-size: 2rem;
  }

  .changePasswordBtn{
    background-color: rgb(29, 37, 60) !important;
    color: #ffffff !important;
  }
</style>
