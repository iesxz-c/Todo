import React, { useState } from 'react';
import { View, TextInput, Button, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { loginUser } from '../../api2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import JOO from '@/assets/images/JOO.jpg';

const LoginScreen = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await loginUser(username, password);
      await AsyncStorage.setItem('accessToken', response.access_token);
      router.push('/HomeScreen');
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'Now you can explore👋',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.detail || 'Please try again later',
      });
    }
  };

  return (
    <ImageBackground source={JOO} resizeMode="cover" style={styles.background}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Login</Text>
        </View>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholderTextColor="white"
        />
        <TextInput
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          style={styles.input}
          placeholderTextColor="white"
        />
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText} onPress={()=> router.push('/RegisterScreen')}>Don't have an account? Register</Text>
        </View>
      </View>
      <Toast />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'white',
    padding: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add a semi-transparent background
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontFamily: "monospace",
    fontWeight: "bold",
    color: "white",
    fontSize: 24,
  },
  input: {
    marginBottom: 10,
    borderColor: "gray",color:"white",
    borderWidth: 2,
    borderRadius: 8,
    padding: 8,
    width: 250,
  },
  loginButton: {
    backgroundColor: 'orange',
    borderColor: "#eb8614",
    borderWidth: 2,
    borderRadius: 15,
    alignSelf: "center",
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: "monospace",
    fontSize: 18,
    color: "white",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  registerContainer: {
    paddingTop: 22,
    alignItems: "flex-end",
    marginRight: 7,
  },
  registerText: {
    fontFamily: "monospace",
    color: "white",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
