import React from 'react';
import { SafeAreaView, StyleSheet, View, Alert } from 'react-native';
import { BookingForm } from '@a2home/ui';

export default function App() {
  const handleSubmit = (data: any) => {
    console.log('Mobile Booking Request:', data);
    Alert.alert('Booking Submitted', JSON.stringify(data, null, 2));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
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
});
