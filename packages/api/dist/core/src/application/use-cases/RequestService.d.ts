import { Booking } from "../../domain/model/Booking";
import { BookingRepository } from "../../domain/ports/BookingRepository";
export interface RequestServiceInput {
    bookingId: string;
    clientId: string;
    serviceId: string;
    location: {
        latitude: number;
        longitude: number;
    };
    price: {
        amount: number;
        currency: string;
    };
}
export declare class RequestService {
    private readonly bookingRepository;
    constructor(bookingRepository: BookingRepository);
    execute(input: RequestServiceInput): Promise<Booking>;
}
