import { Controller, Post, Body, Get, Patch, Param } from '@nestjs/common';
import { RequestService, RequestServiceInput, AcceptBooking, BookingRepository } from '@a2home/core';

@Controller('bookings')
export class BookingController {
  constructor(
    private readonly requestService: RequestService,
    private readonly acceptBooking: AcceptBooking,
    private readonly bookingRepository: BookingRepository
  ) {}

  @Post()
  async create(@Body() input: RequestServiceInput) {
    return await this.requestService.execute(input);
  }

  @Get('pending')
  async getPending() {
    return await this.bookingRepository.findPending();
  }

  @Patch(':id/accept')
  async accept(@Param('id') id: string, @Body() body: { providerId: string }) {
    await this.acceptBooking.execute({ bookingId: id, providerId: body.providerId });
    return { message: 'Booking accepted successfully' };
  }
}
