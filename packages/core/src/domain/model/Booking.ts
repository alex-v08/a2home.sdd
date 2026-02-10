import { GeoLocation } from "./GeoLocation";
import { Money } from "./Money";

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export class Booking {
  constructor(
    public readonly id: string,
    public readonly clientId: string,
    public readonly providerId: string,
    public readonly serviceId: string,
    public readonly status: BookingStatus,
    public readonly price: Money,
    public readonly location: GeoLocation
  ) {
    this.validate();
  }

  private validate() {
    if (!this.id) throw new Error("Booking ID is required.");
    if (!this.clientId) throw new Error("Client ID is required.");
    if (!this.providerId) throw new Error("Provider ID is required.");
    if (!this.serviceId) throw new Error("Service ID is required.");
  }
}
