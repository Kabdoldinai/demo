import {droneApi} from '@/network/droneApi';
import {Search} from '@/modules/admin/data/droneModelData';

export interface DroneModelForm {
  name: string;
}

export const droneModelService = {
  getDroneModelList(search: Search) {
    let query = '/drone-model?';
    query += this.buildSearchModelQuery(search);
    return droneApi.get(query);
  },
  createDroneModel(droneModelForm: DroneModelForm) {
    return droneApi.post('/drone-model', droneModelForm);
  },
  updateDroneModel(userUuid: string, droneModelForm: DroneModelForm) {
    return droneApi.put('/drone-model/' + userUuid, droneModelForm);
  },
  removeDroneModel(userUuid: string) {
    return droneApi.delete('/drone-model/' + userUuid);
  },
  fetchModels() {
    return droneApi.get('/drone-model');
  },
  buildSearchModelQuery(search: Search) {
    let query = '';
    const params: string[] = [];
    if (typeof search.name !== 'undefined') {
      if (search.name !== null && search.name !== '') {
        params.push('name=' + search.name);
      }
    }
    query += params.join('&');
    return query;
  },
};
