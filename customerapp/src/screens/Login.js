import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const BASE_URL =
    Platform.OS === 'android'
      ? 'http://10.0.2.2:2500'
      : 'http://localhost:2500';
  const handleLogin = async () => {
    try {
        const res = await axios.post(`${BASE_URL}/api/customers/login`, {
            email,
            password,
          });
          
      await AsyncStorage.setItem('token', res.data.token);
      Alert.alert('Success', 'Login successful');
      navigation.replace('Home');
    } catch (err) {
      Alert.alert(
        'Login Failed',
        err.response?.data?.message || 'Something went wrong',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        Don’t have an account? Register here
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7fbfc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  link: {
    marginTop: 15,
    color: 'blue',
    textAlign: 'center',
  },
});

export default LoginScreen;
