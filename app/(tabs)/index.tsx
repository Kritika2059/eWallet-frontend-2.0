import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { fetchUserDetails } from '..\\services\\api';
import axios from 'axios';




export default function HomeScreen() {
  const navigation = useNavigation();


const [user, setUser] = useState(null)
const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

const phoneNumber = 9840379472;

  // Fetch user details and e-wallet balance
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get(`https://ewalletbackend-t1gl.onrender.com/api/v1/users/${phoneNumber}`);
       setUser(response.data);
      } catch(err) {
        console.error('Error fetching data:', error);
      setError(true);
      }finally{
        setLoading(false);
      }
    };

    getUserDetails();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading data</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
        <Text style={styles.balance}>
          Rs.  XXX.XX    {user.ewalletBalance}
        </Text>
        <TouchableOpacity style={styles.qrButton}>
          <Image source={require('../../assets/images/qrScan.png')} style={styles.qrImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.speakerButton}>
          <Image source={require('../../assets/images/speaker.png')} style={styles.speakerImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.statementButton}>
          <Image source={require('../../assets/images/statement.png')} style={styles.statementImage} />
        </TouchableOpacity>
      </View>

      {/* Body Section */}
      <View style={styles.body}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('loadMoney')}>
            <Image source={require('../../assets/images/loadMoney.png')} />
            <Text style={styles.buttonText}>Load Money</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('sendMoney')}>
            <Image source={require('../../assets/images/sendMoney.png')} />
            <Text style={styles.buttonText}>Send Money</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerTab}>
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
  },
  header: {
    backgroundColor: '#00c853',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 90,
    paddingBottom: 70,
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 24,
  },
  menuText: {
    fontSize: 24,
    color: '#fff',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
  },
  balance: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  qrButton: {
    position: 'absolute',
    bottom: 10,
    left: 20,
  },
  qrImage: {
    width: 40,
    height: 40,
  },
  speakerButton: {
    position: 'absolute',
    top: 40,
    right: 24,
  },
  speakerImage: {
    width: 80,
    height: 40,
  },
  statementButton: {
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  statementImage: {
    width: 160,
    height: 32,
  },
  body: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '90%',
    paddingHorizontal: 10,
  },
  actionButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
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
