import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function Transactions() {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const phoneNumber = 9840379472;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`https://ewalletbackend-t1gl.onrender.com/api/v1/users/transactions/user/${phoneNumber}`);
        setTransactions(response.data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#00c853" />;
  }

  if (error) {
    return <Text>Error loading transactions</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('index')}>
          <Image source={require('../../assets/images/backArrow.png')} style={styles.backImage} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Transactions</Text>
      </View>
      <FlatList
        data={transactions}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.transactionText}>Amount: {item.amount}</Text>
            <Text style={styles.transactionText}>From: {item.fromUser}</Text>
            <Text style={styles.transactionText}>To: {item.toUser}</Text>
            <Text style={styles.transactionText}>Date: {item.timestamp}</Text>
            <Text style={styles.transactionText}>Type: {item.transferMethod}</Text>
          </View>
        )}
      />
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
  transactionItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionText: {
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