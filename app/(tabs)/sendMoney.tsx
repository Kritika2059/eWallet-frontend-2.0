import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function SendMoney() {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [toPhoneNumber, setToPhoneNumber] = useState('');

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const phoneNumber = 9866115041;

  // Fetch user details and e-wallet balance
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get(`https://ewalletbackend-t1gl.onrender.com/api/v1/users/${phoneNumber}`);
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, []);

  const sendBalance = async () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid amount');
      return;
    }
    if (!toPhoneNumber) {
      Alert.alert('Invalid Input', 'Please enter a valid phone number');
      return;
    }
    try {
      const response = await axios.post(`https://ewalletbackend-t1gl.onrender.com/api/v1/users/${phoneNumber}/transfer`, {
        amount: numericAmount,
        toPhoneNumber: toPhoneNumber,
      });
      Alert.alert('Success', 'Money sent successfully');


    } catch (error) {
      console.error('Error sending money:', error);
      Alert.alert('Error', 'Failed to send money');
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading data</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('index')}>
          <Image source={require('../../assets/images/backArrow.png')} style={styles.backImage} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Send Money</Text>
        <View style={styles.balanceContainer}>
          <View style={styles.balanceBox}>
            <Text style={styles.balanceLabel}>BALANCE</Text>
            <Text style={styles.balanceValue}>{user.ewalletBalance}</Text>
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <TouchableOpacity style={styles.speakerButton}>
          <Image source={require('../../assets/images/speaker.png')} style={styles.speakerImage} />
        </TouchableOpacity>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              keyboardType="phone-pad"
              value={toPhoneNumber}
              onChangeText={setToPhoneNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <TouchableOpacity style={styles.confirmButton} onPress={sendBalance}>
              <Text style={styles.confirmButtonText}>CONFIRM</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.proceedButton} onPress={() => navigation.navigate('successfulTransfer')}>
              <Text style={styles.proceedButtonText}>PROCEED</Text>
            </TouchableOpacity>
          </View>
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
  balanceContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  balanceBox: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  balanceLabel: {
    color: '#888',
    fontSize: 14,
  },
  balanceValue: {
    color: '#00c853',
    fontSize: 24,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    position: 'relative',
  },
  speakerButton: {
    position: 'absolute',
    top: 24,
    right: 48,
  },
  speakerImage: {
    width: 24,
    height: 24,
    tintColor: '#00c853',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    padding: 20,
    paddingTop: 40,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#00c853',
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  confirmButton: {
    backgroundColor: '#00c853',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  proceedButton: {
    backgroundColor: '#00c853',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  proceedButtonText: {
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