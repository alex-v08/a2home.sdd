import { Module, Provider } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { RequestService, BookingRepository } from '@a2home/core';
import { PostgresBookingRepository } from '../infrastructure/repositories/PostgresBookingRepository';

const RequestServiceProvider: Provider = {
  provide: RequestService,
  useFactory: (repo: BookingRepository) => {
    return new RequestService(repo);
  },
  inject: ['BOOKING_REPOSITORY'],
};

const RepositoryProvider: Provider = {
  provide: 'BOOKING_REPOSITORY',
  useClass: PostgresBookingRepository,
};

@Module({
  controllers: [BookingController],
  providers: [
    RepositoryProvider,
    RequestServiceProvider,
  ],
})
export class BookingModule {}
