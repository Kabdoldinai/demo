import { ActionTree } from 'vuex';
import { RootState } from '@/store';
import {DroneState} from '@/modules/drone/store/state';
import {droneService} from '@/modules/drone/service/droneService';
import {profileService} from '@/modules/user/service/profileService';

export const actions: ActionTree<DroneState, RootState> = {
  getDroneOptionList() {
    return new Promise((resolve, reject) => {
      droneService.getOptionList()
        .then((response: any) => {
          resolve(response);
        }).catch((error: any) => {
        reject(error);
      });
    });
  },

  profileList(context: any, uuid: string) {
    return new Promise((resolve, reject) => {
      profileService.profileList(uuid)
        .then((response: any) => {
          resolve(response);
        }).catch((error: any) => {
        reject(error);
      });
    });
  },

};
