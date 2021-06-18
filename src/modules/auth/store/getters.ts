import { GetterTree } from 'vuex';
import { AuthState } from './state';
import { RootState } from '@/store';

export const getters: GetterTree<AuthState, RootState> = {
  email(state): string {
    return `${state.jwtData.email}`;
  },
};
