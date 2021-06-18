import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import { app } from '@/modules/app/store';
import { auth } from '@/modules/auth/store';
import { admin } from '@/modules/admin/store';
import { drone } from '@/modules/drone/store';
import { user } from '@/modules/user/store';


Vue.use(Vuex);

export interface RootState {
  dialogs: Dialog;
  tab: number;
  pickupFormShowed: boolean;
  deliveryFormShowed: boolean;
  loader: boolean;
}

interface Dialog {
  driverAddOpened: boolean;
}

const store: StoreOptions<RootState> = {
  modules: {
    app,
    auth,
    admin,
    drone,
    user,
  },
  state: {
    dialogs: {
      driverAddOpened: false,
    },
    pickupFormShowed: true,
    deliveryFormShowed: true,
    tab: 0,
    loader: false,
  },
  mutations: {
    toggleToShowPickupForm(state, position) {
      state.pickupFormShowed = position;
    },
    toggleToShowDeliveryForm(state, position) {
      state.deliveryFormShowed = position;
    },
    toggleTab(state, tabNum) {
      state.tab = tabNum;
    },
    loader(state, payload) {
      state.loader = payload;
    },
  },
  actions: {

  },
};

export default new Vuex.Store<RootState>(store);
