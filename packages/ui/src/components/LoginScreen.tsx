import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (role: 'CLIENT' | 'PROVIDER') => {
    setLoading(true);
    try {
      const id = role === 'CLIENT' ? 'client_001' : 'provider_001';
      const response = await fetch(`${API_BASE_URL}/auth/login-mock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, id }),
      });

      const data = await response.json();
      login(data.access_token, data.user);
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>A2Home Login</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Login as Client"
          onPress={() => handleLogin('CLIENT')}
          disabled={loading}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Login as Provider"
          onPress={() => handleLogin('PROVIDER')}
          disabled={loading}
        />
      </View>
      {loading && <Text>Loading...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 15,
  },
});
