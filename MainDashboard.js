import React from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, 
  Dimensions, ImageBackground 
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Home({ navigation }) {
  return (
    <ImageBackground
      source={require('./assets/1.jpg')} 
      style={styles.container}
    >
          <View style={styles.headerContainer}>
      <Text style={styles.title}>Hello, Plant Lover! 🌱</Text>
      <Text style={styles.subtitle}>
        Your plants are happy to see you at Lumina Flora!
      </Text>
    </View>

      {/* Dashboard Sections */}
      <ScrollView contentContainerStyle={styles.sectionList}>
        {/* Plants */}
        <TouchableOpacity 
          style={[styles.sectionCard, styles.plantsCard]}
          onPress={() => navigation.navigate('DisplayPlant')}
        >
          <View style={styles.imageCircle}>
            <Image source={require('./assets/8.png')} style={styles.sectionImage} />
          </View>
          <View style={styles.sectionInfo}>
            <Text style={styles.sectionName}>Plants</Text>
            <Text style={styles.sectionDesc}>Monitor & manage your plants</Text>
          </View>
          <Text style={styles.arrow}>➝</Text>
        </TouchableOpacity>

        {/* Display Setup */}
        <TouchableOpacity 
          style={[styles.sectionCard, styles.setupCard]}
          onPress={() => navigation.navigate('DisplaySetup')}
        >
          <View style={styles.imageCircle}>
            <Image source={require('./assets/setup.png')} style={styles.sectionImage} />
          </View>
          <View style={styles.sectionInfo}>
            <Text style={styles.sectionName}>Display Setup</Text>
            <Text style={styles.sectionDesc}>View and configure your setup</Text>
          </View>
          <Text style={styles.arrow}>➝</Text>
        </TouchableOpacity>

        {/* Configure */}
        <TouchableOpacity 
          style={[styles.sectionCard, styles.configureCard]}
          onPress={() => navigation.navigate('Configure')}
        >
          <View style={styles.imageCircle}>
            <Image source={require('./assets/conf.png')} style={styles.sectionImage} />
          </View>
          <View style={styles.sectionInfo}>
            <Text style={styles.sectionName}>Configure</Text>
            <Text style={styles.sectionDesc}>Adjust grow lights and fans</Text>
          </View>
          <Text style={styles.arrow}>➝</Text>
        </TouchableOpacity>

        {/* About Us */}
        <TouchableOpacity 
          style={[styles.sectionCard, styles.aboutCard]}
          onPress={() => navigation.navigate('Settings')}
        >
          <View style={styles.imageCircle}>
            <Image source={require('./assets/team.png')} style={styles.sectionImage} />
          </View>
          <View style={styles.sectionInfo}>
            <Text style={styles.sectionName}>About Us</Text>
            <Text style={styles.sectionDesc}>Learn more about Lumina Flora</Text>
          </View>
          <Text style={styles.arrow}>➝</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#133A1B',
    fontFamily: 'Poppins-Bold',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 18,
    color: '#3F3F3F',
    fontFamily: 'Poppins-Regular',
    lineHeight: 24,
  },
  
  sectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 130, // Keeps original section size
    paddingHorizontal: 30,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    width: '90%', // Adjust width to fit fully
    alignSelf: 'flex-end', // Pushes the card to the right
    borderTopRightRadius: 0, // Makes the right side square
    borderBottomRightRadius: 0, // Removes the curve on the right
    position: 'relative', // Ensures circles can overlap
  },

  /* Unique Colors for Each Section */
  plantsCard: {
    backgroundColor: '#B7BF96', 
  },
  setupCard: {
    backgroundColor: '#BFCAB4', 
  },
  configureCard: {
    backgroundColor: '#95AA63', 
  },
  aboutCard: {
    backgroundColor: '#6F9580', 
  },

  imageCircle: {
    width: 100, 
    height: 100, 
    borderRadius: 48, 
    backgroundColor: '#fafdf3', // White Circle Background
    justifyContent: 'center', 
    alignItems: 'center', 
    position: 'absolute', // Allows overlapping
    left: -30, // Pushes it outside the section
    top: '50%', // Centers it vertically
    transform: [{ translateY: -42.5 }], // Adjusts for exact center alignment
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  sectionImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  sectionInfo: {
    flex: 1,
    marginLeft: 50, // Keeps text spacing correct
  },
  sectionName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#133A1B',
  },
  sectionDesc: {
    fontSize: 16,
    color: '#3F3F3F',
  },
  arrow: {
    fontSize: 40,
    color: '#26580f',
  },
});
