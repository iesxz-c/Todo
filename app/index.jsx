import { View, Text, ImageBackground, TouchableOpacity,Image, StyleSheet } from 'react-native';
import React from 'react';
import JOO from '@/assets/images/JOO.jpg';
import ico from '@/assets/images/ico.png'
import { useRouter } from 'expo-router';

const App = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    console.log('Get Started button pressed');
   
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
          <Image source={ico} style={{width:300,height:300}}></Image>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={()=> router.push('/HomeScreen')}>
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
    fontFamily:"monospace",
    fontWeight:"bold",
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
