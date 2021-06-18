import {droneApi} from '@/network/droneApi';

export interface ChangePasswordData  {
  currentPassword: string;
  newPassword: string;
}

export const accountService = {
  changePassword(data: ChangePasswordData) {
    const query = '/account/password';
    return droneApi.put(query, {
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  },
};
