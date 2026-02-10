import React, { useState } from 'react';
import { BookingForm, useBookingService, LoginScreen, useAuth, BookingStatusTracker } from '@a2home/ui';

export default function HomePage() {
  const { createBooking, loading, error } = useBookingService();
  const { user, token, logout } = useAuth();
  const [currentBookingId, setCurrentBookingId] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    try {
      const result = await createBooking(data);
      setCurrentBookingId(result.id);
      console.log('Booking result:', result);
    } catch (err) {
      alert(`Failed to create booking: ${error || 'Unknown error'}`);
      console.error('Booking error:', err);
    }
  };

  if (!token) {
    return <LoginScreen />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <div style={{ position: 'absolute', top: 20, right: 20 }}>
        <span>Logged in as: {user?.role}</span>
        <button onClick={logout} style={{ marginLeft: 10 }}>Logout</button>
      </div>
      {loading && <div style={{ position: 'absolute', top: 20 }}>Loading...</div>}
      
      {currentBookingId ? (
        <div>
          <BookingStatusTracker bookingId={currentBookingId} />
          <button onClick={() => setCurrentBookingId(null)} style={{ marginTop: 20 }}>
            Create New Booking
          </button>
        </div>
      ) : (
        <BookingForm onSubmit={handleSubmit} />
      )}
    </div>
  );
}
