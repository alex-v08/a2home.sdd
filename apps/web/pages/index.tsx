import React from 'react';
import { BookingForm, useBookingService } from '@a2home/ui';

export default function HomePage() {
  const { createBooking, loading, error } = useBookingService();

  const handleSubmit = async (data: any) => {
    try {
      const result = await createBooking(data);
      alert(`Booking created successfully! ID: ${result.id}`);
      console.log('Booking result:', result);
    } catch (err) {
      alert(`Failed to create booking: ${error || 'Unknown error'}`);
      console.error('Booking error:', err);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      {loading && <div style={{ position: 'absolute', top: 20 }}>Loading...</div>}
      <BookingForm onSubmit={handleSubmit} />
    </div>
  );
}
