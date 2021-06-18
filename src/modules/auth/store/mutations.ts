import { MutationTree } from 'vuex';
import {AuthState, JwtData} from './state';

export const mutations: MutationTree<AuthState> = {
  updateJwtToken(state, jwtToken: string) {
    state.jwtToken = jwtToken;
    state.status = true;
  },
  clearJwtToken(state) {
    state.jwtToken = '';
  },
  updateUserData(state, jwtData: JwtData) {
    state.jwtData = jwtData;
  },
};
