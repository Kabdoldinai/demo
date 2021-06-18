<template>
  <v-card
      class="mx-auto my-5"
      max-width="1600">
<v-container fluid>
  <form>
    <v-row cols="12">
      <v-col  cols="6" sm="6" md="2" class="mb-2">
        <v-autocomplete
            clearable
            label="Комплектация дрона"
            no-data-text="Введите наименование"
            item-text="name"
            item-value="key"
            v-model="droneOptionName"
            :items="modelList"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" md="12" lg="12">
        <span class="mr-3">Комплектация дрона: <b>{{totalDroneOptions}}</b></span>
      </v-col>
    </v-row>
    <v-row>
      <v-col
          class="d-flex"
          cols="12"
          sm="7"
          md="5"
          lg="3"
      >
        <v-btn
            small
            class="mb-2 mr-3 updateBtn"
            type="submit"
            @click.prevent="fetchDroneOptionList()">Обновить</v-btn>
        <v-btn
            text
            small
            class="mb-2 mr-3"
            outlined
            color="#03a9f4"
            @click.prevent="openCreateDroneOptionDialog">Добавить комплектацию</v-btn>

      </v-col>
    </v-row>
  </form>
  <v-row>
    <v-col sm="12" md="12" lg="12">
      <v-skeleton-loader
        ref="skeleton"
        type="table"
        class="mx-auto"
        :loading="loading"
      >
        <v-simple-table
          :fixed-header="true"
          class="drone-model-table"
        >
          <template v-slot:default>
            <thead>
            <tr>
              <th width="2%" class="text-left">#</th>
              <th class="text-left">Наименование</th>
              <th class="text-center">Действие</th>
            </tr>
            <tr class="no-data-tr" v-if="droneOptions.length === 0">
              <td colspan="15">
                <div class="text-center">Ничего не найдено</div>
              </td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row, key) in tableData" :key="row.uuid">
              <td>{{ key + 1 }}</td>
              <td>{{ row.name }}</td>
              <td width="2%" class="text-center">
                <div class="d-flex">
                  <a
                    href="#"
                    style="text-decoration: none; display: inline-block;margin: 0 0.5rem"
                    @click.prevent="openUpdateDroneOptionDialog(row.uuid, row.name)"
                    title="Изменить наименование меделя"
                  >
                    <v-icon>edit</v-icon>
                  </a>
                  <a
                    href="#"
                    style="text-decoration: none; display: inline-block;margin: 0 0.5rem"
                    @click.prevent="openRemoveDroneOptionDialog(row.uuid, row.name)"
                    title="Удалить комплектацию"
                  >
                    <v-icon color="red">close</v-icon>
                  </a>
                </div>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-skeleton-loader>
    </v-col>
    <v-row justify="center">
      <v-dialog
        v-model="createDroneOptionDialog"
        persistent max-width="600px"
      >
        <v-card>
          <v-form ref="addNewDroneOptionForm">
          <v-list-item>
            <v-list-item-content>
              <v-card-title>
                <span class="headline">Добавление комплектаций</span>
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="droneOptionForm.name"
                  :rules="rules.name"
                  label="Наименование"
                  required
                />
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn color="default darken-1" text @click="closeCreateDroneOptionDialog">Закрыть</v-btn>
                <v-btn color="blue darken-1" text  @click="createDroneOption">Добавить</v-btn>
              </v-card-actions>
            </v-list-item-content>
          </v-list-item>
          </v-form>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="updateDroneOptionDialog"
        persistent max-width="600px"
      >
        <v-card>
          <v-form ref="addNewDroneOptionForm">
          <v-list-item>
            <v-list-item-content>
              <v-card-title>
                <span class="headline">Изменение комплектаций</span>
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="droneOptionForm.name"
                  :rules="rules.name"
                  label="Наименование"
                  required
                />
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn color="default darken-1" text @click="closeUpdateDroneOptionDialog">Закрыть</v-btn>
                <v-btn color="blue darken-1" text  @click="updateDroneOption">Изменить</v-btn>
              </v-card-actions>
            </v-list-item-content>
          </v-list-item>
          </v-form>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="removeDroneOptionDialog"
          persistent max-width="400px"
      >
        <v-card>
          <v-list-item>
            <v-list-item-content>
              <v-card-title>
               Удалить комплектацию
              </v-card-title>
              <v-card-text style="line-height: 20px">
                Вы уверены, что хотите удалить комплектацию <b style="color: #1E88E5;">{{ this.droneOptionName }}</b>?
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn color="default darken-1" text @click="closeDeleteDroneOptionDialog">Нет</v-btn>
                <v-btn color="blue darken-1" text  @click="removeDroneOption">Да</v-btn>
              </v-card-actions>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-dialog>
    </v-row>
  </v-row>
</v-container>
  </v-card>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {DroneOptionForm, droneOptionService} from '@/modules/admin/service/droneOptionService';
import {DroneOptionTableRowData} from '@/modules/admin/data/droneOptionTableData';
import {Search, DroneOptionData} from '@/modules/admin/data/droneOptionData';
import {namespace} from '@/modules/admin/store';
import {Action} from 'vuex-class';
import validator_rules from '@/modules/admin/views/validate';

@Component
export default class DroneOptionList extends Vue {
  @Action('droneOptionList', {namespace}) public droneOptionList: any;

  public rules = validator_rules;
  public loading: boolean = true;
  public createDroneOptionDialog: boolean = false;
  public updateDroneOptionDialog: boolean = false;
  public droneOptions: DroneOptionData[] = [];
  public modelList: string[] = [];
  public droneOptionUuid: string = '';
  public droneOptionName: string = '';
  public removeDroneOptionDialog: boolean = false;

  private droneOptionForm: DroneOptionForm = {
    name: '',
  };

  public async fetchDroneOptionList() {
    this.droneOptions = [];
    this.loading = true;
    const search: Search = {
      name: this.droneOptionName,
    };

    try {
      const result = await this.droneOptionList(search);
      this.droneOptions = result.data;
      this.loading = false;
    } catch (error) {
      this.$store.commit('app/showMessage', ['error', 'Комплектация дрона не найдена']);
      this.loading = false;
    }
  }

  public fetchOptions() {
    droneOptionService.fetchOptions()
        .then((response: any) => {
          if (response.data.length > 0) {
            this.modelList = response.data;
          }
        })
        .catch((error: any) => {
          this.$store.commit('app/showMessage', ['error', error.response.data.message]);
        });
  }

  public openCreateDroneOptionDialog(uuid: string = null, name: string = null) {
    if (this.droneOptionForm === null) {
      (this.$refs.addNewDroneOptionForm as Vue & { reset: () => boolean }).reset();
    }
    this.createDroneOptionDialog = true;
  }

  public closeCreateDroneOptionDialog() {
    this.createDroneOptionDialog = false;
    this.clearDroneOptionDialog();
  }

  public openUpdateDroneOptionDialog(uuid: string , name: string) {
    this.droneOptionUuid = uuid;
    this.droneOptionForm.name = name;
    this.updateDroneOptionDialog = true;
  }

  public closeUpdateDroneOptionDialog() {
    this.updateDroneOptionDialog = false;
    this.clearDroneOptionDialog();
  }

  public createDroneOption() {
    if ((this.$refs.addNewDroneOptionForm as Vue & { validate: () => boolean }).validate()) {
      droneOptionService.createDroneOption(this.droneOptionForm)
          .then(() => {
            this.$store.commit('app/showMessage', ['success', 'Комплектация дрона успешно добавлена']);
            this.fetchOptions();
            this.fetchDroneOptionList();
            this.closeCreateDroneOptionDialog();
          })
          .catch((error) => {
            this.$store.commit('app/showMessage', ['error', error.response.data.message]);
          });
    }
  }

  public clearDroneOptionDialog() {
    this.droneOptionForm = {
      name: '',
    };
  }

  public updateDroneOption() {
    if ((this.$refs.addNewDroneOptionForm as Vue & { validate: () => boolean }).validate()) {
      droneOptionService.updateDroneOption(this.droneOptionUuid, this.droneOptionForm)
        .then((response: any) => {
          this.$store.commit('app/showMessage', ['success', 'Комплектация дрона успешно изменена']);
          this.closeUpdateDroneOptionDialog();
          this.fetchDroneOptionList();
        })
        .catch((error) => {
          this.$store.commit('app/showMessage', ['error', error.response.data.message]);
        });
    }
  }

  public openRemoveDroneOptionDialog(uuid: string, name: string) {
    this.droneOptionUuid = uuid;
    this.droneOptionName = name;
    this.removeDroneOptionDialog = true;
  }

  public removeDroneOption() {
    droneOptionService.removeDroneOption(this.droneOptionUuid)
      .then((response: any) => {
        this.$store.commit('app/showMessage', ['success', 'Комплектация дрона удалена']);
        this.droneOptionUuid = '';
        this.droneOptionName = '';
        this.removeDroneOptionDialog = false;
        this.fetchDroneOptionList();
      })
      .catch((error) => {
        this.$store.commit('app/showMessage', ['error', error.response.data.message]);
      });
  }

  public closeDeleteDroneOptionDialog() {
    this.removeDroneOptionDialog = false;
    this.droneOptionUuid = '';
    this.droneOptionName = '';
  }

  get tableData() {
    const tableData: DroneOptionTableRowData[] = [];
    for (const droneOption of this.droneOptions) {
      const tableRow: DroneOptionTableRowData = {
        uuid: droneOption.uuid,
        name: droneOption.name,
      };
      tableData.push(tableRow);
    }
    return tableData;
  }

  get currentDroneOptionRole() {
    return this.$store.state.auth.jwtData.role;
  }

  get totalDroneOptions() {
    if (this.droneOptions.length > 0) {
      return this.droneOptions.length;
    }
    return 0;
  }

  private beforeMount() {
    this.fetchDroneOptionList();
    this.fetchOptions();
  }
}
</script>

