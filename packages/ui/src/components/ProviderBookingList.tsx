import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface Booking {
  id: string;
  serviceId: string;
  status: string;
  price: { amount: number; currency: string };
  location: { latitude: number; longitude: number };
}

export const ProviderBookingList = ({ providerId }: { providerId: string }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPendingBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/pending`);
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const acceptBooking = async (bookingId: string) => {
    try {
      await fetch(`${API_BASE_URL}/bookings/${bookingId}/accept`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerId }),
      });
      // Refresh the list
      fetchPendingBookings();
    } catch (err) {
      console.error('Failed to accept booking:', err);
    }
  };

  useEffect(() => {
    fetchPendingBookings();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Bookings</Text>
      {bookings.length === 0 ? (
        <Text>No pending bookings</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text>Service: {item.serviceId}</Text>
              <Text>Price: {item.price.amount} {item.price.currency}</Text>
              <Text>Location: {item.location.latitude}, {item.location.longitude}</Text>
              <Button title="Accept" onPress={() => acceptBooking(item.id)} />
            </View>
          )}
        />
      )}
      <Button title="Refresh" onPress={fetchPendingBookings} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 8 },
});
