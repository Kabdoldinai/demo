import {Driver} from '@/network/data/request';

export interface Pickup {
  uuid: string;
  shipper: string;
  address: string;
  zipcode: string;
  phone: string;
  plannedPickupAt: string;
  city: string;
  driver: Driver;
}
