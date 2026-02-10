import { Booking } from "../model/Booking";
import { GeoLocation } from "../model/GeoLocation";
import { Provider } from "../model/Provider";

export interface BookingRepository {
  save(booking: Booking): Promise<void>;
  findById(id: string): Promise<Booking | null>;
  findNearbyProviders(location: GeoLocation, radius: number): Promise<Provider[]>;
}
