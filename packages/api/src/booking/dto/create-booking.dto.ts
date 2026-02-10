import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ example: 'srv_plumbing', description: 'Service identifier' })
  serviceId: string;

  @ApiProperty({ 
    example: { latitude: -34.6037, longitude: -58.3816 }, 
    description: 'Geographic location for the service' 
  })
  location: { latitude: number; longitude: number };

  @ApiProperty({ 
    example: { amount: 5000, currency: 'ARS' }, 
    description: 'Price for the service' 
  })
  price: { amount: number; currency: string };

  @ApiProperty({ 
    required: false, 
    example: 'book_1234567890', 
    description: 'Optional custom booking ID' 
  })
  bookingId?: string;
}
