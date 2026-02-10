import { Booking, BookingRepository, GeoLocation, Provider } from '@a2home/core';
export declare class PostgresBookingRepository implements BookingRepository {
    private prisma;
    save(booking: Booking): Promise<void>;
    findById(id: string): Promise<Booking | null>;
    findPending(): Promise<Booking[]>;
    findNearbyProviders(location: GeoLocation, radius: number): Promise<Provider[]>;
    private toPrismaStatus;
    private toDomainStatus;
}
