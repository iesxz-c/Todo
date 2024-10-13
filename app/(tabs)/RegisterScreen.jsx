import React, { useState } from 'react';
import { View, TextInput, ImageBackground, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { registerUser } from '../../api2';
import JOO from '@/assets/images/JOO.jpg';
import { useRouter } from 'expo-router';

const RegisterScreen = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await registerUser(username, email, password);
      Toast.show({
        type: 'success',
        text1: 'Registration Successful',
        text2: 'Now you can login 👋',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: error.detail || 'Please try again later',
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={JOO} resizeMode="cover" style={styles.background}>
        <View style={styles.container}>
          <View style={{ alignItems: "center", marginBottom: 30 }}>
            <Text style={styles.title}>Register</Text>
          </View>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            placeholderTextColor="white"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
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
          <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <View style={{ paddingTop: 22, alignItems: "flex-end", marginRight: 7 }}>
            <Text style={styles.loginText} onPress={()=> router.push('/Login')}>Login?</Text>
          </View>
        </View>
      </ImageBackground>

      {/* Toast component needs to be added at the root of the app */}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    marginTop: '60%',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
    borderRadius: 8,
  },
  title: {
    fontFamily: "monospace",
    fontWeight: "bold",
    color: "white",
    fontSize: 24,
  },
  input: {
    marginBottom: 10,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 8,
    padding: 8,
    width: 250,
    color:"white"
  },
  registerButton: {
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
  loginText: {
    fontFamily: "monospace",
    color: "white",
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;
