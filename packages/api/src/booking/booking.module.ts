import { Module, Provider } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingGateway } from './booking.gateway';
import { RequestService, AcceptBooking, BookingRepository } from '@a2home/core';
import { PostgresBookingRepository } from '../infrastructure/repositories/PostgresBookingRepository';

const RepositoryProvider: Provider = {
  provide: 'BOOKING_REPOSITORY',
  useClass: PostgresBookingRepository,
};

const RequestServiceProvider: Provider = {
  provide: RequestService,
  useFactory: (repo: BookingRepository) => {
    return new RequestService(repo);
  },
  inject: ['BOOKING_REPOSITORY'],
};

const AcceptBookingProvider: Provider = {
  provide: AcceptBooking,
  useFactory: (repo: BookingRepository) => {
    return new AcceptBooking(repo);
  },
  inject: ['BOOKING_REPOSITORY'],
};

@Module({
  controllers: [BookingController],
  providers: [
    BookingGateway,
    RepositoryProvider,
    RequestServiceProvider,
    AcceptBookingProvider,
  ],
})
export class BookingModule {}
