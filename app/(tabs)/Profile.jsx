import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserInfo } from '../../api2';
import JOO from '@/assets/images/JOO.jpg'; 
import { useRouter } from 'expo-router';

const Profile = () => {
  const router = useRouter(); 

  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
          setError('No token found');
          return;
        }
        const user = await getUserInfo(token);
        setUserInfo(user);
      } catch (error) {
        setError(error.detail || 'Failed to load user data');
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken'); 
    router.push('/Login'); 
  };
  const goToHome = () => {
    router.push('/HomeScreen'); 
  };

  return (
    <ImageBackground source={JOO} resizeMode="cover" style={styles.background}>
      <View style={styles.container}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : userInfo ? (
          <Text style={styles.welcomeText}>Welcome, {userInfo.username}!</Text>
        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
        )}
        <TouchableOpacity onPress={goToHome} style={styles.button}>
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
        <Button title="Logout" onPress={handleLogout} color="orange" />
      </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
    fontFamily: 'monospace',
  },
  loadingText: {
    color: 'white',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  button: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'orange',
    borderRadius: 8,
    alignItems: 'center',
    width: '80%', // Adjust width as needed
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'monospace',
  },
});

export default Profile;
