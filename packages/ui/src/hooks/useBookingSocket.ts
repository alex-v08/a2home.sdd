import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface BookingUpdate {
  bookingId: string;
  providerId: string;
  status: string;
  timestamp: string;
}

export const useBookingSocket = (bookingId: string | null) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [bookingUpdate, setBookingUpdate] = useState<BookingUpdate | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!bookingId) return;

    const newSocket = io(API_BASE_URL);

    newSocket.on('connect', () => {
      console.log('Socket connected');
      setConnected(true);
      newSocket.emit('join_booking', bookingId);
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
      setConnected(false);
    });

    newSocket.on('booking_confirmed', (data: BookingUpdate) => {
      console.log('Booking confirmed:', data);
      setBookingUpdate(data);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [bookingId]);

  return { socket, bookingUpdate, connected };
};
