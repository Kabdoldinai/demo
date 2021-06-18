export interface ConsolidationRequest {
  uuid: string;
  number: string;
  pickupCity: string;
  deliveryCity: string;
  totalWeight: number;
  amountRequests: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}
