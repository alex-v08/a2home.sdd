import { RequestService } from './RequestService';
import { BookingRepository } from '../../domain/ports/BookingRepository';
import { Booking, BookingStatus } from '../../domain/model/Booking';
import { GeoLocation } from '../../domain/model/GeoLocation';
import { Provider } from '../../domain/model/Provider';

// Mock Repository
class MockBookingRepository implements BookingRepository {
  private bookings: Booking[] = [];

  async save(booking: Booking): Promise<void> {
    this.bookings.push(booking);
  }

  async findById(id: string): Promise<Booking | null> {
    return this.bookings.find(b => b.id === id) || null;
  }

  async findPending(): Promise<Booking[]> {
    return this.bookings.filter(b => b.status === BookingStatus.PENDING);
  }

  async findNearbyProviders(location: GeoLocation, radius: number): Promise<Provider[]> {
    return [];
  }

  getAll() {
    return this.bookings;
  }
}

describe('RequestService Use Case', () => {
  let requestService: RequestService;
  let mockRepository: MockBookingRepository;

  beforeEach(() => {
    mockRepository = new MockBookingRepository();
    requestService = new RequestService(mockRepository);
  });

  it('should create a pending booking and save it', async () => {
    const input = {
      bookingId: 'book_test_001',
      clientId: 'client_001',
      serviceId: 'service_plumbing',
      location: { latitude: -34.6037, longitude: -58.3816 },
      price: { amount: 5000, currency: 'ARS' },
    };

    const booking = await requestService.execute(input);

    expect(booking.id).toBe('book_test_001');
    expect(booking.status).toBe(BookingStatus.PENDING);
    expect(booking.clientId).toBe('client_001');

    // Verify it was saved
    const saved = await mockRepository.findById('book_test_001');
    expect(saved).not.toBeNull();
    expect(saved?.status).toBe(BookingStatus.PENDING);
  });

  it('should throw error if location is invalid', async () => {
    const input = {
      bookingId: 'book_test_002',
      clientId: 'client_001',
      serviceId: 'service_plumbing',
      location: { latitude: 999, longitude: -58.3816 }, // Invalid latitude
      price: { amount: 5000, currency: 'ARS' },
    };

    await expect(requestService.execute(input)).rejects.toThrow('Invalid latitude');
  });

  it('should throw error if price amount is negative', async () => {
    const input = {
      bookingId: 'book_test_003',
      clientId: 'client_001',
      serviceId: 'service_plumbing',
      location: { latitude: -34.6037, longitude: -58.3816 },
      price: { amount: -100, currency: 'ARS' }, // Negative amount
    };

    await expect(requestService.execute(input)).rejects.toThrow('Amount cannot be negative');
  });
});
