import { Module } from '@nestjs/common';
import { BookingModule } from './booking/booking.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, BookingModule],
})
export class AppModule {}
