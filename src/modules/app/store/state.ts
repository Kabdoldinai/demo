export interface AppState {
  dashboard: Dashboard;
  snackbar: Snackbar;
}

interface Dashboard {
  drawer: DashboardDrawer;
  managerRoutes: Route[];
  adminRoutes: MainRoute;
}

interface DashboardDrawer {
  model: boolean | null;
  type: string;
  clipped: boolean;
  floating: boolean;
  mini: boolean;
}

interface Route {
  name: string;
  title: string;
  icon: string;
}

interface MainRoute {
  mainRoutes: Route[];
}

interface Snackbar {
  shown: boolean;
  color: string;
  text: string;
}

// @ts-ignore
export const state: AppState = {
  dashboard: {
    drawer: {
      model: null,
      type: 'default (no property)',
      clipped: false,
      floating: false,
      mini: false,
    },
    managerRoutes: [
      {name: 'user', title: 'Личный кабинет', icon: 'assignment_ind'},
      {name: 'profile', title: 'Мои профили', icon: 'recent_actors'},
      {name: 'drone', title: 'Мои дроны', icon: 'track_changes'},
    ],
    adminRoutes: {
      mainRoutes: [
        {name: 'dashboard', title: 'Главная', icon: 'dashboard'},
        {name: 'drone-model', title: 'Модель дрона', icon: 'workspaces'},
        {name: 'drone-option', title: 'Комплектация дрона', icon: 'toc'},

      ],
    },
  },
  snackbar: {
    shown: false,
    color: '',
    text: '',
  },
};
