import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <Text style={styles.subtitle}>Random Questions Here:</Text>
      <View style={styles.questions}>
        <Text style={styles.question}>1. Write a random question here</Text>
        <Text style={styles.question}>2. Write a second random question here</Text>
        <Text style={styles.question}>3. Write a third random question here</Text>
      </View>
      <TouchableOpacity style={styles.recordButton}>
        <Text style={styles.recordText}>🔴 Recording</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate('index')}
      >
        <Text style={styles.signupText}>login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00c853',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  questions: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
  },
  question: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  instruction: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 20,
  },
  recordButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  recordText: {
    color: '#fff',
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  signupText: {
    color: '#00c853',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
