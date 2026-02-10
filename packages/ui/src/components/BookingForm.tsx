import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export const BookingForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [serviceId, setServiceId] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [amount, setAmount] = useState('');

  const handlePress = () => {
    onSubmit({
      serviceId,
      location: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
      price: { amount: parseFloat(amount), currency: 'USD' }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Home Service</Text>
      
      <Text>Service ID</Text>
      <TextInput style={styles.input} value={serviceId} onChangeText={setServiceId} placeholder="e.g. plumbing" />
      
      <Text>Latitude</Text>
      <TextInput style={styles.input} value={latitude} onChangeText={setLatitude} keyboardType="numeric" placeholder="-34.60" />
      
      <Text>Longitude</Text>
      <TextInput style={styles.input} value={longitude} onChangeText={setLongitude} keyboardType="numeric" placeholder="-58.38" />
      
      <Text>Amount</Text>
      <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder="1000" />
      
      <Button title="Book Now" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', borderRadius: 8 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 8 }
});
