import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Modal, ImageBackground, Dimensions } from 'react-native';

const teamMembers = [
  { 
    id: '1', 
    name: 'Remar M. Moreno', 
    role: 'Intelligent Systems', 
    image: require('./assets/rem.jpg'), 
    bio: 'Specializes in AI-driven solutions for automation and optimization.' 
  },
  { 
    id: '2', 
    name: 'John Renzo Mendoza', 
    role: 'System Administration', 
    image: require('./assets/renzo.jpg'), 
    bio: 'Expert in server management, security protocols, and cloud computing.' 
  },
  { 
    id: '3', 
    name: 'Akio Gavin Dela Cruz', 
    role: 'Intelligent Systems', 
    image: require('./assets/akio.jpg'), 
    bio: 'Passionate about deep learning and neural networks for real-world applications.' 
  },
  { 
    id: '4', 
    name: 'Mark John Villanueva', 
    role: 'Railway Engineering', 
    image: require('./assets/mj.jpg'), 
    bio: 'Focuses on railway system safety, maintenance, and technological innovations.' 
  },
];

const screenWidth = Dimensions.get('window').width;

export default function MeetTheTeam() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [showThesisPopup, setShowThesisPopup] = useState(true);

  return (
    <ImageBackground source={require('./assets/BGimage.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Lumina Flora</Text>

        <FlatList
          data={teamMembers}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedMember(item)} style={styles.card}>
              <View style={styles.imageWrapper}>
                <Image source={item.image} style={styles.profileImage} />
              </View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.role}>{item.role}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Thesis Pop-up Modal */}
        {showThesisPopup && (
          <Modal animationType="fade" transparent={true} visible={showThesisPopup}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>🌿 About Our Thesis</Text>
                <Text style={styles.modalText}>
                Lumina Flora is a smart gardening application designed to monitor and optimize plant growth by detecting growth stages and adjusting environmental conditions accordingly. Using computer vision, it identifies whether a plant is in the germination, vegetative, flowering, or harvesting stage and automatically modifies light intensity, color, and temperature to support optimal development. The app provides real-time monitoring, allowing users to track plant progress and manually adjust settings as needed. With a user-friendly interface, Lumina Flora ensures that indoor gardeners, whether beginners or experts, can efficiently manage their plants with precision and ease. 🌱💡
                </Text>
                <TouchableOpacity onPress={() => setShowThesisPopup(false)} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        {/* Bio Pop-up Modal */}
        {selectedMember && (
          <Modal animationType="slide" transparent={true} visible={!!selectedMember}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Image source={selectedMember.image} style={styles.modalImage} />
                <Text style={styles.modalName}>{selectedMember.name}</Text>
                <Text style={styles.modalRole}>{selectedMember.role}</Text>
                <Text style={styles.modalBio}>{selectedMember.bio}</Text>
                <TouchableOpacity onPress={() => setSelectedMember(null)} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Slight dark overlay for better readability
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 25,
    textTransform: 'uppercase',
  },
  listContainer: {
    alignItems: 'center',
  },
  card: {
    width: screenWidth * 0.42,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    margin: 12,
    paddingVertical: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  imageWrapper: {
    width: 130,
    height: 130,
    borderRadius: 75,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 4,
    borderColor: '#2E7D32',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginTop: 10,
  },
  role: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
    borderWidth: 4,
    borderColor: '#2E7D32',
  },
  modalName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
  modalRole: {
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalBio: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2E7D32',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
