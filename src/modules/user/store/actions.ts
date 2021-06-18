import { ActionTree } from 'vuex';
import { RootState } from '@/store';
import {ProfileState} from '@/modules/user/store/state';
import {profileService} from '@/modules/user/service/profileService';
import {Search} from '@/modules/user/data/profileData';

export const actions: ActionTree<ProfileState, RootState> = {
  getUserProfileList(context: any, search: Search) {
    return new Promise((resolve, reject) => {
      profileService.getUserProfileList(search)
        .then((response: any) => {
          resolve(response);
        }).catch((error: any) => {
        reject(error);
      });
    });
  },
  profileList(context: any, userUuid: string) {
    return new Promise((resolve, reject) => {
      profileService.profileList(userUuid)
        .then((response: any) => {
          resolve(response);
        }).catch((error: any) => {
        reject(error);
      });
    });
  },
};
