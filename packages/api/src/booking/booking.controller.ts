import { Controller, Post, Body } from '@nestjs/common';
import { RequestService, RequestServiceInput } from '@a2home/core';

@Controller('bookings')
export class BookingController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  async create(@Body() input: RequestServiceInput) {
    return await this.requestService.execute(input);
  }
}
