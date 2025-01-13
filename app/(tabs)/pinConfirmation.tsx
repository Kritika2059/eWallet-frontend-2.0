import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PinConfirmation() {
  const navigation = useNavigation();
  const [pin, setPin] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('confirmation')}>
            <Image source={require('../../assets/images/backArrow.png')} style={styles.backImage} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Pin Confirmation</Text>
          <TouchableOpacity style={styles.speakerButton}>
            <Image source={require('../../assets/images/speaker.png')} style={styles.speakerImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Transfer</Text>
          <Text style={styles.toLabel}>To</Text>
          <Text style={styles.toName}>Reciever</Text>
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
              <Text style={styles.detailLabel}>Total Paying Amount</Text>
              <Text style={styles.detailValue}>100</Text>
            </View>
          </View>
          <TextInput
            style={styles.pinInput}
            placeholder="Remarks"
          />
          <TextInput
            style={styles.pinInput}
            placeholder="Enter PIN"
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry={true}
            value={pin}
            onChangeText={setPin}
          />
          <TouchableOpacity style={styles.confirmButton}  onPress={() => navigation.navigate('successfulTransfer')}>
            <Text style={styles.confirmButtonText}>CONFIRM</Text>
          </TouchableOpacity>
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
        <TouchableOpacity style={styles.footerTab}>
          <Image source={require('../../assets/images/profile.png')} />
          <Text style={styles.footerText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  speakerButton: {
    position: 'absolute',
    right: 24,
    top: 50,
  },
  speakerImage: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items to the top
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
  pinInput: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#00c853',
    paddingHorizontal: 10,
    marginVertical: 20,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  confirmButton: {
    backgroundColor: '#00c853',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
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
    width: '100%',
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
