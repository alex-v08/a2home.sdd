import { BookingRepository } from "../../domain/ports/BookingRepository";
import { BookingStatus } from "../../domain/model/Booking";

export interface AcceptBookingInput {
  bookingId: string;
  providerId: string;
}

export class AcceptBooking {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async execute(input: AcceptBookingInput): Promise<void> {
    const booking = await this.bookingRepository.findById(input.bookingId);

    if (!booking) {
      throw new Error(`Booking with ID ${input.bookingId} not found`);
    }

    if (booking.status !== BookingStatus.PENDING) {
      throw new Error(`Booking is not pending. Current status: ${booking.status}`);
    }

    // Create a new Booking instance with updated status and providerId
    const updatedBooking = Object.assign(
      Object.create(Object.getPrototypeOf(booking)),
      booking,
      {
        status: BookingStatus.CONFIRMED,
        providerId: input.providerId,
      }
    );

    await this.bookingRepository.save(updatedBooking);
  }
}
