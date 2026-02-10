"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcceptBooking = void 0;
const Booking_1 = require("../../domain/model/Booking");
class AcceptBooking {
    constructor(bookingRepository) {
        this.bookingRepository = bookingRepository;
    }
    async execute(input) {
        const booking = await this.bookingRepository.findById(input.bookingId);
        if (!booking) {
            throw new Error(`Booking with ID ${input.bookingId} not found`);
        }
        if (booking.status !== Booking_1.BookingStatus.PENDING) {
            throw new Error(`Booking is not pending. Current status: ${booking.status}`);
        }
        const updatedBooking = Object.assign(Object.create(Object.getPrototypeOf(booking)), booking, {
            status: Booking_1.BookingStatus.CONFIRMED,
            providerId: input.providerId,
        });
        await this.bookingRepository.save(updatedBooking);
    }
}
exports.AcceptBooking = AcceptBooking;
//# sourceMappingURL=AcceptBooking.js.map