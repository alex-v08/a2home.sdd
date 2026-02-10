import { Booking } from "../../domain/model/Booking";
import { GeoLocation } from "../../domain/model/GeoLocation";
import { Provider } from "../../domain/model/Provider";
import { BookingRepository } from "../../domain/ports/BookingRepository";

export class InMemoryBookingRepository implements BookingRepository {
  private bookings: Map<string, Booking> = new Map();

  async save(booking: Booking): Promise<void> {
    this.bookings.set(booking.id, booking);
  }

  async findById(id: string): Promise<Booking | null> {
    return this.bookings.get(id) || null;
  }

  async findNearbyProviders(location: GeoLocation, radius: number): Promise<Provider[]> {
    // Logic for distance calculation would go here
    return [];
  }
}
