import { Module } from 'vuex';
import { RootState } from '@/store';
import { AdminState, state } from './state';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';

const namespaced: boolean = true;
export const namespace: string = 'admin';

export const admin: Module<AdminState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
