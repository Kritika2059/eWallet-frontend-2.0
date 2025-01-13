import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

export default function LoadMoney() {
  const navigation = useNavigation();
  const [selectedBank, setSelectedBank] = useState('');
  const [amount1, setAmount1] = useState('');
  const [amount2, setAmount2] = useState('');
  const [amount3, setAmount3] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('index')}>
          <Image source={require('../../assets/images/backArrow.png')} style={styles.backImage} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Load Money</Text>
        <View style={styles.balanceContainer}>
          <View style={styles.balanceBox}>
            <Text style={styles.balanceLabel}>BALANCE</Text>
            <Text style={styles.balanceValue}>XXXX.XX</Text>
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.inputContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedBank}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedBank(itemValue)}
            >
              <Picker.Item label="Select Linked Bank" value="" />
              <Picker.Item label="Laxmi Sunrise Bank" value="laxmiSunrise" />
              <Picker.Item label="Nabil Bank" value="nabil" />
              <Picker.Item label="Prabhu Bank" value="prabhu" />
            </Picker>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Account Number"
            keyboardType="numeric"
            value={amount1}
            onChangeText={setAmount1}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            value={amount2}
            onChangeText={setAmount2}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="numeric"
            value={amount3}
            onChangeText={setAmount3}
          />
          <TouchableOpacity style={styles.proceedButton} onPress={() => navigation.navigate('confirmation2')}>
            <Text style={styles.proceedButtonText}>PROCEED</Text>
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
  },
  inputContainer: {
    padding: 20,
    paddingTop: 40,
  },
  pickerContainer: {
    height: 56,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#00c853',
    marginBottom: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  picker: {
    height: 56,
    width: '100%',
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
