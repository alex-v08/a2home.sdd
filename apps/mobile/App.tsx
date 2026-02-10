import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Alert, Text } from 'react-native';
import { BookingForm } from '@a2home/ui';

// Use 10.0.2.2 for Android Emulator, localhost for iOS
const API_BASE_URL = 'http://10.0.2.2:3000';

export default function App() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: `book_${Date.now()}`,
          clientId: 'client_mobile_001',
          ...data,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      Alert.alert('Success', `Booking created! ID: ${result.id}`);
      console.log('Booking result:', result);
    } catch (err: any) {
      Alert.alert('Error', `Failed to create booking: ${err.message}`);
      console.error('Booking error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {loading && <Text style={styles.loading}>Creating booking...</Text>}
        <BookingForm onSubmit={handleSubmit} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  loading: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
    color: '#666',
  },
});
