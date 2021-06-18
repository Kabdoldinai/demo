import { Module } from 'vuex';
import { RootState } from '@/store';
import {ProfileState, state} from './state';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';

const namespaced: boolean = true;
export const namespace: string = 'user';

export const user: Module<ProfileState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
