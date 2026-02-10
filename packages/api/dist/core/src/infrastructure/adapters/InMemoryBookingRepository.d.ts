import { Booking } from "../../domain/model/Booking";
import { GeoLocation } from "../../domain/model/GeoLocation";
import { Provider } from "../../domain/model/Provider";
import { BookingRepository } from "../../domain/ports/BookingRepository";
export declare class InMemoryBookingRepository implements BookingRepository {
    private bookings;
    save(booking: Booking): Promise<void>;
    findById(id: string): Promise<Booking | null>;
    findPending(): Promise<Booking[]>;
    findNearbyProviders(location: GeoLocation, radius: number): Promise<Provider[]>;
}
