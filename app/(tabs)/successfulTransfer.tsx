import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SuccessfulTransfer() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} >
          {/* <Image source={require('../../assets/images/menu.png')} style={styles.menuImage} /> */}
        </TouchableOpacity>
        <Text style={styles.headerText}>Results</Text>
        <TouchableOpacity style={styles.speakerButton}>
          <Image source={require('../../assets/images/speaker.png')} style={styles.speakerImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.resultContainer}>
          <Image source={require('../../assets/images/profile.png')} style={styles.profileImage} />
          <Text style={styles.thankYouText}>Thank you</Text>
          <Text style={styles.successText}>Successful Transfer</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerTab} onPress={() => navigation.navigate('index')}>
          <Image source={require('../../assets/images/home.png')} />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerTab}>
          <Image source={require('../../assets/images/microphone.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerTab} onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../../assets/images/profile.png')} />
          <Text style={styles.footerText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#00c853',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuButton: {
    position: 'absolute',
    left: 16,
    top: 50,
  },
  menuImage: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  headerText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  speakerButton: {
    position: 'absolute',
    right: 16,
    top: 50,
  },
  speakerImage: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  thankYouText: {
    fontSize: 24,
    color: '#00c853',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  successText: {
    fontSize: 16,
    color: '#00c853',
    marginBottom: 10,
  },
  separator: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  amountText: {
    fontSize: 24,
    color: '#00c853',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: -1 },
  },
  footerTab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 8,
    borderColor: '#000',
    borderRadius: 4,
    marginHorizontal: 2,
    backgroundColor: '#fff',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.4,
  },
  footerText: {
    fontSize: 16,
    color: '#00c853',
  },
});
