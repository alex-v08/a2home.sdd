import { Controller, Post, Body, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { RequestService, RequestServiceInput, AcceptBooking, BookingRepository } from '@a2home/core';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { BookingGateway } from './booking.gateway';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingController {
  constructor(
    private readonly requestService: RequestService,
    private readonly acceptBooking: AcceptBooking,
    private readonly bookingRepository: BookingRepository,
    private readonly bookingGateway: BookingGateway
  ) {}

  @Post()
  async create(@Body() input: Omit<RequestServiceInput, 'clientId'>, @CurrentUser() user: any) {
    const fullInput: RequestServiceInput = {
      ...input,
      clientId: user.userId,
      bookingId: input.bookingId || `book_${Date.now()}`,
    };
    return await this.requestService.execute(fullInput);
  }

  @Get('pending')
  async getPending() {
    return await this.bookingRepository.findPending();
  }

  @Patch(':id/accept')
  async accept(@Param('id') id: string, @CurrentUser() user: any) {
    await this.acceptBooking.execute({ bookingId: id, providerId: user.userId });
    
    // Notify via WebSocket
    this.bookingGateway.notifyBookingConfirmed(id, user.userId);
    
    return { message: 'Booking accepted successfully' };
  }
}
