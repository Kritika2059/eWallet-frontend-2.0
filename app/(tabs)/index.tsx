import React, { useState, useCallback, useEffect } from 'react';
import { Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';

export default function HomeScreen() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const translationX = useSharedValue(0);

  // Function to play sound
  async function play() {
    const { sound } = await Audio.Sound.createAsync(require('../../assets/welcomeaudio.mp3'));
    setSound(sound);
    await sound.playAsync();
  }

  // Play audio when the page is loaded or refreshed
  useEffect(() => {
    play();
  }, []);

  // Stop audio when the screen loses focus
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (sound) {
          sound.stopAsync();
        }
      };
    }, [sound])
  );

  // Refresh handler (reloads the screen)
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      navigation.replace('HomeScreen'); // Fully reloads the screen and plays audio again
    }, 1000);
  }, [navigation]);

  // Swipe gesture to navigate
  const handleGestureEnd = (event) => {
    if (event.translationX > 150) {
      navigation.navigate('loginScreen');
    } else if (event.translationX < -150) {
      navigation.navigate('signupScreen');
    }
    translationX.value = withSpring(0);
  };

  const swipeGesture = Gesture.Pan()
    .onUpdate((event) => {
      translationX.value = event.translationX;
    })
    .onEnd(handleGestureEnd);

  // **Fixed Double-Tap Gesture (Now Works on Mobile)**
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .runOnJS(true) // This ensures the gesture runs on the JS thread
    .onEnd(() => {
      runOnJS(play)(); // Use runOnJS to call play() function correctly
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translationX.value }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Wrap with Double-Tap Gesture */}
      <GestureDetector gesture={doubleTapGesture}>
        <GestureDetector gesture={swipeGesture}>
          <Animated.View style={[styles.content, animatedStyle]}>
            <Text style={styles.swipeText}>← Swipe Right for Login | Swipe Left for Signup →</Text>

            {/* Pull-to-Refresh */}
            <ScrollView
              contentContainerStyle={styles.innerContainer}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
              <Text style={styles.title}>SpeakPay</Text>
              <Text style={styles.instruction}>Double-Tap to Play Sound</Text>
            </ScrollView>
          </Animated.View>
        </GestureDetector>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#015f66',
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
  },
  swipeText: {
    position: 'absolute',
    top: 20,
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  instruction: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
  },
});
