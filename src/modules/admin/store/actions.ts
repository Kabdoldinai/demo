import { ActionTree } from 'vuex';
import { RootState } from '@/store';
import { AdminState } from '@/modules/admin/store/state';
import {Search} from '@/modules/admin/data/droneModelData';
import {dashboardService} from '@/modules/admin/service/dashboardService';
import {droneModelService} from '@/modules/admin/service/droneModelService';
import {droneOptionService} from '@/modules/admin/service/droneOptionService';

export const actions: ActionTree<AdminState, RootState> = {
  getUserAmount() {
    return new Promise((resolve, reject) => {
      dashboardService.getUserAmount()
          .then((response: any) => {
            resolve(response);
          }).catch((error: any) => {
        reject(error);
      });
    });
  },
  getDroneAmount() {
    return new Promise((resolve, reject) => {
      dashboardService.getDroneAmount()
          .then((response: any) => {
            resolve(response);
          }).catch((error: any) => {
        reject(error);
      });
    });
  },
  getDroneModelAmount() {
    return new Promise((resolve, reject) => {
      dashboardService.getDroneModelAmount()
          .then((response: any) => {
            resolve(response);
          }).catch((error: any) => {
        reject(error);
      });
    });
  },
  getDroneOptionAmount() {
    return new Promise((resolve, reject) => {
      dashboardService.getDroneOptionAmount()
          .then((response: any) => {
            resolve(response);
          }).catch((error: any) => {
        reject(error);
      });
    });
  },
  droneModelList(context: any, search: Search) {
    return new Promise((resolve, reject) => {
      droneModelService.getDroneModelList(search)
        .then((response: any) => {
          resolve(response);
        }).catch((error: any) => {
        reject(error);
      });
    });
  },
  droneOptionList(context: any, search: Search) {
    return new Promise((resolve, reject) => {
      droneOptionService.getDroneOptionList(search)
        .then((response: any) => {
          resolve(response);
        }).catch((error: any) => {
        reject(error);
      });
    });
  },
};
