import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useBookingSocket } from '../hooks/useBookingSocket';

export const BookingStatusTracker = ({ bookingId }: { bookingId: string }) => {
  const { bookingUpdate, connected } = useBookingSocket(bookingId);
  const [status, setStatus] = useState<'PENDING' | 'CONFIRMED'>('PENDING');

  React.useEffect(() => {
    if (bookingUpdate && bookingUpdate.status === 'CONFIRMED') {
      setStatus('CONFIRMED');
    }
  }, [bookingUpdate]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Status</Text>
      <Text style={styles.bookingId}>ID: {bookingId}</Text>
      
      {!connected && <Text style={styles.warning}>Connecting to server...</Text>}
      
      {status === 'PENDING' ? (
        <View style={styles.pendingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.statusText}>Waiting for Provider...</Text>
          <Text style={styles.subtitle}>Your request is being reviewed by nearby providers</Text>
        </View>
      ) : (
        <View style={styles.confirmedContainer}>
          <Text style={styles.successIcon}>✓</Text>
          <Text style={styles.statusText}>Provider on the way!</Text>
          <Text style={styles.subtitle}>Provider ID: {bookingUpdate?.providerId}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bookingId: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  warning: {
    color: '#ff9500',
    marginBottom: 10,
  },
  pendingContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  confirmedContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  successIcon: {
    fontSize: 60,
    color: '#34C759',
  },
});
