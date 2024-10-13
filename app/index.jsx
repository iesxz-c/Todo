import { View, Text, ImageBackground, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import JOO from '@/assets/images/JOO.jpg';
import ico from '@/assets/images/ico.png';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
    };

    checkLoginStatus();
  }, []);

  const handleGetStarted = () => {
    console.log('Get Started button pressed');
    if (isLoggedIn) {
      router.push('/Profile'); // Navigate to Profile if logged in
    } else {
      router.push('/RegisterScreen'); // Navigate to RegisterScreen if not logged in
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={JOO}
        resizeMode='cover'
        style={styles.background}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Onsoul Todo
          </Text>
          <Image source={ico} style={{ width: 300, height: 300 }} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  titleContainer: {
    flex: 1, 
    justifyContent: 'center', 
  },
  title: {
    fontSize: 25,
    color: 'white',
    fontFamily: "monospace",
    fontWeight: "bold",
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 30,
    width: '60%', 
  },
  button: {
    backgroundColor: 'orange', 
    height: 60,
    justifyContent: 'center',
    alignItems: 'center', 
    borderRadius: 30,
  },
  buttonText: {
    color: 'white', 
    fontSize: 18, 
    textAlign: 'center', 
  },
});

export default App;
