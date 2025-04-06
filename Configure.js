import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image, Dimensions, ImageBackground } from 'react-native';
import axios from 'axios';

const { width, height } = Dimensions.get("window");

export default function Configure() {
  const [selectedCategory, setSelectedCategory] = useState(null);  // Main category (Growlights or Fans)
  const [currentIndex, setCurrentIndex] = useState(1);  // Track the current Growlight or Fan being configured
  const [intensity, setIntensity] = useState(20);  // Starting intensity for Growlights (default to Low)
  const [fanSpeed, setFanSpeed] = useState('Low');  // Starting fan speed (Low, Medium, High)
  const [color, setColor] = useState('blue');  // Default color for Growlights
  const [isAutoMode, setIsAutoMode] = useState(false);  // Toggle for Auto/Manual mode

  const sendData = async (data) => {
    try {
      const response = await axios.post('http://192.168.1.29:5000/configure', data);
      if (response.data.status === 'success') {
        Alert.alert('Success', response.data.message);
      } else {
        Alert.alert('Error', 'Failed to update configuration');
      }
    } catch (error) {
      Alert.alert('Error', `Failed to send data: ${error.message}`);
      console.error(error);
    }
  };

  // Fan Speed adjustment logic: set the fan speed directly based on the button clicked
  const setFanSpeedOption = (speed) => {
    if (!isAutoMode) {  // Ensure control is only available in Manual mode
      setFanSpeed(speed);
      sendData({ fan_id: currentIndex, speed: speed });
    }
  };

  // Intensity control function for Growlights (Low, Medium, High, Off)
  const setIntensityOption = (level) => {
    if (!isAutoMode) {  // Ensure control is only available in Manual mode
      let newIntensity;
      if (level === 'Off') newIntensity = 0;
      else if (level === 'Low') newIntensity = 20;
      else if (level === 'Medium') newIntensity = 50;
      else if (level === 'High') newIntensity = 100;

      setIntensity(newIntensity);
      sendData({ growlight_id: currentIndex, intensity: newIntensity });
    }
  };

  // Toggle between Auto and Manual modes
  const toggleMode = () => {
    setIsAutoMode(!isAutoMode);
  };

  return (
    <ImageBackground source={require('./assets/10.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Configuration 💡</Text>

        {/* Auto/Manual Button */}
        <TouchableOpacity onPress={toggleMode} style={[styles.autoManualButton, isAutoMode && styles.autoButton]}>
          <Text style={styles.autoManualButtonText}>
            {isAutoMode ? 'Switch to Manual Mode' : 'Switch to Automatic Mode'}
          </Text>
        </TouchableOpacity>

        {/* Main Category Selection */}
        {!selectedCategory && (
          <View style={styles.categoryContainer}>
            {/* Row 1 - Growlights */}
            <View style={styles.row}>
              <TouchableOpacity 
                style={[styles.card, styles.growlightCard]} 
                onPress={() => setSelectedCategory('growlights')}
                disabled={isAutoMode} // Disable when in Auto mode
              >
                <Image source={require('./assets/lights.png')} style={styles.cardImage} />
                <Text style={styles.cardText}>Growlights</Text>
              </TouchableOpacity>
            </View>

            {/* Row 2 - Fans */}
            <View style={styles.row}>
              <TouchableOpacity 
                style={[styles.card, styles.fanCard]} 
                onPress={() => setSelectedCategory('fans')}
                disabled={isAutoMode} // Disable when in Auto mode
              >
                <Image source={require('./assets/fan.png')} style={styles.cardImage} />
                <Text style={styles.cardText}>Fans</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Growlights Configuration */}
        {selectedCategory === 'growlights' && (
          <View style={styles.configContainer}>
            <Text style={styles.subtitle}>Select Growlight: {currentIndex}</Text>

            {/* Grid of Growlight 1-4 (2x2 layout) */}
            <View style={styles.gridContainer}>
              {Array.from({ length: 4 }, (_, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.gridItem, { backgroundColor: getColor(i) }]}  // Assign color based on index
                  onPress={() => setCurrentIndex(i + 1)}
                  disabled={isAutoMode} // Disable when in Auto mode
                >
                  <Text style={styles.gridText}>Growlight {i + 1}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Light Intensity Controls */}
            <Text style={styles.label}>Light Intensity</Text>
            <View style={[styles.adjustContainer, isAutoMode && styles.disabledContainer]}>
              <TouchableOpacity onPress={() => setIntensityOption('Off')} disabled={isAutoMode}>
                <Text style={[styles.intensityButton, intensity === 0 && styles.selectedButton]}>Off</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIntensityOption('Low')} disabled={isAutoMode}>
                <Text style={[styles.intensityButton, intensity === 20 && styles.selectedButton]}>Low</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIntensityOption('Medium')} disabled={isAutoMode}>
                <Text style={[styles.intensityButton, intensity === 50 && styles.selectedButton]}>Medium</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIntensityOption('High')} disabled={isAutoMode}>
                <Text style={[styles.intensityButton, intensity === 100 && styles.selectedButton]}>High</Text>
              </TouchableOpacity>
            </View>

            {/* Light Color Selection */}
            <Text style={styles.label}>Select Light Color:</Text>
            <View style={[styles.colorContainer, isAutoMode && styles.disabledContainer]}>
              {['purple', 'red', 'blue', 'pink', 'white'].map((lightColor) => (
                <TouchableOpacity
                  key={lightColor}
                  style={[styles.colorButton, { backgroundColor: lightColor }]}
                  onPress={() => {
                    if (!isAutoMode) {
                      setColor(lightColor);
                      sendData({ growlight_id: currentIndex, color: lightColor });
                    }
                  }}
                  disabled={isAutoMode}
                />
              ))}
            </View>
          </View>
        )}

        {/* Fans Configuration */}
        {selectedCategory === 'fans' && (
          <View style={styles.configContainer}>
            <Text style={styles.subtitle}>Select Fan {currentIndex}</Text>

            {/* Fan Selection */}
            <View style={styles.gridContainer}>
              {Array.from({ length: 2 }, (_, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.gridItem, styles.fanItem(i)]}  // Assigning the fan color based on index
                  onPress={() => setCurrentIndex(i + 1)}
                  disabled={isAutoMode} // Disable when in Auto mode
                >
                  <Text style={styles.gridText}>Fan {i + 1}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Fan Speed Adjustments */}
            <Text style={styles.label}>Adjust Speed</Text>
            <View style={[styles.adjustContainer, isAutoMode && styles.disabledContainer]}>
              <TouchableOpacity onPress={() => setFanSpeedOption('Low')} disabled={isAutoMode}>
                <Text style={[styles.speedButton, fanSpeed === 'Low' && styles.selectedButton]}>Low</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFanSpeedOption('Medium')} disabled={isAutoMode}>
                <Text style={[styles.speedButton, fanSpeed === 'Medium' && styles.selectedButton]}>Medium</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFanSpeedOption('High')} disabled={isAutoMode}>
                <Text style={[styles.speedButton, fanSpeed === 'High' && styles.selectedButton]}>High</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Back Button */}
        {selectedCategory && (
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedCategory(null)}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}

// Function to get a different color for each Growlight card
const getColor = (index) => {
  const colors = ['#6a6a6a', '#808080', '#7f7f7f', '#4f4f4f'];  // Different colors for each Growlight
  return colors[index];
};

// Function to return a color based on index for Fans (Example: different colors for fans)
const fanItem = (index) => {
  const colors = ['#5f5f5f', '#3f3f3f'];  // New fan colors
  return {
    backgroundColor: colors[index],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  };
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 40,
    textAlign: 'center',
  },
  autoManualButton: {
    backgroundColor: '#388E3C',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: 'center',
  },
  autoButton: {
    backgroundColor: '#F44336',  // Auto mode button color (Red)
  },
  autoManualButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  categoryContainer: {
    width: '100%',
    height: '60%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  row: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  card: {
    paddingVertical: 50,
    paddingHorizontal: 70,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
    width: width * 0.8,
    height: height * 0.2,
    justifyContent: 'center',
  },
  growlightCard: {
    backgroundColor: '#C7C6C1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  fanCard: {
    backgroundColor: '#BDB7AB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  cardText: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 10,
    color: '#fff',
  },
  cardImage: {
    width: 100,
    height: 100,
  },
  configContainer: {
    width: '100%',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#555',
    marginBottom: 15,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  gridItem: {
    padding: 15,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    width: width * 0.4,  // 2x2 layout, 2 cards per row
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  fanItem: (index) => {
    const colors = ['#5f5f5f', '#3f3f3f'];  // New fan colors
    return {
      backgroundColor: colors[index],
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
    };
  },
  gridText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  adjustContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
  },
  intensityButton: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#ddd',
    borderRadius: 15,
    marginHorizontal: 3,
    textAlign: 'center',
    width: 94,
  },
  selectedButton: {
    backgroundColor: '#388E3C',  // Highlight selected button
    color: '#fff',
  },
  valueText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  disabledContainer: {
    opacity: 0.5,  // Makes controls appear disabled when in Auto mode
  },
  backButton: {
    backgroundColor: '#9e9e9e',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 25,
    position: 'absolute',
    bottom: 50,
  },
  backText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
  },
});
