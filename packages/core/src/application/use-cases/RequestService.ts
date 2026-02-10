import { Booking, BookingStatus } from "../../domain/model/Booking";
import { GeoLocation } from "../../domain/model/GeoLocation";
import { Money } from "../../domain/model/Money";
import { BookingRepository } from "../../domain/ports/BookingRepository";

export interface RequestServiceInput {
  bookingId: string;
  clientId: string;
  serviceId: string;
  location: { latitude: number; longitude: number };
  price: { amount: number; currency: string };
}

export class RequestService {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async execute(input: RequestServiceInput): Promise<Booking> {
    const location = new GeoLocation(input.location.latitude, input.location.longitude);
    const price = new Money(input.price.amount, input.price.currency);

    const booking = new Booking(
      input.bookingId,
      input.clientId,
      "unassigned", // Initial state often has no provider assigned yet
      input.serviceId,
      BookingStatus.PENDING,
      price,
      location
    );

    await this.bookingRepository.save(booking);

    return booking;
  }
}
