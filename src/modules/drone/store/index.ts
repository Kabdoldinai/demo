import { Module } from 'vuex';
import { RootState } from '@/store';
import {DroneState, state} from './state';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';

const namespaced: boolean = true;
export const namespace: string = 'drone';

export const drone: Module<DroneState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
