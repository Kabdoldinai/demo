export interface Drone {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  status: string;
  city: string;
  created_at: string;
}

export interface DroneOption {
  uuid: string;
  name: string;
}
export interface DroneList {
  uuid: string;
  name: string;
  model: Model;
  size: string;
  batteryCapacity: number;
  purpose: string;
  option: string[];
  user: string;
  profile: string;
}
export interface Model {
  uuid: string;
  name: string;
}
export interface DroneData {
  uuid: string;
  name: string;
  model: string;
  size: string;
  batteryCapacity: number;
  purpose: string;
  option: [];
  user: string;
}

export interface  Search {
  profiles: string;
}


