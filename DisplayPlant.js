import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground, 
  SafeAreaView,
  Dimensions,
} from 'react-native';
import axios from 'axios';

const { height, width } = Dimensions.get('window');

const earthyTones = ['#2b1a17', '#4a2c2a', '#654422', '#074710', '#016401'];

export default function DisplayPlant() {
  const [selectedRaspi, setSelectedRaspi] = useState(null);
  const [plantData, setPlantData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const raspberryPiURLs = {
    raspi1: 'http://192.168.1.29:5000/plant_data',
    raspi2: 'http://192.168.1.58:5002/plant_data',
  };

  useEffect(() => {
    if (selectedRaspi) {
      fetchPlantData();
    }
  }, [selectedRaspi]);

  const fetchPlantData = async () => {
    setLoading(true);
    setPlantData(null);
    setErrorMessage(null);

    if (!raspberryPiURLs[selectedRaspi]) {
      setErrorMessage('Raspberry Pi 2 is not available yet.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(raspberryPiURLs[selectedRaspi]);
      if (!response.data || !response.data.plants) {
        throw new Error('Invalid data received from server');
      }
      setPlantData(response.data);
    } catch (error) {
      setErrorMessage('Failed to fetch plant data. Please check your connection.');
      console.error(error);
    }
    setLoading(false);
  };

  if (!selectedRaspi) {
    return (
      <ImageBackground source={require('./assets/4.jpg')} style={styles.background}>
        <SafeAreaView style={styles.fullScreen}>
          <View style={styles.selectionContainer}>
            <Text style={styles.title}>🌿 Select a Plant</Text>
            <Text style={styles.subtitle}>Choose which crop setup to monitor</Text>

            <View style={styles.plantCardGrid}>
              <TouchableOpacity onPress={() => setSelectedRaspi('raspi1')} style={styles.plantOptionCard}>
                <Image source={require('./assets/let.png')} style={styles.plantImage} />
                <Text style={styles.plantName}>Lettuce</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setSelectedRaspi('raspi2')} style={styles.plantOptionCard}>
                <Image source={require('./assets/spi.png')} style={styles.plantImage} />
                <Text style={styles.plantName}>Spinach</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={require('./assets/2.jpg')} style={styles.background}>
      <SafeAreaView style={styles.fullScreen}>
        <Text style={styles.dataTitle}>
          🌡️ Environment Temperature:{' '}
          {plantData?.general_environment_temperature?.toFixed(2) ?? 'N/A'} °C
        </Text>

        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : (
          <FlatList
            data={plantData?.plants?.slice(0, 2) || []}
            keyExtractor={(item, index) => index.toString()}  
            renderItem={({ item, index }) => (
              <View style={[styles.plantCard, { backgroundColor: earthyTones[index % earthyTones.length] }]}>
                <Text style={styles.plantLabel}>Plant {item?.plant_id ?? 'N/A'}</Text>
                <Text style={styles.growthStage}>{item?.growth_stage ?? 'Unknown'}</Text>
              </View>
            )}
            numColumns={4}
            contentContainerStyle={styles.gridContainer}
            showsVerticalScrollIndicator={false}
          />
        )}

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.smallButton} onPress={fetchPlantData}>
            <Text style={styles.buttonText}>Refresh</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallButtonSecondary} onPress={() => setSelectedRaspi(null)}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  selectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#D6CFC7',
    marginBottom: 30,
    textAlign: 'center',
  },
  plantCardGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    flexWrap: 'wrap',
    rowGap: 20,
  },
  plantOptionCard: {
    width: width * 0.4,
    backgroundColor: 'rgba(28, 39, 10, 0.41)',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginVertical: 10,
  },
  plantImage: {
    width: 175,
    height: 175,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  plantName: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  dataTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#E0FFE0',
    marginVertical: 20,
    textAlign: 'center',
  },
  gridContainer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  plantCard: {
    padding: 12,
    margin: 6,
    borderRadius: 10,
    alignItems: 'center',
    width: '22%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  plantLabel: {
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
    color: '#FFF',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  growthStage: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: '#F5F5F5',
    opacity: 0.9,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: 'red',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  smallButton: {
    backgroundColor: '#388E3C',
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  smallButtonSecondary: {
    backgroundColor: '#A5A5A5',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    fontSize: 14,
  },
});
