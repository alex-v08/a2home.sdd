import { BookingRepository } from "../../domain/ports/BookingRepository";
export interface AcceptBookingInput {
    bookingId: string;
    providerId: string;
}
export declare class AcceptBooking {
    private readonly bookingRepository;
    constructor(bookingRepository: BookingRepository);
    execute(input: AcceptBookingInput): Promise<void>;
}
