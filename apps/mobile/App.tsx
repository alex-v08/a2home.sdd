import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Alert, Text, Button } from 'react-native';
import { 
  BookingForm, 
  ProviderBookingList, 
  LoginScreen, 
  AuthProvider, 
  useAuth,
  useBookingService 
} from '@a2home/ui';

function AppContent() {
  const [mode, setMode] = useState<'client' | 'provider'>('client');
  const { user, token, logout } = useAuth();
  const { createBooking, loading } = useBookingService();

  const handleSubmit = async (data: any) => {
    try {
      const result = await createBooking(data);
      Alert.alert('Success', `Booking created! ID: ${result.id}`);
    } catch (err: any) {
      Alert.alert('Error', `Failed to create booking: ${err.message}`);
    }
  };

  if (!token) {
    return <LoginScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>Role: {user?.role}</Text>
        <Button title="Logout" onPress={logout} />
        {user?.role === 'CLIENT' && (
          <Button 
            title="Switch to Provider View" 
            onPress={() => setMode('provider')}
          />
        )}
        {user?.role === 'PROVIDER' && mode === 'provider' && (
          <Button 
            title="Switch to Client View" 
            onPress={() => setMode('client')}
          />
        )}
      </View>
      <View style={styles.content}>
        {(mode === 'client' || user?.role === 'CLIENT') ? (
          <>
            {loading && <Text style={styles.loading}>Creating booking...</Text>}
            <BookingForm onSubmit={handleSubmit} />
          </>
        ) : (
          <ProviderBookingList />
        )}
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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
