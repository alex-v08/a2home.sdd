import { Controller, Post, Body, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RequestService, RequestServiceInput, AcceptBooking, BookingRepository } from '@a2home/core';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { BookingGateway } from './booking.gateway';
import { CreateBookingDto } from './dto/create-booking.dto';

@ApiTags('Bookings')
@ApiBearerAuth()
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
  @ApiOperation({ summary: 'Create a new booking request', description: 'Client creates a service booking. ClientId is extracted from JWT token.' })
  @ApiResponse({ status: 201, description: 'Booking created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() input: CreateBookingDto, @CurrentUser() user: any) {
    const fullInput: RequestServiceInput = {
      ...input,
      clientId: user.userId,
      bookingId: input.bookingId || `book_${Date.now()}`,
    };
    return await this.requestService.execute(fullInput);
  }

  @Get('pending')
  @ApiOperation({ summary: 'Get all pending bookings', description: 'Providers can see all bookings waiting for acceptance' })
  @ApiResponse({ status: 200, description: 'List of pending bookings' })
  async getPending() {
    return await this.bookingRepository.findPending();
  }

  @Patch(':id/accept')
  @ApiOperation({ summary: 'Accept a booking', description: 'Provider accepts a booking. ProviderId is extracted from JWT token. Triggers real-time WebSocket notification to client.' })
  @ApiResponse({ status: 200, description: 'Booking accepted and client notified' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async accept(@Param('id') id: string, @CurrentUser() user: any) {
    await this.acceptBooking.execute({ bookingId: id, providerId: user.userId });
    
    // Notify via WebSocket
    this.bookingGateway.notifyBookingConfirmed(id, user.userId);
    
    return { message: 'Booking accepted successfully' };
  }
}
