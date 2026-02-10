import { RequestService, AcceptBooking, BookingRepository } from '@a2home/core';
import { BookingGateway } from './booking.gateway';
import { CreateBookingDto } from './dto/create-booking.dto';
export declare class BookingController {
    private readonly requestService;
    private readonly acceptBooking;
    private readonly bookingRepository;
    private readonly bookingGateway;
    constructor(requestService: RequestService, acceptBooking: AcceptBooking, bookingRepository: BookingRepository, bookingGateway: BookingGateway);
    create(input: CreateBookingDto, user: any): Promise<import("@a2home/core").Booking>;
    getPending(): Promise<import("@a2home/core").Booking[]>;
    accept(id: string, user: any): Promise<{
        message: string;
    }>;
}
