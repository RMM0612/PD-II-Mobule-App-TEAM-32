import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, ImageBackground, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function DisplaySetup() {
  const [setupData, setSetupData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSetupData();
  }, []);

  const fetchSetupData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://192.168.1.29:5000/setup_data');
      setSetupData(response.data);
    } catch (error) {
      Alert.alert('Error', `Failed to fetch setup data: ${error.message}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Define different colors for growlight containers
  const growlightColors = ['#173518', '#1e4620', '#265828', '#2e6930', '#357a38', '#3d8c40']; // Added a 6th color

  return (
    <ImageBackground
      source={require('./assets/3.jpg')}
      style={styles.container}
    >
      <Text style={styles.title}>Display Setup Data</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#6B8E4E" />
      ) : setupData ? (
        <ScrollView style={styles.dataContainer}>
          <Text style={styles.dataText}>Ambient Sunlight: {setupData.ambient_sunlight} lux</Text>
          <Text style={styles.subTitle}>Grow Lights 💡 </Text>

          {setupData.growlights.map((growlight, index) => (
            <View
              key={index}
              style={[
                styles.growlightContainer,
                { backgroundColor: growlightColors[index % growlightColors.length] }, // Cycles through colors
              ]}
            >
              <Text style={styles.growlightText}>Growlight {growlight.growlight_id}</Text>
              <Text style={styles.growlightText}>Light Color: {growlight['light color']}</Text>
              <Text style={styles.growlightText}>Light Intensity: {growlight['light intensity']} lux</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.loadingText}>No data available.</Text>
      )}

      {/* Retry Button */}
      <TouchableOpacity style={styles.retryButton} onPress={fetchSetupData}>
        <Text style={styles.retryButtonText}>Refresh</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  dataContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Faded white background (more transparent)
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 }, // Soft shadow for floating effect
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width: '100%',
  },
  subTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#101010',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  dataText: {
    fontSize: 18,
    color: '#3C5148',
    marginBottom: 10,
  },
  growlightContainer: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1, // Black border for a strong embossed effect
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  growlightText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  loadingText: {
    fontSize: 18,
    color: '#B2C5B2',
    marginTop: 20,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#808080',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  retryButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
