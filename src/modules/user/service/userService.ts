import {droneApi} from '@/network/droneApi';
import {UserData} from '@/modules/user/data/userData';

export const userService = {


  fetchCities() {
    return droneApi.get('/all-city');
  },

  fetchUserData(uuid: string) {
    return droneApi.get('/user/' + uuid);
  },

  saveResidentData(userData: UserData, uuid: string) {
    return droneApi.post('/user/' + uuid + '/resident', userData);
  },

  saveTouristData(userData: UserData, uuid: string) {
    return droneApi.post('/user/' + uuid + '/tourist', userData);
  },

  updateResidentData(userData: UserData, uuid: string) {
    return droneApi.put('/user/' + uuid + '/resident', userData);
  },

  updateTouristData(userData: UserData, uuid: string) {
    return droneApi.put('/user/' + uuid + '/tourist', userData);
  },

};
