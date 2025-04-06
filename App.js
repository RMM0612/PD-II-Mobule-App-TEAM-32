import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, ImageBackground, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import Home from './Home';
import DisplayPlant from './DisplayPlant';
import DisplaySetup from './DisplaySetup';
import Configure from './Configure';
import Settings from './Settings';

const Stack = createStackNavigator();

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const fadeAnim = useState(new Animated.Value(1))[0];

  // Start fade animation for welcome page
  const startFade = (navigation) => {
    setLoading(true);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000, 
      useNativeDriver: true,
    }).start(() => {
      setLoading(false);
      navigation.replace('Login');
    });
  };

  const handleLogin = (navigation) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
        navigation.navigate('Home');
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {/* Welcome Screen */}
        <Stack.Screen name="Welcome" options={{ headerShown: false }}>
          {(props) => (
            <ImageBackground source={require('./assets/BGimage.jpg')} style={styles.background}>
              <View style={styles.overlay}>
                <View style={styles.container}>
                  <Animated.View style={[styles.welcomeContainer, { opacity: fadeAnim }]}>
                    {loading && <ActivityIndicator size="large" color="#4F7942" style={styles.loader} />}
                    <Text style={styles.welcomeTitle}>Welcome to Lumina Flora</Text>
                    <Text style={styles.welcomeSubtitle}>Empowering Your Plants, One Tap at a Time.</Text>
                    <TouchableOpacity onPress={() => startFade(props.navigation)} style={styles.getStartedButton}>
                      <Text style={styles.getStartedText}>Get Started</Text>
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              </View>
            </ImageBackground>
          )}
        </Stack.Screen>

        {/* Login Screen */}
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => (
            <View style={styles.container}>
              <View style={styles.loginContainer}>
                <Ionicons name="person-circle-outline" size={80} color="#4F7942" style={styles.icon} />
                <Text style={styles.title}>Unlock Growth Potential</Text>
                <Text style={styles.subtitle}>Sign in to get started.</Text>

                {/* Email Input */}
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#888"
                  value={email}
                  onChangeText={setEmail}
                />
                
                {/* Password Input */}
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#888"
                    secureTextEntry={secureText}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                    <Ionicons name={secureText ? "eye-off" : "eye"} size={20} color="#888" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>Forgot your password?</Text>
                </TouchableOpacity>

                {/* Sign In Button */}
                <TouchableOpacity style={styles.button} onPress={() => handleLogin(props.navigation)} disabled={loading}>
                  {loading ? (  
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <>
                      <Text style={styles.buttonText}>Sign in</Text>
                      <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Stack.Screen>

        {/* Other Screens */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="DisplayPlant" component={DisplayPlant} />
        <Stack.Screen name="DisplaySetup" component={DisplaySetup} />
        <Stack.Screen name="Configure" component={Configure} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 20,
  },
  getStartedButton: {
    backgroundColor: '#4F7942',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  getStartedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    marginBottom: 20,
  },
  loginContainer: {
    width: '90%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingLeft: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
  },
  forgotPassword: {
    color: '#666',
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F7942',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
});