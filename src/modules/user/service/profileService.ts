import {droneApi} from '@/network/droneApi';
import {ProfileAddForm, ProfileChangeData} from '@/modules/user/data/profileData';
import {Search} from '@/modules/user/data/profileData';

export const profileService = {
  getUserProfileList(search: Search) {
    let query = '/profile?';
    query += this.buildSearchQuery(search);
    return droneApi.get(query);
  },

  addNewProfile(profileAddForm: ProfileAddForm) {
    return droneApi.post('/profile', profileAddForm);
  },

  deleteProfile(profileUuid: string) {
    return droneApi.delete('/profile/' + profileUuid);
  },

  updateProfile(profileUuid: string, profileChangeData: ProfileChangeData) {
    return droneApi.put('/profile/' + profileUuid, profileChangeData);
  },

  selectProfileByUuid(profileUuid: string) {
    return droneApi.get('/profile/' + profileUuid);
  },

  profileList(userUuid: string) {
    const query = '/profile?user=' + userUuid;
    return droneApi.get(query);
  },

  buildSearchQuery(search: Search) {
    let query = '';
    const params: string[] = [];
    if (typeof search.fullName !== 'undefined') {
      params.push('fullName=' + search.fullName);
    }
    if (search.user !== null && search.user !== '') {
      params.push('user=' + search.user);
    }
    query += params.join('&');
    return query;
  },
};
