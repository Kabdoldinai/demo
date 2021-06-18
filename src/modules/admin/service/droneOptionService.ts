import {droneApi} from '@/network/droneApi';
import {Search} from '@/modules/admin/data/droneOptionData';

export interface DroneOptionForm {
  name: string;
}

export const droneOptionService = {
  getDroneOptionList(search: Search) {
    let query = '/drone-option?';
    query += this.buildSearchOptionQuery(search);
    return droneApi.get(query);
  },
  createDroneOption(droneOptionForm: DroneOptionForm) {
    return droneApi.post('/drone-option', droneOptionForm);
  },
  updateDroneOption(userUuid: string, droneOptionForm: DroneOptionForm) {
    return droneApi.put('/drone-option/' + userUuid, droneOptionForm);
  },
  removeDroneOption(userUuid: string) {
    return droneApi.delete('/drone-option/' + userUuid);
  },
  fetchOptions() {
    return droneApi.get('/drone-option');
  },
  buildSearchOptionQuery(search: Search) {
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
