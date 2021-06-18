import {Driver} from '@/network/data/request';

export interface Delivery {
  uuid: string;
  fullName: string;
  address: string;
  zipcode: string;
  phone: string;
  deliveryUntil: string;
  deliveredAt: string;
  plannedDeliveryAt: string;
  city: string;
  cityUuid: string;
  driver: Driver;
}
