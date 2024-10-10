import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import backgroundImage from '@/assets/images/JOO.jpg'; // Replace with your actual home background image path

const HomePage = () => {
  const handlePressSection1 = () => {
    console.log('Navigate to Section 1');
    // Add navigation logic here
  };

  const handlePressSection2 = () => {
    console.log('Navigate to Section 2');
    // Add navigation logic here
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome Home!</Text>
        <Text style={styles.description}>
          This is your home base for managing your tasks and staying organized.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handlePressSection1}>
          <Text style={styles.buttonText}>Go to Section 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePressSection2}>
          <Text style={styles.buttonText}>Go to Section 2</Text>
        </TouchableOpacity>
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
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay for text readability
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FF5722',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomePage;
