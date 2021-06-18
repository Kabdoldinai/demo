import { Module } from 'vuex';
import { RootState } from '@/store';
import { AppState, state } from './state';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';

const namespaced: boolean = true;
export const namespace: string = 'app';

export const app: Module<AppState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
