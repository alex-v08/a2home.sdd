import { 
  Booking, 
  BookingRepository, 
  GeoLocation, 
  Money, 
  BookingStatus as DomainStatus,
  Provider
} from '@a2home/core';
import { PrismaClient, BookingStatus as PrismaStatus } from '@prisma/client';

export class PostgresBookingRepository implements BookingRepository {
  private prisma = new PrismaClient();

  async save(booking: Booking): Promise<void> {
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

  async findById(id: string): Promise<Booking | null> {
    const record = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!record) return null;

    return new Booking(
      record.id,
      record.clientId,
      record.providerId,
      record.serviceId,
      this.toDomainStatus(record.status),
      new Money(record.amount, record.currency),
      new GeoLocation(record.latitude, record.longitude)
    );
  }

  async findNearbyProviders(location: GeoLocation, radius: number): Promise<Provider[]> {
    // This would ideally use PostGIS or a raw query, but for now we return empty as per core spec
    return [];
  }

  private toPrismaStatus(status: DomainStatus): PrismaStatus {
    return status as unknown as PrismaStatus;
  }

  private toDomainStatus(status: PrismaStatus): DomainStatus {
    return status as unknown as DomainStatus;
  }
}
