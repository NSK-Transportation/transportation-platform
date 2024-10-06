export type VehicleType = "bus";

export interface Vehicle {
  readonly id: number;
  name: string;
  licensePlate: string;
  driver: string;
  atp: string;
  type: VehicleType;
}
