import {droneApi} from '@/network/droneApi';

export const dashboardService = {
  getUserAmount() {
    return droneApi.get('/user-amount');
  },
  getDroneAmount() {
    return droneApi.get('/drone-amount');
  },
  getDroneModelAmount() {
    return droneApi.get('/drone-model-amount');
  },
  getDroneOptionAmount() {
    return droneApi.get('/drone-option-amount');
  },
};
