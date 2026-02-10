import { Module, Provider } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { 
  RequestService, 
  InMemoryBookingRepository 
} from '@a2home/core';

const RequestServiceProvider: Provider = {
  provide: RequestService,
  useFactory: (repo: InMemoryBookingRepository) => {
    return new RequestService(repo);
  },
  inject: ['BOOKING_REPOSITORY'],
};

const RepositoryProvider: Provider = {
  provide: 'BOOKING_REPOSITORY',
  useClass: InMemoryBookingRepository,
};

@Module({
  controllers: [BookingController],
  providers: [
    RepositoryProvider,
    RequestServiceProvider,
  ],
})
export class BookingModule {}
