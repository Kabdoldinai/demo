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
            label="Модель дрона"
            no-data-text="Введите наименование"
            item-text="name"
            item-value="key"
            v-model="droneModelName"
            :items="modelList"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" md="12" lg="12">
        <span class="mr-3">Модель дрона: <b>{{totalDroneModels}}</b></span>
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
            @click.prevent="fetchDroneModelList()">Обновить</v-btn>
        <v-btn
            text
            small
            class="mb-2 mr-3"
            outlined
            color="#03a9f4"
            @click.prevent="openCreateDroneModelDialog">Добавить модель</v-btn>

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
            <tr class="no-data-tr" v-if="droneModels.length === 0">
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
                    @click.prevent="openUpdateDroneModelDialog(row.uuid, row.name)"
                    title="Изменить наименование модели"
                  >
                    <v-icon>edit</v-icon>
                  </a>
                  <a
                    href="#"
                    style="text-decoration: none; display: inline-block;margin: 0 0.5rem"
                    @click.prevent="openRemoveDroneModelDialog(row.uuid, row.name)"
                    title="Удалить модель"
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
        v-model="createDroneModelDialog"
        persistent max-width="600px"
      >
        <v-card>
          <v-form ref="addNewDroneModelForm">
          <v-list-item>
            <v-list-item-content>
              <v-card-title>
                <span class="headline">Добавление модель</span>
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="droneModelForm.name"
                  :rules="rules.name"
                  label="Наименование"
                  required
                />
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn color="default darken-1" text @click="closeCreateDroneModelDialog">Закрыть</v-btn>
                <v-btn color="blue darken-1" text  @click="createDroneModel">Добавить</v-btn>
              </v-card-actions>
            </v-list-item-content>
          </v-list-item>
          </v-form>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="updateDroneModelDialog"
        persistent max-width="600px"
      >
        <v-card>
          <v-form ref="addNewDroneModelForm">
          <v-list-item>
            <v-list-item-content>
              <v-card-title>
                <span class="headline">Изменение моделя</span>
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="droneModelForm.name"
                  :rules="rules.name"
                  label="Наименование"
                  required
                />
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn color="default darken-1" text @click="closeUpdateDroneModelDialog">Закрыть</v-btn>
                <v-btn color="blue darken-1" text  @click="updateDroneModel">Изменить</v-btn>
              </v-card-actions>
            </v-list-item-content>
          </v-list-item>
          </v-form>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="removeDroneModelDialog"
          persistent max-width="400px"
      >
        <v-card>
          <v-list-item>
            <v-list-item-content>
              <v-card-title>
               Удалить модель
              </v-card-title>
              <v-card-text style="line-height: 20px">
                Вы уверены, что хотите удалить модель <b style="color: #1E88E5;">{{ this.droneModelName }}</b>?
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn color="default darken-1" text @click="closeDeleteDroneModelDialog">Нет</v-btn>
                <v-btn color="blue darken-1" text  @click="removeDroneModel">Да</v-btn>
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
import {DroneModelForm, droneModelService} from '@/modules/admin/service/droneModelService';
import {DroneModelTableRowData} from '@/modules/admin/data/droneModelTableData';
import {Search, DroneModelData} from '@/modules/admin/data/droneModelData';
import {namespace} from '@/modules/admin/store';
import {Action} from 'vuex-class';
import validator_rules from '@/modules/admin/views/validate';

@Component
export default class DroneModelList extends Vue {
  @Action('droneModelList', {namespace}) public droneModelList: any;

  public rules = validator_rules;
  public loading: boolean = true;
  public createDroneModelDialog: boolean = false;
  public updateDroneModelDialog: boolean = false;
  public droneModels: DroneModelData[] = [];
  public modelList: string[] = [];
  public droneModelUuid: string = '';
  public droneModelName: string = '';
  public removeDroneModelDialog: boolean = false;

  private droneModelForm: DroneModelForm = {
    name: '',
  };

  public async fetchDroneModelList() {
    this.droneModels = [];
    this.loading = true;
    const search: Search = {
      name: this.droneModelName,
    };

    try {
      const result = await this.droneModelList(search);
      this.droneModels = result.data;
      this.loading = false;
    } catch (error) {
      this.$store.commit('app/showMessage', ['error', 'Модель дрона не найдена']);
      this.loading = false;
    }
  }

  public fetchModels() {
    droneModelService.fetchModels()
        .then((response: any) => {
          if (response.data.length > 0) {
            this.modelList = response.data;
          }
        })
        .catch((error: any) => {
          this.$store.commit('app/showMessage', ['error', error.response.data.message]);
        });
  }

  public openCreateDroneModelDialog(uuid: string = null, name: string = null) {
    if (this.droneModelForm === null) {
      (this.$refs.addNewDroneModelForm as Vue & { reset: () => boolean }).reset();
    }
    this.createDroneModelDialog = true;
  }

  public closeCreateDroneModelDialog() {
    this.createDroneModelDialog = false;
    this.clearDroneModelDialog();
  }

  public openUpdateDroneModelDialog(uuid: string , name: string) {
    this.droneModelUuid = uuid;
    this.droneModelForm.name = name;
    this.updateDroneModelDialog = true;
  }

  public closeUpdateDroneModelDialog() {
    this.updateDroneModelDialog = false;
    this.clearDroneModelDialog();
  }

  public createDroneModel() {
    if ((this.$refs.addNewDroneModelForm as Vue & { validate: () => boolean }).validate()) {
      droneModelService.createDroneModel(this.droneModelForm)
          .then(() => {
            this.$store.commit('app/showMessage', ['success', 'Модель дрона успешно добавлена']);
            this.fetchModels();
            this.fetchDroneModelList();
            this.closeCreateDroneModelDialog();
          })
          .catch((error) => {
            this.$store.commit('app/showMessage', ['error', error.response.data.message]);
          });
    }
  }

  public clearDroneModelDialog() {
    this.droneModelForm = {
      name: '',
    };
  }

  public updateDroneModel() {
    if ((this.$refs.addNewDroneModelForm as Vue & { validate: () => boolean }).validate()) {
      droneModelService.updateDroneModel(this.droneModelUuid, this.droneModelForm)
        .then((response: any) => {
          this.$store.commit('app/showMessage', ['success', 'Модель дрона успешно изменена']);
          this.closeUpdateDroneModelDialog();
          this.fetchDroneModelList();
        })
        .catch((error) => {
          this.$store.commit('app/showMessage', ['error', error.response.data.message]);
        });
    }
  }

  public openRemoveDroneModelDialog(uuid: string, name: string) {
    this.droneModelUuid = uuid;
    this.droneModelName = name;
    this.removeDroneModelDialog = true;
  }

  public removeDroneModel() {
    droneModelService.removeDroneModel(this.droneModelUuid)
      .then((response: any) => {
        this.$store.commit('app/showMessage', ['success', 'Модель дрона удалена']);
        this.droneModelUuid = '';
        this.droneModelName = '';
        this.removeDroneModelDialog = false;
        this.fetchDroneModelList();
      })
      .catch((error) => {
        this.$store.commit('app/showMessage', ['error', error.response.data.message]);
      });
  }

  public closeDeleteDroneModelDialog() {
    this.removeDroneModelDialog = false;
    this.droneModelUuid = '';
    this.droneModelName = '';
  }

  get tableData() {
    const tableData: DroneModelTableRowData[] = [];
    for (const droneModel of this.droneModels) {
      const tableRow: DroneModelTableRowData = {
        uuid: droneModel.uuid,
        name: droneModel.name,
      };
      tableData.push(tableRow);
    }
    return tableData;
  }

  get currentDroneModelRole() {
    return this.$store.state.auth.jwtData.role;
  }

  get totalDroneModels() {
    if (this.droneModels.length > 0) {
      return this.droneModels.length;
    }
    return 0;
  }

  private beforeMount() {
    this.fetchDroneModelList();
    this.fetchModels();
  }
}
</script>

<style>
  .updateBtn {
    background-color: rgb(29, 37, 60)!important;
    color: #ffffff!important;
  }
</style>