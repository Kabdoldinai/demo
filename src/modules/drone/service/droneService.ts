import {droneApi} from '@/network/droneApi';

export interface DroneForm {
  name: string;
  model: string;
  profile: string;
  size: string;
  batteryCapacity: number;
  purpose: string;
  option: string[];
  user: string;
}

export const droneService = {
  selectDroneByUuid(droneUuid: string) {
    return droneApi.get('/drone/' + droneUuid);
  },

  getOptionList() {
    return droneApi.get('/drone-option');
  },

  getModelList() {
    return droneApi.get('/drone-model');
  },

  getDroneList(currentUserUuid: string) {
    return droneApi.get('/user/' + currentUserUuid + '/drone-list');
  },

  addDrone(droneAddForm: DroneForm) {
    return droneApi.post('/drone', droneAddForm);
  },

  updateDrone(droneData: DroneForm, droneUuid: string) {
    return droneApi.put('/drone/' + droneUuid, droneData);
  },

  deleteDrone(droneUuid: string) {
    return droneApi.delete('/drone/' + droneUuid);
  },

};

