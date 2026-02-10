"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestService = void 0;
const Booking_1 = require("../../domain/model/Booking");
const GeoLocation_1 = require("../../domain/model/GeoLocation");
const Money_1 = require("../../domain/model/Money");
class RequestService {
    constructor(bookingRepository) {
        this.bookingRepository = bookingRepository;
    }
    async execute(input) {
        const location = new GeoLocation_1.GeoLocation(input.location.latitude, input.location.longitude);
        const price = new Money_1.Money(input.price.amount, input.price.currency);
        const booking = new Booking_1.Booking(input.bookingId, input.clientId, "unassigned", input.serviceId, Booking_1.BookingStatus.PENDING, price, location);
        await this.bookingRepository.save(booking);
        return booking;
    }
}
exports.RequestService = RequestService;
//# sourceMappingURL=RequestService.js.map