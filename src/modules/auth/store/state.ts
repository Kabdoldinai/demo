export interface JwtData {
  iat: number;
  exp: number;
  jti: string;
  role: string;
  uuid: string;
  phone_number: string;
  email: string;
  city: string;
}

export interface AuthState {
  jwtToken: string;
  status: boolean;
  jwtData: JwtData;
}

const emptyJwtData = {iat: 0, exp: 0, jti: '', uuid: '', email: '', phone_number: '', role: ''};

const jwtToken = localStorage.getItem('jwtToken') === null ?
  '' : localStorage.getItem('jwtToken');
const defaultJwtData = localStorage.getItem('jwtData') === null ?
  emptyJwtData : JSON.parse(localStorage.getItem('jwtData'));

export const state: AuthState = {
  jwtToken,
  status: localStorage.getItem('authStatus') === 'true',
  jwtData: defaultJwtData,
};
