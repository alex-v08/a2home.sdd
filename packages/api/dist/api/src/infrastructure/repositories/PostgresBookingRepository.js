"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresBookingRepository = void 0;
const core_1 = require("../../../../core/src/index");
const client_1 = require("@prisma/client");
class PostgresBookingRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async save(booking) {
        const data = {
            id: booking.id,
            clientId: booking.clientId,
            providerId: booking.providerId,
            serviceId: booking.serviceId,
            status: this.toPrismaStatus(booking.status),
            amount: booking.price.amount,
            currency: booking.price.currency,
            latitude: booking.location.latitude,
            longitude: booking.location.longitude,
        };
        await this.prisma.booking.upsert({
            where: { id: booking.id },
            update: data,
            create: data,
        });
    }
    async findById(id) {
        const record = await this.prisma.booking.findUnique({
            where: { id },
        });
        if (!record)
            return null;
        return new core_1.Booking(record.id, record.clientId, record.providerId, record.serviceId, this.toDomainStatus(record.status), new core_1.Money(record.amount, record.currency), new core_1.GeoLocation(record.latitude, record.longitude));
    }
    async findPending() {
        const records = await this.prisma.booking.findMany({
            where: { status: client_1.BookingStatus.PENDING },
        });
        return records.map(record => new core_1.Booking(record.id, record.clientId, record.providerId, record.serviceId, this.toDomainStatus(record.status), new core_1.Money(record.amount, record.currency), new core_1.GeoLocation(record.latitude, record.longitude)));
    }
    async findNearbyProviders(location, radius) {
        return [];
    }
    toPrismaStatus(status) {
        return status;
    }
    toDomainStatus(status) {
        return status;
    }
}
exports.PostgresBookingRepository = PostgresBookingRepository;
//# sourceMappingURL=PostgresBookingRepository.js.map