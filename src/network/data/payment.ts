import {Request} from '@/network/data/request';

export interface Payment {
  uuid: string;
  paymentStatus: string;
  amount: number;
  request: Request;
  paymentCreatedAt: string;
}
