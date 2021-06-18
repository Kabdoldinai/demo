import { MutationTree } from 'vuex';
import { AppState } from './state';

export const mutations: MutationTree<AppState> = {
  toggleDashboardDrawer(state) {
    // @ts-ignore
    state.dashboard.drawer.model = !state.dashboard.drawer.model;
  },
  setDashboardDrawer(state, status) {
    state.dashboard.drawer.model = status;
  },
  showMessage(state, [color, text]) {
    state.snackbar.text = text;
    state.snackbar.color = color;
    state.snackbar.shown = !state.snackbar.shown;
  },
  setSnackbarStatus(state, status) {
    state.snackbar.shown = status;
  },
};
