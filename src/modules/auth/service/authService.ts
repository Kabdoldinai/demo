import { droneApi } from '@/network/droneApi';

export interface AuthForm {
  identifier: string;
  password: string;
}

export interface UserAddForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  city: string;
  role: string;

}

const authPath = '/auth/login';

const authService = {
  login(form: AuthForm) {
    return droneApi.post(`${authPath}`, form);
  },
  fetchCities() {
    return droneApi.get('/all-city');
  },
  createUser(userAddForm: UserAddForm) {
    return droneApi.post('/user/add', userAddForm);
  },

};

export default authService;
