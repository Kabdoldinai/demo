import { Module } from 'vuex';
import { RootState } from '@/store';
import { AuthState, state } from './state';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';

const namespaced: boolean = true;

const namespace: string = 'auth';

export const auth: Module<AuthState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
