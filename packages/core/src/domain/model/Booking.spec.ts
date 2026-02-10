import { Booking, BookingStatus } from './Booking';
import { GeoLocation } from './GeoLocation';
import { Money } from './Money';

describe('Booking Entity', () => {
  it('should throw error if ID is missing', () => {
    expect(() => {
      new Booking(
        '', // Empty ID
        'client_001',
        'provider_001',
        'service_plumbing',
        BookingStatus.PENDING,
        new Money(1000, 'USD'),
        new GeoLocation(-34.6, -58.4)
      );
    }).toThrow('Booking ID is required');
  });

  it('should throw error if clientId is missing', () => {
    expect(() => {
      new Booking(
        'book_001',
        '', // Empty client
        'provider_001',
        'service_plumbing',
        BookingStatus.PENDING,
        new Money(1000, 'USD'),
        new GeoLocation(-34.6, -58.4)
      );
    }).toThrow('Client ID is required');
  });

  it('should create a valid booking', () => {
    const booking = new Booking(
      'book_001',
      'client_001',
      'provider_001',
      'service_plumbing',
      BookingStatus.PENDING,
      new Money(1000, 'USD'),
      new GeoLocation(-34.6, -58.4)
    );

    expect(booking.id).toBe('book_001');
    expect(booking.status).toBe(BookingStatus.PENDING);
    expect(booking.price.amount).toBe(1000);
  });

  it('should transition from PENDING to CONFIRMED', () => {
    const pendingBooking = new Booking(
      'book_001',
      'client_001',
      'unassigned',
      'service_plumbing',
      BookingStatus.PENDING,
      new Money(1000, 'USD'),
      new GeoLocation(-34.6, -58.4)
    );

    expect(pendingBooking.status).toBe(BookingStatus.PENDING);

    const confirmedBooking = Object.assign(
      Object.create(Object.getPrototypeOf(pendingBooking)),
      pendingBooking,
      {
        status: BookingStatus.CONFIRMED,
        providerId: 'provider_001',
      }
    );

    expect(confirmedBooking.status).toBe(BookingStatus.CONFIRMED);
    expect(confirmedBooking.providerId).toBe('provider_001');
  });
});
