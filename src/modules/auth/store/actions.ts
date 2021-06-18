import { ActionTree } from 'vuex';
import { AuthState } from './state';
import { RootState } from '@/store';
import authService from '../service/authService';
import decoder from 'jwt-decode';

export class Success {
  public message: 'Успешно вошли.';
}

export const actions: ActionTree<AuthState, RootState> = {
  authRequest(context: any, form: any) {
    return new Promise((resolve, reject) => {
      authService.login(form)
        .then((response: any) => {
          const jwtToken = response.data.accessToken;
          context.commit('updateJwtToken', response.data.accessToken);
          const jwtData = decoder(jwtToken);
          context.commit('updateUserData', jwtData);
          localStorage.setItem('jwtData', JSON.stringify(jwtData));
          localStorage.setItem('jwtToken', jwtToken);
          localStorage.setItem('authStatus', 'true');
          resolve(new Success());
        }).catch((error: any) => {
          localStorage.clear();
          reject(error);
        });
    });
  },
};
