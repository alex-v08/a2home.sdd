import React from 'react';
import { BookingForm } from '@a2home/ui';

export default function HomePage() {
  const handleSubmit = (data) => {
    console.log('Web Booking Request:', data);
    alert('Booking Submitted (Web)');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <BookingForm onSubmit={handleSubmit} />
    </div>
  );
}
