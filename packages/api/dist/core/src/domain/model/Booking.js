"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = exports.BookingStatus = void 0;
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["PENDING"] = "PENDING";
    BookingStatus["CONFIRMED"] = "CONFIRMED";
    BookingStatus["IN_PROGRESS"] = "IN_PROGRESS";
    BookingStatus["COMPLETED"] = "COMPLETED";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
class Booking {
    constructor(id, clientId, providerId, serviceId, status, price, location) {
        this.id = id;
        this.clientId = clientId;
        this.providerId = providerId;
        this.serviceId = serviceId;
        this.status = status;
        this.price = price;
        this.location = location;
        this.validate();
    }
    validate() {
        if (!this.id)
            throw new Error("Booking ID is required.");
        if (!this.clientId)
            throw new Error("Client ID is required.");
        if (!this.providerId)
            throw new Error("Provider ID is required.");
        if (!this.serviceId)
            throw new Error("Service ID is required.");
    }
}
exports.Booking = Booking;
//# sourceMappingURL=Booking.js.map