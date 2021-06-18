import {Pickup} from '@/network/data/pickup';
import {Package} from '@/network/data/package';
import {Delivery} from '@/network/data/delivery';

export interface Request {
  uuid: string;
  trackNumber: string;
  packages: Package[];
  amountPackages: number;
  totalWeight: number;
  actualTotalWeight: number;
  waybillTotalWeight: number;
  pickup: Pickup;
  delivery: Delivery;
  status: string;
  createdAt: string;
  updatedAt: string;
  createdUser: string;
  note: string;
  transferRegister: string;
  group: string;
  hawbNumber: string;
}

export interface Driver {
  uuid: string;
  fullName: string;
}

