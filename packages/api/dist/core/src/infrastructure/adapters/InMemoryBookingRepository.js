"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryBookingRepository = void 0;
const Booking_1 = require("../../domain/model/Booking");
class InMemoryBookingRepository {
    constructor() {
        this.bookings = new Map();
    }
    async save(booking) {
        this.bookings.set(booking.id, booking);
    }
    async findById(id) {
        return this.bookings.get(id) || null;
    }
    async findPending() {
        return Array.from(this.bookings.values()).filter(b => b.status === Booking_1.BookingStatus.PENDING);
    }
    async findNearbyProviders(location, radius) {
        return [];
    }
}
exports.InMemoryBookingRepository = InMemoryBookingRepository;
//# sourceMappingURL=InMemoryBookingRepository.js.map