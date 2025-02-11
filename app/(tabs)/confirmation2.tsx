import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function detailConfirmation() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('loadMoney')}>
          <Image source={require('../../assets/images/backArrow.png')} style={styles.backImage} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Confirmation</Text>
        <TouchableOpacity style={styles.speakerButton}>
          <Image source={require('../../assets/images/speaker.png')} style={styles.speakerImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Transfer</Text>
        <Text style={styles.toLabel}>To</Text>
        <Text style={styles.toName}>User</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Phone Number</Text>
            <Text style={styles.detailValue}>9898989898</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Charge</Text>
            <Text style={styles.detailValue}>0.00</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total load Amount</Text>
            <Text style={styles.detailValue}>100</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('pinConfirmation2')}>
          <Text style={styles.confirmButtonText}>CONFIRM</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerTab} onPress={() => navigation.navigate('index')}>
          <Image source={require('../../assets/images/home.png')} />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerTab}>
          <Image source={require('../../assets/images/microphone.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerTab}>
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
  },
  backButton: {
    position: 'absolute',
    left: 24,
    top: 50,
  },
  backImage: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  headerText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  speakerButton: {
    position: 'absolute',
    right: 24,
    top: 48,
  },
  speakerImage: {
    width: 56,
    height: 36,
    tintColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    color: '#333',
    marginVertical: 10,
  },
  toLabel: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
  },
  toName: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  detailLabel: {
    fontSize: 16,
    color: '#888',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#00c853',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
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
